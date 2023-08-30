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
        protocol: 'https',
        hostname: 'art-ck.pl',
      },
    ],
  },
  // async headers() {
  //   return [
  //     {
  //       source: '/api/:path*',

  //       headers: [
  //         { key: 'Access-Control-Allow-Credentials', value: 'true' },
  //         {
  //           key: 'Access-Control-Allow-Origin',
  //           value: 'https://www.art-ck.pl',
  //         },
  //         {
  //           key: 'Access-Control-Allow-Methods',
  //           value: 'GET,DELETE,PATCH,POST,PUT',
  //         },
  //         {
  //           key: 'Access-Control-Allow-Headers',
  //           value:
  //             'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
  //         },
  //       ],
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
