import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AnimatedText } from '@/components/ui/AnimatedText';
import { ReadingProgress } from '@/components/pages/ReadingProgress';
import { InsightCard } from '@/components/home/Insights';
import { insights, company, findBy } from '@/lib/content';
import { SITE_URL } from '@/lib/utils';

type Params = { params: { slug: string } };

export const generateStaticParams = () => insights.map((i) => ({ slug: i.slug }));

export function generateMetadata({ params }: Params): Metadata {
  const a = findBy(insights, params.slug);
  if (!a) return {};
  return {
    title: a.title,
    description: a.excerpt,
    alternates: { canonical: `/insights/${a.slug}` },
    openGraph: { type: 'article', publishedTime: a.date, images: [a.image] },
  };
}

export default function ArticlePage({ params }: Params) {
  const a = findBy(insights, params.slug);
  if (!a) notFound();
  const related = insights.filter((i) => i.slug !== a.slug).slice(0, 3);
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.title,
    datePublished: a.date,
    image: a.image,
    author: { '@type': 'Person', name: a.author },
    publisher: { '@type': 'Organization', name: company.name, logo: { '@type': 'ImageObject', url: `${SITE_URL}/icon.svg` } },
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <ReadingProgress />
      <header className="pt-[calc(var(--header-h)+5rem)]">
        <div className="container-x max-w-5xl">
          <Link href="/insights" className="eyebrow hover:text-fg">← Insights</Link>
          <div className="mt-8 flex flex-wrap items-center gap-3 font-mono text-label uppercase text-muted">
            <span className="rounded-full bg-accent px-2.5 py-1 text-white">{a.type}</span>
            <span className="text-accent2">{a.category}</span>
            <span aria-hidden>·</span>
            <span>{a.readTime}</span>
            <span aria-hidden>·</span>
            <time dateTime={a.date}>{new Date(a.date).toLocaleDateString('en-US', { dateStyle: 'long' })}</time>
          </div>
          <AnimatedText as="h1" trigger="load" text={a.title} className="mt-8 font-display text-display-lg font-semibold" />
          <p className="mt-8 text-xl text-muted">{a.excerpt}</p>
          <p className="mt-6 text-sm">By <span className="text-fg">{a.author}</span></p>
        </div>
        <div className="container-x mt-14">
          <div className="relative aspect-[21/9] overflow-hidden rounded-xl3 bg-elevated">
            <Image src={a.image} alt="" fill priority sizes="(min-width:1440px) 1440px, 100vw" className="object-cover" />
          </div>
        </div>
      </header>

      <div className="container-x max-w-3xl py-section">
        <div className="space-y-7 text-lg leading-relaxed text-fg/85 md:text-xl [&_h2]:mt-14 [&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:text-fg">
          <p className="font-display text-2xl leading-snug text-fg md:text-3xl">
            Every technology wave promises to change everything. Most change a little, slowly. This one is different — not because the technology is smarter, but because it finally meets the way work actually happens.
          </p>
          <p>
            Over the past year we have worked with more than two hundred enterprises moving from pilots to production. The pattern is consistent: the winners are not the ones with the biggest models or the largest budgets. They are the ones who redesigned the work first, then picked the technology.
          </p>
          <h2>Start with the decision, not the data</h2>
          <p>
            The most valuable programmes begin with a single, high-stakes decision that happens thousands of times a day — approving a claim, pricing a policy, routing a shipment. Map who makes it, what they need to know and how long it takes. Only then ask what the technology should do.
          </p>
          <blockquote className="border-l-2 border-accent pl-6 font-display text-2xl text-fg">
            “Automation without redesign just makes a broken process run faster.”
          </blockquote>
          <h2>Make trust a feature</h2>
          <p>
            People adopt what they understand. Every recommendation should show its reasoning, its sources and its confidence. Governance is not a brake on adoption — it is what makes adoption possible at scale.
          </p>
          <h2>Measure outcomes, not activity</h2>
          <p>
            Count decisions improved, hours returned and revenue protected — not models deployed. The leaders we studied reported a median 3.4× return within eighteen months, and every one of them tracked value from day one.
          </p>
          <p>
            The next decade of business will be built by organisations that treat technology as a way to make people braver, not redundant. That is the work we are here to do.
          </p>
        </div>
      </div>

      <section className="border-t hairline py-section">
        <div className="container-x">
          <h2 className="eyebrow mb-10">Keep reading</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {related.map((r) => <InsightCard key={r.slug} item={r} />)}
          </div>
        </div>
      </section>
    </article>
  );
}
