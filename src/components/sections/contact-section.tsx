import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { ActionLink } from "@/components/ui/action-link";
import { SectionBadge } from "@/components/ui/section-badge";
import { Icon } from "@/components/icons";
import { siteConfig } from "@/content/site";

export function ContactSection() {
  const whatsappHref = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent("Hello OneLink, I would like to book a free demo for my business.")}`;

  return (
    <section
      id="contact"
      className="section-shell bg-transparent px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal x={-22} y={16}>
          <div className="relative overflow-hidden rounded-[30px] border border-white/12 bg-[linear-gradient(135deg,#03182e_0%,#006eb2_55%,#00A9FF_100%)] px-6 py-10 shadow-[0_34px_84px_-46px_rgba(0,113,188,0.64)] sm:px-10 sm:py-12 lg:px-14 lg:py-14">
            <div className="pointer-events-none absolute -left-16 -top-20 h-52 w-52 rounded-full bg-[#00A9FF]/18 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-12 h-56 w-56 rounded-full bg-[#00A9FF]/18 blur-3xl" />
            <Image src="/onelink-logomark.png" alt="" width={3492} height={4652} className="pointer-events-none absolute -bottom-20 -right-4 h-[250px] w-auto rotate-[-8deg] object-contain opacity-[0.045] sm:right-8 sm:h-[320px]" aria-hidden="true" />
            <div className="relative grid gap-7 text-center lg:grid-cols-[1fr_auto] lg:items-end lg:gap-12 lg:text-left">
              <div>
                <SectionBadge label="Ready to Launch" className="!border-white !bg-white !text-[#087cbc] shadow-[0_14px_30px_-20px_rgba(0,0,0,0.55)]" />
                <h2 className="font-display mt-4 max-w-2xl text-[32px] font-bold leading-[1.08] text-white sm:text-[40px] lg:text-[46px]">Ready to launch your OneLink?</h2>
                <p className="mt-4 max-w-2xl text-[14px] font-medium leading-[1.7] text-white/72 sm:text-[16px]">Bring your business into one professionally designed page and give customers a faster way to call, book, order, pay or visit.</p>
              </div>
              <div className="flex justify-center lg:justify-end">
                <ActionLink href={whatsappHref} variant="blue" className="h-12 min-w-[210px] rounded-full bg-white px-6 text-[14px] font-bold !text-[#075a91] shadow-[0_18px_34px_-20px_rgba(0,0,0,0.48)] hover:!bg-[#f4fbff]">
                  <Icon name="whatsapp" className="h-4.5 w-4.5 text-[#25D366]" />
                  Start on WhatsApp
                </ActionLink>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
