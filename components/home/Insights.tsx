import Image from 'next/image';
import Link from 'next/link';
import { insights, type Insight } from '@/lib/content';
import { Heading } from '@/components/ui/Heading';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';

const fmt = (d: string) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

function TypeTag({ type }: { type: Insight['type'] }) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider', type === 'Report' ? 'bg-accent text-white' : type === 'Podcast' ? 'bg-accent2/90 text-ink' : 'bg-fg/10 text-fg')}>
      {type === 'Podcast' && (
        <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="currentColor" aria-hidden><path d="M3 1.5v9l7.5-4.5z" /></svg>
      )}
      {type}
    </span>
  );
}

export function InsightCard({ item, large = false }: { item: Insight; large?: boolean }) {
  return (
    <Link href={`/insights/${item.slug}`} className="group block" data-reveal>
      <article>
        <div className={cn('duo relative overflow-hidden rounded-xl2 bg-elevated', large ? 'aspect-[16/11]' : 'aspect-[16/10]')}>
          <Image src={item.image} alt="" fill sizes={large ? '(min-width:1024px) 50vw, 100vw' : '(min-width:1024px) 25vw, 100vw'} className="object-cover" />
          <div className="absolute left-4 top-4 z-[2]"><TypeTag type={item.type} /></div>
        </div>
        <div className="mt-5 flex items-center gap-3 font-mono text-label uppercase text-muted">
          <span className="text-accent2">{item.category}</span>
          <span aria-hidden>·</span>
          <span>{item.readTime}</span>
        </div>
        <h3 className={cn('mt-3 font-semibold leading-tight transition-colors group-hover:text-accent2', large ? 'text-3xl md:text-4xl' : 'text-xl')}>{item.title}</h3>
        {large && <p className="mt-4 max-w-xl text-lg text-muted">{item.excerpt}</p>}
        <p className="mt-3 text-sm text-muted"><time dateTime={item.date}>{fmt(item.date)}</time></p>
      </article>
    </Link>
  );
}

/** Magazine layout: one cover story, a column of shorter reads */
export function Insights() {
  const [cover, ...more] = insights;
  return (
    <section aria-labelledby="insights-title" className="border-t hairline py-section">
      <div className="container-x">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Heading id="insights-title" eyebrow="Insights" title="Perspectives on what comes next." size="lg" />
          <Link href="/insights" className="link-underline shrink-0 font-mono text-label uppercase">All insights →</Link>
        </div>
        <Reveal className="grid gap-x-8 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-6"><InsightCard item={cover} large /></div>
          <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:col-span-6">
            {more.map((m) => <InsightCard key={m.slug} item={m} />)}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
