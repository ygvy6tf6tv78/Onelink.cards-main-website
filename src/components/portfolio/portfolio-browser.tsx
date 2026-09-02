"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { portfolioItems, type PortfolioItem } from "@/content/portfolio";
import { PortfolioCard } from "@/components/portfolio/portfolio-card";
import { Reveal } from "@/components/ui/reveal";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/utils";
import type { IconName } from "@/content/site";

type CategoryFilter = {
  id: string;
  label: string;
  ids: string[] | null;
  icon: IconName;
};

const allWorkOrder = [
  "burger-bazaar",
  "new-vision",
  "vastukar",
  "darzies-couture",
  "poshak-e-hoor",
  "veloura",
  "mango",
  "jay-ess",
  "sonnet-cafe",
  "smile-health-clinic",
  "metropolis-hotel",
  "ca-ramit",
  "honey-fresh",
  "honey-money",
  "mera-halwai",
  "lingua-vibe",
] as const;

const categoryFilters: CategoryFilter[] = [
  { id: "all", label: "All Work", ids: null, icon: "spark" },
  { id: "restaurants", label: "Food & Cafés", ids: ["burger-bazaar", "mango", "sonnet-cafe"], icon: "menu" },
  { id: "architects", label: "Architects", ids: ["vastukar"], icon: "building" },
  { id: "clinics", label: "Clinics", ids: ["new-vision", "smile-health-clinic"], icon: "form" },
  { id: "retail", label: "Fashion", ids: ["darzies-couture", "poshak-e-hoor"], icon: "wallet" },
  { id: "salons", label: "Salons & Beauty", ids: ["veloura"], icon: "spark" },
  { id: "hotels", label: "Hotels", ids: ["metropolis-hotel"], icon: "building" },
  { id: "startups", label: "Startups", ids: ["mera-halwai"], icon: "bolt" },
  { id: "cas", label: "Finance", ids: ["ca-ramit"], icon: "invoice" },
  { id: "professional", label: "Business Services", ids: ["ca-ramit", "jay-ess"], icon: "form" },
  { id: "products", label: "Product Brands", ids: ["honey-fresh", "honey-money"], icon: "gallery" },
  { id: "education", label: "Education", ids: ["lingua-vibe"], icon: "chart" },
  { id: "custom", label: "Other Businesses", ids: [], icon: "spark" },
] as const;

const mobilePrimaryFilterIds = ["all", "restaurants", "architects", "clinics", "hotels", "retail", "education"];

const categoryPreviewIds: Record<string, string> = {
  restaurants: "burger-bazaar",
  architects: "vastukar",
  clinics: "new-vision",
  retail: "darzies-couture",
  salons: "veloura",
  hotels: "metropolis-hotel",
  startups: "mera-halwai",
  cas: "ca-ramit",
  professional: "jay-ess",
  products: "honey-fresh",
  education: "lingua-vibe",
  custom: "honey-money",
};

export function PortfolioCategoryPicker() {
  const [showAllCategories, setShowAllCategories] = useState(false);
  const searchParams = useSearchParams();
  const requestedFilter = searchParams.get("category");
  const activeFilter = categoryFilters.some((filter) => filter.id === requestedFilter) && requestedFilter ? requestedFilter : "all";
  const showExpandedMobileFilters = showAllCategories || !mobilePrimaryFilterIds.includes(activeFilter);
  const mobileFilters = showExpandedMobileFilters
    ? categoryFilters
    : mobilePrimaryFilterIds.map((id) => categoryFilters.find((filter) => filter.id === id)).filter((filter): filter is CategoryFilter => Boolean(filter));

  return (
    <div className="mt-4 border-t border-white/15 pt-4 lg:w-[820px]">
      <div className="flex flex-wrap justify-center gap-2 lg:hidden">
        {mobileFilters.map((filter) => (
          <CategoryBadge key={filter.id} filter={filter} active={activeFilter === filter.id} />
        ))}
        <button
          type="button"
          onClick={() => setShowAllCategories((shown) => !shown)}
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full border border-[#b9daf0] bg-[#eff8ff] px-4 text-[12px] font-extrabold text-[#0875b8] shadow-[0_10px_22px_-18px_rgba(0,76,137,0.48)] transition hover:-translate-y-0.5 hover:border-[#54afe1]"
          aria-expanded={showExpandedMobileFilters}
        >
          {showExpandedMobileFilters ? "View Less" : "View All Categories"}
          <Icon name="chevron-right" className={cn("h-3.5 w-3.5 rotate-90 transition", showExpandedMobileFilters && "-rotate-90")} />
        </button>
      </div>
      <div className="hidden grid-cols-4 gap-2 lg:grid">
        {[...categoryFilters.filter((filter) => filter.id !== "all"), categoryFilters[0]].map((filter) => (
          <CategoryBadge key={filter.id} filter={filter} active={activeFilter === filter.id} />
        ))}
      </div>
    </div>
  );
}

function CategoryBadge({ filter, active }: { filter: CategoryFilter; active: boolean }) {
  const previewImage = portfolioItems.find((item) => item.id === categoryPreviewIds[filter.id])?.image;
  return (
    <Link
      href={filter.id === "all" ? "/portfolio" : `/portfolio?category=${filter.id}`}
      aria-current={active ? "page" : undefined}
      className={cn(
        "inline-flex min-h-10 flex-auto items-center justify-center gap-1.5 rounded-full border px-3 py-1.5 text-center text-[12px] font-bold tracking-[-0.01em] transition lg:min-h-11 lg:w-full lg:flex-none lg:justify-start lg:gap-2 lg:rounded-[14px] lg:px-2.5 lg:text-left lg:text-[13px] lg:font-extrabold lg:uppercase lg:tracking-[0.035em]",
        active
          ? "border-[#48b8f5] bg-[linear-gradient(135deg,#0753a2_0%,#087dd1_100%)] text-white shadow-[0_12px_28px_-15px_rgba(0,35,90,0.85)]"
          : "border-[#73c6f5] bg-[linear-gradient(135deg,#ffffff_0%,#f0f9ff_58%,#e4f4ff_100%)] text-[#173f64] shadow-[0_8px_20px_-16px_rgba(0,76,137,0.45)] hover:-translate-y-0.5 hover:border-[#299ee4] hover:bg-[#f4fbff]",
      )}
    >
      <span className={cn("relative inline-flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-full ring-1 lg:h-8 lg:w-8", active ? "bg-white/18 text-white ring-white/35" : "bg-[#e8f5ff] text-[#087bd0] ring-[#c7e7fb]")}>
        {previewImage ? <Image src={previewImage} alt="" fill sizes="32px" className="object-cover object-top" aria-hidden="true" /> : <Image src="/onelink-logomark.png" alt="" width={20} height={26} className="h-4 w-auto object-contain" aria-hidden="true" />}
      </span>
      <span className="min-w-0 leading-[1.15] whitespace-nowrap">{filter.label}</span>
    </Link>
  );
}

export function PortfolioBrowser({ items }: { items: PortfolioItem[] }) {
  const searchParams = useSearchParams();
  const requestedFilter = searchParams.get("category");
  const activeFilter = categoryFilters.some((filter) => filter.id === requestedFilter) && requestedFilter
    ? requestedFilter
    : "all";


  const visibleItems = useMemo(() => {
    const filter = categoryFilters.find((item) => item.id === activeFilter);
    if (!filter || filter.ids === null) {
      return allWorkOrder
        .map((id) => items.find((item) => item.id === id))
        .filter((item): item is PortfolioItem => Boolean(item));
    }
    const ids = filter.ids;
    if (ids.length === 0) return [];
    return ids
      .map((id) => items.find((item) => item.id === id))
      .filter((item): item is PortfolioItem => Boolean(item));
  }, [activeFilter, items]);

  return (
    <>
      {visibleItems.length > 0 ? (
        <div id="portfolio-browser" className="mt-8 scroll-mt-28 grid gap-x-5 gap-y-12 md:grid-cols-2 lg:grid-cols-3 xl:gap-x-7">
          {visibleItems.map((item, index) => (
            <Reveal key={`${activeFilter}-${item.id}`} delay={index * 0.025} alwaysShow>
              <PortfolioCard item={item} />
            </Reveal>
          ))}
        </div>
      ) : (
        <div id="portfolio-browser" className="mt-8 scroll-mt-28 rounded-[28px] border border-dashed border-[#bfdbfe] bg-white/70 px-6 py-10 text-left shadow-[0_24px_70px_-46px_rgba(15,23,42,0.22)]">
          {activeFilter === "custom" ? (
            <>
              <p className="text-[13px] font-bold uppercase tracking-[0.16em] text-[#0369A1]">Custom setup</p>
              <h2 className="mt-2 text-[26px] font-bold tracking-tight text-[#111827]">Need a OneLink for your own business category?</h2>
              <p className="mt-2 max-w-xl text-[14px] font-semibold leading-relaxed text-[#64748B]">
                Contact us for a tailored business page for your category. We can build custom solutions for Hotels, Weddings, Real Estate, and any other specific business need.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="tel:+919876543210"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#111827] px-6 text-sm font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                  Call Now
                </a>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 text-sm font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                  WhatsApp
                </a>
              </div>
            </>
          ) : (
            <>
              <p className="text-[13px] font-bold uppercase tracking-[0.16em] text-[#0369A1]">Coming next</p>
              <h2 className="mt-2 text-[26px] font-bold tracking-tight text-[#111827]">More OneLinks are being added.</h2>
              <p className="mt-2 max-w-xl text-[14px] font-semibold leading-relaxed text-[#64748B]">
                This category is ready in the portfolio system. Add live links and they will appear here.
              </p>
            </>
          )}
        </div>
      )}
    </>
  );
}
