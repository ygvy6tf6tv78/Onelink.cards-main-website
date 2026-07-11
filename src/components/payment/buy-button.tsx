"use client";

import { getPlanById, siteConfig } from "@/content/site";
import { cn } from "@/lib/utils";

type BuyButtonProps = {
  planId: string;
  maintenanceId?: string;
  label: string;
  className?: string;
  variant?: "primary" | "secondary";
  withArrow?: boolean;
};

export function BuyButton({
  planId,
  maintenanceId,
  label,
  className,
  variant = "primary",
  withArrow = false,
}: BuyButtonProps) {
  function handleBookingStart() {
    const plan = getPlanById(planId);
    const resolvedPlanId = plan?.id ?? "signature";
    const resolvedPlan = getPlanById(resolvedPlanId);
    const duration = resolvedPlan?.maintenanceOptions.find((option) => option.id === maintenanceId);
    const message = [
      "Hello OneLink, I want to buy a plan.",
      `Plan: ${resolvedPlan?.name ?? resolvedPlanId}`,
      duration ? `Duration: ${duration.label}` : null,
      resolvedPlan ? `Setup fee: ₹${resolvedPlan.setupAmount.toLocaleString("en-IN")} + GST` : null,
    ]
      .filter(Boolean)
      .join("\n");

    window.location.href = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
  }

  return (
    <button
      type="button"
      onClick={handleBookingStart}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-[18px] px-5 py-3 text-sm font-semibold tracking-[-0.01em] transition-all duration-300",
        variant === "primary"
          ? "border border-transparent bg-[#00a9ff] text-white shadow-[0_18px_34px_-18px_rgba(0,169,255,0.46)] hover:scale-[1.015] hover:bg-[#087cbc] hover:shadow-[0_24px_42px_-20px_rgba(0,169,255,0.48)]"
          : "border border-black/8 bg-white text-[var(--foreground)] shadow-[0_18px_34px_-24px_rgba(15,23,42,0.24)] hover:scale-[1.015] hover:bg-neutral-50 hover:shadow-[0_22px_40px_-24px_rgba(15,23,42,0.28)]",
        className,
      )}
    >
      {label}
      {withArrow ? (
        <svg
          className="h-4 w-4"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3.5 8h9" />
          <path d="M8.5 3l4.5 5-4.5 5" />
        </svg>
      ) : null}
    </button>
  );
}
