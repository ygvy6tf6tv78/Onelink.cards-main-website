"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wordmark } from "@/components/ui/brand-mark";

export function SplashLoader({
  onComplete,
  onFinished,
}: {
  onComplete?: () => void;
  onFinished?: () => void;
}) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const revealTimer = window.setTimeout(() => onComplete?.(), 900);
    const closeTimer = window.setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = "unset";
    }, 1100);

    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(closeTimer);
      document.body.style.overflow = "unset";
    };
  }, [onComplete]);

  return (
    <AnimatePresence onExitComplete={onFinished}>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[9999] grid min-h-[100dvh] place-items-center overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_100%)]"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1.06 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00A9FF]/[0.09] blur-[90px]"
          />
          <div className="relative flex w-full items-center justify-center px-6 py-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 10, filter: "blur(5px)" }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.98, y: -8, filter: "blur(2px)" }}
              transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex items-center justify-center"
            >
              <div className="relative h-[52px] w-[220px] sm:h-[62px] sm:w-[260px]">
                <Wordmark priority className="absolute inset-0 !h-full !w-full" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
