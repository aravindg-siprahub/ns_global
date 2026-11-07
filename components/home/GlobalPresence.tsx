import DottedMap from 'dotted-map';
import { offices } from '@/lib/content';
import { Heading } from '@/components/ui/Heading';
import { WorldMap } from './WorldMap';

// Computed once on the server at build time — zero client cost for the land dots.
function buildMap() {
  const map = new DottedMap({ height: 56, grid: 'diagonal' });
  const pins = offices.map((o) => ({ ...o, ...map.getPin({ lat: o.lat, lng: o.lng }) }));
  const points = map.getPoints().map((p) => [p.x, p.y] as [number, number]);
  return { points, pins, width: map.image.width, height: map.image.height };
}

export function GlobalPresence() {
  const data = buildMap();
  return (
    <section aria-labelledby="global-title" className="relative overflow-hidden py-section">
      <div className="container-x">
        <div className="mb-12 grid gap-8 lg:grid-cols-12">
          <Heading id="global-title" eyebrow="Global presence" title="Local teams. Global scale." size="lg" className="lg:col-span-7" />
          <p className="self-end text-lg text-muted lg:col-span-5">
            {offices.length} delivery hubs across 28 countries, working around the clock so your business never sleeps. Hover a city to find us.
          </p>
        </div>
        <WorldMap {...data} />
      </div>
    </section>
  );
}
