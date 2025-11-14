import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  // TypeScript / ESLint settings (use with caution)
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },

  // Images: remotePatterns configuration
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', pathname: '/**' },
      { protocol: 'https', hostname: 'picsum.photos', pathname: '/**' },
    ],
  },

  // Paths: basePath should not end with a slash; assetPrefix typically ends with a slash
  basePath: '/Smart-Grocery-Shopping-Assistant-Rule-Based-Web-Application-',
  assetPrefix: '/Smart-Grocery-Shopping-Assistant-Rule-Based-Web-Application-/',
};

export default nextConfig;
