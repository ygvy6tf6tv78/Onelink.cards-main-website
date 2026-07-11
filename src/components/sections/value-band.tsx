import { Reveal } from "@/components/ui/reveal";

const items = [
  "Everything your customer needs",
  "Without switching apps",
  "Without losing trust",
  "Without sharing five different links",
];

export function ValueBand() {
  return (
    <section className="px-4 sm:px-6 lg:px-8">
      <Reveal className="mx-auto max-w-7xl">
        <div className="surface-card thin-scrollbar overflow-x-auto rounded-[28px] px-5 py-4">
          <div className="flex min-w-max items-center gap-4 text-sm font-semibold text-[var(--foreground)]">
            {items.map((item, index) => (
              <div key={item} className="flex items-center gap-4">
                {index > 0 ? (
                  <span className="accent-dot flex items-center gap-2 text-[var(--muted)]" />
                ) : null}
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
