export type LegalSection = {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type LegalDocument = {
  title: string;
  subtitle: string;
  sections: LegalSection[];
};

export const legalUpdatedOn = "3 April 2026";

export const termsDocument: LegalDocument = {
  title: "Terms & Conditions",
  subtitle:
    "Please read these terms carefully before purchasing or using OneLink.",
  sections: [
    {
      id: "introduction",
      title: "Introduction",
      paragraphs: [
        "These Terms & Conditions govern the purchase, booking, delivery, and use of OneLink services. By booking, paying for, accessing, or using the service, you agree to be bound by these terms.",
        "If you do not agree with these terms, please do not proceed with payment or service use. These terms should be read together with the applicable pricing page, invoice, order confirmation, and related policies published on this website.",
      ],
    },
    {
      id: "about-onelink",
      title: "About OneLink",
      paragraphs: [
        "OneLink is a done-for-you smart business page and mini website service created for businesses that want one premium page for calls, payments, bookings, reviews, menus, maps, and related customer actions.",
        "Depending on the plan selected, the service may include business-page design, link setup, domain connection, hosting, support, QR setup, poster creatives, and related digital delivery components.",
      ],
    },
    {
      id: "business-identity",
      title: "Business Identity",
      paragraphs: [
        "OneLink is a venture by Kriyon Group Private Limited.",
        "Official billing details, tax invoice particulars, and statutory information are shared on valid invoice documents, order confirmations, or on a valid request where required for compliance or customer support.",
      ],
    },
    {
      id: "eligibility",
      title: "Eligibility",
      paragraphs: [
        "You must provide true, accurate, and complete information while booking or using the service.",
        "You confirm that you have the authority to submit your business name, brand assets, logos, menus, service descriptions, contact information, images, links, and any other material required to build the page.",
      ],
    },
    {
      id: "plans-pricing-taxes",
      title: "Plans, Pricing, and Taxes",
      paragraphs: [
        "All prices are listed in Indian Rupees unless stated otherwise. Pricing on the website, invoice, or booking flow should be read together with the plan inclusions shown at the time of purchase.",
        "Where stated, GST may be included in displayed pricing. Inclusions, renewal periods, hosting terms, support duration, and related entitlements vary depending on the selected plan. Add-ons, custom requests, and scope expansions are billed separately where applicable.",
      ],
    },
    {
      id: "booking-payment",
      title: "Booking and Payment",
      paragraphs: [
        "Payment may be collected through Razorpay or other enabled payment methods. Supported options may include UPI, debit cards, credit cards, net banking, and eligible EMI options depending on gateway availability.",
        "A booking is treated as confirmed only after successful payment confirmation. Invoice acknowledgement, payment confirmation, or order confirmation may be shared after the transaction is successfully processed.",
      ],
    },
    {
      id: "project-process",
      title: "Project Start and Delivery Process",
      paragraphs: [
        "After booking, the team may contact you for requirement gathering, approvals, onboarding, and execution planning. Calls, meetings, or review checkpoints may be scheduled to understand your business and align the final page direction.",
        "Delivery timelines depend on the timely sharing of required inputs, approvals, and decisions from your side. Missing inputs, incomplete content, slow approvals, or scope changes can affect delivery timelines.",
      ],
    },
    {
      id: "client-inputs",
      title: "Client Inputs and Content",
      paragraphs: [
        "You are responsible for supplying accurate business information, logos, images, text, pricing, service information, menus, links, maps, reviews, social handles, and other required content.",
        "You confirm that you own or are authorized to use all submitted content. We may rely on your instructions and supplied materials while building the page.",
      ],
    },
    {
      id: "revisions",
      title: "Revisions",
      paragraphs: [
        "Where a revision or design correction window is offered, it covers reasonable design and content corrections within the original booked scope. This may include alignment fixes, text corrections, small visual adjustments, and content corrections shared during the stated window.",
        "Major redesigns, scope changes, new sections, new features, additional content restructuring, or materially changed business direction are not treated as standard revisions and may be billed separately.",
      ],
    },
    {
      id: "domains-hosting-support",
      title: "Domains, Hosting, and Support",
      paragraphs: [
        "Domain connection, hosting, and support are included only according to the selected plan and only for the included term shown at the time of purchase.",
        "Where a plan requires renewal after an included period, failure to renew may result in the expiry or suspension of the related services after the covered term ends. Starter or lower-duration plans may use different domain, subdomain, or link arrangements from full-duration plans.",
      ],
    },
    {
      id: "qr-deliverables",
      title: "QR Code and Creative Deliverables",
      paragraphs: [
        "QR code setup, poster design, counter display creatives, or related supporting assets are included only if they are specifically listed in the chosen plan or order summary.",
        "Final deliverables may be shared in standard digital formats suitable for online use, display, or print support as applicable.",
      ],
    },
    {
      id: "addons",
      title: "Admin Panel and Micro Changes",
      paragraphs: [
        "Admin Panel access is optional and separately billed where applicable. Micro Changes are limited to small update requests such as one text change, one price change, or one image change per unit.",
        "Structural edits, layout redesigns, branding revisions, advanced configuration work, feature additions, or larger content changes are outside the scope of Micro Changes unless separately agreed.",
      ],
    },
    {
      id: "acceptable-use",
      title: "Acceptable Use",
      paragraphs: [
        "OneLink may not be used for illegal, infringing, fraudulent, misleading, abusive, defamatory, harmful, or prohibited business activities.",
        "We reserve the right to refuse, pause, or terminate service where misuse, policy breach, unlawful conduct, or harmful business activity is identified or reasonably suspected.",
      ],
    },
    {
      id: "third-party-services",
      title: "Third-Party Services",
      paragraphs: [
        "The service may depend on third-party providers and platforms such as payment gateways, hosting services, domain providers, messaging apps, maps, social platforms, review platforms, and analytics systems.",
        "We are not responsible for outages, platform restrictions, policy changes, API changes, suspensions, downtime, or service interruptions caused by third-party providers beyond our reasonable control.",
      ],
    },
    {
      id: "no-guaranteed-results",
      title: "No Guaranteed Business Results",
      paragraphs: [
        "OneLink is a digital setup, presentation, and conversion-support solution. It does not guarantee leads, sales, reach, customer growth, search rankings, conversions, or business results.",
        "Business outcomes depend on many external factors including pricing, offer quality, market demand, content quality, response time, and business operations.",
      ],
    },
    {
      id: "limitation-of-liability",
      title: "Limitation of Liability",
      paragraphs: [
        "To the extent permitted by law, our total liability relating to any specific order or service is limited to the amount actually paid for that relevant service or order.",
        "To the extent legally permitted, we are not liable for indirect, incidental, special, punitive, or consequential losses, including loss of profit, goodwill, data, expected sales, or business interruption.",
      ],
    },
    {
      id: "suspension-termination",
      title: "Suspension / Termination",
      paragraphs: [
        "We may suspend or terminate service in cases of policy violations, unlawful use, abusive conduct, repeated non-cooperation, fraudulent activity, chargebacks, or material misuse of the service.",
        "Suspension or termination does not automatically entitle the customer to a refund where work has already started or value has already been delivered.",
      ],
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property",
      paragraphs: [
        "The OneLink brand, internal design systems, codebase, workflows, templates, and service methods remain the property of the company unless expressly agreed otherwise in writing.",
        "You retain rights over your own submitted brand content, business materials, logos, and assets, subject to your confirmation that you are authorized to use and share them.",
      ],
    },
    {
      id: "governing-law",
      title: "Governing Law and Jurisdiction",
      paragraphs: [
        "These terms are governed by the laws of India.",
        "Any dispute arising from or relating to the service shall be subject to the jurisdiction of the courts at Jammu, Jammu & Kashmir, unless changed in writing on the advice of legal counsel.",
      ],
    },
    {
      id: "contact",
      title: "Contact",
      paragraphs: [
        "For legal notices, service questions, or support requests, please contact us through the support email or official support route published on this website.",
        "We may ask for your order reference, booking ID, invoice number, business name, and contact details to process a request efficiently.",
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
