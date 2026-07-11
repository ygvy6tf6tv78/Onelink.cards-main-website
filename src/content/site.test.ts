import { describe, expect, it } from "vitest";
import { getDemoBySlug, getPlanById } from "@/content/site";

describe("site content lookups", () => {
  it("returns a demo item by slug", () => {
    expect(getDemoBySlug("restaurant")?.businessName).toBe(
      "Spice Route Kitchen",
    );
  });

  it("returns undefined for an unknown demo", () => {
    expect(getDemoBySlug("unknown-demo")).toBeUndefined();
  });

  it("returns the highlighted pricing plan", () => {
    expect(getPlanById("signature")?.highlight).toBe(true);
  });

  it("maps legacy business plan id to essential", () => {
    expect(getPlanById("business")?.id).toBe("essential");
  });

  it("maps legacy launch-plan id to signature", () => {
    expect(getPlanById("launch-plan")?.id).toBe("signature");
  });
});
