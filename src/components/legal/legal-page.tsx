import { Footer } from "@/components/layout/footer";
import { ActionLink } from "@/components/ui/action-link";
import { BrandMark, Wordmark } from "@/components/ui/brand-mark";
import { siteConfig } from "@/content/site";
import { legalUpdatedOn, type LegalDocument } from "@/content/legal";

type LegalPageProps = {
  document: LegalDocument;
  eyebrow: string;
};

export function LegalPage({ document, eyebrow }: LegalPageProps) {
  const whatsappHref = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
    `Hello OneLink, I need help regarding ${document.title}.`,
  )}`;

  return (
    <>
      <main className="page-shell min-h-screen px-4 pb-14 pt-8 sm:px-6 sm:pb-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-5">
            <ActionLink href="/" variant="secondary" className="px-4 py-2.5 text-sm">
              ← Back to Website
            </ActionLink>
          </div>
          <div className="rounded-[36px] border border-black/8 bg-white/86 p-6 shadow-[0_24px_70px_rgba(14,30,37,0.08)] backdrop-blur-xl sm:p-8 lg:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-3 rounded-full border border-black/8 bg-[#f7fbfe] px-4 py-2 shadow-[0_12px_28px_rgba(14,30,37,0.04)]">
                  <BrandMark className="h-9 w-9 rounded-[12px] shadow-none" imageClassName="w-[21px]" />
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-strong)]">
                      {eyebrow}
                    </p>
                    <Wordmark className="mt-1 h-6" />
                    <p className="mt-0.5 text-sm font-medium text-[var(--muted)]">
                      OneLink is a venture by Kriyon Group Private Limited
                    </p>
                  </div>
                </div>
                <h1 className="font-display mt-6 text-[2.3rem] font-semibold tracking-[-0.06em] text-[var(--foreground)] sm:text-[3.35rem]">
                  {document.title}
                </h1>
                <p className="text-muted mt-4 max-w-2xl text-[15px] leading-7 sm:text-[17px] sm:leading-8">
                  {document.subtitle}
                </p>
              </div>

              <div className="grid gap-3 rounded-[28px] border border-black/8 bg-[linear-gradient(180deg,#ffffff,#f7fafc)] p-5 shadow-[0_16px_38px_rgba(14,30,37,0.05)] sm:grid-cols-2 lg:min-w-[360px]">
                <MetaItem label="Updated" value={legalUpdatedOn} />
                <MetaItem label="Support" value={siteConfig.contact.email} />
                <MetaItem label="Checkout" value="Secure via Razorpay" />
                <MetaItem label="Billing" value="GST invoice available" />
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {["Plain-English legal terms", "Premium support flow", "Indian business compliance"].map(
                (item) => (
                  <span
                    key={item}
                    className="rounded-full border border-black/8 bg-[#fbfcfd] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--muted-strong)]"
                  >
                    {item}
                  </span>
                ),
              )}
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-4">
                <div className="rounded-[28px] border border-black/8 bg-white/84 p-5 shadow-[0_18px_44px_rgba(14,30,37,0.05)] backdrop-blur">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--accent-strong)]">
                    On this page
                  </p>
                  <nav className="mt-4 space-y-2">
                    {document.sections.map((section, index) => (
                      <a
                        key={section.id}
                        href={`#${section.id}`}
                        className="flex items-start gap-3 rounded-[18px] px-3 py-3 text-sm text-[var(--muted-strong)] transition hover:bg-[#f5f9fc]"
                      >
                        <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#eef8ff] text-[11px] font-semibold text-[var(--accent-strong)]">
                          {index + 1}
                        </span>
                        <span className="leading-6">{section.title}</span>
                      </a>
                    ))}
                  </nav>
                </div>

                <div className="rounded-[28px] border border-black/8 bg-white/84 p-5 shadow-[0_18px_44px_rgba(14,30,37,0.05)] backdrop-blur">
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

            <div className="space-y-5">
              {document.sections.map((section, index) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="rounded-[30px] border border-black/8 bg-white/92 p-6 shadow-[0_18px_44px_rgba(14,30,37,0.05)] scroll-mt-28 sm:p-7"
                >
                  <div className="flex items-start gap-4">
                    <span className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-[#eef8ff] text-sm font-semibold text-[var(--accent-strong)]">
                      {index + 1}
                    </span>
                    <div className="min-w-0">
                      <h2 className="font-display text-[1.45rem] font-semibold tracking-[-0.04em] text-[var(--foreground)] sm:text-[1.75rem]">
                        {section.title}
                      </h2>
                      <div className="legal-copy mt-4 text-[15px] leading-8 text-[var(--muted-strong)]">
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

              <div className="flex flex-col gap-3 rounded-[30px] border border-black/8 bg-white/92 p-6 shadow-[0_18px_44px_rgba(14,30,37,0.05)] sm:flex-row sm:items-center sm:justify-between">
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
      </main>
      <Footer />
    </>
  );
}

function MetaItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--muted)]">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-[var(--foreground)]">{value}</p>
    </div>
  );
}
