import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHero } from '@/components/pages/PageHero';
import { CtaStrip } from '@/components/pages/CtaStrip';
import { CourseCard } from '@/components/pages/CourseCard';
import { Reveal } from '@/components/ui/Reveal';
import { Heading } from '@/components/ui/Heading';
import { ButtonLink } from '@/components/ui/Button';
import { SwipeRail } from '@/components/ui/SwipeRail';
import { CourseLogo } from '@/components/ui/CourseLogo';
import { services, trainingModes, findBy } from '@/lib/content';

type Params = { params: { slug: string } };

export const generateStaticParams = () => services.map((s) => ({ slug: s.slug }));

export function generateMetadata({ params }: Params): Metadata {
  const s = findBy(services, params.slug);
  if (!s) return {};
  return { title: s.title, description: s.description, alternates: { canonical: `/services/${s.slug}` }, openGraph: { images: [s.image] } };
}

const cap = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

export default function ServiceDetail({ params }: Params) {
  const s = findBy(services, params.slug);
  if (!s) notFound();
  const idx = services.indexOf(s);
  const next = services[(idx + 1) % services.length];
  const others = [...services.slice(idx + 1), ...services.slice(0, idx)];

  const facts = [
    { value: s.level, label: 'Course level' },
    ...s.outcomes.map((o) => ({ value: o.metric, label: cap(o.label) })),
    { value: 'Online & classroom', label: 'Learning formats' },
  ];

  return (
    <>
      <PageHero
        split
        eyebrow={`Course ${s.num}`}
        title={s.title}
        intro={s.description}
        image={s.image}
        imageAlt={`${s.title} course`}
        titleAside={<CourseLogo src={s.logo} size="lg" />}
        crumbs={[{ label: 'Services', href: '/services' }, { label: s.title, href: `/services/${s.slug}` }]}
      >
        <div className="mt-8 flex flex-wrap gap-3 md:mt-10">
          <ButtonLink href={`/contact?course=${s.slug}`} arrow>Book a free demo</ButtonLink>
          <ButtonLink href="#curriculum" variant="outline">See curriculum</ButtonLink>
        </div>
      </PageHero>

      {/* Key facts */}
      <section className="pt-16 md:pt-24">
        <div className="container-x">
          <Reveal className="grid grid-cols-2 gap-px border hairline bg-fg/10 lg:grid-cols-4">
            {facts.map((f) => (
              <div key={f.label} data-reveal className="bg-ink p-5 md:p-8">
                <p className="font-display text-xl font-bold leading-tight md:text-3xl">{f.value}</p>
                <p className="mt-2 text-sm text-muted md:text-base">{f.label}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Curriculum */}
      <section id="curriculum" className="py-section">
        <div className="container-x">
          <Heading eyebrow="What you’ll learn" title={s.short} intro="Every module is taught live by working professionals and ends with a hands-on project you can show in interviews." size="lg" className="mb-12 md:mb-16" />
          <Reveal>
            <SwipeRail label={`${s.title} curriculum`} grid="lg:grid-cols-4 lg:gap-6">
              {s.capabilities.map((c, i) => (
                <div key={c} data-reveal className="flex h-full min-h-[13rem] flex-col justify-between border-t-[3px] border-accent bg-surface p-6 md:min-h-[16rem] md:p-8">
                  <span className="text-sm font-semibold text-accent">Module {String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-10 font-display text-2xl font-bold leading-tight md:text-[1.75rem]">{c}</h3>
                </div>
              ))}
            </SwipeRail>
          </Reveal>
        </div>
      </section>

      {/* Formats */}
      <section className="bg-[#f4f5f8] py-section">
        <div className="container-x">
          <Heading eyebrow="How you’ll learn" title="Pick the format that fits your week." size="lg" className="mb-12 md:mb-16" />
          <SwipeRail label="Learning formats">
            {trainingModes.map((m) => (
              <article key={m.title} className="h-full overflow-hidden bg-white">
                <div className="relative aspect-[16/10]">
                  <Image src={m.image} alt="" fill sizes="(min-width:1280px) 24vw, (min-width:1024px) 31vw, (min-width:640px) 46vw, 84vw" className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold">{m.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{m.body}</p>
                </div>
              </article>
            ))}
          </SwipeRail>
        </div>
      </section>

      {/* Other courses */}
      <section className="py-section">
        <div className="container-x">
          <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
            <Heading eyebrow="Keep exploring" title="Other courses you might like." size="lg" />
            <Link href="/services" className="link-underline shrink-0 font-semibold">All courses →</Link>
          </div>
          <SwipeRail label="Other courses">
            {others.map((o) => <CourseCard key={o.slug} course={o} />)}
          </SwipeRail>

          <Link href={`/services/${next.slug}`} className="group mt-20 flex items-end justify-between gap-6 border-t hairline pt-10">
            <span>
              <span className="eyebrow">Next course</span>
              <span className="mt-3 block text-display-md font-semibold">{next.title}</span>
            </span>
            <span aria-hidden className="text-4xl transition-transform duration-500 group-hover:translate-x-2">→</span>
          </Link>
        </div>
      </section>
      <CtaStrip title={`Start your ${s.title} journey.`} cta="Book a free demo" href={`/contact?course=${s.slug}`} />
    </>
  );
}
