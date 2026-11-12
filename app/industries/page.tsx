import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageHero } from '@/components/pages/PageHero';
import { CtaStrip } from '@/components/pages/CtaStrip';
import { Reveal } from '@/components/ui/Reveal';
import { SwipeRail } from '@/components/ui/SwipeRail';
import { industries } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Industries',
  description: 'Banking, healthcare, retail, manufacturing, energy, telecom and the public sector — domain teams who speak your language.',
  alternates: { canonical: '/industries' },
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero eyebrow="Industries" title={'Domain depth\nmeets engineering scale.'} highlight={[3]} crumbs={[{ label: 'Industries', href: '/industries' }]} />
      <section className="py-section">
        <Reveal className="container-x">
          <SwipeRail label="Industries" grid="lg:grid-cols-3 lg:gap-6" slideClasses={['lg:col-span-2']}>
          {industries.map((ind, i) => (
            <Link key={ind.slug} data-reveal href={`/industries/${ind.slug}`} data-cursor="label" data-cursor-label="View" className={`group relative block aspect-[4/5] h-full overflow-hidden rounded-xl3 bg-elevated ${i === 0 ? 'lg:aspect-auto' : ''}`}>
              <div className="duo absolute inset-0"><Image src={ind.image} alt="" fill sizes="(min-width:1024px) 33vw, 100vw" className="object-cover" /></div>
              <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black via-black/40 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 z-[3] p-8">
                <h2 className="text-3xl font-semibold text-white">{ind.title}</h2>
                <p className="mt-2 text-white/75">{ind.short}</p>
              </div>
            </Link>
          ))}
          </SwipeRail>
        </Reveal>
      </section>
      <CtaStrip />
    </>
  );
}
