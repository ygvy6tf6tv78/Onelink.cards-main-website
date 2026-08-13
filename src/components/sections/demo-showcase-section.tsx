"use client";

import Link from "next/link";
import { useState } from "react";
import { portfolioItems } from "@/content/portfolio";
import { PortfolioCard } from "@/components/portfolio/portfolio-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionBadge } from "@/components/ui/section-badge";
import { Icon } from "@/components/icons";
import type { IconName } from "@/content/site";
import { cn } from "@/lib/utils";

const featuredIds = ["burger-bazaar", "new-vision", "vastukar"];
const featuredItems = featuredIds.flatMap((id) => {
  const item = portfolioItems.find((portfolioItem) => portfolioItem.id === id);
  return item ? [item] : [];
});

const categories = [
  "All",
  "Restaurants",
  "Architects",
  "Clinics & Doctors",
  "Hotels",
  "Retail Shops",
  "Education",
];

const categoryIcons: Record<string, IconName> = {
  All: "spark",
  Restaurants: "menu",
  Architects: "building",
  "Clinics & Doctors": "form",
  Hotels: "building",
  "Retail Shops": "wallet",
  Education: "chart",
};

export function DemoShowcaseSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const visibleItems = activeCategory === "All"
    ? featuredItems
    : portfolioItems.filter((item) => item.category === activeCategory);

  const categoryButton = (category: string) => (
    <button
      key={category}
      type="button"
      onClick={() => setActiveCategory(category)}
      className={cn(
        "group inline-flex min-h-9 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border px-3.5 py-2 text-[11px] font-bold tracking-[-0.01em] transition-all duration-300 sm:min-h-10 sm:gap-2 sm:px-5 sm:text-[13px]",
        activeCategory === category
          ? "border-[#237fd9] bg-[linear-gradient(135deg,#09223E_0%,#064083_54%,#0077FF_100%)] text-white shadow-[0_14px_30px_-17px_rgba(0,70,160,0.72)]"
          : "border-[#d5e4f1] bg-white text-[#475569] shadow-[0_10px_26px_-24px_rgba(15,23,42,0.5)] hover:-translate-y-0.5 hover:border-[#78b7ec] hover:text-[#064083]",
      )}
    >
      <Icon name={categoryIcons[category]} className={cn("h-3.5 w-3.5 transition-transform group-hover:scale-110", activeCategory === category ? "text-white" : "text-[#0077d4]")} />
      {category}
    </button>
  );

  return (
    <section id="work" className="section-shell scroll-mt-28 bg-white px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <Reveal x={-28} y={14}>
          <div className="text-center">
            <div className="mx-auto max-w-3xl">
              <SectionBadge label="Portfolio" />
              <h2 className="section-title-gradient font-display mx-auto mt-4 max-w-[24ch] text-balance text-[30px] font-bold leading-[1.08] tracking-[-0.04em] sm:text-[36px] lg:text-[42px]">
                Built for real businesses. Designed around every brand.
              </h2>
            </div>
          </div>

          <div className="mx-auto mt-7 flex max-w-5xl flex-wrap justify-center gap-2 sm:mt-8 sm:gap-2.5 md:grid md:grid-cols-4 xl:flex xl:max-w-none">
            {categories.map(categoryButton)}
            <Link
              href="/portfolio"
              className="inline-flex min-h-9 shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-[#00A9FF]/35 bg-[#f3faff] px-4 py-2 text-[11px] font-extrabold text-[#0077b5] shadow-[0_12px_26px_-20px_rgba(0,169,255,0.7)] transition hover:border-[#00A9FF] hover:bg-white sm:min-h-10 sm:px-5 sm:text-[13px]"
            >
              View More
              <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3.5 8h9" />
                <path d="M8.5 3l4.5 5-4.5 5" />
              </svg>
            </Link>
          </div>
        </Reveal>

        {visibleItems.length > 0 ? (
          <div key={activeCategory} className="mt-10 grid gap-x-5 gap-y-9 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-5 xl:gap-x-6">
            {visibleItems.map((item, index) => (
              <Reveal key={item.id} delay={index * 0.07} x={index % 2 === 0 ? -30 : 30} y={16} className="relative z-10 md:last:col-span-2 md:last:mx-auto md:last:w-[calc(50%-10px)] lg:last:col-span-1 lg:last:mx-0 lg:last:w-auto">
                <PortfolioCard item={item} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mx-auto mt-10 max-w-2xl rounded-[22px] border border-dashed border-[#bfdbfe] bg-[#f8fcff] px-5 py-8 text-center">
            <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#0087cc]">{activeCategory}</p>
            <p className="mt-2 text-[15px] font-semibold text-[#64748b]">More OneLinks are being added to this category.</p>
          </div>
        )}

        <Reveal delay={0.12} x={24} y={10}>
          <div className="mt-9 flex justify-center">
            <Link
              href="/portfolio"
              className="group inline-flex h-12 w-[min(100%,310px)] items-center justify-center gap-2.5 rounded-[13px] border border-[#00A9FF]/30 bg-white px-7 text-[13px] font-extrabold text-[#087cbc] shadow-[0_18px_40px_-24px_rgba(0,126,191,0.6)] transition hover:-translate-y-0.5 hover:border-[#00A9FF]/60 hover:bg-[#f3faff] sm:w-auto"
            >
              Explore All Portfolio
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M3.5 8h9" />
                <path d="M8.5 3l4.5 5-4.5 5" />
              </svg>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
