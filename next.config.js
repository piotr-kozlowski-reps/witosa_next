/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   serverActions: true,
  // },
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost', port: '3000' },
      {
        protocol: 'https',
        hostname: 'witosanext-production.up.railway.app',
      },
      {
        protocol: 'https',
        hostname: 'witosaproductionmainbranch-production.up.railway.app/',
      },
      {
        protocol: 'http',
        hostname: '**.art-ck.pl',
      },
      {
        protocol: 'https',
        hostname: '**.art-ck.pl',
      },
    ],
  },
};

module.exports = nextConfig;
