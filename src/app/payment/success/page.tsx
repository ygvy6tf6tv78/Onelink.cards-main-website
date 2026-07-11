import { Suspense } from "react";
import { SuccessStep } from "@/components/booking/success-step";

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={null}>
      <SuccessStep />
    </Suspense>
  );
}
