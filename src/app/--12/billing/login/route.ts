import { NextRequest, NextResponse } from "next/server";
import {
  INTERNAL_BILLING_COOKIE,
  INTERNAL_BILLING_COOKIE_VALUE,
  INTERNAL_BILLING_PASSWORD,
} from "@/lib/internal-billing-auth";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const password = String(formData.get("password") ?? "");
  const destination = new URL(password === INTERNAL_BILLING_PASSWORD ? "/--12/billing" : "/--12/billing?error=invalid", request.url);
  const response = NextResponse.redirect(destination, 303);

  if (password === INTERNAL_BILLING_PASSWORD) {
    response.cookies.set(INTERNAL_BILLING_COOKIE, INTERNAL_BILLING_COOKIE_VALUE, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 12,
    });
  }

  return response;
}
