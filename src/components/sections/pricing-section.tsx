"use client";

import Image from "next/image";
import { pricingPlans, type Plan } from "@/content/site";
import { Icon } from "@/components/icons";
import { BuyButton } from "@/components/payment/buy-button";
import { Reveal } from "@/components/ui/reveal";
import { PricingBrandMark } from "@/components/ui/brand-mark";
import { cn, formatCurrency } from "@/lib/utils";

const platformRows = [
  { id: "3-month", label: "3 Months" },
  { id: "6-month", label: "6 Months" },
  { id: "12-month", label: "12 Months" },
];

const enterpriseHighlights = [
  "Multi-Branch Setup",
  "Premium Effects & Custom UI",
  "High Functionality",
  "Custom Bots",
  "Priority Support",
  "Custom Dashboards",
  "QR Systems",
  "Workflow Automation",
];

export function PricingSection() {
  const topPlans = pricingPlans.filter((plan) => plan.id !== "enterprise");
  const enterprisePlan = pricingPlans.find((plan) => plan.id === "enterprise");
  const enterpriseHref = "/contact";
  return (
    <section
      id="pricing"
      className="relative scroll-mt-28 overflow-hidden bg-[#f7fafc] px-5 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16"
    >
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-12 grid gap-5 sm:mb-14 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="eyebrow mb-4 inline-flex items-center gap-1.5">
              <Icon name="spark" className="h-3.5 w-3.5 text-[#00A9FF]" />
              Pricing
            </div>
            <h2 className="font-display type-section-title text-[#111821] lg:whitespace-nowrap">
              Simple pricing for small businesses.
            </h2>
            <p className="mt-3 max-w-3xl text-[15px] font-semibold leading-[1.65] text-[#64748B] sm:text-[16px] lg:whitespace-nowrap">
              Choose the setup that fits your business today and upgrade anytime as you grow.
            </p>
          </div>
          <div className="inline-flex w-fit max-w-full flex-wrap items-center gap-2 rounded-full border border-[#dbeafe] bg-white px-4 py-2.5 shadow-[0_16px_34px_-28px_rgba(15,23,42,0.24)] lg:justify-self-end">
            <span className="text-[12px] font-bold text-[#0369A1]">Relaunch Offer</span>
            <span className="h-1 w-1 rounded-full bg-[#93c5fd]" />
            <p className="text-[13px] font-bold leading-relaxed text-[#111827]">Get 1 Month Free on Every Plan</p>
          </div>
        </div>

        <div className="mx-auto grid w-full max-w-[42rem] grid-cols-1 items-stretch gap-5 lg:max-w-none lg:grid-cols-3 lg:items-stretch lg:gap-6">
          {topPlans.map((plan, index) => {
            const isSignature = plan.id === "signature";
            return (
              <Reveal key={plan.id} delay={index * 0.05} className={cn("flex h-full transition-transform", isSignature && "lg:z-10")}>
                <PricingCard plan={plan} isSignature={isSignature} />
              </Reveal>
            );
          })}
        </div>

        {enterprisePlan ? (
          <Reveal delay={0.16}>
            <EnterprisePanel plan={enterprisePlan} href={enterpriseHref} />
          </Reveal>
        ) : null}

      </div>
    </section>
  );
}

function PricingCard({ plan, isSignature }: { plan: Plan; isSignature?: boolean }) {
  const isElite = plan.id === "elite";
  const tone = getPlanTone(plan);

  return (
    <article
      className={cn(
        "group relative mx-auto flex h-full w-full max-w-[calc(100vw-40px)] min-w-0 flex-col overflow-hidden rounded-[28px] border bg-white p-5 transition-all sm:max-w-none sm:p-7",
        isSignature
          ? "shine-sweep border-[#d8b86e] bg-[linear-gradient(180deg,#fffdf8_0%,#fff9ef_100%)] shadow-[0_24px_70px_-38px_rgba(155,109,20,0.42)]"
          : isElite
            ? "border-[#b9d9f0] bg-white shadow-sm"
            : "border-[#d6dde5] bg-white shadow-sm",
      )}
    >
      <div className={cn("pointer-events-none absolute inset-x-0 top-0 h-24", tone.wash)} />

      <div className="relative z-[1] flex min-h-0 flex-1 flex-col">
        <p className={cn("text-[11px] font-bold uppercase tracking-[0.2em]", tone.label)}>
          {plan.badge}
        </p>

        <div className="mt-4 flex items-center gap-4">
          <PricingBrandMark
            tone={tone.markTone}
            className="h-12 w-12 rounded-[14px] [&_img]:w-7"
          />
          <h3 className="min-w-0 flex-1 text-left text-[24px] font-extrabold leading-tight tracking-[-0.025em] text-[#111821] sm:text-[26px]">
            {plan.name}
          </h3>
        </div>

        <p className="mt-4 max-w-[32ch] text-[14px] font-medium leading-relaxed text-[#64748B] sm:text-[15px]">
          {plan.description}
        </p>

        <div className="mt-6 rounded-[20px] border border-[#e8eef5] bg-white/72 p-5">
          <div className="flex items-end gap-2">
            {plan.originalAmount ? (
              <span className="pb-1 text-[14px] font-semibold text-[#94A3B8] line-through">{formatCurrency(plan.originalAmount)}</span>
            ) : null}
          </div>
          <p className="mt-0 text-[36px] font-bold leading-none tracking-tight text-[#111821] tabular-nums sm:text-[40px]">
            {formatCurrency(plan.setupAmount)}
          </p>
          <div className="mt-2.5">
            <span className={cn("rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.09em]", tone.gstPill)}>
              Setup Fee · + GST
            </span>
          </div>
          <p className="mt-1.5 text-[12px] font-semibold leading-relaxed text-[#0369A1]">
            Includes 1 month hosting free.
          </p>
        </div>

        <div className="mt-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#718096]">
            Select hosting &amp; maintenance
          </p>
          <div className="mt-3 grid w-full min-w-0 grid-cols-3 gap-3">
            {platformRows.map((row) => {
              const option = plan.maintenanceOptions.find((item) => item.id === row.id);

              return (
                <div
                  key={row.id}
                  className={cn(
                    "relative flex flex-col items-center justify-center gap-1.5 rounded-[14px] border px-2 py-3 text-center",
                    row.id === "6-month" ? tone.selectorActive : "border-[#e2e8f0] bg-white/70 text-[#64748B]",
                  )}
                >
                  <span className={cn("text-[10px] font-extrabold uppercase tracking-[0.1em] sm:text-[11px]", row.id === "6-month" ? "text-[#111821]" : "text-[#526173]")}>
                    {row.label}
                  </span>
                  <span className={cn("text-[16px] font-extrabold leading-none tabular-nums sm:text-[17px]", row.id === "6-month" ? tone.value : "text-[#263548]")}>
                    {formatCurrency(option?.price ?? 0)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className={cn("mt-6 flex min-h-0 flex-1 flex-col rounded-[20px] border p-4", tone.featureWrap)}>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#94A3B8]">
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
          maintenanceId="6-month"
          label={plan.ctaLabel}
          className={cn("mt-6 h-12 w-full rounded-[12px] text-[14px] font-bold transition-all active:scale-[0.98]", tone.button)}
        />
      </div>
    </article>
  );
}

function EnterprisePanel({ plan, href }: { plan: Plan; href: string }) {
  return (
    <div className="shine-sweep relative mx-auto mt-10 w-full max-w-[calc(100vw-40px)] overflow-hidden rounded-[22px] border border-[#d7b978]/55 bg-[linear-gradient(135deg,#071727_0%,#10283e_52%,#172e42_100%)] p-5 text-white shadow-[0_32px_90px_-48px_rgba(7,23,39,0.75)] sm:max-w-7xl sm:p-7 lg:mt-16 lg:p-8">
      <div className="pointer-events-none absolute -right-14 -top-20 h-64 w-64 rounded-full bg-[#e6c980]/12 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,#f6e6b7,transparent)] opacity-75" />
      <div className="relative grid gap-7 lg:grid-cols-[230px_minmax(0,1fr)_290px] lg:items-center lg:gap-9">
        <div className="lg:order-2">
          <span className="inline-flex rounded-full border border-[#e3c77e]/30 bg-[#e3c77e]/10 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.09em] text-[#f3dda4]">
            Enterprise Solution
          </span>
          <div className="mt-4 flex items-center gap-3.5">
            <PricingBrandMark
              tone="signature"
              className="h-11 w-11 rounded-[13px] border-[#ead7ad]/70 [&_img]:w-6"
            />
            <div>
              <h3 className="font-display whitespace-nowrap text-[1.6rem] font-bold tracking-[-0.04em] text-white sm:text-[1.9rem]">OneLink Enterprise</h3>
            </div>
          </div>
          <p className="mt-3 max-w-3xl text-[15px] font-normal leading-[1.7] text-white/68 sm:text-[16px]">
            Built for growing brands, multiple locations and advanced customer journeys — with custom functionality, premium support and enterprise-level setup.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {enterpriseHighlights.map((highlight) => (
              <span key={highlight} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.055] px-3 py-1.5 text-[11px] font-semibold text-white/74">
                <Icon name="check" className="h-3 w-3 text-[#e8cc88]" />
                {highlight}
              </span>
            ))}
          </div>
        </div>

        <div className="relative mx-auto flex h-[260px] w-full max-w-[230px] items-end justify-center self-end lg:order-1 lg:h-[310px]">
          <div className="pointer-events-none absolute bottom-3 h-28 w-48 rounded-full bg-[#e8cc88]/14 blur-3xl" />
          <Image
            src="/enterprise-showcase.png"
            alt="Two customized OneLink enterprise mobile experiences"
            width={1284}
            height={1800}
            sizes="(min-width: 1024px) 240px, 220px"
            className="relative h-full w-auto object-contain object-bottom drop-shadow-[0_24px_28px_rgba(0,0,0,0.28)]"
          />
        </div>

        <div className="rounded-[18px] border border-[#e4ca88]/30 bg-[linear-gradient(180deg,rgba(246,230,183,0.12),rgba(246,230,183,0.055))] p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] sm:p-6 lg:order-3">
          <p className="text-[9px] font-semibold uppercase tracking-[0.13em] text-[#e7ce92]">Starting from</p>
          <p className="mt-2 font-display text-[2.15rem] font-semibold leading-none tracking-[-0.05em] text-white tabular-nums">
            {formatCurrency(plan.setupAmount)}
          </p>
          <div className="mt-4 space-y-2 border-t border-[#ead49d]/18 pt-4 text-[11px] font-medium text-white/62">
            <p>+ One-Time Setup</p>
            <p><span className="text-white/42">Monthly Platform Pricing:</span> <strong className="font-semibold text-[#f2dca5]">Custom</strong></p>
          </div>
          <a href={href} className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-[12px] bg-[linear-gradient(90deg,#d8b96e,#f0d99d)] px-4 text-[15px] font-semibold text-[#142132] shadow-[0_14px_28px_-15px_rgba(229,198,124,0.62)] transition hover:-translate-y-0.5 hover:brightness-105">
            Request Proposal
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
      selectorActive: "border-[#e7d2a3] bg-white shadow-[0_4px_18px_-6px_rgba(171,125,36,0.28)] ring-1 ring-[#e7d2a3]/25",
      saveBadge: "border-emerald-200/90 bg-emerald-50 text-emerald-800",
      value: "text-[#9b6d14]",
      icon: "bg-[#fff3d9] text-[#9b6d14]",
      featureWrap: "border-[#f3ead5] bg-[linear-gradient(180deg,#fffdf8_0%,#fff9ef_100%)]",
      button: "bg-[#111821] text-white hover:bg-black shadow-[0_16px_32px_-12px_rgba(17,24,33,0.3)]",
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
