"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image, { type StaticImageData } from "next/image";
import burgerBazaarMockup from "../../onelink_mockups/hero-burger-bazaar.png";
import velouraSalonMockup from "../../onelink_mockups/hero-veloura-salon.png";
import vastukarMockup from "../../onelink_mockups/hero-vastukar.png";
import newVisionMockup from "../../onelink_mockups/hero-new-vision.png";
import { cn } from "@/lib/utils";

const slides: Array<{
  id: string;
  src: StaticImageData;
  alt: string;
  label: string;
}> = [
  { id: "burger-bazaar", src: burgerBazaarMockup, alt: "Burger Bazaar OneLink restaurant mobile mockup", label: "Burger Bazaar" },
  { id: "veloura-salon", src: velouraSalonMockup, alt: "Veloura Salon OneLink mobile mockup", label: "Veloura Salon" },
  { id: "vastukar", src: vastukarMockup, alt: "Vastukar Architects OneLink mobile mockup", label: "Vastukar Architects" },
  { id: "new-vision", src: newVisionMockup, alt: "New Vision Diagnostics OneLink mobile mockup", label: "New Vision Diagnostics" },
];

const customerQuestions = [
  { text: "How to book?", className: "left-0 top-[112px] sm:-left-3 sm:top-[138px]", delay: 0 },
  { text: "What services?", className: "right-0 top-[205px] sm:-right-4 sm:top-[235px]", delay: 0.9 },
  { text: "Where located?", className: "left-3 bottom-[74px] sm:left-2 sm:bottom-[92px]", delay: 1.8 },
];

export function HeroMockupShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 3600);
    return () => window.clearInterval(timer);
  }, []);

  const previousSlide = slides[(activeIndex - 1 + slides.length) % slides.length];
  const nextSlide = slides[(activeIndex + 1) % slides.length];

  return (
    <div className="relative mx-auto -mt-4 max-w-[610px] py-0 sm:-mt-5 sm:py-1 lg:-mt-1 lg:py-0 max-[639px]:pb-2">
      <div className="absolute inset-x-14 top-12 h-36 rounded-full bg-[rgba(0,169,255,0.1)] blur-3xl sm:top-20 sm:h-52" />
      <div className="absolute left-4 top-10 h-20 w-20 rounded-full bg-white/70 blur-2xl sm:left-10 sm:top-12 sm:h-28 sm:w-28" />

      <div className="relative flex flex-col items-stretch">
        <div className="relative flex min-h-[420px] justify-center pb-1 pt-4 sm:min-h-[520px] sm:items-center sm:pb-2 sm:pt-6 lg:min-h-[430px] lg:pb-2 lg:pt-7">
          <motion.div
            animate={{ y: [0, -5, 0], rotate: [-6, -5.2, -6] }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="absolute left-2 top-[88px] z-[2] hidden w-[150px] opacity-[0.48] xl:block"
            aria-hidden="true"
          >
            <Image src={previousSlide.src} alt="" sizes="296px" quality={85} loading="eager" className="h-auto w-full object-contain" />
          </motion.div>

          {customerQuestions.map((question) => (
            <motion.div
              key={question.text}
              animate={{ x: [0, 3, 0], y: [0, -4, 0] }}
              transition={{ duration: 12, delay: question.delay, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              className={cn(
                "pointer-events-none absolute z-20 hidden rounded-[11px] border border-slate-900/[0.07] bg-white/90 px-3 py-2 text-[11px] font-semibold text-[#263548] shadow-[0_16px_32px_-22px_rgba(0,126,191,0.36)] backdrop-blur-md sm:block lg:text-[12px]",
                question.className,
              )}
            >
              <span className="pointer-events-none absolute inset-0 -z-10 rounded-[14px] bg-[#00A9FF]/16 blur-xl" />
              <motion.span
                animate={{ x: [0, 7, 2, 0], y: [0, -5, 3, 0], rotate: [-8, 2, -3, -8] }}
                transition={{ duration: 6.2, delay: question.delay, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="absolute -bottom-3.5 -left-3.5 z-20 text-[#00A9FF] drop-shadow-[0_4px_8px_rgba(0,126,191,0.38)]"
              >
                <svg className="h-5 w-5" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 1.8 12.7 8l-4.1 1.1-2.1 4.1L3 1.8Z" fill="currentColor" stroke="white" strokeWidth="1" strokeLinejoin="round" />
                </svg>
              </motion.span>
              <span>{question.text}</span>
            </motion.div>
          ))}

          <motion.div
            animate={{ y: [0, -6, 0], rotate: [7, 6, 7] }}
            transition={{ duration: 9.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="absolute right-4 top-[68px] z-[2] hidden w-[162px] opacity-[0.5] lg:block"
            aria-hidden="true"
          >
            <Image src={nextSlide.src} alt="" sizes="308px" quality={85} loading="eager" className="h-auto w-full object-contain" />
          </motion.div>

          <div className="relative z-10 flex w-full justify-center">
            <div className="relative w-[216px] sm:w-[270px] lg:w-[296px]">
              <div className="relative aspect-[419/856] w-full overflow-visible rounded-[2.35rem] sm:rounded-[2.55rem]">
                {slides.map((slide, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <motion.div
                      key={slide.id}
                      className="absolute inset-0"
                      initial={false}
                      animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.985, y: isActive ? 0 : 8, zIndex: isActive ? 2 : 1 }}
                      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                      style={{ pointerEvents: isActive ? "auto" : "none" }}
                    >
                      <motion.div
                        animate={isActive ? { y: [0, -3, 0] } : { y: 0, rotate: 0 }}
                        transition={{ duration: 9, repeat: isActive ? Number.POSITIVE_INFINITY : 0, ease: "easeInOut" }}
                        className="relative h-full w-full"
                      >
                        <Image
                          src={slide.src}
                          alt={slide.alt}
                          fill
                          priority={index === 0}
                          loading="eager"
                          fetchPriority={index === 0 ? "high" : "low"}
                          quality={92}
                          sizes="(max-width: 640px) 432px, (max-width: 1024px) 540px, 592px"
                          className="origin-[center_top] object-contain object-top drop-shadow-[0_34px_74px_rgba(14,30,37,0.18)]"
                        />
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-20 mx-auto mt-1 flex w-fit items-center gap-1.5 rounded-full border border-slate-900/[0.08] bg-white/88 px-3 py-2 shadow-[0_12px_30px_-24px_rgba(15,23,42,0.34)] backdrop-blur">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={cn("rounded-full transition-all duration-300", index === activeIndex ? "h-1.5 w-5 bg-[#00A9FF]" : "h-1.5 w-1.5 bg-[#b8c5d1] hover:bg-[#7f93a5]")}
              aria-label={`Show ${slide.label}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
