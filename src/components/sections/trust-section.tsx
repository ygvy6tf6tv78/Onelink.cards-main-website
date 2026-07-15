import Image from "next/image";
import { trustHighlights } from "@/content/site";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionBadge } from "@/components/ui/section-badge";

const trustIcons = ["shield", "phone", "user", "bolt", "spark", "check"] as const;

export function TrustSection() {
  return (
    <section className="section-shell relative overflow-hidden bg-white px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-20">
      <div className="relative z-10 mx-auto max-w-7xl">
        <Reveal x={26} y={14}>
          <div className="text-center"><SectionBadge label="Why businesses trust OneLink" /></div>
          <h2 className="section-title-gradient font-display type-section-title mx-auto mt-4 max-w-3xl text-center">
            Built for reliable, real-world business use.
          </h2>
          <p className="type-section-copy mx-auto mt-4 max-w-3xl text-center text-[#64748b]">
            Secure infrastructure, thoughtful support and a flexible experience designed to keep your business available and easy to manage.
          </p>
        </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5">
            {trustHighlights.map((signal, index) => (
              <Reveal key={signal.title} delay={index * 0.06} x={index % 2 === 0 ? -26 : 26} y={14} className={index < 2 ? "lg:col-span-6" : "lg:col-span-3"}>
                <article className={index < 2
                  ? "group relative flex h-full min-h-[218px] flex-col items-start overflow-hidden rounded-[24px] border border-[#a8def8] bg-[linear-gradient(140deg,#ffffff_0%,#f4faff_52%,#e9f7ff_100%)] p-7 text-left shadow-[0_22px_56px_-40px_rgba(0,126,191,0.32)] transition duration-300 hover:-translate-y-1 hover:border-[#7ecff5] hover:shadow-[0_28px_64px_-40px_rgba(0,126,191,0.38)] sm:p-8"
                  : "group relative flex h-full min-h-[190px] flex-col items-start overflow-hidden rounded-[20px] border border-[#dfeaf2] bg-[linear-gradient(160deg,#ffffff_0%,#fbfdff_100%)] p-6 text-left shadow-[0_18px_48px_-40px_rgba(15,23,42,0.26)] transition duration-300 hover:-translate-y-1 hover:border-[#a9d9f2] hover:shadow-[0_24px_52px_-38px_rgba(0,126,191,0.24)]"}>
                  <div className="pointer-events-none absolute -right-12 -top-14 h-36 w-36 rounded-full bg-[#00A9FF]/[0.09] blur-2xl" />
                  {index === 0 ? <Image src="/Group%201000008683.png" alt="" width={520} height={120} className="pointer-events-none absolute -bottom-3 -right-16 w-[72%] rotate-[-7deg] opacity-[0.025]" aria-hidden="true" /> : null}
                  <div className="relative flex w-full items-start justify-between gap-4">
                    <div className={index < 2 ? "flex h-13 w-13 shrink-0 items-center justify-center rounded-[16px] border border-[#9edcff] bg-[#00A9FF] text-white shadow-[0_14px_28px_-16px_rgba(0,169,255,0.62)]" : "flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] bg-[linear-gradient(145deg,#eef9ff,#dff3ff)] text-[#00A9FF] shadow-[inset_0_0_0_1px_rgba(0,169,255,0.1)]"}>
                      <Icon name={trustIcons[index] ?? "check"} className={index < 2 ? "h-5 w-5" : "h-[18px] w-[18px]"} />
                    </div>
                    <span className="text-[10px] font-bold tracking-[0.14em] text-[#8da0b0]">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="relative mt-5">
                    <h3 className="type-card-title text-[#0f172a]">{signal.title}</h3>
                    <p className="type-card-copy mt-2 max-w-[46ch] text-[#64748b]">{signal.description}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
      </div>
    </section>
  );
}
