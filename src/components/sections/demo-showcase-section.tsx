"use client";

import { useState } from "react";
import Link from "next/link";
import { portfolioItems } from "@/content/portfolio";
import { PortfolioCard } from "@/components/portfolio/portfolio-card";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

// Create a unique list of categories plus "All"
const categories = ["All", ...Array.from(new Set(portfolioItems.map((item) => item.category)))];

export function DemoShowcaseSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = activeCategory === "All"
    ? portfolioItems.slice(0, 3) // Show first 3 for 'All' to match previous behavior
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <section id="demos" className="section-shell px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
            <div className="max-w-2xl">
              <span className="eyebrow">Portfolio</span>
              <h2 className="font-display mt-4 text-balance text-[2rem] font-semibold tracking-[-0.04em] text-[var(--foreground)] sm:text-[2.5rem] lg:text-[2.85rem]">
                Real OneLinks built for real businesses.
              </h2>
            </div>
            <p className="max-w-[42ch] text-pretty text-[15px] leading-relaxed text-[var(--muted-strong)] lg:text-right">
              Browse live pages by category and see how calls, WhatsApp, payments, reviews and location fit into one clean link.
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((category, idx) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] transition-all",
                  idx > 3 ? "hidden sm:inline-block" : "inline-block",
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
              className="inline-flex items-center justify-center rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] transition-all glass-strong text-[#00A9FF] hover:bg-[#e2e8f0] sm:hidden"
            >
              + Explore All
            </Link>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-x-6 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <Reveal key={item.id} delay={index * 0.06}>
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
          <div className="mt-10 flex flex-col items-start gap-4">
            <Link
              href="/portfolio"
              className="inline-flex h-12 w-full max-w-sm items-center justify-center rounded-full border border-black/8 bg-white px-6 text-sm font-bold text-[var(--foreground)] shadow-[0_16px_36px_rgba(14,30,37,0.06)] transition hover:-translate-y-0.5 hover:text-[var(--accent-strong)] sm:w-auto sm:max-w-none"
            >
              Explore All OneLinks
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
