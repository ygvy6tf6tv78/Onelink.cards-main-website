import { Suspense } from "react";
import { PlanSelectionStep } from "@/components/booking/plan-selection-step";

export default function BookingPlanPage() {
  return (
    <Suspense fallback={null}>
      <PlanSelectionStep />
    </Suspense>
  );
}
