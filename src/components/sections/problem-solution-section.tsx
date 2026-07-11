import { comparisonLists } from "@/content/site";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SurfaceCard } from "@/components/ui/surface-card";

export function ProblemSolutionSection() {
  return (
    <section className="section-shell px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl space-y-12">
        <SectionHeading
          eyebrow="Why businesses lose customers"
          title="No clutter. No confusion. Just action."
          description="Scattered links slow decisions, weaken trust, and make interested visitors work harder than they should."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          <Reveal>
            <ComparisonCard
              title="Without OneLink"
              description="Customers bounce between disconnected destinations and drop off before acting."
              items={comparisonLists.without}
              tone="muted"
            />
          </Reveal>
          <Reveal delay={0.08}>
            <ComparisonCard
              title="With OneLink"
              description="One clean business page reduces friction and moves customers faster."
              items={comparisonLists.with}
              tone="accent"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ComparisonCard({
  title,
  description,
  items,
  tone,
}: {
  title: string;
  description: string;
  items: string[];
  tone: "muted" | "accent";
}) {
  return (
    <SurfaceCard
      tone="strong"
      className={`h-full rounded-[34px] p-8 ${
        tone === "accent"
          ? "bg-[linear-gradient(180deg,_rgba(255,255,255,0.98),_rgba(236,247,252,0.98))]"
          : "bg-[linear-gradient(180deg,_rgba(255,255,255,0.98),_rgba(244,246,248,0.98))]"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-display text-2xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
            {title}
          </h3>
          <p className="text-muted mt-3 max-w-md text-sm leading-7">{description}</p>
        </div>
        <div
          className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] ${
            tone === "accent"
              ? "bg-[var(--accent-soft)] text-[var(--accent-strong)]"
              : "bg-black/5 text-[var(--muted)]"
          }`}
        >
          {tone === "accent" ? "Cleaner" : "Fragmented"}
        </div>
      </div>
      <div className="mt-8 space-y-4">
        {items.map((item) => (
          <div
            key={item}
            className="flex items-start gap-3 rounded-2xl border border-black/6 bg-white/82 px-4 py-3"
          >
            <span
              className={`mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-full ${
                tone === "accent"
                  ? "bg-[var(--accent-soft)] text-[var(--accent-strong)]"
                  : "bg-black/6 text-[var(--foreground)]"
              }`}
            >
              <Icon name={tone === "accent" ? "check" : "shield"} className="h-4 w-4" />
            </span>
            <span className="text-sm leading-7 text-[var(--foreground)]">{item}</span>
          </div>
        ))}
      </div>
    </SurfaceCard>
  );
}
