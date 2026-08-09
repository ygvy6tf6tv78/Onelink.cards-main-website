"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { pricingPlans, siteConfig, type Plan } from "@/content/site";
import { Icon } from "@/components/icons";
import { BuyButton } from "@/components/payment/buy-button";
import { Reveal } from "@/components/ui/reveal";
import { PricingBrandMark } from "@/components/ui/brand-mark";
import { SectionBadge } from "@/components/ui/section-badge";
import { cn, formatCurrency } from "@/lib/utils";

const primaryCareRows = [
  { id: "3-month", label: "3 Months" },
  { id: "6-month", label: "6 Months" },
  { id: "12-month", label: "12 Months" },
];

type TopPlanId = "essential" | "signature" | "elite";

const pricingPresentation: Record<TopPlanId, {
  description: string;
  setupRegular: number;
  careRegular: Record<string, number>;
  features: string[];
}> = {
  essential: {
    description: "A professional digital presence for your business.",
    setupRegular: 5999,
    careRegular: {
      "3-month": 2999,
      "6-month": 4999,
      "12-month": 7999,
    },
    features: [
      "Custom OneLink",
      "Business details & content",
      "Call, WhatsApp, Maps & Pay",
      "QR, gallery & social links",
    ],
  },
  signature: {
    description: "Turn visitors into enquiries, bookings and customers.",
    setupRegular: 7999,
    careRegular: {
      "3-month": 4999,
      "6-month": 7999,
      "12-month": 14999,
    },
    features: [
      "Everything in Essential",
      "Menu, services or portfolio",
      "Bookings, enquiries & orders",
      "Reviews & customer actions",
    ],
  },
  elite: {
    description: "Manage customer actions from one powerful dashboard.",
    setupRegular: 14999,
    careRegular: {
      "3-month": 7999,
      "6-month": 12999,
      "12-month": 23999,
    },
    features: [
      "Everything in Signature",
      "Admin dashboard",
      "Bookings, orders & leads",
      "Pricing & availability control",
    ],
  },
};

function formatPricingCurrency(amount: number) {
  return formatCurrency(amount).replaceAll(",", "");
}

const enterpriseHighlights = [
  "Multi-location setup",
  "Central brand control",
  "Branch-specific information",
  "Custom workflows",
  "Team and dashboard access",
  "Custom integrations based on scope",
];

export function PricingSection() {
  const topPlans = pricingPlans.filter((plan) => plan.id !== "enterprise");
  const enterprisePlan = pricingPlans.find((plan) => plan.id === "enterprise");
  const enterpriseHref = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent("Hello OneLink, I want to discuss an Enterprise setup.")}`;
  return (
    <section
      id="pricing"
      className="relative scroll-mt-28 overflow-hidden bg-[radial-gradient(circle_at_50%_38%,rgba(0,169,255,0.12),transparent_34%),linear-gradient(180deg,#fbfdff_0%,#eff8ff_56%,#f7fafc_100%)] px-5 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16"
    >
      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <Reveal x={-28} y={14}>
            <SectionBadge label="Pricing" className="-mt-2" />
            <h2 className="section-title-gradient font-display mt-4 text-[32px] font-bold leading-[1.08] tracking-[-0.045em] sm:text-[36px] lg:text-[42px]">
              Choose the Right OneLink
            </h2>
            <p className="mt-3 text-[17px] font-semibold leading-relaxed tracking-[-0.015em] text-[#526173] sm:text-[19px]">
              Pay once for setup. Choose the care period that fits your business.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-[#d7a62d] bg-[linear-gradient(135deg,#fff6d7_0%,#f6d36f_100%)] px-3.5 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.1em] text-[#684700] shadow-[0_10px_22px_-16px_rgba(143,94,0,0.75)] sm:text-[10px]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#b77a00] shadow-[0_0_8px_rgba(183,122,0,0.55)]" />
              Launch Offer · Limited Period Pricing
            </div>
          </Reveal>
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="relative mx-auto grid w-full max-w-[42rem] grid-cols-1 items-stretch gap-6 lg:max-w-none lg:grid-cols-3 lg:items-stretch lg:gap-6">
          {topPlans.map((plan, index) => {
            const isSignature = plan.id === "signature";
            return (
              <Reveal key={plan.id} delay={index * 0.05} x={index === 0 ? -30 : index === 2 ? 30 : 0} y={18} className={cn("flex h-full transition-transform", isSignature ? "lg:z-10" : "lg:pt-7")}>
                <PricingCard plan={plan} isSignature={isSignature} />
              </Reveal>
            );
          })}
          </div>
        </div>

        <Reveal delay={0.14} y={14}>
          <PricingPackageBuilder />
        </Reveal>

        {enterprisePlan ? (
          <>
            <Reveal delay={0.16} x={28} y={14}>
              <EnterprisePanel href={enterpriseHref} plan={enterprisePlan} />
            </Reveal>
            <Reveal delay={0.2} y={12}>
              <PricingTermsNotice className="mt-5" />
            </Reveal>
          </>
        ) : null}

      </div>
    </section>
  );
}

function PricingCard({ plan, isSignature }: { plan: Plan; isSignature?: boolean }) {
  const isElite = plan.id === "elite";
  const tone = getPlanTone(plan);
  const [selectedCare, setSelectedCare] = useState("6-month");
  const presentation = pricingPresentation[plan.id as TopPlanId];

  if (!presentation) return null;

  return (
    <article
      className={cn(
        "group relative mx-auto flex h-full w-full max-w-[calc(100vw-40px)] min-w-0 flex-col overflow-hidden rounded-[20px] border bg-white p-4 transition-all duration-300 sm:max-w-none sm:p-5",
        isSignature
          ? "!overflow-visible border-[#55c5ff] bg-[linear-gradient(145deg,#075f94_0%,#00a2ed_52%,#0876af_100%)] shadow-[0_26px_58px_-36px_rgba(0,91,139,0.62)] lg:-translate-y-3"
          : isElite
            ? "border-[#b9e4f8] shadow-[0_18px_42px_-36px_rgba(15,23,42,0.34)] hover:-translate-y-0.5"
            : "border-[#c6e8f7] shadow-[0_18px_42px_-36px_rgba(15,23,42,0.3)] hover:-translate-y-0.5",
      )}
    >
      {isSignature ? (
        <span className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-[#8bddff] bg-[linear-gradient(135deg,#063e62_0%,#087cbc_55%,#00a9ff_100%)] px-5 py-2 text-[10px] font-extrabold uppercase leading-none tracking-[0.11em] text-white shadow-[0_0_0_3px_rgba(125,211,252,0.16),0_12px_26px_-13px_rgba(0,77,119,0.9)]">
          Most Popular
        </span>
      ) : null}

      <div className={cn("relative z-[1] flex min-h-0 flex-1 flex-col", isSignature && "pt-2")}>
        {!isSignature ? (
          <p className={cn("text-[10px] font-extrabold uppercase tracking-[0.18em]", tone.label)}>
            {plan.badge}
          </p>
        ) : null}

        <div className={cn("flex items-center gap-3", isSignature ? "mt-2" : "mt-3")}>
          <PricingBrandMark
            tone={tone.markTone}
            className="h-11 w-11 rounded-[13px] [&_img]:w-6"
          />
          <h3 className={cn("min-w-0 flex-1 text-left text-[24px] font-extrabold leading-tight tracking-[-0.025em] sm:text-[25px]", isSignature ? "text-white" : "text-[#111821]")}>
            {plan.name}
          </h3>
        </div>

        <p className={cn("mt-3 min-h-[44px] max-w-[36ch] text-[13px] font-medium leading-[1.55] sm:text-[14px]", isSignature ? "text-white/82" : "text-[#64748B]")}>
          {presentation.description}
        </p>

        <div className={cn("mt-4 rounded-[15px] border p-4 sm:p-[18px]", isSignature ? "border-white/55 bg-white" : "border-[#d8e8f1] bg-[linear-gradient(145deg,#ffffff_0%,#f7fbfe_100%)]")}>
          <p className="text-[9px] font-extrabold uppercase tracking-[0.1em] text-[#087cbc] sm:text-[10px]">
            One-time design &amp; development
          </p>
          <div className="mt-2.5 flex items-center gap-1.5 text-[#7b8797]">
            <span className="text-[8px] font-extrabold uppercase tracking-[0.08em]">Regular</span>
            <span className="relative text-[15px] font-extrabold leading-none tabular-nums after:absolute after:left-[-2px] after:right-[-2px] after:top-1/2 after:h-[1.5px] after:-rotate-[5deg] after:bg-[#d5a22f] after:content-['']">{formatCurrency(presentation.setupRegular)}</span>
          </div>
          <div className="mt-2 flex flex-wrap items-end gap-2.5">
            <span className="text-[37px] font-extrabold leading-none tracking-[-0.045em] text-[#111821] tabular-nums sm:text-[41px]">{formatCurrency(plan.setupAmount)}</span>
            <span className="mb-0.5 rounded-full border border-[#bde7fb] bg-[#eef9ff] px-1.5 py-0.5 text-[8px] font-extrabold uppercase tracking-[0.05em] text-[#087cbc]">+ GST</span>
          </div>
          <p className="mt-3 text-[10px] font-semibold leading-relaxed text-[#718096] sm:text-[11px]">Charged once for complete OneLink setup.</p>
        </div>

        <div className="mt-4">
          <p className={cn("text-[12px] font-extrabold uppercase tracking-[0.12em]", isSignature ? "text-white" : "text-[#334155]")}>
            Choose Platform Care
          </p>
          <p className={cn("mt-1 text-[10px] font-semibold leading-relaxed", isSignature ? "text-white/68" : "text-[#718096]")}>
            Hosting, support &amp; updates included.
          </p>
          <div className="mt-3 grid w-full min-w-0 grid-cols-3 gap-2 sm:gap-2.5">
            {primaryCareRows.map((row) => {
              const option = plan.maintenanceOptions.find((item) => item.id === row.id);
              const isSelected = selectedCare === row.id;

              return (
                <button
                  type="button"
                  key={row.id}
                  onClick={() => setSelectedCare(row.id)}
                  aria-pressed={selectedCare === row.id}
                  className={cn(
                    "relative flex min-h-[80px] min-w-0 flex-col items-center justify-center rounded-[11px] border px-1.5 py-2.5 text-center transition duration-200 sm:min-h-[84px]",
                    isSelected
                      ? isSignature
                        ? "border-white bg-white text-[#111821] shadow-[0_10px_24px_-16px_rgba(3,61,96,0.55)] ring-1 ring-white/35"
                        : "border-[#00A9FF] bg-[#fafdff] text-[#111821] shadow-[0_10px_24px_-18px_rgba(0,126,191,0.5)] ring-1 ring-[#00A9FF]/15"
                      : isSignature
                        ? "border-white/20 bg-white/[0.07] text-white"
                        : "border-[#dce8ef] bg-white text-[#334155]",
                  )}
                >
                  <span className={cn("text-[10px] font-extrabold uppercase leading-none tracking-[0.05em] sm:text-[11px]", isSelected ? "text-[#111821]" : isSignature ? "text-white/88" : "text-[#334155]")}>
                    {row.label}
                  </span>
                  <span className={cn("relative mt-1.5 text-[12.5px] font-bold leading-none tabular-nums after:absolute after:left-[-1px] after:right-[-1px] after:top-1/2 after:h-px after:-rotate-[5deg] after:content-['']", isSelected ? "text-[#7f8ea1] after:bg-[#d5a22f]" : isSignature ? "text-white/68 after:bg-[#f4cf6a]" : "text-[#7f8ea1] after:bg-[#d5a22f]")}>
                    {formatCurrency(presentation.careRegular[row.id] ?? 0)}
                  </span>
                  <span className={cn("mt-1.5 text-[17px] font-extrabold leading-none tracking-[-0.025em] tabular-nums sm:text-[18px]", isSelected ? "text-[#087cbc]" : isSignature ? "text-white" : "text-[#1f2d3d]")}>
                    {formatCurrency(option?.price ?? 0)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className={cn("mt-4 flex min-h-0 flex-1 flex-col rounded-[15px] border p-4", tone.featureWrap)}>
          <p className={cn("text-[10px] font-extrabold uppercase tracking-[0.13em]", isSignature ? "text-[#087cbc]" : "text-[#526173]")}>
            What&apos;s included
          </p>
          <div className="mt-2 divide-y divide-[#e4edf3]">
            {presentation.features.map((feature) => (
              <div key={feature} className="flex items-start gap-2.5 px-0.5 py-2.5 text-[12.5px] font-semibold leading-snug tracking-[-0.01em] text-[#354559] sm:text-[13px]">
                <span className={cn("mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full", tone.icon)}>
                  <Icon name="check" className="h-3 w-3" />
                </span>
                {feature}
              </div>
            ))}
          </div>
        </div>

        <BuyButton
          planId={plan.id}
          maintenanceId={selectedCare}
          label={plan.ctaLabel}
          className={cn("mt-4 h-12 w-full rounded-[11px] text-[14px] font-extrabold transition-all active:scale-[0.98]", tone.button)}
        />
        {isSignature ? (
          <Link
            href="/portfolio"
            className="group mt-2 inline-flex h-10 w-full items-center justify-center gap-2 rounded-[11px] border border-white/70 bg-white text-[12px] font-extrabold text-[#087cbc] transition hover:bg-[#f3faff]"
          >
            View OneLink in Action
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3.5 8h9" />
              <path d="M8.5 3l4.5 5-4.5 5" />
            </svg>
          </Link>
        ) : null}
      </div>
    </article>
  );
}

function PricingPackageBuilder() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<TopPlanId>("signature");
  const [selectedCareId, setSelectedCareId] = useState("12-month");
  const [includeGst, setIncludeGst] = useState(false);
  const plans = pricingPlans.filter((plan): plan is Plan & { id: TopPlanId } =>
    ["essential", "signature", "elite"].includes(plan.id),
  );
  const selectedPlan = plans.find((plan) => plan.id === selectedPlanId) ?? plans[1];
  const selectedCare = selectedPlan?.maintenanceOptions.find((option) => option.id === selectedCareId)
    ?? selectedPlan?.maintenanceOptions[0];
  const setupAmount = selectedPlan?.setupAmount ?? 0;
  const careAmount = selectedCare?.price ?? 0;
  const subtotal = setupAmount + careAmount;
  const gst = Math.round(subtotal * 0.18);
  const total = includeGst ? subtotal + gst : subtotal;
  const getStartedHref = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent([
    "Hello OneLink, I want to build my OneLink package.",
    `Plan: ${selectedPlan?.name ?? "Signature"}`,
    `Platform Care: ${selectedCare?.label ?? "12 Months"}`,
    `Setup: ${formatCurrency(setupAmount)}`,
    `Platform Care: ${formatCurrency(careAmount)}`,
    `GST preference: ${includeGst ? "With GST" : "Without GST"}`,
    `Estimated Total: ${formatCurrency(total)}${includeGst ? " (including GST)" : " (GST excluded)"}`,
  ].filter(Boolean).join("\n"))}`;

  return (
    <div className="mx-auto mt-8 max-w-6xl sm:mt-9">
      <div className="text-center">
        <p className="text-[12px] font-semibold text-[#64748b] sm:text-[13px]">Need exact pricing?</p>
        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          aria-expanded={isOpen}
          aria-controls="pricing-package-builder"
          className="mt-2 inline-flex min-h-[52px] items-center justify-center gap-2 rounded-[13px] border border-[#087cbc] bg-[linear-gradient(135deg,#087cbc_0%,#00a9ff_100%)] px-6 text-[14px] font-extrabold text-white shadow-[0_18px_34px_-22px_rgba(0,126,191,0.72)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_38px_-22px_rgba(0,126,191,0.82)] sm:px-7 sm:text-[15px]"
        >
          Build Your OneLink Package
          <svg className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m4 6 4 4 4-4" />
          </svg>
        </button>
      </div>

      {isOpen ? (
        <div id="pricing-package-builder" className="mt-5 overflow-hidden rounded-[22px] border border-[#a9dcf3] bg-white shadow-[0_28px_64px_-40px_rgba(0,90,140,0.5)]">
          <div className="grid gap-0 lg:grid-cols-[1fr_1fr_1.12fr]">
            <div className="border-b border-[#e3edf3] p-5 sm:p-7 lg:border-b-0 lg:border-r">
              <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#087cbc]">Step 1</p>
              <h3 className="mt-1.5 text-[19px] font-extrabold tracking-[-0.025em] text-[#111821]">Choose Plan</h3>
              <div className="mt-4 grid grid-cols-1 gap-2.5">
                {plans.map((plan) => {
                  const isSelected = selectedPlanId === plan.id;
                  return (
                    <button
                      key={plan.id}
                      type="button"
                      onClick={() => setSelectedPlanId(plan.id)}
                      aria-pressed={isSelected}
                      className={cn(
                        "flex min-h-[56px] items-center justify-between rounded-[12px] border px-3.5 text-left transition",
                        isSelected
                          ? "border-[#00A9FF] bg-[#eef9ff] text-[#087cbc] shadow-[0_10px_22px_-16px_rgba(0,126,191,0.65)] ring-2 ring-[#00A9FF]/18"
                          : "border-[#dce8ef] bg-white text-[#526173] hover:border-[#9ddcf8]",
                      )}
                    >
                      <span className="text-[13px] font-extrabold">{plan.name}</span>
                      <span className={cn("text-right text-[10px] font-bold leading-tight", isSelected ? "text-[#087cbc]" : "text-[#718096]")}>
                        Setup<br /><span className="text-[13px] tabular-nums">{formatCurrency(plan.setupAmount)}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border-b border-[#e3edf3] p-5 sm:p-7 lg:border-b-0 lg:border-r">
              <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#087cbc]">Step 2</p>
              <h3 className="mt-1.5 text-[19px] font-extrabold tracking-[-0.025em] text-[#111821]">Choose Platform Care</h3>
              <div className="mt-4 grid grid-cols-1 gap-2.5">
                {primaryCareRows.map((row) => {
                  const option = selectedPlan?.maintenanceOptions.find((item) => item.id === row.id);
                  const isSelected = selectedCareId === row.id;
                  return (
                    <button
                      key={row.id}
                      type="button"
                      onClick={() => setSelectedCareId(row.id)}
                      aria-pressed={isSelected}
                      className={cn(
                        "flex min-h-[56px] items-center justify-between gap-3 rounded-[12px] border px-3.5 text-left transition",
                        isSelected
                          ? "border-[#00A9FF] bg-[#eef9ff] text-[#087cbc] shadow-[0_10px_22px_-16px_rgba(0,126,191,0.65)] ring-2 ring-[#00A9FF]/18"
                          : "border-[#dce8ef] bg-white text-[#526173] hover:border-[#9ddcf8]",
                      )}
                    >
                      <span className="text-[12px] font-extrabold uppercase tracking-[0.035em]">{row.label}</span>
                      <span className="text-[15px] font-extrabold tabular-nums">{formatCurrency(option?.price ?? 0)}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-[linear-gradient(145deg,#f8fcff_0%,#eaf7ff_100%)] p-5 sm:p-7">
              <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#087cbc]">Step 3</p>
              <div className="mt-1.5 flex items-center justify-between gap-3">
                <h3 className="text-[19px] font-extrabold tracking-[-0.025em] text-[#111821]">See Final Total</h3>
                <span className="rounded-full bg-[#087cbc] px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.08em] text-white">{selectedPlan?.name}</span>
              </div>
              <div className="mt-4 grid grid-cols-2 rounded-[11px] border border-[#bcddeb] bg-white p-1 shadow-[0_8px_18px_-16px_rgba(0,90,140,0.5)]">
                {[false, true].map((value) => (
                  <button
                    key={String(value)}
                    type="button"
                    onClick={() => setIncludeGst(value)}
                    aria-pressed={includeGst === value}
                    className={cn(
                      "min-h-9 rounded-[8px] px-2 text-[10px] font-extrabold transition sm:text-[11px]",
                      includeGst === value ? "bg-[#087cbc] text-white shadow-sm ring-1 ring-[#087cbc]" : "text-[#607286] hover:bg-[#f3f9fc]",
                    )}
                  >
                    {value ? "With GST" : "Without GST"}
                  </button>
                ))}
              </div>
              <dl className="mt-4 space-y-2 text-[12px] font-semibold text-[#526173] sm:text-[13px]">
                <div className="flex items-center justify-between gap-4"><dt>Setup</dt><dd className="font-bold tabular-nums text-[#263446]">{formatCurrency(setupAmount)}</dd></div>
                <div className="flex items-center justify-between gap-4"><dt>{selectedCare?.label} Platform Care</dt><dd className="font-bold tabular-nums text-[#263446]">{formatCurrency(careAmount)}</dd></div>
                <div className="flex items-center justify-between gap-4 border-t border-[#cfdfE9] pt-2"><dt>Subtotal</dt><dd className="font-bold tabular-nums text-[#263446]">{formatCurrency(subtotal)}</dd></div>
                {includeGst ? <div className="flex items-center justify-between gap-4"><dt>GST (18%)</dt><dd className="font-bold tabular-nums text-[#263446]">{formatCurrency(gst)}</dd></div> : null}
              </dl>
              <div className="mt-4 flex items-end justify-between gap-3 border-t border-[#bcdceb] pt-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.07em] text-[#526173]">Total Payable</p>
                <p className="text-[25px] font-extrabold leading-none tracking-[-0.04em] text-[#087cbc] tabular-nums">{formatCurrency(total)}</p>
              </div>
              <a href={getStartedHref} className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-[11px] bg-[#061a30] px-4 text-[14px] font-extrabold text-white shadow-[0_14px_28px_-18px_rgba(2,15,29,0.7)] transition hover:-translate-y-0.5 hover:bg-[#020e1a]">
                Get Started — {formatCurrency(total)}
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function PricingTermsNotice({ className }: { className?: string }) {
  return (
    <div className={cn("mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 rounded-[18px] border border-[#00A9FF]/14 bg-white/82 px-5 py-4 text-center shadow-[0_16px_36px_-30px_rgba(15,23,42,0.32)] sm:flex-row sm:text-left", className)}>
      <p className="text-[13px] font-semibold leading-6 text-[#526173] sm:text-[14px]">
        Setup is charged once. Platform Care renews based on your selected plan. GST Extra.{" "}
        <Link href="/terms" className="font-bold text-[#087cbc] underline decoration-[#00A9FF]/45 underline-offset-4 hover:text-[#005f91]">
          Terms &amp; Conditions apply.
        </Link>
      </p>
      <Link href="/terms" className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-[11px] border border-[#00A9FF]/24 bg-[#edf8ff] px-4 text-[13px] font-bold text-[#087cbc] transition hover:-translate-y-0.5 hover:border-[#00A9FF]/45 hover:bg-white">
        View Terms &amp; Conditions
      </Link>
    </div>
  );
}

function EnterprisePanel({ href, plan }: { href: string; plan: Plan }) {
  return (
    <div className="border-shine border-shine-blue relative mx-auto mt-12 w-full max-w-[calc(100vw-40px)] overflow-hidden rounded-[22px] border border-[#38bdf8]/55 bg-[linear-gradient(135deg,#031525_0%,#064c75_55%,#087cbc_100%)] p-5 text-white shadow-[0_34px_82px_-44px_rgba(0,126,191,0.68)] sm:max-w-7xl sm:p-7 lg:mt-14 lg:p-8">
      <div className="pointer-events-none absolute -right-14 -top-20 h-72 w-72 rounded-full bg-[#00A9FF]/28 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 left-1/3 h-56 w-72 rounded-full bg-[#38bdf8]/10 blur-3xl" />
      <Image src="/Group%201000008683.png" alt="" width={900} height={210} className="pointer-events-none absolute -bottom-10 -right-24 w-[48%] rotate-[-7deg] opacity-[0.022] brightness-0 invert" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,#6bcfff,transparent)] opacity-55" />
      <div className="relative grid gap-7 lg:grid-cols-[220px_minmax(0,1fr)_290px] lg:items-center lg:gap-9">
        <div className="lg:order-2">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#7dd3fc]/25 bg-white/[0.08] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.11em] text-[#b9e7ff]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#55c5ff] shadow-[0_0_10px_rgba(85,197,255,0.9)]" />
            Built for scale
          </span>
          <div className="mt-4 flex items-center gap-3.5">
            <PricingBrandMark
              tone="essential"
              className="h-11 w-11 rounded-[13px] border-white/20 [&_img]:w-6"
            />
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#9bddff]">OneLink Enterprise</p>
              <h3 className="font-display mt-1 text-[1.55rem] font-bold leading-[1.12] tracking-[-0.04em] text-white sm:text-[1.85rem]">One brand. Every location connected.</h3>
            </div>
          </div>
          <p className="mt-3 max-w-2xl text-[14px] font-normal leading-[1.65] text-white/68 sm:text-[15px]">
            For chains, franchises and multi-location brands that need central control with branch-level customer journeys.
          </p>
          <div className="mt-5 grid grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
            {enterpriseHighlights.slice(0, 4).map((highlight) => (
              <span key={highlight} className="inline-flex items-center gap-2 text-[11px] font-semibold text-white/78">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#55c5ff]/14 text-[#8bdcff]"><Icon name="check" className="h-3 w-3" /></span>
                {highlight}
              </span>
            ))}
          </div>
        </div>

        <div className="relative mx-auto flex h-[260px] w-full max-w-[230px] items-end justify-center self-end lg:order-1 lg:h-[310px]">
          <div className="pointer-events-none absolute bottom-3 h-28 w-48 rounded-full bg-[#00A9FF]/12 blur-3xl" />
          <Image
            src="/enterprise-showcase.png"
            alt="Two customized OneLink enterprise mobile experiences"
            width={1284}
            height={1800}
            quality={92}
            sizes="(min-width: 1024px) 240px, 220px"
            className="relative h-full w-auto object-contain object-bottom drop-shadow-[0_24px_28px_rgba(0,0,0,0.28)]"
          />
        </div>

        <div className="rounded-[18px] border border-white/70 bg-white p-5 text-[#111821] shadow-[0_22px_48px_-28px_rgba(0,0,0,0.55)] sm:p-6 lg:order-3">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.13em] text-[#087cbc]">Custom enterprise setup</p>
          <p className="mt-2.5 text-[11px] font-bold uppercase tracking-[0.09em] text-[#718096]">Starting from</p>
          <div className="mt-1.5 flex items-center gap-2.5">
            <p className="font-display text-[2rem] font-bold leading-none tracking-[-0.04em] text-[#111821] tabular-nums sm:text-[2.2rem]">
              {formatPricingCurrency(plan.setupAmount)}
            </p>
            <span className="rounded-full bg-[#edf8ff] px-2 py-1 text-[9px] font-extrabold uppercase tracking-[0.06em] text-[#087cbc]">+ GST</span>
          </div>
          <p className="mt-3 text-[12px] font-medium leading-relaxed text-[#64748b]">Custom scope, integrations and rollout planning built around your business.</p>
          <a href={href} className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-[12px] bg-[#087cbc] px-4 text-[15px] font-bold text-white shadow-[0_14px_28px_-15px_rgba(0,126,191,0.58)] transition hover:-translate-y-0.5 hover:bg-[#006fa8]">
            Contact Sales
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3.5 8h9" /><path d="M8.5 3l4.5 5-4.5 5" /></svg>
          </a>
        </div>
      </div>
    </div>
  );
}

function getPlanTone(plan: Plan) {
  if (plan.id === "signature") {
    return {
      markTone: "signature" as const,
      wash: "bg-[linear-gradient(180deg,rgba(0,169,255,0.11),rgba(255,255,255,0))]",
      badge: "border-[#bae6fd] bg-[#eff9ff] text-[#0369A1]",
      label: "text-[#9b6d14]",
      gstPill: "border-[#ead8b0] bg-[#fff8ea] text-[#9b6d14]",
      selectorWrap: "border-[#eee1c2] bg-[linear-gradient(180deg,#fffaf2_0%,#fbf4e7_100%)]",
      selectorActive: "border-white/70 bg-white shadow-[0_8px_24px_-10px_rgba(3,61,96,0.42)] ring-2 ring-white/25",
      saveBadge: "border-emerald-200/90 bg-emerald-50 text-emerald-800",
      value: "text-[#087cbc]",
      icon: "bg-[#e7f6ff] text-[#087cbc]",
      featureWrap: "border-white/40 bg-white/[0.97] shadow-[0_18px_42px_-32px_rgba(3,61,96,0.5)]",
      button: "border border-white/20 bg-[#04182f] text-white hover:bg-[#020f1d] shadow-[0_16px_34px_-14px_rgba(2,15,29,0.62)]",
    };
  }

  if (plan.id === "elite") {
    return {
      markTone: "essential" as const,
      wash: "bg-[linear-gradient(180deg,rgba(0,169,255,0.05),rgba(255,255,255,0))]",
      badge: "border-[#dbeafe] bg-[#f7fbff] text-[#0369A1]",
      label: "text-[#0369A1]",
      gstPill: "border-[#dbeafe] bg-[#f7fbff] text-[#0369A1]",
      selectorWrap: "border-[#E3EDF6] bg-[linear-gradient(180deg,#f7fafc_0%,#f4f8fb_100%)]",
      selectorActive: "border-transparent bg-white [background:linear-gradient(#fff,#fff)_padding-box,linear-gradient(135deg,#00A9FF,#087cbc)_border-box] shadow-[0_8px_22px_-10px_rgba(0,169,255,0.5)] ring-2 ring-[#00A9FF]/20",
      saveBadge: "border-emerald-200/90 bg-emerald-50 text-emerald-800",
      value: "text-[#0369A1]",
      icon: "bg-[#00A9FF]/10 text-[#00A9FF]",
      featureWrap: "border-[#eff4f8] bg-[linear-gradient(180deg,#fcfeff_0%,#f8fbfe_100%)]",
      button: "bg-[#111821] text-white hover:bg-black shadow-sm",
    };
  }

  return {
    markTone: "business" as const,
    wash: "bg-[linear-gradient(180deg,rgba(136,151,168,0.14),rgba(255,255,255,0))]",
    badge: "border-[#e5edf4] bg-slate-50 text-[#475569]",
    label: "text-[#5c6774]",
    gstPill: "border-[#d7e0e8] bg-[#f6f8fb] text-[#5c6774]",
    selectorWrap: "border-[#dde5eb] bg-[linear-gradient(180deg,#fafbfd_0%,#f2f5f8_100%)]",
    selectorActive: "border-transparent bg-white [background:linear-gradient(#fff,#fff)_padding-box,linear-gradient(135deg,#00A9FF,#087cbc)_border-box] shadow-[0_8px_22px_-10px_rgba(0,169,255,0.5)] ring-2 ring-[#00A9FF]/20",
    saveBadge: "border-emerald-200/90 bg-emerald-50 text-emerald-800",
    value: "text-[#087cbc]",
    icon: "bg-[#eef2f5] text-[#5c6774]",
    featureWrap: "border-[#e8edf2] bg-[linear-gradient(180deg,#fcfdff_0%,#f6f8fa_100%)]",
    button: "bg-[#111821] text-white hover:bg-black shadow-sm",
  };
}
