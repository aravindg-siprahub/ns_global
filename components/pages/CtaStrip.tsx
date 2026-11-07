import { AnimatedText } from '@/components/ui/AnimatedText';
import { ButtonLink } from '@/components/ui/Button';

export function CtaStrip({ title = 'Ready to build what’s next?', cta = 'Talk to an expert', href = '/contact' }: { title?: string; cta?: string; href?: string }) {
  return (
    <section className="py-section">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-xl3 border hairline bg-surface px-8 py-16 md:px-16 md:py-24">
          <div className="relative flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <AnimatedText as="h2" text={title} className="max-w-3xl font-display text-display-lg font-semibold" />
            <ButtonLink href={href} arrow className="shrink-0">{cta}</ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
