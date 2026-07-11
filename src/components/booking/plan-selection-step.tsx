"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { pricingPlans, type Plan } from "@/content/site";
import {
  clampBookingQuantity,
  createBookingDraft,
  getBulkBookingBreakdown,
  getEmptyBookingState,
  getPlanBaseTotal,
  getPlanGrandTotal,
  getPlanPriceBreakdown,
  getSelectedMaintenance,
  readStoredBookingState,
  writeStoredBookingState,
} from "@/lib/booking";
import { BookingShell } from "@/components/booking/booking-shell";
import { Icon } from "@/components/icons";
import { cn, formatCurrency } from "@/lib/utils";

const primaryPlans = pricingPlans;

function getDefaultMaintenanceId(plan?: Plan) {
  return plan?.maintenanceOptions.find((option) => option.id === "6-month")?.id ?? plan?.maintenanceOptions[0]?.id ?? "6-month";
}

export function PlanSelectionStep() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const stored = readStoredBookingState() ?? getEmptyBookingState();
  const hostingRef = useRef<HTMLFieldSetElement>(null);
  const quantityRef = useRef<HTMLFieldSetElement>(null);
  const continueRef = useRef<HTMLDivElement>(null);

  const resolvedInitialPlan =
    pricingPlans.find((plan) => plan.id === (searchParams.get("plan") ?? stored.planId)) ??
    pricingPlans.find((plan) => plan.id === "signature") ??
    primaryPlans[0];
  const initialMaintenanceId = getDefaultMaintenanceId(resolvedInitialPlan);

  const qtyFromUrl = searchParams.get("qty");
  const initialQuantity = useMemo(() => {
    if (qtyFromUrl !== null && qtyFromUrl !== "") {
      return clampBookingQuantity(parseInt(qtyFromUrl, 10));
    }
    return clampBookingQuantity(stored.quantity ?? 1);
  }, [qtyFromUrl, stored.quantity]);

  const [selectedPlanId, setSelectedPlanId] = useState(resolvedInitialPlan?.id);
  const [selectedMaintenanceId, setSelectedMaintenanceId] = useState(initialMaintenanceId);
  const [quantity, setQuantity] = useState(initialQuantity);
  const [showStarter, setShowStarter] = useState(false);

  useEffect(() => {
    if (qtyFromUrl === null || qtyFromUrl === "") return;
    const next = clampBookingQuantity(parseInt(qtyFromUrl, 10));
    queueMicrotask(() => setQuantity(next));
  }, [qtyFromUrl]);

  const selectedPlan = useMemo(
    () => pricingPlans.find((plan) => plan.id === selectedPlanId) ?? primaryPlans[0],
    [selectedPlanId],
  );

  const hiddenPlan = (pricingPlans as (Plan & { isHiddenOption?: boolean })[]).find((p) => p.isHiddenOption);
  const maintenance = getSelectedMaintenance(selectedPlan, selectedMaintenanceId);
  const yearlyMaintenance = selectedPlan.maintenanceOptions[0];
  const twoYearMaintenance = selectedPlan.maintenanceOptions.find((o) => o.id === "2-year");
  const maintenanceSaveAmount =
    twoYearMaintenance && yearlyMaintenance && twoYearMaintenance.id !== yearlyMaintenance.id
      ? twoYearMaintenance.price - yearlyMaintenance.price
      : 0;
  const bulkBreakdown = getBulkBookingBreakdown(selectedPlan, selectedMaintenanceId, [], quantity);
  const grandTotal = getPlanGrandTotal(selectedPlan, selectedMaintenanceId, [], quantity);
  const orderGstBreakdown = useMemo(
    () => getPlanPriceBreakdown(selectedPlan, selectedMaintenanceId, [], quantity),
    [selectedPlan, selectedMaintenanceId, quantity],
  );
  const setupExcl = selectedPlan.setupAmount;
  const careExcl = maintenance?.price ?? 0;
  const quickInclusions = selectedPlan.features.filter((f) => f.status !== "crossed").slice(0, 4);
  const selectedTone = getCheckoutTone(selectedPlan.id);
  const hasTeamDiscount = bulkBreakdown.discountPercent > 0;

  function scrollToSection(ref: { current: HTMLElement | null }) {
    if (typeof window === "undefined" || window.innerWidth >= 768) {
      return;
    }

    window.setTimeout(() => {
      ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 140);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selectedPlan) return;

    const draft = createBookingDraft({
      planId: selectedPlan.id,
      maintenanceId: selectedMaintenanceId ?? maintenance?.id,
      quantity,
      addOnIds: [],
      details: stored.details,
      currentState: stored,
    });

    writeStoredBookingState(draft);
    router.push(`/book/details?plan=${selectedPlan.id}`);
  }

  if (!selectedPlan) return null;

  return (
    <BookingShell
      step="details"
      eyebrow="Book your OneLink"
      title="Set up your page."
      description="Confirm your plan and hosting — same choices you saw on the site. Totals on the right update as you go."
      mobileAsidePosition="bottom"
      contentClassName="max-xl:pb-2"
      className="xl:grid-cols-[minmax(0,1fr)_minmax(300px,380px)] xl:gap-12"
      aside={
        <div className="overflow-hidden rounded-[22px] border border-slate-200/90 bg-white shadow-[0_24px_56px_-32px_rgba(15,23,42,0.2)]">
          <div className="bg-gradient-to-r from-slate-50 to-white px-5 py-4 max-md:px-4 max-md:py-3.5">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 max-md:text-[11px]">Order summary</p>
            <p className="mt-1 text-[12px] font-medium text-slate-500 max-md:text-[13px]">
              Plan & hosting prices are excl. GST. 18% is added; the breakdown below matches what you pay.
            </p>
          </div>

          <div className="space-y-5 p-5 max-md:space-y-4 max-md:p-4 max-md:text-[15px]">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[15px] font-black tracking-tight text-slate-900">{selectedPlan.name}</p>
                  <p className="mt-0.5 text-[11px] font-semibold text-slate-400">
                    {maintenance ? `${maintenance.label} care` : "Care"} · {quantity === 1 ? "1 OneLink" : `${quantity} OneLinks`}
                  </p>
                </div>
              </div>

              <div className="flex items-start justify-between gap-3 border-t border-slate-100 pt-3">
                <div className="min-w-0">
                  <p className="text-[12px] font-bold text-slate-600">Per OneLink (incl. GST)</p>
                </div>
                <p className="shrink-0 text-[15px] font-black tabular-nums text-slate-900">
                  {formatCurrency(bulkBreakdown.unit)}
                </p>
              </div>

              {quantity > 1 ? (
                <div className="flex items-center justify-between gap-3 text-[12px] font-semibold text-slate-500">
                  <span>Number of pages</span>
                  <span className="tabular-nums text-slate-800">× {quantity}</span>
                </div>
              ) : null}
            </div>

            <div className="rounded-[16px] border border-slate-100 bg-slate-50/90 p-4">
              <div className="space-y-2 border-b border-slate-200/80 pb-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[12px] font-bold text-slate-600">Subtotal (excl. GST)</span>
                  <span className="text-[13px] font-black tabular-nums text-slate-800">
                    {formatCurrency(orderGstBreakdown.preTax)}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[12px] font-bold text-slate-600">GST @ 18%</span>
                  <span className="text-[13px] font-black tabular-nums text-slate-800">
                    +{formatCurrency(orderGstBreakdown.gst)}
                  </span>
                </div>
              </div>
              {hasTeamDiscount ? (
                <>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <span className="text-[12px] font-bold text-slate-600">List total (before team offer)</span>
                    <span className="text-[15px] font-black tabular-nums text-slate-700 line-through decoration-slate-400">
                      {formatCurrency(bulkBreakdown.gross)}
                    </span>
                  </div>
                  <div className="mt-2.5 flex items-center justify-between gap-2">
                    <span className="text-[12px] font-bold text-emerald-800">
                      Team offer ({bulkBreakdown.discountPercent}% off list)
                    </span>
                    <span className="text-[14px] font-black tabular-nums text-emerald-700">
                      −{formatCurrency(bulkBreakdown.discount)}
                    </span>
                  </div>
                  <div className="mt-3 border-t border-slate-200/80 pt-3">
                    <div className="flex items-end justify-between gap-2">
                      <span className="text-[13px] font-black uppercase tracking-[0.12em] text-slate-800">You pay</span>
                      <span className="text-[24px] font-black leading-none tabular-nums tracking-tight text-[#00a9ff]">
                        {formatCurrency(grandTotal)}
                      </span>
                    </div>
                    <p className="mt-1.5 text-[12px] font-medium text-slate-500 max-md:text-[13px]">
                      Amount due includes 18% GST (subtotal + GST above).
                    </p>
                  </div>
                </>
              ) : (
                <div className="mt-3 flex items-end justify-between gap-2">
                  <div>
                    <span className="text-[13px] font-black uppercase tracking-[0.12em] text-slate-800">You pay</span>
                    <p className="mt-1 text-[12px] font-medium text-slate-500 max-md:text-[13px]">
                      Amount due includes 18% GST (subtotal + GST above).
                    </p>
                  </div>
                  <span className="text-[24px] font-black leading-none tabular-nums tracking-tight text-[#00a9ff]">
                    {formatCurrency(grandTotal)}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-2.5 border-t border-slate-100 pt-4">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">What one seat includes</p>
              <div className="flex items-start justify-between gap-3">
                <span className="text-[12px] font-semibold text-slate-600">Setup & build (excl. GST)</span>
                <span className="shrink-0 text-[13px] font-bold tabular-nums text-slate-800">
                  {formatCurrency(setupExcl)}
                </span>
              </div>
              <div className="flex items-start justify-between gap-3">
                <span className="text-[12px] font-semibold text-slate-600">Hosting & care (excl. GST)</span>
                <span className="shrink-0 text-[13px] font-bold tabular-nums text-slate-800">
                  {formatCurrency(careExcl)}
                </span>
              </div>
              <p className="text-[11px] font-medium leading-snug text-slate-400">
                GST is calculated on the combined plan total (not shown per line); see subtotal and GST above.
              </p>
            </div>

            <div className="rounded-[16px] border border-slate-100 bg-slate-50/80 px-4 py-4 max-md:px-3.5 max-md:py-3.5">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-slate-500">Included with plan</p>
              <ul className="mt-3 space-y-2.5">
                {quickInclusions.map((feature) => (
                  <li key={feature.text} className="flex gap-2.5 text-left">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#00a9ff]/15 text-[#00a9ff]">
                      <Icon name="check" className="h-2.5 w-2.5" />
                    </span>
                    <span className="text-[12px] font-semibold leading-snug text-slate-600 max-md:text-[13px]">{feature.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <ul className="space-y-2 border-t border-slate-100 pt-4">
              {["Razorpay secured", "GST invoice after payment", "Support in 4–8 hrs"].map((line) => (
                <li key={line} className="flex items-center gap-2.5 text-[11px] font-semibold text-slate-500 max-md:text-[12px]">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-8 max-md:space-y-7">
        <fieldset className="rounded-[20px] border border-slate-200/80 bg-slate-50/40 p-5 sm:p-6 max-md:p-5 max-md:rounded-[22px]">
          <legend className="mb-4 text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 max-md:mb-3 max-md:text-[12px]">
            Step 1 · Confirm plan
          </legend>
          <p className="mb-4 text-[13px] font-medium leading-relaxed text-slate-500 max-md:mb-3 max-md:text-[14px]">
            Pick the tier you want. If you already chose on the homepage, just tap the same one here.
          </p>
          <div className="space-y-2.5">
            {primaryPlans.map((plan) => (
              <PlanSelectRow
                key={plan.id}
                plan={plan}
                selected={selectedPlan.id === plan.id}
                onSelect={() => {
                  setSelectedPlanId(plan.id);
                  setSelectedMaintenanceId(getDefaultMaintenanceId(plan));
                  scrollToSection(hostingRef);
                }}
              />
            ))}
          </div>

          {hiddenPlan ? (
            <div className="mt-6 border-t border-dashed border-slate-200 pt-5">
              <button
                type="button"
                onClick={() => setShowStarter((current) => !current)}
                className="flex items-center gap-2 text-[12px] font-bold text-slate-400 transition-colors hover:text-[#00a9ff]"
              >
                <Icon name={showStarter ? "chevron-left" : "spark"} className="h-4 w-4" />
                {showStarter ? "Back to main plans" : "Need the budget starter? Show it"}
              </button>
              {showStarter ? (
                <div className="mt-3">
                  <PlanSelectRow
                    plan={hiddenPlan}
                    selected={selectedPlan.id === hiddenPlan.id}
                    onSelect={() => {
                      setSelectedPlanId(hiddenPlan.id);
                      setSelectedMaintenanceId(getDefaultMaintenanceId(hiddenPlan));
                      scrollToSection(hostingRef);
                    }}
                  />
                </div>
              ) : null}
            </div>
          ) : null}
        </fieldset>

        <fieldset ref={hostingRef} className="scroll-mt-24 rounded-[20px] border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6 max-md:p-5 max-md:rounded-[22px]">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 max-md:mb-3">
            <legend className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 max-md:text-[12px]">
              Step 2 · Platform duration
            </legend>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/80 bg-emerald-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-emerald-800">
              <Icon name="shield" className="h-3 w-3 text-emerald-700" />
              Prepaid
            </span>
          </div>
          <div
            className={cn(
              "flex w-full overflow-visible rounded-[16px] border p-1",
              maintenanceSaveAmount > 0 && "pt-2.5 sm:pt-3",
              selectedTone.selectorWrap,
            )}
          >
            {selectedPlan.maintenanceOptions.map((option) => {
              const isSelected = selectedMaintenanceId === option.id;
              const isTwoYear = option.id === "2-year";
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    setSelectedMaintenanceId(option.id);
                    scrollToSection(quantityRef);
                  }}
                  className={cn(
                    "relative flex flex-1 flex-col items-center justify-center overflow-visible rounded-[12px] px-3 py-3.5 transition-all duration-200 max-md:min-h-[3.25rem] sm:px-4 sm:py-4",
                    isSelected ? selectedTone.selectorActive : "hover:bg-black/[0.04]",
                  )}
                >
                  {maintenanceSaveAmount > 0 && isTwoYear ? (
                    <span className="pointer-events-none absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-emerald-200/90 bg-emerald-50 px-2 py-px text-[8px] font-black uppercase tracking-[0.12em] text-emerald-800 shadow-sm">
                      Save {formatCurrency(maintenanceSaveAmount)}
                    </span>
                  ) : null}
                  <span
                    className={cn(
                      "text-[14px] font-bold tracking-tight",
                      isSelected ? "text-[#111827]" : "text-slate-400",
                    )}
                  >
                    {option.label}
                  </span>
                  <span
                    className={cn(
                      "mt-0.5 text-[12px] font-bold tabular-nums",
                      isSelected ? selectedTone.label : "text-slate-400",
                    )}
                  >
                    {formatCurrency(option.price)}
                  </span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset ref={quantityRef} className="scroll-mt-24 rounded-[20px] border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6 max-md:p-5 max-md:rounded-[22px]">
          <legend className="mb-2 text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 max-md:text-[12px]">
            Step 3 · How many pages?
          </legend>
          <p className="mb-3 text-[13px] font-medium leading-relaxed text-slate-500 max-md:text-[14px]">
            One number = one full OneLink. Everyone gets this same plan and the hosting option you picked above — we multiply the price and apply a team offer automatically.
          </p>
          <div className="mb-4 flex flex-wrap gap-2">
            {[
              { label: "2 pages → 10% off", active: quantity === 2 },
              { label: "3–4 → 15% off", active: quantity >= 3 && quantity <= 4 },
              { label: "5+ → 25% off", active: quantity >= 5 },
            ].map((chip) => (
              <span
                key={chip.label}
                className={cn(
                  "rounded-full border px-3 py-1 text-[11px] font-bold max-md:px-3.5 max-md:py-1.5 max-md:text-[12px]",
                  chip.active
                    ? "border-[#00a9ff]/40 bg-[#00a9ff]/10 text-[#0369a1]"
                    : "border-slate-200 bg-slate-50 text-slate-500",
                )}
              >
                {chip.label}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center rounded-[14px] border border-slate-200 bg-slate-50 p-0.5">
              <button
                type="button"
                aria-label="Decrease quantity"
                className="flex h-11 w-11 items-center justify-center rounded-[11px] text-lg font-black text-slate-700 transition hover:bg-white max-md:active:scale-95 sm:h-10 sm:w-10"
                onClick={() => setQuantity((q) => clampBookingQuantity(q - 1))}
              >
                −
              </button>
              <span className="min-w-[2.75rem] text-center text-[18px] font-black tabular-nums text-slate-900 sm:text-[17px]">{quantity}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                className="flex h-11 w-11 items-center justify-center rounded-[11px] text-lg font-black text-slate-700 transition hover:bg-white max-md:active:scale-95 sm:h-10 sm:w-10"
                onClick={() => setQuantity((q) => clampBookingQuantity(q + 1))}
              >
                +
              </button>
            </div>
            <label className="flex min-w-[7rem] flex-1 flex-col gap-1 text-[10px] font-bold uppercase tracking-wider text-slate-500 sm:min-w-[9rem]">
              Or type
              <input
                type="number"
                min={1}
                max={99}
                value={quantity}
                onChange={(e) => setQuantity(clampBookingQuantity(parseInt(e.target.value, 10)))}
                className="h-11 rounded-[12px] border border-slate-200 bg-white px-3 text-center text-[16px] font-black text-slate-900 outline-none focus:border-[#00A9FF] focus:ring-2 focus:ring-[#00A9FF]/20 sm:h-10 sm:text-[15px]"
              />
            </label>
          </div>
        </fieldset>

        <div
          ref={continueRef}
          className="scroll-mt-28 flex flex-col gap-4 rounded-[20px] border border-slate-200/80 bg-gradient-to-br from-slate-50 to-white p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6 max-md:p-5 max-md:pb-6"
        >
          <div className="space-y-1">
            <p className="text-[17px] font-black tracking-tight text-slate-900 max-md:text-[18px]">Continue to details</p>
            <p className="text-[13px] font-medium text-slate-500 max-md:text-[14px]">Billing name, email, and GST (if needed).</p>
          </div>
          <button
            type="submit"
            className="inline-flex w-full min-h-[52px] items-center justify-center gap-2 rounded-[14px] bg-[#111827] px-7 py-3.5 text-[15px] font-black text-white shadow-lg shadow-slate-900/15 transition-all duration-200 hover:bg-black active:scale-[0.98] sm:w-auto sm:min-h-0 sm:text-[14px]"
          >
            Continue
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5l6 6m0 0l-6 6m6-6H3" />
            </svg>
          </button>
        </div>
      </form>
    </BookingShell>
  );
}

function PlanSelectRow({ plan, selected, onSelect }: { plan: Plan; selected: boolean; onSelect: () => void }) {
  const tone = getCheckoutTone(plan.id);
  const defaultCareId = getDefaultMaintenanceId(plan);
  const yearOneExcl = getPlanBaseTotal(plan, defaultCareId);
  const badge =
    plan.id === "essential"
      ? "Easy Start"
      : plan.id === "signature"
        ? "Popular"
        : plan.id === "elite"
          ? "Software"
          : plan.id === "enterprise"
          ? "Enterprise"
          : (plan.badge ?? "").replace(/\s+/g, " ").trim() || "Plan";

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex w-full min-w-0 items-center gap-3 rounded-[14px] border px-3.5 py-3.5 text-left transition-all duration-200 max-md:min-h-[4.25rem] sm:gap-4 sm:px-4 sm:py-3.5",
        selected
          ? cn("bg-white shadow-sm ring-2 ring-offset-2 ring-offset-slate-50", tone.rowSelectedRing)
          : "border-slate-200/90 bg-white hover:border-slate-300 hover:bg-slate-50/80",
      )}
    >
      <span
        className={cn(
          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
          selected ? cn("text-white", tone.optionCheck) : "border-slate-300 bg-white",
        )}
        aria-hidden
      >
        {selected ? <Icon name="check" className="h-3 w-3" /> : null}
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
          <span className="text-[15px] font-black tracking-tight text-slate-900 max-md:text-[16px]">{plan.name}</span>
          <span
            className={cn(
              "rounded-md px-1.5 py-px text-[9px] font-black uppercase tracking-wider",
              plan.id === "essential"
                ? "bg-slate-900 text-white"
                : plan.id === "signature"
                  ? "bg-amber-900/90 text-amber-50"
                  : plan.id === "elite"
                    ? "bg-violet-700 text-white"
                  : plan.id === "enterprise"
                    ? "bg-sky-800 text-white"
                    : "bg-sky-100 text-sky-800",
            )}
          >
            {badge}
          </span>
        </div>
        <p className="mt-0.5 text-[11px] font-semibold text-slate-400">
          Setup + 6 months · {formatCurrency(yearOneExcl)} + GST (18%)
        </p>
      </div>
      <div className="shrink-0 text-right">
        {plan.originalAmount ? (
          <p className="text-[11px] font-bold text-slate-300 line-through">{formatCurrency(plan.originalAmount)}</p>
        ) : null}
        <p className="text-[16px] font-black tabular-nums text-slate-900 sm:text-[17px]">{formatCurrency(yearOneExcl)}</p>
        <p className="text-[10px] font-semibold text-slate-400 tabular-nums">
          + GST extra
        </p>
      </div>
    </button>
  );
}

function getCheckoutTone(planId: string) {
  if (planId === "enterprise") {
    return {
      label: "text-[#0369A1]",
      icon: "text-[#0369A1]",
      pill: "border-[#bae6fd] bg-[#f0f9ff] text-[#0369A1]",
      selectorWrap: "border-[#E3EDF6] bg-[linear-gradient(180deg,#f7fafc_0%,#f4f8fb_100%)]",
      selectorActive: "border-[#7dd3fc] bg-white shadow-[0_10px_20px_-14px_rgba(14,165,233,0.3)]",
      rowSelectedRing: "border-sky-400 ring-sky-500",
      optionBadge: "bg-sky-600 text-white shadow-sky-600/20",
      optionCheck: "border-sky-600 bg-sky-600",
      savingsPill: "border-[#bae6fd] bg-[#f0f9ff] text-[#0369A1]",
      taxPill: "border-[#bae6fd] bg-[#f0f9ff] text-[#0369A1]",
      featureWrap: "border-[#e0f2fe] bg-[linear-gradient(180deg,#fcfeff_0%,#f0f9ff_100%)]",
      featureIcon: "bg-[#00A9FF]/10 text-[#00A9FF]",
      topWash: "bg-[linear-gradient(180deg,rgba(0,169,255,0.1),rgba(255,255,255,0))]",
    };
  }

  if (planId === "signature") {
    return {
      label: "text-[#9b6d14]",
      icon: "text-[#9b6d14]",
      pill: "border-[#ead8b0] bg-[#fff8ea] text-[#9b6d14]",
      selectorWrap: "border-[#eee1c2] bg-[linear-gradient(180deg,#fffaf2_0%,#fbf4e7_100%)]",
      selectorActive: "border-[#e7d2a3] bg-white shadow-[0_10px_20px_-14px_rgba(171,125,36,0.35)]",
      rowSelectedRing: "border-[#e7d2a3] ring-[#e7d2a3]",
      optionBadge: "bg-[#c08a1f] text-white shadow-[#c08a1f]/20",
      optionCheck: "border-[#c08a1f] bg-[#c08a1f]",
      savingsPill: "border-[#ead8b0] bg-[#fff8ea] text-[#9b6d14]",
      taxPill: "border-[#ead8b0] bg-[#fff8ea] text-[#9b6d14]",
      featureWrap: "border-[#f3ead5] bg-[linear-gradient(180deg,#fffdf8_0%,#fff9ef_100%)]",
      featureIcon: "bg-[#fff3d9] text-[#9b6d14]",
      topWash: "bg-[linear-gradient(180deg,rgba(221,176,72,0.12),rgba(255,255,255,0))]",
    };
  }

  if (planId === "essential") {
    return {
      label: "text-[#5c6774]",
      icon: "text-[#5c6774]",
      pill: "border-[#d7e0e8] bg-[#f6f8fb] text-[#5c6774]",
      selectorWrap: "border-[#dde5eb] bg-[linear-gradient(180deg,#fafbfd_0%,#f2f5f8_100%)]",
      selectorActive: "border-[#d6dde5] bg-white shadow-[0_10px_20px_-14px_rgba(102,116,133,0.28)]",
      rowSelectedRing: "border-slate-300 ring-slate-400",
      optionBadge: "bg-[#5c6774] text-white shadow-[#5c6774]/20",
      optionCheck: "border-[#5c6774] bg-[#5c6774]",
      savingsPill: "border-[#d7e0e8] bg-[#f6f8fb] text-[#5c6774]",
      taxPill: "border-[#d7e0e8] bg-[#f6f8fb] text-[#5c6774]",
      featureWrap: "border-[#e8edf2] bg-[linear-gradient(180deg,#fcfdff_0%,#f6f8fa_100%)]",
      featureIcon: "bg-[#eef2f5] text-[#5c6774]",
      topWash: "bg-[linear-gradient(180deg,rgba(136,151,168,0.14),rgba(255,255,255,0))]",
    };
  }

  return {
    label: "text-[#0369A1]",
    icon: "text-[#0369A1]",
    pill: "border-[#dbeafe] bg-[#f7fbff] text-[#0369A1]",
    selectorWrap: "border-[#E3EDF6] bg-[linear-gradient(180deg,#f7fafc_0%,#f4f8fb_100%)]",
    selectorActive: "border-[#D7E5F2] bg-white shadow-[0_10px_20px_-14px_rgba(15,23,42,0.2)]",
    rowSelectedRing: "border-sky-200 ring-[#00a9ff]",
    optionBadge: "bg-[#00a9ff] text-white shadow-[#00a9ff]/20",
    optionCheck: "border-[#00a9ff] bg-[#00a9ff]",
    savingsPill: "border-[#dbeafe] bg-[#f7fbff] text-[#0369A1]",
    taxPill: "border-[#dbeafe] bg-[#f7fbff] text-[#0369A1]",
    featureWrap: "border-[#eff4f8] bg-[linear-gradient(180deg,#fcfeff_0%,#f8fbfe_100%)]",
    featureIcon: "bg-[#e0f2fe] text-[#00A9FF]",
    topWash: "bg-[linear-gradient(180deg,rgba(0,169,255,0.05),rgba(255,255,255,0))]",
  };
}
