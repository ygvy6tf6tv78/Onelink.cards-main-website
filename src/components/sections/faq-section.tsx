"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "What exactly is OneLink?",
    answer: "OneLink is a professionally designed smart business page that brings your calls, WhatsApp, location, reviews, payments, services, bookings and order actions together in one shareable link."
  },
  {
    question: "How long does setup take?",
    answer: "Most OneLinks are ready for review within 3–7 working days after we receive the required content and business details. Custom software projects may take longer."
  },
  {
    question: "Can I use my own domain?",
    answer: "Yes. Custom domain connection is available with selected plans or as an add-on."
  },
  {
    question: "What does the platform fee cover?",
    answer: "The platform fee covers secure hosting, software access, maintenance, technical support and continued platform updates for the selected period."
  },
  {
    question: "Can I update my details later?",
    answer: "Yes. Minor updates can be requested through support. Elite and Enterprise plans can include dashboards for managing content, prices, bookings, orders or availability directly."
  },
  {
    question: "Can I pay monthly?",
    answer: "OneLink platform plans are currently prepaid for 3, 6 or 12 months. This helps us provide stable hosting, support and uninterrupted service."
  },
  {
    question: "What is the relaunch bonus?",
    answer: "When you purchase a new setup, you receive one additional month complimentary. Pay for 3, 6 or 12 months and receive 4, 7 or 13 months of access."
  }
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faqs" className="relative overflow-hidden px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-start lg:gap-14">
        <div className="text-left lg:sticky lg:top-28">
          <p className="mb-4 text-[12px] font-bold uppercase tracking-[0.25em] text-[#00A9FF]">
            Common Questions
          </p>
          <h2 className="font-display max-w-[11ch] text-[2.25rem] font-bold leading-[1.05] tracking-tight text-[#151515] sm:text-[3rem]">
            Clear answers before you start.
          </h2>
          <p className="mt-5 max-w-sm text-[15px] font-medium leading-relaxed text-[#6B7280]">
            Everything you need to know about the professional OneLink experience.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className={cn(
                  "rounded-[20px] border transition-all duration-300",
                  isOpen ? "bg-white border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)]" : "border-transparent hover:bg-gray-50/80"
                )}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
                >
                  <span className={cn(
                    "text-[15px] font-bold tracking-tight transition-colors sm:text-[17px]",
                    isOpen ? "text-[#111821]" : "text-[#334155]"
                  )}>
                    {faq.question}
                  </span>
                  <div className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                    isOpen ? "bg-[#111821] text-white rotate-180" : "bg-[#f1f5f9] text-[#94a3b8]"
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
                      <div className="max-w-[65ch] px-5 pb-6 pt-0 text-[13px] font-medium leading-relaxed text-[#64748B] sm:px-6 sm:text-[15px]">
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
