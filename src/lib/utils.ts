export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatCurrencyDetailed(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function roundTo2(amount: number) {
  return Math.round(amount * 100) / 100;
}

export function sanitizePhoneNumber(input: string) {
  return input.replace(/\D/g, "");
}

export function formatPhoneForRazorpay(phone: string) {
  const digits = sanitizePhoneNumber(phone);
  return digits.length === 10 ? `+91${digits}` : `+${digits}`;
}

export function calculateGSTBreakdown(total: number) {
  const base = total / 1.18;
  const gst = total - base;
  
  // Split GST 9+9 and ensure they sum correctly to total rounding error
  const cgst = Math.round((gst / 2) * 100) / 100;
  const sgst = Math.round((gst - cgst) * 100) / 100;
  
  return {
    base: Math.round(base * 100) / 100,
    cgst,
    sgst,
    gst: Math.round(gst * 100) / 100,
    total,
  };
}
