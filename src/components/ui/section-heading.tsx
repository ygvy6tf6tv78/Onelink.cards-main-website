import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "relative z-10 max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent-strong)] opacity-85">{eyebrow}</span>
      <h2 className="font-display mt-4 text-[2rem] font-bold tracking-[-0.04em] text-[var(--foreground)] sm:mt-5 sm:text-[2.6rem] lg:text-[3.2rem] leading-[1.1]">
        {title}
      </h2>
      <p className="text-muted mt-5 max-w-2xl text-[15px] font-medium leading-[1.7] sm:mt-6 sm:text-[17px] text-neutral-500">
        {description}
      </p>
    </div>
  );
}
