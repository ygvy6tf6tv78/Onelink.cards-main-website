import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/book/", "/payment/", "/demo/"],
    },
    sitemap: "https://www.onelink.cards/sitemap.xml",
    host: "https://www.onelink.cards",
  };
}
