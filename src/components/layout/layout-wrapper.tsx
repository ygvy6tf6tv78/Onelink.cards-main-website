"use client";

import { usePathname } from "next/navigation";
import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SplashLoader } from "@/components/ui/splash-loader";
import { FloatingWhatsApp } from "@/components/ui/floating-whatsapp";
import { SplashCompleteProvider } from "@/components/ui/splash-context";
import { Reveal } from "@/components/ui/reveal";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname();
  const [splashComplete, setSplashComplete] = useState(pathname !== "/");
  const handleSplashComplete = useCallback(() => setSplashComplete(true), []);
  
  // Hide main navbar and footer on booking, payment, and legal routes
  const isExcluded = 
    pathname?.startsWith("/book") || 
    pathname?.startsWith("/payment") || 
    pathname?.startsWith("/terms") || 
    pathname?.startsWith("/privacy") || 
    pathname?.startsWith("/refund") || 
    pathname?.startsWith("/shipping") ||
    pathname?.startsWith("/--12");

  if (isExcluded) {
    return (
      <>
        <AnimatePresence mode="wait" initial={false}>
          <motion.main key={pathname} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }} className="flex-grow">
            {children}
          </motion.main>
        </AnimatePresence>
      </>
    );
  }

  return (
    <SplashCompleteProvider value={splashComplete}>
      {pathname === "/" ? <SplashLoader onComplete={handleSplashComplete} /> : null}
      <Navbar />
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={pathname} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }} className="flex-grow">
          {children}
        </motion.div>
      </AnimatePresence>
      <Reveal y={14}><Footer /></Reveal>
      <FloatingWhatsApp />
    </SplashCompleteProvider>
  );
}
