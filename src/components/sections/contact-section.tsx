import { Reveal } from "@/components/ui/reveal";
import { ActionLink } from "@/components/ui/action-link";
import { SectionBadge } from "@/components/ui/section-badge";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="section-shell bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(140deg,#04182f_0%,#073b67_48%,#075986_100%)] px-6 py-12 text-center shadow-[0_30px_78px_-46px_rgba(3,31,58,0.68)] sm:px-10 sm:py-14">
            <div className="pointer-events-none absolute -left-16 -top-20 h-52 w-52 rounded-full bg-[#00A9FF]/18 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-12 h-56 w-56 rounded-full bg-[#00A9FF]/18 blur-3xl" />
            <div className="relative"><SectionBadge label="Ready to Launch" className="!border-white !bg-white !text-[#00A9FF] shadow-[0_14px_30px_-20px_rgba(0,0,0,0.55)]" /></div>
            <h2 className="font-display type-section-title relative mx-auto mt-4 max-w-2xl text-white">
              Ready to launch your OneLink?
            </h2>
            <p className="type-section-copy relative mx-auto mt-4 max-w-2xl text-white/68">
              Bring your business into one professionally designed page and give customers a faster way to call, book, order, pay or visit.
            </p>
            <div className="relative mt-7 flex flex-col justify-center gap-3 sm:flex-row sm:items-center">
              <ActionLink href="#pricing" variant="blue" className="h-11 min-h-11 min-w-[170px] rounded-[12px] px-5 py-0 text-[14px] sm:h-auto sm:min-h-0 sm:py-3">
                Get OneLink
              </ActionLink>
              <ActionLink href="#work" variant="secondary" className="h-11 min-h-11 min-w-[170px] rounded-[12px] border-[#c7dfec] bg-white px-5 py-0 text-[14px] sm:h-auto sm:min-h-0 sm:py-3">
                Explore Live Examples
              </ActionLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
