'use client';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Camera, Check, CheckCircle2, ChevronRight, FileText, Menu, Pencil, Plus, Pointer, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { screens, type Platform } from '@/lib/profile-builder/engine';
import { cn, EASE } from '@/lib/utils';

type Props = {
  platform: Platform;
  focus: string;
  action: string;
  name?: string;
  /** Text shown in each section (the user's own generated content) */
  content?: Record<string, string>;
  /** Sections the user has already completed */
  done?: string[];
  className?: string;
};

const PLUS = /Projects|IT skills|Accomplishments|Licenses|Featured|Skills|Start a post/;

/** Types text into the focused field, like a real paste + save */
function Typewriter({ text, onDone }: { text: string; onDone: () => void }) {
  const reduce = useReducedMotion();
  const short = text.length > 150 ? `${text.slice(0, 150)}…` : text;
  const [n, setN] = useState(reduce ? short.length : 0);
  useEffect(() => {
    if (reduce) {
      setN(short.length);
      onDone();
      return;
    }
    setN(0);
    let i = 0;
    let id = 0;
    const start = window.setTimeout(() => {
      id = window.setInterval(() => {
        i += Math.max(2, Math.round(short.length / 45));
        setN(Math.min(i, short.length));
        if (i >= short.length) {
          window.clearInterval(id);
          onDone();
        }
      }, 28);
    }, 900);
    return () => {
      window.clearTimeout(start);
      window.clearInterval(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [short, reduce]);
  return (
    <span>
      {short.slice(0, n)}
      {n < short.length && <span className="ml-px inline-block h-3 w-[1.5px] translate-y-0.5 animate-pulse bg-[#9114FF]" />}
    </span>
  );
}

function Chips({ text, muted }: { text: string; muted?: boolean }) {
  return (
    <span className="flex flex-wrap gap-1">
      {text.split(' · ').filter(Boolean).slice(0, 5).map((s) => (
        <span key={s} className={cn('rounded-full border px-1.5 py-px text-[8.5px] font-medium', muted ? 'border-neutral-200 text-neutral-600' : 'border-violet-200 bg-violet-50 text-[#7a0fe0]')}>{s}</span>
      ))}
    </span>
  );
}

/** Animated finger that moves in and taps the target */
function Finger({ className }: { className?: string }) {
  return (
    <motion.span
      aria-hidden
      initial={{ x: 40, y: 50, opacity: 0 }}
      animate={{ x: 0, y: 0, opacity: 1, scale: [1, 1, 0.82, 1] }}
      transition={{ duration: 0.9, ease: EASE, scale: { times: [0, 0.7, 0.85, 1], duration: 0.9 } }}
      className={cn('pointer-events-none absolute z-30 text-neutral-900 drop-shadow-[0_2px_4px_rgba(0,0,0,0.25)]', className)}
    >
      <span className="pb-tap absolute -left-1 -top-1 h-6 w-6 rounded-full bg-[#9114FF]/40" />
      <Pointer className="relative h-6 w-6 fill-white" strokeWidth={1.6} />
    </motion.span>
  );
}

function Bubble({ children, className }: { children: string; className?: string }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 4, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.4, ease: EASE }}
      className={cn('absolute z-20 whitespace-nowrap rounded-lg bg-neutral-900 px-2.5 py-1 text-[10px] font-semibold text-white shadow-lg', className)}
    >
      {children}
    </motion.span>
  );
}

/**
 * A realistic drawing of the user's own Naukri / LinkedIn profile.
 * It fills up as steps are completed; the current section animates a tap
 * and the generated text "typing" in. Not a screenshot of the real app.
 */
export function PhoneMock({ platform, focus, action, name = 'Your Name', content = {}, done = [], className }: Props) {
  const rows = screens[platform].filter((r) => platform === 'naukri' || (r !== 'Photo & banner' && r !== 'Headline'));
  const idx = Math.max(0, rows.indexOf(focus));
  const start = Math.min(Math.max(0, idx - 1), rows.length - 4);
  const visible = rows.slice(start, start + 4);
  const initials = name.split(' ').map((w) => w[0]).filter(Boolean).slice(0, 2).join('').toUpperCase() || 'YN';
  const [saved, setSaved] = useState(false);
  useEffect(() => setSaved(false), [focus, platform]);
  const isDone = (s: string) => done.includes(s);
  const pct = Math.round(45 + (55 * done.length) / screens[platform].length);
  const liHeadline = isDone('Headline') || (focus === 'Headline' && saved) ? content.Headline : '';
  const openToWork = isDone('Open to work');
  const hasPhoto = isDone('Photo & banner');

  return (
    <figure className={cn('mx-auto w-[240px] select-none', className)} aria-label={`Illustration of the ${platform === 'naukri' ? 'Naukri' : 'LinkedIn'} app with ${focus === 'menu' ? 'the menu' : focus} highlighted`}>
      <div className="relative rounded-[2.4rem] bg-gradient-to-b from-neutral-700 to-neutral-900 p-[7px] shadow-[0_40px_70px_-30px_rgba(0,0,0,0.45),inset_0_1px_1px_rgba(255,255,255,0.25)]">
        <div className="relative h-[470px] overflow-hidden rounded-[1.95rem] bg-neutral-50">
          {/* status bar */}
          <div className="flex h-7 items-center justify-between bg-white px-5 text-[9px] font-semibold text-neutral-900">
            <span>9:41</span>
            <span className="h-[18px] w-[72px] rounded-full bg-neutral-900" />
            <span className="h-1.5 w-3 rounded-sm bg-neutral-900" />
          </div>
          {/* app bar */}
          <div className="relative flex h-10 items-center gap-2.5 border-b border-neutral-200 bg-white px-3">
            <Menu className="h-4 w-4 text-neutral-800" />
            <span className="text-[13px] font-bold tracking-tight text-neutral-900">{platform === 'naukri' ? 'Naukri' : 'LinkedIn'}</span>
            <Search className="ml-auto h-3.5 w-3.5 text-neutral-600" />
            {focus === 'menu' && <Finger className="left-2 top-3" />}
          </div>

          {/* profile header */}
          {platform === 'linkedin' ? (
            <div className={cn('relative bg-white pb-3', (focus === 'Photo & banner' || focus === 'Headline') && 'shadow-[inset_0_0_0_2px_#9114FF]')}>
              <div className={cn('relative h-14 transition-colors duration-700', hasPhoto ? 'bg-gradient-to-r from-[#9114FF] via-fuchsia-400 to-amber-200' : 'bg-neutral-200')}>
                {!hasPhoto && <span className="absolute right-2 top-2 grid h-5 w-5 place-items-center rounded-full bg-white text-neutral-600"><Camera className="h-3 w-3" /></span>}
              </div>
              <span className={cn('absolute left-3 top-6 grid h-[52px] w-[52px] place-items-center rounded-full border-[3px] text-xs font-bold transition-colors duration-700', openToWork ? 'border-emerald-500' : 'border-white', hasPhoto ? 'bg-gradient-to-br from-violet-200 to-fuchsia-200 text-[#5b0aa8]' : 'bg-neutral-300 text-neutral-600')}>
                {initials}
                {openToWork && <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-emerald-500 px-1 text-[6px] font-bold text-white">#OPENTOWORK</span>}
              </span>
              {focus === 'Photo & banner' && <Finger className="left-12 top-14" />}
              {focus === 'Photo & banner' && <Bubble className="left-20 top-[3.6rem]">{action}</Bubble>}
              <div className="relative px-3 pt-8">
                <p className="text-[12px] font-bold text-neutral-900">{name}</p>
                <p className="mt-0.5 line-clamp-2 min-h-[2.4em] pr-5 text-[9px] leading-snug text-neutral-600">
                  {focus === 'Headline' && !isDone('Headline') && content.Headline ? (
                    <Typewriter text={content.Headline} onDone={() => setSaved(true)} />
                  ) : (
                    liHeadline || <span className="italic text-neutral-400">Add a headline</span>
                  )}
                </p>
                <Pencil className="absolute right-3 top-8 h-3 w-3 text-neutral-500" />
                {focus === 'Headline' && <Finger className="right-0 top-6" />}
                {focus === 'Headline' && <Bubble className="right-2 top-[-0.4rem]">{action}</Bubble>}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2.5 bg-white px-3 py-3">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-violet-200 to-fuchsia-200 text-[11px] font-bold text-[#5b0aa8]">{initials}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12px] font-bold text-neutral-900">{name}</p>
                <div className="mt-1 flex items-center gap-1.5">
                  <span className="h-1 flex-1 overflow-hidden rounded-full bg-neutral-200">
                    <motion.span className="block h-full rounded-full bg-emerald-500" initial={false} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, ease: EASE }} />
                  </span>
                  <span className="text-[8.5px] tabular-nums text-neutral-500">Profile {pct}%</span>
                </div>
              </div>
            </div>
          )}

          {/* sections — slide like a real scrolling screen */}
          <div className="space-y-2 p-2.5">
            <AnimatePresence initial={false} mode="popLayout">
              {visible.map((r) => {
                const on = r === focus;
                const text = content[r] ?? '';
                const filled = isDone(r) || (on && saved);
                if (r === 'Open to work') {
                  return (
                    <motion.div layout key={r} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.45, ease: EASE }} className="relative flex gap-1.5">
                      {['Open to', 'Add section', 'More'].map((t, i) => (
                        <span key={t} className={cn('rounded-full px-2.5 py-1 text-[9.5px] font-semibold', i === 0 ? 'bg-neutral-900 text-white' : 'border border-neutral-300 bg-white text-neutral-600', i === 0 && on && 'ring-2 ring-[#9114FF] ring-offset-1')}>{t}</span>
                      ))}
                      {on && <Finger className="left-7 top-2" />}
                      {on && <Bubble className="left-0 top-8">{action}</Bubble>}
                    </motion.div>
                  );
                }
                return (
                  <motion.div
                    layout
                    key={r}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -14 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className={cn('relative rounded-xl border bg-white px-3 py-2.5 transition-[border-color,box-shadow] duration-300', on ? 'border-[#9114FF] shadow-[0_0_0_3px_rgba(145,20,255,0.14)]' : 'border-neutral-200')}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className={cn('flex items-center gap-1 text-[10.5px] font-semibold', on ? 'text-[#7a0fe0]' : 'text-neutral-800')}>
                        {r}
                        {filled && !on && <CheckCircle2 className="h-3 w-3 text-emerald-500" />}
                      </span>
                      {r === 'Resume' ? (
                        <span className="rounded-full bg-violet-50 px-2 py-0.5 text-[8.5px] font-semibold text-[#7a0fe0]">Update</span>
                      ) : PLUS.test(r) && !filled ? (
                        <Plus className="h-3 w-3 text-neutral-500" />
                      ) : (
                        <Pencil className="h-3 w-3 text-neutral-500" />
                      )}
                    </div>
                    <div className="mt-1.5 min-h-[1.5rem] text-[9px] leading-snug text-neutral-700">
                      {on && text && !isDone(r) ? (
                        (r === 'Key skills' || r === 'Skills') && saved ? (
                          <Chips text={text} />
                        ) : r === 'Resume' ? (
                          <span className="flex items-center gap-1.5"><FileText className="h-3 w-3 shrink-0 text-[#9114FF]" /><span className="truncate"><Typewriter text={text} onDone={() => setSaved(true)} /></span></span>
                        ) : (
                          <span className="line-clamp-3"><Typewriter text={text.replace(/ · /g, ', ')} onDone={() => setSaved(true)} /></span>
                        )
                      ) : filled && text ? (
                        r === 'Key skills' || r === 'Skills' ? (
                          <Chips text={text} muted />
                        ) : r === 'Resume' ? (
                          <span className="flex items-center gap-1.5"><FileText className="h-3 w-3 shrink-0 text-neutral-400" /><span className="truncate">{text}</span></span>
                        ) : (
                          <span className="line-clamp-2">{text}</span>
                        )
                      ) : (
                        <span className="italic text-neutral-400">{r === 'Start a post' ? 'What do you want to talk about?' : `Add ${r.toLowerCase()}`}</span>
                      )}
                    </div>
                    {on && <Finger className="-right-1 top-3" />}
                    {on && <Bubble className="right-0 top-[-1.6rem]">{action}</Bubble>}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Naukri side menu */}
          <AnimatePresence>
            {focus === 'menu' && (
              <>
                <motion.div key="shade" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: 0.4 }} className="absolute inset-0 top-7 z-10 bg-neutral-900/25" />
                <motion.div key="drawer" initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ delay: 0.5, duration: 0.5, ease: EASE }} className="absolute bottom-0 left-0 top-7 z-20 w-[80%] bg-white p-3 shadow-2xl">
                  <div className="flex items-center gap-2.5">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-violet-200 to-fuchsia-200 text-[11px] font-bold text-[#5b0aa8]">{initials}</span>
                    <div className="min-w-0">
                      <p className="truncate text-[11.5px] font-bold text-neutral-900">{name}</p>
                      <p className="mt-0.5 inline-flex items-center rounded-md px-1 text-[9.5px] font-semibold text-[#7a0fe0] ring-2 ring-[#9114FF]">
                        View & Update Profile <ChevronRight className="h-3 w-3" />
                      </p>
                    </div>
                  </div>
                  <Bubble className="left-12 top-[3.7rem]">Then tap here</Bubble>
                  <ul className="mt-12 space-y-3 text-[10px] text-neutral-600">
                    {['Search jobs', 'Recommended jobs', 'Applies', 'Saved jobs', 'Settings'].map((t) => <li key={t}>{t}</li>)}
                  </ul>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* saved toast */}
          <AnimatePresence>
            {saved && (
              <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 40, opacity: 0 }} transition={{ duration: 0.4, ease: EASE }} className="absolute inset-x-3 bottom-4 z-30 flex items-center gap-2 rounded-xl bg-neutral-900 px-3 py-2 text-[10px] font-medium text-white shadow-xl">
                <span className="grid h-4 w-4 place-items-center rounded-full bg-emerald-500"><Check className="h-2.5 w-2.5" strokeWidth={3} /></span>
                Saved successfully
              </motion.div>
            )}
          </AnimatePresence>
          <span className="absolute bottom-1.5 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-neutral-900/80" />
        </div>
      </div>
      <figcaption className="mt-3 text-center text-[11px] text-neutral-500">Preview of your profile. The real app may look slightly different.</figcaption>
    </figure>
  );
}
