import { ImageResponse } from 'next/og';
import { company } from '@/lib/content';

export const runtime = 'edge';
export const alt = `${company.name} | ${company.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 72,
          backgroundColor: '#000000',
          backgroundImage: 'radial-gradient(circle at 80% 20%, #9114FF 0%, rgba(145,20,255,0) 45%)',
          color: '#F5F7FF', fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 30, fontWeight: 600 }}>
          <svg width="56" height="56" viewBox="0 0 40 40">
            <rect width="40" height="40" rx="9" fill="#ffffff" fillOpacity="0.08" />
            <path d="M8 28V14h4.4v2.1c1.2-1.6 3-2.5 5.1-2.5 3.7 0 5.7 2.4 5.7 6.3V28h-4.5v-7.3c0-2-.9-3-2.6-3-1.9 0-3.2 1.3-3.2 3.6V28Z" fill="#fff" />
            <polygon points="25,31 28.8,31 35,9 31.2,9" fill="#9114FF" />
          </svg>
          {company.name}
        </div>
        <div style={{ display: 'flex', fontSize: 92, fontWeight: 700, lineHeight: 1, letterSpacing: -3, maxWidth: 1000 }}>Launch your IT career.</div>
        <div style={{ display: 'flex', fontSize: 24, color: '#929BB6', letterSpacing: 4, textTransform: 'uppercase' }}>Snowflake · Azure · Java · Salesforce · Testing</div>
      </div>
    ),
    size,
  );
}
