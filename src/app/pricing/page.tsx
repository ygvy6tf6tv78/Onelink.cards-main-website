import type { Metadata } from "next";
import { PricingSection } from "@/components/sections/pricing-section";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Pricing & Packages",
  description:
    "Compare OneLink Essential, Signature, Elite and Enterprise packages, choose Platform Care, and calculate your complete package price.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <main className="overflow-x-clip bg-[#f8fbff] pt-24 sm:pt-28">
      <PricingSection staticReveal dedicatedPage showLaunchOffer={false} />
    </main>
  );
}
