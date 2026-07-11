"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getPlanById } from "@/content/site";
import {
  clampBookingQuantity,
  createBookingDraft,
  emptyBookingDetails,
  getBulkBookingBreakdown,
  getPlanGrandTotal,
  indianStates,
  readStoredBookingState,
  validateBookingDetails,
  writeStoredBookingState,
  type BookingDetails,
  type BookingDetailsErrors,
} from "@/lib/booking";
import { BookingShell } from "@/components/booking/booking-shell";
import { Icon } from "@/components/icons";
import { cn, formatCurrency } from "@/lib/utils";

const inputClassName =
  "h-12 w-full rounded-[14px] border border-[#d8e1ea] bg-white px-4 text-[15px] font-black text-[#0f172a] outline-none placeholder:text-[#94a3b8] focus:border-[#00A9FF] focus:bg-white focus:shadow-[0_0_0_4px_rgba(0,169,255,0.08)] transition-all duration-300 sm:h-11 sm:text-[14px]";

export function CustomerDetailsStep() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stored = readStoredBookingState();
  const planId = searchParams.get("plan") ?? stored?.planId;
  const plan = planId ? getPlanById(planId) : undefined;

  const [values, setValues] = useState<BookingDetails>(
    stored?.details ?? { ...emptyBookingDetails },
  );
  const [errors, setErrors] = useState<BookingDetailsErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const maintenance = plan?.maintenanceOptions.find((m) => m.id === stored?.maintenanceId) || plan?.maintenanceOptions[0];
  const addOnIds = stored?.addOnIds ?? [];
  const qty = clampBookingQuantity(stored?.quantity ?? 1);
  const yearOneInclusive =
    plan && maintenance ? getPlanGrandTotal(plan, maintenance.id, addOnIds, qty) : 0;
  const bulkAside =
    plan && maintenance ? getBulkBookingBreakdown(plan, maintenance.id, addOnIds, qty) : null;

  useEffect(() => {
    if (!plan || !planId) {
      router.replace("/book");
    }
  }, [plan, planId, router]);

  function updateField(key: keyof BookingDetails, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!planId || isSubmitting) return;

    const nextErrors = validateBookingDetails(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const draft = createBookingDraft({
      planId,
      maintenanceId: stored?.maintenanceId,
      addOnIds: stored?.addOnIds ?? [],
      details: values,
      currentState: stored,
    });

    writeStoredBookingState(draft);
    setIsSubmitting(true);

    const payload = JSON.stringify({
      planId: draft.planId,
      maintenanceId: draft.maintenanceId,
      addOnIds: draft.addOnIds,
      quantity: draft.quantity,
      details: draft.details,
      bookingId: draft.bookingId,
      invoiceNumber: draft.invoiceNumber,
      orderReference: draft.orderReference,
      customerId: draft.customerId,
    });

    try {
      const controller = new AbortController();
      const t = window.setTimeout(() => controller.abort(), 15000);
      await fetch("/api/booking/notify-details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
        signal: controller.signal,
      });
      window.clearTimeout(t);
    } catch {
      /* still continue — details are saved locally */
    } finally {
      setIsSubmitting(false);
    }

    router.push(`/book/payment?booking=${encodeURIComponent(draft.bookingId ?? "")}`);
  }

  if (!plan || !planId) return null;

  return (
    <BookingShell
      step="details"
      eyebrow="Your booking"
      title="Tell us where to send your booking details."
      description="Only the essential billing and contact details needed to start your setup."
      className="xl:grid-cols-[1fr_360px]"
      contentClassName="max-xl:pb-1"
      aside={
        <div className="space-y-6">
          <div className="overflow-hidden rounded-[22px] border border-[#dfe7ee] bg-white shadow-[0_20px_44px_-30px_rgba(15,23,42,0.22)]">
            <div className="h-1 w-full bg-[linear-gradient(90deg,#cae8ff,#76c7ff)]" />
            <div className="p-6">
            <p className="mb-3 text-[10px] font-black uppercase tracking-[0.2em] text-[#64748B]">Order recap</p>
            <div className="mb-4 space-y-2">
              <p className="text-[17px] font-black leading-tight tracking-tight text-[#0F172A]">{plan.name}</p>
              <p className="text-[12px] font-semibold text-[#64748B]">
                {maintenance ? `${maintenance.label} care` : "Care"} · {qty === 1 ? "1 OneLink" : `${qty} OneLinks`}
              </p>
            </div>
            {bulkAside ? (
              <div className="mb-4 flex items-center justify-between gap-2 border-t border-slate-100 pt-3 text-[12px] font-semibold text-[#64748B]">
                <span>Per OneLink</span>
                <span className="font-black tabular-nums text-[#0F172A]">{formatCurrency(bulkAside.unit)}</span>
              </div>
            ) : null}
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-[#dbeafe] bg-[#f7fbff] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-[#0369A1]">
                {plan.taxText ?? "+ GST (18%)"}
              </span>
            </div>
            {bulkAside && bulkAside.discountPercent > 0 ? (
              <div className="mb-4 rounded-[14px] border border-slate-100 bg-slate-50/90 p-3.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[12px] font-bold text-[#64748B]">List total</span>
                  <span className="text-[14px] font-black tabular-nums text-slate-500 line-through decoration-slate-400">
                    {formatCurrency(bulkAside.gross)}
                  </span>
                </div>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <span className="text-[12px] font-bold text-emerald-800">Team offer ({bulkAside.discountPercent}%)</span>
                  <span className="text-[13px] font-black tabular-nums text-emerald-700">−{formatCurrency(bulkAside.discount)}</span>
                </div>
                <div className="mt-3 border-t border-slate-200/80 pt-3">
                  <div className="flex items-end justify-between gap-2">
                    <span className="text-[11px] font-black uppercase tracking-[0.12em] text-[#0F172A]">You pay</span>
                    <span className="text-[22px] font-black leading-none tabular-nums text-[#00a9ff]">
                      {formatCurrency(yearOneInclusive)}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mb-4 flex items-end justify-between gap-2 rounded-[14px] border border-slate-100 bg-slate-50/90 p-3.5">
                <span className="text-[11px] font-black uppercase tracking-[0.12em] text-[#0F172A]">You pay</span>
                <span className="text-[22px] font-black leading-none tabular-nums text-[#00a9ff]">
                  {formatCurrency(yearOneInclusive)}
                </span>
              </div>
            )}
            {maintenance ? (
              <p className="text-[12px] font-medium leading-relaxed text-[#94A3B8] max-md:text-[13px]">
                Per seat: setup + {maintenance.label} (excl. GST); amount due includes 18% GST.
              </p>
            ) : null}
            </div>
          </div>

          <div className="space-y-5 rounded-[28px] border border-[#dfe7ee] bg-white p-6 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.18)]">
            <div className="flex items-start gap-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] border border-[#00A9FF]/10 bg-white text-[#00A9FF] shadow-sm">
                <Icon name="check" className="h-4.5 w-4.5" />
              </div>
              <div>
                <p className="text-[13px] font-black tracking-tight text-[#0F172A]">Call within 6–8 hours</p>
                <p className="mt-0.5 text-[11px] font-semibold leading-relaxed text-[#64748B]">Our design team reaches out to guide your setup.</p>
              </div>
            </div>
            <div className="flex items-start gap-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] border border-[#00A9FF]/10 bg-white text-[#00A9FF] shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <p className="text-[13px] font-black tracking-tight text-[#0F172A]">Delivery in 5–7 days</p>
                <p className="mt-0.5 text-[11px] font-semibold leading-relaxed text-[#64748B]">Estimated from the day requirements are locked.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 border-t border-[#E5E7EB]/50 pt-4">
              <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-[#059669]">
                <Icon name="shield" className="h-3 w-3" />
                100% Encrypted
              </span>
              <span className="h-1 w-1 rounded-full bg-[#CBD5E1]" />
              <span className="text-[10px] font-black uppercase tracking-wider text-[#64748B]">Razorpay Verified</span>
            </div>
          </div>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-8 max-md:space-y-6">
        <div className="rounded-[28px] border border-[#dfe7ee] bg-white p-5 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.18)] sm:p-6 max-md:p-5">
          <div className="mb-5 flex items-center gap-3 rounded-[18px] border border-[#d9edf9] bg-[#f6fbff] px-4 py-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-white text-[#00A9FF] shadow-sm">
              <Icon name="shield" className="h-4.5 w-4.5" />
            </div>
            <div>
              <p className="text-[12px] font-black uppercase tracking-[0.16em] text-[#087cbc]">Next Step</p>
              <p className="text-[13px] font-bold leading-relaxed text-[#4b5d72]">
                Fill these details now. Payment opens securely on the next screen.
              </p>
            </div>
          </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Full Name" error={errors.name}>
            <input
              type="text"
              autoFocus
              enterKeyHint="next"
              value={values.name}
              onChange={(e) => updateField("name", e.target.value)}
              className={inputClassName}
              placeholder="e.g. Rahul Sharma"
            />
          </Field>

          <Field label="WhatsApp Number" error={errors.phone}>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[14px] font-bold text-[#94A3B8]">+91</span>
              <input
                type="tel"
                inputMode="numeric"
                enterKeyHint="next"
                value={values.phone}
                maxLength={10}
                onChange={(e) => updateField("phone", e.target.value.replace(/\D/g, ""))}
                className={cn(inputClassName, "pl-12")}
                placeholder="98765 43210"
              />
            </div>
          </Field>

          <Field label="Email Address" error={errors.email}>
            <input
              type="email"
              enterKeyHint="next"
              value={values.email}
              onChange={(e) => updateField("email", e.target.value)}
              className={inputClassName}
              placeholder="you@business.com"
            />
          </Field>

          <Field label="Business Name" error={errors.businessName}>
            <input
              type="text"
              enterKeyHint="next"
              value={values.businessName}
              onChange={(e) => updateField("businessName", e.target.value)}
              className={inputClassName}
              placeholder="Your brand name"
            />
          </Field>

          <Field label="City" error={errors.city}>
            <input
              type="text"
              enterKeyHint="next"
              value={values.city}
              onChange={(e) => updateField("city", e.target.value)}
              className={inputClassName}
              placeholder="City name"
            />
          </Field>

          <Field label="State" error={errors.state}>
            <select
              value={values.state}
              onChange={(e) => updateField("state", e.target.value)}
              className={cn(inputClassName, "appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%20fill%3D%27none%27%20viewBox%3D%270%200%2020%2020%27%3E%3Cpath%20stroke%3D%27%236b7280%27%20stroke-linecap%3D%27round%27%20stroke-linejoin%3D%27round%27%20stroke-width%3D%271.5%27%20d%3D%27m6%208%204%204%204-4%27%2F%3E%3C%2Fsvg%3E')] bg-[position:right_1rem_center] bg-[size:1.5em_1.5em] bg-no-repeat")}
            >
              <option value="">Select state</option>
              {indianStates.map((s) => (
                <option key={s.name} value={s.name}>{s.name}</option>
              ))}
            </select>
          </Field>
        </div>
        </div>

        <div className="rounded-[28px] border border-[#dfe7ee] bg-white p-5 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.18)] sm:p-6">
          <div className="grid gap-6">
            <Field label="Billing Address" error={errors.billingAddress}>
              <textarea
                value={values.billingAddress}
                onChange={(e) => updateField("billingAddress", e.target.value)}
                className={cn(inputClassName, "h-24 py-3 resize-none")}
                placeholder="Shop No, Street, Landmark, Area..."
              />
            </Field>

            <Field label="Instagram / Website" error={errors.website} optional>
              <input
                type="url"
                enterKeyHint="done"
                value={values.website}
                onChange={(e) => updateField("website", e.target.value)}
                className={inputClassName}
                placeholder="instagram.com/your-handle"
              />
            </Field>
          </div>
        </div>

        <div className="flex flex-col gap-6 rounded-[28px] border border-[#dfe7ee] bg-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1 text-center sm:text-left">
              <p className="text-[17px] font-black tracking-tight text-[#111827]">Continue</p>
              <p className="text-[12px] font-semibold text-[#64748B]">Review your order on the next screen before payment opens.</p>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "inline-flex w-full min-h-[52px] items-center justify-center gap-2.5 rounded-[16px] bg-[#111827] px-8 py-3.5 text-[15px] font-black text-white shadow-[0_18px_36px_-16px_rgba(0,0,0,0.24)] transition-all duration-300 hover:bg-black active:scale-[0.98] sm:w-auto sm:min-h-0",
                isSubmitting && "pointer-events-none opacity-70",
              )}
            >
              {isSubmitting ? (
                <>
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Sending alert…
                </>
              ) : (
                <>
                  Continue
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4.5 w-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5l6 6m0 0l-6 6m6-6H3" /></svg>
                </>
              )}
            </button>
          </div>

          <button
            type="button"
            onClick={() => router.push(`/book?plan=${plan.id}`)}
            className="group self-center text-[12px] font-bold text-[#94A3B8] transition-all hover:text-[#00A9FF] sm:self-start"
          >
            <span className="flex items-center gap-2">
              <Icon name="chevron-left" className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
              Change selected plan
            </span>
          </button>
        </div>
      </form>
    </BookingShell>
  );
}

function Field({ label, children, optional = false, error }: { label: string; children: React.ReactNode; optional?: boolean; error?: string }) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-1.5 text-[13px] font-bold uppercase tracking-wider text-[#475569] max-md:text-[14px]">
        {label}
        {optional ? <span className="text-[10px] font-bold normal-case text-[#94A3B8]">(Optional)</span> : null}
      </span>
      {children}
      {error ? (
        <p className="mt-2 flex items-center gap-1.5 text-[12px] font-bold text-rose-500 animate-reveal-up">
          <span className="h-1 w-1 rounded-full bg-rose-500" />
          {error}
        </p>
      ) : null}
    </label>
  );
}
