import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
  imageClassName?: string;
  alt?: string;
};

type PricingBrandMarkProps = {
  className?: string;
  imageClassName?: string;
  tone?: "essential" | "business" | "signature";
};

type WordmarkProps = {
  className?: string;
  alt?: string;
  priority?: boolean;
};

export function BrandMark({
  className,
  imageClassName,
  alt = "OneLink",
}: BrandMarkProps) {
  return (
    <div
      className={cn(
        "relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-[14px] border border-black/8 bg-white shadow-[0_10px_24px_rgba(14,30,37,0.06)]",
        className,
      )}
    >
      <Image
        src="/onelink-logomark.png"
        alt={alt}
        width={3492}
        height={4652}
        className={cn("h-[30px] w-auto object-contain", imageClassName)}
      />
    </div>
  );
}

export function PricingBrandMark({
  className,
  imageClassName,
  tone = "essential",
}: PricingBrandMarkProps) {
  const toneClassName =
    tone === "business"
      ? "border-[#d7e0e8] bg-[linear-gradient(180deg,#fbfcfd_0%,#eef2f5_100%)] shadow-[0_16px_30px_-20px_rgba(102,116,133,0.28)]"
      : tone === "signature"
        ? "border-[#ead7ad] bg-[linear-gradient(180deg,#fffaf0_0%,#f8edd3_100%)] shadow-[0_16px_30px_-22px_rgba(171,125,36,0.28)]"
        : "border-[#dce9f5] bg-[linear-gradient(180deg,#fbfdff_0%,#f4f8fc_100%)] shadow-[0_14px_28px_-22px_rgba(15,23,42,0.16)]";

  return (
    <div
      className={cn(
        "relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-[14px] border",
        toneClassName,
        className,
      )}
      aria-hidden="true"
    >
      <Image
        src="/onelink-logomark.png"
        alt=""
        width={3492}
        height={4652}
        className={cn("h-[27px] w-auto object-contain", imageClassName)}
      />
    </div>
  );
}

export function Wordmark({
  className,
  alt = "OneLink",
  priority = false,
}: WordmarkProps) {
  return (
    <Image
      src="/onelink-primary-logo.png"
      alt={alt}
      width={10895}
      height={2720}
      priority={priority}
      className={cn("h-9 w-auto object-contain", className)}
    />
  );
}
