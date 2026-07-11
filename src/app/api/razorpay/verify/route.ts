import { NextResponse } from "next/server";
import { getPlanForCheckout, getRazorpayClient, verifyRazorpaySignature } from "@/lib/razorpay";
import { sendBookingPaymentConfirmedEmail } from "@/lib/booking-notify-email";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      planId?: string;
      razorpay_order_id?: string;
      razorpay_payment_id?: string;
      razorpay_signature?: string;
      bookingId?: string;
      invoiceNumber?: string;
      customerName?: string;
      customerEmail?: string;
      customerPhone?: string;
      businessName?: string;
      amountPaise?: number;
      currency?: string;
    };

    if (
      !body.planId ||
      !body.razorpay_order_id ||
      !body.razorpay_payment_id ||
      !body.razorpay_signature
    ) {
      return NextResponse.json(
        { error: "Missing payment verification fields." },
        { status: 400 },
      );
    }

    const plan = getPlanForCheckout(body.planId);

    const verified = verifyRazorpaySignature({
      orderId: body.razorpay_order_id,
      paymentId: body.razorpay_payment_id,
      signature: body.razorpay_signature,
    });

    if (!verified) {
      return NextResponse.json({ verified: false }, { status: 400 });
    }

    let amountPaise = 0;
    let currency = "INR";
    try {
      const client = getRazorpayClient();
      const order = await client.orders.fetch(body.razorpay_order_id);
      amountPaise = typeof order.amount === "number" ? order.amount : 0;
      currency = typeof order.currency === "string" ? order.currency : "INR";
    } catch {
      amountPaise =
        typeof body.amountPaise === "number" && Number.isFinite(body.amountPaise) && body.amountPaise > 0
          ? Math.round(body.amountPaise)
          : 0;
      currency = typeof body.currency === "string" && body.currency.length === 3 ? body.currency : "INR";
    }

    const emailResult = await sendBookingPaymentConfirmedEmail({
      bookingId:
        typeof body.bookingId === "string" ? body.bookingId.slice(0, 80) : undefined,
      invoiceNumber:
        typeof body.invoiceNumber === "string" ? body.invoiceNumber.slice(0, 80) : undefined,
      planName: plan.name,
      razorpayOrderId: body.razorpay_order_id,
      razorpayPaymentId: body.razorpay_payment_id,
      amountPaise: amountPaise > 0 ? amountPaise : 1,
      currency,
      customerName:
        typeof body.customerName === "string" ? body.customerName.slice(0, 120) : undefined,
      customerEmail:
        typeof body.customerEmail === "string" ? body.customerEmail.slice(0, 120) : undefined,
      customerPhone:
        typeof body.customerPhone === "string" ? body.customerPhone.replace(/\D/g, "").slice(0, 15) : undefined,
      businessName:
        typeof body.businessName === "string" ? body.businessName.slice(0, 120) : undefined,
    });

    if (!emailResult.ok && !emailResult.skipped) {
      console.error("[razorpay/verify] payment confirmation email failed");
    }

    return NextResponse.json({
      verified: true,
      emailNotified: emailResult.ok,
      emailSkippedReason: emailResult.skipped,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to verify payment.";
    const status = message.includes("Missing") ? 503 : 400;

    return NextResponse.json({ error: message }, { status });
  }
}
