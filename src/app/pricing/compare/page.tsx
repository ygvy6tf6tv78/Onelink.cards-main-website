import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Compare OneLink Plans",
  description: "Compare Essential, Signature and Elite OneLink features.",
};

const rows = [
  ["Premium Custom OneLink", "✓", "✓", "✓"],
  ["Gallery, Menu, Services & Products", "✓", "✓", "✓"],
  ["Call, WhatsApp, Location, Reviews & Payments", "✓", "✓", "✓"],
  ["Digital QR Code", "✓", "✓", "✓"],
  ["Content Management", "2 Managed Updates / Month", "Self-Manage via Admin", "Self-Manage via Admin"],
  ["Bookings, Orders & Enquiries", "—", "Manual / WhatsApp Based", "Automated"],
  ["Customer Lead Capture", "—", "✓", "✓"],
  ["Live Availability & Slot Management", "—", "—", "✓"],
  ["Auto Confirmations & Reminders", "—", "—", "✓"],
  ["Customer Database & Advanced Analytics", "—", "—", "✓"],
  ["100 Personalized QR Visiting Cards", "—", "✓", "✓"],
  ["QR Sticker Design Pack", "—", "✓", "✓"],
  ["QuickBill", "Available separately", "Available separately", "Included"],
  ["Setup, Onboarding & Testing", "✓", "✓", "✓"],
] as const;

const positioning = [
  ["Essential", "Show", "For businesses that want to show everything in one place."],
  ["Signature ⭐", "Convert", "For businesses that want to generate bookings, orders, enquiries and leads."],
  ["Elite", "Automate", "For businesses that want to automate bookings and customer operations."],
] as const;

export default function ComparePlansPage() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#f6faff] px-4 pb-20 pt-28 sm:px-6 sm:pt-32">
      <div className="mx-auto max-w-7xl">
        <header className="mx-auto max-w-3xl text-center">
          <Link href="/pricing" className="inline-flex items-center gap-2 rounded-full border border-[#cfe1f1] bg-white px-4 py-2 text-xs font-extrabold text-[#087cbc] shadow-sm transition hover:-translate-y-0.5 hover:border-[#8ec8ed]">← Back to pricing</Link>
          <p className="text-[11px] font-extrabold uppercase tracking-[.18em] text-[#087cbc]">OneLink plans</p>
          <h1 className="mt-4 text-3xl font-extrabold tracking-[-.045em] text-[#09223E] sm:text-5xl">Compare all features</h1>
          <p className="mt-3 text-sm font-semibold leading-relaxed text-[#607084] sm:text-base">See the difference between Show, Convert and Automate in one clear view.</p>
        </header>

        <section className="mt-7 overflow-hidden rounded-[26px] border border-[#cfe1f1] bg-white shadow-[0_30px_70px_-48px_rgba(9,34,62,.55)]">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] border-collapse text-left">
              <thead>
                <tr className="bg-[linear-gradient(135deg,#09223E,#064083,#0077FF)] text-white">
                  <th className="w-[38%] px-5 py-5 text-xs font-extrabold uppercase tracking-[.12em] sm:px-7">Features</th>
                  <th className="px-4 py-5 text-center text-sm font-extrabold sm:text-base">Essential</th>
                  <th className="border-x border-white/15 bg-white/10 px-4 py-5 text-center text-sm font-extrabold sm:text-base">Signature ⭐<span className="mt-1 block text-[9px] uppercase tracking-[.1em] text-[#ffdf7e]">Most Popular</span></th>
                  <th className="px-4 py-5 text-center text-sm font-extrabold sm:text-base">Elite</th>
                </tr>
              </thead>
              <tbody>
                {rows.map(([feature, essential, signature, elite], index) => (
                  <tr key={feature} className={index % 2 ? "bg-[#f8fbff]" : "bg-white"}>
                    <th className="border-b border-[#e5edf5] px-5 py-4 text-xs font-extrabold text-[#263b58] sm:px-7 sm:text-sm">{feature}</th>
                    {[essential, signature, elite].map((value, column) => (
                      <td key={`${feature}-${column}`} className={`border-b border-[#e5edf5] px-4 py-4 text-center text-xs font-bold ${column === 1 ? "bg-[#eef7ff] text-[#064083]" : "text-[#526173]"} ${value === "✓" ? "text-[#16843f]" : ""}`}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          {positioning.map(([name, label, description], index) => (
            <article key={name} className={`rounded-[20px] border p-5 shadow-[0_18px_38px_-30px_rgba(9,34,62,.45)] ${index === 1 ? "border-[#68b6ef] bg-[linear-gradient(145deg,#09223E,#064083,#0077FF)] text-white" : "border-[#d5e5f1] bg-white text-[#09223E]"}`}>
              <p className={`text-[10px] font-extrabold uppercase tracking-[.15em] ${index === 1 ? "text-[#bfe5ff]" : "text-[#087cbc]"}`}>{label}</p>
              <h2 className="mt-2 text-xl font-extrabold">{name}</h2>
              <p className={`mt-2 text-sm font-semibold leading-relaxed ${index === 1 ? "text-white/80" : "text-[#607084]"}`}>{description}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}
