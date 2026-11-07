import { ImageResponse } from 'next/og';
import { company } from '@/lib/content';

export const runtime = 'edge';
export const alt = `${company.name} — ${company.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 72,
          background: 'radial-gradient(circle at 80% 20%, #9114FF 0%, rgba(145,20,255,0) 45%), #000000',
          color: '#F5F7FF', fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 30, fontWeight: 600 }}>
          <div style={{ width: 44, height: 44, borderRadius: 999, border: '3px solid #9114FF' }} />
          {company.name}
        </div>
        <div style={{ display: 'flex', fontSize: 92, fontWeight: 700, lineHeight: 1, letterSpacing: -3, maxWidth: 1000 }}>{company.tagline}.</div>
        <div style={{ display: 'flex', fontSize: 24, color: '#929BB6', letterSpacing: 4, textTransform: 'uppercase' }}>Consulting · Engineering · Products</div>
      </div>
    ),
    size,
  );
}
