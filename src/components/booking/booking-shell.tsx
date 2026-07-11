import Link from "next/link";
import { BookingProgress, type BookingStep } from "@/components/booking/booking-progress";
import { BrandMark } from "@/components/ui/brand-mark";
import { cn } from "@/lib/utils";

type BookingShellProps = {
  step: BookingStep;
  title: string;
  description?: string;
  /** Small label above the title (e.g. checkout step). */
  eyebrow?: string;
  children: React.ReactNode;
  aside?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  mobileAsidePosition?: "top" | "bottom";
};

export function BookingShell({
  step,
  title,
  description,
  eyebrow,
  children,
  aside,
  className,
  contentClassName,
  mobileAsidePosition = "bottom",
}: BookingShellProps) {
  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(0,169,255,0.09),transparent_50%),linear-gradient(180deg,#f8fafc_0%,#eef2f6_100%)] text-[#111827]">
      <div className="h-[3px] w-full bg-[#00a9ff]" />

      <header className="sticky top-0 z-40 border-b border-[#e8eaed] bg-white">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <Link href="/" className="group flex items-center gap-3">
              <BrandMark
                className="h-12 w-12 rounded-[16px] bg-[#f7fbff] transition-all group-hover:scale-105"
                imageClassName="w-[31px]"
              />
              <div className="min-w-0">
                <p className="font-display truncate text-[1.25rem] font-black tracking-[-0.04em] text-[#111827]">
                  OneLink
                </p>
                <p className="hidden text-[10px] font-bold uppercase tracking-[0.18em] text-[#00A9FF]/60 sm:block">
                  Smart Business Page
                </p>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-1.5 rounded-full bg-[#f3f4f6] px-4 py-2 text-[12px] font-bold text-[#4b5563] transition-all hover:bg-[#e5e7eb]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              Back
            </Link>
          </div>
        </div>
      </header>

      <div className="no-print border-b border-[#e8eaed]/60 bg-white">
        <div className="mx-auto max-w-[1320px] px-3 py-3 sm:px-6 lg:px-8">
          <BookingProgress current={step} />
        </div>
      </div>

      <div className="mx-auto max-w-[1320px] px-3 py-6 sm:px-6 sm:py-10 lg:px-8">
        <div className={cn("flex flex-col gap-8 xl:grid xl:grid-cols-[minmax(0,1fr)_minmax(280px,300px)] xl:items-start xl:gap-10", className)}>
          {aside ? (
            <aside
              className={cn(
                "no-print xl:hidden",
                mobileAsidePosition === "top" ? "order-1" : "order-2",
              )}
            >
              <div className="space-y-4">{aside}</div>
            </aside>
          ) : null}

          <section
            className={cn(
              "min-w-0 xl:order-1",
              mobileAsidePosition === "top" ? "order-2" : "order-1",
              contentClassName,
            )}
          >
            <div className="overflow-hidden rounded-[28px] border border-[#dce4ed] bg-white shadow-[0_28px_64px_-40px_rgba(15,23,42,0.22)] sm:rounded-[30px]">
              <div className="border-b border-[#eef2f6] bg-[linear-gradient(180deg,#fafcff_0%,#ffffff_100%)] px-5 py-6 sm:px-8 sm:py-7 lg:px-9 max-md:px-4 max-md:py-5">
                {eyebrow ? (
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#00A9FF] max-md:text-[11px]">{eyebrow}</p>
                ) : null}
                <h1
                  className={cn(
                    "font-display text-center text-[1.5rem] font-semibold leading-[1.15] tracking-[-0.04em] text-[#0f172a] max-md:text-[1.65rem] sm:text-left sm:text-[1.95rem] lg:text-[2.05rem]",
                    eyebrow ? "mt-2" : "",
                  )}
                >
                  {title}
                </h1>
                {description ? (
                  <p className="mt-2.5 max-w-[52ch] text-center text-[14px] font-medium leading-relaxed text-[#5f6b7a] max-md:text-[15px] sm:text-left sm:text-[15px]">
                    {description}
                  </p>
                ) : null}
              </div>
              <div className="p-5 sm:p-8 lg:p-9 max-md:p-4 max-md:pb-8">{children}</div>
            </div>
          </section>

          {aside ? (
            <aside className="no-print hidden xl:sticky xl:top-[120px] xl:order-2 xl:block">
              <div className="space-y-4">{aside}</div>
            </aside>
          ) : null}
        </div>
      </div>
    </main>
  );
}
