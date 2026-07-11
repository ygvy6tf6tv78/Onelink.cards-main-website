import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { termsDocument } from "@/content/legal";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Read the Terms & Conditions that govern the purchase and use of OneLink services.",
};

export default function TermsPage() {
  return <LegalPage document={termsDocument} eyebrow="Terms" />;
}
