'use client';
import { useRef } from 'react';
import { gsap, ScrollTrigger, onEnter } from '@/lib/gsap';
import { useIsoLayoutEffect } from './useIsoLayoutEffect';
import { prefersReducedMotion } from './useReducedMotion';

type Options = {
  /** CSS selector for children to stagger; defaults to the element itself */
  targets?: string;
  y?: number;
  stagger?: number;
  start?: string;
  /** image reveal: clip-path + scale 1.15 → 1 */
  image?: boolean;
  delay?: number;
};

/**
 * Reveals an element (or its children) when it enters the viewport.
 * Content is fully visible in the server HTML; GSAP only sets the
 * hidden "from" state once JS is running, so there is never a blank page.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(opts: Options = {}) {
  const ref = useRef<T>(null);
  const { targets, y = 40, stagger = 0.08, image = false, delay = 0 } = opts;

  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    let stop = () => {};
    const ctx = gsap.context(() => {
      const items = targets ? Array.from(el.querySelectorAll<HTMLElement>(targets)) : [el];
      if (!items.length) return;
      const imgs = items.map((i) => i.querySelector('img') ?? i);
      if (image) {
        gsap.set(items, { clipPath: 'inset(100% 0% 0% 0%)' });
        gsap.set(imgs, { scale: 1.15 });
      } else {
        gsap.set(items, { y, opacity: 0 });
      }
      stop = onEnter(el, () =>
        ctx.add(() => {
          if (image) {
            gsap.to(items, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, stagger, delay });
            gsap.to(imgs, { scale: 1, duration: 1.6, stagger, delay });
          } else {
            gsap.to(items, { y: 0, opacity: 1, duration: 0.8, stagger, delay });
          }
        }),
      );
    }, el);
    return () => {
      stop();
      ctx.revert();
    };
  }, [targets, y, stagger, image, delay]);

  return ref;
}

export { ScrollTrigger };
