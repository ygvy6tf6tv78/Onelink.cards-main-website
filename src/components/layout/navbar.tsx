"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems, siteConfig } from "@/content/site";
import { Wordmark } from "@/components/ui/brand-mark";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-3 z-[100] sm:top-4">
      <motion.div
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "mx-auto w-[calc(100%-24px)] max-w-[1200px] overflow-hidden border border-white/70 bg-white/94 shadow-[0_12px_34px_rgba(15,23,42,0.11)] backdrop-blur-2xl transition-[border-radius,background-color] duration-300 sm:w-[90%] lg:rounded-full lg:bg-white/82",
          isMenuOpen ? "rounded-[22px]" : "rounded-[18px] sm:rounded-[22px]",
        )}
      >
        <div className="grid min-h-[60px] grid-cols-[1fr_auto] items-center gap-3 px-4 py-2 sm:min-h-[66px] sm:px-6 lg:grid-cols-[minmax(180px,1fr)_auto_minmax(280px,1fr)] lg:gap-8">
          <Link href="/" aria-label="OneLink home" className="group flex min-w-0 shrink-0 flex-col items-start justify-center">
            <Wordmark priority className="!h-auto !w-[106px] transition-transform duration-300 group-hover:scale-[1.025] sm:!w-[124px]" />
            <span className="mt-0.5 pl-[2px] text-[7px] font-extrabold uppercase leading-none tracking-[0.18em] text-[#718096] sm:text-[8px]">
              Smart Business Pages
            </span>
          </Link>

          <div className="hidden items-center justify-center lg:flex">
            <nav className="flex items-center gap-8 text-[13px] font-semibold text-[#263548] xl:gap-11 xl:text-[14px]">
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
              className="flex h-10 w-10 items-center justify-center gap-2 rounded-[12px] border border-black/8 bg-white text-[#25D366] shadow-[0_10px_24px_rgba(14,30,37,0.05)] transition hover:-translate-y-0.5 hover:border-[#25D366]/20 hover:bg-[#f6fff9] lg:w-auto lg:px-3"
            >
              <Icon name="whatsapp" className="h-5 w-5 lg:h-[18px] lg:w-[18px]" />
              <span className="hidden text-[13px] font-semibold text-[#111827] lg:inline">WhatsApp</span>
            </a>
            <Link
              href="/#pricing"
              className="hidden h-11 items-center gap-3 whitespace-nowrap rounded-full bg-[linear-gradient(135deg,#09223E_0%,#064083_50%,#0077FF_100%)] py-1 pl-5 pr-1 text-[14px] font-semibold text-white shadow-[0_10px_24px_-8px_rgba(0,80,170,0.48)] transition hover:-translate-y-0.5 hover:brightness-110 lg:inline-flex"
            >
              <span>Get OneLink</span>
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-[#00A9FF]">
                <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3.5 8h9" />
                  <path d="M8.5 3l4.5 5-4.5 5" />
                </svg>
              </span>
            </Link>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="group flex h-10 w-10 items-center justify-center rounded-[12px] border border-black/8 bg-white text-[#151515] shadow-sm transition-all active:scale-95 lg:hidden"
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
      {pathname !== "/pricing" ? (
        <Link
          href="/#pricing"
          aria-label="View Limited Independence Day Offer pricing"
          className={cn(
            "mx-auto mt-2 flex h-7 w-[calc(100%-48px)] max-w-[760px] items-center overflow-hidden rounded-full border border-white/80 bg-[linear-gradient(90deg,#ff9933_0%,#fff7e8_48%,#ffffff_52%,#eaf8ea_64%,#138808_100%)] text-[#09223E] shadow-[0_12px_28px_-18px_rgba(9,34,62,0.52)] transition-all duration-300 sm:h-8",
            isScrolled && "pointer-events-none -translate-y-2 opacity-0",
          )}
        >
          <span className="one-marquee-left special-pricing-marquee flex w-max items-center whitespace-nowrap text-[8px] font-extrabold uppercase tracking-[0.13em] sm:text-[9px]">
            {[0, 1, 2, 3].map((item) => (
              <span key={item} className="inline-flex items-center gap-3 pr-8">
                <span className="h-1.5 w-1.5 rounded-full bg-[#09223E] shadow-[0_0_8px_rgba(9,34,62,0.28)]" />
                Limited Independence Day Offer
              </span>
            ))}
          </span>
        </Link>
      ) : null}
    </header>
  );
}
