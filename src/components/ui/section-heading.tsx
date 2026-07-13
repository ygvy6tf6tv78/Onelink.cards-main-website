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
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="font-display type-section-title mt-4 text-[var(--foreground)] sm:mt-5">
        {title}
      </h2>
      <p className="type-section-copy text-muted mt-5 max-w-2xl text-neutral-500 sm:mt-6">
        {description}
      </p>
    </div>
  );
}
