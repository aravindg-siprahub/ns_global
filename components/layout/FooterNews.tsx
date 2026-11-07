'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const news = [
  { title: 'Free demo classes every week across all our training programs', href: '/contact' },
  { title: '300+ students placed in top IT companies with dedicated placement support', href: '/about' },
  { title: 'Now enrolling: Looker BI and AWS DevOps programs', href: '/services' },
  { title: 'Weekend batches for working professionals in Snowflake, Azure and Java', href: '/services' },
  { title: 'Lifetime access to session recordings and premium resources', href: '/services' },
];

const AUTO_MS = 6000;

/** Large-headline news slider with square pause / prev / next controls */
export function FooterNews() {
  const [i, setI] = useState(0);
  const [playing, setPlaying] = useState(true);
  const startX = useRef<number | null>(null);
  const n = news.length;
  const go = (k: number) => setI(((k % n) + n) % n);

  useEffect(() => {
    if (!playing || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setTimeout(() => go(i + 1), AUTO_MS);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i, playing]);

  return (
    <div aria-roledescription="carousel" aria-label="NS Global news">
      <h2 className="font-display text-[clamp(2.25rem,4.5vw,4rem)] font-bold leading-none">NS Global news</h2>

      <div className="mt-12 overflow-hidden">
        {/* --step = width of one item: 100% on phones (1 visible), 50% from md (2 visible) */}
        <ul
          className="flex touch-pan-y transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] [--step:100%] md:[--step:50%]"
          style={{ transform: `translateX(calc(var(--step) * ${-i}))` }}
          aria-live="polite"
          onPointerDown={(e) => (startX.current = e.clientX)}
          onPointerUp={(e) => {
            if (startX.current === null) return;
            const dx = e.clientX - startX.current;
            if (Math.abs(dx) > 50) go(i + (dx < 0 ? 1 : -1));
            startX.current = null;
          }}
        >
          {[...news, ...news.slice(0, 1)].map((item, k) => (
            <li key={k} className="w-full shrink-0 pr-6 md:w-1/2 md:pr-10" aria-hidden={k !== i && k !== i + 1}>
              <Link href={item.href} className="block font-display text-[clamp(1.6rem,2.8vw,2.75rem)] font-bold leading-[1.15]">
                <span className="link-underline">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? 'Pause news' : 'Play news'}
          className="grid h-14 w-14 place-items-center bg-white/10 transition-colors hover:bg-white/20"
        >
          {playing ? (
            <span className="flex gap-[4px]"><span className="h-4 w-[4px] bg-white" /><span className="h-4 w-[4px] bg-white" /></span>
          ) : (
            <span className="ml-1 h-0 w-0 border-y-[8px] border-l-[12px] border-y-transparent border-l-white" />
          )}
        </button>
        <div className="flex gap-4">
          <button type="button" onClick={() => go(i - 1)} aria-label="Previous news" className="grid h-14 w-14 place-items-center bg-white/10 text-2xl transition-colors hover:bg-white/20">←</button>
          <button type="button" onClick={() => go(i + 1)} aria-label="Next news" className="grid h-14 w-14 place-items-center bg-white/10 text-2xl transition-colors hover:bg-white/20">→</button>
        </div>
      </div>
    </div>
  );
}
