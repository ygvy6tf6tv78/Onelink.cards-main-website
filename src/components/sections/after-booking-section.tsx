import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { SectionBadge } from "@/components/ui/section-badge";

const journeySteps = [
  { number: "01", title: "Choose Your Plan", description: "Select the OneLink experience that fits your business and share your details.", image: "/pricing-mockup-burger-bazaar.png" },
  { number: "02", title: "We Design Your OneLink", description: "Our team shapes every section around your brand, services and customer actions.", image: "/pricing-mockup-vastukar.png" },
  { number: "03", title: "Review & Launch", description: "Approve the final page, receive your QR code and start sharing everywhere.", image: "/pricing-mockup-new-vision.png" },
] as const;

export function AfterBookingSection() {
  return (
    <section id="how-it-works" className="section-shell relative scroll-mt-28 overflow-hidden bg-transparent px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-18">
      <div className="mx-auto max-w-7xl">
        <Reveal y={12}>
          <div className="mx-auto max-w-3xl text-center">
            <SectionBadge label="How It Works" />
            <h2 className="section-title-gradient font-display mx-auto mt-4 max-w-none text-[32px] font-bold leading-[1.08] sm:text-[40px] lg:whitespace-nowrap lg:text-[46px]">Your OneLink, live in three simple steps.</h2>
            <p className="mx-auto mt-4 max-w-none text-[14px] font-medium leading-[1.7] text-[#64748b] sm:text-[16px] xl:whitespace-nowrap">Share your details, let our team shape the experience, then review and launch one smart business page.</p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-3 lg:gap-5">
          {journeySteps.map((step, index) => (
            <Reveal key={step.number} delay={index * 0.08} y={14} x={index === 0 ? -14 : index === 2 ? 14 : 0}>
              <article className="group relative flex h-full min-h-[218px] flex-col overflow-hidden rounded-[24px] border border-[#cfe3f0] bg-[linear-gradient(145deg,rgba(255,255,255,0.94),rgba(235,247,255,0.82))] p-6 text-left shadow-[0_24px_58px_-42px_rgba(9,67,105,0.32)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[#8ecbed] hover:shadow-[0_30px_66px_-40px_rgba(9,67,105,0.42)] sm:p-7">
                <Image src={step.image} alt="" width={1192} height={2504} className="pointer-events-none absolute -bottom-20 -right-6 h-[220px] w-auto rotate-[8deg] object-contain opacity-[0.055] transition duration-500 group-hover:-translate-y-2 group-hover:rotate-[4deg] group-hover:opacity-[0.09]" aria-hidden="true" />
                <div className="pointer-events-none absolute -right-14 -top-16 h-40 w-40 rounded-full bg-[#00A9FF]/10 blur-3xl" />
                <div className="flex items-center justify-between gap-4">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-[linear-gradient(145deg,#e7f6ff,#ffffff)] text-[12px] font-extrabold text-[#087cbc] ring-1 ring-[#c9e7f7]">{index + 1}</span>
                  <span className="text-[11px] font-extrabold tracking-[0.16em] text-[#9aabba]">{step.number}</span>
                </div>
                <h3 className="font-display relative mt-6 text-[20px] font-bold leading-tight text-[#111827]">{step.title}</h3>
                <p className="relative mt-3 max-w-[36ch] text-[14px] font-medium leading-[1.68] text-[#64748b]">{step.description}</p>
                <div className="mt-auto pt-6"><span className="block h-1 w-12 rounded-full bg-[linear-gradient(90deg,#00A9FF,#087cbc)] transition-all duration-300 group-hover:w-20" /></div>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.18} y={10}>
          <div className="mt-8 flex justify-center">
            <Link href="/#contact" className="inline-flex h-12 items-center justify-center gap-2.5 rounded-full bg-[linear-gradient(135deg,#064585,#087aba)] px-7 text-[14px] font-bold text-white shadow-[0_16px_32px_-20px_rgba(0,91,150,0.62)] transition hover:-translate-y-0.5 hover:brightness-110">Get Started <span aria-hidden>↗</span></Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
