import type { Metadata } from 'next';
import { PageHero } from '@/components/pages/PageHero';
import { ContactForm } from '@/components/home/ContactForm';
import { Reveal } from '@/components/ui/Reveal';
import { offices, company } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Tell us what you’re building. A specialist will be in touch within one business day.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title={'Let’s build\nthe future together.'} highlight={[3]} crumbs={[{ label: 'Contact', href: '/contact' }]} />
      <section className="py-section">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="space-y-10 lg:col-span-4">
            <div>
              <p className="eyebrow mb-3">New business</p>
              <a href={`mailto:${company.email}`} className="link-underline font-display text-2xl">{company.email}</a>
            </div>
            <div>
              <p className="eyebrow mb-3">Phone</p>
              <a href={`tel:${company.phone.replace(/[^\d+]/g, '')}`} className="font-display text-2xl">{company.phone}</a>
            </div>
            <div>
              <p className="eyebrow mb-3">Careers</p>
              <a href="/careers" className="link-underline text-lg">See open roles →</a>
            </div>
          </div>
          <ContactForm className="lg:col-span-7 lg:col-start-6" />
        </div>
      </section>
      <section className="pb-section">
        <div className="container-x">
          <p className="eyebrow mb-10">Our offices</p>
          <Reveal className="grid gap-px overflow-hidden rounded-xl3 border hairline bg-fg/10 sm:grid-cols-2 lg:grid-cols-5">
            {offices.map((o) => (
              <address key={o.city} data-reveal className="bg-ink p-7 not-italic">
                <p className="font-mono text-label uppercase text-accent2">{o.hq ? 'Global HQ' : o.country}</p>
                <p className="mt-3 font-display text-2xl font-semibold">{o.city}</p>
                <p className="mt-2 text-sm text-muted">{o.address}</p>
              </address>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
