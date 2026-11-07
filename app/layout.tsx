import type { Metadata, Viewport } from 'next';
import { Archivo, Inter_Tight, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { company, offices } from '@/lib/content';
import { SITE_URL } from '@/lib/utils';

const display = Archivo({ subsets: ['latin'], variable: '--font-display', display: 'swap', weight: ['500', '600', '700', '800', '900'] });
const body = Inter_Tight({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap', weight: ['400', '500'] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${company.name} — ${company.tagline}`, template: `%s · ${company.name}` },
  description: company.description,
  keywords: ['digital transformation', 'AI consulting', 'cloud services', 'cybersecurity', 'digital engineering', 'managed services', 'enterprise software'],
  openGraph: {
    type: 'website',
    siteName: company.name,
    title: `${company.name} — ${company.tagline}`,
    description: company.description,
    url: SITE_URL,
  },
  twitter: { card: 'summary_large_image', title: company.name, description: company.description },
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  width: 'device-width',
  initialScale: 1,
};

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: company.name,
  url: SITE_URL,
  logo: `${SITE_URL}/icon.svg`,
  slogan: company.tagline,
  description: company.description,
  foundingDate: String(company.founded),
  email: company.email,
  sameAs: Object.values(company.social),
  address: offices.filter((o) => o.hq).map((o) => ({ '@type': 'PostalAddress', streetAddress: o.address, addressLocality: o.city, addressCountry: o.country })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`} >
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      </head>
      <body>
        <SmoothScroll />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
