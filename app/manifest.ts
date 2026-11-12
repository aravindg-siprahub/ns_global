import type { MetadataRoute } from 'next';
import { company } from '@/lib/content';

/** Web app manifest: home-screen icon + name when the site is saved to a phone */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: company.name,
    short_name: company.short,
    description: company.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
