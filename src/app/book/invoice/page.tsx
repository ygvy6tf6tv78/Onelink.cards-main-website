"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  readStoredBookingState, 
  buildBookingInvoice,
  type BookingInvoice,
  sellerInfo 
} from "@/lib/booking";
import { formatCurrency } from "@/lib/utils";
import { Icon } from "@/components/icons";
import { BrandMark } from "@/components/ui/brand-mark";

export default function InvoicePage() {
  const router = useRouter();
  const [invoice, setInvoice] = useState<BookingInvoice | null>(null);

  useEffect(() => {
    const state = readStoredBookingState();
    if (!state || !state.bookingId) {
      router.replace("/book");
      return;
    }

    try {
      const data = buildBookingInvoice(state);
      queueMicrotask(() => setInvoice(data));
    } catch (err) {
      console.error("Failed to build invoice:", err);
      router.replace("/book");
    }
  }, [router]);

  if (!invoice) return null;

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8 no-print">
      <div className="max-w-4xl mx-auto">
        {/* Actions Header */}
        <div className="flex items-center justify-between mb-8 no-print">
           <button 
             onClick={() => router.back()}
             className="inline-flex items-center gap-2 text-[13px] font-bold text-[#64748B] hover:text-[#111827] transition-colors"
           >
              <Icon name="chevron-left" className="h-4 w-4" />
              Back to confirmation
           </button>
           <button 
             onClick={() => window.print()}
             className="inline-flex h-11 items-center justify-center gap-2 px-6 rounded-xl bg-[#111827] text-white text-[13px] font-bold shadow-lg shadow-black/10 hover:bg-black transition-all"
           >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231a1.125 1.125 0 01-1.12-1.227L6.34 18m11.318-4.171a3.375 3.375 0 11-6.714 0 3.375 3.375 0 016.714 0zM12 12.75l.001-9.457" /></svg>
              Print Invoice / PDF
           </button>
        </div>

        {/* The Invoice Document */}
        <div className="bg-white rounded-[40px] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.06)] border border-[#E2E8F0] overflow-hidden print:border-none print:shadow-none print:rounded-none">
           {/* Seller Gradient Bar */}
           <div className="h-2 bg-gradient-to-r from-[#00A9FF] to-[#01F1FE]" />
           
           <div className="p-10 sm:p-16 space-y-12">
              {/* Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start gap-8">
                 <div className="space-y-6">
                    <BrandMark className="h-10 w-10 rounded-[12px]" imageClassName="h-[29px] w-auto" />
                    <div className="space-y-1">
                       <h1 className="text-[28px] font-extrabold text-[#111827] tracking-tight">Invoice</h1>
                       <p className="text-[13px] font-bold text-[#64748B]">#{invoice.invoiceNumber}</p>
                    </div>
                 </div>
                 <div className="sm:text-right space-y-4">
                    <div className="space-y-1">
                       <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#94A3B8]">Issue Date</p>
                       <p className="text-[14px] font-bold text-[#111827]">{invoice.issueDate}</p>
                    </div>
                    <div className="space-y-1">
                       <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#94A3B8]">Due Date</p>
                       <p className="text-[14px] font-bold text-[#111827]">{invoice.validUntil}</p>
                    </div>
                 </div>
              </div>

              {/* Party Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 pt-12 border-t border-[#F1F5F9]">
                 <div className="space-y-4">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#94A3B8]">Billed To</p>
                    <div className="space-y-1">
                       <p className="text-[17px] font-extrabold text-[#111827] tracking-tight">{invoice.summary.cgstTotal > 0 || invoice.summary.igstTotal > 0 ? invoice.bookingId.split('-').at(0) : ''} {readStoredBookingState()?.details.name}</p>
                       <p className="text-[14px] font-bold text-[#111827]">{readStoredBookingState()?.details.businessName}</p>
                       <p className="text-[13px] font-medium text-[#64748B] max-w-[280px] leading-relaxed">
                          {readStoredBookingState()?.details.billingAddress}<br />
                          {readStoredBookingState()?.details.city}, {readStoredBookingState()?.details.state} {invoice.customerStateCode}
                       </p>
                    </div>
                 </div>
                 <div className="space-y-4">
                    <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#94A3B8]">Seller Information</p>
                    <div className="space-y-1">
                       <p className="text-[17px] font-extrabold text-[#00A9FF] tracking-tight">{sellerInfo.legalName}</p>
                       <p className="text-[13px] font-medium text-[#64748B] max-w-[280px] leading-relaxed">
                          {sellerInfo.address}<br />
                          {sellerInfo.state} {sellerInfo.stateCode}
                       </p>
                       <p className="pt-2 text-[13px] font-bold text-[#111827]">GSTIN: {sellerInfo.gstin}</p>
                    </div>
                 </div>
              </div>

              {/* Line Items */}
              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead>
                       <tr className="border-b border-[#F1F5F9]">
                          <th className="py-4 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#94A3B8]">Item Details</th>
                          <th className="py-4 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#94A3B8] text-right">HSN/SAC</th>
                          <th className="py-4 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#94A3B8] text-right">Taxable Value</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F1F5F9]">
                       {invoice.rows.map((row) => (
                         <tr key={row.id}>
                            <td className="py-6 pr-8">
                               <p className="text-[15px] font-bold text-[#111827] leading-none">{row.item}</p>
                               <p className="text-[12px] font-medium text-[#64748B] mt-2 leading-relaxed">{row.description}</p>
                            </td>
                            <td className="py-6 text-right tabular-nums text-[13px] font-bold text-[#111827] align-top">{row.hsnSac}</td>
                            <td className="py-6 text-right tabular-nums text-[15px] font-bold text-[#111827] align-top">{formatCurrency(row.taxableValue)}</td>
                         </tr>
                       ))}
                    </tbody>
                 </table>
              </div>

              {/* Totals */}
              <div className="flex flex-col items-end pt-8 border-t border-[#F1F5F9]">
                 <div className="w-full sm:w-[320px] space-y-4">
                    <div className="flex justify-between items-center text-[14px]">
                       <span className="font-bold text-[#64748B]">Taxable Value</span>
                       <span className="font-bold text-[#111827]">{formatCurrency(invoice.summary.taxableValueSubtotal)}</span>
                    </div>
                    {invoice.summary.cgstTotal > 0 && (
                      <div className="flex justify-between items-center text-[14px]">
                         <span className="font-bold text-[#64748B]">CGST (9%)</span>
                         <span className="font-bold text-[#111827]">{formatCurrency(invoice.summary.cgstTotal)}</span>
                      </div>
                    )}
                    {invoice.summary.sgstTotal > 0 && (
                      <div className="flex justify-between items-center text-[14px]">
                         <span className="font-bold text-[#64748B]">SGST (9%)</span>
                         <span className="font-bold text-[#111827]">{formatCurrency(invoice.summary.sgstTotal)}</span>
                      </div>
                    )}
                    {invoice.summary.igstTotal > 0 && (
                      <div className="flex justify-between items-center text-[14px]">
                         <span className="font-bold text-[#64748B]">IGST (18%)</span>
                         <span className="font-bold text-[#111827]">{formatCurrency(invoice.summary.igstTotal)}</span>
                      </div>
                    )}
                    <div className="pt-6 mt-2 border-t-2 border-[#111827] flex justify-between items-center">
                       <span className="text-[16px] font-extrabold text-[#111827]">Total Paid</span>
                       <span className="text-[26px] font-extrabold text-[#00A9FF] tracking-tight">{formatCurrency(invoice.summary.grandTotal)}</span>
                    </div>
                    <p className="text-[10px] font-bold text-[#94A3B8] text-right italic pt-1">{invoice.summary.amountInWords}</p>
                 </div>
              </div>

              {/* Invoice Footer */}
              <div className="pt-16 mt-16 border-t border-[#F1F5F9]">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                    <div className="space-y-4">
                       <div className="space-y-1">
                          <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#94A3B8]">Notes</p>
                          <p className="text-[12px] font-medium text-[#64748B] leading-relaxed">
                             This is a computer-generated tax invoice for your OneLink Studio booking. No signature is required. 
                             Your page setup will begin once the payment is verified by our clearing partner.
                          </p>
                       </div>
                    </div>
                    <div className="text-right space-y-2">
                       <p className="text-[11px] font-bold text-[#111827] tracking-tight transform rotate-[-2deg] inline-block px-4 py-1.5 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-lg">
                          PAID VIA RAZORPAY
                       </p>
                       <p className="text-[10px] font-bold text-[#94A3B8]">Place of Supply: {invoice.placeOfSupply}</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <style jsx global>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; margin: 0 !important; padding: 0 !important; }
          .min-h-screen { min-height: auto !important; background: white !important; padding: 0 !important; }
          .max-w-4xl { max-width: 100% !important; margin: 0 !important; }
          .rounded-\\[40px\\] { border-radius: 0 !important; }
          .shadow-\\[0_32px_64px_-16px_rgba\\(0\\,0\\,0\\,0\\.06\\)\\] { box-shadow: none !important; }
          .border { border: none !important; }
          .p-10, .p-16 { padding: 40px !important; }
        }
      `}</style>
    </div>
  );
}
