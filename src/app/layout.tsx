import type { Metadata } from "next";
import Script from "next/script";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "@fontsource/manrope/800.css";
import "./globals.css";
import { LayoutWrapper } from "@/components/layout/layout-wrapper";

/** Canonical site URL (include www if that is what users share). */
const defaultSiteOrigin = "https://www.onelink.cards";
const siteOrigin = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  process.env.NEXT_PUBLIC_APP_URL?.trim() ||
  defaultSiteOrigin
).replace(/\/$/, "");
const metadataBase = new URL(`${siteOrigin}/`);
/** Full homepage URL for og:url (match what people share). */
const openGraphPageUrl = new URL("/", metadataBase).href;

/** Absolute URL — WhatsApp / Telegram require a fully qualified og:image (PNG, not SVG). */
const socialImageAbsolute = new URL("/og-share.png", metadataBase).href;

const socialPreview = {
  url: socialImageAbsolute,
  width: 2748,
  height: 2382,
  alt: "Stop sharing links. Share OneLink.",
  type: "image/png" as const,
};

export const metadata: Metadata = {
  title: {
    default: "OneLink Smart Business Page for Every Customer Action",
    template: "%s | OneLink",
  },
  description:
    "Bring your services, menus, products, bookings, payments, reviews, locations and enquiries into one professionally designed business page.",
  applicationName: "OneLink",
  metadataBase,
  keywords: [
    "OneLink",
    "smart business page",
    "digital business card",
    "restaurant website",
    "gym website",
    "salon website",
    "spa website",
    "business booking page",
    "QR business page",
    "mini website for businesses",
  ],
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Stop sharing links. Share OneLink.",
    description:
      "One smart business page for everything your customer needs to call, book, order, pay, review or visit.",
    url: openGraphPageUrl,
    siteName: "OneLink",
    locale: "en_IN",
    type: "website",
    images: [socialPreview],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stop sharing links. Share OneLink.",
    description:
      "One smart business page for everything your customer needs to call, book, order, pay, review or visit.",
    images: [socialPreview],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth" data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
      />
    </html>
  );
}
