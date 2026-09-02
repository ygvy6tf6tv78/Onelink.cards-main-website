import { howItWorksSteps } from "@/content/site";
import { Reveal } from "@/components/ui/reveal";
import { SectionBadge } from "@/components/ui/section-badge";

const stepOutputs = ["Plan selected", "Details received", "Design prepared", "Ready to share"];

export function AfterBookingSection() {
  return (
    <section id="how-it-works" className="section-shell relative scroll-mt-28 overflow-hidden bg-white px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-20">
      <div className="relative mx-auto max-w-7xl">
        <Reveal x={-26} y={14}>
          <div className="mx-auto max-w-3xl text-center">
            <SectionBadge label="How It Works" />
            <h2 className="section-title-gradient font-display type-section-title mt-4 lg:whitespace-nowrap">
              From setup to launch, we keep it simple.
            </h2>
            <p className="type-section-copy mx-auto mt-4 max-w-2xl text-[#64748b]">
              A clear four-step process, guided by our team from your first choice to the final launch.
            </p>
          </div>
        </Reveal>

        <div className="relative mt-10 overflow-hidden rounded-[26px] border border-[#dce7ef] bg-[#fbfdff] shadow-[0_24px_64px_-52px_rgba(15,23,42,0.34)] md:grid md:grid-cols-2 xl:grid-cols-4">
          {howItWorksSteps.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.06} x={index % 2 === 0 ? -26 : 26} y={14}>
              <article className="group relative flex h-full min-h-[210px] flex-col border-b border-[#e2ebf2] bg-white/70 p-6 text-left transition hover:bg-[#f3f9fd] md:border-r xl:border-b-0 sm:p-7">
                <div className="flex items-center justify-between gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-[#09223E] text-[13px] font-extrabold text-white shadow-[0_12px_24px_-16px_rgba(9,34,62,0.7)]">{index + 1}</span>
                  <span className="text-[9px] font-extrabold uppercase tracking-[0.11em] text-[#7a8999]">{stepOutputs[index]}</span>
                </div>
                <h3 className="type-card-title mt-7 text-[#0f172a]">{step.title}</h3>
                <p className="type-card-copy mt-2.5 max-w-[32ch] text-[#64748b]">{step.description}</p>
                <div className="mt-auto pt-6 text-[11px] font-extrabold text-[#087cbc]">Step {String(index + 1).padStart(2, "0")}</div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
