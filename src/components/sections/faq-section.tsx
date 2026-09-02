"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SectionBadge } from "@/components/ui/section-badge";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/content/site";

const faqs = [
  { question: "What exactly is OneLink?", answer: "OneLink is a custom digital business page that brings your services, products, information and important customer actions into one shareable link and QR code." },
  { question: "Is OneLink the same as Linktree?", answer: "No. OneLink is designed around your business, brand and customer journey rather than acting as a simple list of links." },
  { question: "Why do I need OneLink if I already have Instagram or a website?", answer: "OneLink gives customers one focused place to find key information and take action quickly, while working alongside your website and social profiles." },
  { question: "Can customers book or order through OneLink?", answer: "Yes. Depending on your plan and setup, OneLink can support booking, enquiry, ordering and other guided customer actions." },
  { question: "What does the hosting and maintenance fee cover?", answer: "It covers continued hosting, technical maintenance and the ongoing availability of your OneLink experience." },
  { question: "Can I update the content later?", answer: "Yes. Content updates can be handled through the support and management options included with your selected plan." },
  { question: "How long does setup take?", answer: "Most OneLinks are ready for review within 3–7 working days after we receive the required content and details." },
] as const;

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const whatsappHref = `https://wa.me/${siteConfig.contact.whatsappNumber}`;

  return (
    <section id="faqs" className="section-shell scroll-mt-28 bg-transparent px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-18">
      <div className="mx-auto max-w-6xl">
        <Reveal y={12}>
          <div className="mx-auto max-w-3xl text-center">
            <SectionBadge label="FAQs" />
            <h2 className="font-display mx-auto mt-4 text-[34px] font-bold leading-[1.06] text-[#111827] sm:text-[43px] lg:text-[50px]">Everything you need to know.</h2>
            <p className="mx-auto mt-4 max-w-[58ch] text-[14px] font-medium leading-[1.7] text-[#7d8794] sm:text-[16px]">Clear answers about setup, customer actions, support and launching your OneLink.</p>
          </div>
        </Reveal>

        <Reveal delay={0.08} y={14}>
          <div className="mt-10 overflow-hidden rounded-[26px] border border-[#d9e7f0] bg-white/78 px-4 shadow-[0_28px_70px_-50px_rgba(15,68,105,0.4)] backdrop-blur-sm sm:px-7">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div key={faq.question} className="border-b border-[#dce7ee] last:border-b-0">
                  <button onClick={() => setOpenIndex(isOpen ? null : index)} className="flex w-full items-center justify-between gap-6 py-5 text-left sm:py-6" aria-expanded={isOpen}>
                    <span className={cn("font-display text-[17px] font-bold leading-[1.35] transition-colors sm:text-[20px]", isOpen ? "text-[#111827]" : "text-[#263548]")}>{faq.question}</span>
                    <span className={cn("relative grid h-10 w-10 shrink-0 place-items-center rounded-[13px] bg-[linear-gradient(145deg,#07518d,#12a7ed)] text-white shadow-[0_12px_26px_-16px_rgba(0,100,170,0.72)] transition sm:h-11 sm:w-11", isOpen && "rotate-180")} aria-hidden="true">
                      <span className="absolute h-[2px] w-4 rounded-full bg-current" />
                      <span className={cn("absolute h-4 w-[2px] rounded-full bg-current transition", isOpen && "scale-y-0")} />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                        <p className="max-w-[72ch] pb-6 pr-14 text-[14px] font-medium leading-[1.75] text-[#7d8794] sm:text-[16px]">{faq.answer}</p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>

        <p className="mt-8 text-center text-[13px] font-semibold text-[#637083]">Still have a question? <a href={whatsappHref} target="_blank" rel="noreferrer" className="font-extrabold text-[#087cbc] underline decoration-[#00A9FF]/35 underline-offset-4">Chat with our team</a></p>
      </div>
    </section>
  );
}
