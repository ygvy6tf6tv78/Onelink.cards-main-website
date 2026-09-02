import Link from "next/link";
import { portfolioItems } from "@/content/portfolio";
import { PortfolioCard } from "@/components/portfolio/portfolio-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionBadge } from "@/components/ui/section-badge";
import { Icon } from "@/components/icons";
import Image from "next/image";

const featuredIds = ["burger-bazaar", "new-vision", "vastukar"];
const featuredItems = featuredIds.flatMap((id) => {
  const item = portfolioItems.find((portfolioItem) => portfolioItem.id === id);
  return item ? [item] : [];
});

const portfolioCategories = [
  { id: "restaurants", label: "Food & Cafés", previewId: "burger-bazaar" },
  { id: "clinics", label: "Clinics", previewId: "new-vision" },
  { id: "architects", label: "Architects", previewId: "vastukar" },
  { id: "retail", label: "Fashion", previewId: "darzies-couture" },
];

export function DemoShowcaseSection() {
  return (
    <section id="work" className="section-shell scroll-mt-28 bg-transparent px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <Reveal x={-28} y={14}>
          <div className="text-center">
            <div className="mx-auto max-w-7xl">
              <SectionBadge label="Portfolio" />
              <h2 className="section-title-gradient font-display mx-auto mt-4 max-w-[24ch] text-balance text-[30px] font-bold leading-[1.08] tracking-[-0.04em] sm:text-[36px] lg:text-[42px]">
                <span className="block">Built for real businesses.</span>
                <span className="block">Designed around every brand.</span>
              </h2>
              <div className="mx-auto mt-5 flex max-w-[720px] flex-wrap items-center justify-center gap-2 px-1 lg:max-w-none lg:flex-nowrap lg:gap-2.5">
                {portfolioCategories.map((category) => {
                  const preview = portfolioItems.find((item) => item.id === category.previewId)?.image;
                  return (
                  <Link
                    key={category.id}
                    href={`/portfolio?category=${category.id}`}
                    className="group inline-flex min-h-9 w-fit items-center justify-start gap-2 rounded-full border border-[#b9dbef] bg-[linear-gradient(145deg,rgba(255,255,255,0.98),rgba(235,247,255,0.94))] px-2.5 pr-3 text-left text-[12px] font-extrabold leading-none text-[#234d6d] shadow-[0_11px_24px_-18px_rgba(0,112,185,0.55)] backdrop-blur transition hover:-translate-y-0.5 hover:border-[#55afe5] hover:bg-white hover:text-[#008ed9] sm:min-h-10 sm:px-3 sm:pr-3.5 sm:text-[13px] lg:text-[14px]"
                  >
                    {preview ? <span className="relative h-6 w-6 shrink-0 overflow-hidden rounded-full border-2 border-white bg-[#e7f5ff] shadow-[0_6px_14px_-8px_rgba(0,80,140,0.55)]"><Image src={preview} alt="" fill sizes="24px" className="object-cover object-top transition-transform duration-300 group-hover:scale-105" /></span> : null}
                    <span>{category.label}</span>
                  </Link>
                  );
                })}
                <Link
                  href="/portfolio"
                  className="inline-flex min-h-9 w-fit items-center justify-center gap-1.5 rounded-full border border-[#00A9FF] bg-[#00A9FF] px-4 text-[12px] font-black text-white shadow-[0_12px_28px_-14px_rgba(0,169,255,0.72)] transition hover:-translate-y-0.5 hover:bg-[#008fd9] sm:min-h-10 sm:px-5 sm:text-[13px] lg:text-[14px]"
                >
                  View All
                  <Icon name="chevron-right" className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>

        </Reveal>

          <div className="mt-8 grid gap-x-5 gap-y-9 md:grid-cols-2 lg:mt-9 lg:grid-cols-3 lg:gap-x-5 xl:gap-x-6">
            {featuredItems.map((item, index) => (
              <Reveal key={item.id} delay={index * 0.07} x={index % 2 === 0 ? -30 : 30} y={16} className="relative z-10 md:last:col-span-2 md:last:mx-auto md:last:w-[calc(50%-10px)] lg:last:col-span-1 lg:last:mx-0 lg:last:w-auto">
                <PortfolioCard item={item} />
              </Reveal>
            ))}
          </div>

        <Reveal delay={0.12} x={24} y={10}>
          <div className="mt-8 flex items-center justify-center lg:mt-9">
            <Link
              href="/portfolio"
              className="group inline-flex h-12 w-[min(100%,280px)] items-center justify-center gap-2.5 rounded-full bg-[linear-gradient(135deg,#00A9FF,#0077FF)] px-7 text-[13px] font-extrabold text-white shadow-[0_18px_40px_-20px_rgba(0,135,225,0.62)] transition hover:-translate-y-0.5 hover:brightness-110 sm:w-auto"
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
