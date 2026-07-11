import Link from "next/link";
import { cn } from "@/lib/utils";

type ActionLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "whatsapp" | "blue";
  className?: string;
  withArrow?: boolean;
};

const variants = {
  primary:
    "bg-[#0f172a] text-white shadow-[0_8px_20px_-6px_rgba(0,0,0,0.18)] hover:scale-[1.02] hover:shadow-[0_14px_24px_-8px_rgba(0,0,0,0.25)]",
  secondary:
    "bg-neutral-100 text-black hover:bg-neutral-200 hover:scale-[1.02]",
  blue:
    "bg-[#00A9FF] text-white hover:bg-[#0089FF] hover:scale-[1.02] shadow-[0_4px_14px_-6px_rgba(0,169,255,0.6)] hover:shadow-[0_10px_24px_-8px_rgba(0,169,255,0.5)]",
  ghost:
    "text-[var(--foreground)] hover:bg-black/5",
  whatsapp:
    "bg-[#25D366] text-white shadow-[0_8px_20px_-6px_rgba(37,211,102,0.3)] hover:scale-[1.02] hover:bg-[#20bd5a] hover:shadow-[0_14px_24px_-8px_rgba(37,211,102,0.4)]",
};

export function ActionLink({
  href,
  children,
  variant = "primary",
  className,
  withArrow = false,
}: ActionLinkProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold tracking-[-0.01em] transition-all duration-300",
    variants[variant],
    className,
  );

  const content = (
    <>
      {children}
      {withArrow ? (
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
      ) : null}
    </>
  );

  if (href.startsWith("http")) {
    return (
      <a href={href} className={classes} target="_blank" rel="noreferrer">
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
