import { Reveal } from "@/components/ui/reveal";

const blueStripText =
  "Smart Business Presence    ✦    Direct WhatsApp    ✦    Easy Payments    ✦    Better Reviews    ✦    Smart Bookings    ✦    Custom QR Assets    ✦    Multi-Location Ready    ✦    ".repeat(4);
const blackStripText =
  "Smart Business Presence    ✦    Direct WhatsApp    ✦    Easy Payments    ✦    Better Reviews    ✦    Smart Bookings    ✦    Custom QR Assets    ✦    Multi-Location Ready    ✦    ".repeat(4);

export function ActionStrip() {
  return (
    <section className="relative h-[184px] overflow-x-clip overflow-y-visible bg-white sm:h-[208px]" aria-label="OneLink categories">
      <Reveal className="absolute left-[-12vw] top-3 h-[164px] w-[124vw] sm:top-5" y={18}>
        <div className="absolute top-[54px] w-full rotate-[-5deg] overflow-hidden bg-[#08111c] py-3.5 text-white shadow-[0_18px_42px_-30px_rgba(15,23,42,0.7)] sm:top-[62px] sm:py-4">
          <div className="one-marquee-right flex w-max whitespace-pre text-[16px] font-semibold leading-[1.25] tracking-[0.02em] sm:text-[20px]">
            <span className="pr-9">{blackStripText}</span>
            <span className="pr-9">{blackStripText}</span>
          </div>
        </div>
        <div className="absolute top-[54px] w-full rotate-[5deg] overflow-hidden bg-[#00A9FF] py-3.5 text-white shadow-[0_18px_42px_-30px_rgba(0,169,255,0.62)] sm:top-[62px] sm:py-4">
          <div className="one-marquee-left flex w-max items-center whitespace-pre text-[16px] font-semibold leading-[1.25] tracking-[0.02em] sm:text-[20px]">
            <span className="pr-9">{blueStripText}</span>
            <span className="pr-9">{blueStripText}</span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
