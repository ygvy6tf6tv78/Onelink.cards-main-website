import { Reveal } from "@/components/ui/reveal";
import { ActionLink } from "@/components/ui/action-link";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="section-shell px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="rounded-[24px] border border-white/10 bg-[linear-gradient(140deg,#04182f_0%,#073b67_48%,#075986_100%)] px-6 py-9 text-center shadow-[0_28px_72px_-44px_rgba(3,31,58,0.65)] sm:px-10 sm:py-11">
            <h2 className="font-display type-section-title mx-auto max-w-2xl text-white">
              Ready to launch your OneLink?
            </h2>
            <p className="type-section-copy mx-auto mt-3 max-w-2xl text-white/68">
              Launch your OneLink with a custom QR code ready for your store, packaging, menu or marketing material.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-2.5 sm:flex-row sm:items-center">
              <ActionLink href="#pricing" variant="secondary" className="h-11 min-h-11 min-w-[180px] rounded-[12px] bg-white px-5 py-0 sm:h-auto sm:min-h-0 sm:py-3 text-[14px]">
                Get OneLink + QR
              </ActionLink>
              <ActionLink href="/contact" variant="blue" className="h-11 min-h-11 min-w-[180px] rounded-[12px] px-5 py-0 sm:h-auto sm:min-h-0 sm:py-3 text-[14px]">
                Contact Our Team
              </ActionLink>
            </div>
            <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.1em] text-white/45">
              Custom Design <span className="mx-1.5 text-[#cbd5e1]">·</span> Fast Setup <span className="mx-1.5 text-[#cbd5e1]">·</span> Ongoing Support
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
