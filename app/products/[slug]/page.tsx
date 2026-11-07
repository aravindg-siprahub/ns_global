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
            <div className="[transform:rotateX(8deg)]">
              <ProductMockup product={p} step={1} />
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-section">
        <div className="container-x">
          <p className="eyebrow mb-10">Features</p>
          <Reveal className="grid gap-6 md:grid-cols-2">
            {p.features.map((f, i) => (
              <div data-reveal key={f.title}>
                <Card className="h-full p-10">
                  <span className="font-mono text-label" style={{ color: p.color }}>0{i + 1}</span>
                  <h2 className="mt-6 text-3xl font-semibold">{f.title}</h2>
                  <p className="mt-4 text-lg text-muted">{f.body}</p>
                </Card>
              </div>
            ))}
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
                <p className="mt-4 font-mono text-label uppercase text-muted">{m.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-20">
        <div className="container-x flex flex-wrap gap-3">
          <span className="eyebrow mr-4 self-center">More products</span>
          {products.filter((o) => o.slug !== p.slug).map((o) => (
            <Link key={o.slug} href={`/products/${o.slug}`} className="rounded-full border hairline px-5 py-2.5 transition-colors hover:border-accent">{o.name} · <span className="text-muted">{o.category}</span></Link>
          ))}
        </div>
      </section>
      <CtaStrip title={`Put ${p.name} to work.`} cta="Book a demo" />
    </>
  );
}
