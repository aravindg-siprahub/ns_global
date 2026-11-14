import type { MetadataRoute } from 'next';
import { services, product, industries, caseStudies, insights } from '@/lib/content';
import { SITE_URL } from '@/lib/utils';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ['', '/services', product.href, product.appHref, '/industries', '/insights', '/careers', '/about', '/contact'];
  const dynamic = [
    ...services.map((s) => `/services/${s.slug}`),
    ...industries.map((i) => `/industries/${i.slug}`),
    ...caseStudies.map((c) => `/case-studies/${c.slug}`),
    ...insights.map((i) => `/insights/${i.slug}`),
  ];
  return [...staticRoutes, ...dynamic].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path.startsWith('/insights') ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : path.startsWith('/services') || path.startsWith('/products') ? 0.9 : staticRoutes.includes(path) ? 0.7 : 0.5,
  }));
}
