import type { Metadata } from "next";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact the OneLink team for plan guidance, custom solutions and business enquiries.",
};

export default function ContactPage() {
  const whatsappHref = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent("Hello OneLink, I want to discuss the right setup for my business.")}`;
  const callHref = `tel:${siteConfig.contact.phone.replace(/\s/g, "")}`;
  const emailHref = `mailto:${siteConfig.contact.email}`;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f7fafc] px-4 pb-14 pt-28 sm:px-6 sm:pb-16 sm:pt-32 lg:px-8">
      <main className="mx-auto max-w-6xl">
        <Reveal>
          <div className="relative max-w-3xl">
            <span className="eyebrow">Contact</span>
            <h1 className="font-display type-section-title mt-4 text-[#0f172a]">Let’s build your OneLink.</h1>
            <p className="type-section-copy mt-4 max-w-[62ch] text-[#5f6b7a]">
              Need help choosing a plan, want a custom solution or have questions about OneLink? Connect directly with our team.
            </p>
          </div>
        </Reveal>

        <div className="relative mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Reveal>
              <ContactCard icon="whatsapp" title="WhatsApp & Call">
                <a href={whatsappHref} target="_blank" rel="noreferrer" className="font-display text-[1.3rem] font-bold tracking-[-0.03em] text-[#168447] hover:text-[#116b39]">{siteConfig.contact.phone}</a>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  <ContactAction href={whatsappHref} label="Chat on WhatsApp" external icon="whatsapp" green />
                  <ContactAction href={callHref} label="Call Now" icon="phone" />
                </div>
              </ContactCard>
            </Reveal>

            <Reveal delay={0.05}>
              <ContactCard icon="mail" title="Email">
                <a href={emailHref} className="break-all text-[15px] font-semibold text-[#0f172a] hover:text-[#087cbc]">{siteConfig.contact.email}</a>
                <div className="mt-4"><ContactAction href={emailHref} label="Send an Email" icon="mail" /></div>
              </ContactCard>
            </Reveal>

            <Reveal delay={0.1}>
              <ContactCard icon="map" title="Registered Office">
                <address className="not-italic text-[15px] font-normal leading-[1.7] text-[#475569]">
                  <strong className="block font-semibold text-[#0f172a]">{siteConfig.contact.company}</strong>
                  {siteConfig.contact.officeLines.map((line) => <span key={line} className="block">{line}</span>)}
                </address>
                <div className="mt-4"><ContactAction href={siteConfig.contact.mapsUrl} label="View Location" external icon="map" /></div>
              </ContactCard>
            </Reveal>
        </div>

      </main>
    </div>
  );
}

function ContactCard({ icon, title, children }: { icon: "whatsapp" | "mail" | "map"; title: string; children: React.ReactNode }) {
  return (
    <article className="relative h-full overflow-hidden rounded-[14px] border border-slate-900/[0.08] bg-white p-5 shadow-[0_16px_42px_-38px_rgba(15,23,42,0.25)]">
      <div className="mb-4 flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-[8px] bg-[#e8f7ff] text-[#087cbc]"><Icon name={icon} className="h-[18px] w-[18px]" /></span>
        <h2 className="text-[19px] font-bold tracking-[-0.025em] text-[#0f172a]">{title}</h2>
      </div>
      {children}
    </article>
  );
}

function ContactAction({ href, label, icon, external = false, green = false }: { href: string; label: string; icon: "whatsapp" | "phone" | "mail" | "map"; external?: boolean; green?: boolean }) {
  return (
    <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} className={green ? "inline-flex min-h-11 items-center gap-2 rounded-[10px] border border-[#168447] bg-[#168447] px-4 text-[14px] font-semibold text-white shadow-sm hover:-translate-y-0.5 hover:bg-[#116b39]" : "inline-flex min-h-11 items-center gap-2 rounded-[10px] border border-slate-900/[0.08] bg-white px-4 text-[14px] font-semibold text-[#0f172a] shadow-sm hover:-translate-y-0.5 hover:border-[#00A9FF]/25 hover:text-[#087cbc]"}>
      <Icon name={icon} className="h-4 w-4" />
      {label}
    </a>
  );
}
