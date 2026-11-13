import type { Metadata, Viewport } from 'next';
import { Archivo, Inter_Tight, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { company } from '@/lib/content';
import { SITE_URL } from '@/lib/utils';

const display = Archivo({ subsets: ['latin'], variable: '--font-display', display: 'swap', weight: ['500', '600', '700', '800', '900'] });
const body = Inter_Tight({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap', weight: ['400', '500'] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${company.name} | ${company.tagline}`, template: `%s · ${company.name}` },
  description: company.description,
  keywords: ['IT training Bangalore', 'Snowflake training', 'Informatica training', 'DBT training', 'Azure DevOps training', 'Java full stack course', 'Salesforce training', 'software testing course', 'Selenium training', 'business analyst course', 'placement assistance', 'NS Global Tech'],
  openGraph: {
    type: 'website',
    siteName: company.name,
    title: `${company.name} | ${company.tagline}`,
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
  viewportFit: 'cover',
};

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  name: company.name,
  alternateName: 'N S Global Tech',
  url: SITE_URL,
  logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png`, width: 600, height: 600 },
  image: `${SITE_URL}/logo.png`,
  slogan: company.tagline,
  description: company.description,
  email: company.email,
  telephone: company.phone,
  sameAs: company.profiles,
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Building no 45, Srinivaspura, Kogilu Main Road, Yelahanka',
    addressLocality: 'Bangalore',
    addressRegion: 'Karnataka',
    postalCode: '560064',
    addressCountry: 'IN',
  },
};

// Tells Google which name to show as the site name in results
const siteJsonLd = { '@context': 'https://schema.org', '@type': 'WebSite', name: company.name, alternateName: 'N S Global Tech', url: SITE_URL };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`} >
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }} />
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
