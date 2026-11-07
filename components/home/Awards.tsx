import { awards } from '@/lib/content';

/** Awards as a flat grid. Names are placeholders — replace with your real recognitions. */
export function Awards() {
  return (
    <section aria-labelledby="awards-title" className="py-20 md:py-28">
      <div className="container-x">
        <h2 id="awards-title" className="eyebrow mb-10 flex items-center gap-3">
          <span aria-hidden className="rule" />
          Awards & recognition
        </h2>
        <ul className="grid gap-px border hairline bg-fg/10 sm:grid-cols-2 lg:grid-cols-4">
          {awards.slice(0, 4).map((a) => (
            <li key={a.title} className="flex min-h-44 flex-col justify-between bg-ink p-7">
              <span className="font-mono text-label text-muted">{a.year}</span>
              <div>
                <p className="font-display text-2xl font-black uppercase leading-none">{a.title}</p>
                <p className="mt-2 text-sm text-muted">{a.org}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
