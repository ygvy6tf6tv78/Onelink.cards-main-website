"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSplashComplete } from "@/components/ui/splash-context";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  x?: number;
  y?: number;
  amount?: number;
  margin?: NonNullable<Parameters<typeof useInView>[1]>["margin"];
  alwaysShow?: boolean;
};

export function Reveal({
  children,
  className,
  delay = 0,
  x = 0,
  y = 18,
  amount = 0.16,
  margin = "0px 0px -6% 0px",
  alwaysShow = false,
}: RevealProps) {
  const splashComplete = useSplashComplete();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount, margin });
  const show = alwaysShow || (splashComplete && inView);

  return (
    <motion.div
      ref={ref}
      className={cn("relative z-10", className)}
      initial={{ opacity: 0, x, y, scale: 0.995, filter: "blur(4px)" }}
      animate={show
        ? { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }
        : { opacity: 0, x, y, scale: 0.995, filter: "blur(4px)" }}
      transition={{ duration: 0.68, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

type HeroEntranceProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  x?: number;
  y?: number;
};

export function HeroEntrance({ children, className, delay = 0, x = 0, y = 14 }: HeroEntranceProps) {
  const splashComplete = useSplashComplete();

  return (
    <motion.div
      className={cn("relative z-10", className)}
      initial={{ opacity: 0, x, y, scale: 0.992, filter: "blur(5px)" }}
      animate={splashComplete
        ? { opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }
        : { opacity: 0, x, y, scale: 0.992, filter: "blur(5px)" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
