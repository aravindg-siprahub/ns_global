import type { Metadata } from 'next';
import { PageHero } from '@/components/pages/PageHero';
import { CtaStrip } from '@/components/pages/CtaStrip';
import { Stats } from '@/components/home/Stats';
import { Awards } from '@/components/home/Awards';
import { Heading } from '@/components/ui/Heading';
import { Reveal } from '@/components/ui/Reveal';
import { RevealImage } from '@/components/ui/RevealImage';
import { images, values, company } from '@/lib/content';

export const metadata: Metadata = {
  title: 'About us',
  description: `Since ${company.founded}, NS Global Tech has helped the world’s leading organisations build, secure and run what comes next.`,
  alternates: { canonical: '/about' },
};

const timeline = [
  { year: '2008', text: 'Founded in Chennai by six engineers with one client and a big idea.' },
  { year: '2012', text: 'Opened London and New York. Crossed 1,000 people.' },
  { year: '2016', text: 'Launched Cloud and Cybersecurity practices.' },
  { year: '2019', text: 'Released Flowgrid, our first product, now used by 300+ enterprises.' },
  { year: '2022', text: 'Launched Helix and Sentinel. Became a top-10 security innovator.' },
  { year: '2026', text: '12,000 people in 28 countries, building the next decade of business.' },
];

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About us" title={'We build\nwhat others\nonly advise on.'} highlight={[4, 5, 6]} image={images.about} crumbs={[{ label: 'About', href: '/about' }]} intro={company.description} />
      <Stats />
      <section className="py-section">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <Heading eyebrow="Our story" title="Eighteen years of building." size="lg" className="lg:col-span-5" />
          <Reveal className="lg:col-span-7">
            <ol className="relative border-l hairline">
              {timeline.map((t) => (
                <li key={t.year} data-reveal className="relative pb-12 pl-10 last:pb-0">
                  <span aria-hidden className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-accent/20" />
                  <p className="font-mono text-label text-accent2">{t.year}</p>
                  <p className="mt-2 text-xl md:text-2xl">{t.text}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>
      <section className="pb-section">
        <div className="container-x grid gap-6 md:grid-cols-2">
          <RevealImage src={images.meeting} alt="Leadership team in discussion" wrapperClassName="aspect-[4/3] rounded-xl3" sizes="(min-width:768px) 50vw, 100vw" />
          <RevealImage src={images.office2} alt="NS Global Tech office interior" wrapperClassName="aspect-[4/3] rounded-xl3 md:mt-24" sizes="(min-width:768px) 50vw, 100vw" />
        </div>
      </section>
      <section className="pb-section">
        <div className="container-x">
          <Heading eyebrow="Principles" title="What we stand for." size="lg" className="mb-12" />
          <Reveal className="grid gap-10 md:grid-cols-2">
            {values.map((v) => (
              <div key={v.title} data-reveal className="border-t hairline pt-6">
                <h3 className="text-2xl font-semibold">{v.title}</h3>
                <p className="mt-3 text-lg text-muted">{v.body}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
      <Awards />
      <CtaStrip />
    </>
  );
}
