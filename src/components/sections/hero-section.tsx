/* eslint-disable @next/next/no-img-element */
import { siteConfig } from "@/content/site";
import { HeroMockupShowcase } from "@/components/hero-mockup-showcase";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/ui/reveal";
import { ActionLink } from "@/components/ui/action-link";

export function HeroSection() {
  const whatsappHref = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
    "Hello OneLink, I'd like to know more.",
  )}`;

  return (
    <section id="home" className="section-shell relative overflow-x-clip overflow-y-visible">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-24 bg-gradient-to-b from-transparent via-[#f5f9fc]/65 to-[#f5f9fc] lg:hidden"
        aria-hidden
      />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-8 px-4 pb-9 pt-[5.85rem] sm:px-6 sm:gap-10 sm:pb-12 sm:pt-36 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:px-8 lg:pb-24 lg:pt-[160px]">
        <Reveal className="flex flex-col justify-center" delay={0.04}>
          <div className="type-badge mt-8 inline-flex w-fit items-center gap-2 rounded-full border border-[#00A9FF]/14 bg-white/72 px-3 py-1.5 uppercase text-[var(--accent-strong)] shadow-sm backdrop-blur sm:mt-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00A9FF]" />
            <span>Too many links?</span>
          </div>
          <h1 className="font-display mt-5 max-w-none text-[40px] font-[750] leading-[1.02] tracking-[-0.05em] sm:mt-6 sm:text-[50px] lg:text-[52px] xl:text-[55px]">
            <span className="block text-[var(--foreground)] lg:whitespace-nowrap">Stop sharing links.</span>
            <span className="mt-1 block font-extrabold text-[var(--accent)]">Share OneLink.</span>
          </h1>
          <p className="mt-4 max-w-[56ch] text-pretty text-[15px] font-normal leading-[1.72] text-[#526173] sm:mt-5 sm:text-[16px]">
            OneLink brings your business, services, products and customer actions together in one beautifully designed digital experience with one smart link and custom QR code.
          </p>
          <div className="mt-6 flex w-full flex-col gap-3 sm:mt-7 sm:max-w-lg sm:flex-row sm:flex-nowrap sm:items-stretch sm:gap-3">
            <div className="flex w-full min-w-0 gap-2 sm:contents">
              <ActionLink
                href="#pricing"
                variant="primary"
                withArrow
                className="min-h-11 min-w-0 flex-1 !rounded-[12px] bg-[#00A9FF] px-4 py-2.5 text-[14px] font-semibold shadow-[0_14px_28px_-14px_rgba(0,169,255,0.65)] hover:bg-[#008ed9] sm:w-full sm:flex-1 [&_svg]:h-4 [&_svg]:w-4"
              >
                Get Your OneLink
              </ActionLink>
              <ActionLink
                href={whatsappHref}
                variant="whatsapp"
                className="min-h-11 min-w-0 flex-1 !rounded-[12px] px-4 py-2.5 text-[14px] font-semibold sm:hidden [&_svg]:h-4 [&_svg]:w-4"
              >
                <Icon name="whatsapp" className="h-4 w-4 shrink-0 text-white" />
                WhatsApp
              </ActionLink>
            </div>
            <ActionLink
              href={whatsappHref}
              variant="secondary"
              withArrow
              className="min-h-11 w-full min-w-0 shrink-0 basis-0 !rounded-[12px] border border-slate-900/10 bg-white px-4 py-2.5 text-[14px] font-semibold text-[#0f172a] shadow-[0_12px_28px_-22px_rgba(15,23,42,0.3)] hover:bg-[#f8fafc] sm:flex-1 [&_svg]:h-4 [&_svg]:w-4"
            >
              Talk to Our Team
            </ActionLink>
          </div>

          <div className="mt-6 border-t border-slate-900/[0.07] pt-4">
            <p className="text-[11px] font-medium text-[#64748b]">Secure payments powered by trusted platforms</p>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-3">
              <img src="/payment-logos/razorpay.svg" alt="Razorpay" className="h-[18px] w-auto max-w-[96px] object-contain" />
              <img src="/payment-logos/upi.svg" alt="UPI" className="h-[20px] w-auto max-w-[56px] object-contain" />
              <img src="/payment-logos/bhim.svg" alt="BHIM" className="h-[18px] w-auto max-w-[72px] object-contain" />
              <img src="/payment-logos/visa.svg" alt="Visa" className="h-[17px] w-auto max-w-[54px] object-contain" />
              <img src="/payment-logos/mastercard.svg" alt="Mastercard" className="h-[22px] w-auto max-w-[38px] object-contain" />
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#475569]"><Icon name="shield" className="h-4 w-4 text-[#087cbc]" />Secure Payment</span>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.1em] text-[#64748B]">
            <span>Custom Designed</span>
            <span className="h-1 w-1 rounded-full bg-[#94A3B8]" />
            <span>QR Included</span>
            <span className="h-1 w-1 rounded-full bg-[#94A3B8]" />
            <span>Easy to Launch</span>
            <span className="h-1 w-1 rounded-full bg-[#94A3B8]" />
            <span>Built for Every Business</span>
          </div>
        </Reveal>
        <Reveal delay={0} y={16} className="relative overflow-visible pt-2 pb-2 sm:pb-0 sm:pt-0 lg:pt-1">
          <div className="absolute -z-10 left-0 top-8 h-[220px] w-[220px] rounded-full bg-[var(--accent-glow)] blur-[78px] pointer-events-none sm:-left-6 sm:top-6 sm:h-[320px] sm:w-[320px] sm:blur-[90px]" />
          <div className="absolute -z-10 right-0 bottom-8 h-[190px] w-[190px] rounded-full bg-[rgba(11,126,200,0.1)] blur-[60px] pointer-events-none sm:-right-6 sm:bottom-6 sm:h-[250px] sm:w-[250px] sm:blur-[70px]" />
          <div className="absolute -z-10 right-4 top-4 hidden h-64 w-64 rounded-full border border-[#00A9FF]/10 bg-white/30 shadow-[inset_0_0_80px_rgba(0,169,255,0.08)] lg:block" />
          <div className="relative">
            <HeroMockupShowcase />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
