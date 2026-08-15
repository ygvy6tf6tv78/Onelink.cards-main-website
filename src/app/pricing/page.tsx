import type { Metadata } from "next";
import { PricingSection } from "@/components/sections/pricing-section";

export const metadata: Metadata = {
  title: "Pricing & Packages",
  description:
    "Compare OneLink Essential, Signature, Elite and Enterprise packages, choose Platform Care, and calculate your complete package price.",
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "OneLink Pricing & Packages",
    description:
      "One-time design and development plus flexible Platform Care for your OneLink business page.",
    url: "/pricing",
  },
};

export default function PricingPage() {
  return (
    <main className="overflow-x-clip bg-[#f8fbff] pt-24 sm:pt-28">
      <PricingSection staticReveal dedicatedPage showLaunchOffer={false} />
    </main>
  );
}
