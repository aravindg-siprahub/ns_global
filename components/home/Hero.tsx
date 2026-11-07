'use client';
import Link from 'next/link';
import { useState } from 'react';
import { AnimatedText } from '@/components/ui/AnimatedText';
import { EditorialCard } from '@/components/ui/EditorialCard';
import { HeroParticles } from './HeroParticles';
import { unsplash } from '@/lib/utils';

const featured = [
  {
    label: 'Trending course',
    title: 'Snowflake: master the data cloud',
    image: unsplash('photo-1550751827-4bd374c3f58b', 900),
    description: 'Data warehousing, SQL optimization and performance tuning — with real-world projects from day one.',
    primary: { label: 'Book a demo', href: '/contact?course=snowflake' },
    secondary: { label: 'Course details', href: '/services/snowflake' },
  },
  {
    label: 'Placements',
    title: '300+ students placed in top IT companies',
    image: unsplash('photo-1531746790731-6c087fecd65a', 900),
    description: 'Dedicated placement assistance, weekly mock interviews and resume support until you get hired.',
    primary: { label: 'Talk to us', href: '/contact' },
    secondary: { label: 'Our story', href: '/about' },
  },
  {
    label: 'Flexible learning',
    title: 'Live online, classroom and weekend batches',
    image: unsplash('photo-1488229297570-58520851e868', 900),
    description: 'Learn your way — live sessions with recordings, classroom training, weekend batches or corporate programs.',
    primary: { label: 'See schedules', href: '/contact' },
  },
  {
    label: 'Free demo',
    title: 'Try a live class before you enrol',
    image: unsplash('photo-1639762681057-408e52192e55', 900),
    description: 'Meet your trainer, see the curriculum and ask anything — no commitment.',
    primary: { label: 'Book free demo', href: '/contact' },
  },
];

/**
 * Black hero: flowing particle ribbon behind a two-line uppercase headline
 * (second line indented), a right-hand column with the purple rule, and a
 * row of four editorial cards beneath.
 */
export function Hero() {
  const [paused, setPaused] = useState(false);

  return (
    <section aria-labelledby="hero-title" className="theme-dark relative isolate overflow-hidden pb-section pt-[var(--header-h)]">
      <HeroParticles paused={paused} className="absolute inset-x-0 top-0 -z-10 h-[90vh] w-full" />
      {/* contrast guard: keeps the headline readable over the sculpture */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[90vh] bg-gradient-to-r from-black/60 via-black/15 to-transparent lg:w-[65%] lg:via-black/20" />
      <div aria-hidden className="pointer-events-none absolute right-0 top-0 -z-10 hidden h-[90vh] w-[40%] bg-gradient-to-l from-black/75 via-black/35 to-transparent lg:block" />

      <div className="container-x relative flex min-h-[72vh] items-center py-16">
        <div className="grid w-full items-center gap-12 lg:grid-cols-12">
          <AnimatedText
            as="h1"
            id="hero-title"
            trigger="load"
            stagger={0.08}
            text={'Launch your\nIT career'}
            highlight={[2]}
            lineClassName={['', 'pl-[12%] lg:pl-[22%]']}
            className="display-caps text-[clamp(2.35rem,7vw,7.75rem)] text-white lg:col-span-8"
          />
          <div className="lg:col-span-4 lg:pl-6">
            <span className="rule w-12" aria-hidden />
            <h2 className="mt-6 text-2xl font-bold md:text-[1.75rem]">Industry-led training, real careers</h2>
            <p className="mt-4 text-lg leading-relaxed text-white/80">
              Data analytics, cloud and DevOps, testing and full-stack programs, taught by working experts with hands-on projects and 100% placement support.
            </p>
            <Link href="/services" className="group mt-7 inline-flex items-center gap-3 text-lg font-bold">
              <span className="link-underline">Explore courses</span>
              <span className="grid h-7 w-7 place-items-center bg-accent text-white transition-transform group-hover:translate-x-1" aria-hidden>
                <svg viewBox="0 0 10 10" className="h-3 w-3"><path d="M3 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" /></svg>
              </span>
            </Link>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-label={paused ? 'Play background animation' : 'Pause background animation'}
          className="absolute bottom-2 left-gutter grid h-11 w-11 -translate-x-3 place-items-center text-white"
        >
          {paused ? (
            <span className="ml-0.5 h-0 w-0 border-y-[7px] border-l-[11px] border-y-transparent border-l-white" />
          ) : (
            <span className="flex gap-[4px]"><span className="h-4 w-[4px] bg-white" /><span className="h-4 w-[4px] bg-white" /></span>
          )}
        </button>
      </div>

      <div className="container-x">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {featured.map((c, i) => (
            <EditorialCard key={c.title} variant={i} {...c} />
          ))}
        </div>
      </div>
    </section>
  );
}
