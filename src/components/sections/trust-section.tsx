import { trustHighlights } from "@/content/site";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/ui/reveal";
import { BrandMark } from "@/components/ui/brand-mark";

const trustIcons = ["shield", "invoice", "user", "bolt"] as const;

export function TrustSection() {
  return (
    <section className="section-shell relative overflow-hidden px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="relative z-10 mx-auto max-w-7xl overflow-hidden rounded-[26px] border border-white/10 bg-[linear-gradient(135deg,#03182d_0%,#06365e_52%,#07517d_100%)] p-7 text-white shadow-[0_34px_90px_-54px_rgba(3,31,58,0.8)] sm:p-9 lg:p-12">
        <div className="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full bg-[#00A9FF]/16 blur-3xl" />
        <div className="relative grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-16">
          <Reveal>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] py-1 pl-1 pr-3">
                <BrandMark className="h-6 w-6 rounded-[8px] border-white/10 bg-white shadow-none" imageClassName="w-[13px]" alt="" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.09em] text-[#9bddff]">Trust & support</span>
              </div>
              <h2 className="font-display type-section-title mt-4 max-w-[18ch] text-white">
                Built for reliability and long-term use.
              </h2>
              <p className="type-section-copy mt-5 max-w-[42ch] text-white/66">
                Clear ownership, dependable infrastructure and a real team behind every OneLink.
              </p>
              <div className="mt-7 flex flex-wrap gap-2.5">
                {['Managed hosting', 'Clear pricing', 'Human support'].map((label) => (
                  <span key={label} className="rounded-full border border-white/10 bg-white/[0.055] px-3 py-1.5 text-[11px] font-semibold text-white/76">{label}</span>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {trustHighlights.map((signal, index) => (
              <Reveal key={signal.title} delay={index * 0.06} y={16}>
                <article className="group flex h-full min-h-[148px] gap-4 rounded-[17px] border border-white/[0.11] bg-[linear-gradient(145deg,rgba(255,255,255,0.09),rgba(255,255,255,0.035))] p-5 transition duration-300 hover:-translate-y-1 hover:border-[#4dc4ff]/35 hover:bg-white/[0.09]">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] border border-[#44c2ff]/20 bg-[#00A9FF]/10 text-[#54c8ff]">
                    <Icon name={trustIcons[index] ?? "check"} className="h-[18px] w-[18px]" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.09em] text-white/38">0{index + 1}</p>
                    <h3 className="type-card-title mt-1.5 text-white">{signal.title}</h3>
                    <p className="type-card-copy mt-2.5 text-white/64">{signal.description}</p>
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
