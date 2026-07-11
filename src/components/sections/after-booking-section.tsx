import { howItWorksSteps } from "@/content/site";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/ui/reveal";

const stepIcons = ["wallet", "phone", "spark", "eye"] as const;

export function AfterBookingSection() {
  return (
    <section className="section-shell relative overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-18">
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start lg:gap-14">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#00a9ff]/18 bg-[#00a9ff]/8 px-4 py-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00a9ff] opacity-50" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00a9ff]" />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#087cbc]">
                  After you book
                </span>
              </div>

              <h2 className="font-display mt-5 max-w-[14ch] text-[1.75rem] font-semibold tracking-[-0.055em] text-[#0f172a] sm:text-[2.2rem] lg:text-[2.45rem]">
                From plan to launch, simple and clear.
              </h2>

              <p className="mt-4 max-w-[38ch] text-[14px] font-semibold leading-[1.7] text-[#5f6b7a] sm:text-[15px]">
                Every OneLink moves through a clean requirement, preview and approval flow before going live.
              </p>
            </div>
          </Reveal>

          <div className="space-y-3">
            {howItWorksSteps.map((step, index) => (
              <Reveal key={step.number} delay={index * 0.06}>
                <div className="group grid gap-4 rounded-[20px] bg-white p-5 shadow-sm ring-1 ring-gray-900/5 transition duration-300 hover:ring-gray-900/10 sm:grid-cols-[80px_1fr] sm:p-6">
                  <div className="flex items-center gap-3 sm:flex-col sm:items-start">
                    <span className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#f8fafc] text-gray-900 ring-1 ring-gray-200">
                      <Icon name={stepIcons[index] ?? "check"} className="h-5 w-5" />
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-gray-500">Step {step.number}</span>
                  </div>

                  <div>
                    <h3 className="text-[16px] font-bold leading-snug tracking-tight text-[#0f172a]">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-[13px] font-semibold leading-[1.6] text-[#5f6b7a]">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
