import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/pages/PageHero';
import { CtaStrip } from '@/components/pages/CtaStrip';
import { Heading } from '@/components/ui/Heading';
import { Reveal } from '@/components/ui/Reveal';
import { RevealImage } from '@/components/ui/RevealImage';
import { Card } from '@/components/ui/Card';
import { roles, values, images, company } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Careers',
  description: 'Build what’s next with 12,000 engineers, designers and consultants across 28 countries.',
  alternates: { canonical: '/careers' },
};

const perks = ['Learning budget of $3,000 a year', 'Hybrid by default', '26 weeks paid parental leave', 'Internal mobility across 28 countries', 'Wellbeing days, every quarter', 'Equity for senior roles'];

export default function CareersPage() {
  return (
    <>
      <PageHero eyebrow="Careers" title={'Build what’s next\nwith us.'} highlight={[2]} image={images.careers} crumbs={[{ label: 'Careers', href: '/careers' }]} intro="Hard problems, brilliant people and the freedom to do the best work of your life." />

      <section className="py-section">
        <div className="container-x">
          <Heading eyebrow="What we value" title="How we work together." size="lg" className="mb-16" />
          <Reveal className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <div data-reveal key={v.title}>
                <Card className="h-full p-8">
                  <span className="font-mono text-label text-accent2">0{i + 1}</span>
                  <h3 className="mt-8 text-2xl font-semibold">{v.title}</h3>
                  <p className="mt-3 text-muted">{v.body}</p>
                </Card>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="pb-section">
        <div className="container-x grid gap-6 md:grid-cols-12">
          <RevealImage src={images.team} alt="Engineers pairing at a desk" wrapperClassName="aspect-[4/3] rounded-xl3 md:col-span-7" sizes="(min-width:768px) 58vw, 100vw" />
          <div className="flex flex-col justify-end md:col-span-5">
            <p className="eyebrow mb-6">Benefits</p>
            <ul className="divide-y divide-fg/10 border-y hairline">
              {perks.map((p) => <li key={p} className="py-4 text-lg">{p}</li>)}
            </ul>
          </div>
        </div>
      </section>

      <section id="roles" className="scroll-mt-24 pb-section">
        <div className="container-x">
          <Heading eyebrow="Open roles" title="Find your next challenge." size="lg" className="mb-12" />
          <Reveal className="divide-y divide-fg/10 border-y hairline">
            {roles.map((r) => (
              <a key={r.title} data-reveal href={`mailto:careers@nsglobaltech.com?subject=${encodeURIComponent(r.title)}`} className="group grid items-center gap-2 py-7 md:grid-cols-12" data-cursor="label" data-cursor-label="Apply">
                <span className="text-2xl font-semibold md:col-span-6">{r.title}</span>
                <span className="text-muted md:col-span-3">{r.team}</span>
                <span className="font-mono text-label uppercase text-muted md:col-span-2">{r.location}</span>
                <span aria-hidden className="hidden text-right text-2xl transition-transform group-hover:translate-x-1 md:col-span-1 md:block">→</span>
              </a>
            ))}
          </Reveal>
          <p className="mt-8 text-muted">Don’t see your role? <Link href="/contact" className="link-underline text-fg">Introduce yourself</Link> — we hire people, not job descriptions. Write to <span className="text-fg">careers@{company.email.split('@')[1]}</span>.</p>
        </div>
      </section>
      <CtaStrip title="Your best work is waiting." cta="Get in touch" />
    </>
  );
}
