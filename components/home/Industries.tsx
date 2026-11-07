import Image from 'next/image';
import Link from 'next/link';
import { industries } from '@/lib/content';
import { Heading } from '@/components/ui/Heading';
import { Reveal } from '@/components/ui/Reveal';

/** Industries: wide lead tile + grid, purple-tinted photography */
export function Industries() {
  return (
    <section aria-labelledby="industries-title" className="py-section">
      <div className="container-x">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Heading id="industries-title" eyebrow="Industries" title="Deep in the sectors that run the world." size="lg" />
          <Link href="/industries" className="link-underline shrink-0 font-semibold">All industries →</Link>
        </div>
        <Reveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {industries.map((ind, i) => (
            <Link key={ind.slug} data-reveal href={`/industries/${ind.slug}`} className={`group relative block overflow-hidden bg-black ${i === 0 ? 'aspect-[4/5] sm:col-span-2 sm:aspect-auto lg:row-span-2' : 'aspect-[4/5]'}`}>
              <div className="duo absolute inset-0">
                <Image src={ind.image} alt="" fill sizes="(min-width:1024px) 25vw, 50vw" className="object-cover" />
              </div>
              <div className="absolute inset-x-0 bottom-0 z-[2] bg-gradient-to-t from-black/80 to-transparent p-6 pt-20">
                <h3 className={`font-display font-black uppercase leading-none text-white ${i === 0 ? 'text-4xl' : 'text-2xl'}`}>{ind.title}</h3>
                <p className="mt-2 text-sm text-white/85">{ind.short}</p>
              </div>
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
