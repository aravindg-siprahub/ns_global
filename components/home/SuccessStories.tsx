'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { testimonials } from '@/lib/content';
import { cn } from '@/lib/utils';

const AUTO_MS = 7000;

/**
 * Infosys-style "top stories" slider: image + text card, the next story
 * peeking on the right, a 1 / N counter with arrows. Auto-advances, pauses
 * on hover/focus, supports swipe and arrow keys.
 */
export function SuccessStories() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const startX = useRef<number | null>(null);
  const n = testimonials.length;
  const go = (k: number) => setI(((k % n) + n) % n);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setTimeout(() => go(i + 1), AUTO_MS);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i, paused]);

  return (
    <section
      aria-labelledby="stories-title"
      aria-roledescription="carousel"
      className="overflow-hidden bg-[#e9edf4] py-20 md:py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(i + 1);
        if (e.key === 'ArrowLeft') go(i - 1);
      }}
    >
      <div className="container-x">
        <div className="mb-10 flex items-center justify-between">
          <h2 id="stories-title" className="font-mono text-label uppercase tracking-[0.14em] text-[#1d2a5b]">Student success stories</h2>
          <div className="flex items-center gap-3 text-sm text-[#1d2a5b]">
            <button type="button" onClick={() => go(i - 1)} aria-label="Previous story" className="grid h-9 w-9 place-items-center rounded-full border border-[#1d2a5b]/25 transition-colors hover:bg-[#1d2a5b] hover:text-white">←</button>
            <span className="min-w-[3ch] text-center tabular-nums" aria-live="polite">{i + 1} / {n}</span>
            <button type="button" onClick={() => go(i + 1)} aria-label="Next story" className="grid h-9 w-9 place-items-center rounded-full border border-[#1d2a5b]/25 transition-colors hover:bg-[#1d2a5b] hover:text-white">→</button>
          </div>
        </div>

        <div
          className="touch-pan-y"
          onPointerDown={(e) => (startX.current = e.clientX)}
          onPointerUp={(e) => {
            if (startX.current === null) return;
            const dx = e.clientX - startX.current;
            if (Math.abs(dx) > 50) go(i + (dx < 0 ? 1 : -1));
            startX.current = null;
          }}
        >
          <ul
            className="flex gap-6 transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]"
            style={{ transform: `translateX(calc(${-i} * (var(--slide) + 1.5rem)))`, ['--slide' as string]: 'min(78vw, 860px)' }}
          >
            {testimonials.map((t, k) => (
              <li
                key={t.name}
                aria-hidden={k !== i}
                className={cn('w-[var(--slide)] shrink-0 transition-opacity duration-700', k === i ? 'opacity-100' : 'opacity-60')}
              >
                <figure className="grid h-full overflow-hidden rounded-2xl bg-white md:grid-cols-[42%_1fr]">
                  <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[300px]">
                    <Image src={t.image} alt="" fill sizes="(min-width:768px) 360px, 78vw" className="object-cover" />
                  </div>
                  <div className="flex flex-col justify-between gap-8 p-7 md:p-10">
                    <blockquote className="text-lg leading-relaxed text-[#1d2a5b] md:text-xl">“{t.quote}”</blockquote>
                    <figcaption className="flex items-center gap-4">
                      <span className="grid h-11 w-11 place-items-center rounded-full bg-[#1d2a5b] font-display font-bold text-white" aria-hidden>{t.name[0]}</span>
                      <span>
                        <span className="block font-bold text-[#1d2a5b]">{t.name}</span>
                        <span className="block text-sm text-[#1d2a5b]/70">{t.course} graduate</span>
                      </span>
                    </figcaption>
                  </div>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
