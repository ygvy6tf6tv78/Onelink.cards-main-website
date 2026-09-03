import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: false, noarchive: true },
  alternates: { canonical: null },
  openGraph: null,
  twitter: null,
};

export default function QuickBillLayout({ children }: { children: React.ReactNode }) {
  return children;
}
