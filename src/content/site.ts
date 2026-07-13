import { sanitizePhoneNumber } from "@/lib/utils";

export type IconName =
  | "spark"
  | "phone"
  | "whatsapp"
  | "wallet"
  | "map"
  | "reviews"
  | "gallery"
  | "form"
  | "social"
  | "menu"
  | "shield"
  | "bolt"
  | "qr"
  | "chart"
  | "check"
  | "building"
  | "invoice"
  | "calendar"
  | "download"
  | "mail"
  | "user"
  | "play"
  | "instagram"
  | "reel"
  | "eye"
  | "close"
  | "logo"
  | "chevron-left"
  | "chevron-right";

export type NavItem = {
  label: string;
  href: string;
};

export type MaintenanceOption = {
  id: string;
  label: string;
  price: number;
};

export type PlanFeature = {
  text: string;
  status: "checked" | "crossed" | "plus";
};

export type Plan = {
  id: string;
  name: string;
  audience?: string;
  description?: string;
  badge?: string;
  highlight?: boolean;
  ctaLabel: string;
  setupAmount: number;
  hostingAmount: number;
  orderAmount: number;
  orderMode: "setup" | "full";
  originalAmount?: number;
  monthlyEquivalent: number;
  maintenanceOptions: MaintenanceOption[];
  savingsText?: string;
  taxText?: string;
  renewalText?: string;
  monthlyMessage?: string;
  psychologyText?: string;
  tone?: "launch" | "freedom" | "starter" | "premium";
  isHiddenOption?: boolean;
  hsnSac?: string;
  taxableValue?: number;
  cgstAmount?: number;
  sgstAmount?: number;
  features: PlanFeature[];
};

export type PricingAddOn = {
  id: string;
  name: string;
  price: string;
  amount: number;
  description: string;
  taxableValue: number;
  cgstAmount: number;
  sgstAmount: number;
  hsnSac: string;
};

export type SolutionCategory = {
  id: string;
  title: string;
  subtitle: string;
  audience: string[];
  actions: string[];
  fit: string;
};

export type FeatureItem = {
  title: string;
  description: string;
  icon: IconName;
};

export type DemoSection = {
  title: string;
  items: string[];
};

export type DemoItem = {
  slug: string;
  label: string;
  title: string;
  description: string;
  actions: string[];
  businessName: string;
  tagline: string;
  location: string;
  trustLine: string;
  highlights: string[];
  sections: DemoSection[];
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export type PaymentBadge = {
  label: string;
  tone?: "default" | "accent" | "dark";
};

export const siteConfig = {
  brand: {
    name: "OneLink",
    tagline: "One link. Every action.",
    description:
      "OneLink helps businesses bring their services, products and customer actions into one smart digital experience.",
  },
  contact: {
    whatsappNumber: sanitizePhoneNumber(
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919622121100",
    ),
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+91 9622121100",
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "hello@repixelx.tech",
    company: "Kriyon Group Private Limited",
    officeLines: [
      "Room No. 2, First Floor",
      "Tawi Enclave, Vill Nandini, Gol Gujral",
      "Jammu, Jammu & Kashmir 180002, India",
    ],
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Room+No.+2%2C+First+Floor%2C+Tawi+Enclave%2C+Vill+Nandini%2C+Gol+Gujral%2C+Jammu%2C+Jammu+%26+Kashmir+180002%2C+India",
  },
  social: {
    instagram:
      process.env.NEXT_PUBLIC_INSTAGRAM_URL ?? "https://www.instagram.com/onelinkcards/",
  },
};

export const navItems: NavItem[] = [
  { label: "Work", href: "/#work" },
  { label: "Pricing", href: "/#pricing" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "FAQs", href: "/#faqs" },
];

export const heroTrustBadges = [
  "Secure payment",
  "GST invoice",
  "Human support",
];

export const whyOneLinkBenefits = [
  {
    title: "One page for everything",
    description:
      "Calls, WhatsApp, payments, maps, reviews, and business details live in one place.",
  },
  {
    title: "Faster customer action",
    description:
      "Customers do not waste time switching between five links before they act.",
  },
  {
    title: "Cleaner business identity",
    description:
      "Salon, clinic, gym, retail, or CA firm — one polished page reads more serious than a pile of links.",
  },
  {
    title: "Better trust",
    description:
      "A single polished page improves confidence before the customer calls or pays.",
  },
];

export const trustHighlights = [
  {
    title: "Secure Hosting",
    description: "Professionally managed and protected.",
  },
  {
    title: "Transparent Pricing",
    description: "Clear charges with no hidden surprises.",
  },
  {
    title: "Human Support",
    description: "Real assistance whenever required.",
  },
  {
    title: "Easy Updates",
    description: "Keep your information and offers current.",
  },
];

export const comparisonLists = {
  without: [
    "Separate WhatsApp link",
    "Separate payment link",
    "Separate map link",
    "Separate review link",
    "Separate menu or services link",
    "Customer confusion and missed actions",
  ],
  with: [
    "One branded page",
    "Faster customer action",
    "Stronger business trust",
    "Cleaner business identity",
    "Easier sharing everywhere",
    "Higher conversion potential",
  ],
};

export const solutionCategories: SolutionCategory[] = [
  {
    id: "essential",
    title: "Essential",
    subtitle: "For experts who need a sharp digital front door.",
    audience: [
      "CAs",
      "Lawyers",
      "Doctors",
      "Consultants",
      "Trainers",
      "Freelancers",
    ],
    actions: [
      "Call instantly",
      "Send WhatsApp enquiry",
      "Book a consultation",
      "Review services and credibility",
    ],
    fit: "Keeps the brand polished, professional, and easy to trust from the first click.",
  },
  {
    id: "business",
    title: "Business",
    subtitle: "For local operators that need more enquiries and better conversion.",
    audience: [
      "Salons",
      "Clinics",
      "Gyms",
      "Agencies",
      "Service businesses",
      "Local brands",
    ],
    actions: [
      "Tap to call",
      "Chat on WhatsApp",
      "See services",
      "Find the business on Maps",
    ],
    fit: "Designed for businesses that lose leads when information is scattered across too many channels.",
  },
  {
    id: "commerce",
    title: "Commerce / Food",
    subtitle: "For menus, catalogues, orders, and high-intent discovery.",
    audience: [
      "Restaurants",
      "Cafes",
      "Cloud kitchens",
      "Catalog shops",
      "Frozen food stores",
      "Specialty retail",
    ],
    actions: [
      "Open menu or catalogue",
      "Place order intent fast",
      "Check reviews",
      "Navigate in one tap",
    ],
    fit: "Built for action-heavy businesses that need a cleaner way to drive orders, visits, and repeat customers.",
  },
];

export const demoItems: DemoItem[] = [
  {
    slug: "restaurant",
    label: "Restaurant example",
    title: "Spice Route Kitchen",
    description:
      "A polished page that turns social traffic into reservations, directions, menu views, and WhatsApp orders.",
    actions: ["Call", "WhatsApp", "Menu", "Reviews"],
    businessName: "Spice Route Kitchen",
    tagline: "Modern Indian plates, private dining, and quick takeaway.",
    location: "Vijay Nagar, Indore",
    trustLine: "Rated 4.8 on Google",
    highlights: ["Table booking", "Signature menu", "Location", "Review proof"],
    sections: [
      {
        title: "Featured actions",
        items: ["Reserve a table", "View menu", "Order on WhatsApp", "Get directions"],
      },
      {
        title: "Menu highlights",
        items: ["Tandoor platters", "Chef specials", "Weekend brunch", "Private event catering"],
      },
      {
        title: "Trust signals",
        items: ["4.8 rating", "Photos", "Live map", "Open until 11 PM"],
      },
    ],
  },
  {
    slug: "consultant",
    label: "Consultant example",
    title: "Aarav Mehta Advisory",
    description:
      "A conversion-focused expert page that moves prospects from curiosity to booked conversations.",
    actions: ["Call", "Book", "Services", "Reviews"],
    businessName: "Aarav Mehta Advisory",
    tagline: "Strategy, tax planning, and business structuring for growth-stage founders.",
    location: "Bandra, Mumbai",
    trustLine: "Trusted by 120+ retained clients",
    highlights: ["Consultation booking", "Service clarity", "Proof of trust", "Fast enquiry"],
    sections: [
      {
        title: "Primary actions",
        items: ["Schedule a consultation", "Call now", "Explore services", "Send documents securely"],
      },
      {
        title: "Service lines",
        items: ["Tax advisory", "Entity setup", "Compliance reviews", "Founder retainers"],
      },
      {
        title: "Trust signals",
        items: ["Client testimonials", "FAQ block", "City presence", "Priority callback"],
      },
    ],
  },
  {
    slug: "retail",
    label: "Retail / catalogue example",
    title: "Haus & Habit Studio",
    description:
      "A branded catalogue-style page that makes discovery, enquiry, and store visits feel effortless.",
    actions: ["WhatsApp", "Catalogue", "Maps", "Instagram"],
    businessName: "Haus & Habit Studio",
    tagline: "Curated home accents, gifting collections, and made-to-order decor.",
    location: "Banjara Hills, Hyderabad",
    trustLine: "Catalogue refreshed every week",
    highlights: ["New arrivals", "Direct enquiry", "Store navigation", "Social proof"],
    sections: [
      {
        title: "Primary actions",
        items: ["Open catalogue", "Enquire on WhatsApp", "Visit showroom", "See Instagram"],
      },
      {
        title: "Collections",
        items: ["Table decor", "Gifting sets", "Festive drops", "Custom orders"],
      },
      {
        title: "Trust signals",
        items: ["Customer reviews", "Store timings", "Gallery", "Fast response promise"],
      },
    ],
  },
];

export const featureColumns: Array<{
  title: string;
  items: FeatureItem[];
}> = [
  {
    title: "Customer actions",
    items: [
      {
        title: "Click-to-call",
        description: "Let customers move from interest to a live conversation in one tap.",
        icon: "phone",
      },
      {
        title: "WhatsApp integration",
        description: "Start real conversations fast without making the customer hunt for contact details.",
        icon: "whatsapp",
      },
      {
        title: "Lead capture form",
        description: "Collect structured enquiries from visitors who prefer to submit details first.",
        icon: "form",
      },
      {
        title: "Menu / service blocks",
        description: "Show what you offer with enough clarity to drive the next action.",
        icon: "menu",
      },
    ],
  },
  {
    title: "Trust and discovery",
    items: [
      {
        title: "Google Maps",
        description: "Help visitors reach you quickly with clear map access from the same page.",
        icon: "map",
      },
      {
        title: "Google Reviews",
        description: "Surface proof and confidence where the customer is deciding what to do next.",
        icon: "reviews",
      },
      {
        title: "Gallery",
        description: "Show product, space, or service visuals inside the same premium page experience.",
        icon: "gallery",
      },
      {
        title: "Social links",
        description: "Keep your most important social channels available without fragmenting the journey.",
        icon: "social",
      },
    ],
  },
  {
    title: "Brand and setup",
    items: [
      {
        title: "Branded business page",
        description: "A clean, premium mini website designed around your business identity.",
        icon: "spark",
      },
      {
        title: "Mobile-first design",
        description: "Built for the way Indian customers actually open links, browse, and take action.",
        icon: "bolt",
      },
      {
        title: "QR-ready sharing",
        description: "Share your OneLink on packaging, counters, posters, and WhatsApp without extra setup.",
        icon: "qr",
      },
      {
        title: "Fast launch",
        description: "Done-for-you delivery means you focus on selling while the page gets built for you.",
        icon: "chart",
      },
    ],
  },
];

export const paymentBadges: PaymentBadge[] = [
  { label: "Razorpay", tone: "dark" },
  { label: "UPI", tone: "accent" },
  { label: "Visa", tone: "default" },
  { label: "Mastercard", tone: "default" },
  { label: "RuPay", tone: "default" },
  { label: "Credit Card", tone: "default" },
  { label: "Debit Card", tone: "default" },
  { label: "Net Banking", tone: "default" },
  { label: "EMI Available", tone: "dark" },
  { label: "Secure Checkout", tone: "dark" },
];

export const pricingPlans: Plan[] = [
  {
    id: "essential",
    name: "Essential",
    audience:
      "Digital presence",
    description: "Professional digital presence",
    badge: "Easy Start",
    ctaLabel: "Get Essential",
    setupAmount: 2799,
    hostingAmount: 2599,
    orderAmount: 5398,
    originalAmount: 3999,
    monthlyEquivalent: 900,
    maintenanceOptions: [
      { id: "3-month", label: "3 Months", price: 1399 },
      { id: "6-month", label: "6 Months", price: 2599 },
      { id: "12-month", label: "12 Months", price: 4799 },
    ],
    taxText: "+ GST (18%)",
    orderMode: "full",
    hsnSac: "9983",
    features: [
      { text: "Professionally customized OneLink page", status: "checked" },
      { text: "Free branded QR code", status: "checked" },
      { text: "Call, WhatsApp, location and payment actions", status: "checked" },
      { text: "Services, menu, products, rooms or profile showcase", status: "checked" },
      { text: "Gallery, social links and Google Reviews", status: "checked" },
      { text: "Save Contact, Share OneLink and secure hosting", status: "checked" },
    ],
  },
  {
    id: "signature",
    name: "Signature",
    audience:
      "Bookings, orders and enquiries",
    description: "Bookings, orders and customer conversion",
    badge: "Most Popular",
    highlight: true,
    ctaLabel: "Choose Signature",
    setupAmount: 4799,
    hostingAmount: 4699,
    orderAmount: 9498,
    originalAmount: 6999,
    monthlyEquivalent: 1583,
    maintenanceOptions: [
      { id: "3-month", label: "3 Months", price: 2499 },
      { id: "6-month", label: "6 Months", price: 4699 },
      { id: "12-month", label: "12 Months", price: 8499 },
    ],
    taxText: "+ GST (18%)",
    tone: "premium",
    orderMode: "full",
    hsnSac: "9983",
    features: [
      { text: "Everything included in Essential", status: "checked" },
      { text: "Complete WhatsApp booking and enquiry system", status: "checked" },
      { text: "Appointment, table, room or service booking flow", status: "checked" },
      { text: "Takeaway, order request or product enquiry flow", status: "checked" },
      { text: "Detailed menu, services, catalogue, rooms or packages", status: "checked" },
      { text: "Offers, promotional sections and priority support", status: "checked" },
    ],
  },
  {
    id: "elite",
    name: "Elite",
    audience:
      "Management software",
    description: "Complete business management software",
    badge: "Complete Software",
    ctaLabel: "Get Elite",
    setupAmount: 9799,
    hostingAmount: 7999,
    orderAmount: 17798,
    originalAmount: 12999,
    monthlyEquivalent: 3299,
    maintenanceOptions: [
      { id: "3-month", label: "3 Months", price: 4199 },
      { id: "6-month", label: "6 Months", price: 7999 },
      { id: "12-month", label: "12 Months", price: 14499 },
    ],
    taxText: "+ GST (18%)",
    tone: "premium",
    orderMode: "full",
    hsnSac: "9983",
    features: [
      { text: "Everything included in Signature", status: "checked" },
      { text: "Complete admin and management dashboard", status: "checked" },
      { text: "Booking, appointment, room, table or order management", status: "checked" },
      { text: "Customer, lead and enquiry management", status: "checked" },
      { text: "Menu, services, products, pricing and availability controls", status: "checked" },
      { text: "Real-time notifications, analytics and business reports", status: "checked" },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    audience:
      "Custom systems and integrations",
    description: "Custom solutions for growing brands, multiple locations and advanced business requirements.",
    badge: "Custom Solution",
    ctaLabel: "Request Proposal",
    setupAmount: 24999,
    hostingAmount: 0,
    orderAmount: 24999,
    originalAmount: 34999,
    monthlyEquivalent: 0,
    maintenanceOptions: [
      { id: "3-month", label: "3 Months", price: 0 },
      { id: "6-month", label: "6 Months", price: 0 },
      { id: "12-month", label: "12 Months", price: 0 },
    ],
    taxText: "+ GST (18%)",
    orderMode: "full",
    hsnSac: "9983",
    features: [
      { text: "Everything included in Elite", status: "checked" },
      { text: "Custom dashboards and operational workflows", status: "checked" },
      { text: "Inventory, hotel, restaurant, retail or clinic systems", status: "checked" },
      { text: "CRM, POS and booking-engine integrations", status: "checked" },
      { text: "WhatsApp API and business automation", status: "checked" },
      { text: "Custom APIs, multi-branch systems and dedicated support", status: "checked" },
    ],
  },
];

export const pricingTrustBadges = [
  "All platform plans are prepaid",
  "All prices are exclusive of 18% GST",
  "Get 1 additional month complimentary with every new setup",
  "Domain, hosting, support and QR included by plan",
  "Features are customized by business category",
];

export const pricingAddOns: PricingAddOn[] = [];

export const howItWorksSteps = [
  {
    number: "01",
    title: "Choose your plan",
    description: "Select the setup that fits your business.",
  },
  {
    number: "02",
    title: "Share your requirements",
    description: "Send your content, branding and preferred customer actions.",
  },
  {
    number: "03",
    title: "We design your OneLink",
    description: "Our team creates a customized experience around your business.",
  },
  {
    number: "04",
    title: "Review and go live",
    description: "Approve your OneLink and receive your link, QR code and launch-ready assets.",
  },
];

export const trustSignals = trustHighlights;

export const testimonials: Testimonial[] = [
  {
    quote:
      "The page made our restaurant look sharper instantly. Customers stopped asking for five different links.",
    name: "Nikita Rao",
    role: "Founder, sample restaurant client",
  },
  {
    quote:
      "It feels closer to a premium mini website than a digital card. The clarity made our bookings smoother.",
    name: "Rahul Shah",
    role: "Consulting practice owner",
  },
  {
    quote:
      "Our catalogue and WhatsApp enquiries finally live in one place. That alone improved how people respond.",
    name: "Ayesha Khan",
    role: "Retail studio owner",
  },
];

export const faqItems: FaqItem[] = [
  {
    question: "What is OneLink?",
    answer:
      "OneLink is a premium smart business page that puts your main customer actions into one branded link.",
  },
  {
    question: "Who is OneLink best for?",
    answer:
      "It is built for Indian businesses that want a cleaner way to share calls, WhatsApp, payments, maps, reviews, and business info.",
  },
  {
    question: "Is EMI available?",
    answer:
      "Yes. EMI messaging is highlighted for eligible payment methods supported through Razorpay checkout.",
  },
  {
    question: "What is included in the plan?",
    answer:
      "The main plans include setup, domain, hosting, support, QR support, and the customer-action workflows included in your selected tier.",
  },
  {
    question: "What happens after I buy?",
    answer:
      "After payment, the setup process starts and your business details move into design, preview, and go-live.",
  },
  {
    question: "How does platform access work?",
    answer:
      "Platform plans are prepaid for 3, 6, or 12 months. During the relaunch offer, every new setup gets 1 additional month complimentary.",
  },
  {
    question: "Are prices inclusive of GST?",
    answer:
      "No. All displayed prices are exclusive of 18% GST. Checkout adds GST and shows the full payable amount.",
  },
  {
    question: "What is the Independent Admin Panel?",
    answer:
      "The Admin Panel gives you full independence to edit your OneLink text, prices, and images yourself in seconds, without needing our design team for every small update.",
  },
];

export const legalCopy = {
  privacy: [
    "OneLink only collects the information you intentionally submit through the contact form or checkout flow, such as your name, business type, city, and requirement details.",
    "This information is used to respond to your enquiry, deliver OneLink, process payments, and support your account. Payment data is handled through Razorpay and is not stored directly in this repository.",
    "If you need this document expanded into a production legal policy, replace this placeholder content with your final legal copy before launch.",
  ],
  terms: [
    "Purchasing OneLink covers the selected plan only and is subject to final delivery scope, content submission, and any agreed revisions or add-ons.",
    "Checkout is processed through Razorpay. Platform access is prepaid for the selected 3, 6, or 12-month duration, with GST shown before payment.",
    "This page is a product website scaffold. Replace these placeholder legal notes with reviewed legal language before taking live production payments.",
  ],
};

export const formBusinessTypes = [
  "Consultant / professional",
  "Clinic / doctor",
  "Salon / beauty",
  "Gym / fitness",
  "Restaurant / cafe",
  "Retail / catalogue brand",
  "Agency / service business",
  "Other",
];

export function getPlanById(planId: string) {
  const normalizedPlanId =
    planId === "launch-plan"
      ? "signature"
      : planId === "business"
        ? "essential"
        : planId;
  return pricingPlans.find((plan) => plan.id === normalizedPlanId);
}

export function getDemoBySlug(slug: string) {
  return demoItems.find((item) => item.slug === slug);
}
