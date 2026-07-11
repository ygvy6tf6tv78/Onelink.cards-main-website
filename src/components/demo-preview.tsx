import type { DemoItem } from "@/content/site";
import { SurfaceCard } from "@/components/ui/surface-card";

type DemoPreviewProps = {
  demo: DemoItem;
  compact?: boolean;
};

export function DemoPreview({ demo, compact = false }: DemoPreviewProps) {
  return (
    <SurfaceCard
      tone="strong"
      className="overflow-hidden rounded-[32px] border border-white/70 bg-white"
    >
      <div className="bg-[radial-gradient(circle_at_top_left,_rgba(0,169,255,0.22),_transparent_45%),linear-gradient(180deg,_rgba(255,255,255,0.98),_rgba(240,247,252,0.96))] p-4">
        <div className="rounded-[26px] border border-black/8 bg-[#f9fdff] p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
          <div className="mx-auto mb-4 h-1.5 w-14 rounded-full bg-black/10" />
          <div className="rounded-[20px] bg-[linear-gradient(180deg,_rgba(0,169,255,0.14),_rgba(255,255,255,0.96))] p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--accent-strong)]">
                  {demo.label}
                </p>
                <h3 className="font-display mt-2 text-lg font-semibold text-[var(--foreground)]">
                  {demo.businessName}
                </h3>
                <p className="mt-2 text-xs leading-5 text-[var(--muted)]">
                  {demo.tagline}
                </p>
              </div>
              <div className="rounded-full border border-black/8 bg-white/80 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--foreground)]">
                {demo.location}
              </div>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            {demo.actions.map((action) => (
              <div
                key={action}
                className="rounded-2xl border border-black/7 bg-white/90 px-3 py-2 text-center text-xs font-medium text-[var(--foreground)]"
              >
                {action}
              </div>
            ))}
          </div>
          <div className="mt-4 space-y-2">
            {demo.sections.slice(0, compact ? 1 : 2).map((section) => (
              <div
                key={section.title}
                className="rounded-2xl border border-black/6 bg-white/85 p-3"
              >
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
                  {section.title}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {section.items.slice(0, compact ? 2 : 4).map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-[var(--accent-soft)] px-2.5 py-1 text-[10px] font-medium text-[var(--foreground)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SurfaceCard>
  );
}
