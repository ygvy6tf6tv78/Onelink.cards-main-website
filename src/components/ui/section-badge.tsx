import Image from "next/image";
import { cn } from "@/lib/utils";

export function SectionBadge({ label, className }: { label: string; className?: string }) {
  return (
    <div className={cn("inline-flex items-center gap-2 rounded-full border border-[#00A9FF]/16 bg-[linear-gradient(180deg,#ffffff_0%,#f2f9fd_100%)] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.11em] text-[#00A9FF] shadow-[0_12px_28px_-22px_rgba(0,169,255,0.55)] sm:text-[11px]", className)}>
      <Image src="/component-13.svg" alt="" width={14} height={16} className="h-3.5 w-auto" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}
