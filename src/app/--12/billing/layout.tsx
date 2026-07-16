import { cookies } from "next/headers";
import { BillingPasswordGate } from "@/components/internal/billing-password-gate";
import { INTERNAL_BILLING_COOKIE, INTERNAL_BILLING_COOKIE_VALUE } from "@/lib/internal-billing-auth";

export default async function ProtectedBillingLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const authenticated = cookieStore.get(INTERNAL_BILLING_COOKIE)?.value === INTERNAL_BILLING_COOKIE_VALUE;

  return authenticated ? children : <BillingPasswordGate />;
}
