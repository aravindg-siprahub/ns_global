'use client';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type Props = { url: string; title: string; text: string; className?: string };

const icon = 'h-[18px] w-[18px]';

/**
 * "Share this course": WhatsApp, LinkedIn, X, copy link — plus the phone's
 * native share sheet when available. Plain links, no third-party scripts.
 */
export function ShareButtons({ url, title, text, className }: Props) {
  const [copied, setCopied] = useState(false);
  const [native, setNative] = useState(false);
  useEffect(() => setNative(typeof navigator !== 'undefined' && typeof navigator.share === 'function'), []);

  const msg = `${text} ${url}`;
  const links = [
    {
      label: 'WhatsApp',
      href: `https://wa.me/?text=${encodeURIComponent(msg)}`,
      cls: 'hover:bg-[#25D366] hover:border-[#25D366]',
      svg: <svg viewBox="0 0 24 24" className={icon} fill="currentColor" aria-hidden><path d="M12.04 2a9.9 9.9 0 0 0-8.5 15l-1.4 5 5.1-1.3A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3a8.2 8.2 0 1 1 6.9 3.8Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.2-.2-.5-.3Z" /></svg>,
    },
    {
      label: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      cls: 'hover:bg-[#0A66C2] hover:border-[#0A66C2]',
      svg: <svg viewBox="0 0 24 24" className={icon} fill="currentColor" aria-hidden><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" /></svg>,
    },
    {
      label: 'X',
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      cls: 'hover:bg-black hover:border-black',
      svg: <svg viewBox="0 0 24 24" className={icon} fill="currentColor" aria-hidden><path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.58-6.63 7.58H.48l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93Zm-1.29 19.5h2.04L6.48 3.24H4.3l13.31 17.41Z" /></svg>,
    },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked: nothing to do */
    }
  };

  const btn = 'grid h-10 w-10 place-items-center border border-fg/20 text-fg transition-colors duration-300 hover:text-white';

  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      <span className="basis-full text-sm font-semibold text-muted sm:mr-2 sm:basis-auto">Share this course</span>
      {native && (
        <button type="button" onClick={() => navigator.share({ title, text, url }).catch(() => {})} className={cn(btn, 'hover:border-accent hover:bg-accent')} aria-label="Share">
          <svg viewBox="0 0 24 24" className={icon} fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden><path d="M12 3v13M7 8l5-5 5 5M5 13v7h14v-7" /></svg>
        </button>
      )}
      {links.map((l) => (
        <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className={cn(btn, l.cls)} aria-label={`Share on ${l.label}`}>
          {l.svg}
        </a>
      ))}
      <button type="button" onClick={copy} className={cn(btn, 'w-auto px-3 text-sm font-semibold hover:border-accent hover:bg-accent')} aria-live="polite">
        {copied ? 'Copied ✓' : 'Copy link'}
      </button>
    </div>
  );
}
