"use client";

import Link from "next/link";
import { navItems, siteConfig } from "@/content/site";
import { BrandMark } from "@/components/ui/brand-mark";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const whatsappHref = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
    "Hello OneLink, I want to discuss OneLink for my business.",
  )}`;
  const callHref = `tel:+${siteConfig.contact.whatsappNumber}`;

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="fixed inset-x-0 top-4 z-[100] sm:top-6">
      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "mx-auto w-[calc(100%-24px)] max-w-[1200px] overflow-hidden border border-white/70 bg-white/92 shadow-[0_12px_34px_rgba(15,23,42,0.11)] backdrop-blur-2xl transition-[border-radius,background-color] duration-300 sm:w-[90%] lg:rounded-full lg:bg-white/76",
          isMenuOpen ? "rounded-[22px]" : "rounded-[18px] sm:rounded-[22px]",
        )}
      >
        <div className="grid min-h-[64px] grid-cols-[1fr_auto] items-center gap-3 px-5 py-2 sm:min-h-[72px] sm:px-6 lg:grid-cols-[minmax(180px,1fr)_auto_minmax(280px,1fr)] lg:gap-8">
          <Link href="/" className="group flex min-w-0 shrink-0 items-center gap-2.5 sm:gap-3">
            <BrandMark
              className="h-10 w-10 shrink-0 rounded-[14px] bg-[#f7fbff] transition-all group-hover:scale-105 sm:h-12 sm:w-12 sm:rounded-[16px]"
              imageClassName="w-[26px] sm:w-[31px]"
            />
            <div className="min-w-0">
              <p className="font-display whitespace-nowrap text-[1.15rem] font-extrabold tracking-[-0.045em] text-[#111827] sm:text-[1.35rem]">
                OneLink
              </p>
              <p className="hidden text-[11px] font-semibold uppercase tracking-[0.12em] text-[#9ca3af] lg:block">Smart Business Page</p>
            </div>
          </Link>

          <div className="hidden items-center justify-center lg:flex">
            <nav className="flex items-center gap-8 text-[14px] font-semibold text-[#111827] xl:gap-11 xl:text-[15px]">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative tracking-[-0.01em] transition after:absolute after:-bottom-2 after:left-0 after:h-0.5 after:w-full after:origin-right after:scale-x-0 after:rounded-full after:bg-[#00A9FF] after:transition hover:text-[var(--foreground)] hover:after:origin-left hover:after:scale-x-100"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex shrink-0 items-center justify-end gap-2">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              aria-label="Chat with OneLink on WhatsApp"
              className="flex h-11 w-11 items-center justify-center rounded-[14px] border border-black/8 bg-white text-[#25D366] shadow-[0_10px_24px_rgba(14,30,37,0.05)] transition hover:-translate-y-0.5 hover:border-[#25D366]/20 hover:bg-[#f6fff9] lg:h-10 lg:w-10"
            >
              <Icon name="whatsapp" className="h-5 w-5 lg:h-[18px] lg:w-[18px]" />
            </a>
            <Link
              href="/#pricing"
              className="hidden h-11 items-center gap-3 whitespace-nowrap rounded-full bg-[#00A9FF] py-1 pl-5 pr-1 text-[14px] font-semibold text-white shadow-[0_8px_20px_-6px_rgba(0,169,255,0.4)] transition hover:-translate-y-0.5 hover:bg-[#0089FF] lg:inline-flex"
            >
              <span>Get OneLink</span>
              <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-[#00A9FF]">
                <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3.5 8h9" />
                  <path d="M8.5 3l4.5 5-4.5 5" />
                </svg>
              </span>
            </Link>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="group flex h-11 w-11 items-center justify-center rounded-[14px] border border-black/8 bg-white text-[#151515] shadow-sm transition-all active:scale-95 lg:hidden"
              aria-label="Toggle Menu"
            >
              <div className="relative flex h-5 w-5 flex-col items-center justify-center">
                <span className={cn(
                  "absolute h-[2.5px] w-5 rounded-full bg-current transition-all duration-300 origin-center",
                  isMenuOpen ? "rotate-45" : "-translate-y-[6px]"
                )} />
                <span className={cn(
                  "absolute h-[2.5px] w-5 rounded-full bg-current transition-all duration-200",
                  isMenuOpen ? "opacity-0 scale-x-0" : "opacity-100"
                )} />
                <span className={cn(
                  "absolute h-[2.5px] w-5 rounded-full bg-current transition-all duration-300 origin-center",
                  isMenuOpen ? "-rotate-45" : "translate-y-[6px]"
                )} />
              </div>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0, y: -8 }}
              animate={{ height: 'auto', opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: -6 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="border-t border-black/[0.06] bg-white lg:hidden"
            >
              <nav className="flex flex-col gap-1 p-3">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-between rounded-[12px] px-4 py-3.5 text-[15px] font-semibold text-[#151515] transition-colors hover:bg-[#f3f9fd] active:bg-[#eaf5fb]"
                  >
                    <span>{item.label}</span>
                    <Icon name="chevron-right" className="h-4 w-4 text-[#9ca3af]" />
                  </Link>
                ))}
                <Link
                  href="/#pricing"
                  onClick={() => setIsMenuOpen(false)}
                  className="mt-2 flex min-h-12 items-center justify-center rounded-[12px] bg-[#00A9FF] px-4 py-3 text-[15px] font-semibold text-white shadow-[0_12px_28px_-12px_rgba(0,169,255,0.7)]"
                >
                  Get OneLink
                </Link>
                <div className="mt-2 border-t border-black/5 p-2 pt-4">
                  <p className="mb-3 text-[12px] font-bold uppercase tracking-widest text-[#9ca3af]">Talk to our team</p>
                  <div className="flex items-center gap-2">
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noreferrer"
                      className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-[12px] border border-black/6 bg-white px-3.5 py-3 shadow-sm"
                    >
                      <Icon name="whatsapp" className="h-5 w-5 text-[#25D366]" />
                      <span className="text-[14px] font-bold text-[#151515]">WhatsApp</span>
                    </a>
                    <a
                      href={callHref}
                      className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-[12px] border border-black/6 bg-white px-3.5 py-3 shadow-sm"
                    >
                      <Icon name="phone" className="h-5 w-5 text-[#111827]" />
                      <span className="text-[14px] font-bold text-[#151515]">Call Now</span>
                    </a>
                  </div>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
