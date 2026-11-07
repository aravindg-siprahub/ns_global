/** @type {import('next').NextConfig} */
const nextConfig = {
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
    if (dev) config.watchOptions = { poll: 800, aggregateTimeout: 300, ignored: ['**/node_modules/**', '**/.next/**', '**/.claude/**'] };
    return config;
  },
  experimental: {
    optimizePackageImports: ['framer-motion', 'gsap'],
  },
};

export default nextConfig;
