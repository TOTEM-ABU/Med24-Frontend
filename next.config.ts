import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://45.76.94.219:3132/api/:path*",
      },
    ];
  },
};

export default nextConfig;
