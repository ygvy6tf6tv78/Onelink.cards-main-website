import { Suspense } from "react";
import { CustomerDetailsStep } from "@/components/booking/customer-details-step";

export default function BookingDetailsPage() {
  return (
    <Suspense fallback={null}>
      <CustomerDetailsStep />
    </Suspense>
  );
}
