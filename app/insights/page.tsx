import type { Metadata } from 'next';
import { PageHero } from '@/components/pages/PageHero';
import { InsightCard } from '@/components/home/Insights';
import { Reveal } from '@/components/ui/Reveal';
import { NewsletterForm } from '@/components/layout/NewsletterForm';
import { insights } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Insights',
  description: 'Research, articles and podcasts from NS Global Tech on AI, cloud, security and the future of business.',
  alternates: { canonical: '/insights' },
};

export default function InsightsPage() {
  const [cover, ...rest] = insights;
  return (
    <>
      <PageHero eyebrow="Insights" title={'Ideas worth\nacting on.'} highlight={[2, 3]} crumbs={[{ label: 'Insights', href: '/insights' }]} intro="Research and perspectives from the people building the future of enterprise technology." />
      <section className="py-section">
        <Reveal className="container-x">
          <div className="mb-20 max-w-4xl"><InsightCard item={cover} large /></div>
          <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {rest.map((i) => <InsightCard key={i.slug} item={i} />)}
          </div>
        </Reveal>
      </section>
      <section className="pb-section">
        <div className="container-x">
          <div className="glass rounded-xl3 p-10 md:p-16">
            <p className="font-display text-display-md font-semibold">Get the next report first.</p>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </>
  );
}
