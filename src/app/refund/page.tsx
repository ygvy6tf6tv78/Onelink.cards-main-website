import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { refundDocument } from "@/content/legal";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Refund & Cancellation Policy",
  description:
    "Review the OneLink refund and cancellation policy for bookings, renewals, and add-ons.",
  path: "/refund",
});

export default function RefundPage() {
  return <LegalPage document={refundDocument} eyebrow="Refund" />;
}
