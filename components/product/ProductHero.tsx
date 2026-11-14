'use client';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Smartphone, Sparkles, UserX } from 'lucide-react';
import { images, product } from '@/lib/content';
import { roles } from '@/lib/profile-builder/roles';
import { EASE } from '@/lib/utils';
import { HeroPhones } from './HeroPhones';

const rise = (delay: number) => ({ initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, ease: EASE, delay } });

/** Clean, centred hero: one message, two actions, and the product working live */
export function ProductHero() {
  return (
    <section aria-labelledby="pb-hero-title" className="relative isolate overflow-hidden bg-white pt-[calc(var(--header-h)+3rem)] md:pt-[calc(var(--header-h)+4.5rem)]">
      <div aria-hidden className="pb-grid-bg absolute inset-x-0 top-0 -z-10 h-[38rem]" />

      <div className="container-x text-center">
        <motion.p {...rise(0)} className="pb-pill mx-auto">
          <Sparkles className="h-3.5 w-3.5 text-[#9114FF]" />
          {product.name} · For IT job seekers
        </motion.p>
        <motion.h1 {...rise(0.06)} id="pb-hero-title" className="mx-auto mt-5 max-w-3xl font-display text-[clamp(2rem,4.2vw,3.4rem)] font-bold leading-[1.06] tracking-[-0.04em] text-neutral-950">
          Your career profile. <span className="pb-accent-text">Engineered for opportunity.</span>
        </motion.h1>
        <motion.p {...rise(0.12)} className="mx-auto mt-4 max-w-xl text-[1.02rem] leading-relaxed text-neutral-600">
          Upload your resume and get a ready-to-paste Naukri and LinkedIn profile, with a picture guide for every step.
        </motion.p>
        <motion.div {...rise(0.18)} className="mt-7 flex flex-wrap justify-center gap-3">
          <Link href={product.appHref} className="pb-btn pb-btn-primary group h-11 px-6 text-[0.9rem]">
            Build my profile <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </Link>
          <a href="#how-it-works" className="pb-btn pb-btn-ghost h-11 px-6 text-[0.9rem]">See how it works</a>
        </motion.div>
        <motion.ul {...rise(0.24)} className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[0.8rem] text-neutral-500">
          <li className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-emerald-500" /> Resume stays on your device</li>
          <li className="flex items-center gap-1.5"><UserX className="h-4 w-4" /> No sign-up</li>
          <li className="flex items-center gap-1.5"><Smartphone className="h-4 w-4" /> Works on your phone</li>
        </motion.ul>

        {/* stage: real photo + the product running live */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.3 }} className="relative mx-auto mt-12 max-w-5xl md:mt-14">
          <div className="absolute inset-x-0 bottom-0 top-24 overflow-hidden rounded-[28px] md:top-28">
            <Image src={images.careers} alt="" fill priority sizes="(min-width:1024px) 1024px, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/20 to-white/0" />
          </div>
          <div className="relative pb-10 md:pb-12">
            <HeroPhones />
          </div>
        </motion.div>
      </div>

      {/* career tracks strip */}
      <div className="container-x mt-12 pb-4 md:mt-16">
        <p className="text-center text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-neutral-400">Written for {roles.length} IT career tracks</p>
        <ul className="mx-auto mt-5 flex max-w-4xl flex-wrap justify-center gap-2">
          {roles.map((r) => (
            <li key={r.id}>
              <Link href={`${product.appHref}?role=${r.id}`} className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white py-1 pl-1 pr-3 text-[0.8rem] font-medium text-neutral-700 transition-all hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-sm">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-white ring-1 ring-neutral-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.logo} alt="" className="h-3.5 w-3.5 object-contain" />
                </span>
                {r.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
