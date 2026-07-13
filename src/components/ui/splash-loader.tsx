"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wordmark } from "@/components/ui/brand-mark";

export function SplashLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // Only run on client
    const hasPlayed = sessionStorage.getItem("splashPlayed");
    if (hasPlayed) {
      setIsVisible(false);
      return;
    }
    
    setShouldRender(true);
    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem("splashPlayed", "true");
      document.body.style.overflow = "unset";
    }, 1250);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = "unset";
    };
  }, []);

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
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
        >
          <div className="relative flex flex-col items-center px-6">
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00A9FF]/8 blur-3xl" />
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative flex flex-col items-center justify-center gap-6"
            >
              <Wordmark className="h-9 sm:h-10" />
              <div className="h-[2px] w-24 overflow-hidden rounded-full bg-[#dcebf4]">
                <motion.div
                  className="h-full bg-[#00A9FF]"
                  initial={{ width: "0%", x: "-100%" }}
                  animate={{ width: ["0%", "50%", "100%"], x: ["-100%", "0%", "0%"] }}
                  transition={{
                    duration: 1.05,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </motion.div>          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
