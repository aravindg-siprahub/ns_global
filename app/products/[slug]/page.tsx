import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/pages/PageHero';
import { CtaStrip } from '@/components/pages/CtaStrip';
import { ProductMockup } from '@/components/home/ProductMockup';
import { Card } from '@/components/ui/Card';
import { Reveal } from '@/components/ui/Reveal';
import { ButtonLink } from '@/components/ui/Button';
import { Counter } from '@/components/ui/Counter';
import { Heading } from '@/components/ui/Heading';
import { SwipeRail } from '@/components/ui/SwipeRail';
import { products, findBy } from '@/lib/content';

type Params = { params: { slug: string } };

export const generateStaticParams = () => products.map((p) => ({ slug: p.slug }));

export function generateMetadata({ params }: Params): Metadata {
  const p = findBy(products, params.slug);
  if (!p) return {};
  return { title: `${p.name} — ${p.category}`, description: p.description, alternates: { canonical: `/products/${p.slug}` } };
}

export default function ProductDetail({ params }: Params) {
  const p = findBy(products, params.slug);
  if (!p) notFound();

  const productLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: p.name,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: p.description,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />
      <PageHero eyebrow={p.category} title={`${p.name}.\n${p.tagline}`} highlight={[0]} intro={p.description} crumbs={[{ label: 'Products', href: '/products' }, { label: p.name, href: `/products/${p.slug}` }]}>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/contact" arrow>Book a demo</ButtonLink>
          <ButtonLink href="#features" variant="outline">See features</ButtonLink>
        </div>
      </PageHero>

      <section className="py-20">
        <div className="container-x">
          <div className="mx-auto max-w-5xl [perspective:1600px]">
            <div className="md:[transform:rotateX(8deg)]">
              <ProductMockup product={p} step={1} />
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-section">
        <div className="container-x">
          <Heading eyebrow="Features" title={`Everything ${p.name} does for you.`} size="lg" className="mb-12 md:mb-16" />
          <Reveal>
            <SwipeRail label={`${p.name} features`} grid="lg:grid-cols-4 lg:gap-6">
              {p.features.map((f, i) => (
                <div data-reveal key={f.title} className="h-full">
                  <Card className="flex h-full min-h-[17rem] flex-col p-6 md:p-8">
                    <span className="grid h-10 w-10 place-items-center text-sm font-bold text-white" style={{ background: p.color }}>{String(i + 1).padStart(2, '0')}</span>
                    <h3 className="mt-8 font-display text-2xl font-bold leading-tight">{f.title}</h3>
                    <p className="mt-3 text-base leading-relaxed text-muted">{f.body}</p>
                  </Card>
                </div>
              ))}
            </SwipeRail>
          </Reveal>
        </div>
      </section>

      <section className="border-y hairline">
        <div className="container-x grid grid-cols-2 divide-x divide-fg/10">
          {p.metrics.map((m) => {
            const num = parseFloat(m.value.replace(/[^\d.]/g, ''));
            const suffix = m.value.replace(/^[<\d.]+/, '');
            const prefix = m.value.startsWith('<') ? '<' : '';
            return (
              <div key={m.label} className="px-6 py-16 md:px-12 md:py-24">
                <Counter value={num} suffix={suffix} prefix={prefix} className="font-display text-[clamp(3rem,7vw,6rem)] font-semibold leading-none tracking-[-0.04em]" />
                <p className="mt-3 text-base font-medium text-muted md:text-lg">{m.label.charAt(0).toUpperCase() + m.label.slice(1)}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="pt-section">
        <div className="container-x">
          <Heading eyebrow="More products" title="Explore the rest of the suite." size="md" className="mb-10 md:mb-12" />
          <SwipeRail label="More products" grid="lg:grid-cols-2 lg:gap-6">
            {products.filter((o) => o.slug !== p.slug).map((o, i) => (
              <Link key={o.slug} href={`/products/${o.slug}`} className="theme-dark group flex h-full flex-col overflow-hidden">
                <div className="pointer-events-none p-4 pb-0 md:p-6 md:pb-0">
                  <ProductMockup product={o} step={(i + 1) % 4} className="-mb-10" />
                </div>
                <div className="relative z-[1] flex flex-1 flex-col bg-black p-6 md:p-8">
                  <p className="text-sm font-semibold" style={{ color: o.color }}>{o.category}</p>
                  <h3 className="mt-2 font-display text-3xl font-bold">{o.name}</h3>
                  <p className="mt-2 text-lg text-white/75">{o.tagline}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-6 font-semibold">
                    <span className="link-underline">Explore {o.name}</span>
                    <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </SwipeRail>
        </div>
      </section>
      <CtaStrip title={`Put ${p.name} to work.`} cta="Book a demo" />
    </>
  );
}
