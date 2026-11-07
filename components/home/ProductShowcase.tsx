'use client';
import Link from 'next/link';
import { useState } from 'react';
import { products } from '@/lib/content';
import { Heading } from '@/components/ui/Heading';
import { ProductMockup } from './ProductMockup';
import { cn } from '@/lib/utils';

/** Products on a black band: tabs switch product, feature list switches the UI view */
export function ProductShowcase() {
  const [active, setActive] = useState(0);
  const [step, setStep] = useState(0);
  const product = products[active];

  return (
    <section aria-labelledby="products-title" className="theme-dark py-section">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Heading id="products-title" eyebrow="Our products" title="Software we bet our name on." size="md" />
          <div role="tablist" aria-label="Products" className="mt-10 flex border-b hairline">
            {products.map((p, i) => (
              <button
                key={p.slug}
                role="tab"
                aria-selected={active === i}
                aria-controls="product-panel"
                onClick={() => {
                  setActive(i);
                  setStep(0);
                }}
                className={cn('-mb-px border-b-[3px] px-5 py-3 font-semibold transition-colors', active === i ? 'border-accent text-fg' : 'border-transparent text-muted hover:text-fg')}
              >
                {p.name}
              </button>
            ))}
          </div>
          <div id="product-panel" role="tabpanel" className="mt-8">
            <p className="font-mono text-label uppercase text-muted">{product.category}</p>
            <p className="mt-3 font-display text-3xl font-bold">{product.tagline}</p>
            <ol className="mt-8 border-t hairline">
              {product.features.map((f, i) => (
                <li key={f.title} className="border-b hairline">
                  <button type="button" onClick={() => setStep(i)} className="flex w-full items-start gap-5 py-4 text-left" aria-expanded={step === i}>
                    <span className={cn('mt-1 font-mono text-label', step === i ? 'text-accent' : 'text-muted')}>0{i + 1}</span>
                    <span>
                      <span className={cn('block font-semibold', step !== i && 'text-muted')}>{f.title}</span>
                      {step === i && <span className="mt-1 block text-sm text-muted">{f.body}</span>}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
            <Link href={`/products/${product.slug}`} className="mt-8 inline-block font-semibold">
              <span className="link-underline">Discover {product.name}</span> →
            </Link>
          </div>
        </div>
        <div className="flex items-center lg:col-span-7">
          <ProductMockup product={product} step={step} className="w-full" />
        </div>
      </div>
    </section>
  );
}
