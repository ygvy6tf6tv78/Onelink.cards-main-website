import { howItWorksSteps } from "@/content/site";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/ui/reveal";

const stepIcons = ["wallet", "phone", "spark", "eye"] as const;

export function AfterBookingSection() {
  return (
    <section id="how-it-works" className="section-shell relative scroll-mt-28 overflow-hidden bg-[#f7fafc] px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-18">
      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow">How it works</span>
            <h2 className="font-display type-section-title mt-4 text-[#0f172a] lg:whitespace-nowrap">
              From plan to launch, simple and clear.
            </h2>
            <p className="type-section-copy mx-auto mt-4 max-w-[52ch] text-[#5f6b7a]">
              Four focused steps, with a real team guiding you from selection to launch.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid overflow-hidden rounded-[18px] border border-slate-900/[0.08] bg-white/72 shadow-[0_26px_64px_-52px_rgba(15,23,42,0.28)] md:grid-cols-2 xl:grid-cols-4">
          {howItWorksSteps.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.06}>
              <article className="group relative h-full px-6 py-7 transition-colors duration-300 hover:bg-white md:border-r md:border-slate-900/[0.07] xl:px-7 xl:py-8 xl:last:border-r-0">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-display text-[32px] font-bold leading-none tracking-[-0.05em] text-[#00A9FF]/42 transition-colors group-hover:text-[#00A9FF]">{step.number}</span>
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-[#eaf7fe] text-[#087cbc]">
                    <Icon name={stepIcons[index] ?? "check"} className="h-4 w-4" />
                  </span>
                </div>
                <h3 className="type-card-title mt-6 text-[#0f172a]">{step.title}</h3>
                <p className="type-card-copy mt-2.5 max-w-[34ch] text-[#64748b]">{step.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
