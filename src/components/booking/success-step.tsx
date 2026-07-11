"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getPlanById, siteConfig, type IconName } from "@/content/site";
import {
  clampBookingQuantity,
  readStoredBookingState,
  getPlanGrandTotal,
  getSupportWhatsAppHref,
} from "@/lib/booking";
import { BookingShell } from "@/components/booking/booking-shell";
import { Icon } from "@/components/icons";
import { formatCurrency } from "@/lib/utils";

export function SuccessStep() {
  return (
    <Suspense fallback={null}>
      <SuccessStepContent />
    </Suspense>
  );
}

function SuccessStepContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [stored, setStored] = useState<ReturnType<typeof readStoredBookingState>>(null);

  useEffect(() => {
    queueMicrotask(() => {
      setStored(readStoredBookingState());
    });
  }, []);

  const bookingIdRaw = searchParams.get("booking") ?? stored?.bookingId ?? "BK-2026-TEST";
  const customerName = stored?.details?.name || "Client";

  // Professional Short ID Format: #OL-[FirstName]-[4-Digits]
  const firstName = customerName.split(" ")[0].toUpperCase();
  const shortId = `#OL-${firstName}-${bookingIdRaw.slice(-4)}`;
  const plan = stored?.planId ? getPlanById(stored.planId) : undefined;
  const totalAmount = plan
    ? getPlanGrandTotal(
        plan,
        stored?.maintenanceId,
        stored?.addOnIds ?? [],
        clampBookingQuantity(stored?.quantity ?? 1),
      )
    : 15000;

  const whatsappHref = getSupportWhatsAppHref(
    `Hi OneLink Team, I’ve completed my booking. Booking ID: ${shortId}.`
  );

  return (
    <BookingShell step="done" title="Booking Confirmed." className="max-w-[1160px] mx-auto px-4 sm:px-6">
      <div className="grid gap-12 lg:grid-cols-[1.3fr_420px] items-start pt-6 sm:pt-10 pb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        
        {/* Left Column: Full Wide Hero & Timeline */}
        <div className="space-y-16">
          <div className="space-y-8">
            <div className="relative inline-flex">
              <div className="absolute inset-0 scale-125 animate-ping rounded-full bg-emerald-400/20" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-[28px] bg-emerald-500 text-white shadow-[0_24px_48px_-12px_rgba(16,185,129,0.4)]">
                <Icon name="check" className="h-10 w-10" />
              </div>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-[3.5rem] sm:text-[4.8rem] leading-[1] font-black text-[#111827] tracking-tight">
                OneLink Project <br />
                <span className="text-[#00A9FF]">Initialized.</span>
              </h1>
              <p className="text-[18px] sm:text-[22px] font-medium text-[#64748B] max-w-[560px] leading-relaxed">
                Welcome to OneLink, <span className="text-[#111827] font-bold">{customerName}</span>. Your slot is now locked and our design team has been notified.
              </p>
            </div>
          </div>

          {/* Expansive Studio Timeline */}
          <div className="space-y-8 pt-8">
             <div className="flex items-center gap-4">
                <h3 className="text-[14px] font-black uppercase tracking-[0.3em] text-[#111827]">OneLink Project Timeline</h3>
                <div className="h-px bg-[#F1F5F9] flex-1" />
             </div>
             <div className="grid sm:grid-cols-3 gap-8">
                {(
                  [
                    {
                      t: "Team Call",
                      d: "Our design manager reaches out to lock your OneLink requirements.",
                      h: "3–4 Hours",
                      i: "phone" as const,
                    },
                    {
                      t: "Draft One",
                      d: "Initial design ready for your feedback and revisions.",
                      h: "48 Hours",
                      i: "spark" as const,
                    },
                    {
                      t: "Go-Live",
                      d: "Your professional OneLink profile goes live globally.",
                      h: "5–7 Days",
                      i: "bolt" as const,
                    },
                  ] satisfies ReadonlyArray<{ t: string; d: string; h: string; i: IconName }>
                ).map((step, i) => (
                  <div key={i} className="group p-8 rounded-[32px] bg-[#F8FAFC] border border-transparent hover:border-[#F1F5F9] hover:bg-white hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] transition-all duration-500">
                     <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center text-[#111827] mb-6 shadow-sm group-hover:bg-[#111827] group-hover:text-white transition-all">
                        <Icon name={step.i} className="h-6 w-6" />
                     </div>
                     <p className="text-[16px] font-black text-[#111827] mb-2">{step.t}</p>
                     <p className="text-[13px] font-medium text-[#64748B] leading-relaxed mb-4">{step.d}</p>
                     <div className="inline-flex px-3 py-1 rounded-full bg-white border border-[#E2E8F0] text-[10px] font-black text-[#00A9FF] uppercase tracking-wider shadow-sm">
                        {step.h}
                     </div>
                  </div>
                ))}
             </div>
          </div>

          <div className="p-8 rounded-[40px] bg-blue-50/50 border border-blue-102 flex flex-col sm:flex-row items-center gap-6">
             <div className="h-16 w-16 shrink-0 rounded-[22px] bg-white flex items-center justify-center shadow-sm">
                <Icon name="bolt" className="h-8 w-8 text-[#00A9FF]" />
             </div>
             <div>
                <p className="text-[17px] font-black text-[#0c4a6e]">Next Action Required</p>
                <p className="text-[14px] font-medium text-[#0ea5e9] mt-0.5 leading-relaxed">
                   Please keep your brand assets (Logo, High-Res Photos, Social Links) ready. Our team will need these for the initialization call.
                </p>
             </div>
          </div>
        </div>

        {/* Right Column: Sticky Project Summary Dashboard */}
        <div className="lg:sticky lg:top-8 space-y-6 lg:pl-10">
           <div className="rounded-[42px] bg-[#111827] p-10 text-white shadow-[0_48px_80px_-16px_rgba(0,0,0,0.25)] relative overflow-hidden group">
              <div className="absolute top-0 right-0 h-48 w-48 bg-[#00A9FF] opacity-[0.08] blur-[80px] group-hover:opacity-15 transition-opacity duration-700" />
              
              <p className="text-[11px] font-black uppercase tracking-[0.25em] text-white/40 mb-10">Project Dashboard</p>

              <div className="space-y-8">
                 <div className="grid grid-cols-2 gap-8 pb-10 border-b border-white/10">
                    <div className="space-y-2">
                       <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Booking ID</p>
                       <p className="text-[17px] font-black text-[#00A9FF] tracking-tight">{shortId}</p>
                    </div>
                    <div className="space-y-2">
                       <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Plan Type</p>
                       <p className="text-[17px] font-black tracking-tight">{plan?.name || "Business Studio"}</p>
                    </div>
                    <div className="space-y-2">
                       <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Status</p>
                       <p className="text-[17px] font-black text-emerald-400 tracking-tight flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                          Live Ready
                       </p>
                    </div>
                    <div className="space-y-2">
                       <p className="text-[10px] font-black uppercase tracking-widest text-white/30">Paid In Full</p>
                       <p className="text-[17px] font-black tracking-tight">{formatCurrency(totalAmount)}</p>
                    </div>
                 </div>

                 {/* Team Working Hours: 10 AM - 7 PM */}
                 <div className="p-7 rounded-[32px] bg-white/5 border border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                       <p className="text-[14px] font-black text-white">Project Queue Active</p>
                       <div className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-wider">
                          OneLink Hours
                       </div>
                    </div>
                    <p className="text-[13px] font-medium text-white/60 leading-relaxed">
                       Our experts are active from **10:00 AM — 07:00 PM** daily. You will be contacted within the next 3–4 hours.
                    </p>
                 </div>

                 <div className="space-y-4 pt-4">
                    <a 
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full h-16 items-center justify-center gap-3 rounded-[24px] bg-[#00A9FF] text-white text-[16px] font-black hover:bg-[#0092E0] transition-all shadow-[0_20px_40px_-10px_rgba(0,169,255,0.4)] active:scale-[0.98]"
                    >
                      <Icon name="whatsapp" className="h-6 w-6 fill-white stroke-none" />
                      Priority Support
                    </a>
                    <a 
                      href={`tel:${siteConfig.contact.phone}`}
                      className="flex w-full h-16 items-center justify-center gap-3 rounded-[24px] border-2 border-white/10 bg-white/5 text-white text-[16px] font-black hover:bg-white/10 transition-all active:scale-[0.98]"
                    >
                      <Icon name="phone" className="h-5 w-5" />
                      Studio Hotline
                    </a>
                 </div>
              </div>
           </div>

           <button 
             onClick={() => router.push("/")}
             className="w-full h-14 flex items-center justify-center gap-2 text-[14px] font-black text-[#94A3B8] hover:text-[#111827] transition-all group"
           >
             <span className="group-hover:-translate-x-1 transition-transform">←</span>
             Return to Homepage
           </button>
        </div>
      </div>
    </BookingShell>
  );
}
