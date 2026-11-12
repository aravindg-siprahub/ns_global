'use client';
import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  children: ReactNode;
  /** Accessible name for the carousel region */
  label: string;
  /**
   * Desktop grid classes (e.g. "lg:grid-cols-4 lg:gap-6"). When set, the rail
   * becomes a normal grid from `lg` up. Omit to keep the swipe rail on every screen.
   */
  grid?: string;
  /** Override slide widths */
  slide?: string;
  /** Extra classes per slide, by index (e.g. a desktop column span) */
  slideClasses?: (string | undefined)[];
  className?: string;
};

/**
 * Accenture-style card rail.
 * Phones / tablets: cards sit side by side and swipe horizontally with snap,
 * the next card peeking in from the edge, plus a progress bar and arrows.
 * Desktop: either a regular grid (`grid`) or the same rail with arrows.
 */
export function SwipeRail({ children, label, grid, slide, slideClasses, className }: Props) {
  const track = useRef<HTMLDivElement>(null);
  const items = Children.toArray(children);
  const [state, setState] = useState({ progress: 0, thumb: 0.3, index: 0, start: true, end: false });

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const kids = el.children;
    const step = kids.length > 1 ? (kids[1] as HTMLElement).offsetLeft - (kids[0] as HTMLElement).offsetLeft : el.clientWidth;
    const end = el.scrollLeft >= max - 4;
    setState({
      progress: max > 0 ? el.scrollLeft / max : 0,
      thumb: el.scrollWidth > 0 ? Math.min(1, el.clientWidth / el.scrollWidth) : 1,
      index: end ? kids.length - 1 : Math.round(el.scrollLeft / Math.max(step, 1)),
      start: el.scrollLeft <= 4,
      end,
    });
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    measure();
    el.addEventListener('scroll', measure, { passive: true });
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => {
      el.removeEventListener('scroll', measure);
      ro.disconnect();
    };
  }, [measure]);

  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const kids = el.children;
    const step = kids.length > 1 ? (kids[1] as HTMLElement).offsetLeft - (kids[0] as HTMLElement).offsetLeft : el.clientWidth;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  const scrollable = state.thumb < 0.999;

  return (
    <div className={cn('relative', className)}>
      <div
        ref={track}
        role="region"
        aria-label={label}
        tabIndex={0}
        className={cn(
          'no-scrollbar -mx-gutter -mb-8 -mt-2 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain scroll-px-gutter px-gutter pb-8 pt-2 outline-none sm:gap-6',
          grid && ['lg:m-0 lg:grid lg:snap-none lg:overflow-visible lg:p-0', grid],
        )}
      >
        {items.map((child, i) => (
          <div
            key={i}
            className={cn(
              'w-[84%] shrink-0 snap-start sm:w-[46%]',
              grid ? 'lg:w-auto' : 'lg:w-[31%] xl:w-[23.5%]',
              slide,
              slideClasses?.[i],
            )}
          >
            {child}
          </div>
        ))}
      </div>

      <div className={cn('mt-8 flex items-center gap-5', grid && 'lg:hidden', !scrollable && 'hidden')} aria-hidden={!scrollable}>
        <div className="relative h-[2px] flex-1 overflow-hidden bg-fg/15">
          <span
            className="absolute inset-y-0 left-0 bg-accent transition-transform duration-150 ease-out"
            style={{ width: `${state.thumb * 100}%`, transform: `translateX(${state.thumb < 1 ? (state.progress * (1 - state.thumb) * 100) / state.thumb : 0}%)` }}
          />
        </div>
        <span className="min-w-[3.5rem] text-right text-sm font-semibold tabular-nums">
          {String(state.index + 1).padStart(2, '0')} <span className="text-muted">/ {String(items.length).padStart(2, '0')}</span>
        </span>
        <div className="flex gap-2">
          <RailButton dir={-1} disabled={state.start} onClick={() => go(-1)} />
          <RailButton dir={1} disabled={state.end} onClick={() => go(1)} />
        </div>
      </div>
    </div>
  );
}

function RailButton({ dir, disabled, onClick }: { dir: 1 | -1; disabled: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === 1 ? 'Next' : 'Previous'}
      className="grid h-11 w-11 place-items-center border border-fg/25 text-fg transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-white disabled:pointer-events-none disabled:opacity-30"
    >
      <svg viewBox="0 0 14 14" className={cn('h-3.5 w-3.5', dir === -1 && 'rotate-180')} aria-hidden>
        <path d="M1 7h12M8 2l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    </button>
  );
}
