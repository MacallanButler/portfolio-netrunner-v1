import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://www.googletagmanager.com https://www.google-analytics.com; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com; frame-ancestors 'none';",
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
        ],
      },
    ];
  },
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