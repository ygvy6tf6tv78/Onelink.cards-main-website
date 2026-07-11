import { siteConfig } from "@/content/site";

export type LeadFormValues = {
  name: string;
  businessType: string;
  city: string;
  requirement: string;
};

export type LeadFormErrors = Partial<Record<keyof LeadFormValues, string>>;

export function validateLeadForm(values: LeadFormValues): LeadFormErrors {
  const errors: LeadFormErrors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Enter a valid name.";
  }

  if (values.businessType.trim().length < 2) {
    errors.businessType = "Choose your business type.";
  }

  if (values.city.trim().length < 2) {
    errors.city = "Enter your city.";
  }

  if (values.requirement.trim().length < 12) {
    errors.requirement = "Add a short requirement so the conversation starts with context.";
  }

  return errors;
}

export function buildWhatsAppHref(
  values: LeadFormValues,
  intent = "Book a demo",
) {
  const lines = [
    `Hello OneLink, I want to ${intent.toLowerCase()}.`,
    ``,
    `Name: ${values.name.trim()}`,
    `Business Type: ${values.businessType.trim()}`,
    `City: ${values.city.trim()}`,
    `Requirement: ${values.requirement.trim()}`,
  ];

  return `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
    lines.join("\n"),
  )}`;
}
