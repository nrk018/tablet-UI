/** @type {import('next').NextConfig} */
const path = require('path');
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  // Silence incorrect monorepo root inference
  outputFileTracingRoot: path.join(__dirname),
  eslint: { ignoreDuringBuilds: true },
  webpack: (config, { isServer }) => {
    // Disable persistent webpack caching to avoid stale chunk module errors
    config.cache = false;
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      'bufferutil': 'commonjs bufferutil',
    });
    
    // Handle Spline package
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    
    return config;
  },
};

module.exports = nextConfig;

