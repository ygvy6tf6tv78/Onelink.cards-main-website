"use client";

import { useState, useTransition } from "react";
import { formBusinessTypes } from "@/content/site";
import {
  buildWhatsAppHref,
  type LeadFormErrors,
  type LeadFormValues,
  validateLeadForm,
} from "@/lib/contact";
import { cn } from "@/lib/utils";

const initialValues: LeadFormValues = {
  name: "",
  businessType: "",
  city: "",
  requirement: "",
};

type LeadFormProps = {
  intentLabel?: string;
  className?: string;
};

export function LeadForm({
  intentLabel = "Book a demo",
  className,
}: LeadFormProps) {
  const [values, setValues] = useState<LeadFormValues>(initialValues);
  const [errors, setErrors] = useState<LeadFormErrors>({});
  const [statusMessage, setStatusMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  function updateField(key: keyof LeadFormValues, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateLeadForm(values);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatusMessage("Complete the highlighted fields before continuing.");
      return;
    }

    setStatusMessage("");
    startTransition(() => {
      const href = buildWhatsAppHref(values, intentLabel);
      const popup = window.open(href, "_blank", "noopener,noreferrer");

      if (!popup) {
        window.location.assign(href);
      }

      setStatusMessage("Opening WhatsApp with your details...");
      setValues(initialValues);
    });
  }

  return (
    <form className={cn("space-y-4", className)} onSubmit={handleSubmit}>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          label="Name"
          error={errors.name}
          input={
            <input
              value={values.name}
              onChange={(event) => updateField("name", event.target.value)}
              placeholder="Your name"
              className="w-full rounded-2xl border bg-white/80 px-4 py-3 text-sm outline-none focus:border-[var(--accent)]"
            />
          }
        />
        <Field
          label="City"
          error={errors.city}
          input={
            <input
              value={values.city}
              onChange={(event) => updateField("city", event.target.value)}
              placeholder="Your city"
              className="w-full rounded-2xl border bg-white/80 px-4 py-3 text-sm outline-none focus:border-[var(--accent)]"
            />
          }
        />
      </div>
      <Field
        label="Business type"
        error={errors.businessType}
        input={
          <select
            value={values.businessType}
            onChange={(event) => updateField("businessType", event.target.value)}
            className="w-full rounded-2xl border bg-white/80 px-4 py-3 text-sm outline-none focus:border-[var(--accent)]"
          >
            <option value="">Choose your business type</option>
            {formBusinessTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        }
      />
      <Field
        label="What do you need?"
        error={errors.requirement}
        input={
          <textarea
            value={values.requirement}
            onChange={(event) => updateField("requirement", event.target.value)}
            rows={4}
            placeholder="Tell us what kind of OneLink you want, what actions matter most, or which business category you fit into."
            className="w-full rounded-[24px] border bg-white/80 px-4 py-3 text-sm outline-none focus:border-[var(--accent)]"
          />
        }
      />
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center rounded-full bg-[var(--foreground)] px-5 py-3 text-sm font-semibold text-white shadow-[0_20px_45px_rgba(21,21,21,0.16)] hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isPending ? "Opening WhatsApp..." : intentLabel}
        </button>
        <p className="text-muted text-sm">
          WhatsApp-first handoff. No extra inbox complexity.
        </p>
      </div>
      {statusMessage ? (
        <p className="rounded-2xl border border-[var(--accent-soft)] bg-[var(--accent-soft)] px-4 py-3 text-sm text-[var(--muted-strong)]">
          {statusMessage}
        </p>
      ) : null}
    </form>
  );
}

type FieldProps = {
  label: string;
  error?: string;
  input: React.ReactNode;
};

function Field({ label, error, input }: FieldProps) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold text-[var(--foreground)]">
        {label}
      </span>
      {input}
      {error ? <span className="text-sm text-rose-600">{error}</span> : null}
    </label>
  );
}
