/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  compiler: {
    styledComponents: true,
  },
  experimental: {
    fontLoaders: [{ loader: '@next/font/google', options: { display: 'auto' } }],
  },
  typescript: {
    // nextjs doees not read the tsconfig.json properly and it's triggering different errors that we can't see using `yarn check-types`
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
