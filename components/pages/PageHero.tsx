import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { AnimatedText } from '@/components/ui/AnimatedText';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbJsonLd } from '@/lib/seo';

type Crumb = { label: string; href: string };
type Props = {
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  image?: string;
  imageAlt?: string;
  crumbs?: Crumb[];
  children?: ReactNode;
  highlight?: number[];
  /** Image beside the copy (desktop) instead of a full-width band below it */
  split?: boolean;
  /** Shown right after the headline (e.g. a technology logo) */
  titleAside?: ReactNode;
};

/** Shared hero for inner pages: breadcrumb, masked headline, optional image */
export function PageHero({ eyebrow, title, intro, image, imageAlt = '', crumbs = [], children, highlight, split = false, titleAside }: Props) {
  const copy = (
    <>
      {crumbs.length > 0 && <JsonLd data={breadcrumbJsonLd(crumbs)} />}
      <nav aria-label="Breadcrumb" className="mb-8 md:mb-10">
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
      <p className="eyebrow mb-5 flex items-center gap-3 md:mb-6">
        <span aria-hidden className="rule" />
        {eyebrow}
      </p>
      {titleAside ? (
        <div className="flex flex-wrap items-center gap-x-5 gap-y-4">
          <AnimatedText as="h1" trigger="load" text={title} highlight={highlight} className="max-w-6xl font-display text-display-xl font-extrabold" />
          {titleAside}
        </div>
      ) : (
        <AnimatedText as="h1" trigger="load" text={title} highlight={highlight} className="max-w-6xl font-display text-display-xl font-extrabold" />
      )}
      {intro && <div className="mt-6 max-w-2xl text-lg leading-relaxed text-muted md:mt-8 md:text-xl">{intro}</div>}
      {children}
    </>
  );

  if (split && image) {
    return (
      <section className="relative overflow-hidden pt-[calc(var(--header-h)+2.5rem)] md:pt-[calc(var(--header-h)+4rem)]">
        <div className="container-x grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">{copy}</div>
          <div className="lg:col-span-5">
            <div className="duo relative aspect-[16/11] overflow-hidden bg-elevated sm:aspect-[16/9] lg:aspect-[4/5]">
              <Image src={image} alt={imageAlt} fill priority sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden pt-[calc(var(--header-h)+2.5rem)] md:pt-[calc(var(--header-h)+7rem)]">
      <div className="container-x relative">{copy}</div>
      {image && (
        <div className="container-x mt-12 md:mt-24">
          <div className="duo relative aspect-[16/10] overflow-hidden rounded-xl3 bg-elevated md:aspect-[21/9]">
            <Image src={image} alt={imageAlt} fill priority sizes="(min-width:1440px) 1440px, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          </div>
        </div>
      )}
    </section>
  );
}
