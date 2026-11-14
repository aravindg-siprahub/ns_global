import type { Metadata } from 'next';
import { product } from '@/lib/content';
import { ProductMotion } from '@/components/product/primitives';
import { ProfileBuilderApp } from '@/components/product/app/ProfileBuilderApp';

export const metadata: Metadata = {
  title: 'Naukri & LinkedIn Profile Generator',
  description:
    'Upload your resume and generate a Naukri headline, profile summary, key skills, LinkedIn About section and first post for IT roles. Runs in your browser, nothing is uploaded.',
  alternates: { canonical: product.appHref },
};

export default function ProfileBuilderAppPage() {
  return (
    <div className="theme-product min-h-screen">
      <ProductMotion>
        <ProfileBuilderApp />
      </ProductMotion>
    </div>
  );
}
