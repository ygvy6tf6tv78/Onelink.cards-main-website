import { cn } from "@/lib/utils";

export function SectionBadge({ label, className }: { label: string; className?: string }) {
  return (
    <div className={cn("inline-flex items-center rounded-full border border-[#00A9FF]/18 bg-[linear-gradient(180deg,#ffffff_0%,#f2f9fd_100%)] px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.12em] text-[#0785c9] shadow-[0_12px_28px_-22px_rgba(0,169,255,0.55)] sm:text-[12px]", className)}>
      <span>{label}</span>
    </div>
  );
}
