import { Icon } from "@/components/icons";
import { cn, formatCurrency } from "@/lib/utils";
import type { Plan } from "@/content/site";

type PlanCardProps = {
  plan: Plan;
  selected?: boolean;
  compact?: boolean;
  summary?: boolean;
  /** Year-one GST-inclusive payable. Pass getPlanGrandTotal; fallback plan.orderAmount. */
  yearOneInclusiveTotal?: number;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
};

export function PlanCard({
  plan,
  selected = false,
  compact = false,
  summary = false,
  yearOneInclusiveTotal,
  actionLabel,
  onAction,
  className,
}: PlanCardProps) {
  const displayTotal = yearOneInclusiveTotal ?? plan.orderAmount;
  const isLaunch = plan.tone === "launch";
  const isFreedom = plan.tone === "freedom";
  const iconName = isFreedom ? "shield" : isLaunch ? "spark" : "wallet";

  return (
    <article
      className={cn(
        "relative rounded-[28px] border bg-white p-5 transition-all duration-500 sm:p-6",
        selected 
          ? "border-[#00a9ff] shadow-[0_24px_58px_rgba(0,169,255,0.15)] ring-[1.5px] ring-[#00a9ff]" 
          : "border-[#e5e7eb] hover:border-[#ced4da] shadow-[0_8px_30px_rgba(0,0,0,0.02)]",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={cn(
                "rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em]",
                isLaunch && "bg-[#eef8ff] text-[#00a9ff]",
                isFreedom && "bg-[#111827] text-white",
                plan.tone === "starter" && "bg-slate-100 text-slate-800",
              )}
            >
              {plan.badge ?? plan.name}
            </span>
            {!summary ? (
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9ca3af]">
                {plan.taxText ?? "+ GST (18%)"}
              </span>
            ) : null}
          </div>
          <h2 className="mt-4 text-[26px] font-black tracking-tight text-[#111827]">
            {plan.name}
          </h2>
        </div>
        <span className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px]",
          selected ? "bg-[#00a9ff] text-white shadow-lg shadow-[#00a9ff]/20" : "bg-slate-50 text-[#00a9ff] border border-slate-100"
        )}>
          <Icon name={iconName} className="h-5 w-5" />
        </span>
      </div>

      <div className="mt-5 flex flex-wrap items-end gap-2.5">
        <p className="text-[34px] font-black tracking-tighter text-[#111827] leading-none tabular-nums">
          {formatCurrency(displayTotal)}
        </p>
        {plan.savingsText ? (
          <span className="mb-1 rounded-md bg-emerald-50 text-[10px] font-black uppercase tracking-widest text-emerald-600 px-2 py-1 border border-emerald-100/50">
            {plan.savingsText}
          </span>
        ) : null}
      </div>

      {summary ? (
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="rounded-full border border-[#e5edf4] bg-white px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-[#64748B]">
            Payable Total
          </span>
          <span className="rounded-full border border-[#dbeafe] bg-[#f7fbff] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-[#0369A1]">
            {plan.taxText ?? "+ GST (18%)"}
          </span>
        </div>
      ) : null}

      <div className="mt-5 flex flex-wrap gap-2">
        {["Direct Domain", "Cloud Hosting", "Admin Panel"].map((item) => (
          <span
            key={item}
            className="rounded-full border border-slate-100 bg-slate-50/50 px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.16em] text-slate-400"
          >
            {item}
          </span>
        ))}
      </div>

      <div className="mt-6 space-y-3.5">
        {plan.features.slice(0, compact || summary ? 4 : 7).map((feature) => (
          <div key={feature.text} className="flex items-start gap-3">
             <div className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-[#00a9ff]/10 text-[#00a9ff]">
               <Icon name="check" className="h-3 w-3" />
             </div>
            <span className="text-[13px] font-bold leading-relaxed text-[#475569]">{feature.text}</span>
          </div>
        ))}
      </div>

      {actionLabel && onAction ? (
        <button
          type="button"
          onClick={onAction}
          className={cn(
            "mt-8 inline-flex w-full items-center justify-center rounded-[18px] px-5 py-3.5 text-[15px] font-black transition-all active:scale-[0.98]",
            selected 
              ? "bg-[#00a9ff] text-white shadow-lg shadow-[#00a9ff]/20 hover:bg-[#0092e0]" 
              : "bg-[#111827] text-white hover:bg-black"
          )}
        >
          {actionLabel}
        </button>
      ) : null}

      {selected && (
        <div className="absolute -top-3 -right-3 h-8 w-8 rounded-full bg-[#00a9ff] text-white flex items-center justify-center shadow-lg animate-in zoom-in-50 duration-300">
          <Icon name="check" className="h-5 w-5" />
        </div>
      )}
    </article>
  );
}
