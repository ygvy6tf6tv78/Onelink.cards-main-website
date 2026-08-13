"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wordmark } from "@/components/ui/brand-mark";

export function SplashLoader({ onComplete }: { onComplete?: () => void }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = "unset";
      window.setTimeout(() => onComplete?.(), 80);
    }, 3500);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = "unset";
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-white"
        >
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00A9FF]/[0.075] blur-[90px]" />
          <div className="relative flex flex-col items-center px-6">
            <div className="relative flex flex-col items-center justify-center">
              <div className="relative h-[52px] w-[220px] sm:h-[62px] sm:w-[260px]">
                <Wordmark priority className="absolute inset-0 !h-full !w-full" />
              </div>
              <div className="mt-7 h-[3px] w-[170px] overflow-hidden rounded-full bg-[#e7f5fc] sm:w-[200px]">
                <motion.div
                  className="h-full w-full origin-left rounded-full bg-[linear-gradient(90deg,#087cbc_0%,#00A9FF_60%,#55c5ff_100%)] shadow-[0_0_12px_rgba(0,169,255,0.3)]"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 3.25, ease: [0.33, 1, 0.68, 1] }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
