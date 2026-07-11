import { solutionCategories } from "@/content/site";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SurfaceCard } from "@/components/ui/surface-card";

export function SolutionCategoriesSection() {
  return (
    <section
      id="solutions"
      className="section-shell px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-7xl space-y-12">
        <SectionHeading
          eyebrow="Category-based solutions"
          title="Designed around business type, not generic templates."
          description="OneLink is structured to match how different Indian SMB categories actually convert customers."
        />
        <div className="grid gap-6 xl:grid-cols-3">
          {solutionCategories.map((category, index) => (
            <Reveal key={category.id} delay={index * 0.06}>
              <SurfaceCard tone="strong" className="h-full rounded-[34px] p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent-strong)]">
                  {category.title}
                </p>
                <h3 className="font-display mt-4 text-2xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
                  {category.subtitle}
                </h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {category.audience.map((audience) => (
                    <span
                      key={audience}
                      className="rounded-full border border-black/7 bg-black/3 px-3 py-1.5 text-sm text-[var(--foreground)]"
                    >
                      {audience}
                    </span>
                  ))}
                </div>
                <div className="mt-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
                    Customer actions
                  </p>
                  <div className="mt-4 space-y-3">
                    {category.actions.map((action) => (
                      <div
                        key={action}
                        className="rounded-2xl border border-black/6 bg-white/82 px-4 py-3 text-sm text-[var(--foreground)]"
                      >
                        {action}
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-muted mt-8 text-sm leading-7">{category.fit}</p>
              </SurfaceCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
