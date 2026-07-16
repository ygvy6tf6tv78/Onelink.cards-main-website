"use client";

import { useSearchParams } from "next/navigation";
import { Wordmark } from "@/components/ui/brand-mark";

export function BillingPasswordGate() {
  const invalid = useSearchParams().get("error") === "invalid";

  return (
    <main className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_50%_0%,rgba(0,169,255,0.2),transparent_36%),linear-gradient(180deg,#f7fbfe_0%,#edf5fa_100%)] px-4 py-10 text-[#0f172a]">
      <section className="w-full max-w-[430px] rounded-[26px] border border-[#d9e8f1] bg-white p-6 shadow-[0_30px_80px_-48px_rgba(15,23,42,0.48)] sm:p-8">
        <Wordmark priority className="!h-auto !w-[142px]" />
        <div className="mt-7">
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#00A9FF]">Restricted workspace</p>
          <h1 className="mt-2 text-[28px] font-bold tracking-[-0.04em] text-[#111827]">Internal Billing Desk</h1>
          <p className="mt-2 text-[13px] font-medium leading-relaxed text-[#64748b]">Enter the internal access code to open quotations and billing.</p>
        </div>

        <form action="/--12/billing/login" method="post" className="mt-6">
          <label htmlFor="billing-password" className="mb-2 block text-[11px] font-bold uppercase tracking-[0.09em] text-[#526173]">Access code</label>
          <input
            id="billing-password"
            name="password"
            type="password"
            inputMode="numeric"
            autoComplete="current-password"
            required
            autoFocus
            className="h-12 w-full rounded-[13px] border border-[#dce5ec] bg-[#f8fbfd] px-4 text-[17px] font-bold tracking-[0.18em] outline-none transition focus:border-[#00A9FF] focus:ring-4 focus:ring-[#00A9FF]/10"
            placeholder="••••"
          />
          {invalid ? <p className="mt-2 text-[12px] font-semibold text-[#dc2626]">Incorrect access code. Try again.</p> : null}
          <button type="submit" className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-[13px] bg-[#00A9FF] px-5 text-[14px] font-bold text-white shadow-[0_18px_34px_-20px_rgba(0,169,255,0.7)] transition hover:bg-[#0098e6]">
            Open Billing Desk
          </button>
        </form>

        <p className="mt-5 text-center text-[10px] font-semibold uppercase tracking-[0.1em] text-[#94a3b8]">Internal use only</p>
      </section>
    </main>
  );
}
