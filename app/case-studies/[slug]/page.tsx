import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/pages/PageHero';
import { CtaStrip } from '@/components/pages/CtaStrip';
import { Reveal } from '@/components/ui/Reveal';
import { RevealImage } from '@/components/ui/RevealImage';
import { caseStudies, images, findBy } from '@/lib/content';

type Params = { params: { slug: string } };

export const generateStaticParams = () => caseStudies.map((c) => ({ slug: c.slug }));

export function generateMetadata({ params }: Params): Metadata {
  const c = findBy(caseStudies, params.slug);
  if (!c) return {};
  return { title: `${c.client}: ${c.metric} ${c.metricLabel}`, description: c.challenge, alternates: { canonical: `/case-studies/${c.slug}` }, openGraph: { images: [c.image] } };
}

export default function CaseStudyPage({ params }: Params) {
  const c = findBy(caseStudies, params.slug);
  if (!c) notFound();
  const next = caseStudies[(caseStudies.indexOf(c) + 1) % caseStudies.length];

  return (
    <article>
      <PageHero eyebrow={`${c.client} · ${c.industry}`} title={c.title} image={c.image} crumbs={[{ label: 'Case studies', href: '/#work' }, { label: c.client, href: `/case-studies/${c.slug}` }]} />

      <section className="border-b hairline">
        <div className="container-x grid grid-cols-1 divide-y divide-fg/10 md:grid-cols-3 md:divide-x md:divide-y-0">
          {c.results.map((r) => (
            <div key={r.label} className="py-12 md:px-10 md:py-16 first:md:pl-0">
              <p className="font-display text-[clamp(3rem,6vw,5.5rem)] font-semibold leading-none tracking-[-0.04em] text-gradient">{r.value}</p>
              <p className="mt-3 font-mono text-label uppercase text-muted">{r.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-section">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <aside className="lg:col-span-3">
            <dl className="space-y-6 font-mono text-label uppercase">
              <div><dt className="text-muted">Client</dt><dd className="mt-1 text-fg">{c.client}</dd></div>
              <div><dt className="text-muted">Industry</dt><dd className="mt-1 text-fg">{c.industry}</dd></div>
            </dl>
          </aside>
          <Reveal className="space-y-14 lg:col-span-8 lg:col-start-5">
            <div data-reveal>
              <h2 className="eyebrow mb-4">The challenge</h2>
              <p className="font-display text-statement font-medium">{c.challenge}</p>
            </div>
            <div data-reveal>
              <h2 className="eyebrow mb-6">Our approach</h2>
              <ol className="space-y-5">
                {c.approach.map((a, i) => (
                  <li key={a} className="flex gap-6 border-t hairline pt-5 text-xl">
                    <span className="font-mono text-label text-accent2">0{i + 1}</span>{a}
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="container-x">
        <RevealImage src={images.meeting} alt="Project team in a working session" wrapperClassName="aspect-[21/9] rounded-xl3" sizes="(min-width:1440px) 1440px, 100vw" />
      </div>

      {c.quote && (
        <section className="py-section">
          <figure className="container-x max-w-5xl">
            <blockquote className="font-display text-display-md font-medium">“{c.quote.text}”</blockquote>
            <figcaption className="mt-8 font-mono text-label uppercase text-muted">— {c.quote.author}</figcaption>
          </figure>
        </section>
      )}

      <section className="pb-10 pt-section">
        <div className="container-x">
          <Link href={`/case-studies/${next.slug}`} data-cursor="label" data-cursor-label="Next" className="group block border-t hairline pt-10">
            <span className="eyebrow">Next story · {next.client}</span>
            <span className="mt-4 block max-w-4xl text-display-lg font-semibold">{next.title}</span>
          </Link>
        </div>
      </section>
      <CtaStrip title="Your results could be next." />
    </article>
  );
}
