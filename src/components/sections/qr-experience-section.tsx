import Image from "next/image";
import { ActionLink } from "@/components/ui/action-link";
import { Reveal } from "@/components/ui/reveal";

const qrFeatures = [
  "Custom QR Design",
  "Print Ready",
  "Easy to Scan",
  "Included with Every OneLink",
];

const qrCards = [
  {
    src: "/qr-scan-explore.png",
    alt: "Scan to Explore OneLink QR sticker",
  },
  {
    src: "/qr-scan-menu.png",
    alt: "Scan to View Menu OneLink QR sticker",
  },
];

export function QrExperienceSection() {
  return (
    <section id="qr" className="section-shell scroll-mt-28 border-y border-slate-900/[0.05] bg-[linear-gradient(180deg,rgba(255,255,255,0.66),rgba(238,246,252,0.72))] px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center lg:gap-10">
          <Reveal delay={0.04} y={18}>
            <div className="max-w-[560px]">
              <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#087cbc]">Custom QR included</p>
              <h2 className="font-display type-section-title mt-4 text-[#0f172a]">
                Your OneLink, ready to scan.
              </h2>
              <p className="mt-3.5 max-w-[54ch] text-[15px] font-medium leading-[1.7] text-[#5f6b7a] sm:text-[16px]">
                Every OneLink comes with a <strong className="font-bold text-[#087cbc]">custom QR code</strong> that customers can scan to instantly open your menu, services, bookings, payments, location and other important customer actions.
              </p>
              <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
                <ActionLink href="#pricing" variant="blue" withArrow className="min-h-11 rounded-[12px] px-5">
                  Get Your OneLink + QR
                </ActionLink>
                <ActionLink href="#work" variant="secondary" className="min-h-11 rounded-[12px] px-5">
                  View OneLink Examples
                </ActionLink>
              </div>
            </div>
          </Reveal>

          <div id="qr-examples" className="mx-auto grid w-full max-w-[420px] scroll-mt-28 gap-4 lg:mx-0">
            {qrCards.map((card, index) => (
              <Reveal key={card.src} delay={index * 0.07} y={16}>
                <div className="group overflow-hidden rounded-[11px] border border-slate-900/[0.08] bg-white p-1 shadow-[0_16px_42px_-34px_rgba(15,23,42,0.32)] transition duration-300 hover:-translate-y-0.5 hover:border-[#00A9FF]/20">
                  <Image
                    src={card.src}
                    alt={card.alt}
                    width={7992}
                    height={4041}
                    unoptimized
                    sizes="(min-width: 1024px) 400px, 92vw"
                    className="h-auto w-full rounded-[8px]"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.08}>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 border-t border-slate-900/[0.07] pt-4 text-center text-[11px] font-semibold uppercase tracking-[0.08em] text-[#526173] sm:text-[12px]">
            {qrFeatures.map((feature, index) => (
              <span key={feature} className="inline-flex items-center gap-3">
                {index > 0 ? <span className="h-1 w-1 rounded-full bg-[#00A9FF]" /> : null}
                {feature}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
