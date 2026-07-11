"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getPlanById } from "@/content/site";
import {
  buildBookingInvoice,
  readStoredBookingState,
  writeStoredBookingState,
} from "@/lib/booking";
import { BookingShell } from "@/components/booking/booking-shell";
import { Icon } from "@/components/icons";
import { formatCurrency, formatPhoneForRazorpay, cn } from "@/lib/utils";

type OrderPayload = {
  orderId: string;
  amount: number;
  currency: string;
  keyId: string;
  planName: string;
};

type ApiErrorPayload = {
  error?: string;
};

export function PaymentStep() {
  return (
    <Suspense fallback={null}>
      <PaymentStepContent />
    </Suspense>
  );
}

function PaymentStepContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [stored, setStored] = useState<ReturnType<typeof readStoredBookingState>>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    queueMicrotask(() => {
      setStored(readStoredBookingState());
    });
  }, []);

  const planId = searchParams.get("plan") ?? stored?.planId;
  const plan = planId ? getPlanById(planId) : undefined;
  
  useEffect(() => {
    if (!stored) return;
    if (!stored.planId || !stored.bookingId || !stored.details.name) {
      router.replace(stored.planId ? `/book/details?plan=${stored.planId}` : "/book");
    }
  }, [stored, router]);

  if (!plan || !stored) return null;

  const invoice = buildBookingInvoice(stored);
  const totalAmount = invoice.summary.grandTotal;

  const handlePayment = async () => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const orderResponse = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          planId: plan.id,
          customer: stored.details,
          maintenanceId: stored.maintenanceId,
          addOnIds: stored.addOnIds,
          quantity: stored.quantity ?? 1,
        }),
      });

      const orderPayload = (await orderResponse.json()) as OrderPayload & ApiErrorPayload;
      if (!orderResponse.ok) {
        setErrorMessage(orderPayload.error || "Could not start Razorpay payment.");
        return;
      }
      if (!orderPayload.orderId || !orderPayload.keyId) {
        setErrorMessage("Payment gateway config is incomplete. Please contact support.");
        return;
      }

      const options = {
        key: orderPayload.keyId,
        amount: orderPayload.amount,
        currency: orderPayload.currency,
        name: "OneLink",
        description: `${plan.name} Plan Booking`,
        order_id: orderPayload.orderId,
        handler: async function (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) {
          setIsLoading(true);
          setErrorMessage(null);
          try {
            const verifyResponse = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                planId: plan.id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                bookingId: stored.bookingId,
                invoiceNumber: stored.invoiceNumber,
                customerName: stored.details.name,
                customerEmail: stored.details.email,
                customerPhone: stored.details.phone,
                businessName: stored.details.businessName,
                amountPaise: orderPayload.amount,
                currency: orderPayload.currency,
              }),
            });
            const verifyJson = (await verifyResponse.json()) as { verified?: boolean };
            if (!verifyResponse.ok || !verifyJson.verified) {
              setErrorMessage(
                "We could not confirm this payment automatically. Save your payment ID from Razorpay and message us on WhatsApp.",
              );
              return;
            }
            const successDraft = {
              ...stored,
              orderId: orderPayload.orderId,
              paymentId: response.razorpay_payment_id,
            };
            writeStoredBookingState(successDraft);
            router.push(
              `/book/success?booking=${stored.bookingId}&paymentId=${response.razorpay_payment_id}`,
            );
          } catch {
            setErrorMessage(
              "Payment may have succeeded but confirmation failed. Check your email or contact us with your payment ID.",
            );
          } finally {
            setIsLoading(false);
          }
        },
        prefill: {
          name: stored.details.name,
          email: stored.details.email,
          contact: formatPhoneForRazorpay(stored.details.phone),
        },
        notes: {
          bookingId: stored.bookingId ?? "",
          invoiceNumber: stored.invoiceNumber ?? "",
          businessName: stored.details.businessName,
          city: stored.details.city,
          state: stored.details.state,
        },
        theme: { color: "#0F172A" },
      };

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const Razorpay = (window as any).Razorpay;
      const rzp = new Razorpay(options);
      rzp.on("payment.failed", function (response: { error: { description: string } }) {
        setErrorMessage(response.error.description || "Payment failed. Please try again.");
      });
      rzp.open();
    } catch {
      setErrorMessage("Could not reach payment server. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BookingShell 
      step="payment" 
      title="Review and pay securely."
      contentClassName="max-xl:pb-1"
      aside={
        <div className="overflow-hidden rounded-[28px] border border-[#dfe7ee] bg-white shadow-[0_18px_40px_-32px_rgba(15,23,42,0.18)]">
          <div className="flex items-center justify-between border-b border-[#F1F5F9] bg-[#F8FAFC] px-6 py-4">
            <span className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#64748B]">Order Breakdown</span>
            <span className="rounded-full border border-sky-100 bg-sky-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-sky-900">
              {plan.taxText ?? "+ GST (18%)"}
            </span>
          </div>

          <div className="space-y-6 p-6">
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 border-b border-dashed border-[#F1F5F9] pb-6">
              {[
                { label: "Billed To", val: stored.details.name },
                { label: "Business", val: stored.details.businessName },
                { label: "Location", val: `${stored.details.city}, ${stored.details.state}` },
                { label: "WhatsApp", val: `+91 ${stored.details.phone}` }
              ].map(i => (
                <div key={i.label} className="space-y-0.5">
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.1em] text-[#94A3B8]">{i.label}</p>
                  <p className="text-[12px] font-bold text-[#0F172A] truncate leading-tight">{i.val}</p>
                </div>
              ))}
              <div className="col-span-2 space-y-0.5">
                <p className="text-[9px] font-extrabold uppercase tracking-[0.1em] text-[#94A3B8]">Billing Address</p>
                <p className="text-[12px] font-bold text-[#0F172A] leading-relaxed">{stored.details.billingAddress}</p>
              </div>
            </div>

            <div className="space-y-4">
              {invoice.rows.map((row) => (
                <div key={row.id} className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-[13px] font-bold text-[#0F172A]">{row.item}</p>
                    <p className="mt-0.5 text-[10px] text-[#94A3B8]">{row.description}</p>
                  </div>
                  <span className="text-[13px] font-black text-[#0F172A] tabular-nums">{formatCurrency(row.total)}</span>
                </div>
              ))}
            </div>

            <div className="border-t-[2px] border-[#0F172A] pt-6">
              <div className="flex justify-between gap-3">
                <div>
                  <span className="text-[16px] font-black text-[#111827] tracking-tight">You pay</span>
                  <p className="mt-0.5 text-[12px] font-medium text-[#64748B]">
                    Total includes 18% GST on the plan subtotal.
                  </p>
                </div>
                <span className="text-[24px] font-black text-[#00A9FF] tabular-nums leading-none tracking-tighter">{formatCurrency(totalAmount)}</span>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <div className="space-y-10 max-md:space-y-8">
        <div className="space-y-3 max-md:space-y-2">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#00A9FF] max-md:text-[12px]">Razorpay Secure Checkout</p>
          <h2 className="text-[28px] font-black text-[#0F172A] tracking-tight leading-tight max-md:text-[26px]">Review & Pay.</h2>
          <p className="max-w-[500px] text-[14px] font-semibold leading-relaxed text-[#64748B] max-md:text-[15px]">
            Check your order details on the right. Razorpay opens only after you tap the payment button below.
          </p>
        </div>

        <div className="rounded-[28px] border border-[#dfe7ee] bg-white p-5 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.18)] sm:p-6">
          <div className="flex items-start gap-3.5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-[#111827] text-white shadow-[0_16px_30px_-20px_rgba(17,24,39,0.35)]">
              <Icon name="shield" className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[12px] font-black uppercase tracking-[0.16em] text-[#087cbc]">Payment Window</p>
              <p className="mt-1 text-[14px] font-bold leading-relaxed text-[#4b5d72]">
                You are not charged on this screen. Payment opens only after your confirmation.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#94A3B8]">What Happens Next</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { title: "Team call (6–8 hrs)", desc: "Our design team guides you through setup." },
              { title: "Requirement Guidance", desc: "We lock details to begin production." },
              { title: "Immediate Design", desc: "Work starts right after requirement lock." },
              { title: "Delivery (5–7 days)", desc: "Estimated timeline after all inputs." },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-[8px] border border-[#E2E8F0] bg-[#F1F5F9] text-[#111827]">
                  <span className="text-[11px] font-extrabold">{i + 1}</span>
                </div>
                <div>
                  <p className="text-[12px] font-bold text-[#111827] leading-none tracking-tight">{item.title}</p>
                  <p className="mt-1 text-[10px] font-medium leading-snug text-[#64748B]">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[28px] border border-[#dfe7ee] bg-white p-6 sm:p-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-[#F1F5F9] pb-6">
              <div>
                <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-[#94A3B8]">Payment Method</p>
                <div className="flex items-center gap-2.5">
                  <Icon name="check" className="h-3.5 w-3.5 text-emerald-500" />
                  <p className="text-[14px] font-bold text-[#0F172A]">Razorpay Secured</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {["UPI", "Cards", "Wallets", "EMI"].map((method) => (
                  <span key={method} className="rounded-md bg-[#F1F5F9] px-2 py-0.5 text-[9px] font-bold text-[#64748B]">
                    {method}
                  </span>
                ))}
              </div>
            </div>

            {errorMessage ? (
              <div className="rounded-xl border border-rose-100 bg-rose-50 p-3.5 text-[12px] font-bold text-rose-600">
                {errorMessage}
              </div>
            ) : null}

            <div className="flex flex-col gap-4 sm:flex-row">
              <button
                type="button"
                onClick={handlePayment}
                disabled={isLoading}
                className={cn(
                  "group relative inline-flex min-h-[52px] h-14 flex-[2.5] items-center justify-center gap-3 overflow-hidden rounded-[18px] bg-[#111827] text-[15px] font-black text-white shadow-[0_18px_36px_-16px_rgba(17,24,39,0.28)] transition-all active:scale-[0.98] max-md:min-h-[54px]",
                  isLoading ? "opacity-50" : "hover:-translate-y-0.5 hover:bg-black hover:shadow-[0_22px_40px_-16px_rgba(17,24,39,0.32)]",
                )}
              >
                {isLoading ? (
                  <div className="h-6 w-6 animate-spin rounded-full border-[3px] border-white/20 border-t-white" />
                ) : (
                  <>
                    <span>Pay Securely {formatCurrency(totalAmount)}</span>
                    <Icon name="check" className="h-5 w-5" />
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => router.push(`/book/details?plan=${plan.id}`)}
                className="inline-flex h-14 flex-1 items-center justify-center gap-2.5 rounded-[18px] border border-[#dfe7ee] bg-white text-[14px] font-black text-[#111827] transition-all hover:border-[#cfd8e3] hover:bg-[#F8FAFC] active:scale-[0.98]"
              >
                Edit Details
              </button>
            </div>

            <div className="flex items-center justify-center gap-4 pt-2 opacity-70">
              <div className="h-px flex-1 bg-neutral-200" />
              <div className="flex items-center gap-2">
                <Icon name="check" className="h-3.5 w-3.5" />
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#94A3B8]">Razorpay opens after tap</p>
              </div>
              <div className="h-px flex-1 bg-neutral-200" />
            </div>
          </div>
        </div>
      </div>
    </BookingShell>
  );
}
