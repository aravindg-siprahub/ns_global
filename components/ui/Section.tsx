import type { ComponentPropsWithoutRef, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Props = ComponentPropsWithoutRef<'section'> & { children: ReactNode; bleed?: boolean; tight?: boolean };

/** Consistent vertical rhythm + 1440px container */
export function Section({ children, className, bleed, tight, ...rest }: Props) {
  return (
    <section className={cn(tight ? 'py-20 md:py-28' : 'py-section', 'relative', className)} {...rest}>
      {bleed ? children : <div className="container-x">{children}</div>}
    </section>
  );
}
