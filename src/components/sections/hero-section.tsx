/* eslint-disable @next/next/no-img-element */
import { HeroMockupShowcase } from "@/components/hero-mockup-showcase";
import { HeroEntrance } from "@/components/ui/reveal";
import { ActionLink } from "@/components/ui/action-link";
import { siteConfig } from "@/content/site";
import { Icon } from "@/components/icons";
import { HeroCloudBackground } from "@/components/hero-cloud-background";
import styles from "./hero-section.module.css";
import Image from "next/image";
import { portfolioItems } from "@/content/portfolio";

const heroIntegrations = [
  { label: "Google Reviews", image: "/integration-logos/google-reviews.png", imageClass: "h-7 w-auto max-w-[78px]" },
  { label: "Google Maps", image: "/integration-logos/google-maps.png", imageClass: "h-7 w-7" },
  { label: "Razorpay", image: "/payment-logos/razorpay.svg", imageClass: "h-[19px] w-auto max-w-[78px]" },
  { label: "UPI", image: "/payment-logos/upi.svg", imageClass: "h-[23px] w-auto max-w-[54px]" },
  { label: "Instagram", image: "/integration-logos/instagram.png", imageClass: "h-7 w-7" },
] as const;

const trustedBusinesses = [
  { name: "Burger Bazaar", id: "burger-bazaar" },
  { name: "Vastukar Architects", id: "vastukar" },
  { name: "New Vision Diagnostics", id: "new-vision" },
].flatMap((business) => {
  const portfolio = portfolioItems.find((item) => item.id === business.id);
  return portfolio ? [{ ...business, image: portfolio.image }] : [];
});

export function HeroSection() {
  const whatsappHref = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent("Hello OneLink, I want to discuss OneLink for my business.")}`;

  return (
    <section id="home" className="section-shell relative overflow-x-clip overflow-y-visible bg-white sm:bg-[#edf6ff]">
      <div className="hidden sm:block">
        <HeroCloudBackground />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_35%,rgba(0,169,255,0.1),transparent_42%),linear-gradient(180deg,#ffffff_0%,#f7fbff_72%,#ffffff_100%)] sm:hidden" aria-hidden />
      <div className="pointer-events-none absolute left-1/2 top-0 z-[1] h-[420px] w-[760px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0.06)_42%,transparent_72%)] blur-2xl" aria-hidden />
      <div className={`${styles.heroGrid} relative z-10 mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] gap-6 px-4 pb-3 pt-[5.85rem] sm:px-6 sm:gap-7 sm:pb-5 sm:pt-36 md:gap-6 md:pb-4 md:pt-28 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:px-8 lg:pb-6 lg:pt-[160px]`}>
        <div className="flex min-w-0 flex-col items-start justify-center text-left">
          <HeroEntrance delay={0.03} x={-18} y={8}>
            <div className="mt-2 flex items-center gap-3 sm:mt-4">
              <div className="flex -space-x-2" aria-label="Featured OneLink businesses">
                {trustedBusinesses.map((business) => (
                  <span
                    key={business.name}
                    title={business.name}
                    className="relative block h-9 w-9 overflow-hidden rounded-full border-2 border-white bg-[#eaf6ff] shadow-[0_8px_20px_-10px_rgba(15,23,42,0.5)] sm:h-10 sm:w-10"
                  >
                    <Image src={business.image} alt="" fill sizes="40px" className="object-cover object-top" aria-hidden="true" />
                  </span>
                ))}
              </div>
              <div className="leading-tight">
                <p className="text-[11px] font-extrabold tracking-[-0.01em] text-[#172235] sm:text-[12px]">Trusted by 24+ businesses</p>
                <p className="mt-1 text-[10px] font-bold tracking-[0.08em] text-[#f59e0b]" aria-label="Rated five out of five">★★★★★ <span className="tracking-normal text-[#536174]">5.0</span></p>
              </div>
            </div>
          </HeroEntrance>
          <HeroEntrance delay={0.12} x={-24} y={10}>
            <h1 className="font-display mt-4 max-w-none text-[clamp(35px,10.25vw,40px)] font-[720] leading-[1.01] tracking-[-0.055em] sm:mt-7 sm:text-[50px] md:text-[48px] lg:text-[52px] xl:text-[60px]">
              <span className="block whitespace-nowrap lg:hidden"><span className="text-[#07111f]">Stop sharing </span><span className="text-[#00A9FF]">links.</span></span>
              <span className="section-title-gradient hidden whitespace-nowrap lg:block">Stop sharing links.</span>
              <span className="mt-1 block whitespace-nowrap text-[#00A9FF] [text-shadow:0_3px_0_rgba(255,255,255,0.72),0_10px_24px_rgba(0,105,190,0.2)] lg:text-white lg:[text-shadow:0_3px_0_rgba(61,91,121,0.34),0_9px_20px_rgba(0,48,105,0.34),0_18px_38px_rgba(0,55,120,0.22)]">Share OneLink.</span>
            </h1>
          </HeroEntrance>
          <HeroEntrance delay={0.2} x={-22} y={10}>
            <p className="mt-4 max-w-[52ch] text-pretty text-[15px] font-medium leading-[1.72] text-[#475970] sm:mt-6 sm:text-[16px] sm:leading-[1.7] sm:text-[#27364a]">
              Bring your services, products, bookings, payments, reviews and customer actions together in one seamless place. Make it easier for customers to connect with your business and easier for you to manage everything.
            </p>
          </HeroEntrance>
          <HeroEntrance delay={0.29} x={-20} y={10} className="min-w-0 w-full">
          <div className="mt-5 grid w-full grid-cols-2 gap-2.5 sm:hidden">
            <ActionLink href="#pricing" variant="blue" withArrow className="h-12 min-w-0 !rounded-[15px] bg-[linear-gradient(135deg,#00A9FF_0%,#0077FF_100%)] px-3 text-[13px] font-bold shadow-[0_16px_30px_-18px_rgba(0,135,225,0.7)] [&_svg]:h-4 [&_svg]:w-4">
              Get Your OneLink
            </ActionLink>
            <ActionLink href={whatsappHref} variant="whatsapp" className="h-12 min-w-0 !rounded-[15px] px-3 text-[13px] font-bold shadow-[0_16px_30px_-20px_rgba(37,211,102,0.45)]">
              <Icon name="whatsapp" className="h-5 w-5" />
              WhatsApp
            </ActionLink>
            <ActionLink href="/portfolio" variant="secondary" withArrow className="col-span-2 h-12 min-w-0 !rounded-[15px] border-2 border-[#00A9FF] !bg-white px-3 text-[14px] font-extrabold !text-[#0077b9] shadow-[0_14px_30px_-22px_rgba(0,169,255,0.52)] hover:border-[#008fd9] hover:!bg-[#f2fbff] [&_svg]:h-4 [&_svg]:w-4">
              See OneLink in Action
            </ActionLink>
            <div className="col-span-2 mt-3 w-full border-t border-[#d8e2ea] pt-5">
              <p className="text-left text-[12px] font-extrabold leading-5 text-[#435267]">
                Connect with the tools your customers already use.
              </p>
              <div className="mt-3 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <div className="flex min-w-max items-center justify-start gap-5 pr-4">
                  <div className="flex h-9 items-center justify-center">
                    <Icon name="whatsapp" className="h-8 w-8 text-[#25D366]" />
                    <span className="sr-only">WhatsApp</span>
                  </div>
                  {heroIntegrations.map((item) => item.label === "Instagram" ? (
                    <a key={item.label} href={siteConfig.social.instagram} target="_blank" rel="noreferrer" className="flex h-9 items-center justify-center gap-1.5 rounded-full pr-2 text-[11px] font-extrabold text-[#d62976]">
                      <img src={item.image} alt="" className={`${item.imageClass} object-contain`} />
                      Follow us
                    </a>
                  ) : (
                    <div key={item.label} className="flex h-9 items-center justify-center">
                      <img src={item.image} alt={item.label} className={`${item.imageClass} object-contain`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-7 hidden w-full max-w-[470px] flex-row flex-nowrap items-stretch gap-3 sm:flex">
              <ActionLink
                href="/portfolio"
                variant="primary"
                withArrow
                className="h-12 min-w-0 flex-[1.15] !rounded-[15px] bg-[linear-gradient(135deg,#00A9FF_0%,#0077FF_100%)] px-4 text-[13px] font-bold shadow-[0_16px_30px_-16px_rgba(0,135,225,0.62)] hover:brightness-110 [&_svg]:h-4 [&_svg]:w-4"
              >
                See OneLink in Action
              </ActionLink>
            <ActionLink
              href="#pricing"
              variant="secondary"
              withArrow
              className="h-12 min-w-0 flex-1 !rounded-[15px] border-2 border-[#168fd4] !bg-white/92 px-4 text-[13px] font-extrabold !text-[#064083] shadow-[0_16px_34px_-20px_rgba(0,70,140,0.48)] backdrop-blur-md hover:border-[#087bc1] hover:!bg-white [&_svg]:h-4 [&_svg]:w-4"
            >
              Get OneLink
            </ActionLink>
          </div>
          </HeroEntrance>
          <HeroEntrance delay={0.38} x={-16} y={8} className="hidden sm:block">
          <div className="mt-5 w-full max-w-xl pt-2">
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
                {heroIntegrations.map((item) => item.label === "Instagram" ? (
                  <a key={item.label} href={siteConfig.social.instagram} target="_blank" rel="noreferrer" className="group flex h-9 items-center justify-start gap-1.5 rounded-full pr-2 text-[11px] font-extrabold text-[#c72570]">
                    <img src={item.image} alt="" className={`${item.imageClass} object-contain transition-transform duration-300 ease-out group-hover:scale-105`} />
                    Follow us
                  </a>
                ) : (
                  <div key={item.label} className="group flex h-9 items-center justify-start">
                    <img src={item.image} alt={item.label} className={`${item.imageClass} object-contain transition-transform duration-300 ease-out group-hover:scale-105`} />
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
