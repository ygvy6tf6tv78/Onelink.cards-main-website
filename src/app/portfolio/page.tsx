import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { portfolioItems } from "@/content/portfolio";
import { PortfolioBrowser, PortfolioCategoryPicker } from "@/components/portfolio/portfolio-browser";
import { Reveal } from "@/components/ui/reveal";

const portfolioHeroImages = ["vastukar", "new-vision", "burger-bazaar"].flatMap((id) => {
  const item = portfolioItems.find((portfolioItem) => portfolioItem.id === id);
  return item ? [item.image] : [];
});

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
            <section className="relative isolate overflow-hidden rounded-[24px] border border-[#0b5caa]/20 bg-[linear-gradient(135deg,#062446_0%,#063b78_52%,#0878d6_100%)] px-5 py-5 shadow-[0_26px_64px_-40px_rgba(0,69,145,0.58)] sm:px-8 sm:py-7 lg:px-9 lg:py-8">
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
              <div className="relative max-w-3xl text-left lg:pr-20">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.17em] text-[#b8e5ff]">Choose a business type</p>
                <h1 className="font-display mt-2 text-[28px] font-bold leading-[1.05] tracking-[-0.045em] text-white sm:text-[36px] lg:text-[40px]">
                  Explore all OneLinks.
                </h1>
                <p className="mt-2 max-w-xl text-[13px] font-medium leading-relaxed text-[#d7ecfb] sm:text-[14px]">
                  Pick a category to see real business experiences.
                </p>
                <div className="mt-4 flex -space-x-2 lg:hidden" aria-hidden="true">
                  {portfolioHeroImages.map((image, index) => <span key={index} className="relative h-10 w-10 overflow-hidden rounded-[12px] border-2 border-white/90 bg-white shadow-lg"><Image src={image} alt="" fill sizes="40px" className="object-cover object-top" /></span>)}
                </div>
                <Suspense fallback={<div className="mt-5 h-8" />}>
                  <PortfolioCategoryPicker />
                </Suspense>
              </div>
              <div className="pointer-events-none absolute bottom-0 right-3 hidden h-[270px] w-[330px] items-end justify-center lg:flex" aria-hidden="true">
                <div className="absolute bottom-4 h-40 w-64 rounded-full bg-[#55c7ff]/18 blur-3xl" />
                {portfolioHeroImages[0] ? <Image src={portfolioHeroImages[0]} alt="" className="absolute bottom-[-42px] left-3 w-[118px] -rotate-[11deg] opacity-70 drop-shadow-[0_18px_22px_rgba(0,0,0,0.3)]" /> : null}
                {portfolioHeroImages[1] ? <Image src={portfolioHeroImages[1]} alt="" className="absolute bottom-[-42px] right-3 w-[118px] rotate-[11deg] opacity-70 drop-shadow-[0_18px_22px_rgba(0,0,0,0.3)]" /> : null}
                {portfolioHeroImages[2] ? <Image src={portfolioHeroImages[2]} alt="" className="relative bottom-[-25px] z-10 w-[154px] drop-shadow-[0_25px_28px_rgba(0,0,0,0.4)]" /> : null}
              </div>
            </section>
          </Reveal>

          <Suspense fallback={<div className="mt-8 h-48 rounded-[24px] border border-[#d5e4f1] bg-white/70" />}>
            <PortfolioBrowser items={portfolioItems} />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
