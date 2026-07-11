import { describe, expect, it } from "vitest";
import { buildWhatsAppHref, validateLeadForm } from "@/lib/contact";

describe("validateLeadForm", () => {
  it("returns errors for incomplete values", () => {
    expect(
      validateLeadForm({
        name: "A",
        businessType: "",
        city: "",
        requirement: "too short",
      }),
    ).toEqual({
      name: "Enter a valid name.",
      businessType: "Choose your business type.",
      city: "Enter your city.",
      requirement:
        "Add a short requirement so the conversation starts with context.",
    });
  });

  it("accepts complete lead details", () => {
    expect(
      validateLeadForm({
        name: "Aarav Mehta",
        businessType: "Consultant / professional",
        city: "Mumbai",
        requirement: "I need a professional OneLink for bookings and reviews.",
      }),
    ).toEqual({});
  });
});

describe("buildWhatsAppHref", () => {
  it("builds a prefilled wa.me URL", () => {
    const href = buildWhatsAppHref(
      {
        name: "Aarav Mehta",
        businessType: "Consultant / professional",
        city: "Mumbai",
        requirement: "Need a OneLink for bookings.",
      },
      "Book Demo",
    );

    expect(href).toContain("https://wa.me/");
    expect(decodeURIComponent(href)).toContain("Name: Aarav Mehta");
    expect(decodeURIComponent(href)).toContain("Business Type: Consultant / professional");
  });
});
