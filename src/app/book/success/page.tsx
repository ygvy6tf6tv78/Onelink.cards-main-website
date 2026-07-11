import { Suspense } from "react";
import { SuccessStep } from "@/components/booking/success-step";

export default function BookingSuccessPage() {
  return (
    <>
      <title>Booking Success | OneLink Smart Business Page</title>
      <Suspense fallback={null}>
        <SuccessStep />
      </Suspense>
    </>
  );
}
