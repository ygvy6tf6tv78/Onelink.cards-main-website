import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "@fontsource/manrope/400.css";
import "@fontsource/manrope/500.css";
import "@fontsource/manrope/600.css";
import "@fontsource/manrope/700.css";
import "@fontsource/manrope/800.css";
import "./globals.css";
import { LayoutWrapper } from "@/components/layout/layout-wrapper";
import { METADATA_BASE, SOCIAL_PREVIEW } from "@/lib/seo";

const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION?.trim();
const bingSiteVerification = process.env.BING_SITE_VERIFICATION?.trim();

export const metadata: Metadata = {
  title: {
    default: "OneLink | Smart Business Pages for Bookings, Payments & More",
    template: "%s | OneLink",
  },
  description:
    "OneLink brings your services, products, bookings, payments, reviews and customer actions together in one smart business page.",
  applicationName: "OneLink",
  authors: [{ name: "OneLink", url: METADATA_BASE }],
  creator: "OneLink",
  publisher: "OneLink",
  category: "Business Services",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  formatDetection: {
    telephone: false,
  },
  metadataBase: METADATA_BASE,
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
  verification: {
    ...(googleSiteVerification ? { google: googleSiteVerification } : {}),
    ...(bingSiteVerification
      ? { other: { "msvalidate.01": bingSiteVerification } }
      : {}),
  },
  openGraph: {
    title: "OneLink | Smart Business Pages for Bookings, Payments & More",
    description:
      "OneLink brings your services, products, bookings, payments, reviews and customer actions together in one smart business page.",
    url: "/",
    siteName: "OneLink",
    locale: "en_IN",
    type: "website",
    images: [SOCIAL_PREVIEW],
  },
  twitter: {
    card: "summary_large_image",
    title: "OneLink | Smart Business Pages for Bookings, Payments & More",
    description:
      "OneLink brings your services, products, bookings, payments, reviews and customer actions together in one smart business page.",
    images: [SOCIAL_PREVIEW],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0EA5E9",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className="h-full scroll-smooth" data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
    </html>
  );
}
