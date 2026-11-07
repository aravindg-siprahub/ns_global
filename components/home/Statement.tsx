import { ButtonLink } from '@/components/ui/Button';
import { AnimatedText } from '@/components/ui/AnimatedText';

/** Who we are: one bold statement and a supporting paragraph */
export function Statement() {
  return (
    <section id="who-we-are" aria-labelledby="who-title" className="py-section">
      <div className="container-x grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <h2 id="who-title" className="eyebrow flex items-center gap-3">
            <span aria-hidden className="rule" />
            Who we are
          </h2>
        </div>
        <div className="lg:col-span-9">
          <AnimatedText
            as="p"
            text="We don’t hand over slide decks and leave. We build the platform, ship the product and run it — with software of our own when the market’s isn’t good enough."
            className="font-display text-statement font-bold"
            stagger={0.02}
          />
          <p className="mt-8 max-w-2xl text-lg text-muted">
            12,000 strategists, engineers and designers in 28 countries, working as one accountable team from first idea to always-on operations.
          </p>
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
