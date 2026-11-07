import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/pages/PageHero';
import { CtaStrip } from '@/components/pages/CtaStrip';
import { Heading } from '@/components/ui/Heading';
import { Reveal } from '@/components/ui/Reveal';
import { Card } from '@/components/ui/Card';
import { industries, caseStudies, services, findBy } from '@/lib/content';

type Params = { params: { slug: string } };

export const generateStaticParams = () => industries.map((i) => ({ slug: i.slug }));

export function generateMetadata({ params }: Params): Metadata {
  const i = findBy(industries, params.slug);
  if (!i) return {};
  return { title: i.title, description: i.description, alternates: { canonical: `/industries/${i.slug}` } };
}

export default function IndustryDetail({ params }: Params) {
  const ind = findBy(industries, params.slug);
  if (!ind) notFound();
  const story = caseStudies.find((c) => c.industry === ind.title) ?? caseStudies[0];

  return (
    <>
      <PageHero eyebrow="Industry" title={ind.title} intro={ind.description} image={ind.image} crumbs={[{ label: 'Industries', href: '/industries' }, { label: ind.title, href: `/industries/${ind.slug}` }]} />
      <section className="py-section">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <Heading eyebrow="Where we focus" title={ind.short} size="md" className="lg:col-span-5" />
          <Reveal className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {ind.focus.map((f, i) => (
              <div data-reveal key={f}>
                <Card className="h-full p-8">
                  <span className="font-mono text-label text-accent2">0{i + 1}</span>
                  <p className="mt-6 text-2xl font-semibold">{f}</p>
                </Card>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="pb-section">
        <div className="container-x">
          <Link href={`/case-studies/${story.slug}`} data-cursor="label" data-cursor-label="View" className="group grid gap-8 rounded-xl3 border hairline bg-surface p-8 transition-colors hover:border-accent/40 md:grid-cols-12 md:p-14">
            <div className="md:col-span-8">
              <p className="eyebrow">Featured story · {story.client}</p>
              <p className="mt-4 text-display-md font-semibold">{story.title}</p>
            </div>
            <div className="md:col-span-4 md:text-right">
              <p className="font-display text-7xl font-semibold tracking-[-0.04em] text-gradient">{story.metric}</p>
              <p className="mt-2 font-mono text-label uppercase text-muted">{story.metricLabel}</p>
            </div>
          </Link>
          <div className="mt-16 flex flex-wrap gap-3">
            <span className="eyebrow mr-4 self-center">Services for {ind.title}</span>
            {services.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="rounded-full border hairline px-5 py-2.5 transition-colors hover:border-accent">{s.title}</Link>
            ))}
          </div>
        </div>
      </section>
      <CtaStrip title={`Transforming ${ind.title.toLowerCase()}? So are we.`} />
    </>
  );
}
