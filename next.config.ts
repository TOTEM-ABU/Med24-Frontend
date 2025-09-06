import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["cdn.med24.uz"], // ⚡ ruxsat berilgan remote domen
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://45.76.94.219:3132/api/:path*",
      },
      {
        source: "/diagnostika/:diagnostikaname*",
        destination: "/Diagnostika/:diagnostikaname*",
      },
      {
        source: "/kliniki/:klinikiname*",
        destination: "/Kliniki/:klinikiname*",
      },
    ];
  },
};

export default nextConfig;
