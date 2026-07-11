import { NextResponse } from "next/server";
import { getPlanById, pricingAddOns } from "@/content/site";
import {
  clampBookingQuantity,
  validateBookingDetails,
  type BookingAddOnId,
  type BookingDetails,
} from "@/lib/booking";
import { sendBookingDetailsSubmittedEmail } from "@/lib/booking-notify-email";

export const runtime = "nodejs";

type Body = {
  planId?: string;
  maintenanceId?: string;
  addOnIds?: unknown;
  quantity?: unknown;
  details?: Partial<BookingDetails>;
  bookingId?: string;
  invoiceNumber?: string;
  orderReference?: string;
  customerId?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Body;

    if (!body.planId || typeof body.planId !== "string") {
      return NextResponse.json({ error: "Invalid plan." }, { status: 400 });
    }

    const plan = getPlanById(body.planId);
    if (!plan) {
      return NextResponse.json({ error: "Unknown plan." }, { status: 400 });
    }

    if (!body.bookingId || typeof body.bookingId !== "string" || body.bookingId.length > 80) {
      return NextResponse.json({ error: "Invalid booking reference." }, { status: 400 });
    }

    const details: BookingDetails = {
      name: typeof body.details?.name === "string" ? body.details.name : "",
      phone: typeof body.details?.phone === "string" ? body.details.phone : "",
      email: typeof body.details?.email === "string" ? body.details.email : "",
      businessName:
        typeof body.details?.businessName === "string" ? body.details.businessName : "",
      billingAddress:
        typeof body.details?.billingAddress === "string" ? body.details.billingAddress : "",
      city: typeof body.details?.city === "string" ? body.details.city : "",
      state: typeof body.details?.state === "string" ? body.details.state : "",
      website: typeof body.details?.website === "string" ? body.details.website : "",
      gstin: typeof body.details?.gstin === "string" ? body.details.gstin : undefined,
    };

    const fieldErrors = validateBookingDetails(details);
    if (Object.keys(fieldErrors).length > 0) {
      return NextResponse.json({ error: "Invalid details." }, { status: 400 });
    }

    const qty = clampBookingQuantity(body.quantity);
    const addOnIds = Array.isArray(body.addOnIds)
      ? body.addOnIds.filter(
          (id): id is BookingAddOnId => id === "admin-panel" || id === "micro-change",
        )
      : [];

    const maintenance =
      plan.maintenanceOptions.find((m) => m.id === body.maintenanceId) ??
      plan.maintenanceOptions[0];

    const addOnSummary =
      addOnIds.length === 0
        ? undefined
        : addOnIds
            .map((id) => pricingAddOns.find((a) => a.id === id)?.name)
            .filter(Boolean)
            .join(", ");

    const result = await sendBookingDetailsSubmittedEmail({
      bookingId: body.bookingId,
      invoiceNumber:
        typeof body.invoiceNumber === "string" ? body.invoiceNumber.slice(0, 80) : undefined,
      orderReference:
        typeof body.orderReference === "string" ? body.orderReference.slice(0, 80) : undefined,
      customerId: typeof body.customerId === "string" ? body.customerId.slice(0, 80) : undefined,
      planName: plan.name,
      quantity: qty,
      maintenanceLabel: maintenance?.label,
      addOnSummary,
      details,
    });

    if (!result.ok && result.skipped) {
      return NextResponse.json(
        { ok: true, notified: false, reason: result.skipped },
        { status: 200 },
      );
    }

    if (!result.ok) {
      return NextResponse.json({ error: "Email could not be sent." }, { status: 502 });
    }

    return NextResponse.json({ ok: true, notified: true });
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
}
