import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/apex',
        destination: 'https://apex-seven-delta.vercel.app/apex',
      },
      {
        source: '/apex/:path*',
        destination: 'https://apex-seven-delta.vercel.app/apex/:path*',
      },
      {
        source: '/ghost-mountain',
        destination: 'https://proj-ghost-mountain.vercel.app/ghost-mountain',
      },
      {
        source: '/ghost-mountain/:path*',
        destination: 'https://proj-ghost-mountain.vercel.app/ghost-mountain/:path*',
      },
      {
        source: '/blue-horizon',
        destination: 'https://proj-blue-horizon.vercel.app/blue-horizon',
      },
      {
        source: '/blue-horizon/:path*',
        destination: 'https://proj-blue-horizon.vercel.app/blue-horizon/:path*',
      },
    ];
  },
};

export default nextConfig;