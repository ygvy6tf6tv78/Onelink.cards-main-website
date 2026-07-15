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

        <div className="relative mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4 xl:gap-5">
          {howItWorksSteps.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.06} x={index % 2 === 0 ? -26 : 26} y={14}>
              <article className="group relative flex h-full min-h-[238px] flex-col overflow-hidden rounded-[22px] border border-[#dce8f0] bg-[linear-gradient(155deg,#ffffff_0%,#fbfdff_58%,#f4faff_100%)] p-6 text-left shadow-[0_22px_56px_-44px_rgba(15,23,42,0.32)] transition duration-300 hover:-translate-y-1 hover:border-[#9dd8f5] hover:shadow-[0_28px_64px_-42px_rgba(0,126,191,0.26)] sm:p-7">
                <div className="pointer-events-none absolute -right-8 -top-12 font-display text-[8rem] font-bold leading-none tracking-[-0.08em] text-[#00A9FF]/[0.035]" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="relative flex items-center justify-between gap-3">
                  <span className="inline-flex rounded-full border border-[#bde7fb] bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#087cbc] shadow-[0_8px_22px_-18px_rgba(0,126,191,0.5)]">
                    Step {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-right text-[10px] font-bold uppercase tracking-[0.08em] text-[#7a8999]">{stepOutputs[index]}</span>
                </div>
                <h3 className="type-card-title relative mt-8 text-[#0f172a]">{step.title}</h3>
                <p className="type-card-copy relative mt-3 max-w-[32ch] text-[#64748b]">{step.description}</p>
                <div className="relative mt-auto flex items-center gap-1.5 pt-6" aria-hidden="true">
                  {howItWorksSteps.map((_, progressIndex) => (
                    <span key={progressIndex} className={progressIndex <= index ? "h-1.5 flex-1 rounded-full bg-[#00A9FF]" : "h-1.5 flex-1 rounded-full bg-[#dcecf5]"} />
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
