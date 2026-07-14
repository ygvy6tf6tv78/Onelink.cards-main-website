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

        <div className="relative mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4 xl:gap-6">
          {howItWorksSteps.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.06} x={index % 2 === 0 ? -26 : 26} y={14}>
              <article className="group relative flex h-full min-h-[250px] flex-col overflow-hidden rounded-[22px] border border-[#dceaf3] bg-white p-6 text-left shadow-[0_22px_56px_-44px_rgba(15,23,42,0.34)] transition duration-300 hover:-translate-y-1 hover:border-[#9dd8f5] hover:shadow-[0_28px_64px_-42px_rgba(0,126,191,0.28)] sm:p-7">
                <div className="pointer-events-none absolute -right-12 -top-14 h-32 w-32 rounded-full bg-[#00A9FF]/[0.07] blur-3xl" />
                <span className="relative text-[11px] font-bold uppercase tracking-[0.15em] text-[#00A9FF]">Step {index + 1}</span>
                <h3 className="type-card-title relative mt-6 text-[#0f172a]">{step.title}</h3>
                <p className="type-card-copy relative mt-3 max-w-[32ch] text-[#64748b]">{step.description}</p>
                <div className="relative mt-auto pt-6 text-[11px] font-bold uppercase tracking-[0.09em] text-[#526173]">
                  {stepOutputs[index]}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
