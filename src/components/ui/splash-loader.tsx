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
    }, 1800);

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
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col items-center justify-center gap-6"
            >
              <Wordmark className="h-11 sm:h-12" />
              
              <div className="h-[3px] w-32 overflow-hidden rounded-full bg-gray-100">
                <motion.div
                  className="h-full bg-[#00A9FF]"
                  initial={{ width: "0%", x: "-100%" }}
                  animate={{ width: ["0%", "50%", "100%"], x: ["-100%", "0%", "0%"] }}
                  transition={{
                    duration: 1.5,
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
