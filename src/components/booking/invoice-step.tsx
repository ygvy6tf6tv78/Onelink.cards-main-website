"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getPlanById } from "@/content/site";
import {
  buildInvoiceWhatsAppHref,
  clampBookingQuantity,
  getPlanGrandTotal,
  getSupportWhatsAppHref,
  readStoredBookingState,
} from "@/lib/booking";
import { BookingShell } from "@/components/booking/booking-shell";
import { InvoicePreview } from "@/components/booking/invoice-preview";
import { PaymentMethodsRow } from "@/components/booking/payment-methods-row";
import { PlanCard } from "@/components/booking/plan-card";
import { SupportCard } from "@/components/booking/support-card";
import { ActionLink } from "@/components/ui/action-link";

export function InvoiceStep() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stored = readStoredBookingState();
  const plan = stored?.planId ? getPlanById(stored.planId) : undefined;

  const yearOneInclusive = (() => {
    if (!plan || !stored) return undefined;
    return getPlanGrandTotal(
      plan,
      stored.maintenanceId,
      stored.addOnIds ?? [],
      clampBookingQuantity(stored.quantity ?? 1),
    );
  })();

  useEffect(() => {
    const s = readStoredBookingState();
    if (!s?.planId || !s?.bookingId || !s.details?.name) {
      router.replace(s?.planId ? `/book/details?plan=${s.planId}` : "/book");
      return;
    }

    const fromUrl = searchParams.get("booking");
    if (fromUrl && s.bookingId && fromUrl !== s.bookingId) {
      router.replace(`/book/invoice?booking=${encodeURIComponent(s.bookingId)}`);
    }
  }, [router, searchParams]);

  if (!stored || !stored.bookingId || !plan) {
    return null;
  }

  return (
    <BookingShell
      step="invoice"
      title="Review your booking invoice."
      description="This invoice is generated automatically from your booking details. Review it once before moving to secure payment."
      aside={
        <>
          <SupportCard eyebrow="Selected Plan">
            <PlanCard
              plan={plan}
              summary
              className="shadow-none"
              yearOneInclusiveTotal={yearOneInclusive}
            />
          </SupportCard>

          <SupportCard eyebrow="Before you pay">
            <div className="space-y-3 text-sm leading-6 text-[#5f6b77]">
              <p>This is a proforma invoice shown before payment.</p>
              <p>Our team will call you within a few hours after booking.</p>
              <p>You will see your design before final approval.</p>
              <p>Final GST invoice is issued after successful payment, as applicable.</p>
            </div>
          </SupportCard>

          <SupportCard eyebrow="Payment methods">
            <div className="space-y-4">
              <PaymentMethodsRow compact />
              <ActionLink
                href={buildInvoiceWhatsAppHref(stored)}
                variant="secondary"
                className="w-full rounded-[16px] border-black/8 bg-[#fbfcfd] text-[#151515]"
              >
                WhatsApp Us
              </ActionLink>
            </div>
          </SupportCard>
        </>
      }
    >
      <InvoicePreview
        state={stored}
        actions={
          <>
            <ActionLink
              href={`/book/details?plan=${encodeURIComponent(stored.planId ?? "")}`}
              variant="secondary"
              className="rounded-[16px] border-black/8 bg-[#fbfcfd] text-[#151515]"
            >
              Edit Details
            </ActionLink>
            <ActionLink
              href={`/book/payment?booking=${encodeURIComponent(stored.bookingId)}`}
              className="rounded-[16px] bg-[#00A9FF] text-white hover:bg-[#0098e6]"
            >
              Pay Now
            </ActionLink>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center justify-center rounded-[16px] border border-black/8 bg-white px-5 py-3 text-sm font-semibold text-[#151515] hover:bg-[#fbfcfd]"
            >
              Download Invoice
            </button>
          </>
        }
      />

      <div className="no-print mt-5 flex flex-wrap gap-3">
        <ActionLink
          href={getSupportWhatsAppHref("Hello OneLink, I need help with my booking invoice.")}
          variant="ghost"
          className="rounded-[16px] px-0 py-0 text-sm font-semibold"
        >
          Contact Support
        </ActionLink>
      </div>
    </BookingShell>
  );
}
