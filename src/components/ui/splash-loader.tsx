"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wordmark } from "@/components/ui/brand-mark";

export function SplashLoader({ onComplete }: { onComplete?: () => void }) {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const hasPlayed = sessionStorage.getItem("splashPlayed");
    if (hasPlayed) {
      const readyFrame = window.requestAnimationFrame(() => onComplete?.());
      return () => window.cancelAnimationFrame(readyFrame);
    }

    let timer: number | undefined;
    const frame = window.requestAnimationFrame(() => {
      setShouldRender(true);
      document.body.style.overflow = "hidden";
      timer = window.setTimeout(() => {
        setIsVisible(false);
        sessionStorage.setItem("splashPlayed", "true");
        document.body.style.overflow = "unset";
        window.setTimeout(() => onComplete?.(), 180);
      }, 1250);
    });

    return () => {
      window.cancelAnimationFrame(frame);
      if (timer) window.clearTimeout(timer);
      document.body.style.overflow = "unset";
    };
  }, [onComplete]);

  if (!shouldRender) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[linear-gradient(145deg,#087cbc_0%,#00A9FF_48%,#0677b6_100%)]"
        >
          <div className="pointer-events-none absolute -left-24 -top-28 h-80 w-80 rounded-full bg-white/14 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-[#04182f]/18 blur-3xl" />
          <div className="relative flex flex-col items-center px-6">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/18 blur-3xl" />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative flex flex-col items-center justify-center"
            >
              <div className="relative h-[52px] w-[220px] sm:h-[62px] sm:w-[260px]">
                <Wordmark className="absolute inset-0 !h-full !w-full brightness-0 invert opacity-20" />
                <motion.div
                  className="absolute inset-x-0 bottom-0 overflow-hidden"
                  initial={{ height: "0%" }}
                  animate={{ height: "100%" }}
                  transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Wordmark className="absolute inset-x-0 bottom-0 !h-[52px] !w-[220px] brightness-0 invert sm:!h-[62px] sm:!w-[260px]" />
                </motion.div>
              </div>
            </motion.div>          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
