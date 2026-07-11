import { siteConfig } from "@/content/site";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { ActionLink } from "@/components/ui/action-link";

export function ContactSection() {
  const whatsappHref = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
    "Hello OneLink, I want to discuss OneLink for my business.",
  )}`;
  const callHref = `tel:+${siteConfig.contact.whatsappNumber}`;

  return (
    <section
      id="contact"
      className="section-shell px-4 py-14 sm:px-6 sm:py-18 lg:px-8 lg:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="rounded-[34px] border border-black/8 bg-white px-6 py-10 text-center shadow-[0_24px_64px_rgba(14,30,37,0.08)] sm:px-10 sm:py-12">
            <h2 className="font-display mx-auto max-w-2xl text-[2rem] font-bold tracking-tight text-[#111821] sm:text-[2.25rem]">
              Ready to launch your OneLink?
            </h2>
            <p className="mt-3 text-[15px] font-medium text-gray-500">
              Choose your plan or speak with our team before you decide.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row sm:items-center">
              <ActionLink href="#pricing" variant="secondary" className="h-11 min-h-11 min-w-[180px] px-5 py-0 sm:h-auto sm:min-h-0 sm:py-3 text-[14px]">
                Explore Plans
              </ActionLink>
              <ActionLink href={whatsappHref} variant="whatsapp" className="h-11 min-h-11 min-w-[180px] px-5 py-0 sm:h-auto sm:min-h-0 sm:py-3 text-[14px]">
                <Icon name="whatsapp" className="h-5 w-5 shrink-0 text-white" />
                WhatsApp Us
              </ActionLink>
            </div>
            <p className="mt-5 text-sm text-[var(--muted)]">
              Call or WhatsApp: <a href={callHref} className="font-bold text-[#111827] underline-offset-4 hover:underline">{siteConfig.contact.phone}</a>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
