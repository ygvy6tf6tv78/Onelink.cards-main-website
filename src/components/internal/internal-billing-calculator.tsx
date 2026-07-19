"use client";

import { useMemo, useState } from "react";
import { pricingPlans } from "@/content/site";
import { Icon } from "@/components/icons";
import { PricingBrandMark, Wordmark } from "@/components/ui/brand-mark";
import { InternalBillingWorkspaceNav } from "@/components/internal/internal-billing-workspace-nav";
import { calculateInternalQuote, type InternalDiscountMode } from "@/lib/internal-billing";
import { cn, formatCurrencyDetailed } from "@/lib/utils";

const internalPlans = pricingPlans.filter((plan) => ["essential", "signature", "elite"].includes(plan.id));

const durationLabels: Record<string, string> = {
  "1-month": "1 Month",
  "3-month": "3 Months",
  "6-month": "6 Months",
  "12-month": "12 Months",
};

const planTones: Record<string, { mark: "business" | "signature" | "essential"; selected: string; chip: string }> = {
  essential: {
    mark: "business",
    selected: "!border-[#8fd7fa] bg-[linear-gradient(145deg,#ffffff_0%,#edf9ff_100%)] shadow-[0_22px_46px_-32px_rgba(0,126,191,0.36)]",
    chip: "bg-[#eef2f5] text-[#526173]",
  },
  signature: {
    mark: "signature",
    selected: "!border-[#00A9FF] bg-[linear-gradient(145deg,#087cbc_0%,#00A9FF_58%,#0677b6_100%)] text-white shadow-[0_26px_58px_-30px_rgba(0,126,191,0.58)]",
    chip: "bg-white/16 text-white",
  },
  elite: {
    mark: "essential",
    selected: "!border-[#79cef7] bg-[linear-gradient(145deg,#fafdff_0%,#e7f7ff_100%)] shadow-[0_22px_46px_-32px_rgba(0,126,191,0.4)]",
    chip: "bg-[#e7f6ff] text-[#087cbc]",
  },
};

function formatBillingCurrency(amount: number) {
  return formatCurrencyDetailed(amount).replace("₹", "₹").replace(/\.00$/, "");
}

export function InternalBillingCalculator() {
  const [clientName, setClientName] = useState("");
  const [selectedPlanId, setSelectedPlanId] = useState("signature");
  const [selectedCareId, setSelectedCareId] = useState("6-month");
  const [discountMode, setDiscountMode] = useState<InternalDiscountMode>("percentage");
  const [discountValues, setDiscountValues] = useState<Record<InternalDiscountMode, number>>({ percentage: 0, fixed: 0 });
  const [includeGst, setIncludeGst] = useState(true);
  const [copyStatus, setCopyStatus] = useState("Copy estimate");

  const selectedPlan = internalPlans.find((plan) => plan.id === selectedPlanId) ?? internalPlans[1];
  const selectedCare = selectedPlan.maintenanceOptions.find((option) => option.id === selectedCareId) ?? selectedPlan.maintenanceOptions.find((option) => option.id === "6-month") ?? selectedPlan.maintenanceOptions[0];
  const quote = useMemo(() => calculateInternalQuote({
    setupAmount: selectedPlan.setupAmount,
    careAmount: selectedCare.price,
    discountMode,
    discountValue: discountValues[discountMode],
    includeGst,
  }), [discountMode, discountValues, includeGst, selectedCare.price, selectedPlan.setupAmount]);
  const billHref = useMemo(() => {
    const params = new URLSearchParams({
      client: clientName.trim(),
      plan: selectedPlan.id,
      care: selectedCare.id,
      description: `One-time design & development fee and ${durationLabels[selectedCare.id] ?? selectedCare.label} Platform Care`,
      setup: String(quote.setupAmount),
      careAmount: String(quote.careAmount),
      discountMode,
      discountValue: String(quote.normalizedDiscount),
      gst: includeGst ? "18" : "0",
    });

    return `/--12/billing/bill?${params.toString()}`;
  }, [clientName, discountMode, includeGst, quote.careAmount, quote.normalizedDiscount, quote.setupAmount, selectedCare.id, selectedCare.label, selectedPlan.id]);

  function updateDiscount(value: number) {
    setDiscountValues((current) => ({ ...current, [discountMode]: Math.max(value || 0, 0) }));
  }

  async function copyEstimate() {
    const lines = [
      "OneLink Estimate",
      clientName.trim() ? `Client: ${clientName.trim()}` : null,
      `Plan: ${selectedPlan.name}`,
      `Design & development fee: ${formatBillingCurrency(quote.setupAmount)}`,
      `Platform Care (${durationLabels[selectedCare.id] ?? selectedCare.label}): ${formatBillingCurrency(quote.careAmount)}`,
      `Subtotal: ${formatBillingCurrency(quote.subtotal)}`,
      quote.discountAmount > 0 ? `Discount: -${formatBillingCurrency(quote.discountAmount)}` : null,
      `Amount before GST: ${formatBillingCurrency(quote.amountBeforeGst)}`,
      includeGst ? `GST (18%): ${formatBillingCurrency(quote.gstAmount)}` : "GST: Not included",
      `Total payable: ${formatBillingCurrency(quote.totalPayable)}`,
    ].filter(Boolean).join("\n");

    await navigator.clipboard.writeText(lines);
    setCopyStatus("Copied");
    window.setTimeout(() => setCopyStatus("Copy estimate"), 1600);
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_50%_0%,rgba(0,169,255,0.16),transparent_34%),linear-gradient(180deg,#f7fbfe_0%,#eef6fb_100%)] text-[#0f172a]">
      <header className="border-b border-[#dceaf3] bg-white/88 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <Wordmark priority className="!h-auto !w-[118px] sm:!w-[138px]" />
            <span className="hidden h-6 w-px bg-[#dce5ec] sm:block" />
            <div className="min-w-0">
              <p className="truncate text-[13px] font-bold text-[#263548] sm:text-[14px]">Internal Billing Desk</p>
              <p className="hidden text-[11px] font-medium text-[#7a8999] sm:block">Quick client estimate calculator</p>
            </div>
          </div>
          <InternalBillingWorkspaceNav className="order-3 w-full sm:order-none sm:w-[250px]" />
          <span className="hidden rounded-full border border-[#bde7fb] bg-[#eef9ff] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#087cbc] lg:inline-flex">Internal use only</span>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-7 sm:px-6 sm:py-9 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-start lg:px-8 lg:py-10">
        <div className="min-w-0 space-y-6">
          <section className="rounded-[24px] border border-[#dce8f0] bg-white p-5 shadow-[0_24px_60px_-44px_rgba(15,23,42,0.28)] sm:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#00A9FF]">Client estimate</p>
                <h1 className="font-display mt-2 text-[28px] font-bold leading-tight tracking-[-0.045em] sm:text-[34px]">Build a OneLink quote.</h1>
                <p className="mt-2 text-[14px] font-medium leading-relaxed text-[#64748b]">Choose the plan, care duration and discount. The payable amount updates instantly.</p>
              </div>
              <label className="block w-full sm:max-w-[280px]">
                <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-[0.09em] text-[#64748b]">Client / business name</span>
                <input value={clientName} onChange={(event) => setClientName(event.target.value)} placeholder="Optional" className="h-11 w-full rounded-[12px] border border-[#dce5ec] bg-[#f8fbfd] px-3.5 text-[14px] font-semibold outline-none transition focus:!border-[#00A9FF] focus:ring-4 focus:ring-[#00A9FF]/10" />
              </label>
            </div>
          </section>

          <BillingSection step="01" title="Choose a OneLink plan" description="Setup is charged once.">
            <div className="grid gap-3 md:grid-cols-3">
              {internalPlans.map((plan) => {
                const selected = plan.id === selectedPlan.id;
                const tone = planTones[plan.id];
                return (
                  <button key={plan.id} type="button" onClick={() => setSelectedPlanId(plan.id)} aria-pressed={selected} className={cn("relative min-w-0 rounded-[18px] border border-[#dce7ef] bg-white p-4 text-left shadow-[0_16px_36px_-32px_rgba(15,23,42,0.26)] transition hover:-translate-y-0.5 hover:!border-[#9edcff]", selected && tone.selected)}>
                    <div className="flex items-center justify-between gap-3">
                      <PricingBrandMark tone={tone.mark} className={selected && plan.id === "signature" ? "border-white/30 bg-white" : undefined} />
                      <span className={cn("rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.08em]", selected ? tone.chip : "bg-[#f2f6f9] text-[#64748b]")}>{plan.badge}</span>
                    </div>
                    <h2 className={cn("mt-4 text-[20px] font-bold tracking-[-0.03em]", selected && plan.id === "signature" ? "text-white" : "text-[#111821]")}>{plan.name}</h2>
                    <p className={cn("mt-1 text-[12px] font-medium leading-relaxed", selected && plan.id === "signature" ? "text-white/72" : "text-[#64748b]")}>{plan.description}</p>
                    <p className={cn("mt-4 text-[11px] font-semibold uppercase tracking-[0.08em]", selected && plan.id === "signature" ? "text-white/65" : "text-[#7a8999]")}>Setup</p>
                    <p className={cn("mt-0.5 text-[24px] font-bold tabular-nums", selected && plan.id === "signature" ? "text-white" : "text-[#087cbc]")}>{formatBillingCurrency(plan.setupAmount)}</p>
                  </button>
                );
              })}
            </div>
          </BillingSection>

          <BillingSection step="02" title="Choose Platform Care" description="Hosting, support and eligible updates.">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {selectedPlan.maintenanceOptions.map((option) => {
                const selected = option.id === selectedCare.id;
                return (
                  <button key={option.id} type="button" onClick={() => setSelectedCareId(option.id)} aria-pressed={selected} className={cn("rounded-[16px] border border-[#dce7ef] bg-white px-4 py-4 text-left transition hover:!border-[#9edcff]", selected && "!border-[#00A9FF] bg-[#eef9ff] shadow-[0_14px_34px_-26px_rgba(0,126,191,0.45)] ring-2 ring-[#00A9FF]/10")}>
                    <span className={cn("text-[11px] font-bold uppercase tracking-[0.09em]", selected ? "text-[#087cbc]" : "text-[#64748b]")}>{durationLabels[option.id] ?? option.label}</span>
                    <span className="mt-2 block text-[22px] font-bold tabular-nums text-[#111821]">{formatBillingCurrency(option.price)}</span>
                  </button>
                );
              })}
            </div>
          </BillingSection>

          <BillingSection step="03" title="Apply a discount" description="Choose percentage or a fixed rupee amount.">
            <div className="grid gap-5 md:grid-cols-[220px_minmax(0,1fr)]">
              <div className="grid grid-cols-2 rounded-[13px] bg-[#edf3f7] p-1">
                {(["percentage", "fixed"] as const).map((mode) => (
                  <button key={mode} type="button" onClick={() => setDiscountMode(mode)} className={cn("rounded-[10px] px-3 py-2.5 text-[12px] font-bold transition", discountMode === mode ? "bg-white text-[#087cbc] shadow-sm" : "text-[#64748b]")}>
                    {mode === "percentage" ? "Percentage" : "Rupees"}
                  </button>
                ))}
              </div>
              <div>
                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[16px] font-bold text-[#087cbc]">{discountMode === "percentage" ? "%" : "₹"}</span>
                  <input type="number" min="0" max={discountMode === "percentage" ? 100 : quote.subtotal} step={discountMode === "percentage" ? 1 : 100} value={discountValues[discountMode] || ""} onChange={(event) => updateDiscount(Number(event.target.value))} placeholder="0" className="h-12 w-full rounded-[13px] border border-[#dce5ec] bg-white pl-10 pr-4 text-[17px] font-bold tabular-nums outline-none transition focus:!border-[#00A9FF] focus:ring-4 focus:ring-[#00A9FF]/10" />
                </div>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {(discountMode === "percentage" ? [5, 10, 15, 20] : [500, 1000, 2000, 3000]).map((value) => (
                    <button key={value} type="button" onClick={() => updateDiscount(value)} className="rounded-full border border-[#dce7ef] bg-[#f8fbfd] px-3 py-1.5 text-[11px] font-bold text-[#526173] hover:!border-[#9edcff] hover:text-[#087cbc]">
                      {discountMode === "percentage" ? `${value}%` : `₹${value}`}
                    </button>
                  ))}
                  <button type="button" onClick={() => updateDiscount(0)} className="rounded-full px-3 py-1.5 text-[11px] font-bold text-[#94a3b8] hover:text-[#0f172a]">Clear</button>
                </div>
              </div>
            </div>
          </BillingSection>
        </div>

        <aside className="min-w-0 lg:sticky lg:top-6">
          <div className="overflow-hidden rounded-[24px] border border-[#8fd7fa] bg-[linear-gradient(155deg,#04182f_0%,#07517d_55%,#087cbc_100%)] text-white shadow-[0_32px_76px_-38px_rgba(0,86,137,0.58)]">
            <div className="border-b border-white/12 px-5 py-5 sm:px-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#9bddff]">Live estimate</p>
              <div className="mt-2 flex items-end justify-between gap-4">
                <div>
                  <h2 className="text-[25px] font-bold tracking-[-0.035em]">{selectedPlan.name}</h2>
                  <p className="mt-1 text-[12px] font-medium text-white/62">{durationLabels[selectedCare.id] ?? selectedCare.label} Platform Care</p>
                </div>
                <Icon name="invoice" className="h-7 w-7 text-[#55c5ff]" />
              </div>
            </div>

            <div className="px-5 py-5 sm:px-6">
              <div className="grid grid-cols-2 rounded-[13px] bg-black/16 p-1">
                <button type="button" onClick={() => setIncludeGst(false)} className={cn("rounded-[10px] px-3 py-2.5 text-[11px] font-bold transition", !includeGst ? "bg-white text-[#07517d]" : "text-white/65")}>Without GST</button>
                <button type="button" onClick={() => setIncludeGst(true)} className={cn("rounded-[10px] px-3 py-2.5 text-[11px] font-bold transition", includeGst ? "bg-white text-[#07517d]" : "text-white/65")}>Including GST</button>
              </div>

              <div className="mt-6 space-y-3.5 text-[13px] font-medium">
                <SummaryRow label="Design & development fee" value={formatBillingCurrency(quote.setupAmount)} />
                <SummaryRow label={`Care · ${durationLabels[selectedCare.id] ?? selectedCare.label}`} value={formatBillingCurrency(quote.careAmount)} />
                <div className="border-t border-white/12 pt-3.5"><SummaryRow label="Subtotal" value={formatBillingCurrency(quote.subtotal)} strong /></div>
                <SummaryRow label={discountMode === "percentage" ? `Discount · ${quote.normalizedDiscount}%` : "Fixed discount"} value={quote.discountAmount > 0 ? `− ${formatBillingCurrency(quote.discountAmount)}` : formatBillingCurrency(0)} accent={quote.discountAmount > 0} />
                <div className="border-t border-white/12 pt-3.5"><SummaryRow label="Amount before GST" value={formatBillingCurrency(quote.amountBeforeGst)} strong /></div>
                <SummaryRow label="GST · 18%" value={includeGst ? formatBillingCurrency(quote.gstAmount) : "Not included"} />
              </div>

              <div className="mt-6 rounded-[18px] border border-white/16 bg-white/[0.1] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9bddff]">Total payable</p>
                <p className="mt-2 text-[36px] font-bold leading-none tracking-[-0.045em] tabular-nums sm:text-[40px]">{formatBillingCurrency(quote.totalPayable)}</p>
                <p className="mt-2 text-[11px] font-medium text-white/58">{includeGst ? "GST included" : "GST excluded"}</p>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2.5">
                <button type="button" onClick={copyEstimate} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[12px] bg-[#00A9FF] px-3 text-[12px] font-bold text-white shadow-[0_14px_28px_-16px_rgba(0,169,255,0.68)] hover:bg-[#0096df]">
                  <Icon name="invoice" className="h-4 w-4" />
                  {copyStatus}
                </button>
                <a href={billHref} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[12px] border !border-white/20 bg-white/10 px-3 text-[12px] font-bold text-white hover:bg-white/16">
                  <Icon name="download" className="h-4 w-4" />
                  Make Bill
                </a>
              </div>
            </div>
          </div>
          <p className="mt-3 px-2 text-center text-[10px] font-semibold leading-relaxed text-[#7a8999]">Internal estimate only. Confirm the final approved commercial terms before collecting payment.</p>
        </aside>
      </div>
    </main>
  );
}

function BillingSection({ step, title, description, children }: { step: string; title: string; description: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[24px] border border-[#dce8f0] bg-white p-5 shadow-[0_24px_60px_-44px_rgba(15,23,42,0.26)] sm:p-7">
      <div className="mb-5 flex items-start gap-3">
        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-[#e7f6ff] text-[11px] font-bold text-[#087cbc]">{step}</span>
        <div>
          <h2 className="text-[19px] font-bold tracking-[-0.025em] text-[#111821]">{title}</h2>
          <p className="mt-1 text-[12px] font-medium text-[#7a8999]">{description}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

function SummaryRow({ label, value, strong = false, accent = false }: { label: string; value: string; strong?: boolean; accent?: boolean }) {
  return (
    <div className={cn("flex items-start justify-between gap-4", strong && "font-bold")}>
      <span className="text-white/62">{label}</span>
      <span className={cn("text-right tabular-nums text-white", accent && "text-[#8ee7b4]")}>{value}</span>
    </div>
  );
}
