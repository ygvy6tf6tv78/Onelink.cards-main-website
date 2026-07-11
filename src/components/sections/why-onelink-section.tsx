import Image from "next/image";
import { whyOneLinkBenefits } from "@/content/site";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/ui/reveal";
import { FILM_GRAIN_SVG } from "@/lib/textures";

const benefitIcons = ["spark", "bolt", "building", "shield"] as const;

const pillarPoints = [
  "Executive-grade presence for any industry",
  "One journey from discovery to call, book, or pay",
  "Retail, wellness, healthcare, and professional firms",
] as const;

const industryStrip =
  "Hospitals · Clinics · Salons · Spas · Gyms · Retail · CA firms · Law offices · Consultants · Brands";

function WhyOnelinkShowcasePanel({ className }: { className?: string }) {
  return (
    <div
      className={`relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-[28px] border border-sky-200/50 bg-[linear-gradient(165deg,#f8fbff_0%,#ffffff_38%,#e8f2f9_100%)] shadow-[0_28px_70px_-36px_rgba(14,100,160,0.22)] ring-1 ring-white/80 ${className ?? ""}`}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_75%_at_50%_35%,rgba(0,169,255,0.11),transparent_72%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-soft-light"
        style={{
          backgroundImage: `url("${FILM_GRAIN_SVG}")`,
          backgroundRepeat: "repeat",
          backgroundSize: "180px 180px",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(224,242,254,0.35)_0%,transparent_50%,rgba(186,230,253,0.18)_100%)] mix-blend-multiply"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white/90 to-transparent" aria-hidden />

      <div className="relative z-[1] flex flex-1 flex-col justify-center px-3 py-6 sm:px-5 sm:py-8">
        <p className="text-center text-[10px] font-bold uppercase tracking-[0.24em] text-[#0284c7] sm:text-[11px]">
          Every sector · Same premium standard
        </p>
        <div className="relative mx-auto mt-4 h-[220px] w-full max-w-[520px] sm:mt-5 sm:h-[280px] lg:h-[300px] xl:h-[320px]">
          <Image
            src="/enterprise-mockup.png"
            alt="OneLink mobile pages for retail, healthcare, wellness, and professional services"
            fill
            sizes="(max-width: 1024px) 92vw, 520px"
            quality={95}
            className="origin-center scale-[1.08] object-contain object-center drop-shadow-[0_28px_60px_-24px_rgba(15,23,42,0.2)] sm:scale-[1.1] lg:scale-[1.12]"
          />
        </div>
      </div>
    </div>
  );
}

export function WhyOneLinkSection() {
  return (
    <section className="section-shell relative overflow-hidden bg-[#eef5f9] px-4 py-[4.25rem] sm:px-6 sm:py-24 lg:px-8 lg:py-[5.75rem]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[420px] w-[min(1000px,95vw)] -translate-x-1/2 bg-[radial-gradient(ellipse_at_center,rgba(0,169,255,0.09),rgba(0,169,255,0.02)_50%,transparent_72%)]" />
        <div className="absolute -left-[10%] bottom-[5%] h-[280px] w-[280px] rounded-full bg-[#00A9FF]/6 blur-[100px]" />
        <div className="absolute -right-[8%] top-[20%] h-[240px] w-[240px] rounded-full bg-cyan-300/10 blur-[90px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <header className="mx-auto max-w-3xl text-center lg:mx-0 lg:max-w-none lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#00A9FF]/15 bg-white/95 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#0369a1] shadow-[0_8px_30px_-14px_rgba(0,169,255,0.35)] backdrop-blur-sm sm:text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00A9FF]" aria-hidden />
              Why OneLink
            </span>
            <h2 className="font-display mx-auto mt-5 max-w-[20ch] text-[2rem] font-semibold leading-[1.08] tracking-[-0.06em] text-[#0c1222] sm:max-w-none sm:text-[2.65rem] lg:mx-0 lg:text-[3rem] xl:text-[3.15rem]">
              Why businesses choose OneLink.
            </h2>
            <p className="mx-auto mt-4 max-w-[46ch] text-[15px] font-medium leading-relaxed text-[#5f6b7a] sm:mt-5 sm:max-w-[52ch] sm:text-[17px] lg:mx-0 lg:max-w-[56ch]">
              One refined page replaces scattered links — for hospitals, clinics, salons, spas, gyms, retail, and every
              serious local brand. Equally built for working professionals: CAs, lawyers, consultants, and firms who
              need credibility the moment someone opens their link.
            </p>
            <p className="mx-auto mt-4 max-w-[52ch] text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-[#7c8c9c] sm:mt-5 sm:text-[12px] lg:text-left">
              {industryStrip}
            </p>
          </header>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="mx-auto mt-9 grid max-w-3xl gap-3 sm:mt-10 sm:grid-cols-3 lg:mx-0 lg:max-w-none">
            {pillarPoints.map((text) => (
              <div
                key={text}
                className="flex items-start gap-3 rounded-[18px] border border-white/80 bg-white/85 px-4 py-3.5 shadow-[0_12px_40px_-28px_rgba(15,23,42,0.12)] backdrop-blur-sm sm:flex-col sm:items-center sm:text-center sm:px-4 sm:py-4 lg:flex-row lg:items-start lg:text-left"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#e0f2fe] text-[#00A9FF] ring-1 ring-[#bae6fd]/80">
                  <Icon name="check" className="h-4 w-4" />
                </span>
                <p className="text-left text-[13px] font-semibold leading-snug text-[#334155] sm:text-center lg:text-left">{text}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-12 lg:items-stretch lg:gap-10">
          <Reveal className="lg:col-span-5 lg:row-span-1" delay={0.08}>
            <div className="lg:sticky lg:top-28">
              <WhyOnelinkShowcasePanel />
            </div>
          </Reveal>

          <div className="flex flex-col gap-4 lg:col-span-7">
            <p className="text-center text-[11px] font-bold uppercase tracking-[0.22em] text-[#64748b] lg:text-left">
              Four reasons it works
            </p>
            <div className="grid gap-4 sm:gap-5">
              {whyOneLinkBenefits.map((item, index) => (
                <Reveal key={item.title} delay={0.04 + index * 0.05}>
                  <article className="group relative overflow-hidden rounded-[22px] border border-[#d8e8f2] bg-white py-5 pl-5 pr-5 shadow-[0_16px_44px_-32px_rgba(15,23,42,0.18)] transition duration-300 hover:border-[#93c5e8]/90 hover:shadow-[0_22px_50px_-28px_rgba(0,169,255,0.12)] sm:flex sm:gap-5 sm:py-6 sm:pl-6 sm:pr-6">
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-[linear-gradient(180deg,#00A9FF,#38bdf8)] opacity-90" aria-hidden />
                    <div className="flex shrink-0 items-start justify-between gap-3 sm:block sm:w-[4.5rem]">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f0f9ff] text-[#00A9FF] ring-1 ring-[#bae6fd]/90 sm:mx-auto sm:h-12 sm:w-12">
                        <Icon name={benefitIcons[index] ?? "check"} className="h-5 w-5" />
                      </span>
                      <span className="rounded-lg bg-[#f1f5f9] px-2 py-0.5 text-[10px] font-bold tabular-nums text-[#64748b] sm:mt-3 sm:block sm:w-fit sm:px-2.5 sm:py-1 sm:text-center">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="mt-4 min-w-0 sm:mt-0 sm:flex-1">
                      <h3 className="font-display text-[1.15rem] font-semibold tracking-[-0.04em] text-[#0f172a] sm:text-[1.25rem]">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-[14px] leading-[1.7] text-[#5f6b7a] sm:text-[15px]">{item.description}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
