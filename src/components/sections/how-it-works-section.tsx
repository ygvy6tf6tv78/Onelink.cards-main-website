import { howItWorksSteps } from "@/content/site";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SurfaceCard } from "@/components/ui/surface-card";

export function HowItWorksSection() {
  return (
    <section className="section-shell px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl space-y-12">
        <SectionHeading
          eyebrow="How it works"
          title="No complexity. No DIY struggle. We do it for you."
          description="OneLink is built to keep the buying decision simple and the launch path clean."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {howItWorksSteps.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.06}>
              <SurfaceCard tone="strong" className="h-full rounded-[32px] p-8">
                <p className="font-display text-5xl font-semibold tracking-[-0.06em] text-[var(--accent-strong)]">
                  {step.number}
                </p>
                <h3 className="font-display mt-6 text-2xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
                  {step.title}
                </h3>
                <p className="text-muted mt-4 text-sm leading-7">{step.description}</p>
              </SurfaceCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
