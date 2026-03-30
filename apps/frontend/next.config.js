const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@aroma/shared-types': path.resolve(__dirname, '../../packages/shared-types/src/index.ts'),
      '@aroma/matching-engine': path.resolve(__dirname, '../../packages/matching-engine/src/index.ts'),
    };
    return config;
  },
};

module.exports = nextConfig;
