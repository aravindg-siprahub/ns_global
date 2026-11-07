import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Props = { children: ReactNode; duration?: number; reverse?: boolean; className?: string; pauseOnHover?: boolean; label: string };

/** Infinite CSS marquee; content is duplicated once for a seamless loop */
export function Marquee({ children, duration = 40, reverse, className, pauseOnHover = true, label }: Props) {
  return (
    <div
      role="region"
      aria-label={label}
      className={cn('group relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]', className)}
    >
      <div
        className={cn(
          'flex w-max shrink-0 animate-marquee motion-reduce:animate-none',
          pauseOnHover && 'group-hover:[animation-play-state:paused]',
          reverse && '[animation-direction:reverse]',
        )}
        style={{ '--marquee-duration': `${duration}s` } as CSSProperties}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}
