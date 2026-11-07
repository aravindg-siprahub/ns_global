'use client';
import type { ReactNode } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

/** Fades + lifts children marked with [data-reveal] (or itself when `self`) as they enter */
export function Reveal({ children, className, stagger = 0.08, self = false }: { children: ReactNode; className?: string; stagger?: number; self?: boolean }) {
  const ref = useScrollReveal<HTMLDivElement>({ targets: self ? undefined : '[data-reveal]', stagger });
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
