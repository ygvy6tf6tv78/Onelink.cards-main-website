import { getPlanById, siteConfig } from "@/content/site";
import { Icon } from "@/components/icons";
import {
  buildBookingInvoice,
  getSelectedAddOns,
  sellerInfo,
  type BookingState,
} from "@/lib/booking";
import { cn, formatCurrencyDetailed } from "@/lib/utils";

type InvoicePreviewProps = {
  state: BookingState;
  actions?: React.ReactNode;
  className?: string;
};

export function InvoicePreview({
  state,
  actions,
  className,
}: InvoicePreviewProps) {
  const invoice = buildBookingInvoice(state);
  const plan = state.planId ? getPlanById(state.planId) : undefined;
  const addOns = getSelectedAddOns(state.addOnIds);

  if (!plan) {
    return null;
  }

  return (
    <div
      className={cn(
        "rounded-[30px] border border-black/8 bg-white p-5 shadow-[0_20px_56px_rgba(14,30,37,0.06)] sm:p-7",
        className,
      )}
    >
      <div className="flex flex-col gap-5 border-b border-black/8 pb-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="inline-flex items-center gap-3 rounded-full border border-[#00A9FF]/16 bg-[#eef8ff] px-4 py-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#151515] text-white">
              <Icon name="invoice" className="h-4 w-4" />
            </span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0b7ec8]">
                Proforma Invoice
              </p>
              <p className="text-sm text-[#61707f]">Booking summary before payment</p>
            </div>
          </div>
          <h2 className="font-display mt-5 text-[2rem] font-semibold tracking-[-0.05em] text-[#151515] sm:text-[2.4rem]">
            {sellerInfo.brand}
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#61707f]">
            OneLink is a venture by Kriyon Group Private Limited
          </p>
        </div>

        <div className="grid gap-3 rounded-[24px] border border-black/8 bg-[#fafbfd] p-4 sm:grid-cols-2 lg:min-w-[320px]">
          <MetaItem label="Status" value={invoice.status} accent />
          <MetaItem label="Selected Plan" value={plan.name} />
          <MetaItem label="Invoice Number" value={invoice.invoiceNumber} />
          <MetaItem label="Booking ID" value={invoice.bookingId} />
          <MetaItem label="Issue Date" value={invoice.issueDate} />
          <MetaItem label="Valid Until" value={invoice.validUntil} />
          <MetaItem label="Order Reference" value={invoice.orderReference} />
          <MetaItem label="Currency" value="INR" />
        </div>
      </div>

      {actions ? (
        <div className="no-print mt-5 flex flex-wrap gap-3 border-b border-black/8 pb-5">
          {actions}
        </div>
      ) : null}

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
        <DetailBlock icon="building" title="Seller Details">
          <DetailRow label="Legal Name" value={sellerInfo.legalName} />
          <DetailRow label="Brand" value={sellerInfo.brand} />
          <DetailRow label="CIN" value={sellerInfo.cin} />
          <DetailRow label="GSTIN" value={sellerInfo.gstin} />
          <DetailRow label="Address" value={sellerInfo.address} />
          <DetailRow label="Support Email" value={siteConfig.contact.email} />
          <DetailRow label="Support Phone" value={siteConfig.contact.phone} />
          <DetailRow label="WhatsApp" value={`+${siteConfig.contact.whatsappNumber}`} />
          <DetailRow label="State Code" value={sellerInfo.stateCode} />
          <DetailRow label="Place of Supply" value={invoice.placeOfSupply} />
          <DetailRow label="Tax Type" value={invoice.taxMode} />
        </DetailBlock>

        <DetailBlock icon="user" title="Bill To">
          <DetailRow label="Customer Name" value={state.details.name} />
          <DetailRow label="Business Name" value={state.details.businessName} />
          <DetailRow label="Phone" value={state.details.phone} />
          <DetailRow label="Email" value={state.details.email} />
          <DetailRow label="Billing Address" value={state.details.billingAddress} />
          <DetailRow label="City" value={state.details.city} />
          <DetailRow label="State" value={state.details.state} />
          <DetailRow label="State Code" value={invoice.customerStateCode} />
          <DetailRow label="GSTIN" value={state.details.gstin || "Not provided"} />
          <DetailRow label="Place of Supply" value={invoice.placeOfSupply} />
          {state.details.website ? (
            <DetailRow label="Instagram / Website" value={state.details.website} />
          ) : null}
        </DetailBlock>
      </div>

      <div className="mt-6 overflow-hidden rounded-[24px] border border-black/8">
        <div className="hidden bg-[#f7f9fb] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#61707f] md:grid md:grid-cols-[1.2fr_1.6fr_0.45fr_0.8fr_0.55fr_0.65fr_0.65fr_0.65fr_0.8fr] md:gap-3">
          <span>Item</span>
          <span>Description</span>
          <span>Qty</span>
          <span>Taxable</span>
          <span>GST</span>
          <span>CGST</span>
          <span>SGST</span>
          <span>IGST</span>
          <span>Total</span>
        </div>

        <div className="divide-y divide-black/8">
          {invoice.rows.map((row) => (
            <div key={row.id} className="px-4 py-4 md:grid md:grid-cols-[1.2fr_1.6fr_0.45fr_0.8fr_0.55fr_0.65fr_0.65fr_0.65fr_0.8fr] md:gap-3">
              <div className="md:pr-4">
                <p className="text-sm font-semibold text-[#151515]">{row.item}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[#7b8794]">
                  HSN/SAC {row.hsnSac}
                </p>
              </div>
              <p className="mt-3 text-sm leading-6 text-[#61707f] md:mt-0">
                {row.description}
              </p>
              <Cell label="Qty" value={String(row.quantity)} />
              <Cell label="Taxable" value={formatCurrencyDetailed(row.taxableValue)} />
              <Cell label="GST Rate" value={row.gstRate} />
              <Cell label="CGST" value={formatCurrencyDetailed(row.cgst)} />
              <Cell label="SGST" value={formatCurrencyDetailed(row.sgst)} />
              <Cell label="IGST" value={formatCurrencyDetailed(row.igst)} />
              <Cell label="Total" value={formatCurrencyDetailed(row.total)} strong />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-4">
          <div className="rounded-[24px] border border-black/8 bg-[#fbfcfd] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0b7ec8]">
              Plan & Add-ons
            </p>
            <div className="mt-4 space-y-3 text-sm leading-7 text-[#5f6b77]">
              <p>
                <span className="font-semibold text-[#151515]">{plan.name}:</span>{" "}
                {plan.features.slice(0, 4).map((feature) => feature.text).join(" • ")}
              </p>
              <p>
                <span className="font-semibold text-[#151515]">Platform access:</span>{" "}
                {plan.renewalText ?? "As per selected prepaid duration"}
              </p>
              <p>
                <span className="font-semibold text-[#151515]">Payment Terms:</span>{" "}
                Payable immediately
              </p>
              {addOns.length > 0 ? (
                <p>
                  <span className="font-semibold text-[#151515]">Add-ons:</span>{" "}
                  {addOns.map((item) => item.name).join(" • ")}
                </p>
              ) : null}
            </div>
          </div>

          <div className="rounded-[24px] border border-black/8 bg-[#fbfcfd] p-5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0b7ec8]">
              Notes
            </p>
            <div className="mt-4 space-y-3 text-sm leading-7 text-[#5f6b77]">
              <p>This is a Proforma Invoice generated before payment.</p>
              <p>
                Final payment confirmation and billing/tax invoice will be issued after successful
                payment, as applicable.
              </p>
              <p>Secure payment powered by Razorpay.</p>
              <p>GST invoice available after payment.</p>
              <p>Services begin after successful booking/payment confirmation.</p>
            </div>
          </div>
        </div>

        <div className="rounded-[24px] border border-black/8 bg-[#151515] p-5 text-white shadow-[0_20px_52px_rgba(21,21,21,0.18)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
            Invoice Summary
          </p>
          <div className="mt-5 space-y-3 text-sm">
            <SummaryRow
              label="Taxable Value Subtotal"
              value={formatCurrencyDetailed(invoice.summary.taxableValueSubtotal)}
            />
            <SummaryRow
              label="CGST Total"
              value={formatCurrencyDetailed(invoice.summary.cgstTotal)}
            />
            <SummaryRow
              label="SGST Total"
              value={formatCurrencyDetailed(invoice.summary.sgstTotal)}
            />
            <SummaryRow
              label="IGST Total"
              value={formatCurrencyDetailed(invoice.summary.igstTotal)}
            />
          </div>
          <div className="mt-5 border-t border-white/12 pt-5">
            <SummaryRow
              label="Grand Total"
              value={formatCurrencyDetailed(invoice.summary.grandTotal)}
              strong
            />
          </div>
          <p className="mt-5 rounded-[18px] border border-white/10 bg-white/6 px-4 py-3 text-sm leading-6 text-white/72">
            Amount in Words: {invoice.summary.amountInWords}
          </p>
        </div>
      </div>
    </div>
  );
}

function MetaItem({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7b8794]">
        {label}
      </p>
      <p
        className={cn(
          "mt-1 text-sm font-semibold text-[#151515]",
          accent && "inline-flex rounded-full bg-[#fff4df] px-3 py-1 text-[#8f5a00]",
        )}
      >
        {value}
      </p>
    </div>
  );
}

function DetailBlock({
  icon,
  title,
  children,
}: {
  icon: "building" | "user";
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[24px] border border-black/8 bg-[#fbfcfd] p-5">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#eef8ff] text-[#00A9FF]">
          <Icon name={icon} className="h-4 w-4" />
        </span>
        <h3 className="text-lg font-semibold tracking-[-0.03em] text-[#151515]">{title}</h3>
      </div>
      <div className="mt-4 space-y-3">{children}</div>
    </section>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="grid gap-1 border-b border-black/6 pb-3 last:border-b-0 last:pb-0 sm:grid-cols-[140px_minmax(0,1fr)]">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#7b8794]">
        {label}
      </p>
      <p className="text-sm leading-6 text-[#334155]">{value}</p>
    </div>
  );
}

function Cell({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="mt-3 md:mt-0">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#7b8794] md:hidden">
        {label}
      </p>
      <p className={cn("text-sm text-[#334155]", strong && "font-semibold text-[#151515]")}>
        {value}
      </p>
    </div>
  );
}

function SummaryRow({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className={cn("text-white/70", strong && "text-base font-semibold text-white")}>
        {label}
      </span>
      <span className={cn("font-medium text-white", strong && "text-xl font-semibold")}>
        {value}
      </span>
    </div>
  );
}
