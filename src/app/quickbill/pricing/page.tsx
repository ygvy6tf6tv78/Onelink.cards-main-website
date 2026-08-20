import Image from "next/image";
import Link from "next/link";
import { QuickBillLogo, QuickBillShell } from "@/components/quickbill/quickbill-ui";

const plans = [
  { term: "3 Months", price: "₹999", note: "Best for trying QuickBill." },
  { term: "6 Months", price: "₹1,799", note: "Better value for growing businesses.", badge: "Most Popular" },
  { term: "12 Months", price: "₹2,999", note: "Lowest effective monthly cost.", badge: "Best Value" },
];

const features = ["Billing", "Customers", "Services", "Payment Tracking", "PDF Bills", "UPI QR", "WhatsApp Sharing", "Bill History", "Mobile ready"];

export default function QuickBillPricingPage() {
  return (
    <QuickBillShell active="Pricing">
      <main className="overflow-hidden bg-[radial-gradient(circle_at_72%_18%,rgba(86,184,57,.14),transparent_32%),linear-gradient(180deg,#fbfffa_0%,#f4f9ff_50%,#fff_100%)]">
        <section className="mx-auto grid max-w-7xl items-center gap-8 px-5 pb-12 pt-10 sm:px-8 lg:grid-cols-[1.02fr_.98fr] lg:gap-12 lg:pb-20 lg:pt-16">
          <div>
            <div className="inline-flex rounded-full border border-[#b8dfa9] bg-[#edf9e9] px-3 py-1 text-[11px] font-extrabold uppercase tracking-[.14em] text-[#378a2e]">Simple billing, made fast</div>
            <div className="mt-6 max-w-[320px]"><QuickBillLogo className="h-auto w-full" /></div>
            <h1 className="mt-5 max-w-xl text-4xl font-extrabold tracking-[-.055em] text-[#122d67] sm:text-6xl">Create bills. Share instantly. Track every payment.</h1>
            <p className="mt-5 max-w-lg text-base font-medium leading-7 text-slate-600 sm:text-lg">Simple billing for salons, clinics, cafés and growing businesses — without unnecessary accounting complexity.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="#plans" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#123d9d,#0868ed)] px-6 text-sm font-extrabold text-white shadow-[0_18px_35px_-22px_rgba(25,81,190,.7)] transition hover:-translate-y-0.5">Choose your plan <span className="ml-2">→</span></Link>
              <Link href="/quickbill" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#bcd5f5] bg-white px-6 text-sm font-extrabold text-[#2454a4] transition hover:border-[#6fa6ed]">View demo</Link>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[560px]">
            <div className="absolute -inset-6 rounded-[40px] bg-[#4d8df5]/10 blur-3xl" />
            <div className="relative"><Image src="/quickbill-pricing-mockup.png" alt="QuickBill mobile billing dashboard preview" width={2764} height={5805} priority className="h-auto max-h-[760px] w-full object-contain object-top drop-shadow-[0_35px_35px_rgba(36,77,150,.25)]" /></div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 pb-12 sm:px-8 lg:pb-20">
          <div className="rounded-[28px] border border-[#dce9f7] bg-white/88 p-5 shadow-[0_26px_60px_-45px_rgba(31,75,145,.35)] sm:p-8 lg:p-10">
            <div className="max-w-2xl"><p className="text-[11px] font-extrabold uppercase tracking-[.16em] text-[#378a2e]">Why QuickBill?</p><h2 className="mt-2 text-3xl font-extrabold tracking-[-.045em] text-[#122d67] sm:text-4xl">Everything you need to get paid.</h2></div>
            <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {["Create bills in seconds", "Save services & prices", "Paid / Pending tracking", "Automatic bill numbers", "Customer bill history", "PDF bill download", "UPI QR on every bill", "Share directly on WhatsApp", "Works perfectly on mobile"].map((feature) => <div key={feature} className="flex items-center gap-3 rounded-xl border border-[#e5edf7] bg-[#fbfdff] px-4 py-3 text-sm font-bold text-[#344a68]"><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#eaf8e7] text-[#378a2e]">✓</span>{feature}</div>)}
            </div>
          </div>
        </section>

        <section id="plans" className="mx-auto max-w-7xl scroll-mt-24 px-5 pb-12 sm:px-8 lg:pb-20">
          <div className="text-center"><p className="text-[11px] font-extrabold uppercase tracking-[.16em] text-[#378a2e]">Choose your plan</p><h2 className="mt-2 text-3xl font-extrabold tracking-[-.045em] text-[#122d67] sm:text-4xl">Simple pricing that scales with you.</h2><p className="mx-auto mt-3 max-w-xl text-sm font-medium text-slate-500">One-time setup includes business configuration and QuickBill activation.</p></div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {plans.map((plan) => <article key={plan.term} className={`relative flex flex-col rounded-[22px] border bg-white p-6 shadow-[0_24px_45px_-34px_rgba(24,67,135,.42)] ${plan.badge === "Most Popular" ? "border-[#70a5ed] ring-2 ring-[#dceaff]" : "border-[#dce7f1]"}`}>
              {plan.badge ? <span className="absolute -top-3 left-6 rounded-full bg-[linear-gradient(135deg,#123d9d,#0868ed)] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[.1em] text-white shadow-sm">{plan.badge}</span> : null}
              <p className="text-sm font-extrabold uppercase tracking-[.12em] text-[#526b8e]">{plan.term}</p><p className="mt-4 text-4xl font-extrabold tracking-[-.05em] text-[#123d9d]">{plan.price}</p><p className="mt-1 text-xs font-bold uppercase tracking-[.08em] text-slate-400">Platform access</p><p className="mt-4 min-h-10 text-sm font-medium leading-6 text-slate-500">{plan.note}</p><Link href="/quickbill/create" className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#123d9d] px-4 text-sm font-extrabold text-white transition hover:bg-[#0868ed]">Get QuickBill</Link>
            </article>)}
          </div>
          <div className="mx-auto mt-5 max-w-3xl rounded-2xl border border-[#b8dfa9] bg-[#f2fbef] p-5 text-center"><p className="text-sm font-extrabold text-[#1c5c24]">One-Time Setup: ₹1,999 + GST</p><p className="mt-1 text-xs font-semibold text-[#54715a]">Includes setup, business configuration and QuickBill activation.</p></div>
        </section>

        <section className="mx-auto max-w-5xl px-5 pb-16 text-center sm:px-8"><div className="rounded-[24px] border border-[#dce9f7] bg-white/80 p-7 shadow-sm sm:p-10"><p className="text-[11px] font-extrabold uppercase tracking-[.16em] text-[#378a2e]">Included in every plan</p><p className="mx-auto mt-4 max-w-3xl text-base font-extrabold leading-8 text-[#344a68]">{features.join("  •  ")}</p><p className="mt-6 text-sm font-medium text-slate-500">Simple. No unnecessary accounting complexity. Just bill customers quickly and know what is paid or pending.</p></div></section>
      </main>
    </QuickBillShell>
  );
}
