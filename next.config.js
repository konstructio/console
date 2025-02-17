const { join } = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  webpack: (config, { isServer }) => {
    config.resolve.alias['@'] = join(__dirname);
    return config;
  },
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    path: '/_next/image',
    loader: 'default',
    loaderFile: '',
    domains: [],
    disableStaticImages: false,
    minimumCacheTTL: 60,
    formats: ['image/webp'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  compiler: {
    styledComponents: true,
  },
  typescript: {
    // nextjs doees not read the tsconfig.json properly and it's triggering different errors that we can't see using `yarn check-types`
    ignoreBuildErrors: true,
  },
  eslint: {
    // eslint will be executed before we run build
    ignoreDuringBuilds: true,
  },
  poweredByHeader: false,
  headers: async () => {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Cache-Control', value: 'no-cache, no-store' },
          { key: 'Content-Security-Policy', value: 'frame-ancestors \'none\'' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'no-referrer' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
