'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, FileText, Flame, Lock, RotateCcw, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';
import { checklists, guides, linkedin, naukri, profileTypes, screenContent } from '@/lib/profile-builder/engine';
import { roles } from '@/lib/profile-builder/roles';
import { sampleFileName, sampleForm } from '@/lib/profile-builder/sample';
import { cn, EASE } from '@/lib/utils';
import { Checklist, ProgressBar } from './Checklist';
import { GuideViewer } from './GuideViewer';
import { SectionHeader } from './primitives';

const TABS = [
  { id: 'analysis', label: 'Resume analysis', step: 'Steps 1–2' },
  { id: 'details', label: 'Profile details', step: 'Step 3' },
  { id: 'naukri', label: 'Naukri', step: 'Step 4' },
  { id: 'linkedin', label: 'LinkedIn', step: 'Step 5' },
  { id: 'routine', label: 'Daily routine', step: 'Step 6' },
] as const;
type Tab = (typeof TABS)[number]['id'];

/**
 * The real generator, running on a demo persona. Switch career track and
 * tab to see exactly what a student gets.
 */
export function InteractiveShowcase() {
  const [roleId, setRoleId] = useState(roles[0].id);
  const [tab, setTab] = useState<Tab>('analysis');
  const [ticks, setTicks] = useState<boolean[]>([true, true, false, false]);
  const role = roles.find((r) => r.id === roleId) ?? roles[0];
  const form = useMemo(() => sampleForm(role), [role]);
  const nk = useMemo(() => naukri(form, role), [form, role]);
  const li = useMemo(() => linkedin(form, role), [form, role]);
  const lists = useMemo(() => checklists(role), [role]);
  const g = useMemo(() => guides(role), [role]);
  const [nTicks, setNTicks] = useState<boolean[]>([]);
  const [lTicks, setLTicks] = useState<boolean[]>([]);
  const found = ['Name', 'City', `${form.years} yrs experience`, `${form.skills.length} skills`, 'Certification', '2 projects', 'Notice period'];

  return (
    <section id="showcase" aria-labelledby="showcase-title" className="relative scroll-mt-24 py-24 md:py-32">
      <div aria-hidden className="absolute left-1/2 top-40 -z-10 h-[30rem] w-[60rem] max-w-full -translate-x-1/2 rounded-full bg-[#9114FF]/[0.06] blur-[140px]" />
      <div className="container-x">
        <SectionHeader
          id="showcase-title"
          eyebrow="Interactive demo"
          title={<>See the whole workflow, <span className="pb-accent-text">live.</span></>}
          intro="This is the real tool running on a sample resume. Pick a career track and click through: the Naukri and LinkedIn steps show exactly where to tap."
        />

        {/* career track switcher */}
        <div className="no-scrollbar -mx-gutter mt-12 overflow-x-auto px-gutter">
          <div role="radiogroup" aria-label="Career track" className="mx-auto flex w-max gap-2">
            {roles.map((r) => (
              <button
                key={r.id}
                type="button"
                role="radio"
                aria-checked={r.id === roleId}
                onClick={() => setRoleId(r.id)}
                className={cn(
                  'flex items-center gap-2 whitespace-nowrap rounded-full border py-1.5 pl-1.5 pr-3.5 text-sm transition-colors duration-300',
                  r.id === roleId ? 'border-neutral-400 bg-neutral-100 text-neutral-950' : 'border-neutral-200 text-neutral-600 hover:border-neutral-300 hover:text-neutral-800',
                )}
              >
                <span className="grid h-6 w-6 place-items-center rounded-full bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.logo} alt="" className="h-3.5 w-3.5 object-contain" />
                </span>
                {r.label}
              </button>
            ))}
          </div>
        </div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.9, ease: EASE }} className="pb-beam relative mt-8 rounded-[22px] bg-white p-[1px] shadow-[0_40px_100px_-50px_rgba(145,20,255,0.35)]">
          <div className="overflow-hidden rounded-[21px] bg-white">
            {/* tabs */}
            <div className="no-scrollbar overflow-x-auto border-b border-neutral-200">
              <div role="tablist" aria-label="Profile Builder steps" className="flex w-max min-w-full gap-1 p-2">
                {TABS.map((t) => (
                  <button
                    key={t.id}
                    role="tab"
                    id={`tab-${t.id}`}
                    aria-selected={tab === t.id}
                    aria-controls="showcase-panel"
                    onClick={() => setTab(t.id)}
                    className={cn('relative flex-1 whitespace-nowrap rounded-xl px-4 py-2.5 text-left transition-colors', tab === t.id ? 'text-neutral-950' : 'text-neutral-600 hover:text-neutral-800')}
                  >
                    {tab === t.id && <motion.span layoutId="showcase-tab" className="absolute inset-0 rounded-xl border border-neutral-200 bg-neutral-100" transition={{ type: 'spring', bounce: 0.18, duration: 0.5 }} />}
                    <span className="relative block text-[0.65rem] uppercase tracking-wider text-neutral-500">{t.step}</span>
                    <span className="relative block text-sm font-semibold">{t.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div id="showcase-panel" role="tabpanel" aria-labelledby={`tab-${tab}`} className="p-4 sm:p-6 md:min-h-[32rem] md:p-8">
              <AnimatePresence mode="wait">
                <motion.div key={tab + role.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35, ease: EASE }}>
                  {tab === 'analysis' && (
                    <div className="grid gap-5 lg:grid-cols-2">
                      <div className="space-y-4">
                        <div className="rounded-xl border-2 border-dashed border-emerald-300 bg-emerald-50 p-6 text-center">
                          <span className="mx-auto grid h-11 w-11 place-items-center rounded-xl bg-emerald-100 text-emerald-600"><FileText className="h-5 w-5" /></span>
                          <p className="mt-3 break-all font-semibold text-neutral-950">✓ {sampleFileName(role)}</p>
                          <p className="mt-1 text-sm text-neutral-600">PDF, Word (.docx) or .txt · or paste your resume text</p>
                        </div>
                        <p className="flex items-center gap-2 text-sm text-neutral-600"><Lock className="h-4 w-4 text-emerald-600" /> Read inside your browser. Nothing is uploaded anywhere.</p>
                      </div>
                      <div className="pb-panel p-5">
                        <p className="text-sm font-semibold text-neutral-950">Analysis complete</p>
                        <p className="mt-1 text-sm text-neutral-600">Found these details automatically:</p>
                        <ul className="mt-4 flex flex-wrap gap-2">
                          {found.map((f, i) => (
                            <motion.li key={f} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.05 * i }} className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-300 bg-emerald-50 px-2.5 py-1 text-sm text-emerald-700">
                              <Check className="h-3.5 w-3.5" /> {f}
                            </motion.li>
                          ))}
                        </ul>
                        <div className="mt-6 flex items-center gap-3 rounded-lg border border-neutral-200 bg-neutral-50 p-3">
                          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={role.logo} alt="" className="h-6 w-6 object-contain" />
                          </span>
                          <div className="min-w-0">
                            <p className="text-xs text-neutral-500">Best-matching career track</p>
                            <p className="truncate font-semibold text-neutral-950">{role.title}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {tab === 'details' && (
                    <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
                      <dl className="grid gap-3 sm:grid-cols-2">
                        {[
                          ['Full name', form.name],
                          ['Current city', form.city],
                          ['Profile type', profileTypes(role).find((p) => p.value === form.type)?.label],
                          ['IT experience', `${form.years} years`],
                          ['Current / last role', form.current],
                          ['Preferred locations', form.pref],
                          ['Certification', form.certs],
                          ['Notice period', form.notice],
                        ].map(([k, v]) => (
                          <div key={k} className="rounded-lg border border-neutral-200 bg-neutral-50 px-3.5 py-2.5">
                            <dt className="text-xs text-neutral-500">{k}</dt>
                            <dd className="mt-0.5 truncate text-sm text-neutral-800">{v}</dd>
                          </div>
                        ))}
                      </dl>
                      <div className="pb-panel p-5">
                        <p className="text-sm font-semibold text-neutral-950">{role.label} skills</p>
                        <p className="mt-1 text-sm text-neutral-600">Tap to select. <Flame className="inline h-3.5 w-3.5 text-orange-500" /> marks skills trending in 2026 job posts.</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {role.skills.slice(0, 16).map((s) => {
                            const on = form.skills.includes(s.name);
                            return (
                              <span key={s.name} className={cn('inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[0.8rem]', on ? 'border-accent/60 bg-accent/20 text-neutral-950' : 'border-neutral-200 text-neutral-600')}>
                                {s.trending && <Flame className="h-3 w-3 text-orange-500" />}
                                {s.name}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}

                  {tab === 'naukri' && (
                    <GuideViewer key={`n-${role.id}`} platform="naukri" steps={g.naukri} blocks={nk} name={form.name} content={screenContent('naukri', form, role, nk)} checked={nTicks} onCheck={(i, v) => setNTicks((t) => { const n = [...t]; n[i] = v; return n; })} onFinish={() => setTab('linkedin')} finishLabel="Next: LinkedIn" />
                  )}

                  {tab === 'linkedin' && (
                    <GuideViewer key={`l-${role.id}`} platform="linkedin" steps={g.linkedin} blocks={li} name={form.name} content={screenContent('linkedin', form, role, li)} checked={lTicks} onCheck={(i, v) => setLTicks((t) => { const n = [...t]; n[i] = v; return n; })} onFinish={() => setTab('routine')} finishLabel="Next: Daily routine" />
                  )}

                  {tab === 'routine' && (
                    <div className="grid gap-6 lg:grid-cols-2">
                      <div className="pb-panel p-5">
                        <div className="flex items-center justify-between gap-3">
                          <p className="font-semibold text-neutral-950">Every day · 10 minutes</p>
                          <button type="button" onClick={() => setTicks([])} className="inline-flex items-center gap-1.5 text-xs text-neutral-600 hover:text-neutral-950"><RotateCcw className="h-3.5 w-3.5" /> Reset</button>
                        </div>
                        <ProgressBar className="mt-4" done={lists.daily.filter((_, i) => ticks[i]).length} total={lists.daily.length} />
                        <div className="mt-2">
                          <Checklist idPrefix="demo-daily" items={lists.daily} checked={ticks} onToggle={(i) => setTicks((t) => { const n = [...t]; n[i] = !n[i]; return n; })} />
                        </div>
                      </div>
                      <div className="pb-panel p-5">
                        <p className="font-semibold text-neutral-950">Every week</p>
                        <ul className="mt-3 divide-y divide-neutral-200">
                          {lists.weekly.map((w) => (
                            <li key={w} className="flex gap-3 py-3 text-[0.92rem] text-neutral-700"><Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-accent" />{w}</li>
                          ))}
                        </ul>
                        <p className="mt-4 rounded-lg border border-orange-200 bg-orange-50 p-3 text-sm text-amber-900">
                          Do every update yourself in the official apps. Bots and auto-apply tools can get your account restricted.
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
