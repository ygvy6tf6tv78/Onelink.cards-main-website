import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { privacyDocument } from "@/content/legal";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "Learn how OneLink collects, uses, and protects customer and business information.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return <LegalPage document={privacyDocument} eyebrow="Privacy" />;
}
