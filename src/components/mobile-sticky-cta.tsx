import { siteConfig } from "@/content/site";
import { BuyButton } from "@/components/payment/buy-button";
import { Icon } from "@/components/icons";
import { ActionLink } from "@/components/ui/action-link";

export function MobileStickyCta() {
  const whatsappHref = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
    "Hello OneLink, I want to discuss OneLink for my business.",
  )}`;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-50 md:hidden">
      <div className="mx-4 rounded-[26px] border border-white/80 bg-white/88 p-3 shadow-[0_20px_50px_rgba(14,30,37,0.18)] backdrop-blur-xl">
        <div className="pointer-events-auto flex items-stretch gap-2.5">
          <ActionLink href={whatsappHref} variant="whatsapp" className="h-11 min-h-11 flex-1 px-3 py-0 text-[13px] font-bold">
            <Icon name="whatsapp" className="h-5 w-5 shrink-0 text-white" />
            WhatsApp
          </ActionLink>
          <BuyButton
            planId="signature"
            label="Buy Now"
            variant="secondary"
            className="h-11 min-h-11 flex-1 px-3 py-0 text-[13px] font-bold"
          />
        </div>
      </div>
    </div>
  );
}
