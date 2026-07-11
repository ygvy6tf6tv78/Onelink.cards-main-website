import { describe, expect, it } from "vitest";
import {
  buildBookingInvoice,
  buildBookingWhatsAppHref,
  createBookingDraft,
  validateBookingDetails,
} from "@/lib/booking";

const validDetails = {
  name: "Rahul Mehta",
  phone: "9876543210",
  email: "rahul@mehtafoods.in",
  businessName: "Mehta Foods",
  category: "Restaurant / cafe",
  billingAddress: "12 Vijay Nagar Main Road, Indore, Madhya Pradesh 452010",
  city: "Indore",
  state: "Madhya Pradesh",
  website: "https://instagram.com/mehtafoods",
  gstin: "",
  notes: "Need quick launch for summer menu.",
};

describe("validateBookingDetails", () => {
  it("returns errors for missing required booking details", () => {
    expect(
      validateBookingDetails({
        name: "A",
        phone: "1234",
        email: "bad-email",
        businessName: "",
        category: "",
        billingAddress: "short",
        city: "",
        state: "",
        website: "instagram",
        gstin: "BAD",
        notes: "short",
      }),
    ).toEqual({
      name: "Tell us your full name.",
      phone: "Enter a valid 10-digit WhatsApp number.",
      email: "Enter a valid email for your invoice.",
      businessName: "What's your business or brand name?",
      city: "Which city is your business in?",
      state: "Please choose your state.",
      website: "Enter a valid link or leave blank.",
    });
  });

  it("accepts a valid booking form", () => {
    expect(validateBookingDetails(validDetails)).toEqual({});
  });
});

describe("createBookingDraft", () => {
  it("creates stable booking identifiers from valid input", () => {
    const draft = createBookingDraft({
      planId: "essential",
      addOnIds: [],
      details: validDetails,
    });

    expect(draft.planId).toBe("essential");
    expect(draft.addOnIds).toEqual([]);
    expect(draft.bookingId).toMatch(/^BK-\d{8}-\d{4}$/);
    expect(draft.invoiceNumber).toMatch(/^PI-\d{8}-\d{4}$/);
    expect(draft.customerId).toMatch(/^CUS-\d{4}$/);
  });
});

describe("buildBookingInvoice", () => {
  it("builds an inter-state invoice with IGST", () => {
    const draft = createBookingDraft({
      planId: "essential",
      addOnIds: [],
      details: {
        ...validDetails,
        state: "Madhya Pradesh",
      },
      currentState: {
        planId: "essential",
        addOnIds: [],
        details: validDetails,
        bookingId: "BK-20260403-1234",
        customerId: "CUS-1234",
        invoiceNumber: "PI-20260403-1234",
        orderReference: "OL-20260403-1234",
        issueDate: "2026-04-03T12:00:00.000Z",
        validUntil: "2026-04-06T12:00:00.000Z",
      },
    });
    const invoice = buildBookingInvoice(draft);

    expect(invoice.taxMode).toBe("Inter-state");
    expect(invoice.summary.cgstTotal).toBe(0);
    expect(invoice.summary.sgstTotal).toBe(0);
    expect(invoice.summary.igstTotal).toBeGreaterThan(0);
  });

  it("switches to intra-state for Jammu & Kashmir billing", () => {
    const draft = createBookingDraft({
      planId: "essential",
      addOnIds: [],
      details: {
        ...validDetails,
        state: "Jammu & Kashmir",
      },
      currentState: {
        planId: "essential",
        addOnIds: [],
        details: validDetails,
        bookingId: "BK-20260403-2222",
        customerId: "CUS-2222",
        invoiceNumber: "PI-20260403-2222",
        orderReference: "OL-20260403-2222",
        issueDate: "2026-04-03T12:00:00.000Z",
        validUntil: "2026-04-06T12:00:00.000Z",
      },
    });
    const invoice = buildBookingInvoice(draft);

    expect(invoice.taxMode).toBe("Intra-state");
    expect(invoice.rows).toHaveLength(1);
    expect(invoice.summary.cgstTotal).toBeGreaterThan(0);
    expect(invoice.summary.sgstTotal).toBeGreaterThan(0);
    expect(invoice.summary.igstTotal).toBe(0);
    expect(invoice.summary.amountInWords).toContain("Indian Rupees");
  });
});

describe("buildBookingWhatsAppHref", () => {
  it("includes the plan and order details in the message", () => {
    const href = buildBookingWhatsAppHref({
      planId: "essential",
      orderId: "order_123",
      paymentId: "pay_456",
      name: "Aanya",
      businessName: "Aanya Studio",
      bookingId: "BK-20260403-1234",
      invoiceNumber: "PI-20260403-1234",
    });

    expect(decodeURIComponent(href)).toContain("Plan: Essential");
    expect(decodeURIComponent(href)).toContain("Order ID: order_123");
    expect(decodeURIComponent(href)).toContain("Payment ID: pay_456");
    expect(decodeURIComponent(href)).toContain("Invoice No: PI-20260403-1234");
  });
});
