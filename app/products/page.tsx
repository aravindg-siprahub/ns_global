import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/pages/PageHero';
import { CtaStrip } from '@/components/pages/CtaStrip';
import { ProductMockup } from '@/components/home/ProductMockup';
import { Reveal } from '@/components/ui/Reveal';
import { products } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Products',
  description: 'Helix AI analytics, Sentinel cloud security and Flowgrid workflow automation — enterprise software built and run by NS Global Tech.',
  alternates: { canonical: '/products' },
};

export default function ProductsPage() {
  return (
    <>
      <PageHero eyebrow="Products" title={'Software we\nbet our name on.'} highlight={[2, 3, 4, 5]} crumbs={[{ label: 'Products', href: '/products' }]} intro="Built from thousands of client engagements. Proven in production at the world’s most demanding enterprises." />
      <section className="py-section">
        <div className="container-x space-y-32">
          {products.map((p, i) => (
            <Reveal key={p.slug} className="grid items-center gap-12 lg:grid-cols-12">
              <div data-reveal className={`lg:col-span-5 ${i % 2 ? 'lg:order-2 lg:col-start-8' : ''}`}>
                <p className="font-mono text-label uppercase" style={{ color: p.color }}>{p.category}</p>
                <h2 className="mt-4 text-display-lg font-semibold">{p.name}</h2>
                <p className="mt-4 font-display text-2xl">{p.tagline}</p>
                <p className="mt-4 text-lg text-muted">{p.description}</p>
                <Link href={`/products/${p.slug}`} className="link-underline mt-8 inline-block font-mono text-label uppercase">Explore {p.name} →</Link>
              </div>
              <div data-reveal className={`lg:col-span-7 ${i % 2 ? 'lg:order-1' : ''}`}>
                <ProductMockup product={p} step={i % 4} />
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaStrip title="See them in action." cta="Book a demo" />
    </>
  );
}
