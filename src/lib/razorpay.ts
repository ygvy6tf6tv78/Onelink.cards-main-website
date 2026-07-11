import crypto from "node:crypto";
import Razorpay from "razorpay";
import { getPlanById, pricingAddOns } from "@/content/site";
import { clampBookingQuantity, getPlanGrandTotal } from "@/lib/booking";
import { formatPhoneForRazorpay } from "@/lib/utils";
import type { BookingDetails } from "@/lib/booking";

export function getRazorpayClient() {
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;

  if (!key_id || !key_secret) {
    throw new Error("Razorpay is not configured.");
  }

  return new Razorpay({
    key_id,
    key_secret,
  });
}

export function getCheckoutKeyId() {
  const keyId = process.env.RAZORPAY_KEY_ID;

  if (!keyId) {
    throw new Error("Missing RAZORPAY_KEY_ID.");
  }

  return keyId;
}

export function getPlanForCheckout(planId: string) {
  const plan = getPlanById(planId);

  if (!plan) {
    throw new Error("Invalid plan selected.");
  }

  return plan;
}

function buildOrderNotes(planId: string, customer?: Partial<BookingDetails>) {
  const plan = getPlanForCheckout(planId);

  // Deep sanitization & truncation for Razorpay Dashboard security
  const sanitize = (val: string | undefined, limit: number) => 
    val?.trim().replace(/[<>\"']/g, "").slice(0, limit) ?? "";

  return {
    planId: plan.id,
    orderMode: plan.orderMode,
    planName: plan.name,
    customerName: sanitize(customer?.name, 60),
    customerPhone: customer?.phone
      ? formatPhoneForRazorpay(customer.phone).slice(0, 15)
      : "",
    businessName: sanitize(customer?.businessName, 60),
    city: sanitize(customer?.city, 50),
    state: sanitize(customer?.state, 50),
    bookingEmail: sanitize(customer?.email, 60),
  };
}

export async function createCheckoutOrder(
  planId: string,
  customer?: Partial<BookingDetails>,
  maintenanceId?: string,
  addOnIds: string[] = [],
  quantity: number = 1,
) {
  const plan = getPlanForCheckout(planId);
  const client = getRazorpayClient();

  const maintenance = plan.maintenanceOptions.find((m) => m.id === maintenanceId) || plan.maintenanceOptions[0];
  
  const selectedAddOns = addOnIds
    .map((id: string) => pricingAddOns.find((a) => a.id === id))
    .filter((a) => !!a);
  const qty = clampBookingQuantity(quantity);
  const totalAmount = getPlanGrandTotal(
    plan,
    maintenanceId,
    addOnIds as ("admin-panel" | "micro-change")[],
    qty,
  );

  const order = await client.orders.create({
    amount: Math.round(totalAmount * 100),
    currency: "INR",
    receipt: `onelink_${plan.id}_${Date.now()}`,
    notes: {
      ...buildOrderNotes(planId, customer),
      maintenance: maintenance?.label ?? "",
      addOns: selectedAddOns.map((a) => a?.name).join(", "),
      quantity: String(qty),
    } as Record<string, string>,
  });

  return {
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    keyId: getCheckoutKeyId(),
    planName: plan.name,
  };
}

export function verifyRazorpaySignature(input: {
  orderId: string;
  paymentId: string;
  signature: string;
}) {
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keySecret) {
    throw new Error("Missing RAZORPAY_KEY_SECRET.");
  }

  const generatedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(`${input.orderId}|${input.paymentId}`)
    .digest("hex");

  // Constant-time comparison for High-Level Security
  try {
    return crypto.timingSafeEqual(
      Buffer.from(generatedSignature, "utf8"),
      Buffer.from(input.signature, "utf8")
    );
  } catch {
    return false;
  }
}
