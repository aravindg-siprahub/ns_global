import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { AnimatedText } from '@/components/ui/AnimatedText';

type Crumb = { label: string; href: string };
type Props = { eyebrow: string; title: string; intro?: ReactNode; image?: string; crumbs?: Crumb[]; children?: ReactNode; highlight?: number[] };

/** Shared hero for inner pages: breadcrumb, masked headline, optional full-bleed image */
export function PageHero({ eyebrow, title, intro, image, crumbs = [], children, highlight }: Props) {
  return (
    <section className="relative overflow-hidden pt-[calc(var(--header-h)+5rem)] md:pt-[calc(var(--header-h)+7rem)]">
      <div className="container-x relative">
        <nav aria-label="Breadcrumb" className="mb-10">
          <ol className="flex flex-wrap items-center gap-2 font-mono text-label uppercase text-muted">
            <li><Link href="/" className="hover:text-fg">Home</Link></li>
            {crumbs.map((c) => (
              <li key={c.href} className="flex items-center gap-2">
                <span aria-hidden>/</span>
                <Link href={c.href} className="hover:text-fg">{c.label}</Link>
              </li>
            ))}
          </ol>
        </nav>
        <p className="eyebrow mb-6 flex items-center gap-3">
          <span aria-hidden className="rule" />
          {eyebrow}
        </p>
        <AnimatedText as="h1" trigger="load" text={title} highlight={highlight} className="max-w-6xl font-display text-display-xl font-extrabold" />
        {intro && <div className="mt-8 max-w-2xl text-lg text-muted md:text-xl">{intro}</div>}
        {children}
      </div>
      {image && (
        <div className="container-x mt-16 md:mt-24">
          <div className="duo relative aspect-[16/9] overflow-hidden rounded-xl3 bg-elevated md:aspect-[21/9]">
            <Image src={image} alt="" fill priority sizes="(min-width:1440px) 1440px, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        </div>
      )}
    </section>
  );
}
