import { trustHighlights } from "@/content/site";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionBadge } from "@/components/ui/section-badge";
import Link from "next/link";

const trustIcons = ["shield", "phone", "user", "bolt", "spark", "check"] as const;

export function TrustSection() {
  return (
    <section className="section-shell relative overflow-hidden bg-transparent px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <Reveal y={12}>
          <div className="mx-auto max-w-3xl text-center">
            <SectionBadge label="Why businesses trust OneLink" />
            <h2 className="font-display mx-auto mt-4 text-[32px] font-bold leading-[1.08] text-[#111827] sm:text-[40px] lg:whitespace-nowrap lg:text-[46px]">Built for real business, every day.</h2>
            <p className="mx-auto mt-4 max-w-[58ch] text-[14px] font-medium leading-[1.7] text-[#7d8794] sm:text-[16px]">Reliable infrastructure, practical support and a flexible experience built around how modern businesses actually work.</p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {trustHighlights.map((signal, index) => (
            <Reveal key={signal.title} delay={index * 0.05} y={12}>
              <article className="group flex h-full min-h-[190px] flex-col items-start rounded-[24px] border border-[#e6ebf0] bg-white p-6 text-left shadow-[0_20px_50px_-44px_rgba(15,23,42,0.38)] transition duration-300 hover:-translate-y-1 hover:border-[#d7e4ee] hover:shadow-[0_28px_62px_-44px_rgba(15,23,42,0.46)] sm:p-7">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-[#f0f4ff] text-[#2850ed] transition group-hover:bg-[#2850ed] group-hover:text-white">
                  <Icon name={trustIcons[index] ?? "check"} className="h-[18px] w-[18px]" />
                </span>
                <h3 className="font-display mt-5 text-[19px] font-bold leading-tight text-[#111827]">{signal.title}</h3>
                <p className="mt-2.5 max-w-[42ch] text-[14px] font-medium leading-[1.65] text-[#7d8794]">{signal.description}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.18} y={10}>
          <div className="mt-8 flex justify-center">
            <Link href="/#contact" className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full border border-[#b9daed] bg-white/80 px-7 text-[14px] font-extrabold text-[#0875b8] shadow-[0_16px_34px_-24px_rgba(0,91,150,0.46)] backdrop-blur transition hover:-translate-y-0.5 hover:border-[#63b8e5] hover:bg-white">Build Your OneLink <span aria-hidden>↗</span></Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
