'use client';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { video } from '@/lib/content';
import { Heading } from '@/components/ui/Heading';

/** Large video card with a round purple play button; opens a focus-trapped lightbox. */
export function VideoFeature() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <section aria-labelledby="video-title" className="py-section">
      <div className="container-x">
        <Heading id="video-title" eyebrow={video.eyebrow} title={video.title} size="lg" className="mb-12" />
        <button type="button" onClick={() => setOpen(true)} className="group relative block aspect-video w-full overflow-hidden bg-black text-left" aria-label={`Play video: ${video.title}`}>
          <Image src={video.poster} alt="" fill sizes="(min-width:1440px) 1440px, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <span className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent transition-transform duration-300 md:h-28 md:w-28">
            <span className="ml-1.5 h-0 w-0 border-y-[14px] border-l-[22px] border-y-transparent border-l-white md:border-y-[18px] md:border-l-[28px]" aria-hidden />
          </span>
          <span className="absolute bottom-6 left-6 right-6 flex flex-col gap-1 md:bottom-10 md:left-10 md:flex-row md:items-end md:justify-between">
            {video.speakers.map((sp) => (
              <span key={sp.name} className="block">
                <span className="block font-display text-2xl font-black text-white md:text-4xl">{sp.name}</span>
                <span className="mt-1 block border-t-2 border-accent pt-1 text-sm text-white/85">{sp.role}</span>
              </span>
            ))}
          </span>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={video.title}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <button ref={closeRef} type="button" onClick={() => setOpen(false)} aria-label="Close video" className="absolute right-5 top-5 grid h-12 w-12 place-items-center text-3xl text-white">×</button>
            <div className="aspect-video w-full max-w-6xl bg-black" onClick={(e) => e.stopPropagation()}>
              {video.src ? (
                <video src={video.src} poster={video.poster} controls autoPlay className="h-full w-full" />
              ) : (
                <div className="grid h-full place-items-center p-8 text-center text-white/80">
                  Add your showreel: set <code className="mx-1 text-white">video.src</code> in lib/content.ts (e.g. /showreel.mp4 in /public).
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
