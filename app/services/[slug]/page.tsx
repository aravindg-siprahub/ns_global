import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/pages/PageHero';
import { CtaStrip } from '@/components/pages/CtaStrip';
import { Reveal } from '@/components/ui/Reveal';
import { Card } from '@/components/ui/Card';
import { Heading } from '@/components/ui/Heading';
import { services, caseStudies, findBy } from '@/lib/content';

type Params = { params: { slug: string } };

export const generateStaticParams = () => services.map((s) => ({ slug: s.slug }));

export function generateMetadata({ params }: Params): Metadata {
  const s = findBy(services, params.slug);
  if (!s) return {};
  return { title: s.title, description: s.description, alternates: { canonical: `/services/${s.slug}` }, openGraph: { images: [s.image] } };
}

export default function ServiceDetail({ params }: Params) {
  const s = findBy(services, params.slug);
  if (!s) notFound();
  const idx = services.indexOf(s);
  const next = services[(idx + 1) % services.length];

  return (
    <>
      <PageHero eyebrow={`Service ${s.num}`} title={s.title} intro={s.description} image={s.image} crumbs={[{ label: 'Services', href: '/services' }, { label: s.title, href: `/services/${s.slug}` }]} />

      <section className="py-section">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Heading eyebrow="Capabilities" title={s.short} size="md" />
          </div>
          <Reveal className="lg:col-span-6 lg:col-start-7">
            <ul className="divide-y divide-fg/10 border-y hairline">
              {s.capabilities.map((c, i) => (
                <li key={c} data-reveal className="flex items-baseline gap-6 py-6 text-xl md:text-2xl">
                  <span className="font-mono text-label text-accent2">0{i + 1}</span>
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="pb-section">
        <Reveal className="container-x grid gap-6 md:grid-cols-2">
          {s.outcomes.map((o) => (
            <div data-reveal key={o.label}>
              <Card className="p-10 md:p-14">
                <p className="font-display text-[clamp(3.5rem,8vw,7rem)] font-semibold leading-none tracking-[-0.04em] text-gradient">{o.metric}</p>
                <p className="mt-4 font-mono text-label uppercase text-muted">{o.label}</p>
              </Card>
            </div>
          ))}
        </Reveal>
      </section>

      <section className="pb-section">
        <div className="container-x">
          <p className="eyebrow mb-6">Related work</p>
          <div className="grid gap-6 md:grid-cols-2">
            {caseStudies.slice(0, 2).map((c) => (
              <Link key={c.slug} href={`/case-studies/${c.slug}`} className="group rounded-xl3 border hairline p-8 transition-colors hover:border-accent/50">
                <p className="eyebrow">{c.client}</p>
                <p className="mt-3 text-2xl font-semibold">{c.title}</p>
                <p className="mt-6 font-display text-4xl font-semibold text-accent2">{c.metric} <span className="text-base font-normal text-muted">{c.metricLabel}</span></p>
              </Link>
            ))}
          </div>
          <Link href={`/services/${next.slug}`} className="group mt-20 flex items-end justify-between border-t hairline pt-10">
            <span>
              <span className="eyebrow">Next service</span>
              <span className="mt-3 block text-display-md font-semibold">{next.title}</span>
            </span>
            <span aria-hidden className="text-4xl transition-transform duration-700">→</span>
          </Link>
        </div>
      </section>
      <CtaStrip title={`Let’s talk ${s.title}.`} />
    </>
  );
}
