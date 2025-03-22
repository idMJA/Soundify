import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'inv.nadeko.net',
        pathname: '/vi/**',
      },
      {
        protocol: 'https',
        hostname: 'yewtu.be',
        pathname: '/vi/**',
      },
      {
        protocol: 'https',
        hostname: 'id.420129.xyz',
        pathname: '/vi/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
