import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { refundDocument } from "@/content/legal";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description:
    "Review the OneLink refund and cancellation policy for bookings, renewals, and add-ons.",
  alternates: { canonical: "/refund" },
};

export default function RefundPage() {
  return <LegalPage document={refundDocument} eyebrow="Refund" />;
}
