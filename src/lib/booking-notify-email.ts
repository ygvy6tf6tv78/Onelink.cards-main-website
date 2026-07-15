import { Resend } from "resend";

const DEFAULT_NOTIFY_TO = "onelink@repixelx.tech";

/** Admin inboxes that receive lead + payment alerts (comma / semicolon / space separated). */
export function getBookingNotifyRecipients(): string[] {
  const raw = process.env.BOOKING_NOTIFY_EMAIL?.trim() || DEFAULT_NOTIFY_TO;
  const parts = raw.split(/[\s,;]+/).map((s) => s.trim());
  const emails = parts.filter((s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s));
  return emails.length > 0 ? emails : [DEFAULT_NOTIFY_TO];
}

export function getResendFrom(): string {
  return (
    process.env.RESEND_FROM?.trim() ||
    "OneLink Bookings <onboarding@resend.dev>"
  );
}

function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) return null;
  return new Resend(key);
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export type DetailsSubmittedPayload = {
  bookingId: string;
  invoiceNumber?: string;
  orderReference?: string;
  customerId?: string;
  planName: string;
  quantity: number;
  maintenanceLabel?: string;
  addOnSummary?: string;
  details: {
    name: string;
    email: string;
    phone: string;
    businessName: string;
    billingAddress: string;
    city: string;
    state: string;
    website?: string;
    gstin?: string;
  };
};

export async function sendBookingDetailsSubmittedEmail(
  payload: DetailsSubmittedPayload,
): Promise<{ ok: boolean; skipped?: string }> {
  const resend = getResend();
  if (!resend) {
    return { ok: false, skipped: "RESEND_API_KEY not set" };
  }

  const to = getBookingNotifyRecipients();
  const d = payload.details;
  const lines = [
    "Someone completed the booking details form and clicked Continue (payment not confirmed yet).",
    "",
    `Booking ID: ${payload.bookingId}`,
    payload.invoiceNumber ? `Invoice No: ${payload.invoiceNumber}` : null,
    payload.orderReference ? `Order ref: ${payload.orderReference}` : null,
    payload.customerId ? `Customer ID: ${payload.customerId}` : null,
    `Plan: ${payload.planName}`,
    `Quantity: ${payload.quantity}`,
    payload.maintenanceLabel ? `Care: ${payload.maintenanceLabel}` : null,
    payload.addOnSummary ? `Add-ons: ${payload.addOnSummary}` : null,
    "",
    "Contact",
    `Name: ${d.name}`,
    `Business: ${d.businessName}`,
    `Email: ${d.email}`,
    `WhatsApp / phone: +91 ${d.phone}`,
    `${d.city}, ${d.state}`,
    `Billing address: ${d.billingAddress}`,
    d.website?.trim() ? `Website: ${d.website}` : null,
    d.gstin?.trim() ? `GSTIN: ${d.gstin}` : null,
    "",
    "Follow up with a call if they do not complete payment.",
  ]
    .filter(Boolean)
    .join("\n");

  const html = `<pre style="font-family:system-ui,sans-serif;font-size:14px;line-height:1.5;color:#111">${esc(
    lines,
  )}</pre>`;

  const { error } = await resend.emails.send({
    from: getResendFrom(),
    to,
    replyTo: d.email,
    subject: `[OneLink] Details filled — ${payload.bookingId} — ${d.name}`,
    text: lines,
    html,
  });

  if (error) {
    console.error("[booking-notify-email] details:", JSON.stringify(error));
    return { ok: false };
  }
  return { ok: true };
}

export type PaymentConfirmedPayload = {
  bookingId?: string;
  invoiceNumber?: string;
  planName: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  amountPaise: number;
  currency: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  businessName?: string;
};

export async function sendBookingPaymentConfirmedEmail(
  payload: PaymentConfirmedPayload,
): Promise<{ ok: boolean; skipped?: string }> {
  const resend = getResend();
  if (!resend) {
    return { ok: false, skipped: "RESEND_API_KEY not set" };
  }

  const to = getBookingNotifyRecipients();
  const amountInr = (payload.amountPaise / 100).toFixed(2);
  const bid = payload.bookingId ?? "—";

  const lines = [
    "Payment verified successfully. Reservation is confirmed.",
    "",
    `Booking ID: ${bid}`,
    payload.invoiceNumber ? `Invoice No: ${payload.invoiceNumber}` : null,
    `Plan: ${payload.planName}`,
    `Amount paid: ${payload.currency} ${amountInr}`,
    `Razorpay Order: ${payload.razorpayOrderId}`,
    `Razorpay Payment: ${payload.razorpayPaymentId}`,
    "",
    payload.customerName ? `Customer: ${payload.customerName}` : null,
    payload.businessName ? `Business: ${payload.businessName}` : null,
    payload.customerEmail ? `Email: ${payload.customerEmail}` : null,
    payload.customerPhone ? `Phone: +91 ${payload.customerPhone}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const html = `<pre style="font-family:system-ui,sans-serif;font-size:14px;line-height:1.5;color:#111">${esc(
    lines,
  )}</pre>`;

  const replyTo =
    payload.customerEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.customerEmail)
      ? payload.customerEmail
      : undefined;

  const { error } = await resend.emails.send({
    from: getResendFrom(),
    to,
    ...(replyTo ? { replyTo } : {}),
    subject: `[OneLink] Paid — ${bid} — ${payload.customerName ?? "Customer"}`,
    text: lines,
    html,
  });

  if (error) {
    console.error("[booking-notify-email] payment:", JSON.stringify(error));
    return { ok: false };
  }
  return { ok: true };
}
