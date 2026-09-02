import Link from "next/link";
import { portfolioItems } from "@/content/portfolio";
import { PortfolioCard } from "@/components/portfolio/portfolio-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionBadge } from "@/components/ui/section-badge";
import { Icon } from "@/components/icons";

const featuredIds = ["burger-bazaar", "new-vision", "vastukar"];
const featuredItems = featuredIds.flatMap((id) => {
  const item = portfolioItems.find((portfolioItem) => portfolioItem.id === id);
  return item ? [item] : [];
});

const portfolioCategories = [
  { id: "restaurants", label: "Food & Cafés", icon: "menu" as const },
  { id: "architects", label: "Architects", icon: "building" as const },
  { id: "clinics", label: "Clinics", icon: "form" as const },
  { id: "retail", label: "Fashion", icon: "wallet" as const },
  { id: "salons", label: "Salons & Beauty", icon: "spark" as const },
  { id: "hotels", label: "Hotels", icon: "building" as const },
  { id: "startups", label: "Startups", icon: "bolt" as const },
];

export function DemoShowcaseSection() {
  return (
    <section id="work" className="section-shell scroll-mt-28 bg-[linear-gradient(180deg,#ffffff_0%,#f5f9fd_46%,#edf5ff_100%)] px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-18">
      <div className="mx-auto max-w-7xl">
        <Reveal x={-28} y={14}>
          <div className="text-center">
            <div className="mx-auto max-w-5xl">
              <SectionBadge label="Portfolio" />
              <h2 className="section-title-gradient font-display mx-auto mt-4 max-w-[24ch] text-balance text-[30px] font-bold leading-[1.08] tracking-[-0.04em] sm:text-[36px] lg:text-[42px]">
                Built for real businesses. Designed around every brand.
              </h2>
              <div className="mx-auto mt-6 grid max-w-full grid-cols-4 gap-1.5 px-1 sm:flex sm:flex-nowrap sm:justify-center">
                {portfolioCategories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/portfolio?category=${category.id}`}
                    className="group inline-flex min-h-[52px] min-w-0 items-center justify-center gap-1 rounded-full border border-[#b7d9ef] bg-[linear-gradient(180deg,#f5fbff_0%,#eaf6fd_100%)] px-2 py-2 text-center text-[10px] font-extrabold leading-[1.05] text-[#285373] shadow-[0_10px_26px_-20px_rgba(0,105,175,0.42)] transition hover:-translate-y-0.5 hover:border-[#55afe5] hover:bg-[#e3f4ff] hover:text-[#087cbc] sm:min-h-9 sm:shrink-0 sm:gap-1.5 sm:px-3 sm:py-2 sm:text-[11px] lg:px-3.5 lg:text-[12px]"
                  >
                    <Icon name={category.icon} className="hidden h-3.5 w-3.5 shrink-0 text-[#159bdc] transition-transform group-hover:scale-110 min-[390px]:block" />
                    <span className="max-w-[72px] sm:max-w-none">{category.label}</span>
                  </Link>
                ))}
                <Link
                  href="/portfolio"
                  className="inline-flex min-h-[54px] min-w-0 scale-[1.035] items-center justify-center gap-1 rounded-full border border-[#3ba6e8] bg-[linear-gradient(135deg,#053b78,#087fc7)] px-2 py-2 text-[10px] font-black text-white shadow-[0_16px_32px_-16px_rgba(7,77,139,0.82)] ring-2 ring-[#d8f1ff] transition hover:-translate-y-0.5 hover:brightness-110 sm:min-h-10 sm:shrink-0 sm:scale-100 sm:gap-1.5 sm:px-5 sm:py-2 sm:text-[11px] lg:text-[12px]"
                >
                  View All
                  <Icon name="chevron-right" className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>

        </Reveal>

          <div className="mt-10 grid gap-x-5 gap-y-9 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-5 xl:gap-x-6">
            {featuredItems.map((item, index) => (
              <Reveal key={item.id} delay={index * 0.07} x={index % 2 === 0 ? -30 : 30} y={16} className="relative z-10 md:last:col-span-2 md:last:mx-auto md:last:w-[calc(50%-10px)] lg:last:col-span-1 lg:last:mx-0 lg:last:w-auto">
                <PortfolioCard item={item} />
              </Reveal>
            ))}
          </div>

        <Reveal delay={0.12} x={24} y={10}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/book"
              className="group inline-flex h-12 w-[min(100%,280px)] items-center justify-center gap-2.5 rounded-[13px] bg-[linear-gradient(135deg,#09223E_0%,#064083_52%,#0077FF_100%)] px-7 text-[13px] font-extrabold text-white shadow-[0_18px_40px_-20px_rgba(0,91,190,0.7)] transition hover:-translate-y-0.5 hover:brightness-110 sm:w-auto"
            >
              Book a Free Demo
              <Icon name="calendar" className="h-4 w-4" />
            </Link>
            <Link
              href="/portfolio"
              className="group inline-flex h-12 w-[min(100%,280px)] items-center justify-center gap-2.5 rounded-[13px] border-2 border-[#168fd4] bg-white px-7 text-[13px] font-extrabold text-[#075a9f] shadow-[0_18px_40px_-22px_rgba(0,91,150,0.52)] transition hover:-translate-y-0.5 hover:bg-[#f0f9ff] sm:w-auto"
            >
              View All Portfolio
              <Icon name="chevron-right" className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
