'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { unsplash } from '@/lib/utils';

const IMAGE = unsplash('photo-1522202176988-66273c2fd55f', 2000);

function Copy() {
  return (
    <>
      <p className="text-sm font-bold uppercase tracking-wide">Placements</p>
      <h2 className="mt-5 font-display text-[clamp(2rem,3.4vw,3.25rem)] font-bold leading-[1.08]">
        Build a career that’s as exciting as the technology you’ll master
      </h2>
      <p className="mt-6 font-serif text-xl leading-relaxed text-white/90 md:text-[1.6rem] md:leading-[1.45]">
        Learn from industry experts, work on real-world projects and get dedicated placement support until you’re hired.
      </p>
      <Link href="/contact" className="group mt-8 inline-flex items-center gap-3 text-lg font-bold">
        <span className="link-underline">Book a free demo</span>
        <span className="grid h-8 w-8 place-items-center bg-accent text-white transition-transform group-hover:translate-x-1" aria-hidden>
          <svg viewBox="0 0 10 10" className="h-3 w-3"><path d="M3 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" /></svg>
        </span>
      </Link>
    </>
  );
}

/**
 * Accenture-style scroll story: a full-bleed photo that, as you scroll,
 * shrinks into the left half while the copy fades in on the right.
 * Mobile / reduced motion: a simple stacked image + copy.
 */
export function CareerFeature() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const width = useTransform(scrollYProgress, [0, 0.55], ['100%', '50%']);
  const height = useTransform(scrollYProgress, [0, 0.55], ['100%', '68%']);
  const textOpacity = useTransform(scrollYProgress, [0.4, 0.7], [0, 1]);
  const textX = useTransform(scrollYProgress, [0.4, 0.7], [60, 0]);

  return (
    <section aria-label="Placements" className="theme-dark">
      {/* Desktop: pinned scroll story */}
      <div ref={ref} className="relative hidden h-[220vh] lg:block">
        <div className="sticky top-[var(--header-h)] h-[calc(100vh-var(--header-h))] overflow-hidden">
          <motion.div className="absolute left-0 top-1/2 -translate-y-1/2 overflow-hidden" style={reduce ? { width: '50%', height: '68%' } : { width, height }}>
            <Image src={IMAGE} alt="Students collaborating on laptops during a training session" fill sizes="100vw" className="object-cover" />
          </motion.div>
          <div className="absolute right-0 top-1/2 w-[50%] -translate-y-1/2 px-[6%] text-white">
            <motion.div className="max-w-xl" style={reduce ? undefined : { opacity: textOpacity, x: textX }}>
              <Copy />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile / tablet */}
      <div className="py-16 lg:hidden">
        <div className="relative aspect-[4/3] w-full">
          <Image src={IMAGE} alt="Students collaborating on laptops during a training session" fill sizes="100vw" className="object-cover" />
        </div>
        <div className="container-x mt-10 text-white">
          <Copy />
        </div>
      </div>
    </section>
  );
}
