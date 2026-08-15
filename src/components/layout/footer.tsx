import Link from "next/link";
import { Wordmark } from "@/components/ui/brand-mark";
import { siteConfig } from "@/content/site";

const tickerOne = ["Smart Business Pages", "Custom QR Design", "Bookings", "Payments", "Reviews", "Menus"];
const tickerTwo = ["WhatsApp Actions", "Multi-Location", "Customer Enquiries", "Brand-Led Design", "Mobile First", "Human Support"];

export function Footer() {
  const whatsappHref = `https://wa.me/${siteConfig.contact.whatsappNumber}`;
  const callHref = `tel:${siteConfig.contact.phone.replace(/\s/g, "")}`;
  const emailHref = `mailto:${siteConfig.contact.email}`;

  return (
    <footer className="relative mt-14 scroll-mt-24 overflow-x-clip bg-[#080a0d] px-3 pb-3 pt-24 text-white sm:mt-20 sm:px-4 sm:pb-4 sm:pt-28">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_50%_0%,rgba(0,169,255,0.13),transparent_58%)]" />

      <div className="relative -mx-3 mb-8 overflow-x-clip py-5 sm:-mx-4 sm:mb-10 sm:py-7" aria-label="OneLink capabilities">
        <TickerRow items={tickerOne} direction="left" />
        <div className="mt-4 sm:mt-6"><TickerRow items={tickerTwo} direction="right" alternate /></div>
      </div>

      <div className="relative mx-auto max-w-[1500px] overflow-hidden rounded-[28px] border border-white/12 bg-[linear-gradient(140deg,#04182f_0%,#07517d_54%,#087cbc_100%)] shadow-[0_34px_90px_-46px_rgba(0,0,0,0.72)] sm:rounded-[36px]">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#00A9FF]/24 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 left-1/4 h-96 w-96 rounded-full bg-[#00A9FF]/12 blur-3xl" />
        <div className="relative px-6 pb-8 pt-10 sm:px-10 sm:pb-10 sm:pt-12 lg:px-14 lg:pb-12 lg:pt-14">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.72fr_0.72fr_0.85fr_1.15fr] lg:gap-8">
            <div className="sm:col-span-2 lg:col-span-1">
              <Wordmark className="!h-auto !w-[112px] brightness-0 invert" alt="OneLink" />
              <a href="https://www.kriyongroup.com/" target="_blank" rel="noopener noreferrer" className="mt-4 block max-w-[220px] text-[10px] font-bold uppercase leading-[1.5] tracking-[0.075em] text-white/60 hover:text-white">
                A Creative Technology Venture by Kriyon Group Pvt. Ltd. ↗
              </a>
              <p className="mt-5 max-w-sm text-[15px] font-medium leading-[1.72] text-white/72">
                OneLink brings your services, products and customer actions into one professionally designed digital experience.
              </p>
              <a href={whatsappHref} target="_blank" rel="noreferrer" className="mt-6 inline-flex min-h-11 items-center rounded-full bg-white px-5 text-[14px] font-bold text-[#06436d] shadow-[0_14px_28px_-18px_rgba(0,0,0,0.4)] hover:-translate-y-0.5">
                Talk to Our Team
              </a>
            </div>

            <FooterColumn title="Explore">
              <Link href="/#work">Work</Link>
              <Link href="/pricing">Pricing</Link>
              <Link href="/#how-it-works">How It Works</Link>
              <Link href="/#faqs">FAQs</Link>
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
              <FooterTitle>Contact</FooterTitle>
              <div className="mt-4 space-y-3 text-[14px] font-medium leading-relaxed text-white/76">
                <a href={callHref} className="block hover:text-white">{siteConfig.contact.phone}</a>
                <a href={emailHref} className="block break-all hover:text-white">{siteConfig.contact.email}</a>
                <address className="not-italic text-white/62">
                  <strong className="font-semibold text-white/82">{siteConfig.contact.company}</strong>
                  {siteConfig.contact.officeLines.map((line) => <span key={line} className="block">{line}</span>)}
                </address>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-white/18 pt-8 sm:mt-14 sm:pt-10">
            <Wordmark className="!h-auto !w-[58%] !max-w-[360px] brightness-0 invert opacity-95 sm:!w-[34%]" alt="OneLink" />
            <div className="mt-7 flex flex-col gap-3 border-t border-white/12 pt-5 text-[11px] font-medium text-white/50 sm:flex-row sm:items-center sm:justify-between sm:text-[12px]">
              <p><a href="https://www.kriyongroup.com/" target="_blank" rel="noopener noreferrer" className="transition hover:text-white">A Creative Technology Venture by Kriyon Group Pvt. Ltd. ↗</a></p>
              <p>Designed and built by <a href="https://www.repixelx.com" target="_blank" rel="noopener noreferrer" className="font-semibold text-white/78 hover:text-white">RepixelX Studio ↗</a></p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function TickerRow({ items, direction, alternate = false }: { items: string[]; direction: "left" | "right"; alternate?: boolean }) {
  const repeated = [...items, ...items, ...items, ...items];
  return (
    <div className={direction === "left" ? "one-marquee-left flex w-max gap-8 whitespace-nowrap" : "one-marquee-right flex w-max gap-8 whitespace-nowrap"}>
      {repeated.map((item, index) => {
        const outlined = (index + (alternate ? 1 : 0)) % 2 === 1;
        return <span key={`${item}-${index}`} className={outlined ? "px-2 font-display text-[1.85rem] font-bold text-transparent sm:text-[2.65rem] lg:text-[3.1rem]" : "px-2 font-display text-[1.85rem] font-bold text-white sm:text-[2.65rem] lg:text-[3.1rem]"} style={outlined ? { WebkitTextStroke: "1px rgba(255,255,255,0.62)" } : undefined}>{item}</span>;
      })}
    </div>
  );
}

function FooterTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#9edcff]">{children}</h3>;
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <FooterTitle>{title}</FooterTitle>
      <div className="mt-4 flex flex-col items-start gap-3 text-[14px] font-medium text-white/72 [&_a]:transition [&_a:hover]:text-white">{children}</div>
    </div>
  );
}
