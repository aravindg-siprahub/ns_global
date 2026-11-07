import type { ReactNode } from 'react';
import { AnimatedText } from './AnimatedText';
import { cn } from '@/lib/utils';

type Props = {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  size?: 'xl' | 'lg' | 'md';
  className?: string;
  align?: 'left' | 'center';
  highlight?: number[];
  as?: 'h1' | 'h2' | 'h3';
  id?: string;
  trigger?: 'scroll' | 'load';
};

const sizes = { xl: 'text-display-xl', lg: 'text-display-lg', md: 'text-display-md' };

export function Heading({ eyebrow, title, intro, size = 'lg', className, align = 'left', highlight, as = 'h2', id, trigger }: Props) {
  return (
    <div className={cn('max-w-4xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && (
        <p className={cn('eyebrow mb-6 flex items-center gap-3', align === 'center' && 'justify-center')}>
          <span aria-hidden className="rule" />
          {eyebrow}
        </p>
      )}
      <AnimatedText as={as} id={id} text={title} highlight={highlight} trigger={trigger} className={cn(sizes[size], 'font-bold')} />
      {intro && <div className={cn('mt-6 max-w-2xl text-lg text-muted md:text-xl', align === 'center' && 'mx-auto')}>{intro}</div>}
    </div>
  );
}
