import dynamic from "next/dynamic";
import { ClientLogoStrip } from "@/components/sections/client-logo-strip";
import { DemoShowcaseSection } from "@/components/sections/demo-showcase-section";
import { HeroSection } from "@/components/sections/hero-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { QrExperienceSection } from "@/components/sections/qr-experience-section";
import { ActionStrip } from "@/components/sections/action-strip";

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://www.onelink.cards/#website",
    url: "https://www.onelink.cards/",
    name: "OneLink",
    alternateName: ["OneLink Cards", "OneLink Smart Business Page"],
    inLanguage: "en-IN",
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://www.onelink.cards/#organization",
    name: "OneLink",
    alternateName: "OneLink Cards",
    url: "https://www.onelink.cards/",
    logo: {
      "@type": "ImageObject",
      url: "https://www.onelink.cards/onelink-primary-logo.png",
    },
    description: "OneLink is a premium mobile-first smart business page and customer-action platform.",
    parentOrganization: {
      "@type": "Organization",
      name: "Kriyon Group Private Limited",
      url: "https://www.kriyongroup.com/",
    },
    sameAs: ["https://www.instagram.com/onelinkcards/"],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-9622121100",
      email: "mailto:onelink@repixelx.tech",
      contactType: "sales",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi"],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.onelink.cards/#service",
    name: "OneLink Smart Business Page",
    serviceType: "Smart business page and customer-action platform",
    provider: { "@id": "https://www.onelink.cards/#organization" },
    areaServed: { "@type": "Country", name: "India" },
    description: "A professionally designed mobile-first business page for services, menus, products, bookings, payments, reviews, locations and customer enquiries.",
    url: "https://www.onelink.cards/",
  },
];

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <div className="relative isolate overflow-x-clip bg-[linear-gradient(180deg,#edf6ff_0%,#f5f9fc_18%,#f6f9fc_48%,#f4f8fc_100%)]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[780px] bg-[radial-gradient(circle_at_50%_0%,rgba(0,169,255,0.22),transparent_56%),radial-gradient(circle_at_12%_8%,rgba(0,169,255,0.12),transparent_28%),linear-gradient(180deg,#edf6ff_0%,#f5f9fc_44%,rgba(245,249,252,0)_100%)]" />
        <main className="page-shell">
          <HeroSection />
          <ActionStrip />
          <ClientLogoStrip />
          <DemoShowcaseSection />
          <PricingSection />
          <AfterBookingSection />
          <QrExperienceSection />
          <TrustSection />
          <FaqSection />
          <ContactSection />
        </main>
      </div>
    </>
  );
}
