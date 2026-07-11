import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { privacyDocument } from "@/content/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how OneLink collects, uses, and protects customer and business information.",
};

export default function PrivacyPage() {
  return <LegalPage document={privacyDocument} eyebrow="Privacy" />;
}
