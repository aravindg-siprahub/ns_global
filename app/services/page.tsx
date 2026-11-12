import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageHero } from '@/components/pages/PageHero';
import { CtaStrip } from '@/components/pages/CtaStrip';
import { Reveal } from '@/components/ui/Reveal';
import { services } from '@/lib/content';
import { CourseLogo } from '@/components/ui/CourseLogo';

export const metadata: Metadata = {
  title: 'Services',
  description: 'AI & Data, Cloud, Cybersecurity, Digital Engineering, Consulting and Managed Services — end to end, from one accountable partner.',
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Services" title={'From first idea\nto always on.'} highlight={[3, 4]} crumbs={[{ label: 'Services', href: '/services' }]} intro="Six capabilities that work as one team — so strategy, build and run never get lost in the handover." />
      <section className="py-section">
        <Reveal className="container-x divide-y divide-fg/10 border-y hairline">
          {services.map((s) => (
            <Link key={s.slug} href={`/services/${s.slug}`} data-reveal data-cursor="label" data-cursor-label="Explore" className="group grid grid-cols-[1fr_6.5rem] items-start gap-x-5 gap-y-3 py-8 sm:grid-cols-[1fr_9rem] md:grid-cols-12 md:items-center md:gap-6 md:py-14">
              <span className="col-span-2 font-mono text-label text-accent2 md:col-span-1">{s.num}</span>
              <div className="flex items-center gap-3 md:col-span-4 md:gap-4">
                <h2 className="text-display-md font-semibold">{s.title}</h2>
                <CourseLogo src={s.logo} size="md" />
              </div>
              <div className="duo relative row-span-2 aspect-square overflow-hidden rounded-xl2 bg-elevated md:order-last md:col-span-3 md:row-span-1 md:aspect-[4/3]">
                <Image src={s.image} alt="" fill sizes="(min-width:768px) 25vw, 9rem" className="object-cover transition-transform duration-700 ease-premium group-hover:scale-105" />
              </div>
              <div className="md:col-span-4">
                <p className="text-sm font-semibold text-accent">{s.level}</p>
                <p className="mt-1 text-base leading-relaxed text-muted md:text-lg">{s.description}</p>
              </div>
            </Link>
          ))}
        </Reveal>
      </section>
      <CtaStrip />
    </>
  );
}
