import { AnimatedText } from '@/components/ui/AnimatedText';
import { ButtonLink } from '@/components/ui/Button';

/** Oversized headline + call-to-action button */
export function ContactCTA() {
  return (
    <section aria-labelledby="cta-title" className="relative overflow-hidden py-section">
      <div className="container-x relative">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <AnimatedText as="h2" id="cta-title" text={'Let’s build\nthe future\ntogether.'} highlight={[3]} className="display-caps text-[clamp(3rem,8.5vw,8.75rem)]" />
          <ButtonLink href="/contact" size="xl" className="shrink-0 self-start lg:self-end" aria-label="Start a project with us">
            Start a project
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
