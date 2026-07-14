"use client";

import { useState } from "react";
import Link from "next/link";
import { portfolioItems } from "@/content/portfolio";
import { PortfolioCard } from "@/components/portfolio/portfolio-card";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import { SectionBadge } from "@/components/ui/section-badge";

// Create a unique list of categories plus "All"
const categories = ["All", ...Array.from(new Set(portfolioItems.map((item) => item.category)))];

export function DemoShowcaseSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = activeCategory === "All"
    ? portfolioItems.slice(0, 3) // Show first 3 for 'All' to match previous behavior
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <section id="work" className="section-shell scroll-mt-28 bg-white px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="text-center">
            <div className="mx-auto max-w-3xl">
              <SectionBadge label="Portfolio" />
              <h2 className="section-title-gradient font-display mx-auto mt-4 max-w-[24ch] text-balance text-[30px] font-bold leading-[1.08] tracking-[-0.04em] sm:text-[36px] lg:text-[42px]">
                Built for real businesses. Designed around every brand.
              </h2>
            </div>
          </div>
          <div className="thin-scrollbar -mx-4 mt-8 flex gap-2.5 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 sm:pb-0">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "inline-flex min-h-9 shrink-0 items-center whitespace-nowrap rounded-full px-4 py-2 text-[12px] font-semibold tracking-[-0.01em] transition-all sm:min-h-10 sm:px-5 sm:text-[13px]",
                  activeCategory === category
                    ? "bg-[#0f172a] text-white shadow-md"
                    : "glass-strong text-[#475569] hover:bg-[#e2e8f0]"
                )}
              >
                {category}
              </button>
            ))}
            <Link
              href="/portfolio"
              className="inline-flex min-h-9 shrink-0 items-center justify-center whitespace-nowrap rounded-full px-4 py-2 text-[12px] font-semibold tracking-[-0.01em] transition-all glass-strong text-[#00A9FF] hover:bg-[#e2e8f0] sm:hidden"
            >
              + Explore All
            </Link>
          </div>
        </Reveal>

        <div
          key={activeCategory}
          className="mt-11 grid gap-x-6 gap-y-9 md:grid-cols-2 xl:grid-cols-3"
        >
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <Reveal key={item.id} delay={index * 0.07} y={18} className="relative z-10">
                <PortfolioCard item={item} />
              </Reveal>
            ))
          ) : (
            <div className="col-span-full py-12 text-center text-gray-500 font-semibold">
              More coming soon for this category!
            </div>
          )}
        </div>

        <Reveal delay={0.12}>
          <div className="mt-9 flex justify-center">
            <Link
              href="/portfolio"
              className="group inline-flex h-11 w-full max-w-sm items-center justify-center gap-2.5 rounded-full border border-[#00A9FF]/20 bg-[#eef9ff] px-5 text-[13px] font-semibold text-[#00A9FF] shadow-[0_16px_36px_-26px_rgba(0,169,255,0.5)] transition hover:-translate-y-0.5 hover:border-[#00A9FF]/35 hover:bg-white sm:w-auto sm:max-w-none"
            >
              Explore All OneLinks
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
