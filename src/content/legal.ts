export type LegalSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type LegalDocument = {
  title: string;
  subtitle: string;
  updatedOn?: string;
  sections: LegalSection[];
};

export const legalUpdatedOn = "3 April 2026";

export const termsDocument: LegalDocument = {
  title: "Terms & Conditions",
  subtitle:
    "The key commercial terms for purchasing, activating and using OneLink.",
  updatedOn: "15 July 2026",
  sections: [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      paragraphs: [
        "These Terms & Conditions govern the purchase, setup, access and use of OneLink services. By purchasing a plan, approving a proposal, making a payment or using a OneLink page, you agree to these terms.",
      ],
    },
    {
      id: "professional-setup",
      title: "One-Time Professional Setup",
      paragraphs: [
        "The One-Time Professional Setup fee covers business onboarding, content organisation, professional design, brand customisation, action and link configuration, branded QR-code setup, testing and launch support.",
        "The setup fee is charged separately from Platform Care and becomes non-refundable once onboarding, design, configuration, content work or production has started.",
      ],
    },
    {
      id: "platform-care",
      title: "Platform Care",
      paragraphs: [
        "Platform Care keeps the customer’s OneLink active for the selected term and may include secure hosting, platform access, routine maintenance, technical support, compatibility updates and eligible minor content updates.",
        "The applicable One-Time Professional Setup fee and selected Platform Care fee must be paid before work begins, unless otherwise agreed in writing.",
      ],
    },
    {
      id: "renewal",
      title: "Renewal Policy",
      paragraphs: [
        "Platform Care must be renewed before expiry to continue uninterrupted service. Pricing may be revised at renewal to reflect infrastructure, support, product, inflation, tax or operating-cost changes.",
        "For existing active customers, an increase in the standard Platform Care fee will not exceed 7% within a 12-month period unless the customer changes the plan, adds branches, users or modules, increases the service scope, or agrees to separate enterprise terms.",
      ],
    },
    {
      id: "refunds",
      title: "Refund Policy",
      paragraphs: [
        "Setup fees are non-refundable once work has commenced. Platform Care fees are generally non-refundable after activation, except where required by applicable law.",
        "Custom development, integrations, add-ons, additional branches, priority work and third-party services are non-refundable once work or procurement has begun.",
      ],
    },
    {
      id: "cancellation",
      title: "Cancellation",
      paragraphs: [
        "Customers may choose not to renew after their active paid term ends. Cancellation does not create a refund entitlement for setup work, an activated Platform Care term, custom development, add-ons or third-party expenses.",
        "If Platform Care expires without renewal, the OneLink page, dashboard, support, updates, public URL or QR destination may be suspended or become unavailable.",
      ],
    },
    {
      id: "included-updates",
      title: "Included Updates",
      paragraphs: [
        "Each active Platform Care Plan includes up to five minor content update requests per calendar month, unless a different limit is stated in the selected plan or proposal.",
        "Minor updates include changes to existing text, prices, timings, contact details, images, menu items, services or products. Unused updates do not carry forward, and unrelated edits may be counted as separate requests.",
      ],
    },
    {
      id: "additional-updates",
      title: "Additional Updates",
      paragraphs: [
        "Additional updates beyond the included allowance are chargeable. Current pricing will be communicated before work begins and may change from time to time.",
        "Large content replacements, full menu or catalogue re-entry, structural changes and priority updates may be quoted as separate work or support packages.",
      ],
    },
    {
      id: "new-features",
      title: "New Features & Custom Work",
      paragraphs: [
        "New features, workflows, integrations, dashboards, redesigns, branches, automation or custom functionality are not included in routine updates.",
        "OneLink will review these requirements and provide a separate scope, quotation and timeline before starting work. A verbal discussion does not confirm that custom work is included without charge.",
      ],
    },
    {
      id: "customer-responsibilities",
      title: "Customer Responsibilities",
      paragraphs: [
        "Customers must provide accurate, lawful and authorised business information, branding assets, menus, services, products, pricing, contact details, location links, media and approvals.",
        "The customer is responsible for the accuracy and authority of supplied content. OneLink is not responsible for disputes or losses caused by incorrect, unlawful or unauthorised customer-provided information.",
      ],
    },
    {
      id: "delivery",
      title: "Delivery",
      paragraphs: [
        "Delivery timelines begin after required payment, complete content, necessary access, links and approvals have been received.",
        "Missing information, repeated revisions, third-party dependencies or delayed approvals may extend delivery. Major changes to an approved direction or scope may be quoted separately.",
      ],
    },
    {
      id: "pricing-gst",
      title: "Pricing & GST",
      paragraphs: [
        "All displayed prices are exclusive of GST unless expressly stated otherwise. Applicable GST and statutory charges will be added to the invoice.",
        "OneLink may revise pricing for future purchases and renewals. A promotional price does not guarantee the same discounted price at renewal.",
      ],
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property",
      paragraphs: [
        "The OneLink platform, code, systems, templates, workflows, design framework, dashboards, product architecture and related intellectual property remain the property of Kriyon Group Private Limited or its authorised licensors.",
        "Customers retain ownership of their original business content. Payment does not transfer ownership of OneLink source code, platform architecture or reusable systems.",
      ],
    },
    {
      id: "limitation-of-liability",
      title: "Limitation of Liability",
      paragraphs: [
        "OneLink does not guarantee enquiries, bookings, sales, search rankings, customer conversion, social growth or revenue. Results depend on the customer’s offer, traffic, reputation, pricing, response time and operations.",
        "To the extent permitted by law, OneLink is not responsible for losses arising from third-party services, customer-provided content, network failures or events beyond reasonable control.",
      ],
    },
    {
      id: "contact",
      title: "Contact",
      paragraphs: [
        "For support, billing or legal enquiries, contact OneLink, a venture of Kriyon Group Private Limited.",
        "Phone: +91 9622121100 · Email: onelink@repixelx.tech · Website: onelink.cards",
      ],
    },
  ],
};

export const refundDocument: LegalDocument = {
  title: "Refund & Cancellation Policy",
  subtitle:
    "Our refund policy is designed to be fair, clear, and transparent.",
  sections: [
    {
      id: "general-principle",
      title: "General Principle",
      paragraphs: [
        "OneLink is a digital service that involves planning, coordination, design, setup, support, and execution work. Because work may begin shortly after booking, refund eligibility depends on the stage of the project and the work already carried out.",
      ],
    },
    {
      id: "before-work-starts",
      title: "Before Work Starts",
      paragraphs: [
        "If a cancellation request is made before work starts or before meaningful onboarding, setup, or design activity begins, a refund request may be reviewed in good faith.",
        "Payment gateway charges, taxes, administrative costs, or other non-recoverable fees may be deducted where applicable.",
      ],
    },
    {
      id: "after-work-starts",
      title: "After Work Has Started",
      paragraphs: [
        "Once requirement gathering, design, setup, revision handling, domain work, hosting setup, or production work has started, the booking amount may become partially or fully non-refundable depending on the work completed and costs already incurred.",
      ],
    },
    {
      id: "after-preview-approval",
      title: "After Design Preview / Approval",
      paragraphs: [
        "Once a design preview has been shared or approved, refund eligibility becomes heavily restricted.",
        "After go-live, substantial completion, or material delivery of the agreed scope, amounts paid are generally non-refundable.",
      ],
    },
    {
      id: "plan-renewals",
      title: "Plan Renewals",
      paragraphs: [
        "Renewals for hosting, support, domain, or covered service periods are generally non-refundable once activated, processed, or provisioned.",
      ],
    },
    {
      id: "add-ons",
      title: "Add-ons",
      paragraphs: [
        "Admin Panel, Micro Changes, urgent delivery fees, custom add-ons, and extra services are generally non-refundable once delivered, initiated, or reserved for execution.",
      ],
    },
    {
      id: "failed-duplicate-payments",
      title: "Failed / Duplicate Payments",
      paragraphs: [
        "Failed transactions are not treated as successful orders. If a duplicate payment is confirmed, it may be corrected or refunded after verification.",
      ],
    },
    {
      id: "chargebacks",
      title: "Chargebacks",
      paragraphs: [
        "If a customer initiates a chargeback without first contacting support to resolve the concern, we reserve the right to pause service and contest the chargeback using order, communication, and delivery evidence.",
      ],
    },
    {
      id: "how-to-request-review",
      title: "How to Request Review",
      paragraphs: [
        "Refund or cancellation requests should be made in writing through the support email or official support route.",
        "Please include the order or payment reference, business name, and a clear reason for the request so the matter can be reviewed efficiently.",
      ],
    },
    {
      id: "final-decision",
      title: "Final Decision",
      paragraphs: [
        "Refund and cancellation reviews are decided based on the stage of the order, work completed, costs incurred, service configuration already carried out, and fairness to both the customer and the business.",
        "Any approved refund, partial refund, or cancellation outcome will be communicated after review.",
      ],
    },
  ],
};

export const privacyDocument: LegalDocument = {
  title: "Privacy Policy",
  subtitle: "How we collect, use, and protect your information.",
  sections: [
    {
      id: "information-collected",
      title: "Information Collected",
      paragraphs: [
        "We may collect information such as your name, phone number, email address, business details, order and payment references, communication history, and the content or assets you share for page creation.",
        "This may include logos, menus, images, links, review links, maps, social handles, and other business materials submitted by you during enquiry, booking, onboarding, or support.",
      ],
    },
    {
      id: "how-information-is-used",
      title: "How Information Is Used",
      paragraphs: [
        "We use your information to process bookings, communicate with you, design and deliver your OneLink page, issue invoices, provide support, and improve the service.",
        "Information may also be used for internal operations such as order tracking, service administration, troubleshooting, fraud prevention, and quality improvement.",
      ],
    },
    {
      id: "payment-handling",
      title: "Payment Handling",
      paragraphs: [
        "Payments may be processed through Razorpay or other enabled payment providers. We do not state that raw card data is stored by our business unless expressly disclosed in a payment provider workflow.",
        "Payment providers may collect and process the information necessary to complete a transaction according to their own privacy and security practices.",
      ],
    },
    {
      id: "sharing",
      title: "Sharing",
      paragraphs: [
        "Information is shared only where reasonably required with service providers, support systems, hosting providers, payment partners, domain or technical vendors, or when required by law, regulation, or a valid legal process.",
      ],
    },
    {
      id: "security",
      title: "Security",
      paragraphs: [
        "We take reasonable technical and operational steps to protect information under our control. However, no system, website, or digital workflow can guarantee absolute security.",
      ],
    },
    {
      id: "cookies-analytics",
      title: "Cookies / Analytics",
      paragraphs: [
        "This website may use basic cookies, analytics, or session technologies to understand usage, improve performance, support booking flows, and maintain website functionality.",
      ],
    },
    {
      id: "user-rights",
      title: "User Rights / Correction Requests",
      paragraphs: [
        "You may request correction of inaccurate information that you have submitted to us. We may ask for verification before acting on a request where necessary.",
      ],
    },
    {
      id: "privacy-contact",
      title: "Contact for Privacy Requests",
      paragraphs: [
        "For privacy-related questions, correction requests, or support issues, please contact us through the support email or official support route published on this website.",
      ],
    },
  ],
};
