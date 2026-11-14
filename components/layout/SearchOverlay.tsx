'use client';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';
import { services, product, industries, insights, caseStudies } from '@/lib/content';

const index = [
  ...services.map((s) => ({ type: 'Service', title: s.title, text: s.short, href: `/services/${s.slug}` })),
  { type: 'Product', title: product.name, text: 'Naukri & LinkedIn profile builder', href: product.href },
  { type: 'Product', title: `Open ${product.name}`, text: 'Build your profile now', href: product.appHref },
  ...industries.map((i) => ({ type: 'Industry', title: i.title, text: i.short, href: `/industries/${i.slug}` })),
  ...caseStudies.map((c) => ({ type: 'Case study', title: c.title, text: c.client, href: `/case-studies/${c.slug}` })),
  ...insights.map((i) => ({ type: i.type, title: i.title, text: i.category, href: `/insights/${i.slug}` })),
  { type: 'Page', title: 'Careers', text: 'Open roles and life at NS Global', href: '/careers' },
  { type: 'Page', title: 'About us', text: 'Our story', href: '/about' },
  { type: 'Page', title: 'Contact', text: 'Talk to a specialist', href: '/contact' },
];

/** Full-screen site search over all pages in lib/content */
export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState('');
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    setQ('');
    document.body.style.overflow = 'hidden';
    const id = window.setTimeout(() => input.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(id);
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return index.slice(0, 8);
    return index.filter((r) => `${r.title} ${r.text} ${r.type}`.toLowerCase().includes(term)).slice(0, 12);
  }, [q]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div role="dialog" aria-modal="true" aria-label="Search" className="fixed inset-0 z-[110] overflow-y-auto bg-ink" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
          <div className="container-x flex h-[var(--header-h)] items-center justify-end">
            <button type="button" onClick={onClose} aria-label="Close search" className="grid h-10 w-10 place-items-center">
              <svg viewBox="0 0 16 16" className="h-5 w-5" aria-hidden>
                <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
          </div>
          <div className="container-x max-w-5xl py-10">
            <label htmlFor="site-search" className="eyebrow">Search NS Global Tech</label>
            <input
              ref={input}
              id="site-search"
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="What are you looking for?"
              className="mt-4 w-full border-b-[3px] border-fg bg-transparent pb-4 font-display text-[clamp(1.75rem,4vw,3.5rem)] font-bold outline-none placeholder:text-fg/30 focus:border-accent"
            />
            <p className="mt-6 text-sm text-muted" aria-live="polite">{q ? `${results.length} results` : 'Popular'}</p>
            <ul className="mt-4">
              {results.map((r) => (
                <li key={r.href} className="border-b hairline">
                  <Link href={r.href} onClick={onClose} className="group flex items-baseline gap-6 py-5">
                    <span className="w-24 shrink-0 font-mono text-label uppercase text-accent">{r.type}</span>
                    <span>
                      <span className="link-underline text-xl font-semibold">{r.title}</span>
                      <span className="mt-1 block text-sm text-muted">{r.text}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
