import { featureColumns } from "@/content/site";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SurfaceCard } from "@/components/ui/surface-card";

export function FeaturesSection() {
  return (
    <section className="section-shell px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl space-y-12">
        <SectionHeading
          eyebrow="What you get"
          title="A structured page built to make every important action obvious."
          description="The OneLink page is designed to reduce friction, surface trust, and keep a premium brand feel across mobile screens."
        />
        <div className="grid gap-6 xl:grid-cols-3">
          {featureColumns.map((column, index) => (
            <Reveal key={column.title} delay={index * 0.08}>
              <SurfaceCard tone="strong" className="h-full rounded-[40px] p-10 border border-black/5 glass-strong shadow-[0_30px_70px_rgba(0,0,0,0.04)]">
                <h3 className="font-display text-2xl text-balance font-bold tracking-[-0.03em] text-[var(--foreground)]">
                  {column.title}
                </h3>
                <div className="mt-8 space-y-5">
                  {column.items.map((feature) => (
                    <div key={feature.title} className="flex gap-4">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent-strong)]">
                        <Icon name={feature.icon} className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-[17px] font-bold text-[var(--foreground)] leading-tight tracking-tight">
                          {feature.title}
                        </p>
                        <p className="text-muted mt-2 text-pretty text-[15px] font-medium leading-[1.6] text-neutral-500">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </SurfaceCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
