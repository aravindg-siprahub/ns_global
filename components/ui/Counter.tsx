'use client';
import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '@/hooks/useReducedMotion';

type Props = { value: number; suffix?: string; prefix?: string; duration?: number; className?: string };

/** Counts up once when scrolled into view. Server HTML shows the final value. */
export function Counter({ value, suffix = '', prefix = '', duration = 2200, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    setN(0);
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          const p = Math.min(1, (t - t0) / duration);
          setN(Math.round(value * (1 - Math.pow(1 - p, 4))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      <span aria-hidden>
        {prefix}
        {n.toLocaleString('en-US')}
        {suffix}
      </span>
      <span className="sr-only">
        {prefix}
        {value.toLocaleString('en-US')}
        {suffix}
      </span>
    </span>
  );
}
