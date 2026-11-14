'use client';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Fragment } from 'react';
import { cn, EASE } from '@/lib/utils';

/** Renders **bold** fragments from guide copy */
export function Rich({ text, strongClass = 'font-semibold text-neutral-900' }: { text: string; strongClass?: string }) {
  return (
    <>
      {text.split(/(\*\*[^*]+\*\*)/).map((part, i) =>
        part.startsWith('**') ? <strong key={i} className={strongClass}>{part.slice(2, -2)}</strong> : <Fragment key={i}>{part}</Fragment>,
      )}
    </>
  );
}

export function ProgressBar({ done, total, className, label = 'Progress' }: { done: number; total: number; className?: string; label?: string }) {
  const pct = total ? (done / total) * 100 : 0;
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-100" role="progressbar" aria-valuemin={0} aria-valuemax={total} aria-valuenow={done} aria-label={label}>
        <motion.div className="h-full rounded-full bg-gradient-to-r from-[#9114FF] to-[#C24DFF]" initial={false} animate={{ width: `${pct}%` }} transition={{ duration: 0.5, ease: EASE }} />
      </div>
      <span className="min-w-[3rem] text-right text-xs font-semibold tabular-nums text-neutral-600">
        {done}/{total}
      </span>
    </div>
  );
}

export function Checklist({ items, checked, onToggle, idPrefix }: { items: string[]; checked: boolean[]; onToggle: (i: number) => void; idPrefix: string }) {
  return (
    <ol className="divide-y divide-neutral-100">
      {items.map((t, i) => {
        const on = !!checked[i];
        const id = `${idPrefix}-${i}`;
        return (
          <li key={id}>
            <label htmlFor={id} className="group flex cursor-pointer items-start gap-3 py-3.5">
              <input id={id} type="checkbox" checked={on} onChange={() => onToggle(i)} className="peer sr-only" />
              <span
                aria-hidden
                className={cn(
                  'mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg border-2 transition-colors duration-200 peer-focus-visible:ring-2 peer-focus-visible:ring-[#9114FF] peer-focus-visible:ring-offset-2',
                  on ? 'border-emerald-500 bg-emerald-500 text-white' : 'border-neutral-300 bg-white group-hover:border-[#9114FF]',
                )}
              >
                {on && <Check className="h-4 w-4" strokeWidth={3} />}
              </span>
              <span className={cn('min-w-0 text-[0.9rem] leading-relaxed transition-colors [overflow-wrap:anywhere]', on ? 'text-neutral-400 line-through' : 'text-neutral-700')}>
                <Rich text={t} strongClass={on ? 'font-semibold' : 'font-semibold text-neutral-900'} />
              </span>
            </label>
          </li>
        );
      })}
    </ol>
  );
}
