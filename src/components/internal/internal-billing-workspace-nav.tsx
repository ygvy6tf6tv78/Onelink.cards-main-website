"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const workspaces = [
  { href: "/--12/billing", label: "Quotation" },
  { href: "/--12/billing/bill", label: "Make a Bill" },
] as const;

export function InternalBillingWorkspaceNav({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Billing workspace"
      className={cn("grid grid-cols-2 rounded-[13px] border border-[#dce8f0] bg-[#eef5f9] p-1", className)}
    >
      {workspaces.map((workspace) => {
        const active = workspace.href === "/--12/billing"
          ? pathname === workspace.href
          : pathname?.startsWith(workspace.href);

        return (
          <Link
            key={workspace.href}
            href={workspace.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "inline-flex min-h-9 items-center justify-center rounded-[10px] px-3 text-[11px] font-bold transition sm:text-[12px]",
              active
                ? "bg-white text-[#087cbc] shadow-[0_5px_16px_-10px_rgba(15,23,42,0.45)]"
                : "text-[#64748b] hover:text-[#0f172a]",
            )}
          >
            {workspace.label}
          </Link>
        );
      })}
    </nav>
  );
}
