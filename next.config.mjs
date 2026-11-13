/** @type {import('next').NextConfig} */
const nextConfig = {
  // Optional separate build folder so a second local dev server never shares (and corrupts) .next
  distDir: process.env.NEXT_DIST_DIR || '.next',
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    // Dev: load straight from the Unsplash CDN (already format-optimised) — the local optimiser is slow
    unoptimized: process.env.NODE_ENV === 'development',
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
  },
  // Reliable hot reload on Windows / synced folders
  webpack: (config, { dev }) => {
    if (dev) config.watchOptions = { poll: 800, aggregateTimeout: 300, ignored: ['**/node_modules/**', '**/.next/**', '**/.next-*/**', '**/.claude/**'] };
    return config;
  },
  // Retired demo products → the Profile Builder
  async redirects() {
    return ['helix', 'sentinel', 'flowgrid'].map((slug) => ({ source: `/products/${slug}`, destination: '/products/profile-builder', permanent: true }));
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'gsap', 'lucide-react'],
  },
};

export default nextConfig;
