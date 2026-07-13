"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "What is OneLink?",
    answer: "OneLink is a customized digital experience that brings your business information and key customer actions into one shareable link."
  },
  {
    question: "Is every OneLink customized?",
    answer: "Yes. Every OneLink is designed around your brand, content, services and preferred customer journey."
  },
  {
    question: "How long does setup take?",
    answer: "Most OneLinks are ready for review within 3–7 working days after we receive your content and requirements."
  },
  {
    question: "Can I update it later?",
    answer: "Yes. You can request updates, and selected plans include tools for managing content directly."
  },
  {
    question: "Can it support multiple branches?",
    answer: "Yes. Multi-location setups are available for growing businesses and Enterprise requirements."
  },
  {
    question: "Are there any hidden charges?",
    answer: "No. Setup, hosting and applicable GST are shown clearly before payment or confirmed in your proposal."
  }
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faqs" className="relative scroll-mt-28 overflow-hidden bg-[#f5f9fc] px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-18">
      <div className="pointer-events-none absolute -right-28 top-0 h-80 w-80 rounded-full bg-[#00A9FF]/8 blur-3xl" />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-9 lg:grid-cols-[0.72fr_1.28fr] lg:items-start lg:gap-14">
        <div className="text-left lg:sticky lg:top-28">
          <p className="eyebrow">
            FAQs
          </p>
          <h2 className="font-display type-section-title mt-4 max-w-[17ch] text-[#0f172a]">
            Clear answers before you start.
          </h2>
          <p className="mt-4 max-w-sm text-[15px] font-normal leading-[1.7] text-[#64748b] sm:text-[16px]">
            The essentials, explained simply.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className={cn(
                  "relative overflow-hidden rounded-[15px] border transition-all duration-300",
                  isOpen ? "border-[#00A9FF]/25 bg-white shadow-[0_18px_48px_-38px_rgba(0,128,190,0.28)]" : "border-slate-900/[0.08] bg-white hover:-translate-y-0.5 hover:border-[#00A9FF]/20"
                )}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                >
                  <span className={cn(
                    "text-[17px] font-semibold leading-[1.35] tracking-[-0.02em] transition-colors sm:text-[18px]",
                    isOpen ? "text-[#0f172a]" : "text-[#334155]"
                  )}>
                    {faq.question}
                  </span>
                  <div className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                    isOpen ? "rotate-180 bg-[#00A9FF] text-white" : "bg-[#eaf3f8] text-[#64748b]"
                  )}>
                    <Icon name="chevron-right" className="h-4 w-4 rotate-90" />
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="max-w-[65ch] px-5 pb-5 pt-0 text-[14px] font-normal leading-[1.7] text-[#64748b] sm:px-6 sm:text-[15px]">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
