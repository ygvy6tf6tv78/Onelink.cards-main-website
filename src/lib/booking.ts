import {
  getPlanById,
  pricingAddOns,
  siteConfig,
  type Plan,
  type PricingAddOn,
} from "@/content/site";
import { roundTo2, sanitizePhoneNumber } from "@/lib/utils";

export type BookingAddOnId = "admin-panel" | "micro-change";

export type BookingDetails = {
  name: string;
  phone: string;
  email: string;
  businessName: string;
  billingAddress: string;
  city: string;
  state: string;
  website: string;
  gstin?: string;
};

export type BookingDetailsErrors = Partial<Record<keyof BookingDetails, string>>;

export type BookingState = {
  planId?: string;
  maintenanceId?: string;
  /** Number of OneLink seats (bulk / team). Default 1. */
  quantity?: number;
  addOnIds: BookingAddOnId[];
  details: BookingDetails;
  bookingId?: string;
  customerId?: string;
  invoiceNumber?: string;
  orderReference?: string;
  issueDate?: string;
  validUntil?: string;
  orderId?: string;
  paymentId?: string;
};

export type TaxMode = "Intra-state" | "Inter-state";

export type InvoiceRow = {
  id: string;
  item: string;
  description: string;
  quantity: number;
  taxableValue: number;
  gstRate: string;
  cgst: number;
  sgst: number;
  igst: number;
  total: number;
  hsnSac: string;
};

export type BookingInvoice = {
  bookingId: string;
  customerId: string;
  invoiceNumber: string;
  orderReference: string;
  issueDate: string;
  validUntil: string;
  selectedPlan: string;
  status: "UNPAID";
  taxMode: TaxMode;
  placeOfSupply: string;
  customerStateCode: string;
  sellerStateCode: string;
  rows: InvoiceRow[];
  summary: {
    taxableValueSubtotal: number;
    cgstTotal: number;
    sgstTotal: number;
    igstTotal: number;
    grandTotal: number;
    amountInWords: string;
  };
};

type StateOption = {
  name: string;
  code: string;
};

export const BOOKING_STORAGE_KEY = "onelink-booking";

export const sellerInfo = {
  legalName: "KRIYON GROUP PRIVATE LIMITED",
  brand: "OneLink",
  cin: "U74909JK2025PTC017984",
  gstin: "01AAMCK2092B1Z0",
  address:
    "ROOM NO. 2, FIRST FLOOR, TAWI ENCLAVE, VILL NANDINI, GOL GUJRAL, JAMMU, JAMMU & KASHMIR, 180002",
  state: "Jammu & Kashmir",
  stateCode: "01",
};

export const indianStates: StateOption[] = [
  { name: "Jammu & Kashmir", code: "01" },
  { name: "Himachal Pradesh", code: "02" },
  { name: "Punjab", code: "03" },
  { name: "Chandigarh", code: "04" },
  { name: "Uttarakhand", code: "05" },
  { name: "Haryana", code: "06" },
  { name: "Delhi", code: "07" },
  { name: "Rajasthan", code: "08" },
  { name: "Uttar Pradesh", code: "09" },
  { name: "Bihar", code: "10" },
  { name: "Sikkim", code: "11" },
  { name: "Arunachal Pradesh", code: "12" },
  { name: "Nagaland", code: "13" },
  { name: "Manipur", code: "14" },
  { name: "Mizoram", code: "15" },
  { name: "Tripura", code: "16" },
  { name: "Meghalaya", code: "17" },
  { name: "Assam", code: "18" },
  { name: "West Bengal", code: "19" },
  { name: "Jharkhand", code: "20" },
  { name: "Odisha", code: "21" },
  { name: "Chhattisgarh", code: "22" },
  { name: "Madhya Pradesh", code: "23" },
  { name: "Gujarat", code: "24" },
  { name: "Daman & Diu", code: "25" },
  { name: "Dadra & Nagar Haveli and Daman & Diu", code: "26" },
  { name: "Maharashtra", code: "27" },
  { name: "Andhra Pradesh", code: "28" },
  { name: "Karnataka", code: "29" },
  { name: "Goa", code: "30" },
  { name: "Lakshadweep", code: "31" },
  { name: "Kerala", code: "32" },
  { name: "Tamil Nadu", code: "33" },
  { name: "Puducherry", code: "34" },
  { name: "Andaman & Nicobar Islands", code: "35" },
  { name: "Telangana", code: "36" },
  { name: "Andhra Pradesh (New)", code: "37" },
  { name: "Ladakh", code: "38" },
  { name: "Other Territory", code: "97" },
];

export const emptyBookingDetails: BookingDetails = {
  name: "",
  phone: "",
  email: "",
  businessName: "",
  billingAddress: "",
  city: "",
  state: "",
  website: "",
};

export function clampBookingQuantity(raw: unknown): number {
  const n = typeof raw === "number" ? raw : parseInt(String(raw ?? "1"), 10);
  if (!Number.isFinite(n) || n < 1) {
    return 1;
  }
  return Math.min(99, Math.floor(n));
}

/** Bulk tier: 2 → 10%, 3–4 → 15%, 5+ → 25%. */
export function getBulkDiscountPercent(quantity: number): number {
  const q = clampBookingQuantity(quantity);
  if (q >= 5) {
    return 25;
  }
  if (q >= 3) {
    return 15;
  }
  if (q === 2) {
    return 10;
  }
  return 0;
}

export function getEmptyBookingState(): BookingState {
  return {
    planId: undefined,
    maintenanceId: undefined,
    quantity: 1,
    addOnIds: [],
    details: { ...emptyBookingDetails },
    bookingId: undefined,
    customerId: undefined,
    invoiceNumber: undefined,
    orderReference: undefined,
    issueDate: undefined,
    validUntil: undefined,
    orderId: undefined,
    paymentId: undefined,
  };
}

export function validateBookingDetails(
  values: BookingDetails,
): BookingDetailsErrors {
  const errors: BookingDetailsErrors = {};
  const phone = sanitizePhoneNumber(values.phone);
  const email = values.email.trim();

  if (values.name.trim().length < 2) {
    errors.name = "Tell us your full name.";
  }

  if (phone.length !== 10) {
    errors.phone = "Enter a valid 10-digit WhatsApp number.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email for your invoice.";
  }

  if (values.businessName.trim().length < 2) {
    errors.businessName = "What's your business or brand name?";
  }

  if (values.billingAddress.trim().length < 5) {
    errors.billingAddress = "We need a billing address for the invoice.";
  }

  if (values.city.trim().length < 2) {
    errors.city = "Which city is your business in?";
  }

  if (!getStateByName(values.state)) {
    errors.state = "Please choose your state.";
  }

  if (
    values.website.trim().length > 0 &&
    !/^(https?:\/\/|www\.)[\w.-]+\.[a-z]{2,}/i.test(values.website.trim())
  ) {
    errors.website = "Enter a valid link or leave blank.";
  }

  return errors;
}

export function getStateByName(name: string) {
  const normalized = name.trim().toLowerCase();
  return indianStates.find((state) => state.name.toLowerCase() === normalized);
}

export function getSelectedAddOns(addOnIds: BookingAddOnId[]) {
  return addOnIds
    .map((addOnId) => pricingAddOns.find((item) => item.id === addOnId))
    .filter(Boolean) as PricingAddOn[];
}

export function getSelectedMaintenance(plan: Plan, maintenanceId?: string) {
  return (
    plan.maintenanceOptions.find((option) => option.id === maintenanceId) ??
    plan.maintenanceOptions[0]
  );
}

/** GST rate applied on plan line items (setup + care + add-ons) before payment. */
export const GST_RATE = 0.18;

/** Turn GST-exclusive subtotal into the amount charged (inclusive of 18% GST). */
export function applyGstToExclusive(exclusiveTotal: number) {
  return roundTo2(exclusiveTotal * (1 + GST_RATE));
}

/** Sum of setup + selected maintenance (GST-exclusive list prices). */
export function getPlanBaseTotal(plan: Plan, maintenanceId?: string) {
  const maintenance = getSelectedMaintenance(plan, maintenanceId);
  return plan.setupAmount + (maintenance?.price ?? 0);
}

/**
 * GST-inclusive total for one OneLink (setup + care + add-ons).
 * Plan amounts in `site` are exclusive; this applies 18% GST for checkout.
 */
export function getPlanUnitGrandTotal(plan: Plan, maintenanceId?: string, addOnIds: BookingAddOnId[] = []) {
  const baseTotal = getPlanBaseTotal(plan, maintenanceId);
  const addOnTotal = getSelectedAddOns(addOnIds).reduce((sum, addOn) => sum + addOn.amount, 0);
  return applyGstToExclusive(roundTo2(baseTotal + addOnTotal));
}

export function getBulkBookingBreakdown(
  plan: Plan,
  maintenanceId: string | undefined,
  addOnIds: BookingAddOnId[],
  quantity: number,
) {
  const q = clampBookingQuantity(quantity);
  const unit = getPlanUnitGrandTotal(plan, maintenanceId, addOnIds);
  const gross = roundTo2(unit * q);
  const discountPercent = getBulkDiscountPercent(q);
  const discount = roundTo2(gross * (discountPercent / 100));
  const net = roundTo2(gross - discount);
  return {
    quantity: q,
    unit,
    gross,
    discountPercent,
    discount,
    net,
  };
}

/**
 * Total payable after bulk discount: (unit total × qty) − team % off.
 * `quantity` defaults to 1 for existing call sites.
 */
export function getPlanGrandTotal(
  plan: Plan,
  maintenanceId?: string,
  addOnIds: BookingAddOnId[] = [],
  quantity: number = 1,
) {
  return getBulkBookingBreakdown(plan, maintenanceId, addOnIds, quantity).net;
}

/** Inclusive total → pre-tax and GST @ 18% (for display / invoices). */
export function getPlanPriceBreakdown(
  plan: Plan,
  maintenanceId?: string,
  addOnIds: BookingAddOnId[] = [],
  quantity: number = 1,
) {
  const inclusive = getPlanGrandTotal(plan, maintenanceId, addOnIds, quantity);
  const preTax = roundTo2(inclusive / 1.18);
  const gst = roundTo2(inclusive - preTax);
  return { inclusive, preTax, gst };
}

/** Split one GST-inclusive amount into taxable value + GST (display rows). */
export function splitGstInclusive(inclusive: number) {
  const preTax = roundTo2(inclusive / 1.18);
  const gst = roundTo2(inclusive - preTax);
  return { preTax, gst, inclusive };
}

export function createBookingDraft(input: {
  planId: string;
  maintenanceId?: string;
  quantity?: number;
  addOnIds: BookingAddOnId[];
  details: BookingDetails;
  currentState?: BookingState | null;
}) {
  const current = input.currentState;
  const baseDate = current?.issueDate ? new Date(current.issueDate) : new Date();
  const dateCode = [
    baseDate.getFullYear(),
    String(baseDate.getMonth() + 1).padStart(2, "0"),
    String(baseDate.getDate()).padStart(2, "0"),
  ].join("");
  const suffix =
    current?.bookingId?.split("-").at(-1) ?? Math.floor(1000 + Math.random() * 9000).toString();
  const issueDate = current?.issueDate ?? baseDate.toISOString();
  const validUntil =
    current?.validUntil ?? new Date(baseDate.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString();

  return {
    planId: input.planId,
    maintenanceId: input.maintenanceId,
    quantity: clampBookingQuantity(input.quantity ?? current?.quantity ?? 1),
    addOnIds: input.addOnIds,
    details: input.details,
    bookingId: current?.bookingId ?? `BK-${dateCode}-${suffix}`,
    customerId: current?.customerId ?? `CUS-${suffix}`,
    invoiceNumber: current?.invoiceNumber ?? `PI-${dateCode}-${suffix}`,
    orderReference: current?.orderReference ?? `OL-${dateCode}-${suffix}`,
    issueDate,
    validUntil,
    orderId: current?.orderId,
    paymentId: current?.paymentId,
  } satisfies BookingState;
}

export function readStoredBookingState(): BookingState | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(BOOKING_STORAGE_KEY);

    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw) as Partial<BookingState>;

    return {
      planId:
        typeof parsed.planId === "string" && getPlanById(parsed.planId)
          ? parsed.planId
          : undefined,
      maintenanceId: typeof parsed.maintenanceId === "string" ? parsed.maintenanceId : undefined,
      quantity: clampBookingQuantity(parsed.quantity ?? 1),
      addOnIds: Array.isArray(parsed.addOnIds)
        ? parsed.addOnIds.filter((value): value is BookingAddOnId =>
            value === "admin-panel" || value === "micro-change",
          )
        : [],
      details: {
        name: typeof parsed.details?.name === "string" ? parsed.details.name : "",
        phone: typeof parsed.details?.phone === "string" ? parsed.details.phone : "",
        email: typeof parsed.details?.email === "string" ? parsed.details.email : "",
        businessName:
          typeof parsed.details?.businessName === "string"
            ? parsed.details.businessName
            : "",
        billingAddress:
          typeof parsed.details?.billingAddress === "string"
            ? parsed.details.billingAddress
            : "",
        city: typeof parsed.details?.city === "string" ? parsed.details.city : "",
        state: typeof parsed.details?.state === "string" ? parsed.details.state : "",
        website:
          typeof parsed.details?.website === "string"
            ? parsed.details.website
            : "",
        gstin: typeof parsed.details?.gstin === "string" ? parsed.details.gstin : undefined,
      },
      bookingId: typeof parsed.bookingId === "string" ? parsed.bookingId : undefined,
      customerId: typeof parsed.customerId === "string" ? parsed.customerId : undefined,
      invoiceNumber:
        typeof parsed.invoiceNumber === "string" ? parsed.invoiceNumber : undefined,
      orderReference:
        typeof parsed.orderReference === "string" ? parsed.orderReference : undefined,
      issueDate: typeof parsed.issueDate === "string" ? parsed.issueDate : undefined,
      validUntil:
        typeof parsed.validUntil === "string" ? parsed.validUntil : undefined,
      orderId: typeof parsed.orderId === "string" ? parsed.orderId : undefined,
      paymentId: typeof parsed.paymentId === "string" ? parsed.paymentId : undefined,
    };
  } catch {
    return null;
  }
}

export function writeStoredBookingState(state: BookingState) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify(state));
}

export function clearStoredBookingState() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(BOOKING_STORAGE_KEY);
}

export function formatInvoiceDate(dateString?: string) {
  const date = dateString ? new Date(dateString) : new Date();
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export function buildBookingInvoice(state: BookingState): BookingInvoice {
  const plan = state.planId ? getPlanById(state.planId) : undefined;

  if (!plan || !state.bookingId || !state.invoiceNumber || !state.details.state) {
    throw new Error("Booking draft is incomplete.");
  }

  const customerState = getStateByName(state.details.state);

  if (!customerState) {
    throw new Error("Customer state is invalid.");
  }

  const taxMode: TaxMode =
    customerState.code === sellerInfo.stateCode ? "Intra-state" : "Inter-state";

  const qty = clampBookingQuantity(state.quantity ?? 1);
  const bulk = getBulkBookingBreakdown(plan, state.maintenanceId, state.addOnIds, qty);
  const packageNet = bulk.net;
  const packageTaxable = roundTo2(packageNet / 1.18);

  const descParts = [
    `${qty} OneLink${qty > 1 ? "s" : ""} · setup, hosting & care (prices excl. GST; 18% GST applied).`,
    bulk.discountPercent > 0
      ? ` Team discount ${bulk.discountPercent}% applied (−${bulk.discount.toFixed(2)}).`
      : "",
  ];

  const rows = [
    buildInvoiceRow({
      id: plan.id,
      item: `${plan.name} Package`,
      description: descParts.join(""),
      amount: packageNet,
      taxableValue: packageTaxable,
      hsnSac: plan.hsnSac ?? "9983",
      taxMode,
      quantity: qty,
    }),
    ...getSelectedAddOns(state.addOnIds).map((addOn) =>
      buildInvoiceRow({
        id: addOn.id,
        item: addOn.name,
        description: addOn.description,
        amount: addOn.amount,
        taxableValue: addOn.taxableValue ?? roundTo2(addOn.amount / 1.18),
        hsnSac: addOn.hsnSac,
        cgstAmount: addOn.cgstAmount,
        sgstAmount: addOn.sgstAmount,
        taxMode,
      }),
    ),
  ];

  const taxableValueSubtotal = roundTo2(
    rows.reduce((sum, row) => sum + row.taxableValue, 0),
  );
  const cgstTotal = roundTo2(rows.reduce((sum, row) => sum + row.cgst, 0));
  const sgstTotal = roundTo2(rows.reduce((sum, row) => sum + row.sgst, 0));
  const igstTotal = roundTo2(rows.reduce((sum, row) => sum + row.igst, 0));
  const grandTotal = roundTo2(rows.reduce((sum, row) => sum + row.total, 0));

  return {
    bookingId: state.bookingId,
    customerId: state.customerId ?? `CUS-${state.bookingId.split("-").at(-1)}`,
    invoiceNumber: state.invoiceNumber,
    orderReference: state.orderReference ?? `OL-${state.bookingId}`,
    issueDate: formatInvoiceDate(state.issueDate),
    validUntil: formatInvoiceDate(state.validUntil),
    selectedPlan: plan.name,
    status: "UNPAID",
    taxMode,
    placeOfSupply: customerState.name,
    customerStateCode: customerState.code,
    sellerStateCode: sellerInfo.stateCode,
    rows,
    summary: {
      taxableValueSubtotal,
      cgstTotal,
      sgstTotal,
      igstTotal,
      grandTotal,
      amountInWords: `Indian Rupees ${convertNumberToWords(Math.round(grandTotal))} Only`,
    },
  };
}

export function buildBookingWhatsAppHref(input: {
  planId?: string;
  orderId?: string;
  paymentId?: string;
  name?: string;
  businessName?: string;
  bookingId?: string;
  invoiceNumber?: string;
}) {
  const plan = input.planId ? getPlanById(input.planId) : undefined;
  const lines = [
    "Hello OneLink, my booking is confirmed.",
    "",
    input.name ? `Name: ${input.name}` : null,
    input.businessName ? `Business: ${input.businessName}` : null,
    plan ? `Plan: ${plan.name}` : null,
    input.bookingId ? `Booking ID: ${input.bookingId}` : null,
    input.invoiceNumber ? `Invoice No: ${input.invoiceNumber}` : null,
    input.orderId ? `Order ID: ${input.orderId}` : null,
    input.paymentId ? `Payment ID: ${input.paymentId}` : null,
    "",
    "Please share the next onboarding step.",
  ].filter(Boolean);

  return `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
    lines.join("\n"),
  )}`;
}

export function buildInvoiceWhatsAppHref(state: BookingState) {
  const invoice = buildBookingInvoice(state);
  return `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
    [
      "Hello OneLink, I am reviewing my booking invoice.",
      "",
      `Booking ID: ${invoice.bookingId}`,
      `Invoice No: ${invoice.invoiceNumber}`,
      `Plan: ${invoice.selectedPlan}`,
      `Grand Total: ${invoice.summary.grandTotal.toFixed(2)}`,
      "",
      "Please help me with the next payment step.",
    ].join("\n"),
  )}`;
}

export function getSupportWhatsAppHref(message: string) {
  return `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
    message,
  )}`;
}

function buildInvoiceRow(input: {
  id: string;
  item: string;
  description: string;
  amount: number;
  taxableValue: number;
  hsnSac: string;
  cgstAmount?: number;
  sgstAmount?: number;
  taxMode: TaxMode;
  quantity?: number;
}): InvoiceRow {
  const totalTax = roundTo2(input.amount - input.taxableValue);
  const isIntraState = input.taxMode === "Intra-state";
  const cgst = isIntraState ? input.cgstAmount ?? roundTo2(totalTax / 2) : 0;
  const sgst = isIntraState ? input.sgstAmount ?? roundTo2(totalTax / 2) : 0;
  const igst = isIntraState ? 0 : totalTax;

  return {
    id: input.id,
    item: input.item,
    description: input.description,
    quantity: input.quantity ?? 1,
    taxableValue: input.taxableValue,
    gstRate: "18%",
    cgst,
    sgst,
    igst,
    total: input.amount,
    hsnSac: input.hsnSac,
  };
}

function convertNumberToWords(amount: number) {
  if (amount === 0) {
    return "Zero";
  }

  const ones = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

  function convertBelowThousand(value: number) {
    let output = "";

    if (value >= 100) {
      output += `${ones[Math.floor(value / 100)]} Hundred `;
      value %= 100;
    }

    if (value >= 20) {
      output += `${tens[Math.floor(value / 10)]} `;
      value %= 10;
    }

    if (value > 0) {
      output += `${ones[value]} `;
    }

    return output.trim();
  }

  let remaining = amount;
  const segments: string[] = [];
  const crore = Math.floor(remaining / 10000000);
  remaining %= 10000000;
  const lakh = Math.floor(remaining / 100000);
  remaining %= 100000;
  const thousand = Math.floor(remaining / 1000);
  remaining %= 1000;

  if (crore) {
    segments.push(`${convertBelowThousand(crore)} Crore`);
  }

  if (lakh) {
    segments.push(`${convertBelowThousand(lakh)} Lakh`);
  }

  if (thousand) {
    segments.push(`${convertBelowThousand(thousand)} Thousand`);
  }

  if (remaining) {
    segments.push(convertBelowThousand(remaining));
  }

  return segments.join(" ").trim();
}
