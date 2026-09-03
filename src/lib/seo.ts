import type { Metadata } from "next";

export const SITE_NAME = "OneLink";
export const SITE_ORIGIN = "https://getonelink.in";
export const METADATA_BASE = new URL(`${SITE_ORIGIN}/`);

export const SOCIAL_PREVIEW = {
  url: "/onelink-og-2026.jpg",
  width: 1200,
  height: 630,
  alt: "OneLink — Stop Sharing Everything. Share OneLink.",
  type: "image/jpeg" as const,
};

type PageSeo = {
  title: string;
  description: string;
  path: `/${string}` | "/";
};

export function createPageMetadata({ title, description, path }: PageSeo): Metadata {
  const socialTitle = `${title} | ${SITE_NAME}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: socialTitle,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "en_IN",
      type: "website",
      images: [SOCIAL_PREVIEW],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [SOCIAL_PREVIEW],
    },
  };
}
