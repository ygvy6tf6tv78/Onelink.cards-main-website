/* eslint-disable @next/next/no-img-element */
import { BuyButton } from "@/components/payment/buy-button";
import { Icon } from "@/components/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { SurfaceCard } from "@/components/ui/surface-card";

export function PaymentsSection() {
  return (
    <section className="section-shell px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <Reveal>
          <SectionHeading
            eyebrow="Secure payments built in"
            title="Purchase OneLink with secure checkout and clean activation flow."
            description="Use Razorpay to purchase OneLink with support for UPI, credit cards, debit cards, net banking, and eligible EMI options. This section is only about buying OneLink securely."
          />
          <div className="mt-8 flex flex-wrap items-center gap-6 opacity-80 grayscale contrast-125 transition duration-500 hover:grayscale-0 hover:opacity-100">
            <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg" alt="Razorpay" className="h-5" />
            <div className="mx-1 h-6 w-px bg-black/10" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" className="h-4" />
            <svg role="img" viewBox="0 0 24 24" className="h-[34px] w-auto -mx-1.5 text-[#1434CB] opacity-90 mix-blend-multiply" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M9.112 8.262L5.97 15.758H3.92L2.374 9.775c-.094-.368-.175-.503-.461-.658C1.447 8.864.677 8.627 0 8.479l.046-.217h3.3a.904.904 0 01.894.764l.817 4.338 2.018-5.102zm8.033 5.049c.008-1.979-2.736-2.088-2.717-2.972.006-.269.262-.555.822-.628a3.66 3.66 0 011.913.336l.34-1.59a5.207 5.207 0 00-1.814-.333c-1.917 0-3.266 1.02-3.278 2.479-.012 1.079.963 1.68 1.698 2.04.756.367 1.01.603 1.006.931-.005.504-.602.725-1.16.734-.975.015-1.54-.263-1.992-.473l-.351 1.642c.453.208 1.289.39 2.156.398 2.037 0 3.37-1.006 3.377-2.564m5.061 2.447H24l-1.565-7.496h-1.656a.883.883 0 00-.826.55l-2.909 6.946h2.036l.405-1.12h2.488zm-2.163-2.656l1.02-2.815.588 2.815zm-8.16-4.84l-1.603 7.496H8.34l1.605-7.496z"/></svg>
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg" alt="Mastercard" className="h-5" />
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <SurfaceCard tone="strong" className="rounded-[34px] p-8">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-[28px] border border-black/7 bg-[linear-gradient(180deg,_rgba(255,255,255,0.98),_rgba(234,247,253,0.98))] p-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent-strong)]">
                  <Icon name="shield" className="h-5 w-5" />
                </span>
                <h3 className="font-display mt-5 text-2xl font-bold tracking-tighter text-[var(--foreground)]">
                  Authenticated secure payments
                </h3>
                <p className="text-muted mt-4 text-sm leading-7">
                  Order creation and signature verification are scaffolded server-side for a clean, structured checkout flow.
                </p>
              </div>
              <div className="rounded-[28px] border border-black/7 bg-white p-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black/5 text-[var(--foreground)]">
                  <Icon name="wallet" className="h-5 w-5" />
                </span>
                <h3 className="font-display mt-5 text-2xl font-bold tracking-tighter text-[var(--foreground)]">
                  EMI available
                </h3>
                <p className="text-muted mt-4 text-sm leading-7">
                  Need flexibility? Eligible Razorpay payment methods can support EMI messaging across the purchase journey.
                </p>
              </div>
            </div>
            <div className="mt-6 rounded-[28px] border border-black/7 bg-white/88 p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-strong)]">
                    Fast activation
                  </p>
                  <h3 className="font-display mt-3 text-2xl font-bold tracking-tighter text-[var(--foreground)]">
                    Buy OneLink and move straight into setup.
                  </h3>
                </div>
                <BuyButton planId="signature" maintenanceId="6-month" label="Choose Signature" />
              </div>
              <p className="text-muted mt-4 text-sm leading-7">
                Essential, Signature, Elite and Enterprise plans all use the same secure checkout flow, with GST shown before payment.
              </p>
            </div>
          </SurfaceCard>
        </Reveal>
      </div>
    </section>
  );
}
