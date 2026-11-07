'use client';
import Image from 'next/image';
import { useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { useIsoLayoutEffect } from '@/hooks/useIsoLayoutEffect';
import { prefersReducedMotion } from '@/hooks/useReducedMotion';
import { images } from '@/lib/content';
import { AnimatedText } from '@/components/ui/AnimatedText';
import { ButtonLink } from '@/components/ui/Button';

/** Signature: the band opens from an inset window to full-bleed as it scrolls in */
export function CareersBand() {
  const ref = useRef<HTMLDivElement>(null);
  useIsoLayoutEffect(() => {
    if (!ref.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current, { clipPath: 'inset(12% 8% 12% 8% round 32px)' }, {
        clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none',
        scrollTrigger: { trigger: ref.current, start: 'top 90%', end: 'top 15%', scrub: true },
      });
      gsap.fromTo('[data-careers-img]', { scale: 1.25 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section aria-labelledby="careers-title">
      <div ref={ref} className="relative isolate flex min-h-[90vh] items-end overflow-hidden">
        <div data-careers-img className="duo absolute inset-0 -z-10">
          <Image src={images.careers} alt="NS Global Tech team collaborating in a studio" fill sizes="100vw" className="object-cover" />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/50 to-black/20" />
        <div className="container-x pb-16 md:pb-24">
          <p className="eyebrow mb-6 !text-white/70">Careers</p>
          <AnimatedText id="careers-title" text={'Build what’s next\nwith us.'} className="display-caps text-[clamp(2.75rem,7vw,7rem)] text-white" />
          <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <p className="max-w-lg text-lg text-white/80">Hard problems, brilliant people and the freedom to do the best work of your life — in 28 countries and counting.</p>
            <ButtonLink href="/careers" arrow className="!bg-white !text-black hover:!bg-accent hover:!text-white">
              See open roles
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
