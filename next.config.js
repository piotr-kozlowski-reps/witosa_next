/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost', port: '3000' },
      {
        protocol: 'https',
        hostname: 'witosanext-production.up.railway.app',
      },
    ],
  },
};

module.exports = nextConfig;
