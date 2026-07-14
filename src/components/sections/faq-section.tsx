"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/utils";
import { SectionBadge } from "@/components/ui/section-badge";
import { Reveal } from "@/components/ui/reveal";
import Image from "next/image";
import { siteConfig } from "@/content/site";
import { Wordmark } from "@/components/ui/brand-mark";

const faqs = [
  {
    question: "What exactly is OneLink?",
    answer: "OneLink is a custom digital business page that brings your services, products, information and important customer actions into one shareable link and QR code."
  },
  {
    question: "Is OneLink the same as Linktree?",
    answer: "No. OneLink is designed around your business, brand and customer journey rather than acting as a simple list of links."
  },
  {
    question: "Why do I need OneLink if I already have Instagram or a website?",
    answer: "OneLink gives customers one focused place to find key information and take action quickly, while working alongside your website and social profiles."
  },
  {
    question: "Can customers book or order through OneLink?",
    answer: "Yes. Depending on your plan and setup, OneLink can support booking, enquiry, ordering and other guided customer actions."
  },
  {
    question: "What does the hosting and maintenance fee cover?",
    answer: "It covers continued hosting, technical maintenance and the ongoing availability of your OneLink experience."
  },
  {
    question: "Can I update the content later?",
    answer: "Yes. Content updates can be handled through the support and management options included with your selected plan."
  },
  {
    question: "How long does setup take?",
    answer: "Most OneLinks are ready for review within 3–7 working days after we receive the required content and details."
  }
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const whatsappHref = `https://wa.me/${siteConfig.contact.whatsappNumber}`;

  return (
    <section id="faqs" className="section-shell scroll-mt-28 bg-[#f7fafc] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-9 lg:grid-cols-[0.72fr_1.28fr] lg:gap-14">
        <Reveal x={-28} y={14}>
          <div className="lg:sticky lg:top-28">
            <SectionBadge label="FAQs" />
            <h2 className="section-title-gradient font-display type-section-title mt-4 max-w-xl">
              Clear answers before you start.
            </h2>
            <p className="type-section-copy mt-4 max-w-lg text-[#64748b]">
              Everything you need to know about setup, customer actions and launching your OneLink.
            </p>

            <div className="relative mt-7 overflow-hidden rounded-[22px] border border-[#d8ebf6] bg-white p-5 shadow-[0_24px_58px_-46px_rgba(15,23,42,0.38)] sm:p-6">
              <Wordmark alt="" className="pointer-events-none absolute -bottom-2 -right-5 !h-auto !w-[190px] opacity-[0.035]" />
              <div className="relative">
                <span className="grid h-10 w-10 place-items-center rounded-[12px] bg-[#eaf8ff] text-[#00A9FF]">
                  <Icon name="whatsapp" className="h-4.5 w-4.5" />
                </span>
                <h3 className="mt-4 text-[19px] font-bold tracking-[-0.025em] text-[#0f172a]">Still have a question?</h3>
                <p className="mt-2 max-w-[34ch] text-[14px] font-medium leading-[1.65] text-[#64748b]">Speak directly with our team and find the right setup for your business.</p>
                <a href={whatsappHref} target="_blank" rel="noreferrer" className="mt-5 inline-flex min-h-10 items-center rounded-[11px] bg-[#25D366] px-4 text-[13px] font-bold text-white shadow-[0_16px_30px_-20px_rgba(37,211,102,0.75)] transition hover:-translate-y-0.5 hover:bg-[#20bd5a]">
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08} x={28} y={14} className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className={cn(
                  "relative overflow-hidden rounded-[18px] border bg-white transition-all duration-300",
                  isOpen ? "border-[#b8dff3] shadow-[0_24px_52px_-42px_rgba(0,128,190,0.48)]" : "border-[#e2ebf1] hover:translate-x-1 hover:border-[#b9def1] hover:shadow-[0_18px_44px_-40px_rgba(15,23,42,0.32)]"
                )}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
                >
                  <span className={cn(
                    "text-[16px] font-[650] leading-[1.4] tracking-[-0.018em] transition-colors sm:text-[17px]",
                    isOpen ? "text-[#0f172a]" : "text-[#334155]"
                  )}>
                    {faq.question}
                  </span>
                  <div className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                    isOpen ? "rotate-180 bg-[#00A9FF] text-white shadow-[0_10px_20px_-12px_rgba(0,169,255,0.8)]" : "bg-[#eff7fb] text-[#64748b]"
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
                      transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-0 sm:px-6">
                        <p className="max-w-[65ch] text-[14px] font-normal leading-[1.72] text-[#64748b] sm:text-[15px]">{faq.answer}</p>
                        <div className="mt-4 flex items-center gap-2 border-t border-[#e8f0f5] pt-4 text-[11px] font-bold uppercase tracking-[0.09em] text-[#00A9FF]">
                          <Image src="/component-13.svg" alt="" width={14} height={16} className="h-3.5 w-auto" aria-hidden="true" />
                          Answered by OneLink Team
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
