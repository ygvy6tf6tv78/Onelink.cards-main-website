import { describe, expect, it } from "vitest";
import { calculateInternalQuote } from "@/lib/internal-billing";

describe("calculateInternalQuote", () => {
  it("calculates a percentage discount with GST", () => {
    expect(calculateInternalQuote({
      setupAmount: 4999,
      careAmount: 8999,
      discountMode: "percentage",
      discountValue: 10,
      includeGst: true,
    })).toMatchObject({
      subtotal: 13998,
      discountAmount: 1399.8,
      amountBeforeGst: 12598.2,
      gstAmount: 2267.68,
      totalPayable: 14865.88,
    });
  });

  it("calculates a fixed discount without GST", () => {
    expect(calculateInternalQuote({
      setupAmount: 3499,
      careAmount: 1599,
      discountMode: "fixed",
      discountValue: 500,
      includeGst: false,
    })).toMatchObject({
      subtotal: 5098,
      discountAmount: 500,
      amountBeforeGst: 4598,
      gstAmount: 0,
      totalPayable: 4598,
    });
  });

  it("never allows a discount above the subtotal", () => {
    expect(calculateInternalQuote({
      setupAmount: 3499,
      careAmount: 1599,
      discountMode: "fixed",
      discountValue: 99999,
      includeGst: true,
    }).totalPayable).toBe(0);
  });
});
