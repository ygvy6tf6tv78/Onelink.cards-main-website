import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { SectionBadge } from "@/components/ui/section-badge";

const qrCards = [
  {
    src: "/qr-scan-explore.png",
    alt: "Scan to Explore OneLink QR sticker",
    label: "Scan to explore a live OneLink",
  },
  {
    src: "/qr-scan-menu.png",
    alt: "Scan to View Menu OneLink QR sticker",
    label: "Scan to get your own OneLink",
  },
];

export function QrExperienceSection() {
  return (
    <section id="qr" className="section-shell scroll-mt-28 bg-white px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <Reveal delay={0.04} x={-26} y={14}>
          <div className="text-center"><SectionBadge label="Custom QR Included" /></div>
          <h2 className="section-title-gradient font-display type-section-title mx-auto mt-4 max-w-3xl text-center">
            Your OneLink, ready to scan.
          </h2>
          <p className="type-section-copy mx-auto mt-4 max-w-3xl text-center text-[#64748b]">
            Every OneLink includes a custom, print-ready QR code that takes customers straight to your most important business actions.
          </p>
        </Reveal>

          <div id="qr-examples" className="mx-auto mt-9 grid w-full max-w-4xl scroll-mt-28 gap-5 md:grid-cols-2">
            {qrCards.map((card, index) => (
              <Reveal key={card.src} delay={index * 0.07} x={index === 0 ? -30 : 30} y={14}>
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
                  <p className="px-3 py-2 text-center text-[11px] font-semibold text-[#526173]">{card.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
      </div>
    </section>
  );
}
