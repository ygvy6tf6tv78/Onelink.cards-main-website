import { roundTo2 } from "@/lib/utils";

export type InternalDiscountMode = "percentage" | "fixed";

type InternalQuoteInput = {
  setupAmount: number;
  careAmount: number;
  discountMode: InternalDiscountMode;
  discountValue: number;
  includeGst: boolean;
};

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(Number.isFinite(value) ? value : 0, minimum), maximum);
}

export function calculateInternalQuote({
  setupAmount,
  careAmount,
  discountMode,
  discountValue,
  includeGst,
}: InternalQuoteInput) {
  const setup = Math.max(setupAmount, 0);
  const care = Math.max(careAmount, 0);
  const subtotal = roundTo2(setup + care);
  const normalizedDiscount = discountMode === "percentage"
    ? clamp(discountValue, 0, 100)
    : clamp(discountValue, 0, subtotal);
  const discountAmount = roundTo2(
    discountMode === "percentage"
      ? subtotal * (normalizedDiscount / 100)
      : normalizedDiscount,
  );
  const amountBeforeGst = roundTo2(subtotal - discountAmount);
  const gstAmount = includeGst ? roundTo2(amountBeforeGst * 0.18) : 0;
  const totalPayable = roundTo2(amountBeforeGst + gstAmount);

  return {
    setupAmount: setup,
    careAmount: care,
    subtotal,
    normalizedDiscount,
    discountAmount,
    amountBeforeGst,
    gstAmount,
    totalPayable,
  };
}
