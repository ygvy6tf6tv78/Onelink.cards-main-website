"use client";

import { useState } from "react";
import Image from "next/image";
import { pricingPlans, siteConfig, type Plan } from "@/content/site";
import { Icon } from "@/components/icons";
import { BuyButton } from "@/components/payment/buy-button";
import { Reveal } from "@/components/ui/reveal";
import { PricingBrandMark } from "@/components/ui/brand-mark";
import { SectionBadge } from "@/components/ui/section-badge";
import { cn, formatCurrency } from "@/lib/utils";

const platformRows = [
  { id: "3-month", label: "3 Months" },
  { id: "6-month", label: "6 Months" },
  { id: "12-month", label: "1 Year" },
];

const savingsByPlan: Record<string, Record<string, string>> = {
  essential: { "3-month": "Standard", "6-month": "Save 12%", "12-month": "Best Value · Save 22%" },
  signature: { "3-month": "Standard", "6-month": "Save 11%", "12-month": "Best Value · Save 20%" },
  elite: { "3-month": "Standard", "6-month": "Save 6%", "12-month": "Best Value · Save 17%" },
};

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
            <SectionBadge label="Pricing" />
            <h2 className="section-title-gradient font-display mt-4 text-[30px] font-bold leading-[1.08] tracking-[-0.045em] sm:text-[34px] lg:text-[40px]">
              Choose the Right OneLink
            </h2>
            <p className="mt-2.5 text-[18px] font-bold leading-tight tracking-[-0.02em] text-[#263548] sm:text-[20px]">
              Start with what you need. Grow when you’re ready.
            </p>
          </Reveal>
        </div>

        <div className="relative mx-auto max-w-7xl">
          <div className="relative mx-auto grid w-full max-w-[42rem] grid-cols-1 items-stretch gap-5 lg:max-w-none lg:grid-cols-3 lg:items-stretch lg:gap-6">
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

        {enterprisePlan ? (
          <Reveal delay={0.16} x={28} y={14}>
            <EnterprisePanel plan={enterprisePlan} href={enterpriseHref} />
          </Reveal>
        ) : null}

        <Reveal delay={0.2}>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 border-t border-slate-900/[0.07] pt-5 text-center text-[11px] font-semibold uppercase tracking-[0.08em] text-[#526173] sm:text-[12px]">
            {['One-time customised setup', 'Platform Care billed separately', 'Clear recurring plans', 'Upgrade whenever needed'].map((item, index) => (
              <span key={item} className="inline-flex items-center gap-3">
                {index > 0 ? <span className="h-1 w-1 rounded-full bg-[#00A9FF]" /> : null}
                {item}
              </span>
            ))}
          </div>
        </Reveal>

      </div>
    </section>
  );
}

function PricingCard({ plan, isSignature }: { plan: Plan; isSignature?: boolean }) {
  const isElite = plan.id === "elite";
  const tone = getPlanTone(plan);
  const [selectedCare, setSelectedCare] = useState("12-month");

  return (
    <article
      className={cn(
        "group relative mx-auto flex h-full w-full max-w-[calc(100vw-40px)] min-w-0 flex-col overflow-hidden rounded-[24px] border bg-white p-5 transition-all duration-300 sm:max-w-none sm:p-7",
        isSignature
          ? "border-shine border-shine-blue border-[#53c4ff] bg-[linear-gradient(145deg,#087cbc_0%,#00A9FF_48%,#0677b6_100%)] shadow-[0_34px_80px_-36px_rgba(0,126,191,0.58)] lg:-translate-y-3"
          : isElite
            ? "border-[#b9d9f0] bg-white shadow-[0_18px_46px_-38px_rgba(15,23,42,0.34)] hover:-translate-y-1 hover:border-[#8bc9ec] hover:shadow-[0_24px_54px_-38px_rgba(3,80,122,0.32)]"
            : "border-[#d6dde5] bg-white shadow-[0_18px_46px_-38px_rgba(15,23,42,0.3)] hover:-translate-y-1 hover:border-[#b8c9d8] hover:shadow-[0_24px_54px_-38px_rgba(15,23,42,0.3)]",
      )}
    >
      <div className={cn("pointer-events-none absolute inset-x-0 top-0 h-24", tone.wash)} />

      <div className="relative z-[1] flex min-h-0 flex-1 flex-col">
        <p className={cn("text-[11px] font-bold uppercase tracking-[0.2em]", isSignature ? "text-white/78" : tone.label)}>
          {plan.badge}
        </p>

        <div className="mt-4 flex items-center gap-4">
          <PricingBrandMark
            tone={tone.markTone}
            className="h-12 w-12 rounded-[14px] [&_img]:w-7"
          />
          <h3 className={cn("min-w-0 flex-1 text-left text-[24px] font-extrabold leading-tight tracking-[-0.025em] sm:text-[26px]", isSignature ? "text-white" : "text-[#111821]")}>
            {plan.name}
          </h3>
        </div>

        <p className={cn("mt-4 max-w-[32ch] text-[14px] font-medium leading-relaxed sm:text-[15px]", isSignature ? "text-white/76" : "text-[#64748B]")}>
          {plan.description}
        </p>

        <div className={cn("mt-6 rounded-[18px] border p-5", isSignature ? "border-white/50 bg-white shadow-[0_18px_38px_-28px_rgba(3,61,96,0.55)]" : "border-[#e8eef5] bg-white/72")}>
          <div className="flex items-end gap-2">
            {plan.originalAmount ? (
              <span className="pb-1 text-[14px] font-semibold text-[#94A3B8] line-through">{formatCurrency(plan.originalAmount)}</span>
            ) : null}
          </div>
          <p className="mt-0 text-[36px] font-bold leading-none tracking-tight text-[#111821] tabular-nums sm:text-[40px]">
            {formatCurrency(plan.setupAmount)}
          </p>
          <div className="mt-2.5">
            <span className={cn("rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.08em]", isSignature ? "border-[#ccecff] bg-white text-[#087cbc] shadow-sm" : tone.gstPill)}>
              One-Time Professional Setup + GST
            </span>
          </div>
        </div>

        <div className="mt-6">
          <p className={cn("text-[11px] font-bold uppercase tracking-[0.15em]", isSignature ? "text-white/70" : "text-[#718096]")}>
            Choose your Platform Care Plan
          </p>
          <div className="mt-3 grid w-full min-w-0 grid-cols-3 gap-3">
            {platformRows.map((row) => {
              const option = plan.maintenanceOptions.find((item) => item.id === row.id);

              return (
                <button
                  type="button"
                  key={row.id}
                  onClick={() => setSelectedCare(row.id)}
                  aria-pressed={selectedCare === row.id}
                  className={cn(
                    "relative flex min-w-0 flex-col items-center justify-center gap-1.5 rounded-[14px] border px-1.5 py-3 text-center transition duration-200",
                    selectedCare === row.id ? tone.selectorActive : isSignature ? "border-white/16 bg-white/[0.08] text-white/80" : "border-[#e2e8f0] bg-white/70 text-[#64748B]",
                  )}
                >
                  <span className={cn("text-[10px] font-extrabold uppercase tracking-[0.08em] sm:text-[11px]", selectedCare === row.id ? (isSignature ? "text-[#087cbc]" : "text-[#111821]") : (isSignature ? "text-white/75" : "text-[#526173]"))}>
                    {row.label}
                  </span>
                  <span className={cn("text-[16px] font-extrabold leading-none tabular-nums sm:text-[17px]", selectedCare === row.id ? tone.value : (isSignature ? "text-white" : "text-[#263548]"))}>
                    {formatCurrency(option?.price ?? 0)}
                  </span>
                  <span className={cn(
                    "min-h-[24px] text-balance text-[8px] font-bold uppercase leading-[1.25] tracking-[0.04em] sm:text-[9px]",
                    row.id === "12-month"
                      ? selectedCare === row.id && isSignature ? "text-[#087cbc]" : isSignature ? "text-white" : "text-[#00A9FF]"
                      : selectedCare === row.id && isSignature ? "text-[#087cbc]/80" : isSignature ? "text-white/62" : "text-[#718096]",
                  )}>
                    {savingsByPlan[plan.id]?.[row.id]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className={cn("mt-6 flex min-h-0 flex-1 flex-col rounded-[20px] border p-4", tone.featureWrap)}>
          <p className={cn("text-[11px] font-bold uppercase tracking-[0.18em]", isSignature ? "text-[#087cbc]" : "text-[#94A3B8]")}>
            Included
          </p>
          <div className="mt-3 space-y-2">
            {plan.features.slice(0, 5).map((feature) => (
              <div key={feature.text} className="flex items-start gap-2.5 rounded-[12px] bg-white/74 px-3 py-2 text-[12px] font-medium leading-snug tracking-tight text-[#475569] sm:text-[13px]">
                <span className={cn("mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full", tone.icon)}>
                  <Icon name="check" className="h-2.5 w-2.5" />
                </span>
                {feature.text}
              </div>
            ))}
          </div>
        </div>

        <BuyButton
          planId={plan.id}
          maintenanceId={selectedCare}
          label={plan.ctaLabel}
          className={cn("mt-6 h-12 w-full rounded-[12px] text-[14px] font-bold transition-all active:scale-[0.98]", tone.button)}
        />
      </div>
    </article>
  );
}

function EnterprisePanel({ plan, href }: { plan: Plan; href: string }) {
  return (
    <div className="border-shine border-shine-blue relative mx-auto mt-12 w-full max-w-[calc(100vw-40px)] overflow-hidden rounded-[22px] border border-[#00A9FF]/70 bg-[linear-gradient(135deg,#04182f_0%,#06466f_52%,#087cbc_100%)] p-5 text-white shadow-[0_32px_78px_-42px_rgba(0,126,191,0.58)] sm:max-w-7xl sm:p-7 lg:mt-14 lg:p-8">
      <div className="pointer-events-none absolute -right-14 -top-20 h-64 w-64 rounded-full bg-[#00A9FF]/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 left-1/3 h-56 w-72 rounded-full bg-[#00A9FF]/12 blur-3xl" />
      <Image src="/Group%201000008683.png" alt="" width={900} height={210} className="pointer-events-none absolute -bottom-10 -right-24 w-[48%] rotate-[-7deg] opacity-[0.022] brightness-0 invert" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,#6bcfff,transparent)] opacity-55" />
      <div className="relative grid gap-7 lg:grid-cols-[230px_minmax(0,1fr)_290px] lg:items-center lg:gap-9">
        <div className="lg:order-2">
          <span className="inline-flex rounded-full border border-[#55c5ff]/20 bg-[#00A9FF]/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.09em] text-[#9bddff]">
            OneLink Enterprise
          </span>
          <div className="mt-4 flex items-center gap-3.5">
            <PricingBrandMark
              tone="essential"
              className="h-11 w-11 rounded-[13px] border-white/20 [&_img]:w-6"
            />
            <div>
              <h3 className="font-display text-[1.6rem] font-bold leading-tight tracking-[-0.04em] text-white sm:text-[1.9rem]">One brand. Multiple locations. One connected customer experience.</h3>
            </div>
          </div>
          <p className="mt-3 max-w-2xl text-[14px] font-normal leading-[1.65] text-white/68 sm:text-[15px]">
            For chains, franchises and multi-location brands that need central control with branch-level customer journeys.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {enterpriseHighlights.slice(0, 4).map((highlight) => (
              <span key={highlight} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.055] px-3 py-1.5 text-[11px] font-semibold text-white/74">
                <Icon name="check" className="h-3 w-3 text-[#55c5ff]" />
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

        <div className="rounded-[18px] border border-white/14 bg-white/[0.07] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] sm:p-6 lg:order-3">
          <p className="text-[9px] font-semibold uppercase tracking-[0.13em] text-[#9bddff]">Starting from</p>
          <p className="mt-2 font-display text-[2.15rem] font-semibold leading-none tracking-[-0.05em] text-white tabular-nums">
            {formatCurrency(plan.setupAmount)}
          </p>
          <div className="mt-4 border-t border-white/10 pt-4 text-[11px] font-medium text-white/62">
            <p>Custom platform plan based on scope</p>
          </div>
          <a href={href} className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-[12px] bg-[#00A9FF] px-4 text-[15px] font-semibold text-white shadow-[0_14px_28px_-15px_rgba(0,169,255,0.58)] transition hover:-translate-y-0.5 hover:bg-[#0099e8]">
            Discuss Enterprise
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
      selectorActive: "border-[#D7E5F2] bg-white shadow-[0_4px_18px_-6px_rgba(15,23,42,0.14)] ring-1 ring-[#bfdbfe]/40",
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
    selectorActive: "border-[#d6dde5] bg-white shadow-[0_4px_18px_-6px_rgba(102,116,133,0.22)] ring-1 ring-[#d6dde5]/30",
    saveBadge: "border-emerald-200/90 bg-emerald-50 text-emerald-800",
    value: "text-[#5c6774]",
    icon: "bg-[#eef2f5] text-[#5c6774]",
    featureWrap: "border-[#e8edf2] bg-[linear-gradient(180deg,#fcfdff_0%,#f6f8fa_100%)]",
    button: "bg-[#111821] text-white hover:bg-black shadow-sm",
  };
}
