'use client';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { nav, company } from '@/lib/content';
import { Logo } from '@/components/ui/Logo';

const links = [...nav, { label: 'About', href: '/about', key: 'about' }, { label: 'Contact', href: '/contact', key: 'contact' }];

/** Full-screen black menu panel */
export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="theme-dark fixed inset-0 z-[105] flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="container-x flex h-[var(--header-h)] items-center justify-between border-b hairline">
            <Logo />
            <button ref={closeBtn} type="button" onClick={onClose} aria-label="Close menu" className="grid h-10 w-10 place-items-center">
              <svg viewBox="0 0 16 16" className="h-5 w-5" aria-hidden>
                <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
          </div>
          <nav aria-label="Mobile" className="container-x flex-1 overflow-y-auto py-8">
            <ul>
              {links.map((l, i) => (
                <motion.li key={l.key} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 + i * 0.04, duration: 0.3 }} className="border-b hairline">
                  <Link href={l.href} onClick={onClose} className="flex items-center justify-between py-5 font-display text-3xl font-black uppercase">
                    {l.label}
                    <span aria-hidden className="text-accent">→</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>
          <div className="container-x pb-10 text-muted">
            <a href={`mailto:${company.email}`} className="block text-fg">{company.email}</a>
            <span className="text-sm">{company.phone}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
