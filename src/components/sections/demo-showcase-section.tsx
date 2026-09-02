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
  { id: "restaurants", label: "Food & Cafés", previewId: "burger-bazaar" },
  { id: "architects", label: "Architects", previewId: "vastukar" },
  { id: "clinics", label: "Clinics", previewId: "new-vision" },
  { id: "retail", label: "Fashion", previewId: "darzies-couture" },
  { id: "salons", label: "Salons & Beauty", previewId: "veloura" },
  { id: "hotels", label: "Hotels", previewId: "metropolis-hotel" },
  { id: "startups", label: "Startups", previewId: "mera-halwai" },
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
                <span className="block">Built for real businesses.</span>
                <span className="block">Designed around every brand.</span>
              </h2>
              <div className="mx-auto mt-6 grid max-w-full grid-cols-2 gap-2 px-1 sm:flex sm:flex-nowrap sm:justify-center">
                {portfolioCategories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/portfolio?category=${category.id}`}
                    className="group inline-flex min-h-11 min-w-0 items-center justify-center rounded-full border border-[#b9dbef] bg-[linear-gradient(145deg,rgba(255,255,255,0.96),rgba(235,247,255,0.9))] px-3 text-center text-[12px] font-extrabold leading-[1.08] text-[#285373] shadow-[0_13px_28px_-18px_rgba(0,112,185,0.55)] backdrop-blur transition hover:-translate-y-0.5 hover:border-[#55afe5] hover:bg-white hover:text-[#087cbc] sm:min-h-10 sm:shrink-0 sm:px-4 sm:text-[12px] lg:px-4 lg:text-[13px]"
                  >
                    <span>{category.label}</span>
                  </Link>
                ))}
                <Link
                  href="/portfolio"
                  className="inline-flex min-h-11 min-w-0 items-center justify-center gap-1.5 rounded-full border border-[#8bc8e9] bg-[linear-gradient(145deg,rgba(255,255,255,0.98),rgba(225,244,255,0.94))] px-3 text-[12px] font-extrabold text-[#0874b7] shadow-[0_13px_28px_-18px_rgba(0,112,185,0.62)] transition hover:-translate-y-0.5 hover:border-[#329fdb] hover:bg-white sm:min-h-10 sm:shrink-0 sm:px-5 sm:text-[12px] lg:text-[13px]"
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
