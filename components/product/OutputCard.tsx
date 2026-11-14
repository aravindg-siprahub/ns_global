'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Copy } from 'lucide-react';
import { useRef, useState, type RefObject } from 'react';
import type { OutputBlock } from '@/lib/profile-builder/engine';
import { cn } from '@/lib/utils';

async function copyText(text: string, fallbackEl: HTMLElement | null) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    if (!fallbackEl) return false;
    const r = document.createRange();
    r.selectNodeContents(fallbackEl);
    const s = getSelection();
    s?.removeAllRanges();
    s?.addRange(r);
    try {
      return document.execCommand('copy');
    } catch {
      return false;
    }
  }
}

export function CopyButton({ text, target, className, label = 'Copy' }: { text: string; target?: RefObject<HTMLElement>; className?: string; label?: string }) {
  const [done, setDone] = useState(false);
  const onClick = async () => {
    if (await copyText(text, target?.current ?? null)) {
      setDone(true);
      window.setTimeout(() => setDone(false), 1600);
    }
  };
  return (
    <button
      type="button"
      onClick={onClick}
      aria-live="polite"
      className={cn(
        'inline-flex h-8 shrink-0 items-center gap-1.5 rounded-full px-3.5 text-xs font-semibold shadow-sm transition-all duration-300 active:scale-95',
        done ? 'bg-emerald-500 text-white' : 'bg-[#9114FF] text-white hover:bg-[#7a0fe0]',
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span key={done ? 'y' : 'n'} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.15 }} className="inline-flex items-center gap-1.5">
          {done ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {done ? 'Copied!' : label}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

/** One generated section: title, character counter and a big Copy button */
export function OutputCard({ block, maxHeight, className }: { block: OutputBlock; maxHeight?: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const n = block.text.length;
  const over = block.limit ? n > block.limit : false;
  return (
    <div className={cn('overflow-hidden rounded-2xl border border-neutral-200 bg-white', className)}>
      <div className="flex items-center justify-between gap-3 border-b border-neutral-100 bg-neutral-50/70 px-4 py-2.5">
        <div className="min-w-0">
          <h4 className="truncate text-sm font-semibold text-neutral-900">{block.title}</h4>
          {block.limit && (
            <p className={cn('text-[0.72rem] tabular-nums', over ? 'font-semibold text-rose-600' : 'text-neutral-500')}>
              {n}/{block.limit} characters{over && ' · shorten it a little'}
            </p>
          )}
        </div>
        <CopyButton text={block.text} target={ref} />
      </div>
      <div ref={ref} className={cn('overflow-y-auto whitespace-pre-wrap break-words px-4 py-3 text-[0.86rem] leading-relaxed text-neutral-700', maxHeight)}>
        {block.text}
      </div>
    </div>
  );
}
