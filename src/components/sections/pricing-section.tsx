"use client";

import { pricingPlans, siteConfig, type Plan } from "@/content/site";
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

export function PricingSection() {
  const topPlans = pricingPlans.filter((plan) => plan.id !== "enterprise");
  const enterprisePlan = pricingPlans.find((plan) => plan.id === "enterprise");
  const enterpriseHref = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
    "Hello OneLink, I want to discuss an Enterprise custom software requirement.",
  )}`;
  return (
    <section
      id="pricing"
      className="relative overflow-hidden px-5 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-20"
    >
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-14 grid gap-5 sm:mb-16 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#00A9FF]/[0.09] px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#0284c7] shadow-[0_10px_36px_-16px_rgba(0,169,255,0.45)]">
            <Icon name="spark" className="h-3.5 w-3.5 text-[#00A9FF]" />
            Pricing
          </div>
          <h2 className="font-display max-w-none text-[30px] font-semibold leading-[1.08] tracking-[-0.055em] text-[#111821] sm:text-[40px] lg:text-[44px]">
            Simple pricing for <span className="text-[#00A9FF]">serious businesses.</span>
          </h2>
          <p className="mt-3 max-w-2xl text-[14px] font-semibold leading-relaxed text-[#64748B] sm:text-[15px]">
            Setup fee first. Choose your duration. Launch with one extra month free.
          </p>
          </div>
          <div className="inline-flex w-fit max-w-full justify-self-start flex-wrap items-center gap-2 rounded-full border border-[#dbeafe] bg-white px-4 py-2.5 shadow-[0_16px_34px_-28px_rgba(15,23,42,0.24)] lg:justify-self-end">
            <span className="text-[12px] font-bold text-[#0369A1]">Relaunch Offer</span>
            <span className="h-1 w-1 rounded-full bg-[#93c5fd]" />
            <p className="text-[13px] font-bold leading-relaxed text-[#111827]">Get 1 Month Free on Every Plan</p>
          </div>
        </div>

        <div className="mx-auto grid w-full max-w-[42rem] grid-cols-1 items-stretch gap-4 lg:max-w-none lg:grid-cols-3 lg:items-center">
          {topPlans.map((plan, index) => {
            const isSignature = plan.id === "signature";
            return (
              <Reveal key={plan.id} delay={index * 0.05} className={cn("flex h-full transition-transform", isSignature ? "lg:z-10 lg:scale-105 lg:-mx-2" : "lg:scale-95")}>
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
          ? "border-[#e5dcc9] bg-[linear-gradient(180deg,#fffdf8_0%,#fff9ef_100%)] ring-[#f0e6d4] shadow-xl"
          : isElite
            ? "border-[#b9d9f0] ring-[#dceefc]/90 shadow-sm"
            : "border-[#d6dde5] ring-[#00A9FF]/16 shadow-sm",
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
          <div className="min-w-0 flex-1">
            <h3 className="text-left text-[26px] font-bold leading-tight tracking-tight text-[#111821] sm:text-[28px]">
              {plan.name}
            </h3>
          </div>
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
            <span className={cn("rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em]", tone.gstPill)}>
              Setup Fee · + GST
            </span>
          </div>
          <p className="mt-1.5 text-[12px] font-semibold leading-relaxed text-[#0369A1]">
            Includes 1 month hosting free.
          </p>
        </div>

        <div className="mt-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#94A3B8]">
            Hosting Duration
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
                  <span className={cn("text-[9px] font-bold uppercase tracking-[0.12em]", row.id === "6-month" ? "text-[#111821]" : "text-[#64748B]")}>
                    {row.label}
                  </span>
                  <span className={cn("text-[14px] font-bold leading-none tabular-nums", row.id === "6-month" ? tone.value : "text-[#334155]")}>
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
          className={cn("mt-6 h-12 w-full rounded-full text-[14px] font-bold transition-all active:scale-[0.98]", tone.button)}
        />
      </div>
    </article>
  );
}

function EnterprisePanel({ plan, href }: { plan: Plan; href: string }) {
  return (
    <div className="mx-auto mt-6 w-full max-w-[calc(100vw-40px)] overflow-hidden rounded-[20px] border border-[#b9d9f0] bg-white p-4 shadow-sm ring-1 ring-[#dceefc]/90 sm:max-w-7xl sm:p-6 lg:mt-12">
      <div className="grid gap-6 lg:grid-cols-[1fr_300px] lg:items-center">
        <div>
          <span className="inline-flex rounded-full border border-[#c7e3f5] bg-[#f0f9ff] px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.16em] text-[#0369A1]">
            {plan.badge}
          </span>
          <div className="mt-4 flex items-center gap-3">
            <PricingBrandMark
              tone="essential"
              className="h-10 w-10 rounded-[12px] [&_img]:w-6"
            />
            <div>
              <h3 className="text-[24px] font-bold tracking-tight text-[#111821]">{plan.name}</h3>
            </div>
          </div>
          <p className="mt-2 text-[13px] font-semibold leading-relaxed text-[#64748B]">
            Custom-built systems for businesses with advanced operational, integration or multi-location requirements.
          </p>
        </div>

        <div className="rounded-[16px] border border-[#e0f2fe] bg-[#f8fbfe] p-5 text-center">
          <p className="text-[10px] font-bold text-[#0369A1] uppercase tracking-[0.18em] mb-1.5">Starting from</p>
          <p className="text-[28px] font-bold leading-none tracking-tight text-[#111821] tabular-nums">
            {formatCurrency(plan.setupAmount)}
          </p>
          <p className="mt-2 text-[11px] font-medium leading-relaxed text-[#64748B]">
            Final pricing depends on features & integrations.
          </p>
          <a href={href} target="_blank" rel="noreferrer" className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#111821] px-4 text-[13px] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#000]">
            <Icon name="whatsapp" className="h-4 w-4" />
            Discuss Requirements
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
