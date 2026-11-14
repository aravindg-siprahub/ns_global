import { ImageResponse } from 'next/og';
import { company, services, findBy } from '@/lib/content';

/**
 * Share card for each course (WhatsApp, LinkedIn, X, Google Discover):
 * course logo + name + topics, on the brand's black/purple.
 */
export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'NS Global Tech course';

// Static references so the bundler ships each logo with this route
const logoFiles: Record<string, URL> = {
  '/logos/snowflake.svg': new URL('../../../public/logos/snowflake.svg', import.meta.url),
  '/logos/informatica.svg': new URL('../../../public/logos/informatica.svg', import.meta.url),
  '/logos/dbt.svg': new URL('../../../public/logos/dbt.svg', import.meta.url),
  '/logos/business-analyst.svg': new URL('../../../public/logos/business-analyst.svg', import.meta.url),
  '/logos/java.svg': new URL('../../../public/logos/java.svg', import.meta.url),
  '/logos/selenium.svg': new URL('../../../public/logos/selenium.svg', import.meta.url),
  '/logos/azure.svg': new URL('../../../public/logos/azure.svg', import.meta.url),
  '/logos/salesforce.svg': new URL('../../../public/logos/salesforce.svg', import.meta.url),
};

export default async function CourseOgImage({ params }: { params: { slug: string } }) {
  const s = findBy(services, params.slug) ?? services[0];
  const svg = await fetch(logoFiles[s.logo]).then((r) => r.text());
  const logoSrc = `data:image/svg+xml;base64,${btoa(svg)}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 64,
          backgroundColor: '#000000',
          backgroundImage: 'radial-gradient(circle at 85% 15%, #9114FF 0%, rgba(145,20,255,0) 50%)',
          color: '#FFFFFF', fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 28, fontWeight: 600 }}>
            <svg width="48" height="48" viewBox="0 0 40 40">
              <rect width="40" height="40" rx="9" fill="#ffffff" fillOpacity="0.08" />
              <path d="M8 28V14h4.4v2.1c1.2-1.6 3-2.5 5.1-2.5 3.7 0 5.7 2.4 5.7 6.3V28h-4.5v-7.3c0-2-.9-3-2.6-3-1.9 0-3.2 1.3-3.2 3.6V28Z" fill="#fff" />
              <polygon points="25,31 28.8,31 35,9 31.2,9" fill="#9114FF" />
            </svg>
            {company.name}
          </div>
          <div style={{ display: 'flex', fontSize: 22, padding: '10px 18px', border: '2px solid rgba(255,255,255,0.35)' }}>{s.level}</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
          <div style={{ display: 'flex', width: 150, height: 150, padding: 24, borderRadius: 28, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoSrc} width={102} height={102} alt="" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 820 }}>
            <div style={{ display: 'flex', fontSize: s.title.length > 16 ? 64 : 84, fontWeight: 700, lineHeight: 1.02, letterSpacing: -2 }}>{s.title}</div>
            <div style={{ display: 'flex', marginTop: 16, fontSize: 34, color: '#C9B8FF' }}>Training with 100% placement support</div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 32, fontSize: 23, color: '#A9AFC4' }}>
          <div style={{ display: 'flex', flex: 1, lineHeight: 1.4 }}>{s.capabilities.join('  ·  ')}</div>
          <div style={{ display: 'flex', flexShrink: 0, whiteSpace: 'nowrap', color: '#FFFFFF', fontWeight: 600 }}>Online · Bangalore</div>
        </div>
      </div>
    ),
    size,
  );
}
