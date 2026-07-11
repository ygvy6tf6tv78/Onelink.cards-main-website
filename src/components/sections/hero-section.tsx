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
          <div className="mt-8 inline-flex w-fit items-center gap-2 rounded-full glass-strong px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--accent-strong)] sm:mt-4 sm:text-[11px]">
            <span className="relative h-2 w-2 rounded-full bg-[var(--accent)]">
              <span className="absolute inset-0 rounded-full bg-[var(--accent)] animate-ping opacity-30" />
            </span>
            <span>One smart business page</span>
          </div>
          <h1 className="font-display mt-5 text-balance max-w-[18ch] text-[2.48rem] font-bold leading-[1.02] tracking-[-0.05em] sm:mt-6 sm:max-w-[20ch] sm:text-[3.15rem] lg:max-w-[21ch] lg:text-[3.25rem] xl:text-[3.48rem]">
            <span className="block sm:hidden">
              <span className="block text-[var(--foreground)]">Stop sharing</span>
              <span className="mt-0.5 block text-[var(--foreground)]">
                links. <span className="text-[var(--accent)]">Share</span>
              </span>
              <span className="mt-0.5 block text-[var(--accent)]">OneLink.</span>
            </span>
            <span className="hidden sm:inline text-[var(--foreground)]">
              Stop sharing links.{" "}
              <span className="text-[var(--accent)]">Share OneLink.</span>
            </span>
          </h1>
          <p className="text-muted mt-4 text-pretty max-w-[54ch] text-[14px] font-medium leading-[1.72] text-[#5f6b7a] sm:mt-5 sm:text-[16px]">
            Bring your calls, WhatsApp, location, reviews, payments, bookings, orders and business information together in one professionally designed page.
          </p>
          <div className="mt-6 flex w-full flex-col gap-3 sm:mt-7 sm:max-w-lg sm:flex-row sm:flex-nowrap sm:items-stretch sm:gap-3">
            <div className="flex w-full min-w-0 gap-2 sm:contents">
              <ActionLink
                href="#pricing"
                variant="primary"
                withArrow
                className="inline-flex min-w-0 flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold sm:w-full sm:flex-1 sm:px-5 [&_svg]:h-4 [&_svg]:w-4"
              >
                Explore Plans
              </ActionLink>
              <ActionLink
                href={whatsappHref}
                variant="whatsapp"
                className="inline-flex min-w-0 flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold sm:hidden [&_svg]:h-4 [&_svg]:w-4"
              >
                <Icon name="whatsapp" className="h-4 w-4 shrink-0 text-white" />
                WhatsApp
              </ActionLink>
            </div>
            <ActionLink
              href="#demos"
              variant="blue"
              withArrow
              className="inline-flex w-full min-w-0 shrink-0 basis-0 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold sm:flex-1 [&_svg]:h-4 [&_svg]:w-4"
            >
              View Portfolio
            </ActionLink>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#64748B] sm:mt-8">
            <span>Secure payment</span>
            <span className="h-1 w-1 rounded-full bg-[#94A3B8]" />
            <span>GST invoice</span>
            <span className="h-1 w-1 rounded-full bg-[#94A3B8]" />
            <span>Human support</span>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-4 opacity-85 grayscale-[0.15] contrast-[1.02]">
            <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" alt="Razorpay" className="h-[18px] w-auto" />
            <div className="mx-1 h-5 w-px bg-neutral-300" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" className="h-4 w-auto" />
            <svg role="img" viewBox="0 0 24 24" className="h-[34px] w-auto -mx-1.5 text-[#1434CB] opacity-90 mix-blend-multiply" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M9.112 8.262L5.97 15.758H3.92L2.374 9.775c-.094-.368-.175-.503-.461-.658C1.447 8.864.677 8.627 0 8.479l.046-.217h3.3a.904.904 0 01.894.764l.817 4.338 2.018-5.102zm8.033 5.049c.008-1.979-2.736-2.088-2.717-2.972.006-.269.262-.555.822-.628a3.66 3.66 0 011.913.336l.34-1.59a5.207 5.207 0 00-1.814-.333c-1.917 0-3.266 1.02-3.278 2.479-.012 1.079.963 1.68 1.698 2.04.756.367 1.01.603 1.006.931-.005.504-.602.725-1.16.734-.975.015-1.54-.263-1.992-.473l-.351 1.642c.453.208 1.289.39 2.156.398 2.037 0 3.37-1.006 3.377-2.564m5.061 2.447H24l-1.565-7.496h-1.656a.883.883 0 00-.826.55l-2.909 6.946h2.036l.405-1.12h2.488zm-2.163-2.656l1.02-2.815.588 2.815zm-8.16-4.84l-1.603 7.496H8.34l1.605-7.496z"/></svg>
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg" alt="Mastercard" className="h-5 w-auto" />
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
