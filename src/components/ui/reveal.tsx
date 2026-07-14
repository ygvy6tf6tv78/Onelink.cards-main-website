"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useSplashComplete } from "@/components/ui/splash-context";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 18,
}: RevealProps) {
  const splashComplete = useSplashComplete();

  return (
    <motion.div
      key={splashComplete ? "reveal-ready" : "reveal-waiting"}
      className={cn("relative z-10", className)}
      initial={{ opacity: 0, y, scale: 0.995, filter: "blur(4px)" }}
      whileInView={splashComplete ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } : { opacity: 0, y, scale: 0.995, filter: "blur(4px)" }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.68, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
