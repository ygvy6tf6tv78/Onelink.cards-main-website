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
        src="/Group 1000008682.png"
        alt={alt}
        width={30}
        height={35}
        className={cn("h-auto w-[28px]", imageClassName)}
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

  const imageFilter =
    tone === "business"
      ? "grayscale(1) brightness(0.82) contrast(1.14)"
      : tone === "signature"
        ? "sepia(1) saturate(2.6) hue-rotate(344deg) brightness(0.96) contrast(1.02)"
        : "none";

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
        src="/component-13.svg"
        alt=""
        width={24}
        height={28}
        className={cn("h-auto w-[22px]", imageClassName)}
        style={{ filter: imageFilter }}
      />
    </div>
  );
}

export function Wordmark({
  className,
  alt = "OneLink",
}: WordmarkProps) {
  return (
    <Image
      src="/Group%201000008683.png"
      alt={alt}
      width={220}
      height={64}
      className={cn("h-9 w-auto object-contain", className)}
    />
  );
}
