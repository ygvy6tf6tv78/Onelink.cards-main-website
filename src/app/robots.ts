import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/book/", "/payment/", "/demo/"],
    },
    sitemap: "https://onelink.cards/sitemap.xml",
    host: "https://onelink.cards",
  };
}
