import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "OneLink",
    short_name: "OneLink",
    description: "OneLink smart business pages for every customer action.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0EA5E9",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
