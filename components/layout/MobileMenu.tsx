'use client';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { nav, company, services } from '@/lib/content';
import { Logo } from '@/components/ui/Logo';
import { CourseLogo } from '@/components/ui/CourseLogo';
import { cn } from '@/lib/utils';

const links = [...nav, { label: 'About', href: '/about', key: 'about' }, { label: 'Contact', href: '/contact', key: 'contact' }];

function Chevron({ open = false }: { open?: boolean }) {
  return (
    <svg viewBox="0 0 12 12" className={cn('h-3 w-3 transition-transform duration-300', open ? 'rotate-90' : '')} aria-hidden>
      <path d="M4 2l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

/** Compact slide-down menu: simple link list, Services expands to the courses */
export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeBtn = useRef<HTMLButtonElement>(null);
  const [coursesOpen, setCoursesOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      setCoursesOpen(false);
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
          transition={{ duration: 0.2 }}
        >
          <div className="container-x flex h-[var(--header-h)] shrink-0 items-center justify-between border-b hairline">
            <Logo />
            <button ref={closeBtn} type="button" onClick={onClose} aria-label="Close menu" className="grid h-10 w-10 place-items-center">
              <svg viewBox="0 0 16 16" className="h-4 w-4" aria-hidden>
                <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.8" />
              </svg>
            </button>
          </div>

          <nav aria-label="Mobile" className="container-x flex-1 overflow-y-auto overscroll-contain py-3">
            <ul>
              {links.map((l, i) => (
                <motion.li
                  key={l.key}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 + i * 0.03, duration: 0.25 }}
                  className="border-b hairline"
                >
                  {l.key === 'services' ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setCoursesOpen((v) => !v)}
                        aria-expanded={coursesOpen}
                        aria-controls="mobile-courses"
                        className="flex w-full items-center justify-between py-3.5 text-left text-[1.05rem] font-semibold"
                      >
                        {l.label}
                        <span className={cn('text-muted', coursesOpen && 'text-accent')}><Chevron open={coursesOpen} /></span>
                      </button>
                      <AnimatePresence initial={false}>
                        {coursesOpen && (
                          <motion.ul
                            id="mobile-courses"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            {services.map((s) => (
                              <li key={s.slug}>
                                <Link href={`/services/${s.slug}`} onClick={onClose} className="flex items-center gap-3 py-2 text-[0.95rem] text-white/85 hover:text-white">
                                  <CourseLogo src={s.logo} size="xs" />
                                  {s.title}
                                </Link>
                              </li>
                            ))}
                            <li className="pb-4 pt-2">
                              <Link href="/services" onClick={onClose} className="text-sm font-semibold text-accent">All courses →</Link>
                            </li>
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link href={l.href} onClick={onClose} className="flex items-center justify-between py-3.5 text-[1.05rem] font-semibold">
                      {l.label}
                      <span className="text-muted"><Chevron /></span>
                    </Link>
                  )}
                </motion.li>
              ))}
            </ul>
          </nav>

          <div className="container-x shrink-0 border-t hairline py-5">
            <Link href="/contact" onClick={onClose} className="flex h-12 w-full items-center justify-center bg-accent font-semibold text-white">
              Book a free demo
            </Link>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-sm text-muted">
              <a href={`mailto:${company.email}`} className="hover:text-white">{company.email}</a>
              <a href={`tel:${company.phone.replace(/\s/g, '')}`} className="hover:text-white">{company.phone}</a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
