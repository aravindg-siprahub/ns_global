'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { product } from '@/lib/content';
import { cn } from '@/lib/utils';

const links = [
  { href: '#features', label: 'Features' },
  { href: '#showcase', label: 'Demo' },
  { href: '#how-it-works', label: 'How it works' },
];

/** Sticky product bar (appears once the hero scrolls away) with section links + app CTA */
export function ProductSubNav() {
  const [show, setShow] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    links.forEach((l) => {
      const el = document.querySelector(l.href);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener('scroll', onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <div
      className={cn(
        'fixed inset-x-0 top-0 z-[70] border-b border-neutral-200 bg-white/85 backdrop-blur-xl transition-[transform,opacity] duration-500 ease-premium',
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-full opacity-0',
      )}
    >
      <div className="container-x flex h-14 items-center gap-6">
        <Link href={product.href} className="shrink-0 text-sm font-semibold text-neutral-950">
          {product.name}
        </Link>
        <nav aria-label="Product sections" className="no-scrollbar hidden flex-1 overflow-x-auto md:block">
          <ul className="flex gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className={cn('rounded-full px-3 py-1.5 text-sm transition-colors', active === l.href ? 'bg-neutral-100 text-neutral-950' : 'text-neutral-600 hover:text-neutral-950')}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <Link href={product.appHref} className="pb-btn pb-btn-primary ml-auto h-9 px-4 text-sm">
          Open the app <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
