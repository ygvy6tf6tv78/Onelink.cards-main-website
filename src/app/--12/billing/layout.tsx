import type { Metadata } from "next";
import { cookies } from "next/headers";
import { BillingPasswordGate } from "@/components/internal/billing-password-gate";
import { INTERNAL_BILLING_COOKIE, INTERNAL_BILLING_COOKIE_VALUE } from "@/lib/internal-billing-auth";

export const metadata: Metadata = {
  robots: { index: false, follow: false, noarchive: true },
  alternates: { canonical: null },
  openGraph: null,
  twitter: null,
};

export default async function ProtectedBillingLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const authenticated = cookieStore.get(INTERNAL_BILLING_COOKIE)?.value === INTERNAL_BILLING_COOKIE_VALUE;

  return authenticated ? children : <BillingPasswordGate />;
}
