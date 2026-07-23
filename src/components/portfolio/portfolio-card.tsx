import Image from "next/image";
import Link from "next/link";
import type { PortfolioItem } from "@/content/portfolio";

export function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <article className="group h-full">
      <a href={item.href} target="_blank" rel="noreferrer" className="block">
        <div className="relative isolate">
          <div className="pointer-events-none absolute inset-x-3 -bottom-3 top-3 -z-10 rounded-[24px] bg-[linear-gradient(135deg,#dff4ff_0%,#eef8fd_58%,#d9effb_100%)] shadow-[0_22px_50px_-32px_rgba(0,126,191,0.34)] transition duration-300 group-hover:translate-y-1 sm:rounded-[28px]" />
          <div className="overflow-hidden rounded-[24px] border border-slate-900/[0.07] bg-white p-1.5 shadow-[0_18px_48px_-34px_rgba(15,23,42,0.3)] transition duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_28px_66px_-36px_rgba(15,23,42,0.38)] sm:rounded-[28px]">
          <Image
            src={item.image}
            alt={`${item.title} OneLink portfolio preview`}
            quality={92}
            sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
            className="h-auto w-full rounded-[20px] object-contain transition duration-500 ease-out group-hover:scale-[1.02] sm:rounded-[23px]"
          />
          </div>
        </div>
      </a>

      <div className="pt-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.09em] text-[var(--accent-strong)]">
          {item.label ?? item.category}
        </p>
        <h3 className="font-display type-card-title mt-1.5 text-[var(--foreground)]">
          {item.title}
        </h3>
        <p className="mt-2 max-w-[42ch] text-[14px] font-normal leading-[1.6] text-[#64748b]">{item.description}</p>
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <a
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[13px] bg-[linear-gradient(135deg,#07517d_0%,#087cbc_100%)] px-4 text-[13px] font-bold text-white shadow-[0_16px_34px_-22px_rgba(0,91,141,0.72)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_40px_-22px_rgba(0,91,141,0.8)]"
          >
            View Live
            <svg
              className="h-4 w-4"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3.5 8h9" />
              <path d="M8.5 3l4.5 5-4.5 5" />
            </svg>
          </a>
          <Link
            href="/book"
            className="inline-flex min-h-11 items-center justify-center rounded-[13px] border border-[#00A9FF]/28 bg-white px-4 text-[13px] font-bold text-[#087cbc] shadow-[0_14px_30px_-24px_rgba(0,126,191,0.5)] transition hover:-translate-y-0.5 hover:border-[#00A9FF]/60 hover:bg-[#f2faff]"
          >
            Book Now
          </Link>
        </div>
      </div>
    </article>
  );
}
