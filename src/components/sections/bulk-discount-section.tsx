import Link from "next/link";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/ui/reveal";

const tiers = [
  {
    title: "Pair",
    range: "2 OneLinks",
    percent: "10%",
    line: "Off your full booking total",
    href: "/book?qty=2",
    cta: "Start with 2",
    style: "primary" as const,
  },
  {
    title: "Small group",
    range: "3–4 OneLinks",
    percent: "15%",
    line: "Off your full booking total",
    href: "/book?qty=3",
    cta: "Start with 3",
    style: "primary" as const,
  },
  {
    title: "Network",
    range: "5+ OneLinks",
    percent: "25%",
    line: "Off your full booking total",
    href: "/book?qty=5",
    cta: "Start with 5",
    style: "accent" as const,
  },
];

export function BulkDiscountSection() {
  return (
    <section
      id="bulk-discount"
      className="section-shell relative overflow-hidden px-4 py-[5rem] sm:px-6 sm:py-28 lg:px-8 border-y border-gray-100 bg-white"
    >

      <div className="relative z-[1] mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-gray-500 shadow-sm sm:text-[11px]">
              <Icon name="building" className="h-3.5 w-3.5 text-gray-400" />
              Bulk / Team discount
            </div>
            <h2 className="font-display mx-auto mt-5 max-w-[22ch] text-[1.85rem] font-semibold leading-[1.1] tracking-[-0.05em] text-gray-900 sm:max-w-none sm:text-[2.4rem] lg:text-[2.65rem]">
              Getting OneLink for your team or network?
            </h2>
            <p className="mx-auto mt-4 max-w-[42ch] text-[15px] font-medium leading-relaxed text-gray-500 sm:mt-5 sm:text-[17px]">
              The more pages you add in one go, the lower your total. Pick a size below — we open booking with that quantity and apply the offer for you.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto mt-10 grid max-w-6xl gap-5 sm:mt-12 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-6">
          {tiers.map((tier, index) => (
            <Reveal key={tier.title} delay={index * 0.06}>
              <article className="flex h-full flex-col rounded-[32px] border-2 border-transparent bg-gray-50/50 p-8 transition duration-300 hover:bg-gray-100 hover:shadow-sm sm:p-10">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gray-500">{tier.title}</p>
                <p className="mt-2 text-[15px] font-bold text-gray-900">{tier.range}</p>
                <div className="mt-5 flex flex-col gap-1 border-t border-gray-100 pt-5">
                  <p className="text-[2.25rem] font-bold leading-none tracking-tight text-gray-900 sm:text-[2.5rem]">
                    {tier.percent}{" "}
                    <span className="text-[1.1rem] font-bold text-gray-400">OFF</span>
                  </p>
                  <p className="text-[13px] font-semibold text-gray-500">{tier.line}</p>
                </div>
                <div className="mt-auto pt-8">
                  <Link
                    href={tier.href}
                    className={
                      tier.style === "accent"
                        ? "inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-black text-[13px] font-bold text-white shadow-sm transition hover:scale-[1.02] sm:h-[3.25rem] sm:text-[14px]"
                        : "inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-gray-200 bg-white text-[13px] font-bold text-gray-900 shadow-sm transition hover:scale-[1.02] hover:bg-gray-50 sm:h-[3.25rem] sm:text-[14px]"
                    }
                  >
                    {tier.style === "accent" ? (
                      <Icon name="spark" className="h-4 w-4 shrink-0 text-white" />
                    ) : null}
                    {tier.cta}
                  </Link>
                  <p className="mt-2 text-center text-[11px] font-semibold text-gray-400">Opens checkout with quantity and offer preset</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
