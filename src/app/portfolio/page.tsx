import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { portfolioItems } from "@/content/portfolio";
import { PortfolioBrowser, PortfolioCategoryPicker } from "@/components/portfolio/portfolio-browser";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Portfolio — OneLink",
  description: "Real OneLink pages live for restaurants, consultants, retail, and more.",
  alternates: { canonical: "/portfolio" },
};

export default function PortfolioPage() {
  return (
    <div className="relative isolate overflow-x-clip">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[780px] bg-[radial-gradient(circle_at_14%_5%,rgba(0,169,255,0.22),transparent_40%),radial-gradient(circle_at_82%_18%,rgba(0,108,222,0.13),transparent_35%),linear-gradient(180deg,#edf7ff_0%,#f5f9fc_72%,transparent_100%)]" />
      <main className="page-shell relative">
        <div className="mx-auto max-w-7xl px-4 pb-20 pt-24 sm:px-6 sm:pt-28 lg:px-8 lg:pb-28 lg:pt-32">
          <Reveal>
            <section className="relative isolate overflow-hidden rounded-[24px] border border-[#0b5caa]/20 bg-[linear-gradient(135deg,#062446_0%,#063b78_52%,#0878d6_100%)] px-5 py-5 shadow-[0_26px_64px_-40px_rgba(0,69,145,0.58)] sm:px-8 sm:py-6 lg:px-9 lg:py-6">
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#48c7ff]/40 blur-3xl motion-safe:animate-pulse" />
              <div className="pointer-events-none absolute -bottom-24 left-[24%] h-56 w-72 rounded-full bg-[#0077ff]/35 blur-3xl motion-safe:animate-pulse" />
              <Image
                src="/onelink-logomark.png"
                alt=""
                width={700}
                height={700}
                priority
                className="pointer-events-none absolute -right-8 -bottom-48 w-[280px] rotate-[-14deg] opacity-[0.08] blur-[1px] sm:-right-2 sm:-bottom-56 sm:w-[360px] lg:w-[400px]"
              />
              <div className="pointer-events-none absolute right-6 top-[28px] hidden h-[330px] w-[340px] lg:block" aria-hidden="true">
                <Image
                  src="/pricing-mockup-burger-bazaar.png"
                  alt=""
                  width={150}
                  height={315}
                  sizes="150px"
                  className="absolute left-0 top-20 w-[116px] -rotate-[15deg] opacity-58 drop-shadow-[0_20px_30px_rgba(0,9,24,0.38)]"
                />
                <Image
                  src="/pricing-mockup-vastukar.png"
                  alt=""
                  width={150}
                  height={315}
                  sizes="150px"
                  className="absolute right-0 top-20 w-[118px] rotate-[15deg] opacity-58 drop-shadow-[0_20px_30px_rgba(0,9,24,0.38)]"
                />
                <Image
                  src="/pricing-mockup-new-vision.png"
                  alt=""
                  width={180}
                  height={378}
                  sizes="180px"
                  className="absolute left-[88px] top-2 z-10 w-[152px] drop-shadow-[0_28px_40px_rgba(0,9,24,0.52)]"
                />
              </div>
              <div className="relative max-w-3xl text-left lg:max-w-[760px] lg:pr-4">
                <h1 className="font-display text-[28px] font-bold leading-[1.05] tracking-[-0.045em] text-white sm:text-[36px] lg:text-[40px]">
                  Explore all OneLinks.
                </h1>
                <p className="mt-2 max-w-xl text-[13px] font-medium leading-relaxed text-[#d7ecfb] sm:text-[14px]">
                  Pick a category to see real business experiences.
                </p>
                <Suspense fallback={<div className="mt-4 h-8" />}>
                  <PortfolioCategoryPicker />
                </Suspense>
              </div>
            </section>
          </Reveal>

          <Suspense fallback={<div className="mt-8 h-48 rounded-[24px] border border-[#d5e4f1] bg-white/70" />}>
            <PortfolioBrowser items={portfolioItems} />
          </Suspense>
          <Reveal delay={0.08}>
            <div className="mt-10 flex justify-center sm:mt-12">
              <a
                href="https://www.instagram.com/onelinkcards/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#e1306c]/25 bg-white px-5 text-[13px] font-extrabold text-[#c72570] shadow-[0_16px_34px_-22px_rgba(225,48,108,0.58)] transition hover:-translate-y-0.5 hover:border-[#e1306c]/50 hover:shadow-[0_20px_38px_-22px_rgba(225,48,108,0.72)]"
              >
                <Image src="/integration-logos/instagram.png" alt="" width={22} height={22} className="h-5 w-5 object-contain" />
                Follow us on Instagram
              </a>
            </div>
          </Reveal>
        </div>
      </main>
    </div>
  );
}
