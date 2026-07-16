import type { Metadata } from "next";
import { InternalBillingCalculator } from "@/components/internal/internal-billing-calculator";

export const metadata: Metadata = {
  title: "Internal Billing Desk",
  description: "Internal OneLink plan and billing calculator.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function InternalBillingPage() {
  return <InternalBillingCalculator />;
}
