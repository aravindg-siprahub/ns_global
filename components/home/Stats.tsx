import { Counter } from '@/components/ui/Counter';
import { Reveal } from '@/components/ui/Reveal';
import { stats } from '@/lib/content';

/** Signature: numbers count up as they enter view */
export function Stats() {
  return (
    <section aria-label="Company in numbers" className="border-y hairline">
      <Reveal className="container-x grid grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            data-reveal
            className={`flex min-w-0 flex-col gap-3 py-10 md:py-12 ${i % 2 ? 'pl-6 md:pl-10' : 'pr-6 md:pr-10'} ${i > 0 ? 'lg:border-l lg:pl-10' : ''} ${i % 2 ? 'border-l' : ''} ${i > 1 ? 'border-t lg:border-t-0' : ''} hairline`}
          >
            <Counter value={s.value} suffix={s.suffix} className="font-display text-[clamp(2rem,3.4vw,3.25rem)] font-extrabold leading-none tracking-[-0.03em]" />
            <span className="font-mono text-label uppercase text-muted">{s.label}</span>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
