import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'outline' | 'ghost';
type Common = { children: ReactNode; variant?: Variant; arrow?: boolean; className?: string; size?: 'md' | 'lg' | 'xl' };

/** Flat, square-cornered buttons. Hover = solid purple fill. No gradients, no motion gimmicks. */
const base = 'group inline-flex items-center justify-center gap-3 font-semibold transition-colors duration-300';
const variants: Record<Variant, string> = {
  primary: 'bg-fg text-ink hover:bg-accent hover:text-white',
  outline: 'border border-fg text-fg hover:border-accent hover:bg-accent hover:text-white',
  ghost: 'text-fg hover:text-accent',
};
const sizes = { md: 'h-11 px-5 text-sm', lg: 'h-14 px-8 text-base', xl: 'h-16 px-10 text-lg' };

function Arrow() {
  return (
    <svg aria-hidden width="14" height="14" viewBox="0 0 14 14" className="transition-transform duration-300 group-hover:translate-x-1">
      <path d="M1 7h12M8 2l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function ButtonLink({ href, children, variant = 'primary', arrow, className, size = 'lg', ...rest }: Common & { href: string } & Omit<ComponentPropsWithoutRef<'a'>, 'href'>) {
  return (
    <Link href={href} className={cn(base, variants[variant], sizes[size], className)} {...rest}>
      {children}
      {arrow && <Arrow />}
    </Link>
  );
}

export function Button({ children, variant = 'primary', arrow, className, size = 'lg', ...rest }: Common & ComponentPropsWithoutRef<'button'>) {
  return (
    <button className={cn(base, variants[variant], sizes[size], 'disabled:opacity-60', className)} {...rest}>
      {children}
      {arrow && <Arrow />}
    </button>
  );
}
