import Link from 'next/link';
import { services } from '@/lib/content';
import { Heading } from '@/components/ui/Heading';
import { Reveal } from '@/components/ui/Reveal';
import { EditorialCard } from '@/components/ui/EditorialCard';
import { SwipeRail } from '@/components/ui/SwipeRail';

/** Training programmes as Accenture-style flip cards */
export function ServicesScroll() {
  return (
    <section aria-labelledby="services-title" className="theme-dark py-section">
      <div className="container-x">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Heading
            id="services-title"
            eyebrow="Our training programs"
            title="Job-ready skills, taught by industry experts."
            intro="Industry-focused programs with hands-on projects, expert guidance and dedicated placement support."
            size="lg"
          />
          <Link href="/contact" className="link-underline shrink-0 font-semibold">Book a free demo →</Link>
        </div>
        <Reveal stagger={0.06}>
          <SwipeRail label="Training programs" grid="lg:grid-cols-4 lg:gap-x-10 lg:gap-y-14">
          {services.map((s, i) => (
            <div key={s.slug} data-reveal>
              <EditorialCard
                variant={i}
                label={s.level}
                title={s.title}
                short={s.short}
                image={s.image}
                logo={s.logo}
                backLabel={`${s.num} · ${s.level}`}
                description={s.description}
                items={s.capabilities}
                primary={{ label: 'Demo', href: `/contact?course=${s.slug}` }}
                secondary={{ label: 'Course details', href: `/services/${s.slug}` }}
              />
            </div>
          ))}
          </SwipeRail>
        </Reveal>
      </div>
    </section>
  );
}
