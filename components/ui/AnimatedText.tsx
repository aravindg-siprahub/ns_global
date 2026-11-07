'use client';
import { createElement, useRef, type ElementType } from 'react';
import { gsap, onEnter } from '@/lib/gsap';
import { useIsoLayoutEffect } from '@/hooks/useIsoLayoutEffect';
import { prefersReducedMotion } from '@/hooks/useReducedMotion';
import { splitLines } from '@/hooks/useSplitText';
import { cn } from '@/lib/utils';

type Props = {
  text: string;
  as?: ElementType;
  className?: string;
  /** 'scroll' reveals on enter, 'load' plays immediately (above-the-fold) */
  trigger?: 'scroll' | 'load';
  delay?: number;
  /** stagger per word in seconds (40–60ms) */
  stagger?: number;
  /** word indexes (0-based) rendered with the accent gradient */
  highlight?: number[];
  id?: string;
  /** optional class per line (e.g. right-align line 2) */
  lineClassName?: string[];
};

/** Signature text reveal: each word slides up from behind a mask. Use "\n" for line breaks. */
export function AnimatedText({ text, as = 'h2', className, trigger = 'scroll', delay = 0, stagger = 0.05, highlight = [], id, lineClassName = [] }: Props) {
  const ref = useRef<HTMLElement>(null);
  const lines = splitLines(text);

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const words = el.querySelectorAll('[data-word]');
    let stop = () => {};
    const ctx = gsap.context(() => {
      gsap.set(words, { yPercent: 115 });
      const play = (d: number) => gsap.to(words, { yPercent: 0, duration: d, stagger, delay, ease: 'expo.out' });
      if (trigger === 'load') play(1.3);
      else stop = onEnter(el, () => ctx.add(() => play(0.9)));
    }, el);
    return () => {
      stop();
      ctx.revert();
    };
  }, [text, trigger, delay, stagger]);

  let n = -1;
  return createElement(
    as,
    { ref, className: cn(className), id, 'aria-label': text.replace(/\n/g, ' ') },
    lines.map((line, li) => (
      <span key={li} className={cn("block", lineClassName[li])} aria-hidden="true">
        {line.map((w) => {
          n++;
          return (
            <span key={n} className="mask-line mr-[0.22em] last:mr-0">
              <span data-word className={cn('inline-block will-change-transform', highlight.includes(n) && 'text-gradient')}>
                {w}
              </span>
            </span>
          );
        })}
      </span>
    )),
  );
}
