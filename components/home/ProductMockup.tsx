import type { Product } from '@/lib/content';
import { cn } from '@/lib/utils';

/** Pure-CSS animated product UI — no screenshots needed, crisp at any size, themable. */
export function ProductMockup({ product, step = 0, className }: { product: Product; step?: number; className?: string }) {
  const bars = [42, 68, 55, 80, 62, 92, 74, 88, 70, 96, 84, 100];
  return (
    <div className={cn('relative overflow-hidden border hairline bg-surface', className)}>
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b hairline px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-fg/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-fg/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-fg/15" />
        <span className="ml-4 rounded-md bg-fg/5 px-3 py-1 font-mono text-[10px] text-muted">app.nsglobal.tech/{product.slug}</span>
      </div>
      <div className="grid grid-cols-12 gap-3 p-4 md:p-5">
        {/* sidebar */}
        <div className="col-span-3 hidden space-y-2 md:block">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-5 w-5 rounded-md" style={{ background: product.color }} />
            <span className="font-display text-sm font-semibold">{product.name}</span>
          </div>
          {product.features.map((f, i) => (
            <div key={f.title} className={cn('truncate rounded-md px-2 py-1.5 text-[11px] transition-colors duration-500', i === step ? 'bg-accent/15 text-fg' : 'text-muted')}>
              {f.title}
            </div>
          ))}
        </div>
        {/* main */}
        <div className="col-span-12 space-y-3 md:col-span-9">
          <div className="flex items-center gap-2 rounded-lg border hairline bg-ink/40 px-3 py-2">
            <span className="h-2 w-2 animate-pulse rounded-full" style={{ background: product.color }} />
            <span className="truncate font-mono text-[11px] text-muted">{product.features[step]?.body}</span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {product.metrics.concat({ value: `${92 + step}%`, label: 'health score' }).map((m) => (
              <div key={m.label} className="rounded-lg border hairline bg-ink/30 p-3">
                <div className="font-display text-lg font-semibold md:text-2xl">{m.value}</div>
                <div className="truncate font-mono text-[9px] uppercase tracking-wider text-muted">{m.label}</div>
              </div>
            ))}
          </div>
          <div className="relative h-36 rounded-lg border hairline bg-ink/30 p-3 md:h-44">
            <div className="flex h-full items-end gap-1.5">
              {bars.map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm transition-all duration-1000 ease-premium"
                  style={{
                    height: `${Math.max(12, ((h + step * 17 * ((i % 3) - 1)) % 100) || 30)}%`,
                    background: i === bars.length - 1 - step * 2 ? product.color : `rgb(var(--c-fg) / ${0.1 + (i / bars.length) * 0.2})`,
                  }}
                />
              ))}
            </div>
            <svg className="absolute inset-3 h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)]" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden>
              <path
                d={step % 2 ? 'M0 32 C 20 30, 30 12, 50 16 S 80 6, 100 4' : 'M0 30 C 15 26, 35 28, 50 18 S 75 14, 100 8'}
                fill="none"
                stroke={product.color}
                strokeWidth="0.8"
                className="transition-all duration-1000"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
