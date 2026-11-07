'use client';
import Image, { type ImageProps } from 'next/image';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { cn } from '@/lib/utils';

type Props = Omit<ImageProps, 'fill'> & { wrapperClassName?: string };

/** Image that reveals with a clip-path wipe and settles from scale 1.15 → 1 */
export function RevealImage({ wrapperClassName, className, alt, sizes = '100vw', ...rest }: Props) {
  const ref = useScrollReveal<HTMLDivElement>({ image: true });
  return (
    <div ref={ref} className={cn('duo relative overflow-hidden bg-elevated', wrapperClassName)}>
      <Image fill alt={alt} sizes={sizes} className={cn('object-cover', className)} {...rest} />
    </div>
  );
}
