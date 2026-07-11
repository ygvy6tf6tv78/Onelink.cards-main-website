import { cn } from "@/lib/utils";

const steps = [
  { id: "details", label: "Details" },
  { id: "payment", label: "Payment" },
  { id: "done", label: "Done" },
] as const;

const stepMapping: Record<string, (typeof steps)[number]["id"]> = {
  plan: "details",
  details: "details",
  invoice: "payment",
  payment: "payment",
  done: "done",
};

export type BookingStep = "plan" | "details" | "invoice" | "payment" | "done";

type BookingProgressProps = {
  current: BookingStep;
  className?: string;
};

export function BookingProgress({ current, className }: BookingProgressProps) {
  const mappedStep = stepMapping[current] ?? "details";
  const currentIndex = steps.findIndex((step) => step.id === mappedStep);

  return (
    <div className={cn("flex items-start w-full max-w-[320px] sm:max-w-md mx-auto", className)}>
      {steps.map((step, index) => {
        const isCurrent = index === currentIndex;
        const isComplete = index < currentIndex;
        const isLast = index === steps.length - 1;

        return (
          <div key={step.id} className={cn("flex flex-1 items-start justify-center", isLast && "flex-none")}>
            <div className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  "flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full text-[11px] sm:text-[12px] font-black transition-all duration-500 border-2",
                  isCurrent && "border-[#00a9ff] bg-[#00a9ff] text-white shadow-[0_14px_28px_-12px_rgba(0,169,255,0.42)] scale-110",
                  isComplete && "border-[#bfe6ff] bg-[#f3fbff] text-[#00a9ff]",
                  !isCurrent && !isComplete && "border-[#e5e7eb] bg-white text-[#94a3b8]",
                )}
              >
                {isComplete ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                ) : (
                  index + 1
                )}
              </div>
              <span
                className={cn(
                  "whitespace-nowrap text-[10px] font-black uppercase tracking-[0.1em]",
                  isCurrent ? "text-[#111827]" : "text-[#9ca3af]",
                )}
              >
                {step.label}
              </span>
            </div>
            {!isLast && (
              <div className="flex-1 px-1.5 pt-3.5 sm:pt-4">
                <div
                  className={cn(
                    "h-[3px] w-full rounded-full transition-all duration-700",
                    isComplete ? "bg-[linear-gradient(90deg,#00a9ff,#59c4ff)]" : "bg-[#f1f3f5]",
                  )}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
