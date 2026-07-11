import { Reveal } from "@/components/ui/reveal";

const blueStripText =
  "Professional Business Presence    ✦    Starting at ₹2,799    ✦    One Month Hosting Free    ✦    Customized for Your Business    ✦    Easy to Share    ✦    Built to Convert    ✦    Mobile-First Experience    ✦    ".repeat(4);
const blackStripText =
  "One Smart Link    ✦    More Enquiries    ✦    Faster Bookings    ✦    Easy Payments    ✦    Direct WhatsApp    ✦    Better Reviews    ✦    Instant Calls    ✦    More Customer Actions    ✦    ".repeat(4);

export function ActionStrip() {
  return (
    <section className="relative h-[170px] overflow-x-clip overflow-y-visible bg-transparent sm:h-[190px]" aria-label="OneLink categories">
      <Reveal className="absolute left-[-10vw] top-8 h-[140px] w-[120vw] sm:top-10" y={24}>
        <div className="absolute top-2 w-full rotate-[-3deg] overflow-hidden bg-[#08111c] py-3.5 text-white shadow-[0_18px_42px_-30px_rgba(15,23,42,0.7)]">
          <div className="one-marquee-right flex w-max whitespace-pre text-[17px] font-bold leading-[1.25] tracking-[0.02em] sm:text-[22px]">
            <span className="pr-9">{blackStripText}</span>
            <span className="pr-9">{blackStripText}</span>
          </div>
        </div>
        <div className="absolute top-[62px] w-full rotate-[2.5deg] overflow-hidden bg-[#00A9FF] py-3.5 text-white shadow-[0_18px_42px_-30px_rgba(0,169,255,0.62)] sm:top-[74px]">
          <div className="one-marquee-left flex w-max items-center whitespace-pre text-[17px] font-bold leading-[1.25] tracking-[0.02em] sm:text-[22px]">
            <span className="pr-9">{blueStripText}</span>
            <span className="pr-9">{blueStripText}</span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
