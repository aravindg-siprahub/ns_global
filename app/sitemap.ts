import type { MetadataRoute } from 'next';
import { services, products, industries, caseStudies, insights } from '@/lib/content';
import { SITE_URL } from '@/lib/utils';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ['', '/services', '/products', '/industries', '/insights', '/careers', '/about', '/contact'];
  const dynamic = [
    ...services.map((s) => `/services/${s.slug}`),
    ...products.map((p) => `/products/${p.slug}`),
    ...industries.map((i) => `/industries/${i.slug}`),
    ...caseStudies.map((c) => `/case-studies/${c.slug}`),
    ...insights.map((i) => `/insights/${i.slug}`),
  ];
  return [...staticRoutes, ...dynamic].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path.startsWith('/insights') ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : staticRoutes.includes(path) ? 0.8 : 0.6,
  }));
}
