import Image from "next/image";
import { trustHighlights } from "@/content/site";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionBadge } from "@/components/ui/section-badge";

const trustIcons = ["shield", "phone", "user", "bolt", "spark", "check"] as const;

export function TrustSection() {
  return (
    <section className="section-shell relative overflow-hidden bg-[#f6f9fc] px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-20">
      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[30px] border border-[#dce7ef] bg-white shadow-[0_30px_80px_-58px_rgba(15,23,42,0.4)]">
          <Reveal x={26} y={14}>
            <div className="border-b border-[#e5edf3] px-6 py-8 sm:px-9 lg:flex lg:items-end lg:justify-between lg:gap-10">
              <div><SectionBadge label="Why businesses trust OneLink" /><h2 className="section-title-gradient font-display type-section-title mt-4 max-w-2xl">Built for reliable, real-world business use.</h2></div>
              <p className="type-section-copy mt-4 max-w-xl text-[#64748b] lg:mt-0">Secure infrastructure, thoughtful support and a flexible experience designed to keep your business available and easy to manage.</p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3">
            {trustHighlights.map((signal, index) => (
              <Reveal key={signal.title} delay={index * 0.05} y={10}>
                <article className="group relative flex h-full min-h-[176px] flex-col items-start border-b border-r border-[#e5edf3] p-6 text-left transition hover:bg-[#f7fbfe] sm:p-7">
                  {index === 0 ? <Image src="/onelink-primary-logo.png" alt="" width={10895} height={2720} className="pointer-events-none absolute -bottom-3 -right-16 w-[72%] rotate-[-7deg] opacity-[0.025]" aria-hidden="true" /> : null}
                  <div className="relative flex w-full items-start justify-between gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] bg-[#eaf6ff] text-[#087cbc] ring-1 ring-[#cce8f8]">
                      <Icon name={trustIcons[index] ?? "check"} className="h-[18px] w-[18px]" />
                    </div>
                    <span className="text-[10px] font-bold tracking-[0.14em] text-[#8da0b0]">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="relative mt-4">
                    <h3 className="type-card-title text-[#0f172a]">{signal.title}</h3>
                    <p className="type-card-copy mt-2 max-w-[46ch] text-[#64748b]">{signal.description}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
