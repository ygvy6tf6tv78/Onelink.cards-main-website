import Image from "next/image";
import type { PortfolioItem } from "@/content/portfolio";

export function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <article className="group">
      <a href={item.href} target="_blank" rel="noreferrer" className="block">
        <div className="overflow-hidden rounded-[28px] bg-[#eef4f9] shadow-[0_24px_70px_-42px_rgba(15,23,42,0.34)] ring-1 ring-black/5 transition duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_30px_80px_-42px_rgba(15,23,42,0.38)]">
          <Image
            src={item.image}
            alt={`${item.title} OneLink portfolio preview`}
            sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
            className="h-auto w-full object-contain transition duration-500 group-hover:scale-[1.015]"
          />
        </div>
      </a>

      <div className="pt-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--accent-strong)]">
          {item.label ?? item.category}
        </p>
        <h3 className="font-display mt-2 text-[1.45rem] font-semibold tracking-[-0.04em] text-[var(--foreground)] sm:text-[1.62rem]">
          {item.title}
        </h3>
        <a
          href={item.href}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[var(--foreground)] transition hover:text-[var(--accent-strong)]"
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
      </div>
    </article>
  );
}
