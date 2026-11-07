import { ButtonLink } from '@/components/ui/Button';
import { AnimatedText } from '@/components/ui/AnimatedText';
import { RevealImage } from '@/components/ui/RevealImage';
import { Reveal } from '@/components/ui/Reveal';
import { unsplash } from '@/lib/utils';

// Real figures from nsglobaltech.com
const facts = [
  { value: '500+', label: 'Active students' },
  { value: '300+', label: 'Placements' },
  { value: '15+', label: 'Expert trainers' },
  { value: '12+', label: 'Courses' },
];

/** Who we are: photo on one side (clip-path reveal), statement + facts on the other */
export function Statement() {
  return (
    <section id="who-we-are" aria-labelledby="who-title" className="py-section">
      <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <RevealImage
          src={unsplash('photo-1543269865-cbf427effbad', 1400)}
          alt="Students collaborating and laughing around a table during a training session"
          sizes="(min-width:1024px) 45vw, 100vw"
          wrapperClassName="aspect-[4/5] w-full lg:col-span-5"
        />

        <div className="lg:col-span-7">
          <h2 id="who-title" className="eyebrow flex items-center gap-3">
            <span aria-hidden className="rule" />
            Who we are
          </h2>
          <AnimatedText
            as="p"
            text="We don’t just teach tools. We build careers — with live projects, mentors who work in the industry and support that stays with you until you’re hired."
            className="mt-6 font-display text-[clamp(1.75rem,2.8vw,2.75rem)] font-bold leading-[1.12] tracking-[-0.02em]"
            stagger={0.02}
          />
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            N S Global Tech is a Bangalore-based IT training institute. Our programs in data, cloud, testing and full-stack development are built around real-world projects, weekly mock interviews and 1:1 mentorship.
          </p>

          <Reveal className="mt-10 grid grid-cols-2 gap-px overflow-hidden border hairline bg-fg/10 sm:grid-cols-4">
            {facts.map((f) => (
              <div key={f.label} data-reveal className="bg-ink p-5">
                <p className="font-display text-3xl font-extrabold tracking-[-0.02em]">{f.value}</p>
                <p className="mt-1 font-mono text-label uppercase text-muted">{f.label}</p>
              </div>
            ))}
          </Reveal>

          <div className="mt-10">
            <ButtonLink href="/about" variant="outline" arrow>
              Our story
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
