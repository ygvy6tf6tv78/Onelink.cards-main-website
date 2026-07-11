import crypto from "node:crypto";
import { afterEach, describe, expect, it, vi } from "vitest";
import { getPlanForCheckout, verifyRazorpaySignature } from "@/lib/razorpay";

describe("getPlanForCheckout", () => {
  it("returns a plan when the id exists (legacy id maps to Signature)", () => {
    expect(getPlanForCheckout("launch-plan").name).toBe("Signature");
  });

  it("throws when the plan does not exist", () => {
    expect(() => getPlanForCheckout("missing-plan")).toThrow(
      "Invalid plan selected.",
    );
  });
});

describe("verifyRazorpaySignature", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("verifies a matching signature", () => {
    vi.stubEnv("RAZORPAY_KEY_SECRET", "test_secret");

    const signature = crypto
      .createHmac("sha256", "test_secret")
      .update("order_123|pay_456")
      .digest("hex");

    expect(
      verifyRazorpaySignature({
        orderId: "order_123",
        paymentId: "pay_456",
        signature,
      }),
    ).toBe(true);
  });

  it("rejects an invalid signature", () => {
    vi.stubEnv("RAZORPAY_KEY_SECRET", "test_secret");

    expect(
      verifyRazorpaySignature({
        orderId: "order_123",
        paymentId: "pay_456",
        signature: "invalid",
      }),
    ).toBe(false);
  });
});
