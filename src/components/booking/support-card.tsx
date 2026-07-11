import { cn } from "@/lib/utils";

type SupportCardProps = {
  eyebrow: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
};

export function SupportCard({
  eyebrow,
  title,
  children,
  className,
}: SupportCardProps) {
  return (
    <section
      className={cn(
        "rounded-[28px] border border-black/8 bg-white/96 p-5 shadow-[0_18px_44px_rgba(14,30,37,0.05)] sm:p-6",
        className,
      )}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#0b7ec8]">
        {eyebrow}
      </p>
      {title ? (
        <h2 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-[#151515]">
          {title}
        </h2>
      ) : null}
      <div className={cn(title ? "mt-4" : "mt-3")}>{children}</div>
    </section>
  );
}
