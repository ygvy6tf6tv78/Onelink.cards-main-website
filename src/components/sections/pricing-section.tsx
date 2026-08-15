"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
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

const chandigarhSetupOffers: Record<TopPlanId, Record<string, number>> = {
  essential: { "3-month": 3000, "6-month": 3500, "12-month": 2000 },
  signature: { "3-month": 4500, "6-month": 3000, "12-month": 1000 },
  elite: { "3-month": 9000, "6-month": 9000, "12-month": 7000 },
};

type PricingSectionProps = {
  staticReveal?: boolean;
  showLaunchOffer?: boolean;
  dedicatedPage?: boolean;
};

export function PricingSection({
  staticReveal = false,
  showLaunchOffer = true,
  dedicatedPage = false,
}: PricingSectionProps) {
  const topPlans = pricingPlans.filter((plan) => plan.id !== "enterprise");
  const enterprisePlan = pricingPlans.find((plan) => plan.id === "enterprise");
  const enterpriseHref = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent("Hello OneLink, I want to discuss an Enterprise setup.")}`;
  return (
    <section
      id="pricing"
      className={cn(
        "relative scroll-mt-28 overflow-hidden bg-[radial-gradient(circle_at_50%_32%,rgba(0,119,255,0.14),transparent_34%),linear-gradient(180deg,#fbfdff_0%,#edf5ff_54%,#f8fbfd_100%)] px-5 sm:px-6 lg:px-8",
        dedicatedPage ? "py-9 sm:py-11 lg:py-12" : "py-12 sm:py-14 lg:py-16",
      )}
    >
      <div className="pointer-events-none absolute -left-24 top-[26%] h-72 w-72 rounded-full bg-[#00A9FF]/[0.055] blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -right-28 top-[52%] h-80 w-80 rounded-full bg-[#087cbc]/[0.05] blur-3xl" aria-hidden />
      <div className="relative mx-auto max-w-7xl">
        <div className={cn("mx-auto max-w-3xl text-center", dedicatedPage ? "mb-8 sm:mb-10" : "mb-10 sm:mb-12")}>
          <Reveal x={-28} y={14} alwaysShow={staticReveal}>
            <SectionBadge label="Pricing" className="-mt-2" />
            <h2 className="section-title-gradient font-display mt-4 text-[32px] font-bold leading-[1.08] tracking-[-0.045em] sm:text-[36px] lg:text-[42px]">
              Choose the Right OneLink
            </h2>
            <p className="mt-3 text-[17px] font-semibold leading-relaxed tracking-[-0.015em] text-[#526173] sm:text-[19px]">
              Pay once for setup. Choose the care period that fits your business.
            </p>
            {showLaunchOffer ? (
              <div className="border-shine offer-shine-thin relative mx-auto mt-4 flex w-fit max-w-full items-center gap-2 overflow-hidden rounded-full border border-[#d9ad42]/45 bg-[linear-gradient(135deg,#0b2745_0%,#064083_58%,#0869c5_100%)] px-3 py-1.5 text-left text-white shadow-[0_12px_26px_-20px_rgba(4,56,125,0.62)] sm:px-4 sm:py-2">
                <span className="grid h-5 w-5 shrink-0 place-items-center text-[#ffd76a] drop-shadow-[0_2px_6px_rgba(255,215,106,0.38)]">
                  <Icon name="spark" className="h-[15px] w-[15px]" />
                </span>
                <p className="text-[9px] font-extrabold leading-tight tracking-[0.015em] sm:text-[11px]">
                  Chandigarh Launch Offer <span className="text-[#ffdf82]">— Get 10% Off Your OneLink</span>
                </p>
              </div>
            ) : null}
            {dedicatedPage ? (
              <>
                <div className="mx-auto mt-5 grid max-w-[760px] grid-cols-3 overflow-hidden rounded-[16px] border border-[#cfe1f2] bg-white/88 p-1.5 text-left shadow-[0_18px_40px_-32px_rgba(9,34,62,0.38)]">
                  {[
                    ["1", "Choose plan"],
                    ["2", "Select care"],
                    ["3", "See final total"],
                  ].map(([step, label], index) => (
                    <div key={step} className={cn("flex min-w-0 flex-col items-center justify-center gap-1 px-1.5 py-2.5 sm:flex-row sm:gap-3 sm:px-4", index > 0 && "border-l border-[#e2ebf3]")}>
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#edf7ff] text-[10px] font-extrabold text-[#087cbc] sm:h-7 sm:w-7 sm:text-[11px]">{step}</span>
                      <span className="text-center text-[9px] font-extrabold uppercase leading-tight tracking-[0.035em] text-[#334155] sm:text-left sm:text-[12px]">{label}</span>
                    </div>
                  ))}
                </div>
                <ChandigarhOfferButton plans={topPlans} />
              </>
            ) : null}
          </Reveal>
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="relative mx-auto grid w-full max-w-[42rem] grid-cols-1 items-stretch gap-6 lg:max-w-none lg:grid-cols-3 lg:items-stretch lg:gap-7">
          {topPlans.map((plan, index) => {
            const isSignature = plan.id === "signature";
            return (
              <Reveal key={plan.id} delay={index * 0.05} x={index === 0 ? -30 : index === 2 ? 30 : 0} y={18} alwaysShow={staticReveal} className={cn("flex h-full transition-transform", isSignature ? "lg:z-10" : "lg:pt-7")}>
                <PricingCard plan={plan} isSignature={isSignature} dedicatedPage={dedicatedPage} />
              </Reveal>
            );
          })}
          </div>
        </div>

        <Reveal delay={0.14} y={14} alwaysShow={staticReveal}>
          <PricingPackageBuilder />
        </Reveal>

        {enterprisePlan ? (
          <>
            <Reveal delay={0.16} x={28} y={14} alwaysShow={staticReveal}>
              <EnterprisePanel href={enterpriseHref} plan={enterprisePlan} />
            </Reveal>
            <Reveal delay={0.2} y={12} alwaysShow={staticReveal}>
              <PricingTermsNotice className="mt-5" />
            </Reveal>
          </>
        ) : null}

      </div>
    </section>
  );
}

function ChandigarhOfferButton({ plans }: { plans: Plan[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<TopPlanId>("signature");
  const [selectedCareId, setSelectedCareId] = useState("12-month");
  const selectedPlan = plans.find((plan) => plan.id === selectedPlanId) ?? plans[1];
  const selectedCare = selectedPlan?.maintenanceOptions.find((option) => option.id === selectedCareId);
  const setupOffer = chandigarhSetupOffers[selectedPlanId][selectedCareId] ?? 0;
  const careAmount = selectedCare?.price ?? 0;
  const finalTotal = setupOffer + careAmount;
  const setupDiscount = (selectedPlan?.setupAmount ?? 0) - setupOffer;
  const claimHref = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent([
    "Hello OneLink, I want to claim the Chandigarh Launch Week setup offer.",
    `Plan: ${selectedPlan?.name ?? "Signature"}`,
    `Platform Care: ${selectedCare?.label ?? "12 Months"}`,
    `Setup Offer: ${formatCurrency(setupOffer)}`,
    `Platform Care: ${formatCurrency(careAmount)}`,
    `Setup Discount: ${formatCurrency(setupDiscount)}`,
    `Total: ${formatCurrency(finalTotal)} + GST`,
  ].join("\n"))}`;

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="border-shine offer-shine-thin group relative mx-auto mt-4 flex w-full max-w-[760px] items-center justify-between gap-3 overflow-hidden rounded-[15px] border border-[#d9b75a]/55 bg-[linear-gradient(110deg,#081c31_0%,#0a2d50_58%,#0c4778_100%)] px-3.5 py-3 text-left text-white shadow-[0_16px_34px_-24px_rgba(7,42,78,0.72)] transition duration-300 hover:-translate-y-0.5 hover:border-[#e4c66d]/80 hover:shadow-[0_20px_38px_-24px_rgba(7,42,78,0.8)] sm:px-4 sm:py-3.5"
      >
        <span className="flex min-w-0 items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[11px] border border-[#d9b75a]/35 bg-[#d9b75a]/10">
            <span
              className="h-6 w-[18px] bg-[linear-gradient(180deg,#ffe8a2_0%,#d2a63f_100%)]"
              style={{
                WebkitMaskImage: "url(/onelink-logomark.png)",
                WebkitMaskPosition: "center",
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskSize: "contain",
                maskImage: "url(/onelink-logomark.png)",
                maskPosition: "center",
                maskRepeat: "no-repeat",
                maskSize: "contain",
              }}
              aria-hidden
            />
          </span>
          <span className="min-w-0">
            <span className="block text-[9px] font-extrabold uppercase tracking-[0.12em] text-[#e4c66d] sm:text-[10px]">Chandigarh Launch Week</span>
            <span className="mt-0.5 block text-[12px] font-bold tracking-[-0.01em] text-white sm:text-[14px]">View 24-Hour Setup Offer</span>
          </span>
        </span>
        <span className="relative flex shrink-0 items-center gap-2">
          <span className="rounded-full border border-[#d9b75a]/35 bg-[#d9b75a]/10 px-2.5 py-1.5 text-[8px] font-extrabold uppercase tracking-[0.07em] text-[#eed88f] sm:px-3 sm:text-[9px]">24H Offer</span>
          <span className="hidden text-base text-[#eed88f] transition-transform group-hover:translate-x-0.5 sm:block">→</span>
        </span>
      </button>

      {isOpen && typeof document !== "undefined" ? createPortal(
        <div
          className="fixed inset-0 z-[360] flex items-center justify-center bg-[#06182b]/64 p-3 backdrop-blur-md sm:p-6"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setIsOpen(false);
          }}
        >
          <div role="dialog" aria-modal="true" aria-labelledby="chandigarh-offer-title" className="relative flex max-h-[96dvh] w-[94vw] max-w-[1440px] flex-col overflow-hidden rounded-[26px] border border-white/70 bg-[#f8fbff] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.76)]">
            <div className="flex items-start justify-between gap-4 border-b border-[#dbe7f0] bg-[linear-gradient(135deg,#09223E_0%,#064083_58%,#0077FF_100%)] px-5 py-5 text-left text-white sm:px-8 sm:py-5 lg:px-9">
              <div className="min-w-0">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#ffdf82] sm:text-[11px]">Chandigarh Launch Week</p>
                <h3 id="chandigarh-offer-title" className="mt-1.5 text-[25px] font-extrabold leading-tight tracking-[-0.035em] sm:text-[30px] lg:text-[32px]">24 Hour Setup Offer</h3>
                <p className="mt-1.5 max-w-4xl text-[12px] font-semibold leading-relaxed text-white/76 sm:text-[13px] lg:text-[14px]">Your Platform Care stays unchanged. Confirm within 24 hours and unlock a special discount on your One-Time Setup.</p>
              </div>
              <button type="button" onClick={() => setIsOpen(false)} aria-label="Close Chandigarh offer" className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/25 bg-white/10 text-white transition hover:rotate-90 hover:bg-white/20 sm:h-12 sm:w-12">
                <Icon name="close" className="h-5 w-5" />
              </button>
            </div>

            <div className="overflow-y-auto px-4 py-4 text-left sm:px-8 sm:py-5 lg:px-9">
              <div className="grid grid-cols-3 rounded-[16px] border border-[#d5e3ee] bg-[#edf4f9] p-1.5 sm:p-2">
                {plans.map((plan) => {
                  const isSelected = plan.id === selectedPlanId;
                  return (
                    <button
                      key={plan.id}
                      type="button"
                      onClick={() => setSelectedPlanId(plan.id as TopPlanId)}
                      aria-pressed={isSelected}
                      className={cn(
                        "min-h-11 rounded-[12px] px-2 text-[11px] font-extrabold transition sm:min-h-12 sm:text-[14px] lg:text-[15px]",
                        isSelected
                          ? "bg-white text-[#064083] shadow-[0_8px_20px_-14px_rgba(9,34,62,0.55)] ring-1 ring-[#bed8ef]"
                          : "text-[#718096] hover:text-[#334155]",
                      )}
                    >
                      {plan.name}{plan.id === "signature" ? " ★" : ""}
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 flex items-end justify-between gap-4">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.13em] text-[#087cbc]">Selected plan</p>
                  <h4 className="mt-0.5 text-[24px] font-extrabold tracking-[-0.035em] text-[#111821] sm:text-[27px]">{selectedPlan?.name}{selectedPlanId === "signature" ? " ★" : ""}</h4>
                </div>
                <p className="hidden text-right text-[11px] font-bold text-[#718096] sm:block">Choose 3, 6 or 12 months<br />to compare your final price.</p>
              </div>

              <div className="mt-4 grid gap-4 xl:grid-cols-3">
                {primaryCareRows.map((row) => {
                  const rowSetup = chandigarhSetupOffers[selectedPlanId][row.id] ?? 0;
                  const rowCare = selectedPlan?.maintenanceOptions.find((option) => option.id === row.id)?.price ?? 0;
                  const rowTotal = rowSetup + rowCare;
                  const rowRegularTotal = (selectedPlan?.setupAmount ?? 0) + rowCare;
                  const rowSetupDiscount = (selectedPlan?.setupAmount ?? 0) - rowSetup;
                  const isSelected = selectedCareId === row.id;
                  const isBestValue = row.id === "12-month";
                  const isPopular = row.id === "6-month";
                  return (
                    <button
                      key={row.id}
                      type="button"
                      onClick={() => setSelectedCareId(row.id)}
                      aria-pressed={isSelected}
                      className={cn(
                        "relative flex min-h-[350px] w-full flex-col overflow-hidden rounded-[20px] border p-5 text-left transition xl:min-h-[360px]",
                        isSelected
                          ? "border-[#1686f4] bg-[radial-gradient(circle_at_100%_0%,rgba(0,119,255,0.13),transparent_34%),linear-gradient(160deg,#edf7ff_0%,#ffffff_70%)] shadow-[0_22px_48px_-25px_rgba(0,91,190,0.62)] ring-2 ring-[#1686f4]/15"
                          : "border-[#d7e4ed] bg-white hover:-translate-y-0.5 hover:border-[#a9cce8]",
                      )}
                    >
                      <div className="flex min-h-8 items-center justify-between gap-2">
                        <p className="text-[15px] font-extrabold uppercase tracking-[0.04em] text-[#263446] sm:text-[17px]">{row.label}</p>
                        {isBestValue || isPopular ? (
                          <span className={cn("rounded-full border px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.055em] shadow-sm", isBestValue ? "border-[#bfe4fb] bg-[#e9f7ff] text-[#087cbc]" : "border-[#d9dfff] bg-[#f1f3ff] text-[#3855a5]")}>
                            {isBestValue ? "Best Value" : "Most Popular"}
                          </span>
                        ) : null}
                      </div>

                      <div className="mt-3 rounded-[16px] border border-[#e2ebf2] bg-[#f4f8fb] px-4 py-3.5 sm:px-5">
                        <p className="text-[11px] font-extrabold uppercase tracking-[0.09em] text-[#526173]">One-Time Setup</p>
                        <div className="mt-2.5 grid grid-cols-[1fr_auto_1.15fr] items-end gap-2">
                          <span className="flex min-w-0 flex-col items-start gap-1.5">
                            <span className="rounded-full border border-[#f4caca] bg-[#fff0f0] px-2 py-1 text-[8px] font-extrabold uppercase tracking-[0.08em] text-[#a63d3d]">Before</span>
                            <span className="text-[18px] font-extrabold leading-none text-[#c34b4b] sm:text-[20px]">{formatPricingCurrency(selectedPlan?.setupAmount ?? 0)}</span>
                          </span>
                          <span className="pb-0.5 text-[18px] font-bold text-[#9aa7b5]">→</span>
                          <span className="flex min-w-0 flex-col items-start gap-1.5">
                            <span className="border-shine offer-shine-thin relative w-fit rounded-full border border-[#ddb647]/70 bg-[linear-gradient(135deg,#fff9df_0%,#ffe9a6_100%)] px-2.5 py-1 text-[8px] font-extrabold uppercase tracking-[0.08em] text-[#8b5b00] shadow-[0_5px_14px_-8px_rgba(169,112,0,0.8)]">24H Offer</span>
                            <span className="bg-[linear-gradient(135deg,#064083_0%,#0077FF_100%)] bg-clip-text text-[28px] font-extrabold leading-none tracking-[-0.04em] text-transparent drop-shadow-[0_5px_12px_rgba(0,119,255,0.14)] sm:text-[32px]">{formatPricingCurrency(rowSetup)}</span>
                          </span>
                        </div>
                        <p className="mt-2.5 w-fit rounded-full border border-[#cceac9] bg-[#eaf8e9] px-2.5 py-1 text-[10px] font-extrabold text-[#138808] sm:text-[11px]">You save {formatPricingCurrency(rowSetupDiscount)} on setup</p>
                      </div>

                      <div className="mt-3 border-t border-[#e4edf3] pt-3">
                        <p className="text-[10px] font-extrabold uppercase tracking-[0.07em] text-[#526173]">{row.label} Platform Care</p>
                        <p className="mt-1 text-[10px] font-semibold text-[#8795a5] sm:text-[11px]">Renews after every {row.label.toLowerCase()}</p>
                        <p className="mt-1.5 text-[23px] font-extrabold tracking-[-0.025em] text-[#263446] sm:text-[26px]">{formatPricingCurrency(rowCare)}</p>
                      </div>

                      <div className={cn("mt-auto rounded-[16px] border px-4 py-3 sm:px-5", isSelected ? "border-[#b9ddf7] bg-[#e5f4ff]" : "border-[#e1eaf1] bg-[#f3f7fa]")}>
                        <p className="text-[11px] font-extrabold uppercase tracking-[0.09em] text-[#526173]">Final Total</p>
                        <div className="mt-2 grid grid-cols-[1fr_auto_1.2fr] items-end gap-2">
                          <span className="flex flex-col items-start gap-1.5">
                            <span className="rounded-full border border-[#f4caca] bg-[#fff0f0] px-2 py-1 text-[8px] font-extrabold uppercase tracking-[0.08em] text-[#a63d3d]">Before</span>
                            <span className="text-[18px] font-extrabold leading-none text-[#c34b4b] sm:text-[20px]">{formatPricingCurrency(rowRegularTotal)}</span>
                          </span>
                          <span className="pb-0.5 text-[18px] font-bold text-[#9aa7b5]">→</span>
                          <span className="flex flex-col items-start gap-1.5">
                            <span className="border-shine offer-shine-thin relative w-fit rounded-full border border-[#ddb647]/70 bg-[linear-gradient(135deg,#fff9df_0%,#ffe9a6_100%)] px-2.5 py-1 text-[8px] font-extrabold uppercase tracking-[0.08em] text-[#8b5b00] shadow-[0_5px_14px_-8px_rgba(169,112,0,0.8)]">24H Offer</span>
                            <span className="flex items-end gap-1.5">
                              <span className="bg-[linear-gradient(135deg,#09223E_0%,#0077FF_100%)] bg-clip-text text-[29px] font-extrabold leading-none tracking-[-0.04em] text-transparent drop-shadow-[0_5px_12px_rgba(0,119,255,0.12)] sm:text-[34px]">{formatPricingCurrency(rowTotal)}</span>
                              <span className="pb-0.5 text-[8px] font-bold text-[#718096]">+ GST</span>
                            </span>
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

            </div>

            <div className="border-t border-[#cfe0ec] bg-white/96 px-4 py-4 shadow-[0_-14px_36px_-30px_rgba(9,34,62,0.55)] backdrop-blur-xl sm:px-8 sm:py-5 lg:px-10">
              <a href={claimHref} target="_blank" rel="noreferrer" className="border-shine border-shine-blue group relative mx-auto flex h-13 w-full max-w-[720px] items-center justify-center overflow-hidden rounded-[14px] border border-[#4db6ff]/70 bg-[linear-gradient(135deg,#09223E_0%,#064083_52%,#0077FF_100%)] px-5 text-[13px] font-extrabold text-white shadow-[0_16px_32px_-18px_rgba(0,65,150,0.82)] transition hover:-translate-y-0.5 hover:brightness-110 sm:h-14 sm:text-[16px]">
                Claim Within 24 Hours
              </a>
              <p className="mt-2.5 text-center text-[10px] font-bold text-[#718096] sm:text-[11px]">Your launch price is reserved for 24 hours after your demo.</p>
            </div>
          </div>
        </div>,
        document.body,
      ) : null}
    </>
  );
}

function PricingCard({ plan, isSignature, dedicatedPage = false }: { plan: Plan; isSignature?: boolean; dedicatedPage?: boolean }) {
  const isElite = plan.id === "elite";
  const tone = getPlanTone(plan);
  const [selectedCare, setSelectedCare] = useState("6-month");
  const presentation = pricingPresentation[plan.id as TopPlanId];

  if (!presentation) return null;

  return (
    <article
      className={cn(
        "group relative mx-auto flex h-full w-full max-w-[calc(100vw-40px)] min-w-0 flex-col overflow-hidden rounded-[24px] border bg-white p-4 transition-all duration-300 sm:max-w-none sm:p-5",
        isSignature
          ? "!overflow-visible border-[#368fff] bg-[linear-gradient(145deg,#09223E_0%,#064083_49%,#0077FF_100%)] shadow-[0_32px_72px_-34px_rgba(0,67,155,0.72)] lg:-translate-y-3"
          : isElite
            ? "border-[#b9d8f5] shadow-[0_24px_56px_-38px_rgba(9,34,62,0.42)] hover:-translate-y-0.5"
            : "border-[#c2dbf2] shadow-[0_24px_56px_-38px_rgba(9,34,62,0.38)] hover:-translate-y-0.5",
      )}
    >
      {isSignature ? (
        <span className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-[#76b6ff] bg-[linear-gradient(135deg,#09223E_0%,#064083_52%,#0077FF_100%)] px-5 py-2 text-[10px] font-extrabold uppercase leading-none tracking-[0.11em] text-white shadow-[0_0_0_3px_rgba(0,119,255,0.14),0_14px_28px_-13px_rgba(0,49,112,0.9)]">
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

        <div className={cn("mt-4 rounded-[17px] border p-4 shadow-[0_16px_34px_-30px_rgba(15,23,42,0.28)] sm:p-[18px]", isSignature ? "border-white/55 bg-white" : "border-[#d8e8f1] bg-[linear-gradient(145deg,#ffffff_0%,#f7fbfe_100%)]")}>
          <p className="text-[9px] font-extrabold uppercase tracking-[0.1em] text-[#087cbc] sm:text-[10px]">
            One-time design &amp; development
          </p>
          <div className="mt-2.5 flex items-center gap-2 text-[#66758a]">
            <span className="text-[9px] font-extrabold uppercase tracking-[0.09em]">Regular</span>
            <span className="relative text-[17px] font-black leading-none tabular-nums after:absolute after:left-[-3px] after:right-[-3px] after:top-1/2 after:h-0.5 after:-rotate-[4deg] after:rounded-full after:bg-[#d49721] after:content-[''] sm:text-[18px]">{formatPricingCurrency(presentation.setupRegular)}</span>
          </div>
          <div className="mt-2 flex flex-wrap items-end gap-2.5">
            <span className="text-[37px] font-extrabold leading-none tracking-[-0.045em] text-[#111821] tabular-nums sm:text-[41px]">{formatPricingCurrency(plan.setupAmount)}</span>
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
                    "relative flex min-w-0 flex-col items-center justify-center rounded-[13px] border px-1.5 text-center transition duration-200",
                    dedicatedPage ? "min-h-[76px] py-3 sm:min-h-[82px]" : "min-h-[72px] py-2.5 sm:min-h-[78px]",
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
                  <span className={cn("mt-2 text-[18px] font-extrabold leading-none tracking-[-0.025em] tabular-nums sm:text-[20px]", isSelected ? "text-[#087cbc]" : isSignature ? "text-white" : "text-[#1f2d3d]")}>
                    {formatPricingCurrency(option?.price ?? 0)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className={cn("mt-4 flex min-h-0 flex-1 flex-col rounded-[17px] border p-4", tone.featureWrap)}>
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
  const modalRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState<TopPlanId>("signature");
  const [selectedCareId, setSelectedCareId] = useState("12-month");
  const [includeGst, setIncludeGst] = useState(false);
  const [discountMode, setDiscountMode] = useState<"percentage" | "fixed">("percentage");
  const [discountInput, setDiscountInput] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const plans = pricingPlans.filter((plan): plan is Plan & { id: TopPlanId } =>
    ["essential", "signature", "elite"].includes(plan.id),
  );
  const selectedPlan = plans.find((plan) => plan.id === selectedPlanId) ?? plans[1];
  const selectedCare = selectedPlan?.maintenanceOptions.find((option) => option.id === selectedCareId)
    ?? selectedPlan?.maintenanceOptions[0];
  const setupAmount = selectedPlan?.setupAmount ?? 0;
  const careAmount = selectedCare?.price ?? 0;
  const subtotal = setupAmount + careAmount;
  const discountAmount = discountMode === "percentage"
    ? Math.round(subtotal * (Math.min(Math.max(appliedDiscount, 0), 100) / 100))
    : Math.min(Math.max(appliedDiscount, 0), subtotal);
  const discountedSubtotal = subtotal - discountAmount;
  const gst = Math.round(discountedSubtotal * 0.18);
  const total = includeGst ? discountedSubtotal + gst : discountedSubtotal;

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };
    document.body.style.overflow = "hidden";
    const resetFrame = window.requestAnimationFrame(() => modalRef.current?.scrollTo({ top: 0 }));
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(resetFrame);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const applyDiscount = () => {
    const parsed = Number(discountInput);
    setAppliedDiscount(Number.isFinite(parsed) ? Math.max(parsed, 0) : 0);
  };
  const getStartedHref = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent([
    "Hello OneLink, I want to build my OneLink package.",
    `Plan: ${selectedPlan?.name ?? "Signature"}`,
    `Platform Care: ${selectedCare?.label ?? "12 Months"}`,
    `Setup: ${formatCurrency(setupAmount)}`,
    `Platform Care: ${formatCurrency(careAmount)}`,
    discountAmount > 0 ? `Discount applied: -${formatCurrency(discountAmount)}` : null,
    `GST preference: ${includeGst ? "With GST" : "Without GST"}`,
    `Estimated Total: ${formatCurrency(total)}${includeGst ? " (including GST)" : " (GST excluded)"}`,
  ].filter(Boolean).join("\n"))}`;

  return (
    <div className="mx-auto mt-8 max-w-6xl sm:mt-9">
      <div className="relative overflow-hidden rounded-[24px] border border-[#b9d7f3] bg-white px-5 py-5 shadow-[0_24px_58px_-40px_rgba(9,34,62,0.48)] sm:flex sm:items-center sm:justify-between sm:gap-6 sm:px-7 sm:py-6">
        <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-[#0077FF]/[0.07] blur-3xl" />
        <div className="relative flex items-center gap-3.5 text-left">
          <PricingBrandMark tone="essential" className="h-12 w-12 rounded-[15px] border-[#b9d7f3] bg-[#f5faff] [&_img]:h-[30px] [&_img]:w-auto" />
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.13em] text-[#0077a8]">Need exact pricing?</p>
            <h3 className="mt-1 text-[18px] font-extrabold tracking-[-0.025em] text-[#09223E] sm:text-[20px]">Build Your OneLink Package</h3>
            <p className="mt-1 text-[11px] font-semibold leading-relaxed text-[#718096] sm:text-[12px]">Choose your plan and care period. See the final payable amount instantly.</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen((current) => !current)}
          aria-expanded={isOpen}
          aria-controls="pricing-package-builder"
          className="relative mt-5 inline-flex min-h-[50px] w-full shrink-0 items-center justify-center gap-2 rounded-[15px] border border-[#287fdc] bg-[linear-gradient(135deg,#09223E_0%,#064083_50%,#0077FF_100%)] px-5 text-[13px] font-extrabold text-white shadow-[0_18px_34px_-20px_rgba(0,65,150,0.66)] transition hover:-translate-y-0.5 hover:brightness-110 sm:mt-0 sm:w-auto sm:px-6 sm:text-[14px]"
        >
          {isOpen ? "Close Package Builder" : "Build Your OneLink Package"}
          <svg className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m4 6 4 4 4-4" />
          </svg>
        </button>
      </div>

      {isOpen && typeof document !== "undefined" ? createPortal(
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center bg-[#071b2f]/58 p-3 backdrop-blur-md sm:p-6"
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) setIsOpen(false);
          }}
        >
          <div ref={modalRef} id="pricing-package-builder" role="dialog" aria-modal="true" aria-labelledby="pricing-builder-title" className="relative max-h-[92vh] w-full max-w-[1180px] overflow-y-auto rounded-[24px] border border-white/70 bg-white shadow-[0_40px_110px_-30px_rgba(2,18,38,0.75)] sm:rounded-[30px]">
            <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-[#dce9f5] bg-white/94 px-5 py-4 backdrop-blur-xl sm:px-7 sm:py-5">
              <div className="flex min-w-0 items-center gap-3">
                <PricingBrandMark tone="essential" className="h-11 w-11 shrink-0 rounded-[13px] border-[#b9d7f3] bg-[#f5faff] [&_img]:h-7 [&_img]:w-auto" />
                <div className="min-w-0">
                  <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#087cbc]">Simple, transparent pricing</p>
                  <h2 id="pricing-builder-title" className="truncate text-[18px] font-extrabold tracking-[-0.03em] text-[#09223E] sm:text-[23px]">Build Your OneLink Package</h2>
                </div>
              </div>
              <button type="button" onClick={() => setIsOpen(false)} aria-label="Close package builder" className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#d7e4ef] bg-white text-[#27425f] shadow-sm transition hover:rotate-90 hover:border-[#8dbde9] hover:text-[#0077FF]">
                <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="m3 3 10 10M13 3 3 13" /></svg>
              </button>
            </div>
            <div className="pointer-events-none absolute inset-x-8 top-0 z-30 h-[2px] bg-[linear-gradient(90deg,transparent,#0077FF,transparent)] opacity-80" />
            <div className="grid gap-0 lg:grid-cols-[1fr_1fr_1.15fr]">
            <div className="border-b border-[#dfeaf4] p-5 sm:p-7 lg:border-b-0 lg:border-r">
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
                          ? "border-[#0077FF] bg-[#f0f6ff] text-[#064083] shadow-[0_12px_24px_-17px_rgba(0,86,185,0.62)] ring-2 ring-[#0077FF]/15"
                          : "border-[#dce8ef] bg-white text-[#526173] hover:border-[#9ddcf8]",
                      )}
                    >
                      <span className="text-[13px] font-extrabold">{plan.name}</span>
                      <span className={cn("text-right text-[10px] font-bold uppercase leading-tight tracking-[0.04em]", isSelected ? "text-[#087cbc]" : "text-[#718096]")}>
                        Setup<br /><span className="mt-1 inline-block text-[16px] font-extrabold tracking-[-0.02em] tabular-nums">{formatPricingCurrency(plan.setupAmount)}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border-b border-[#dfeaf4] p-5 sm:p-7 lg:border-b-0 lg:border-r">
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
                          ? "border-[#0077FF] bg-[#f0f6ff] text-[#064083] shadow-[0_12px_24px_-17px_rgba(0,86,185,0.62)] ring-2 ring-[#0077FF]/15"
                          : "border-[#dce8ef] bg-white text-[#526173] hover:border-[#9ddcf8]",
                      )}
                    >
                      <span className="text-[12px] font-extrabold uppercase tracking-[0.035em]">{row.label}</span>
                      <span className="text-[15px] font-extrabold tabular-nums">{formatPricingCurrency(option?.price ?? 0)}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-[linear-gradient(145deg,#f7fbff_0%,#e9f2ff_100%)] p-5 sm:p-7">
              <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#087cbc]">Step 3</p>
              <div className="mt-1.5 flex items-center justify-between gap-3">
                <h3 className="text-[19px] font-extrabold tracking-[-0.025em] text-[#111821]">See Final Total</h3>
                <span className="rounded-full bg-[linear-gradient(135deg,#09223E,#0077FF)] px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.08em] text-white">{selectedPlan?.name}</span>
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
                      includeGst === value ? "bg-[linear-gradient(135deg,#09223E,#0077FF)] text-white shadow-sm ring-1 ring-[#064083]" : "text-[#607286] hover:bg-[#f3f7fc]",
                    )}
                  >
                    {value ? "With GST" : "Without GST"}
                  </button>
                ))}
              </div>
              <dl className="mt-4 space-y-2 text-[12px] font-semibold text-[#526173] sm:text-[13px]">
                <div className="flex items-center justify-between gap-4"><dt>Setup</dt><dd className="font-bold tabular-nums text-[#263446]">{formatPricingCurrency(setupAmount)}</dd></div>
                <div className="flex items-center justify-between gap-4"><dt>{selectedCare?.label} Platform Care</dt><dd className="font-bold tabular-nums text-[#263446]">{formatPricingCurrency(careAmount)}</dd></div>
                <div className="flex items-center justify-between gap-4 border-t border-[#cfdfE9] pt-2"><dt>Subtotal</dt><dd className="font-bold tabular-nums text-[#263446]">{formatPricingCurrency(subtotal)}</dd></div>
                {discountAmount > 0 ? <div className="flex items-center justify-between gap-4 text-[#138808]"><dt>Discount applied</dt><dd className="font-extrabold tabular-nums">−{formatPricingCurrency(discountAmount)}</dd></div> : null}
                {includeGst ? <div className="flex items-center justify-between gap-4"><dt>GST (18%)</dt><dd className="font-bold tabular-nums text-[#263446]">{formatPricingCurrency(gst)}</dd></div> : null}
              </dl>
              <div className="mt-4 rounded-[13px] border border-[#c9dced] bg-white p-2.5 shadow-[0_12px_28px_-24px_rgba(9,34,62,0.45)]">
                <div className="flex items-center justify-between gap-3 px-1 pb-2">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.09em] text-[#526173]">Add customer discount</p>
                  {discountAmount > 0 ? <button type="button" onClick={() => { setAppliedDiscount(0); setDiscountInput(""); }} className="text-[10px] font-extrabold text-[#d14f36] hover:underline">Remove</button> : null}
                </div>
                <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] gap-2">
                  <div className="grid grid-cols-2 rounded-[9px] bg-[#eef4f9] p-1">
                    {(["percentage", "fixed"] as const).map((mode) => (
                      <button key={mode} type="button" onClick={() => { setDiscountMode(mode); setAppliedDiscount(0); }} className={cn("min-h-9 rounded-[7px] px-2.5 text-[11px] font-extrabold transition", discountMode === mode ? "bg-white text-[#064083] shadow-sm" : "text-[#718096]")}>{mode === "percentage" ? "%" : "₹"}</button>
                    ))}
                  </div>
                  <label className="relative min-w-0">
                    <span className="sr-only">Discount value</span>
                    <input type="number" min="0" max={discountMode === "percentage" ? 100 : subtotal} step="1" value={discountInput} onChange={(event) => setDiscountInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") applyDiscount(); }} placeholder={discountMode === "percentage" ? "Discount %" : "Amount"} className="h-full w-full rounded-[9px] border border-[#d6e3ed] bg-[#fbfdff] px-3 text-[13px] font-bold text-[#263446] outline-none transition placeholder:font-semibold placeholder:text-[#9aa8b7] focus:border-[#0077FF] focus:ring-2 focus:ring-[#0077FF]/12" />
                  </label>
                  <button type="button" onClick={applyDiscount} className="rounded-[9px] bg-[#09223E] px-3 text-[11px] font-extrabold text-white transition hover:bg-[#064083]">Apply</button>
                </div>
              </div>
              <div className="mt-4 flex items-end justify-between gap-3 border-t border-[#bcdceb] pt-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.07em] text-[#526173]">Total Payable</p>
                <p className="text-[26px] font-extrabold leading-none tracking-[-0.04em] text-[#064083] tabular-nums">{formatPricingCurrency(total)}</p>
              </div>
              <a href={getStartedHref} className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-[13px] bg-[linear-gradient(135deg,#09223E_0%,#064083_50%,#0077FF_100%)] px-4 text-[14px] font-extrabold text-white shadow-[0_16px_30px_-17px_rgba(0,58,135,0.72)] transition hover:-translate-y-0.5 hover:brightness-110">
                Get Started — {formatPricingCurrency(total)}
              </a>
            </div>
            </div>
          </div>
        </div>
      , document.body) : null}
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
      <Image src="/onelink-primary-logo.png" alt="" width={10895} height={2720} className="pointer-events-none absolute -bottom-10 -right-24 w-[48%] rotate-[-7deg] opacity-[0.022] brightness-0 invert" aria-hidden="true" />
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
