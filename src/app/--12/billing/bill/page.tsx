import type { Metadata } from "next";
import { Wordmark } from "@/components/ui/brand-mark";
import { InternalBillingWorkspaceNav } from "@/components/internal/internal-billing-workspace-nav";

export const metadata: Metadata = {
  title: "Make a Bill | Internal Billing Desk",
  description: "Internal OneLink invoice generator.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

type BillPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function InternalBillPage({ searchParams }: BillPageProps) {
  const params = await searchParams;
  const iframeParams = new URLSearchParams();

  for (const key of ["client", "plan", "care", "description", "setup", "careAmount", "discountMode", "discountValue", "gst"] as const) {
    const value = params[key];
    if (typeof value === "string" && value.trim()) iframeParams.set(key, value);
  }

  const query = iframeParams.toString();

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f7fbfe_0%,#edf5fa_100%)] text-[#0f172a]">
      <header className="border-b border-[#dceaf3] bg-white/92 px-4 py-3.5 backdrop-blur-xl sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <Wordmark priority className="!h-auto !w-[118px] sm:!w-[138px]" />
            <span className="hidden h-6 w-px bg-[#dce5ec] sm:block" />
            <div className="min-w-0">
              <p className="truncate text-[13px] font-bold text-[#263548] sm:text-[14px]">Internal Billing Desk</p>
              <p className="hidden text-[11px] font-medium text-[#7a8999] sm:block">Invoice and bill workspace</p>
            </div>
          </div>
          <InternalBillingWorkspaceNav className="w-full sm:w-[250px]" />
        </div>
      </header>

      <section className="p-2 sm:p-3">
        <div className="mx-auto h-[calc(100vh-104px)] min-h-[680px] max-w-[1600px] overflow-hidden rounded-[20px] border border-[#d8e7f0] bg-white shadow-[0_28px_70px_-48px_rgba(15,23,42,0.42)] sm:h-[calc(100vh-92px)]">
          <iframe
            title="OneLink bill generator"
            src={`/internal-billing-app/index.html${query ? `?${query}` : ""}`}
            className="h-full w-full border-0"
          />
        </div>
      </section>
    </main>
  );
}
