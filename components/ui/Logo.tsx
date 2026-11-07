import { cn } from '@/lib/utils';

/**
 * Compact mark ("n/") for tight spaces — same geometry as the favicon in app/icon.svg.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn('h-9 w-9 shrink-0', className)} aria-hidden>
      <rect width="40" height="40" rx="9" fill="#000" />
      <path d="M8 28V14h4.4v2.1c1.2-1.6 3-2.5 5.1-2.5 3.7 0 5.7 2.4 5.7 6.3V28h-4.5v-7.3c0-2-.9-3-2.6-3-1.9 0-3.2 1.3-3.2 3.6V28Z" fill="#fff" />
      <polygon points="25,31 28.8,31 35,9 31.2,9" fill="#9114FF" />
    </svg>
  );
}

/** Primary wordmark: "ns/global" with a purple code slash and a small "TECH" tag */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-start gap-1.5 leading-none', className)}>
      <span className="font-display text-[1.35rem] font-extrabold lowercase tracking-[-0.03em]">
        ns<span className="text-accent">/</span>global
      </span>
      <span className="mt-[2px] font-mono text-[0.52rem] font-medium uppercase tracking-[0.3em]">Tech</span>
    </span>
  );
}
