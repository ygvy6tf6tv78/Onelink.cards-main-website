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
            sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
            className="h-auto w-full rounded-[20px] object-contain transition duration-500 ease-out group-hover:scale-[1.02] sm:rounded-[23px]"
          />
          </div>
        </div>
      </a>

      <div className="relative isolate overflow-hidden pt-4">
        <Image
          src={item.image}
          alt=""
          aria-hidden="true"
          sizes="120px"
          className="pointer-events-none absolute -bottom-9 -right-5 -z-10 h-32 w-24 rotate-[7deg] object-contain opacity-[0.07] sm:h-36 sm:w-28"
        />
        <p className="inline-flex items-center gap-1.5 rounded-full border border-[#cfe6f7] bg-[#f3faff] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.09em] text-[#0876bb]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#19a8ee]" />
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
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[13px] bg-[linear-gradient(135deg,#00A9FF_0%,#0077FF_100%)] px-4 text-[13px] font-bold text-white shadow-[0_16px_34px_-20px_rgba(0,135,225,0.66)] transition hover:-translate-y-0.5 hover:brightness-105 hover:shadow-[0_20px_40px_-20px_rgba(0,135,225,0.76)]"
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
            href="/#contact"
            className="inline-flex min-h-11 items-center justify-center rounded-[13px] border border-[#00A9FF]/32 bg-[linear-gradient(135deg,#ffffff_20%,#eaf8ff_100%)] px-4 text-[13px] font-bold text-[#0077b9] shadow-[0_14px_30px_-22px_rgba(0,169,255,0.38)] transition hover:-translate-y-0.5 hover:border-[#00A9FF]/65 hover:bg-[#edf9ff]"
          >
            Get This Style
          </Link>
        </div>
      </div>
    </article>
  );
}
