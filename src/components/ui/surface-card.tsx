import { cn } from "@/lib/utils";

type SurfaceCardProps = {
  children: React.ReactNode;
  className?: string;
  tone?: "soft" | "strong";
};

export function SurfaceCard({
  children,
  className,
  tone = "soft",
}: SurfaceCardProps) {
  return (
    <div
      className={cn(
        "rounded-[30px]",
        tone === "soft" ? "surface-card" : "surface-card-strong",
        className,
      )}
    >
      {children}
    </div>
  );
}
