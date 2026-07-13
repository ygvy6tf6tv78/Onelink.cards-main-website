import Link from "next/link";
import { Wordmark } from "@/components/ui/brand-mark";
import { siteConfig } from "@/content/site";

export function Footer() {
  const whatsappHref = `https://wa.me/${siteConfig.contact.whatsappNumber}`;
  const callHref = `tel:${siteConfig.contact.phone.replace(/\s/g, "")}`;
  const emailHref = `mailto:${siteConfig.contact.email}`;

  return (
    <footer className="relative mt-14 px-3 pb-3 sm:mt-20 sm:px-4 sm:pb-4">
      <div className="relative mx-auto max-w-[1500px] overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(140deg,#04182f_0%,#073b67_48%,#075986_100%)] text-white shadow-[0_34px_90px_-50px_rgba(3,31,58,0.7)] sm:rounded-[38px]">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#00A9FF]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 left-1/4 h-96 w-96 rounded-full bg-[#00A9FF]/10 blur-3xl" />
        <div className="relative px-6 pb-8 pt-10 sm:px-9 sm:pb-10 sm:pt-12 lg:px-12 lg:pt-14">
          <div className="grid gap-10 sm:grid-cols-2 xl:grid-cols-[1.55fr_0.7fr_0.7fr_0.7fr_1.2fr] xl:gap-9">
            <div className="sm:col-span-2 xl:col-span-1">
              <Wordmark className="mb-5 h-7 brightness-0 invert opacity-90" alt="OneLink" />
              <p className="max-w-sm text-[15px] font-normal leading-[1.72] text-white/68 sm:text-[16px]">
                OneLink helps businesses bring their services, products and customer actions into one smart digital experience.
              </p>
              <p className="mt-5 inline-flex rounded-full border border-white/12 bg-white/[0.07] px-3.5 py-1.5 text-[11px] font-semibold text-white/78">
                A product by Kriyon Group Private Limited
              </p>
            </div>

            <FooterColumn title="Explore">
              <Link href="/#work">Work</Link>
              <Link href="/#pricing">Pricing</Link>
              <Link href="/#how-it-works">How It Works</Link>
              <Link href="/#faqs">FAQs</Link>
              <a href={whatsappHref} target="_blank" rel="noreferrer">Contact</a>
            </FooterColumn>

            <FooterColumn title="Support">
              <a href={whatsappHref} target="_blank" rel="noreferrer">WhatsApp</a>
              <a href={callHref}>Call</a>
              <a href={emailHref}>Email</a>
            </FooterColumn>

            <FooterColumn title="Legal">
              <Link href="/terms">Terms</Link>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/refund">Refund Policy</Link>
            </FooterColumn>

            <div>
              <h3 className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#9edcff]">Contact Details</h3>
              <div className="mt-4 space-y-4 text-[14px] font-normal leading-relaxed text-white/70 sm:text-[15px]">
                <p><span className="text-white/40">Phone</span><br /><a href={callHref} className="text-white/82 hover:text-white">{siteConfig.contact.phone}</a></p>
                <p><span className="text-white/40">Email</span><br /><a href={emailHref} className="break-all text-white/82 hover:text-white">{siteConfig.contact.email}</a></p>
                <address className="not-italic"><span className="text-white/40">Registered Office</span><br /><strong className="font-semibold text-white/82">{siteConfig.contact.company}</strong>{siteConfig.contact.officeLines.map((line) => <span key={line} className="block">{line}</span>)}</address>
              </div>
              <a href={whatsappHref} target="_blank" rel="noreferrer" className="mt-5 inline-flex min-h-11 items-center rounded-full border border-white/14 bg-white px-5 text-[14px] font-semibold text-[#06436d] shadow-sm hover:-translate-y-0.5">Talk to Our Team</a>
            </div>
          </div>

          <div className="mt-12 border-t border-white/12 pt-8 sm:mt-14 sm:pt-10">
            <div className="overflow-hidden py-1 sm:py-2">
              <Wordmark className="h-auto w-[44%] max-w-[500px] brightness-0 invert opacity-95 sm:w-[38%]" />
              <div className="mt-4 h-1 w-20 rounded-full bg-[#00A9FF]" />
            </div>
            <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-5 text-[11px] font-medium text-white/48 sm:flex-row sm:items-center sm:justify-between sm:text-[12px]">
              <p>© 2026 OneLink. All rights reserved.</p>
              <p>Designed and built by <a href="https://www.repixelx.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-white/72 hover:text-white">RepixelX Studio</a></p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#9edcff]">{title}</h3>
      <div className="mt-4 flex flex-col items-start gap-3.5 text-[14px] font-medium text-white/68 [&_a]:transition [&_a:hover]:text-white sm:text-[15px]">{children}</div>
    </div>
  );
}
