import type { Metadata } from "next";
import Link from "next/link";
import { portfolioItems } from "@/content/portfolio";
import { PortfolioBrowser } from "@/components/portfolio/portfolio-browser";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Portfolio — OneLink",
  description: "Real OneLink pages live for restaurants, consultants, retail, and more.",
};

export default function PortfolioPage() {
  return (
    <div className="relative isolate overflow-x-clip">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[560px] bg-[radial-gradient(circle_at_20%_0%,rgba(0,169,255,0.14),transparent_44%),linear-gradient(180deg,#edf6ff_0%,#f5f9fc_72%,transparent_100%)]" />
      <main className="page-shell relative">
        <div className="mx-auto max-w-7xl px-4 pb-20 pt-24 sm:px-6 sm:pt-28 lg:px-8 lg:pb-28 lg:pt-32">
          <Reveal>
            <div className="max-w-4xl text-left">
              <Link
                href="/"
                className="mb-4 inline-flex items-center gap-2 rounded-full border border-black/8 bg-white/80 px-4 py-2 text-[13px] font-semibold text-[var(--muted-strong)] shadow-[0_12px_30px_-24px_rgba(15,23,42,0.22)] transition hover:text-[var(--accent-strong)]"
              >
                <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 12L6 8l4-4" />
                </svg>
                Back to home
              </Link>
              <h1 className="font-display type-section-title mt-2 w-full text-[var(--foreground)]">
                Real OneLinks for real businesses.
              </h1>
              <p className="type-section-copy mt-4 max-w-2xl text-[var(--muted-strong)]">
                Browse live pages by category and see how calls, WhatsApp, payments, reviews and location fit into one clean link.
              </p>
            </div>
          </Reveal>

          <PortfolioBrowser items={portfolioItems} />
        </div>
      </main>
    </div>
  );
}
