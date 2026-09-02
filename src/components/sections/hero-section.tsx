/* eslint-disable @next/next/no-img-element */
import { HeroMockupShowcase } from "@/components/hero-mockup-showcase";
import { HeroEntrance } from "@/components/ui/reveal";
import { ActionLink } from "@/components/ui/action-link";
import { SectionBadge } from "@/components/ui/section-badge";
import { Icon } from "@/components/icons";
import { HeroCloudBackground } from "@/components/hero-cloud-background";
import styles from "./hero-section.module.css";

const heroIntegrations = [
  { label: "Google Reviews", image: "/integration-logos/google-reviews.png", imageClass: "h-7 w-auto max-w-[78px]" },
  { label: "Google Maps", image: "/integration-logos/google-maps.png", imageClass: "h-7 w-7" },
  { label: "Razorpay", image: "/payment-logos/razorpay.svg", imageClass: "h-[19px] w-auto max-w-[78px]" },
  { label: "UPI", image: "/payment-logos/upi.svg", imageClass: "h-[23px] w-auto max-w-[54px]" },
  { label: "Instagram", image: "/integration-logos/instagram.png", imageClass: "h-7 w-7" },
] as const;

export function HeroSection() {
  return (
    <section id="home" className="section-shell relative overflow-x-clip overflow-y-visible bg-[#6fc2f1]">
      <HeroCloudBackground />
      <div className="pointer-events-none absolute left-1/2 top-0 z-[1] h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0.06)_42%,transparent_72%)] blur-2xl" aria-hidden />
      <div className={`${styles.heroGrid} relative z-10 mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] gap-8 px-4 pb-9 pt-[5.85rem] sm:px-6 sm:gap-10 sm:pb-12 sm:pt-36 md:gap-7 md:pb-10 md:pt-28 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:px-8 lg:pb-24 lg:pt-[160px]`}>
        <div className="flex min-w-0 flex-col items-start justify-center text-left">
          <HeroEntrance delay={0.03} x={-18} y={8}>
            <div className="mt-8 flex flex-wrap items-center gap-2 sm:mt-4">
              <SectionBadge label="One smart business page" />
            </div>
          </HeroEntrance>
          <HeroEntrance delay={0.1} x={-18} y={8}>
            <a href="https://www.kriyongroup.com/" target="_blank" rel="noopener noreferrer" className="mt-5 block text-[12px] font-bold tracking-[0.005em] text-[#38485a] hover:text-[#006bb3] sm:mt-6 sm:text-[13px]">
              A Creative Technology Venture by Kriyon Group Pvt. Ltd.
            </a>
          </HeroEntrance>
          <HeroEntrance delay={0.17} x={-24} y={10}>
            <h1 className="font-display mt-5 max-w-none text-[clamp(35px,10.25vw,40px)] font-[780] leading-[1.02] tracking-[-0.05em] sm:mt-6 sm:text-[50px] md:text-[46px] lg:text-[48px] xl:text-[56px]">
              <span className="block whitespace-nowrap text-[#07111f] drop-shadow-[0_2px_12px_rgba(255,255,255,0.28)]">Stop sharing links.</span>
              <span className="mt-1 block whitespace-nowrap bg-[linear-gradient(100deg,#073b88_0%,#0b63ce_70%,#0750a8_100%)] bg-clip-text text-transparent drop-shadow-[0_3px_14px_rgba(255,255,255,0.2)]">Share OneLink.</span>
            </h1>
          </HeroEntrance>
          <HeroEntrance delay={0.25} x={-22} y={10}>
            <p className="mt-4 max-w-[58ch] text-pretty text-[15px] font-semibold leading-[1.7] text-[#1c2a3a] sm:mt-5">
              Bring your business, services, products and customer actions into one beautifully designed experience with one smart link and custom QR code.
            </p>
          </HeroEntrance>
          <HeroEntrance delay={0.33} x={-20} y={10} className="min-w-0 w-full">
          <div className="mt-6 grid w-full grid-cols-2 gap-2.5 sm:hidden">
            <ActionLink href="/book" variant="blue" withArrow className="h-12 min-w-0 !rounded-[15px] bg-[linear-gradient(135deg,#09223E_0%,#064083_50%,#0077FF_100%)] px-3 text-[12px] font-bold shadow-[0_16px_30px_-18px_rgba(0,70,160,0.68)] [&_svg]:h-4 [&_svg]:w-4">
              Book Free Demo
            </ActionLink>
            <ActionLink href="#work" variant="secondary" withArrow className="h-12 min-w-0 !rounded-[15px] border-2 border-[#168fd4] !bg-white/92 px-3 text-[12px] font-extrabold !text-[#064083] shadow-[0_16px_34px_-20px_rgba(0,70,140,0.48)] backdrop-blur-md hover:border-[#087bc1] hover:!bg-white [&_svg]:h-4 [&_svg]:w-4">
              View Live Examples
            </ActionLink>
          </div>
          <div className="mt-7 hidden w-full max-w-[470px] flex-row flex-nowrap items-stretch gap-3 sm:flex">
              <ActionLink
                href="/book"
                variant="primary"
                withArrow
                className="h-12 min-w-0 flex-1 !rounded-[15px] bg-[linear-gradient(135deg,#09223E_0%,#064083_50%,#0077FF_100%)] px-5 text-[13px] font-semibold shadow-[0_16px_30px_-16px_rgba(0,70,160,0.62)] hover:brightness-110 sm:w-full sm:flex-1 [&_svg]:h-4 [&_svg]:w-4"
              >
                Book a Free Demo
              </ActionLink>
            <ActionLink
              href="#work"
              variant="secondary"
              withArrow
              className="h-12 min-w-0 flex-1 !rounded-[15px] border-2 border-[#168fd4] !bg-white/92 px-5 text-[13px] font-extrabold !text-[#064083] shadow-[0_16px_34px_-20px_rgba(0,70,140,0.48)] backdrop-blur-md hover:border-[#087bc1] hover:!bg-white sm:flex-1 [&_svg]:h-4 [&_svg]:w-4"
            >
              View Live Examples
            </ActionLink>
          </div>
          </HeroEntrance>
          <HeroEntrance delay={0.41} x={-16} y={8}>
          <div className="mt-5 w-full max-w-xl border-t border-slate-900/[0.07] pt-4">
            <p className="text-left text-[11px] font-bold leading-5 text-[#435267] sm:text-[12px]">
              Connect with the tools your customers already use.
            </p>
            <div className="mt-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex min-w-max items-center justify-start gap-3 pr-2 sm:gap-5">
                <div className="group flex h-9 items-center justify-start">
                  <Icon
                    name="whatsapp"
                    className="h-7 w-7 text-[#25D366] transition-transform duration-300 ease-out group-hover:scale-105"
                  />
                  <span className="sr-only">WhatsApp</span>
                </div>
                {heroIntegrations.map((item) => (
                  <div key={item.label} className="group flex h-9 items-center justify-start">
                    <img
                      src={item.image}
                      alt={item.label}
                      className={`${item.imageClass} object-contain transition-transform duration-300 ease-out group-hover:scale-105`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          </HeroEntrance>
        </div>
        <HeroEntrance delay={0.14} x={28} y={16} className={`${styles.heroVisual} relative z-20 min-w-0 overflow-visible pb-2 pt-2 sm:pb-0 sm:pt-0 md:mx-auto md:w-[80%] lg:mx-0 lg:w-auto lg:pt-1`}>
          <div className="absolute -z-10 left-0 top-8 h-[220px] w-[220px] rounded-full bg-[var(--accent-glow)] blur-[78px] pointer-events-none sm:-left-6 sm:top-6 sm:h-[320px] sm:w-[320px] sm:blur-[90px]" />
          <div className="absolute -z-10 right-0 bottom-8 h-[190px] w-[190px] rounded-full bg-[rgba(11,126,200,0.1)] blur-[60px] pointer-events-none sm:-right-6 sm:bottom-6 sm:h-[250px] sm:w-[250px] sm:blur-[70px]" />
          <div className="relative">
            <HeroMockupShowcase />
          </div>
        </HeroEntrance>
      </div>
    </section>
  );
}
