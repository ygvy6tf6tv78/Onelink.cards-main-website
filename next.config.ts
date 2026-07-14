import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  poweredByHeader: false,
  trailingSlash: false,
  turbopack: {
    root: process.cwd(),
  },
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
  async redirects() {
    return [
      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
    ];
  },
  async headers() {
    const noIndexHeaders = [
      { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
    ];

    return [
      { source: "/api/:path*", headers: noIndexHeaders },
      { source: "/book/:path*", headers: noIndexHeaders },
      { source: "/payment/:path*", headers: noIndexHeaders },
      { source: "/demo/:path*", headers: noIndexHeaders },
      {
        source: "/og-share.png",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" }],
      },
    ];
  },
};

export default nextConfig;
