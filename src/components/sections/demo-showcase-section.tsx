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
    <section id="work" className="section-shell scroll-mt-28 bg-transparent px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-18">
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
                    className="group inline-flex h-8 min-w-0 items-center justify-center gap-1 rounded-full border border-[#c5ddeb] bg-white/72 px-1.5 text-center text-[8px] font-extrabold leading-[1.02] text-[#285373] shadow-[0_8px_18px_-17px_rgba(0,88,145,0.42)] backdrop-blur transition hover:-translate-y-0.5 hover:border-[#55afe5] hover:bg-white hover:text-[#087cbc] sm:h-auto sm:min-h-9 sm:shrink-0 sm:gap-1.5 sm:px-3 sm:py-2 sm:text-[11px] lg:px-3.5 lg:text-[12px]"
                  >
                    <span className="hidden h-5 w-5 shrink-0 place-items-center rounded-full bg-[linear-gradient(145deg,#e5f6ff,#ffffff)] text-[#159bdc] ring-1 ring-[#cce8f7] min-[390px]:grid"><Icon name={category.icon} className="h-3 w-3 transition-transform group-hover:scale-110" /></span>
                    <span className="max-w-[68px] sm:max-w-none">{category.label}</span>
                  </Link>
                ))}
                <Link
                  href="/portfolio"
                  className="inline-flex h-9 min-w-0 items-center justify-center gap-1 rounded-full border border-[#2497da] bg-[linear-gradient(135deg,#064585,#087aba)] px-2 text-[9px] font-black text-white shadow-[0_12px_24px_-16px_rgba(7,77,139,0.78)] ring-1 ring-[#ccecff] transition hover:-translate-y-0.5 hover:brightness-110 sm:h-auto sm:min-h-10 sm:shrink-0 sm:gap-1.5 sm:px-5 sm:py-2 sm:text-[11px] lg:text-[12px]"
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
          <div className="mt-10 flex items-center justify-center">
            <Link
              href="/portfolio"
              className="group inline-flex h-12 w-[min(100%,280px)] items-center justify-center gap-2.5 rounded-full bg-[linear-gradient(135deg,#064585,#087aba)] px-7 text-[13px] font-extrabold text-white shadow-[0_18px_40px_-20px_rgba(0,91,150,0.58)] transition hover:-translate-y-0.5 hover:brightness-110 sm:w-auto"
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
