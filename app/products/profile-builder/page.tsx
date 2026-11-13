import type { Metadata } from 'next';
import { company, product } from '@/lib/content';
import { roles } from '@/lib/profile-builder/roles';
import { SITE_URL } from '@/lib/utils';
import { JsonLd } from '@/components/seo/JsonLd';
import { breadcrumbJsonLd } from '@/lib/seo';
import { ProductMotion } from '@/components/product/primitives';
import { ProductSubNav } from '@/components/product/ProductSubNav';
import { ProductHero } from '@/components/product/ProductHero';
import { FeatureBentoGrid } from '@/components/product/FeatureBentoGrid';
import { InteractiveShowcase } from '@/components/product/InteractiveShowcase';
import { WorkflowTimeline } from '@/components/product/WorkflowTimeline';
import { FinalCTA } from '@/components/product/FinalCTA';

const title = 'Naukri & LinkedIn Profile Builder for IT Jobs';
const description = `Turn your resume into a ready-to-paste Naukri and LinkedIn profile: headlines, summary, skills, projects and posts for ${roles.map((r) => r.label).join(', ')} roles. Runs on your device.`;

export const metadata: Metadata = {
  title,
  description,
  keywords: ['Naukri profile headline', 'LinkedIn profile builder', 'Naukri profile summary for freshers', 'LinkedIn headline for IT jobs', 'resume to LinkedIn', ...roles.map((r) => `${r.title} Naukri profile`)],
  alternates: { canonical: product.href },
  openGraph: { title: `${product.name} | ${company.name}`, description, url: product.href },
  twitter: { card: 'summary_large_image', title: `${product.name} | ${company.name}`, description },
};

export default function ProfileBuilderPage() {
  return (
    <div className="theme-product">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: `${company.name} ${product.name}`,
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web browser',
          description,
          url: `${SITE_URL}${product.href}`,
          publisher: { '@type': 'Organization', name: company.name, url: SITE_URL },
        }}
      />
      <JsonLd data={breadcrumbJsonLd([{ label: 'Products', href: '/products' }, { label: product.name, href: product.href }])} />
      <ProductMotion>
        <ProductSubNav />
        <ProductHero />
        <WorkflowTimeline />
        <InteractiveShowcase />
        <FeatureBentoGrid />
        <FinalCTA />
      </ProductMotion>
    </div>
  );
}
