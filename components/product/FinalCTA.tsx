import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { product } from '@/lib/content';
import { FadeIn } from './primitives';

export function FinalCTA() {
  return (
    <section aria-labelledby="cta-title" className="pb-24 md:pb-32">
      <div className="container-x">
        <FadeIn>
          <div className="pb-beam relative isolate overflow-hidden rounded-[28px] border border-neutral-200 bg-white px-6 py-20 text-center md:px-16 md:py-28">
            <div aria-hidden className="pb-grid-bg absolute inset-0 -z-10 opacity-70" />
            <div aria-hidden className="absolute left-1/2 top-full -z-10 h-[30rem] w-[44rem] max-w-[140%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-[#9114FF]/25 to-fuchsia-300/30 blur-[110px]" />
            <h2 id="cta-title" className="pb-title mx-auto max-w-3xl font-display text-[clamp(1.9rem,3.8vw,3.2rem)] font-bold leading-[1.02] tracking-[-0.04em]">
              Your next opportunity starts with a stronger profile.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted">Turn your professional experience into a polished career presence.</p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link href={product.appHref} className="pb-btn pb-btn-primary group h-14 px-8 text-base">
                Get started <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <Link href="/contact" className="pb-btn pb-btn-ghost h-14 px-8 text-base">Talk to a career advisor</Link>
            </div>
            <p className="mt-6 text-sm text-neutral-500">No sign-up · Your resume never leaves your device</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
