"use client";

import { Icon } from "@/components/icons";
import { siteConfig } from "@/content/site";
import { motion } from "framer-motion";

export function FloatingWhatsApp() {
  const whatsappHref = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
    "Hello OneLink, I am interested in getting a link.",
  )}`;

  return (
    <motion.a
      href={whatsappHref}
      target="_blank"
      rel="noreferrer"
      animate={{ y: [0, -10, 0] }}
      transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
      className="group fixed bottom-6 right-6 z-[99] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_-6px_rgba(37,211,102,0.8)] transition-all duration-300 hover:scale-105 hover:bg-[#20bd5a] hover:shadow-[0_12px_36px_-6px_rgba(37,211,102,1)] sm:bottom-8 sm:right-8"
      aria-label="Chat with us on WhatsApp"
    >
      <Icon name="whatsapp" className="h-7 w-7 transition-transform duration-300 group-hover:scale-110" />
      <span className="absolute -top-1 -right-1 flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-white border-2 border-[#25D366]"></span>
      </span>
    </motion.a>
  );
}
