import { Suspense } from "react";
import { PaymentStep } from "@/components/booking/payment-step";

export default function BookingPaymentPage() {
  return (
    <Suspense fallback={null}>
      <PaymentStep />
    </Suspense>
  );
}
