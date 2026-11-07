import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PageHero } from '@/components/pages/PageHero';
import { CtaStrip } from '@/components/pages/CtaStrip';
import { Reveal } from '@/components/ui/Reveal';
import { services } from '@/lib/content';

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
            <Link key={s.slug} href={`/services/${s.slug}`} data-reveal data-cursor="label" data-cursor-label="Explore" className="group grid items-center gap-6 py-10 md:grid-cols-12 md:py-14">
              <span className="font-mono text-label text-accent2 md:col-span-1">{s.num}</span>
              <h2 className="text-display-md font-semibold md:col-span-4">{s.title}</h2>
              <p className="text-lg text-muted md:col-span-4">{s.description}</p>
              <div className="duo relative hidden aspect-[4/3] overflow-hidden rounded-xl2 md:col-span-3 md:block">
                <Image src={s.image} alt="" fill sizes="25vw" className="object-cover" />
              </div>
            </Link>
          ))}
        </Reveal>
      </section>
      <CtaStrip />
    </>
  );
}
