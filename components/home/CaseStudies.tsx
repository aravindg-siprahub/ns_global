import Image from 'next/image';
import Link from 'next/link';
import { caseStudies } from '@/lib/content';
import { Heading } from '@/components/ui/Heading';
import { RevealImage } from '@/components/ui/RevealImage';
import { Reveal } from '@/components/ui/Reveal';

/** Signature (editorial): magazine-scale cards, clip-path image reveals, cursor becomes "View" */
export function CaseStudies() {
  const [lead, ...rest] = caseStudies;
  return (
    <section id="work" aria-labelledby="work-title" className="py-section">
      <div className="container-x">
        <Heading id="work-title" eyebrow="Case studies" title="Proof, not promises." size="xl" className="mb-16" highlight={[2]} />

        {/* lead story */}
        <Link href={`/case-studies/${lead.slug}`} data-cursor="label" data-cursor-label="View" className="group block">
          <article className="grid gap-8 lg:grid-cols-12">
            <RevealImage src={lead.image} alt={`${lead.client} project`} sizes="(min-width:1024px) 66vw, 100vw" wrapperClassName="aspect-[16/10] rounded-xl3 lg:col-span-8" priority={false} />
            <Reveal className="flex flex-col justify-between gap-8 lg:col-span-4">
              <div data-reveal>
                <p className="eyebrow">{lead.client} · {lead.industry}</p>
                <h3 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">{lead.title}</h3>
              </div>
              <div data-reveal>
                <p className="font-display text-[clamp(4rem,9vw,8rem)] font-extrabold leading-none tracking-[-0.05em] text-gradient">{lead.metric}</p>
                <p className="mt-2 font-mono text-label uppercase text-muted">{lead.metricLabel}</p>
              </div>
            </Reveal>
          </article>
        </Link>

        <div className="mt-20 grid gap-x-6 gap-y-16 md:grid-cols-3">
          {rest.map((c, i) => (
            <Link key={c.slug} href={`/case-studies/${c.slug}`} data-cursor="label" data-cursor-label="View" className={`group block ${i === 1 ? 'md:mt-24' : ''}`}>
              <article>
                <div className="duo duo-hover relative aspect-[4/5] overflow-hidden rounded-xl3 bg-elevated">
                  <Image src={c.image} alt={`${c.client} project`} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover" />
                  <div className="absolute inset-0 z-[2] bg-gradient-to-t from-black/85 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 z-[3]">
                    <p className="font-display text-6xl font-extrabold leading-none tracking-[-0.04em] text-white">{c.metric}</p>
                    <p className="mt-2 font-mono text-label uppercase text-white/70">{c.metricLabel}</p>
                  </div>
                </div>
                <p className="eyebrow mt-6">{c.client} · {c.industry}</p>
                <h3 className="mt-3 text-xl font-semibold leading-snug md:text-2xl">{c.title}</h3>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
