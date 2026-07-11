import { cn } from "@/lib/utils";

type PaymentBrandStripProps = {
  className?: string;
  compact?: boolean;
  dark?: boolean;
};

export function PaymentBrandStrip({
  className,
  compact = false,
  dark = false,
}: PaymentBrandStripProps) {
  return (
    <div className={cn("flex flex-wrap gap-2.5", className)}>
      <BrandPill dark={dark} compact={compact}>
        <RazorpayMark compact={compact} dark={dark} />
      </BrandPill>
      <BrandPill dark={dark} compact={compact}>
        <UpiMark compact={compact} dark={dark} />
      </BrandPill>
      <BrandPill dark={dark} compact={compact}>
        <VisaMark compact={compact} dark={dark} />
      </BrandPill>
      <BrandPill dark={dark} compact={compact}>
        <MastercardMark compact={compact} dark={dark} />
      </BrandPill>
      <BrandPill dark={dark} compact={compact}>
        <RupayMark compact={compact} dark={dark} />
      </BrandPill>
      <BrandPill dark={dark} compact={compact}>
        <PaytmMark compact={compact} dark={dark} />
      </BrandPill>
      <TextPill label="Net Banking" dark={dark} compact={compact} />
      <TextPill label="EMI" dark={dark} compact={compact} accent />
    </div>
  );
}

function BrandPill({
  children,
  dark,
  compact,
}: {
  children: React.ReactNode;
  dark: boolean;
  compact: boolean;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-[14px] border px-3",
        compact ? "h-10" : "h-11",
        dark
          ? "border-white/10 bg-white/[0.04]"
          : "border-black/8 bg-white shadow-[0_10px_24px_rgba(14,30,37,0.05)]",
      )}
    >
      {children}
    </div>
  );
}

function TextPill({
  label,
  dark,
  compact,
  accent = false,
}: {
  label: string;
  dark: boolean;
  compact: boolean;
  accent?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[14px] border px-3 font-semibold uppercase tracking-[0.14em]",
        compact ? "h-10 text-[10px]" : "h-11 text-[11px]",
        accent && !dark && "border-[#ff8b34]/18 bg-[#fff4eb] text-[#dd6b20]",
        accent && dark && "border-[#ff8b34]/24 bg-[#ff8b34]/10 text-white",
        !accent && dark && "border-white/10 bg-white/[0.04] text-white/76",
        !accent &&
          !dark &&
          "border-black/8 bg-white text-[#334155] shadow-[0_10px_24px_rgba(14,30,37,0.05)]",
      )}
    >
      {label}
    </span>
  );
}

function RazorpayMark({ compact, dark }: { compact: boolean; dark: boolean }) {
  return (
    <svg viewBox="0 0 116 22" className={cn(compact ? "h-4.5 w-[78px]" : "h-5 w-[90px]")}>
      <g fill="none" fillRule="evenodd">
        <path d="M6.5 2L12 7.5 5 20H0L6.5 2Z" fill="#2B4BFF" />
        <path d="M14 2h5l-8.2 18h-5L14 2Z" fill="#072654" />
        <path
          d="M29 15.7V6h4.9c2.8 0 4.4 1.5 4.4 4 0 1.8-.8 3.1-2.2 3.7l2.5 4h-2.6l-2.2-3.6h-1.5v3.6H29Zm2.4-5.5h2.2c1.3 0 2-.7 2-1.8s-.7-1.7-2-1.7h-2.2v3.5Zm9.1 1c0-2.7 1.8-4.6 4.4-4.6 1.2 0 2.2.5 2.8 1.3v-1.1h2.2v8.9h-2.2v-1.1c-.6.8-1.6 1.3-2.8 1.3-2.6 0-4.4-1.9-4.4-4.7Zm7.2 0c0-1.6-1.1-2.8-2.6-2.8s-2.5 1.2-2.5 2.8 1 2.8 2.5 2.8 2.6-1.2 2.6-2.8Zm4.2 6.8.8-1.8c.4.3 1 .5 1.7.5 1 0 1.6-.5 2.1-1.7l.2-.4-3.8-8.8H55l2.7 6.4 2.6-6.4h2.4l-4 9.3c-.9 2.2-2.1 3.2-4.1 3.2-1 0-1.9-.2-2.7-.8Zm12.3-2.3V6h7v2h-4.6v1.8h4.1v2h-4.1v1.9h4.8v2h-7.2Zm8.6 0V6H73l4.5 5.8V6h2.4v9.7h-2.2l-4.6-6v6h-2.3Zm9.5 0V6h2.4v9.7h-2.4Zm4.2 0V6h2.4v7.7h4.5v2h-6.9Zm8 0V6H95v9.7h-2.4Zm4.1 0V6h3.9c3.3 0 5.5 1.9 5.5 4.8s-2.2 4.9-5.5 4.9h-3.9Zm2.4-2.1h1.4c2 0 3.2-1.1 3.2-2.8 0-1.6-1.2-2.7-3.2-2.7h-1.4v5.5Z"
          fill={dark ? "#FFFFFF" : "#1B2B41"}
          fillOpacity={dark ? 0.86 : 1}
        />
      </g>
    </svg>
  );
}

function UpiMark({ compact, dark }: { compact: boolean; dark: boolean }) {
  return (
    <svg viewBox="0 0 74 22" className={cn(compact ? "h-4 w-[50px]" : "h-[18px] w-[58px]")}>
      <text x="0" y="15" fontSize="15" fontWeight="700" fill={dark ? "#F8FAFC" : "#1F2937"} fontFamily="Manrope, sans-serif">
        U
      </text>
      <text x="13" y="15" fontSize="15" fontWeight="700" fill={dark ? "#F8FAFC" : "#1F2937"} fontFamily="Manrope, sans-serif">
        P
      </text>
      <text x="25" y="15" fontSize="15" fontWeight="700" fill={dark ? "#F8FAFC" : "#1F2937"} fontFamily="Manrope, sans-serif">
        I
      </text>
      <path d="M40 15l8-8" stroke="#FF7A00" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M46 7h7v7" stroke="#38B000" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function VisaMark({ compact, dark }: { compact: boolean; dark: boolean }) {
  return (
    <svg viewBox="0 0 72 22" className={cn(compact ? "h-4 w-[48px]" : "h-[18px] w-[54px]")}>
      <text
        x="1"
        y="16"
        fontSize="16"
        fontWeight="800"
        fill={dark ? "#FFFFFF" : "#1A1F71"}
        fillOpacity={dark ? 0.9 : 1}
        fontFamily="Manrope, sans-serif"
        fontStyle="italic"
      >
        VISA
      </text>
    </svg>
  );
}

function MastercardMark({ compact, dark }: { compact: boolean; dark: boolean }) {
  return (
    <svg viewBox="0 0 112 22" className={cn(compact ? "h-4.5 w-[78px]" : "h-[18px] w-[96px]")}>
      <circle cx="12" cy="11" r="7" fill="#EB001B" />
      <circle cx="19" cy="11" r="7" fill="#F79E1B" fillOpacity="0.95" />
      <path d="M15.5 5.1a7 7 0 0 0 0 11.8 7 7 0 0 0 0-11.8Z" fill="#FF5F00" />
      <text
        x="33"
        y="14.5"
        fontSize="9.8"
        fontWeight="700"
        fill={dark ? "#FFFFFF" : "#111827"}
        fillOpacity={dark ? 0.86 : 1}
        fontFamily="Manrope, sans-serif"
      >
        Mastercard
      </text>
    </svg>
  );
}

function RupayMark({ compact, dark }: { compact: boolean; dark: boolean }) {
  return (
    <svg viewBox="0 0 88 22" className={cn(compact ? "h-4.5 w-[58px]" : "h-[18px] w-[70px]")}>
      <defs>
        <linearGradient id="rupay-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1B3FA5" />
          <stop offset="52%" stopColor="#1B8CFF" />
          <stop offset="100%" stopColor="#0AA06E" />
        </linearGradient>
      </defs>
      <text x="1" y="15.5" fontSize="15" fontWeight="800" fill={dark ? "#FFFFFF" : "url(#rupay-gradient)"} fontFamily="Manrope, sans-serif" fontStyle="italic">
        RuPay
      </text>
    </svg>
  );
}

function PaytmMark({ compact, dark }: { compact: boolean; dark: boolean }) {
  return (
    <svg viewBox="0 0 90 22" className={cn(compact ? "h-4.5 w-[60px]" : "h-[18px] w-[72px]")}>
      <text
        x="1"
        y="15.5"
        fontSize="15"
        fontWeight="800"
        fill={dark ? "#FFFFFF" : "#1B2733"}
        fillOpacity={dark ? 0.9 : 1}
        fontFamily="Manrope, sans-serif"
      >
        Pay
      </text>
      <text
        x="28"
        y="15.5"
        fontSize="15"
        fontWeight="800"
        fill="#00BAF2"
        fontFamily="Manrope, sans-serif"
      >
        tm
      </text>
    </svg>
  );
}
