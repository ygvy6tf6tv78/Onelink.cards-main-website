"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wordmark } from "@/components/ui/brand-mark";

export function SplashLoader({ onComplete }: { onComplete?: () => void }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isFlying, setIsFlying] = useState(false);
  const [navOffset, setNavOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const calculateTarget = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const navbarWidth = Math.min(viewportWidth - 24, 1200);
      const navbarLeft = (viewportWidth - navbarWidth) / 2;
      const logoCenterX = navbarLeft + (viewportWidth >= 640 ? 86 : 69);
      const logoCenterY = viewportWidth >= 640 ? 49 : 42;
      setNavOffset({ x: logoCenterX - viewportWidth / 2, y: logoCenterY - viewportHeight / 2 });
    };

    calculateTarget();
    window.addEventListener("resize", calculateTarget);
    const flyTimer = window.setTimeout(() => setIsFlying(true), 1480);
    const revealTimer = window.setTimeout(() => onComplete?.(), 2450);
    const closeTimer = window.setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = "unset";
    }, 2540);

    return () => {
      window.clearTimeout(flyTimer);
      window.clearTimeout(revealTimer);
      window.clearTimeout(closeTimer);
      window.removeEventListener("resize", calculateTarget);
      document.body.style.overflow = "unset";
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.34, ease: [0.22, 1, 0.36, 1] } }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-white"
        >
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00A9FF]/[0.075] blur-[90px]" />
          <div className="relative flex flex-col items-center px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.86, y: 10 }}
              animate={isFlying
                ? { opacity: 1, scale: 0.48, x: navOffset.x, y: navOffset.y }
                : { opacity: 1, scale: 1, x: 0, y: 0 }}
              transition={isFlying
                ? { duration: 0.96, ease: [0.16, 1, 0.3, 1] }
                : { duration: 0.92, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col items-center justify-center"
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
