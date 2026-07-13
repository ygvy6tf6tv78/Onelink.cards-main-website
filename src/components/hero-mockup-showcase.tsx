"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image, { type StaticImageData } from "next/image";
import sonnetCafeMockup from "../../onelink_mockups/sonnet-cafe-original.png";
import hotelMetropolisMockup from "../../onelink_mockups/hotel-metropolis-original.png";
import dograAssociatesMockup from "../../onelink_mockups/dogra-associates.png";
import newVisionMockup from "../../onelink_mockups/new-vision-diagnostics.png";
import { cn } from "@/lib/utils";
import { BrandMark } from "@/components/ui/brand-mark";

const slides: Array<{
  id: string;
  src: StaticImageData;
  alt: string;
  label: string;
  description: string;
}> = [
  {
    id: "sonnet-cafe",
    src: sonnetCafeMockup,
    alt: "OneLink cafe mobile mockup",
    label: "Cafe page",
    description: "Orders, menu, payments, reviews.",
  },
  {
    id: "hotel-metropolis",
    src: hotelMetropolisMockup,
    alt: "OneLink hotel mobile mockup",
    label: "Hotel page",
    description: "Room booking, calls, gallery, reviews.",
  },
  {
    id: "dogra-associates",
    src: dograAssociatesMockup,
    alt: "OneLink professional services mobile mockup",
    label: "Professional page",
    description: "Services, payments, email, bookings.",
  },
  {
    id: "new-vision",
    src: newVisionMockup,
    alt: "OneLink diagnostics business mobile mockup",
    label: "Clinic page",
    description: "Appointments, packages, reports, support.",
  },
];

export function HeroMockupShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 4800);

    return () => window.clearInterval(timer);
  }, [isPaused]);

  const previousSlide = slides[(activeIndex - 1 + slides.length) % slides.length];
  const nextSlide = slides[(activeIndex + 1) % slides.length];

  return (
    <div
      className="relative mx-auto max-w-[610px] -mt-4 py-0 sm:-mt-5 sm:py-1 lg:-mt-1 lg:py-0 max-[639px]:pb-2"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute inset-x-14 top-12 h-36 rounded-full bg-[rgba(0,169,255,0.12)] blur-3xl sm:top-20 sm:h-52" />
      <div className="absolute left-4 top-10 h-20 w-20 rounded-full bg-white/70 blur-2xl sm:left-10 sm:top-12 sm:h-28 sm:w-28" />

      <div className="relative flex flex-col items-stretch">
        <div className="relative flex min-h-[420px] justify-center pt-4 pb-1 sm:min-h-[520px] sm:items-center sm:pt-6 sm:pb-2 lg:min-h-[430px] lg:pt-7 lg:pb-2">
          <motion.div
            animate={{ y: [0, -8, 0], rotate: [-7, -5.5, -7] }}
            transition={{ duration: 8.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="absolute left-2 top-[88px] z-0 hidden w-[142px] opacity-[0.24] blur-[0.8px] xl:block"
            aria-hidden="true"
          >
            <Image src={previousSlide.src} alt="" sizes="296px" quality={85} className="h-auto w-full object-contain" />
          </motion.div>

          <motion.div
            animate={{ y: [0, -10, 0], rotate: [8, 6.2, 8] }}
            transition={{ duration: 7.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="absolute right-4 top-[68px] z-0 hidden w-[154px] opacity-[0.26] blur-[0.8px] lg:block"
            aria-hidden="true"
          >
            <Image src={nextSlide.src} alt="" sizes="308px" quality={85} className="h-auto w-full object-contain" />
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
                      animate={{
                        opacity: isActive ? 1 : 0,
                        zIndex: isActive ? 2 : 1,
                      }}
                      transition={{
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      style={{ pointerEvents: isActive ? "auto" : "none" }}
                    >
                      <motion.div
                        animate={
                          isActive
                            ? { y: [0, -4, 0], rotate: [0, 0.25, 0] }
                            : { y: 0, rotate: 0 }
                        }
                        transition={{
                          duration: 7.4,
                          repeat: isActive ? Number.POSITIVE_INFINITY : 0,
                          ease: "easeInOut",
                        }}
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

        <div className="relative z-20 mx-auto mt-2.5 w-full max-w-[408px] rounded-[24px] border border-white/20 bg-[#00A9FF] px-4 py-3.5 text-white shadow-[0_20px_50px_-16px_rgba(0,169,255,0.5)] sm:mt-3 sm:px-5 sm:py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <BrandMark className="h-9 w-9 shrink-0 rounded-[12px] border-white/20 bg-white shadow-none" imageClassName="w-[20px]" alt="" />
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/70">
                  One smart page
                </p>
                <p className="mt-0.5 text-[13px] font-bold leading-tight tracking-tight text-white sm:text-[14px]">
                  Everything, inside OneLink.
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-1.5">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "rounded-full transition-all duration-300",
                    index === activeIndex
                      ? "h-2 w-5 bg-white"
                      : "h-2 w-2 bg-white/35 hover:bg-white/60",
                  )}
                  aria-label={`Show ${slide.label}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
