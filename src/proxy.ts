import { NextRequest, NextResponse } from "next/server";
import { INTERNAL_BILLING_COOKIE, INTERNAL_BILLING_COOKIE_VALUE } from "@/lib/internal-billing-auth";

export function proxy(request: NextRequest) {
  const authenticated = request.cookies.get(INTERNAL_BILLING_COOKIE)?.value === INTERNAL_BILLING_COOKIE_VALUE;

  if (!authenticated) {
    return new NextResponse("Not found", { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/internal-billing-app/:path*"],
};
