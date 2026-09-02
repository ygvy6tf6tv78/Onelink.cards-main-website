"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSplashComplete } from "@/components/ui/splash-context";

const blueStripText =
  "Smart Business Presence    ✦    Direct WhatsApp    ✦    Easy Payments    ✦    Better Reviews    ✦    Smart Bookings    ✦    Custom QR Assets    ✦    Multi-Location Ready    ✦    ".repeat(4);
const blackStripText =
  "Smart Business Presence    ✦    Direct WhatsApp    ✦    Easy Payments    ✦    Better Reviews    ✦    Smart Bookings    ✦    Custom QR Assets    ✦    Multi-Location Ready    ✦    ".repeat(4);

export function ActionStrip() {
  const splashComplete = useSplashComplete();
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 32) setHasScrolled(true);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const show = splashComplete && hasScrolled;

  return (
    <section className="relative h-[184px] overflow-x-clip overflow-y-visible bg-transparent sm:h-[208px]" aria-label="OneLink categories">
      <motion.div
        className="absolute left-[-12vw] top-3 h-[164px] w-[124vw] sm:top-5"
        initial={{ opacity: 0, y: 24, scale: 0.99, filter: "blur(5px)" }}
        animate={show ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" } : { opacity: 0, y: 24, scale: 0.99, filter: "blur(5px)" }}
        transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute top-[54px] w-full rotate-[-5deg] overflow-hidden bg-[#08111c] py-3.5 text-white shadow-[0_18px_42px_-30px_rgba(15,23,42,0.7)] sm:top-[62px] sm:py-4">
          <div className="one-marquee-right flex w-max whitespace-pre text-[16px] font-semibold leading-[1.25] tracking-[0.02em] sm:text-[20px]">
            <span className="pr-9">{blackStripText}</span>
            <span className="pr-9">{blackStripText}</span>
          </div>
        </div>
        <div className="absolute top-[54px] w-full rotate-[5deg] overflow-hidden bg-[#00A9FF] py-3.5 text-white shadow-[0_18px_42px_-30px_rgba(0,169,255,0.62)] sm:top-[62px] sm:py-4">
          <div className="one-marquee-left flex w-max items-center whitespace-pre text-[16px] font-semibold leading-[1.25] tracking-[0.02em] sm:text-[20px]">
            <span className="pr-9">{blueStripText}</span>
            <span className="pr-9">{blueStripText}</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
