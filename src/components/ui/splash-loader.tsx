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
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const startedAt = window.performance.now();
    let animationFrame = 0;

    const updateProgress = (now: number) => {
      const elapsed = now - startedAt;
      const nextProgress = Math.min(100, Math.round((elapsed / 1500) * 100));
      setProgress(nextProgress);
      if (nextProgress < 100) animationFrame = window.requestAnimationFrame(updateProgress);
    };

    animationFrame = window.requestAnimationFrame(updateProgress);
    const revealTimer = window.setTimeout(() => onComplete?.(), 1500);
    const closeTimer = window.setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = "unset";
    }, 1700);

    return () => {
      window.cancelAnimationFrame(animationFrame);
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
          exit={{ opacity: 0, transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f7fbff_100%)]"
        >
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00A9FF]/[0.09] blur-[90px]" />
          <div className="relative flex flex-col items-center px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 8, filter: "blur(5px)" }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex items-center justify-center"
            >
              <div className="relative h-[52px] w-[220px] sm:h-[62px] sm:w-[260px]">
                <Wordmark priority className="absolute inset-0 !h-full !w-full" />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-col items-center"
            >
              <div className="flex items-end text-[#09223E] [font-family:'Courier_New',monospace] [font-variant-numeric:tabular-nums]">
                <span className="min-w-[4ch] text-right text-[34px] font-bold leading-none tracking-[-0.12em] sm:text-[40px]">
                  {String(progress).padStart(3, "0")}
                </span>
                <span className="mb-0.5 ml-1 text-[13px] font-bold text-[#00A9FF]">%</span>
              </div>
              <div className="mt-4 flex gap-1" aria-hidden="true">
                {Array.from({ length: 10 }, (_, index) => (
                  <span
                    key={index}
                    className={`h-1.5 w-3 rounded-[2px] transition-colors duration-150 ${progress >= (index + 1) * 10 ? "bg-[#00A9FF]" : "bg-[#d8e7f2]"}`}
                  />
                ))}
              </div>
              <span className="mt-3 text-[9px] font-extrabold uppercase tracking-[0.28em] text-[#7d91a5]">Loading</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
