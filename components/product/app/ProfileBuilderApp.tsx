'use client';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle, ArrowLeft, ArrowRight, Briefcase, CalendarCheck, Check, ChevronDown, ClipboardList, FileUp, Flame, Loader2, Lock,
  Download, FileText, PartyPopper, Plus, RotateCcw, Sparkles, Upload, UserRound, Wand2,
} from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState, type DragEvent, type ReactNode } from 'react';
import {
  completion, detectExtras, detectSkills, emptyForm, guides, linkedin, naukri, parseResume, profileTypes, readResumeFile, screenContent, suggestRole,
  type ChecklistGroup, type ProfileForm,
} from '@/lib/profile-builder/engine';
import { findRole, notices, roles, type Role } from '@/lib/profile-builder/roles';
import { product } from '@/lib/content';
import { openProfilePack } from '@/lib/profile-builder/pack';
import { cn, EASE } from '@/lib/utils';
import { Checklist, ProgressBar } from '../Checklist';
import { GuideViewer } from '../GuideViewer';
import { OutputCard } from '../OutputCard';
import { scrollToTop } from '../scrollTo';

/* ───────────── local storage (same keys as the original tool) ───────────── */
const store = {
  get<T>(k: string, d: T): T {
    try {
      const v = localStorage.getItem(k);
      return v ? (JSON.parse(v) as T) : d;
    } catch {
      return d;
    }
  },
  set(k: string, v: unknown) {
    try {
      localStorage.setItem(k, JSON.stringify(v));
    } catch {
      /* storage blocked: the tool still works, it just won't remember */
    }
  },
};
type Checks = Partial<Record<ChecklistGroup, boolean[]>> & { _day?: string };
type Status = { kind: 'idle' | 'busy' | 'ok' | 'err'; msg: string };

const STEPS = [
  { label: 'Career track', icon: Briefcase },
  { label: 'Resume', icon: FileUp },
  { label: 'Your details', icon: UserRound },
  { label: 'Naukri', icon: ClipboardList },
  { label: 'LinkedIn', icon: Sparkles },
  { label: 'Daily routine', icon: CalendarCheck },
];

function Field({ label, children, hint, className, htmlFor }: { label: string; children: ReactNode; hint?: string; className?: string; htmlFor: string }) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-neutral-800">{label}</label>
      {children}
      {hint && <p className="mt-1.5 text-xs text-neutral-500">{hint}</p>}
    </div>
  );
}

function StepHead({ n, title, sub }: { n: number; title: string; sub: ReactNode }) {
  return (
    <div className="mb-6">
      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#9114FF]">Step {n} of {STEPS.length}</p>
      <h2 className="mt-1.5 text-xl font-semibold tracking-tight text-neutral-950 md:text-[1.4rem]">{title}</h2>
      <p className="mt-1.5 max-w-2xl text-[0.92rem] text-neutral-600">{sub}</p>
    </div>
  );
}

/** "Here's what we found" — each detail pops in with a tick, skills as chips */
function FoundCard({ form, role }: { form: ProfileForm; role: Role }) {
  const projects = [form.p1, form.p2].filter((p) => p.trim()).length;
  const rows: [string, string][] = [
    ['Name', form.name],
    ['City', form.city],
    ['Experience', form.years ? `${form.years} years` : ''],
    ['Current role', form.current],
    ['Certifications', form.certs],
    ['Projects', projects ? `${projects} found` : ''],
  ];
  const skills = [...form.skills, ...form.otherSkills.split(',').map((s) => s.trim()).filter(Boolean)];
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }} className="mt-4 overflow-hidden rounded-2xl border border-neutral-200">
      <div className="flex items-center justify-between gap-3 border-b border-neutral-100 bg-neutral-50/80 px-4 py-2.5">
        <p className="text-sm font-semibold text-neutral-900">Here’s what we found</p>
        <span className="flex items-center gap-1.5 text-xs text-neutral-500">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={role.logo} alt="" className="h-4 w-4 object-contain" /> {role.label} track
        </span>
      </div>
      <dl className="grid gap-x-6 gap-y-2.5 p-4 sm:grid-cols-2">
        {rows.map(([k, v], i) => (
          <motion.div key={k} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 * i + 0.15, ease: EASE }} className="flex items-center gap-2.5 text-[0.85rem]">
            <span className={cn('grid h-5 w-5 shrink-0 place-items-center rounded-full', v ? 'bg-emerald-100 text-emerald-600' : 'bg-neutral-100 text-neutral-400')}>
              {v ? <Check className="h-3 w-3" strokeWidth={3} /> : <span className="text-[0.7rem]">–</span>}
            </span>
            <dt className="w-24 shrink-0 text-neutral-500">{k}</dt>
            <dd className={cn('min-w-0 truncate', v ? 'font-medium text-neutral-900' : 'italic text-neutral-400')}>{v || 'Add on next step'}</dd>
          </motion.div>
        ))}
      </dl>
      {skills.length > 0 && (
        <div className="border-t border-neutral-100 px-4 py-3">
          <p className="mb-2 text-xs font-medium text-neutral-500">{skills.length} skills detected</p>
          <div className="flex flex-wrap gap-1.5">
            {skills.slice(0, 14).map((s, i) => (
              <motion.span key={s} initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 + i * 0.035 }} className="rounded-full bg-violet-50 px-2.5 py-1 text-[0.75rem] font-medium text-[#7a0fe0] ring-1 ring-violet-100">
                {s}
              </motion.span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

function Nav({ back, next, nextLabel = 'Continue', nextDisabled, extra }: { back?: () => void; next?: () => void; nextLabel?: ReactNode; nextDisabled?: boolean; extra?: ReactNode }) {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-2.5 border-t border-neutral-100 pt-5">
      {back && (
        <button type="button" onClick={back} className="pb-btn pb-btn-ghost h-10 px-4 text-[0.85rem]">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
      )}
      {extra}
      {next && (
        <button type="button" onClick={next} disabled={nextDisabled} className="pb-btn pb-btn-primary ml-auto h-10 px-5 text-[0.85rem]">
          {nextLabel} <ArrowRight className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

export function ProfileBuilderApp() {
  const [form, setForm] = useState<ProfileForm>(() => emptyForm(roles[0]));
  const [loaded, setLoaded] = useState(false);
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<Status>({ kind: 'idle', msg: '' });
  const [fileName, setFileName] = useState('');
  const [drag, setDrag] = useState(false);
  const [paste, setPaste] = useState('');
  const [suggest, setSuggest] = useState<Role | null>(null);
  const [generated, setGenerated] = useState<ProfileForm | null>(null);
  const [checks, setChecks] = useState<Checks>({});
  const [customSkill, setCustomSkill] = useState('');
  const resumeText = useRef(''); // kept in memory only, never stored
  const topRef = useRef<HTMLDivElement>(null);
  const pendingTop = useRef(false);

  const role = findRole(form.role);
  const outRole = findRole(generated?.role ?? form.role);
  const g = useMemo(() => guides(outRole), [outRole]);
  const pct = completion(form);
  const nk = useMemo(() => (generated ? naukri(generated, findRole(generated.role)) : []), [generated]);
  const li = useMemo(() => (generated ? linkedin(generated, findRole(generated.role)) : []), [generated]);

  /* load saved state once */
  useEffect(() => {
    const saved = store.get<ProfileForm | null>('pb_form', null);
    const qRole = new URLSearchParams(window.location.search).get('role');
    let next = saved ? { ...emptyForm(findRole(saved.role)), ...saved } : emptyForm(roles[0]);
    if (qRole && roles.some((r) => r.id === qRole) && qRole !== next.role) next = { ...next, role: qRole, skills: [...findRole(qRole).defaults] };
    setForm(next);
    const out = store.get<ProfileForm | null>('pb_out', null);
    if (out) setGenerated(out);
    const savedStep = store.get<number>('pb_step', 0);
    setStep(qRole ? 0 : out ? savedStep : Math.min(savedStep, 2));
    const c = store.get<Checks>('pb_checks', {});
    const today = new Date().toDateString();
    if (c._day !== today) {
      c.daily = [];
      c._day = today;
    }
    setChecks(c);
    store.set('pb_checks', c);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) store.set('pb_form', form);
  }, [form, loaded]);

  const go = useCallback((n: number) => {
    setStep(n);
    store.set('pb_step', n);
    pendingTop.current = true;
  }, []);

  const update = useCallback(<K extends keyof ProfileForm>(k: K, v: ProfileForm[K]) => setForm((f) => ({ ...f, [k]: v })), []);

  const switchRole = (r: Role) => {
    setSuggest(null);
    setForm((f) => {
      if (f.role === r.id) return f;
      const text = resumeText.current;
      const hits = text ? detectSkills(r, text) : [];
      return { ...f, role: r.id, skills: hits.length ? hits : [...r.defaults], otherSkills: text ? detectExtras(r, text).join(', ') : f.otherSkills };
    });
  };

  const applyResume = (text: string) => {
    resumeText.current = text;
    const best = suggestRole(text);
    const { patch, found } = parseResume(text, role);
    setForm((f) => ({ ...f, ...patch, skills: patch.skills?.length ? patch.skills : f.skills }));
    setSuggest(best.role.id !== role.id && best.score > 0.15 ? best.role : null);
    setStatus(
      found.length
        ? { kind: 'ok', msg: `Found: ${found.join(', ')}. Tap Continue to check them.` }
        : { kind: 'err', msg: "Couldn't find much automatically. You can fill in the details on the next step." },
    );
  };

  const onFile = async (file: File | undefined) => {
    if (!file) return;
    setStatus({ kind: 'busy', msg: `Reading ${file.name}…` });
    setFileName('');
    try {
      const text = await readResumeFile(file);
      setFileName(file.name);
      applyResume(text);
    } catch (e) {
      setStatus({ kind: 'err', msg: e instanceof Error ? e.message : "Couldn't read this file. Paste the text instead." });
    }
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDrag(false);
    onFile(e.dataTransfer.files[0]);
  };

  const toggleSkill = (name: string) => update('skills', form.skills.includes(name) ? form.skills.filter((s) => s !== name) : [...form.skills, name]);
  const addTrending = () => update('skills', [...new Set([...form.skills, ...role.skills.filter((s) => s.trending).map((s) => s.name)])]);
  const otherList = form.otherSkills.split(',').map((s) => s.trim()).filter(Boolean);
  const addCustom = () => {
    const v = customSkill.trim();
    if (!v) return;
    if (!otherList.some((s) => s.toLowerCase() === v.toLowerCase())) update('otherSkills', [...otherList, v].join(', '));
    setCustomSkill('');
  };

  const generate = () => {
    const snap = { ...form };
    setGenerated(snap);
    store.set('pb_out', snap);
    go(3);
  };

  const setCheck = (gr: ChecklistGroup, i: number, value?: boolean) =>
    setChecks((c) => {
      const arr = [...(c[gr] ?? [])];
      arr[i] = value ?? !arr[i];
      const next = { ...c, [gr]: arr };
      store.set('pb_checks', next);
      return next;
    });
  const resetDaily = () =>
    setChecks((c) => {
      const next = { ...c, daily: [] };
      store.set('pb_checks', next);
      return next;
    });
  const count = (gr: ChecklistGroup, total: number) => Array.from({ length: total }, (_, i) => checks[gr]?.[i]).filter(Boolean).length;
  const canOpen = (n: number) => n <= 2 || !!generated;
  const ex = role.examples;
  const nkScreen = useMemo(() => (generated ? screenContent('naukri', generated, outRole, nk) : {}), [generated, outRole, nk]);
  const liScreen = useMemo(() => (generated ? screenContent('linkedin', generated, outRole, li) : {}), [generated, outRole, li]);
  const note = li.find((b) => b.key === 'note');

  return (
    <div ref={topRef} className="[overflow-anchor:none] container-x scroll-mt-[calc(var(--header-h)+1rem)] pb-24 pt-[calc(var(--header-h)+2.25rem)] md:pt-[calc(var(--header-h)+3rem)]">
      <div className="mx-auto max-w-5xl">
        {/* heading */}
        <nav aria-label="Breadcrumb" className="text-sm text-neutral-500">
          <Link href={product.href} className="hover:text-neutral-900">{product.name}</Link> <span aria-hidden>/</span> <span className="text-neutral-800">Builder</span>
        </nav>
        <div className="mt-3 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <h1 className="font-display text-[clamp(1.45rem,2.4vw,1.95rem)] font-bold leading-[1.1] tracking-[-0.03em] text-neutral-950">
            Build your <span className="pb-accent-text">Naukri & LinkedIn</span> profile
          </h1>
          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            <p className="inline-flex shrink-0 items-center gap-2 rounded-full bg-emerald-50 px-3.5 py-1.5 text-[0.8rem] font-medium text-emerald-700 ring-1 ring-emerald-200">
              <Lock className="h-4 w-4" /> Your resume stays on your device
            </p>
            {generated && (
              <button type="button" onClick={() => openProfilePack(generated, outRole)} className="inline-flex items-center gap-1.5 rounded-full bg-neutral-900 px-3.5 py-1.5 text-[0.8rem] font-semibold text-white transition-colors hover:bg-[#9114FF]">
                <Download className="h-4 w-4" /> Profile pack (PDF)
              </button>
            )}
          </div>
        </div>

        {/* stepper */}
        <ol className="no-scrollbar -mx-gutter mt-6 flex gap-2 overflow-x-auto px-gutter pb-1 md:mx-0 md:grid md:grid-cols-6 md:px-0" aria-label="Progress">
          {STEPS.map((s, i) => {
            const active = i === step;
            const done = i < step || (i >= 3 && i <= 4 && count(i === 3 ? 'naukri' : 'linkedin', 10) === 10);
            const open = canOpen(i);
            return (
              <li key={s.label} className="shrink-0">
                <button
                  type="button"
                  onClick={() => open && go(i)}
                  disabled={!open}
                  aria-current={active ? 'step' : undefined}
                  className={cn(
                    'flex w-full items-center gap-2 rounded-xl border px-2.5 py-2 text-left transition-colors',
                    active ? 'border-[#9114FF] bg-violet-50' : 'border-neutral-200 bg-white hover:border-neutral-300',
                    !open && 'cursor-not-allowed opacity-50',
                  )}
                >
                  <span className={cn('grid h-7 w-7 shrink-0 place-items-center rounded-full text-[0.7rem] font-bold', active ? 'bg-[#9114FF] text-white' : done ? 'bg-emerald-500 text-white' : 'bg-neutral-100 text-neutral-500')}>
                    {done && !active ? <Check className="h-4 w-4" strokeWidth={3} /> : i + 1}
                  </span>
                  <span className={cn('whitespace-nowrap text-[0.8rem] font-semibold', active ? 'text-neutral-950' : 'text-neutral-600', !active && 'hidden lg:inline')}>{s.label}</span>
                </button>
              </li>
            );
          })}
        </ol>

        {/* step body */}
        <div className="pb-card mt-5 p-5 sm:p-7 md:p-8">
          {!loaded ? (
            <div className="h-80 animate-pulse rounded-2xl bg-neutral-50" aria-hidden />
          ) : (
          <AnimatePresence
            mode="wait"
            initial={false}
            onExitComplete={() => {
              if (!pendingTop.current) return;
              pendingTop.current = false;
              requestAnimationFrame(() => scrollToTop(topRef.current, 80));
            }}
          >
            <motion.div key={step} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.22, ease: EASE }}>
              {/* 1 · role */}
              {step === 0 && (
                <>
                  <StepHead n={1} title="Which job are you going for?" sub="Pick your career track. Every headline, skill and tip is written for it." />
                  <div role="radiogroup" aria-label="Career track" className="grid grid-cols-2 gap-3 md:grid-cols-4">
                    {roles.map((r) => {
                      const on = r.id === form.role;
                      return (
                        <button
                          key={r.id}
                          type="button"
                          role="radio"
                          aria-checked={on}
                          onClick={() => switchRole(r)}
                          className={cn(
                            'group relative flex flex-col items-start gap-2.5 rounded-2xl border-2 p-3.5 text-left transition-all duration-200',
                            on ? 'border-[#9114FF] bg-violet-50/60 shadow-[0_10px_30px_-14px_rgba(145,20,255,0.5)]' : 'border-neutral-200 bg-white hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-md',
                          )}
                        >
                          <span className="grid h-10 w-10 place-items-center rounded-xl bg-white p-1.5 ring-1 ring-neutral-200">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={r.logo} alt="" className="h-full w-full object-contain" />
                          </span>
                          <span>
                            <span className="block text-[0.92rem] font-semibold leading-tight text-neutral-950">{r.label}</span>
                            <span className="mt-1 block text-xs leading-snug text-neutral-500">{r.jobTitles[0]}</span>
                          </span>
                          <span className={cn('absolute right-3 top-3 grid h-5 w-5 place-items-center rounded-full border-2', on ? 'border-[#9114FF] bg-[#9114FF] text-white' : 'border-neutral-300')}>
                            {on && <Check className="h-3 w-3" strokeWidth={3} />}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <Nav next={() => go(1)} nextLabel={`Continue as ${role.label}`} />
                </>
              )}

              {/* 2 · resume */}
              {step === 1 && (
                <>
                  <StepHead n={2} title="Upload your resume" sub="We read it in your browser and fill in your details for you. Nothing is uploaded anywhere." />
                  <label
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDrag(true);
                    }}
                    onDragLeave={() => setDrag(false)}
                    onDrop={onDrop}
                    className={cn(
                      'relative flex cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl border-2 border-dashed px-6 py-9 text-center transition-colors duration-200 focus-within:ring-4 focus-within:ring-violet-200',
                      fileName ? 'border-emerald-400 bg-emerald-50/60' : drag ? 'border-[#9114FF] bg-violet-50' : 'border-neutral-300 bg-neutral-50 hover:border-[#9114FF]/60 hover:bg-violet-50/40',
                    )}
                  >
                    <input type="file" accept=".pdf,.docx,.txt" className="sr-only" onChange={(e) => onFile(e.target.files?.[0])} aria-describedby="pb-status" />
                    {status.kind === 'busy' && <span aria-hidden className="pointer-events-none absolute inset-x-0 h-20 bg-gradient-to-b from-transparent via-violet-300/40 to-transparent [animation:pb-scan_1.4s_ease-in-out_infinite]" />}
                    <span className={cn('grid h-12 w-12 place-items-center rounded-2xl shadow-sm', fileName ? 'bg-emerald-500 text-white' : 'bg-white text-[#9114FF] ring-1 ring-neutral-200')}>
                      {status.kind === 'busy' ? <Loader2 className="h-5 w-5 animate-spin" /> : fileName ? <Check className="h-5 w-5" strokeWidth={3} /> : <Upload className="h-5 w-5" />}
                    </span>
                    <span className="mt-4 break-all text-base font-semibold text-neutral-950">{fileName || 'Tap to choose your resume'}</span>
                    <span className="mt-1 text-sm text-neutral-500">{fileName ? 'Tap to choose a different file' : 'or drag it here · PDF, Word (.docx) or .txt'}</span>
                  </label>

                  <p id="pb-status" role="status" className={cn('mt-4 flex items-start gap-2 rounded-xl px-4 py-3 text-sm', status.kind === 'err' ? 'bg-rose-50 text-rose-700' : status.kind === 'ok' ? 'bg-emerald-50 text-emerald-700' : 'text-neutral-500', !status.msg && 'sr-only')}>
                    {status.kind === 'err' && <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />}
                    {status.kind === 'ok' && <Check className="mt-0.5 h-4 w-4 shrink-0" />}
                    {status.msg}
                  </p>
                  {status.kind === 'ok' && <FoundCard form={form} role={role} />}

                  <AnimatePresence>
                    {suggest && (
                      <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-4 flex flex-wrap items-center gap-3 rounded-2xl border border-violet-200 bg-violet-50 p-4 text-sm">
                        <Sparkles className="h-4 w-4 text-[#9114FF]" />
                        <span className="flex-1 text-neutral-700">Your resume looks like {/^[AEIOU]/.test(suggest.title) ? "an" : "a"} <strong className="text-neutral-950">{suggest.title}</strong> profile.</span>
                        <button type="button" onClick={() => switchRole(suggest)} className="rounded-full bg-[#9114FF] px-4 py-2 text-xs font-semibold text-white">Switch to {suggest.label}</button>
                        <button type="button" onClick={() => setSuggest(null)} className="text-xs font-medium text-neutral-500 hover:text-neutral-900">Keep {role.label}</button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <details className="group mt-6 rounded-2xl border border-neutral-200 px-4 py-3">
                    <summary className="flex cursor-pointer list-none items-center gap-2 text-sm font-semibold text-neutral-800 [&::-webkit-details-marker]:hidden">
                      <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" /> No file? Paste your resume text instead
                    </summary>
                    <textarea value={paste} onChange={(e) => setPaste(e.target.value)} placeholder="Paste the full text of your resume here" aria-label="Resume text" className="pb-input mt-3 min-h-[140px] resize-y" />
                    <button
                      type="button"
                      onClick={() => (paste.trim().length < 50 ? setStatus({ kind: 'err', msg: 'Paste a bit more of your resume text.' }) : applyResume(paste))}
                      className="pb-btn pb-btn-ghost mt-3 h-10 px-4 text-sm"
                    >
                      Read pasted text
                    </button>
                  </details>
                  <Nav back={() => go(0)} next={() => go(2)} nextLabel={fileName || status.kind === 'ok' ? 'Check my details' : 'Skip, fill in manually'} />
                </>
              )}

              {/* 3 · details */}
              {step === 2 && (
                <>
                  <StepHead n={3} title="Check your details" sub="Fix anything that’s wrong and pick your skills. The more you fill in, the better your profile." />
                  <div className="mb-8 flex items-center gap-4 rounded-2xl bg-neutral-50 p-4 ring-1 ring-neutral-200">
                    <div className="relative h-14 w-14 shrink-0">
                      <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90" aria-hidden>
                        <circle cx="18" cy="18" r="15.5" fill="none" stroke="#e5e5e5" strokeWidth="3.5" />
                        <motion.circle cx="18" cy="18" r="15.5" fill="none" stroke="#9114FF" strokeWidth="3.5" strokeLinecap="round" strokeDasharray="97.4" initial={false} animate={{ strokeDashoffset: 97.4 * (1 - pct / 100) }} transition={{ duration: 0.8, ease: EASE }} />
                      </svg>
                      <span className="absolute inset-0 grid place-items-center text-sm font-bold tabular-nums text-neutral-900">{pct}%</span>
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-950">Profile details {pct >= 80 ? 'look great' : 'complete'}</p>
                      <p className="text-sm text-neutral-500">{pct >= 80 ? 'You’re ready to create your profile.' : 'Add your projects and certifications for stronger content.'}</p>
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Full name" htmlFor="f-name"><input id="f-name" className="pb-input" value={form.name} onChange={(e) => update('name', e.target.value)} placeholder="e.g. Priya Sharma" autoComplete="name" /></Field>
                    <Field label="Current city" htmlFor="f-city"><input id="f-city" className="pb-input" value={form.city} onChange={(e) => update('city', e.target.value)} placeholder="e.g. Hyderabad" /></Field>
                    <Field label="Your profile type" htmlFor="f-type">
                      <select id="f-type" className="pb-input" value={form.type} onChange={(e) => update('type', e.target.value as ProfileForm['type'])}>
                        {profileTypes(role).map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
                      </select>
                    </Field>
                    <Field label="Total IT experience (years)" htmlFor="f-years"><input id="f-years" className="pb-input" type="number" min="0" step="0.5" inputMode="decimal" value={form.years} onChange={(e) => update('years', e.target.value)} placeholder="e.g. 3" /></Field>
                    <Field label="Current / last role" htmlFor="f-current"><input id="f-current" className="pb-input" value={form.current} onChange={(e) => update('current', e.target.value)} placeholder={ex.current} /></Field>
                    <Field label="Preferred locations" htmlFor="f-pref"><input id="f-pref" className="pb-input" value={form.pref} onChange={(e) => update('pref', e.target.value)} placeholder="e.g. Bangalore, Hyderabad, Remote" /></Field>
                  </div>

                  <div className="mt-8 rounded-2xl border border-neutral-200 p-4 sm:p-5">
                    <div className="flex flex-wrap items-end justify-between gap-3">
                      <div>
                        <p className="font-semibold text-neutral-900">{role.label} skills <span className="font-normal text-neutral-500">· tap to select</span></p>
                        <p className="mt-1 text-xs text-neutral-500"><Flame className="inline h-3.5 w-3.5 text-orange-500" /> Trending in 2026 job posts</p>
                      </div>
                      <button type="button" onClick={addTrending} className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3.5 py-1.5 text-xs font-semibold text-orange-700 ring-1 ring-orange-200 hover:bg-orange-100">
                        <Flame className="h-3.5 w-3.5" /> Add all trending
                      </button>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label={`${role.label} skills`}>
                      {role.skills.map((s) => {
                        const on = form.skills.includes(s.name);
                        return (
                          <button
                            key={s.name}
                            type="button"
                            aria-pressed={on}
                            onClick={() => toggleSkill(s.name)}
                            className={cn(
                              'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[0.8rem] font-medium transition-all duration-150 active:scale-95',
                              on ? 'border-[#9114FF] bg-[#9114FF] text-white' : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-400',
                            )}
                          >
                            {on ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : s.trending ? <Flame aria-label="Trending" className="h-3.5 w-3.5 text-orange-500" /> : null}
                            {s.name}
                          </button>
                        );
                      })}
                    </div>

                    <label htmlFor="f-custom" className="mb-1.5 mt-6 block text-sm font-semibold text-neutral-800">Other skills</label>
                    <div className="flex gap-2">
                      <input
                        id="f-custom"
                        className="pb-input"
                        value={customSkill}
                        onChange={(e) => setCustomSkill(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ',') {
                            e.preventDefault();
                            addCustom();
                          }
                        }}
                        placeholder={ex.other}
                      />
                      <button type="button" onClick={addCustom} aria-label="Add skill" className="grid h-[2.85rem] w-12 shrink-0 place-items-center rounded-xl bg-neutral-900 text-white hover:bg-neutral-700"><Plus className="h-4 w-4" /></button>
                    </div>
                    {otherList.length > 0 && (
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {otherList.map((s) => (
                          <li key={s}>
                            <button type="button" onClick={() => update('otherSkills', otherList.filter((x) => x !== s).join(', '))} className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-3 py-1.5 text-[0.82rem] font-medium text-neutral-800 hover:bg-rose-50 hover:text-rose-700" aria-label={`Remove ${s}`}>
                              {s} <span aria-hidden>×</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <div className="mt-8 grid gap-5">
                    <Field label="Certifications" htmlFor="f-certs" hint="Comma separated. Leave blank if none yet."><input id="f-certs" className="pb-input" value={form.certs} onChange={(e) => update('certs', e.target.value)} placeholder={ex.cert} /></Field>
                    <Field label="Project 1 (one line)" htmlFor="f-p1"><textarea id="f-p1" className="pb-input min-h-[88px] resize-y" value={form.p1} onChange={(e) => update('p1', e.target.value)} placeholder={ex.p1} /></Field>
                    <Field label="Project 2 (optional)" htmlFor="f-p2"><textarea id="f-p2" className="pb-input min-h-[88px] resize-y" value={form.p2} onChange={(e) => update('p2', e.target.value)} placeholder={ex.p2} /></Field>
                    <Field label="Notice period" htmlFor="f-notice" className="sm:max-w-xs">
                      <select id="f-notice" className="pb-input" value={form.notice} onChange={(e) => update('notice', e.target.value as ProfileForm['notice'])}>
                        {notices.map((n) => <option key={n}>{n}</option>)}
                      </select>
                    </Field>
                  </div>
                  <Nav back={() => go(1)} next={generate} nextLabel={<><Wand2 className="h-4 w-4" /> Create my profile</>} />
                </>
              )}

              {/* 4 · Naukri */}
              {step === 3 && generated && (
                <>
                  <StepHead n={4} title="Update your Naukri profile" sub="Follow the picture for each step, copy the text and paste it in the Naukri app." />
                  <GuideViewer platform="naukri" steps={g.naukri} blocks={nk} name={generated.name || undefined} content={nkScreen} checked={checks.naukri ?? []} onCheck={(i, v) => setCheck('naukri', i, v)} onFinish={() => go(4)} finishLabel="Naukri done, go to LinkedIn" />
                </>
              )}

              {/* 5 · LinkedIn */}
              {step === 4 && generated && (
                <>
                  <StepHead n={5} title="Update your LinkedIn profile" sub="Same idea: follow the picture, copy, paste, then tap “Done”." />
                  <GuideViewer platform="linkedin" steps={g.linkedin} blocks={li} name={generated.name || undefined} content={liScreen} checked={checks.linkedin ?? []} onCheck={(i, v) => setCheck('linkedin', i, v)} onFinish={() => go(5)} finishLabel="LinkedIn done" />
                </>
              )}

              {/* 6 · routine */}
              {step === 5 && generated && (
                <>
                  <div className="mb-8 flex items-start gap-4 rounded-2xl bg-gradient-to-br from-violet-50 to-white p-5 ring-1 ring-violet-100">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#9114FF] text-white"><PartyPopper className="h-5 w-5" /></span>
                    <div>
                      <p className="font-semibold text-neutral-950">Your profiles are ready, {generated.name.split(' ')[0] || 'well done'}!</p>
                      <p className="text-sm text-neutral-600">Now keep them active. Ten minutes a day is enough.</p>
                    </div>
                  </div>
                  <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-neutral-200 p-5 sm:flex-row sm:items-center">
                    <span className="grid h-12 w-10 shrink-0 place-items-center rounded-md bg-gradient-to-b from-violet-100 to-white text-[#9114FF] ring-1 ring-violet-200"><FileText className="h-5 w-5" /></span>
                    <div className="flex-1">
                      <p className="font-semibold text-neutral-950">Your profile pack</p>
                      <p className="text-sm text-neutral-600">Everything in one PDF: Naukri and LinkedIn content, step-by-step checklists and your daily routine. Keep it on your phone.</p>
                    </div>
                    <button type="button" onClick={() => openProfilePack(generated, outRole)} className="pb-btn pb-btn-primary h-10 shrink-0 px-5 text-[0.85rem]">
                      <Download className="h-4 w-4" /> Download PDF
                    </button>
                  </div>
                  <StepHead n={6} title="Your daily routine" sub="Recruiters often see recently active and recently updated profiles first. Tick these off each day." />
                  <div className="grid gap-6 lg:grid-cols-2">
                    <div className="rounded-2xl border border-neutral-200 p-5">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-semibold text-neutral-950">Every day · 10 minutes</p>
                        <button type="button" onClick={resetDaily} className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-neutral-500 ring-1 ring-neutral-200 hover:text-neutral-900"><RotateCcw className="h-3.5 w-3.5" /> Reset</button>
                      </div>
                      <ProgressBar className="mt-4" done={count('daily', g.daily.length)} total={g.daily.length} label="Daily tasks done" />
                      <Checklist idPrefix="pb-daily" items={g.daily} checked={checks.daily ?? []} onToggle={(i) => setCheck('daily', i)} />
                      <p className="mt-1 text-xs text-neutral-500">Daily ticks clear automatically each new day.</p>
                    </div>
                    <div className="space-y-6">
                      <div className="rounded-2xl border border-neutral-200 p-5">
                        <p className="font-semibold text-neutral-950">Every week</p>
                        <ProgressBar className="mt-4" done={count('weekly', g.weekly.length)} total={g.weekly.length} label="Weekly tasks done" />
                        <Checklist idPrefix="pb-weekly" items={g.weekly} checked={checks.weekly ?? []} onToggle={(i) => setCheck('weekly', i)} />
                      </div>
                      {note && <OutputCard block={note} />}
                    </div>
                  </div>
                  <p className="mt-6 rounded-2xl bg-amber-50 p-4 text-sm text-amber-900 ring-1 ring-amber-200">
                    Do all updates yourself in the official apps. Bots, auto-apply tools and browser extensions that act on your account can get it restricted or banned.
                  </p>
                  <Nav back={() => go(4)} extra={<button type="button" onClick={() => go(2)} className="pb-btn pb-btn-ghost h-12 px-5 text-sm">Edit my details</button>} />
                </>
              )}
            </motion.div>
          </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
}
