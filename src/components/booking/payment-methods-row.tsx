import { PaymentBrandStrip } from "@/components/ui/payment-brand-strip";

type PaymentMethodsRowProps = {
  compact?: boolean;
  className?: string;
};

export function PaymentMethodsRow({
  compact = false,
  className,
}: PaymentMethodsRowProps) {
  return <PaymentBrandStrip compact={compact} className={className} />;
}
