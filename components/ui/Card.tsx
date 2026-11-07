import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** Flat, square-cornered surface. Hover: purple top rule. */
export function Card({ children, className }: { children: ReactNode; className?: string; tilt?: number; glow?: boolean; cursorLabel?: string }) {
  return (
    <div className={cn('relative border-t-[3px] border-transparent bg-surface transition-colors duration-300 hover:border-accent', className)}>
      {children}
    </div>
  );
}
