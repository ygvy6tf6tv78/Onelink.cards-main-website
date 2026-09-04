"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@/components/icons";
import { siteConfig } from "@/content/site";

export function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappHref = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent("Hello OneLink, I want to discuss OneLink for my business.")}`;
  const callHref = `tel:${siteConfig.contact.phone.replace(/\s/g, "")}`;

  return (
    <div className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-[99] sm:bottom-7 sm:right-7">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-[72px] right-0 w-[238px] overflow-hidden rounded-[16px] border border-slate-900/[0.08] bg-white p-3 shadow-[0_22px_64px_-20px_rgba(15,23,42,0.32)]"
          >
            <p className="px-2 pb-2 pt-1 text-[12px] font-bold uppercase tracking-[0.08em] text-[#64748b]">Contact OneLink</p>
            <a href={whatsappHref} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-[11px] px-3 py-3 text-[14px] font-semibold text-[#0f172a] hover:bg-[#effcf4]">
              <span className="grid h-9 w-9 place-items-center rounded-[9px] bg-[#25D366]/12 text-[#168447]"><Icon name="whatsapp" className="h-5 w-5" /></span>
              WhatsApp
            </a>
            <a href={callHref} className="mt-1 flex items-center gap-3 rounded-[11px] px-3 py-3 text-[14px] font-semibold text-[#0f172a] hover:bg-[#eef8ff]">
              <span className="grid h-9 w-9 place-items-center rounded-[9px] bg-[#00A9FF]/10 text-[#087cbc]"><Icon name="phone" className="h-5 w-5" /></span>
              Call {siteConfig.contact.phone}
            </a>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.span
        aria-hidden="true"
        animate={isOpen ? { opacity: 0, scale: 1 } : { opacity: [0.24, 0, 0.24], scale: [1, 1.3, 1] }}
        transition={{ duration: 3.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-0 rounded-full border border-[#00A9FF]/45"
      />
      <motion.button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close contact options" : "Open contact options"}
        animate={isOpen ? { y: 0, rotate: 0 } : { y: [0, -4, 0], rotate: [0, 2, 0] }}
        whileHover={{ scale: 1.06, y: -3 }}
        whileTap={{ scale: 0.94 }}
        transition={{
          y: { duration: 3.2, repeat: isOpen ? 0 : Number.POSITIVE_INFINITY, ease: "easeInOut" },
          rotate: { duration: 3.2, repeat: isOpen ? 0 : Number.POSITIVE_INFINITY, ease: "easeInOut" },
          scale: { duration: 0.2, ease: "easeOut" },
        }}
        className="relative grid h-14 w-14 place-items-center rounded-full border-[3px] !border-white bg-[linear-gradient(145deg,#13b8ff_0%,#0097e7_58%,#007fc8_100%)] text-white shadow-[0_18px_42px_-13px_rgba(0,169,255,0.76),inset_0_1px_0_rgba(255,255,255,0.38),0_0_0_1px_rgba(0,126,191,0.18)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#00A9FF]/25"
      >
        <Icon name={isOpen ? "close" : "phone"} className="h-6 w-6" />
      </motion.button>
    </div>
  );
}
