import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "api.getavails.com",
      },
      {
        protocol: "http",
        hostname: "10.10.12.126",
      },
      {
        protocol: "https",
        hostname: "seatgeekimages.com",
      },
    ],
  },
};

export default nextConfig;
