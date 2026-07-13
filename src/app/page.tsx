import dynamic from "next/dynamic";
import { ActionStrip } from "@/components/sections/action-strip";
import { ClientLogoStrip } from "@/components/sections/client-logo-strip";
import { DemoShowcaseSection } from "@/components/sections/demo-showcase-section";
import { HeroSection } from "@/components/sections/hero-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { QrExperienceSection } from "@/components/sections/qr-experience-section";

const AfterBookingSection = dynamic(() =>
  import("@/components/sections/after-booking-section").then((m) => ({ default: m.AfterBookingSection })),
);
const ContactSection = dynamic(() =>
  import("@/components/sections/contact-section").then((m) => ({ default: m.ContactSection })),
);
const FaqSection = dynamic(() =>
  import("@/components/sections/faq-section").then((m) => ({ default: m.FaqSection })),
);
const TrustSection = dynamic(() =>
  import("@/components/sections/trust-section").then((m) => ({ default: m.TrustSection })),
);

export default function Home() {
  return (
    <>
      <div className="relative isolate overflow-x-clip bg-[linear-gradient(180deg,#edf6ff_0%,#f5f9fc_18%,#f6f9fc_48%,#f4f8fc_100%)]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[780px] bg-[radial-gradient(circle_at_50%_0%,rgba(0,169,255,0.22),transparent_56%),radial-gradient(circle_at_12%_8%,rgba(0,169,255,0.12),transparent_28%),linear-gradient(180deg,#edf6ff_0%,#f5f9fc_44%,rgba(245,249,252,0)_100%)]" />
        <main className="page-shell">
          <HeroSection />
          <ClientLogoStrip />
          <ActionStrip />
          <DemoShowcaseSection />
          <PricingSection />
          <QrExperienceSection />
          <AfterBookingSection />
          <TrustSection />
          <FaqSection />
          <ContactSection />
        </main>
      </div>
    </>
  );
}
