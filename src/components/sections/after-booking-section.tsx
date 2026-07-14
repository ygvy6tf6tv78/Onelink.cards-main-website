import { howItWorksSteps } from "@/content/site";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionBadge } from "@/components/ui/section-badge";

const stepIcons = ["wallet", "phone", "spark", "eye"] as const;
const stepOutputs = ["Plan selected", "Details received", "Design prepared", "Ready to share"];

export function AfterBookingSection() {
  return (
    <section id="how-it-works" className="section-shell relative scroll-mt-28 overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="relative mx-auto max-w-7xl">
        <Reveal>
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
          <div className="pointer-events-none absolute left-[11%] right-[11%] top-[39px] hidden h-px bg-[linear-gradient(90deg,transparent,#b7e3f9_12%,#74cdf7_50%,#b7e3f9_88%,transparent)] xl:block" />
          {howItWorksSteps.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.06}>
              <article className={index === 2
                ? "group relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-[24px] border border-[#55c5ff] bg-[linear-gradient(145deg,#087cbc_0%,#00A9FF_54%,#0677b6_100%)] p-6 text-left text-white shadow-[0_28px_68px_-38px_rgba(0,126,191,0.58)] transition duration-300 hover:-translate-y-1 sm:p-7"
                : "group relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-[24px] border border-[#dceaf3] bg-white p-6 text-left shadow-[0_22px_58px_-44px_rgba(15,23,42,0.35)] transition duration-300 hover:-translate-y-1 hover:border-[#9dd8f5] hover:shadow-[0_28px_64px_-42px_rgba(0,126,191,0.3)] sm:p-7"}>
                <div className={index === 2 ? "pointer-events-none absolute -right-12 -top-14 h-40 w-40 rounded-full bg-white/20 blur-3xl" : "pointer-events-none absolute -right-12 -top-14 h-36 w-36 rounded-full bg-[#00A9FF]/9 blur-3xl"} />
                <span className={index === 2 ? "pointer-events-none absolute -bottom-5 -right-1 font-display text-[92px] font-extrabold leading-none text-white/[0.07]" : "pointer-events-none absolute -bottom-5 -right-1 font-display text-[92px] font-extrabold leading-none text-[#00A9FF]/[0.055]"}>{step.number}</span>
                <div className="relative flex items-center justify-between gap-4">
                  <span className={index === 2 ? "grid h-12 w-12 place-items-center rounded-[15px] border border-white/25 bg-white/15 text-white shadow-[0_16px_30px_-20px_rgba(3,61,96,0.55)]" : "grid h-12 w-12 place-items-center rounded-[15px] border border-[#cfeaf8] bg-[linear-gradient(145deg,#f5fbff,#e4f6ff)] text-[#00A9FF]"}>
                    <Icon name={stepIcons[index] ?? "check"} className="h-[18px] w-[18px]" />
                  </span>
                  <span className={index === 2 ? "rounded-full border border-white/22 bg-white/12 px-3 py-1.5 text-[10px] font-bold tracking-[0.16em] text-white/85" : "rounded-full border border-[#d9edf7] bg-[#f7fcff] px-3 py-1.5 text-[10px] font-bold tracking-[0.16em] text-[#00A9FF]"}>STEP {step.number}</span>
                </div>
                <h3 className={index === 2 ? "type-card-title relative mt-7 text-white" : "type-card-title relative mt-7 text-[#0f172a]"}>{step.title}</h3>
                <p className={index === 2 ? "type-card-copy relative mt-2.5 max-w-[34ch] text-white/78" : "type-card-copy relative mt-2.5 max-w-[34ch] text-[#64748b]"}>{step.description}</p>
                <div className={index === 2 ? "relative mt-auto flex items-center gap-2 border-t border-white/18 pt-5 text-[11px] font-bold uppercase tracking-[0.09em] text-white/82" : "relative mt-auto flex items-center gap-2 border-t border-[#e7eff4] pt-5 text-[11px] font-bold uppercase tracking-[0.09em] text-[#526173]"}>
                  <span className={index === 2 ? "grid h-5 w-5 place-items-center rounded-full bg-white text-[#087cbc]" : "grid h-5 w-5 place-items-center rounded-full bg-[#e8f8ff] text-[#00A9FF]"}><Icon name="check" className="h-3 w-3" /></span>
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
