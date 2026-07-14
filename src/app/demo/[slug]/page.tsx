import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DemoPreview } from "@/components/demo-preview";
import { BuyButton } from "@/components/payment/buy-button";
import { ActionLink } from "@/components/ui/action-link";
import { SurfaceCard } from "@/components/ui/surface-card";
import { demoItems, getDemoBySlug, siteConfig } from "@/content/site";

type DemoPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return demoItems.map((demo) => ({
    slug: demo.slug,
  }));
}

export async function generateMetadata({
  params,
}: DemoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const demo = getDemoBySlug(slug);

  if (!demo) {
    return {};
  }

  return {
    title: `${demo.title} Demo`,
    description: demo.description,
    robots: { index: false, follow: false, noarchive: true },
  };
}

export default async function DemoPage({ params }: DemoPageProps) {
  const { slug } = await params;
  const demo = getDemoBySlug(slug);
  const whatsappHref = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
    `Hello OneLink, I saw the ${slug} live example and want to discuss my page.`,
  )}`;

  if (!demo) {
    notFound();
  }

  return (
    <main className="page-shell min-h-screen px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex flex-col gap-4 rounded-[32px] border border-white/80 bg-white/78 px-6 py-5 shadow-[0_20px_50px_rgba(14,30,37,0.08)] backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--accent-strong)]">
              OneLink demo page
            </p>
            <h1 className="font-display mt-2 text-3xl font-semibold tracking-[-0.05em] text-[var(--foreground)]">
              {demo.title}
            </h1>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ActionLink href="/#work" variant="secondary">
              Back to examples
            </ActionLink>
            <ActionLink href={whatsappHref}>WhatsApp Us</ActionLink>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <DemoPreview demo={demo} />
          <SurfaceCard tone="strong" className="rounded-[34px] p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-strong)]">
              Example overview
            </p>
            <h2 className="font-display mt-3 text-4xl font-semibold tracking-[-0.05em] text-[var(--foreground)]">
              {demo.businessName}
            </h2>
            <p className="mt-4 text-lg text-[var(--muted-strong)]">{demo.tagline}</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {demo.highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="rounded-[22px] border border-black/7 bg-white/82 px-4 py-4 text-sm font-medium text-[var(--foreground)]"
                >
                  {highlight}
                </div>
              ))}
            </div>
            <div className="mt-8 space-y-4">
              {demo.sections.map((section) => (
                <div
                  key={section.title}
                  className="rounded-[24px] border border-black/7 bg-white/78 p-5"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
                    {section.title}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {section.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-[var(--accent-soft)] px-3 py-1.5 text-sm font-medium text-[var(--foreground)]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <BuyButton planId="signature" label="Buy Now" />
              <ActionLink href={whatsappHref} variant="secondary">
                WhatsApp Us
              </ActionLink>
            </div>
            <p className="mt-5 text-sm text-[var(--muted)]">
              Demo pages are illustrative mock examples to show structure, not live client accounts.
            </p>
          </SurfaceCard>
        </div>
      </div>
    </main>
  );
}
