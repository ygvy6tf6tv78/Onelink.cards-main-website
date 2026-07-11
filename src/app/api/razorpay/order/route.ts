import { NextResponse } from "next/server";
import { createCheckoutOrder } from "@/lib/razorpay";
import type { BookingDetails } from "@/lib/booking";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      planId?: string;
      customer?: Partial<BookingDetails>;
      maintenanceId?: string;
      addOnIds?: string[];
      quantity?: number;
    };

    if (!body.planId || typeof body.planId !== "string") {
      return NextResponse.json({ error: "Valid planId is required." }, { status: 400 });
    }

    if (body.customer && typeof body.customer !== "object") {
      return NextResponse.json({ error: "Invalid customer details." }, { status: 400 });
    }

    const order = await createCheckoutOrder(
      body.planId,
      body.customer,
      body.maintenanceId,
      body.addOnIds,
      body.quantity,
    );

    return NextResponse.json(order);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to create Razorpay order.";
    const status = message.includes("configured") || message.includes("Missing")
      ? 503
      : 400;

    return NextResponse.json({ error: message }, { status });
  }
}
