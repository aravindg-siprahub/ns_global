import Image from 'next/image';
import { cn } from '@/lib/utils';

const sizes = {
  xs: { box: 'h-7 w-7 rounded-md p-1', px: 28 },
  sm: { box: 'h-10 w-10 rounded-lg p-1.5', px: 40 },
  md: { box: 'h-12 w-12 rounded-[10px] p-2', px: 48 },
  lg: { box: 'h-16 w-16 rounded-xl p-2.5 md:h-[4.5rem] md:w-[4.5rem] md:p-3', px: 72 },
};

/**
 * Technology logo on a white app-icon tile, so every brand colour stays
 * legible on black, white, navy or photo backgrounds.
 * Decorative by default: the course name is always printed right beside it.
 */
export function CourseLogo({ src, size = 'md', className, alt = '' }: { src: string; size?: keyof typeof sizes; className?: string; alt?: string }) {
  const s = sizes[size];
  return (
    <span
      aria-hidden={alt ? undefined : true}
      className={cn(
        'inline-grid shrink-0 place-items-center bg-white shadow-[0_1px_2px_rgba(0,0,0,0.08),0_10px_24px_-10px_rgba(20,20,60,0.35)] ring-1 ring-black/[0.06]',
        s.box,
        className,
      )}
    >
      <Image src={src} alt={alt} width={s.px} height={s.px} unoptimized className="h-full w-full object-contain" />
    </span>
  );
}
