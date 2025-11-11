 /** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        destination: 'https://baysulu-onefile-rtdl.vercel.app/:path*',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
