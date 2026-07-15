import Link from "next/link";
import { Footer } from "@/components/layout/footer";
import { ActionLink } from "@/components/ui/action-link";
import { Wordmark } from "@/components/ui/brand-mark";
import { siteConfig } from "@/content/site";
import { legalUpdatedOn, type LegalDocument } from "@/content/legal";
import { cn } from "@/lib/utils";

type LegalPageProps = {
  document: LegalDocument;
  eyebrow: string;
  continuous?: boolean;
};

export function LegalPage({ document, eyebrow, continuous = false }: LegalPageProps) {
  const whatsappHref = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
    `Hello OneLink, I need help regarding ${document.title}.`,
  )}`;

  return (
    <>
      <div className="min-h-screen bg-[#f5f8fc] px-4 pb-14 pt-6 sm:px-6 sm:pb-16 sm:pt-8 lg:px-8">
        <div className="mx-auto max-w-[1180px]">
          <div className="mb-6 flex items-center justify-between gap-4">
            <Link href="/" aria-label="OneLink home" className="inline-flex items-center">
              <Wordmark className="h-8 sm:h-9" />
            </Link>
            <ActionLink href="/" variant="secondary" className="px-4 py-2.5 text-sm shadow-none">
              ← Back to Website
            </ActionLink>
          </div>
          <div className="rounded-[28px] border border-slate-900/[0.07] bg-white p-6 shadow-[0_22px_60px_-42px_rgba(15,23,42,0.32)] sm:p-8 lg:p-9">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#008bd1]">
                  {eyebrow}
                </p>
                <h1 className="font-display mt-3 text-[2.25rem] font-semibold leading-[1.02] tracking-[-0.055em] text-[var(--foreground)] sm:text-[3.2rem]">
                  {document.title}
                </h1>
                <p className="text-muted mt-4 max-w-2xl text-[15px] leading-7 sm:text-[16px] sm:leading-8">
                  {document.subtitle}
                </p>
                <p className="mt-3 text-[12px] font-semibold text-[#7a899a]">
                  A venture of Kriyon Group Private Limited
                </p>
              </div>

              <div className="grid gap-x-6 gap-y-4 rounded-[20px] border border-slate-900/[0.07] bg-[#f8fbfe] p-5 sm:grid-cols-2 lg:min-w-[370px]">
                <MetaItem label="Updated" value={document.updatedOn ?? legalUpdatedOn} />
                <MetaItem label="Company" value={siteConfig.contact.company} />
                <MetaItem label="Phone" value={siteConfig.contact.phone} href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`} />
                <MetaItem label="Email" value={siteConfig.contact.email} href={`mailto:${siteConfig.contact.email}`} />
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-[238px_minmax(0,1fr)]">
            <aside className="hidden lg:block">
              <div className="sticky top-6 space-y-4">
                <div className="rounded-[22px] border border-slate-900/[0.07] bg-white p-4 shadow-[0_18px_44px_-36px_rgba(15,23,42,0.3)]">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-strong)]">
                    On this page
                  </p>
                  <nav className="mt-3 space-y-0.5">
                    {document.sections.map((section, index) => (
                      <a
                        key={section.id}
                        href={`#${section.id}`}
                        className="flex items-start gap-2.5 rounded-[14px] px-2.5 py-2 text-[12px] font-semibold text-[#526173] transition hover:bg-[#f3f8fc] hover:text-[#087cbc]"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[7px] bg-[#edf8ff] text-[9px] font-bold text-[#008bd1]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="leading-5">{section.title}</span>
                      </a>
                    ))}
                  </nav>
                </div>

                <div className="rounded-[22px] border border-slate-900/[0.07] bg-white p-4 shadow-[0_18px_44px_-36px_rgba(15,23,42,0.3)]">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-strong)]">
                    Need help?
                  </p>
                  <p className="mt-3 text-sm leading-7 text-[var(--muted)]">
                    Contact support for clarification on billing, booking references, or policy
                    questions.
                  </p>
                  <ActionLink href={whatsappHref} className="mt-4 w-full">
                    Contact Support
                  </ActionLink>
                </div>
              </div>
            </aside>

            <div>
              <div
                className={cn(
                  continuous
                    ? "space-y-1 overflow-hidden rounded-[24px] border border-slate-900/[0.07] bg-white p-2 shadow-[0_22px_58px_-44px_rgba(15,23,42,0.34)]"
                    : "space-y-5",
                )}
              >
                {document.sections.map((section, index) => (
                  <section
                    key={section.id}
                    id={section.id}
                    className={cn(
                      "scroll-mt-6 p-5 sm:p-7",
                      continuous
                        ? "rounded-[18px] bg-transparent transition-colors hover:bg-[#f8fbfe]"
                        : "rounded-[30px] border border-black/8 bg-white/92 shadow-[0_18px_44px_rgba(14,30,37,0.05)]",
                    )}
                  >
                  <div className="flex items-start gap-4">
                    <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-[10px] bg-[#edf8ff] text-[11px] font-bold text-[#008bd1]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <h2 className="font-display text-[1.3rem] font-semibold tracking-[-0.035em] text-[var(--foreground)] sm:text-[1.55rem]">
                        {section.title}
                      </h2>
                      <div className="legal-copy mt-3 text-[14px] leading-7 text-[#526173] sm:text-[15px] sm:leading-8">
                        {section.paragraphs.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                        {section.bullets ? (
                          <ul className="mt-4 space-y-3">
                            {section.bullets.map((bullet) => (
                              <li key={bullet} className="flex gap-3">
                                <span className="mt-3 h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  </section>
                ))}
              </div>

              <div className="mt-5 flex flex-col gap-3 rounded-[24px] border border-slate-900/[0.07] bg-white p-6 shadow-[0_22px_58px_-44px_rgba(15,23,42,0.34)] sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-display text-xl font-semibold tracking-[-0.04em] text-[var(--foreground)]">
                    Need clarification before you book?
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[var(--muted)]">
                    We can help with billing, support, booking references, or plan-related policy
                    questions.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <ActionLink href="/" variant="secondary">
                    Back
                  </ActionLink>
                  <ActionLink href={whatsappHref}>Contact Support</ActionLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

function MetaItem({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
        {label}
      </p>
      {href ? (
        <a href={href} className="mt-1 block break-words text-sm font-semibold text-[var(--foreground)] transition hover:text-[var(--accent-strong)]">
          {value}
        </a>
      ) : (
        <p className="mt-1 text-sm font-semibold text-[var(--foreground)]">{value}</p>
      )}
    </div>
  );
}
