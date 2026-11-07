'use client';
import { useState } from 'react';
import type { Office } from '@/lib/content';
import { cn } from '@/lib/utils';

type Pin = Office & { x: number; y: number };
type Props = { points: [number, number][]; pins: Pin[]; width: number; height: number };

/** Dotted world map with glowing office pins; hover/focus reveals the address */
export function WorldMap({ points, pins, width, height }: Props) {
  const [active, setActive] = useState<string | null>(pins.find((p) => p.hq)?.city ?? null);
  const current = pins.find((p) => p.city === active);

  return (
    <div className="relative">
      <div className="relative w-full" style={{ aspectRatio: `${width} / ${height}` }}>
        <svg viewBox={`0 0 ${width} ${height}`} className="absolute inset-0 h-full w-full" aria-hidden>
          <defs>
            <radialGradient id="map-fade" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="rgb(var(--c-fg))" stopOpacity="0.35" />
              <stop offset="100%" stopColor="rgb(var(--c-fg))" stopOpacity="0.12" />
            </radialGradient>
          </defs>
          {points.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={0.22} fill="url(#map-fade)" />
          ))}
          {/* arcs from HQ */}
          {(() => {
            const hq = pins.find((p) => p.hq);
            if (!hq) return null;
            return pins.filter((p) => !p.hq).map((p) => {
              const mx = (hq.x + p.x) / 2;
              const my = Math.min(hq.y, p.y) - Math.abs(hq.x - p.x) * 0.18;
              return <path key={p.city} d={`M${hq.x} ${hq.y} Q${mx} ${my} ${p.x} ${p.y}`} fill="none" stroke="rgb(var(--c-accent))" strokeOpacity={active === p.city ? 0.9 : 0.18} strokeWidth={0.15} className="transition-[stroke-opacity] duration-500" />;
            });
          })()}
        </svg>

        <ul>
          {pins.map((p) => (
            <li key={p.city} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${(p.x / width) * 100}%`, top: `${(p.y / height) * 100}%` }}>
              <button
                type="button"
                onMouseEnter={() => setActive(p.city)}
                onFocus={() => setActive(p.city)}
                aria-label={`${p.city}, ${p.country}: ${p.address}`}
                aria-pressed={active === p.city}
                className="group relative grid h-8 w-8 place-items-center"
              >
                <span className={cn('absolute h-3 w-3 animate-pulse2 rounded-full', p.hq ? 'bg-accent2' : 'bg-accent')} />
                <span className={cn('relative h-2.5 w-2.5 rounded-full ring-4 transition-transform duration-500 group-hover:scale-150', p.hq ? 'bg-accent2 ring-accent2/25' : 'bg-accent ring-accent/25', active === p.city && 'scale-150')} />
                <span className={cn('pointer-events-none absolute left-1/2 top-full mt-1 hidden -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-wider md:block', active === p.city ? 'text-fg' : 'text-muted')}>
                  {p.city}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {current && (
        <div aria-live="polite" className="glass mt-6 inline-flex flex-col gap-1 rounded-xl2 px-6 py-5 md:absolute md:bottom-4 md:left-0 md:mt-0">
          <p className="font-mono text-label uppercase text-accent2">{current.hq ? 'Global HQ' : 'Office'} · {current.country}</p>
          <p className="font-display text-2xl font-semibold">{current.city}</p>
          <p className="text-sm text-muted">{current.address}</p>
        </div>
      )}
    </div>
  );
}
