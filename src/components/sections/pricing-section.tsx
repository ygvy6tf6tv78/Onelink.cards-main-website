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

const monthlyCareLabels: Record<string, Record<string, string>> = {
  essential: {
    "3-month": "₹699",
    "6-month": "₹599",
    "12-month": "₹499",
  },
  signature: {
    "3-month": "₹1,199",
    "6-month": "₹999",
    "12-month": "₹899",
  },
  elite: {
    "3-month": "₹1,999",
    "6-month": "₹1,699",
    "12-month": "₹1,499",
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

  return (
    <article
      className={cn(
        "group relative mx-auto flex h-full w-full max-w-[calc(100vw-40px)] min-w-0 flex-col overflow-hidden rounded-[22px] border bg-white p-4 transition-all duration-300 sm:max-w-none sm:p-6",
        isSignature
          ? "!overflow-visible border-shine border-shine-blue border-[#53c4ff] bg-[linear-gradient(145deg,#087cbc_0%,#00A9FF_48%,#0677b6_100%)] shadow-[0_34px_80px_-36px_rgba(0,126,191,0.58)] lg:-translate-y-3"
          : isElite
            ? "border-transparent bg-white [background:linear-gradient(#fff,#fff)_padding-box,linear-gradient(145deg,#9edcff,#00A9FF,#087cbc)_border-box] shadow-[0_18px_46px_-38px_rgba(15,23,42,0.34)] hover:-translate-y-1 hover:shadow-[0_24px_54px_-38px_rgba(3,80,122,0.32)]"
            : "border-transparent bg-white [background:linear-gradient(#fff,#fff)_padding-box,linear-gradient(145deg,#bdeaff,#00A9FF,#087cbc)_border-box] shadow-[0_18px_46px_-38px_rgba(15,23,42,0.3)] hover:-translate-y-1 hover:shadow-[0_24px_54px_-38px_rgba(15,23,42,0.3)]",
      )}
    >
      {isSignature ? (
        <span className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-white/85 bg-[linear-gradient(135deg,#063d61,#087cbc)] px-5 py-2 text-[10px] font-extrabold uppercase leading-none tracking-[0.11em] text-white shadow-[0_12px_24px_-12px_rgba(2,36,58,0.9)]">
          Most Popular
        </span>
      ) : null}
      <div className={cn("pointer-events-none absolute inset-x-0 top-0 h-24 rounded-t-[23px]", tone.wash)} />

      <div className={cn("relative z-[1] flex min-h-0 flex-1 flex-col", isSignature && "pt-3")}>
        {!isSignature ? (
          <p className={cn("text-[10px] font-extrabold uppercase tracking-[0.18em]", tone.label)}>
            {plan.badge}
          </p>
        ) : null}

        <div className={cn("flex items-center gap-3.5", isSignature ? "mt-2" : "mt-3")}>
          <PricingBrandMark
            tone={tone.markTone}
            className="h-12 w-12 rounded-[14px] [&_img]:w-7"
          />
          <h3 className={cn("min-w-0 flex-1 text-left text-[24px] font-extrabold leading-tight tracking-[-0.025em] sm:text-[26px]", isSignature ? "text-white" : "text-[#111821]")}>
            {plan.name}
          </h3>
        </div>

        <p className={cn("mt-3 max-w-[34ch] text-[14px] font-medium leading-[1.55] sm:text-[14px]", isSignature ? "text-white/78" : "text-[#64748B]")}>
          {plan.description}
        </p>

        <div className={cn("mt-5 rounded-[17px] border p-4.5 sm:p-5", isSignature ? "border-white/55 bg-white shadow-[0_18px_38px_-28px_rgba(3,61,96,0.55)]" : "border-[#cfe5f1] bg-[linear-gradient(145deg,#ffffff_0%,#f5fbff_100%)] shadow-[0_16px_34px_-30px_rgba(0,126,191,0.42)]")}>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.11em] text-[#087cbc] sm:text-[11px]">
            One-time design &amp; development
          </p>
          <p className="mt-2.5 flex items-center gap-2.5 font-bold leading-none tracking-[-0.04em] text-[#111821] tabular-nums">
            <span className="text-[39px] sm:text-[43px]">{formatPricingCurrency(plan.setupAmount)}</span>
            <span className="rounded-full border border-[#bde7fb] bg-[#eef9ff] px-2 py-1 text-[9px] font-extrabold uppercase tracking-[0.06em] text-[#087cbc]">+ GST</span>
          </p>
          <p className="mt-2.5 text-[11px] font-semibold leading-relaxed text-[#718096]">Charged once for complete OneLink setup</p>
        </div>

        <div className="mt-5">
          <p className={cn("text-[12px] font-extrabold uppercase tracking-[0.12em]", isSignature ? "text-white" : "text-[#334155]")}>
            Choose Platform Care
          </p>
          <div className="mt-2.5 grid w-full min-w-0 grid-cols-3 gap-2 sm:gap-2.5">
            {primaryCareRows.map((row) => {
              const option = plan.maintenanceOptions.find((item) => item.id === row.id);

              return (
                <button
                  type="button"
                  key={row.id}
                  onClick={() => setSelectedCare(row.id)}
                  aria-pressed={selectedCare === row.id}
                  className={cn(
                    "relative mt-2 flex min-h-[78px] min-w-0 flex-col items-center justify-center rounded-[12px] border px-1.5 pb-3 pt-5 text-center transition duration-200",
                    selectedCare === row.id ? tone.selectorActive : isSignature ? "border-white/16 bg-white/[0.08] text-white/80" : "border-[#e2e8f0] bg-white/70 text-[#64748B]",
                  )}
                >
                  <span className={cn(
                    "absolute left-1/2 top-0 z-10 inline-flex min-h-6 min-w-[68px] -translate-x-1/2 -translate-y-1/2 items-center justify-center whitespace-nowrap rounded-full border bg-white px-2 py-1.5 text-[9px] font-extrabold leading-none tracking-[-0.015em] text-[#075b88] shadow-[0_5px_12px_-7px_rgba(3,80,122,0.62)] tabular-nums sm:min-w-[74px] sm:text-[10px]",
                    selectedCare === row.id
                      ? "border-[#00A9FF]"
                      : "border-[#cfe5f1]",
                  )}>
                    {monthlyCareLabels[plan.id]?.[row.id]}<span className="ml-0.5 text-[8px] font-bold opacity-65">/mo</span>
                  </span>
                  <span className={cn("text-[10px] font-extrabold uppercase leading-none tracking-[0.05em] sm:text-[11px]", selectedCare === row.id ? (isSignature ? "text-[#087cbc]" : "text-[#111821]") : (isSignature ? "text-white/75" : "text-[#526173]"))}>
                    {row.label}
                  </span>
                  <span className={cn("mt-1.5 text-[16px] font-extrabold leading-none tracking-[-0.025em] tabular-nums sm:text-[17px]", selectedCare === row.id ? tone.value : (isSignature ? "text-white" : "text-[#263548]"))}>
                    {formatCurrency(option?.price ?? 0)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className={cn("mt-5 flex min-h-0 flex-1 flex-col rounded-[16px] border p-4 sm:p-[18px]", tone.featureWrap)}>
          <div className="flex items-center justify-between gap-3">
            <p className={cn("text-[11px] font-extrabold uppercase tracking-[0.13em]", isSignature ? "text-[#087cbc]" : "text-[#526173]")}>
              What&apos;s included
            </p>
            <span className="rounded-full bg-[#edf8ff] px-2 py-1 text-[9px] font-bold uppercase tracking-[0.05em] text-[#087cbc]">5 benefits</span>
          </div>
          <div className="mt-2.5 divide-y divide-[#e4edf3]">
            {plan.features.slice(0, 5).map((feature) => (
              <div key={feature.text} className="flex items-start gap-3 px-0.5 py-[11px] text-[13px] font-semibold leading-snug tracking-[-0.01em] text-[#354559] sm:text-[13.5px]">
                <span className={cn("mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full", tone.icon)}>
                  <Icon name="check" className="h-3 w-3" />
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
          className={cn("mt-5 h-[50px] w-full rounded-[12px] text-[14px] font-extrabold transition-all active:scale-[0.98]", tone.button)}
        />
        {isSignature ? (
          <Link
            href="/portfolio"
            className="group mt-2.5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-[12px] border border-white/70 bg-white text-[12px] font-extrabold text-[#087cbc] shadow-[0_16px_34px_-24px_rgba(2,50,79,0.75)] transition hover:-translate-y-0.5 hover:bg-[#f3faff]"
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
