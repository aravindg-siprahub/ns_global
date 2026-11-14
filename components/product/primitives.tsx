'use client';
import { motion, MotionConfig, type HTMLMotionProps } from 'framer-motion';
import { useCallback, type ReactNode, type PointerEvent } from 'react';
import { cn, EASE } from '@/lib/utils';

/** Honour the visitor's "reduce motion" setting for every framer animation inside */
export function ProductMotion({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/** Fade + lift into view once */
export function FadeIn({ children, delay = 0, y = 24, className, ...rest }: { children: ReactNode; delay?: number; y?: number; className?: string } & Omit<HTMLMotionProps<'div'>, 'children'>) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: EASE, delay }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Card with a soft violet spotlight that follows the pointer */
export function SpotlightCard({ children, className, as: Tag = 'div' }: { children: ReactNode; className?: string; as?: 'div' | 'article' | 'li' }) {
  const onMove = useCallback((e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
  }, []);
  return (
    <Tag onPointerMove={onMove} className={cn('pb-card pb-spot overflow-hidden', className)}>
      {children}
    </Tag>
  );
}

/** Section intro: small pill, big gradient title, supporting copy */
export function SectionHeader({ eyebrow, title, intro, align = 'center', id, className }: { eyebrow: string; title: ReactNode; intro?: ReactNode; align?: 'center' | 'left'; id?: string; className?: string }) {
  return (
    <FadeIn className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}>
      <span className="pb-pill">
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
        {eyebrow}
      </span>
      <h2 id={id} className="pb-title mt-5 font-display text-[clamp(1.75rem,3.2vw,2.75rem)] font-bold leading-[1.04] tracking-[-0.035em]">
        {title}
      </h2>
      {intro && <p className={cn('mt-5 text-base leading-relaxed text-muted md:text-lg', align === 'center' && 'mx-auto max-w-2xl')}>{intro}</p>}
    </FadeIn>
  );
}

/** Coloured platform badge (we don't use the platforms' logos) */
export function PlatformTag({ name, className }: { name: 'Naukri' | 'LinkedIn'; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[0.7rem] font-semibold',
        name === 'Naukri' ? 'bg-violet-50 text-[#7a0fe0] ring-1 ring-violet-200' : 'bg-neutral-100 text-neutral-800 ring-1 ring-neutral-200',
        className,
      )}
    >
      <span aria-hidden className={cn('h-1.5 w-1.5 rounded-full', name === 'Naukri' ? 'bg-[#9114FF]' : 'bg-neutral-800')} />
      {name}
    </span>
  );
}
