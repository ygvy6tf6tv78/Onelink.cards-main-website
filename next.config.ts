import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    lockDistDir: false,
    optimizePackageImports: ["framer-motion"],
  },
  images: {
    // Allow the quality values already used across the app.
    qualities: [75, 85, 90, 92, 100],
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
    ],
  },
};

export default nextConfig;
