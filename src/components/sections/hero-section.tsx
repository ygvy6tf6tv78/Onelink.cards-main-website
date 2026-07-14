/* eslint-disable @next/next/no-img-element */
import { HeroMockupShowcase } from "@/components/hero-mockup-showcase";
import { Reveal } from "@/components/ui/reveal";
import { ActionLink } from "@/components/ui/action-link";
import { SectionBadge } from "@/components/ui/section-badge";
import { siteConfig } from "@/content/site";
import { Icon } from "@/components/icons";

export function HeroSection() {
  const whatsappHref = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent("Hello OneLink, I want to discuss OneLink for my business.")}`;

  return (
    <section id="home" className="section-shell relative overflow-x-clip overflow-y-visible bg-white">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-24 bg-gradient-to-b from-transparent via-[#f5f9fc]/65 to-[#f5f9fc] lg:hidden"
        aria-hidden
      />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-8 px-4 pb-9 pt-[5.85rem] sm:px-6 sm:gap-10 sm:pb-12 sm:pt-36 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:px-8 lg:pb-24 lg:pt-[160px]">
        <Reveal className="flex flex-col items-start justify-center text-left" delay={0.04}>
          <SectionBadge label="One smart business page" className="mt-8 sm:mt-4" />
          <a href="https://www.kriyongroup.com/" target="_blank" rel="noopener noreferrer" className="mt-3 text-[12px] font-bold tracking-[0.005em] text-[#526173] hover:text-[#00A9FF] sm:text-[13px]">
            A Creative Technology Venture by Kriyon Group Pvt. Ltd.
          </a>
          <h1 className="font-display mt-5 max-w-none text-[40px] font-[780] leading-[1.02] tracking-[-0.05em] sm:mt-6 sm:text-[50px] lg:text-[52px] xl:text-[56px]">
            <span className="block whitespace-nowrap text-[var(--foreground)]">Stop sharing links.</span>
            <span className="mt-1 block whitespace-nowrap text-[var(--accent)]">Share OneLink.</span>
          </h1>
          <p className="mt-4 max-w-[58ch] text-pretty text-[15px] font-medium leading-[1.7] text-[#435267] sm:mt-5">
            Bring your business, services, products and customer actions into one beautifully designed experience with one smart link and custom QR code.
          </p>
          <div className="mt-6 grid w-full grid-cols-2 gap-2.5 sm:hidden">
            <ActionLink href="#pricing" variant="blue" withArrow className="min-h-12 !rounded-[12px] px-3 text-[13px] font-bold [&_svg]:h-4 [&_svg]:w-4">
              Get Your OneLink
            </ActionLink>
            <ActionLink href={whatsappHref} variant="whatsapp" className="min-h-12 !rounded-[12px] px-3 text-[14px] font-bold">
              <Icon name="whatsapp" className="h-5 w-5" />
              WhatsApp
            </ActionLink>
            <ActionLink href={whatsappHref} variant="secondary" withArrow className="col-span-2 min-h-12 !rounded-[12px] border border-slate-900/10 bg-white px-4 text-[14px] font-bold [&_svg]:h-4 [&_svg]:w-4">
              Talk to Our Team
            </ActionLink>
          </div>
          <div className="mt-7 hidden w-full max-w-lg flex-row flex-nowrap items-stretch gap-3 sm:flex">
              <ActionLink
                href="#pricing"
                variant="primary"
                withArrow
                className="min-h-11 min-w-0 flex-1 !rounded-[12px] bg-[#00A9FF] px-4 py-2.5 text-[14px] font-semibold shadow-[0_14px_28px_-14px_rgba(0,169,255,0.65)] hover:bg-[#008ed9] sm:w-full sm:flex-1 [&_svg]:h-4 [&_svg]:w-4"
              >
                Get OneLink
              </ActionLink>
            <ActionLink
              href="#work"
              variant="secondary"
              withArrow
              className="min-h-11 w-full min-w-0 shrink-0 basis-0 !rounded-[12px] border border-slate-900/10 bg-white px-4 py-2.5 text-[14px] font-semibold text-[#0f172a] shadow-[0_12px_28px_-22px_rgba(15,23,42,0.3)] hover:bg-[#f8fafc] sm:flex-1 [&_svg]:h-4 [&_svg]:w-4"
            >
              View Live Examples
            </ActionLink>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-start gap-x-3 gap-y-2 border-t border-slate-900/[0.07] pt-4">
            <p className="mr-1 text-[11px] font-semibold text-[#526173]">Secure checkout via Razorpay</p>
            <div className="flex items-center gap-3 opacity-65 grayscale">
              <img src="/payment-logos/razorpay.svg" alt="Razorpay" className="h-[14px] w-auto max-w-[74px] object-contain" />
              <img src="/payment-logos/upi.svg" alt="UPI" className="h-[15px] w-auto max-w-[42px] object-contain" />
              <img src="/payment-logos/visa.svg" alt="Visa" className="h-[13px] w-auto max-w-[40px] object-contain" />
              <img src="/payment-logos/mastercard.svg" alt="Mastercard" className="h-[17px] w-auto max-w-[30px] object-contain" />
            </div>
          </div>
        </Reveal>
        <Reveal delay={0} y={16} className="relative overflow-visible pt-2 pb-2 sm:pb-0 sm:pt-0 lg:pt-1">
          <div className="absolute -z-10 left-0 top-8 h-[220px] w-[220px] rounded-full bg-[var(--accent-glow)] blur-[78px] pointer-events-none sm:-left-6 sm:top-6 sm:h-[320px] sm:w-[320px] sm:blur-[90px]" />
          <div className="absolute -z-10 right-0 bottom-8 h-[190px] w-[190px] rounded-full bg-[rgba(11,126,200,0.1)] blur-[60px] pointer-events-none sm:-right-6 sm:bottom-6 sm:h-[250px] sm:w-[250px] sm:blur-[70px]" />
          <div className="relative">
            <HeroMockupShowcase />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
