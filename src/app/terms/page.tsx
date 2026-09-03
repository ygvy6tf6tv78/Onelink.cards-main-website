import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { termsDocument } from "@/content/legal";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Terms & Conditions",
  description:
    "Read the Terms & Conditions that govern the purchase and use of OneLink services.",
  path: "/terms",
});

export default function TermsPage() {
  return <LegalPage document={termsDocument} eyebrow="Terms" continuous />;
}
