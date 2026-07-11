import { ActionLink } from "@/components/ui/action-link";
import { siteConfig } from "@/content/site";

type PaymentFailedPageProps = {
  searchParams?: Promise<{
    plan?: string;
  }>;
};

export default async function PaymentFailedPage({
  searchParams,
}: PaymentFailedPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const retryHref = resolvedSearchParams?.plan
    ? `/book/payment?plan=${encodeURIComponent(resolvedSearchParams.plan)}`
    : "/book";
  const whatsappHref = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
    "Hello OneLink, I need help with my payment.",
  )}`;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#151515] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,rgba(0,169,255,0.2),transparent_58%)]" />
      <div className="relative mx-auto max-w-3xl rounded-[34px] border border-white/10 bg-white/[0.05] p-8 text-center shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-rose-300">
          Payment not completed
        </p>
        <h1 className="font-display mt-4 text-4xl font-semibold tracking-[-0.05em] text-white">
          The checkout did not complete.
        </h1>
        <p className="mt-5 text-base leading-8 text-white/68">
          You can retry the payment from the booking flow or move the conversation to WhatsApp for manual support.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ActionLink href={retryHref} className="bg-[#00A9FF] text-white hover:bg-[#0098e6]">
            Retry Payment
          </ActionLink>
          <ActionLink
            href={whatsappHref}
            variant="secondary"
            className="border-white/14 bg-white/[0.04] text-white hover:bg-white/[0.08]"
          >
            WhatsApp Us
          </ActionLink>
        </div>
      </div>
    </main>
  );
}
