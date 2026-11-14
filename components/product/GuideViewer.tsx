'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, PartyPopper } from 'lucide-react';
import { useRef, useState, type ReactNode } from 'react';
import type { GuideStep, OutputBlock, Platform } from '@/lib/profile-builder/engine';
import { cn, EASE } from '@/lib/utils';
import { Rich, ProgressBar } from './Checklist';
import { OutputCard } from './OutputCard';
import { PhoneMock } from './PhoneMock';
import { RealShot } from './RealShot';
import { scrollToTop } from './scrollTo';
import { shots } from '@/lib/profile-builder/shots';
import { fireConfetti } from './confetti';

/** Numbered sub-step inside a guide step: ① Click here → ② Copy → ③ Paste & save */
function Part({ n, title, hint, children }: { n: number; title: string; hint?: string; children: ReactNode }) {
  return (
    <li className="relative pl-10">
      <span className="absolute left-0 top-0 grid h-7 w-7 place-items-center rounded-full bg-[#9114FF] text-[0.75rem] font-bold text-white shadow-[0_6px_14px_-6px_rgba(145,20,255,0.8)]">{n}</span>
      <p className="pt-0.5 text-[0.95rem] font-semibold text-neutral-950">{title}</p>
      {hint && <p className="mt-0.5 text-[0.8rem] text-neutral-500">{hint}</p>}
      <div className="mt-3">{children}</div>
    </li>
  );
}

type Props = {
  platform: Platform;
  steps: GuideStep[];
  blocks: OutputBlock[];
  name?: string;
  /** The user's own text for each section of the phone picture */
  content?: Record<string, string>;
  checked: boolean[];
  onCheck: (i: number, value: boolean) => void;
  onFinish?: () => void;
  finishLabel?: string;
};

/**
 * One instruction at a time: a live phone preview shows where to tap and
 * fills in as you go; the right side says what to do and holds the text to paste.
 */
export function GuideViewer({ platform, steps, blocks, name, content, checked, onCheck, onFinish, finishLabel = 'Finish' }: Props) {
  const firstOpen = steps.findIndex((_, i) => !checked[i]);
  const [i, setI] = useState(firstOpen < 0 ? 0 : firstOpen);
  const step = steps[Math.min(i, steps.length - 1)];
  const done = steps.filter((_, k) => checked[k]).length;
  const last = i === steps.length - 1;
  const outs = (step.outputs ?? []).map((k) => blocks.find((b) => b.key === k)).filter((b): b is OutputBlock => !!b);
  const label = platform === 'naukri' ? 'Naukri' : 'LinkedIn';
  const shot = shots[platform]?.[step.focus];
  const rootRef = useRef<HTMLDivElement>(null);
  const pendingScroll = useRef(false);
  const goTo = (n: number) => {
    pendingScroll.current = true;
    setI(n);
  };
  const doneSections =steps.filter((_, k) => checked[k]).map((s) => s.focus);

  const next = () => {
    onCheck(i, true);
    if (last) {
      fireConfetti();
      onFinish?.();
    } else goTo(i + 1);
  };

  return (
    <div ref={rootRef} className="[overflow-anchor:none]">
      {/* progress + step dots */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold text-neutral-900">
          Step {i + 1} <span className="font-normal text-neutral-500">of {steps.length}</span>
        </p>
        <ProgressBar className="w-full sm:w-56" done={done} total={steps.length} label={`${label} steps done`} />
      </div>
      <ol className="no-scrollbar -mx-1 mt-3 flex gap-1.5 overflow-x-auto px-1 pb-1" aria-label={`${label} steps`}>
        {steps.map((s, k) => (
          <li key={s.title}>
            <button
              type="button"
              onClick={() => goTo(k)}
              aria-current={k === i ? 'step' : undefined}
              title={s.title}
              className={cn(
                'grid h-8 w-8 place-items-center rounded-full border text-[0.72rem] font-semibold transition-all duration-200',
                k === i ? 'scale-110 border-[#9114FF] bg-[#9114FF] text-white shadow-[0_6px_16px_-6px_rgba(145,20,255,0.7)]' : checked[k] ? 'border-emerald-300 bg-emerald-50 text-emerald-600' : 'border-neutral-200 bg-white text-neutral-500 hover:border-neutral-400',
              )}
            >
              {checked[k] && k !== i ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : k + 1}
            </button>
          </li>
        ))}
      </ol>

      <div className="mt-6 grid items-start gap-8 lg:grid-cols-[250px_1fr] lg:gap-10">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+1.25rem)]">
          <PhoneMock platform={platform} focus={step.focus} action={step.action} name={name} content={content} done={doneSections} />
        </div>

        <AnimatePresence
          mode="wait"
          onExitComplete={() => {
            if (!pendingScroll.current) return;
            pendingScroll.current = false;
            requestAnimationFrame(() => scrollToTop(rootRef.current));
          }}
        >
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.22, ease: EASE }} className="min-w-0">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 px-2.5 py-1 text-[0.7rem] font-semibold text-[#7a0fe0]">
              {label} · Step {i + 1}
            </span>
            <h3 className="mt-3 text-xl font-semibold tracking-tight text-neutral-950 md:text-[1.35rem]">{step.title}</h3>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-neutral-600">
              <Rich text={step.text} />
            </p>
            <ol className="mt-6 space-y-6">
              {shot && (
                <Part n={1} title={shot.length > 1 ? 'Click here (in this order)' : 'Click here'}>
                  <div className="space-y-4">
                    {shot.map((s, k) => <RealShot key={step.focus + k} shot={s} n={shot.length > 1 ? k + 1 : undefined} />)}
                  </div>
                </Part>
              )}
              {outs.length > 0 && (
                <Part n={shot ? 2 : 1} title={outs.length > 1 ? 'Copy one of these' : 'Copy this'} hint="Tap the purple Copy button: it copies the whole text for you.">
                  <div className="space-y-3">{outs.map((b) => <OutputCard key={b.key} block={b} maxHeight="max-h-72" />)}</div>
                </Part>
              )}
              {outs.length > 0 && (
                <Part n={shot ? 3 : 2} title="Paste & save">
                  <p className="text-[0.9rem] text-neutral-600">
                    Paste it in the box (<kbd className="rounded border border-neutral-300 bg-neutral-50 px-1.5 text-[0.75rem]">Ctrl</kbd> + <kbd className="rounded border border-neutral-300 bg-neutral-50 px-1.5 text-[0.75rem]">V</kbd>, or long-press → Paste on a phone), then click <strong className="text-neutral-900">Save</strong>.
                  </p>
                </Part>
              )}
            </ol>

            <div className="mt-7 flex flex-wrap items-center gap-2.5 border-t border-neutral-100 pt-5">
              <button type="button" onClick={() => goTo(Math.max(0, i - 1))} disabled={i === 0} className="pb-btn pb-btn-ghost h-10 px-4 text-[0.85rem]">
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              <button type="button" onClick={next} className="pb-btn pb-btn-primary h-10 flex-1 px-5 text-[0.85rem] sm:flex-none">
                {last ? <>{finishLabel} <PartyPopper className="h-4 w-4" /></> : <>Done, next step <ArrowRight className="h-4 w-4" /></>}
              </button>
              {checked[i] && <span className="inline-flex items-center gap-1 text-[0.85rem] font-medium text-emerald-600"><Check className="h-4 w-4" /> Done</span>}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
