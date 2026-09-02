"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { SectionBadge } from "@/components/ui/section-badge";
import burgerBazaarMockup from "../../../onelink_mockups/hero-burger-bazaar.png";
import vastukarMockup from "../../../onelink_mockups/hero-vastukar.png";

const trustStats = [
  { value: 24, suffix: "+", label: "OneLinks made" },
  { value: 15, suffix: "+", label: "Business categories" },
  { value: 50, suffix: "+", label: "Customer actions enabled" },
];

export function ClientLogoStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftMockupRef = useRef<HTMLDivElement>(null);
  const rightMockupRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.35 });

  useEffect(() => {
    let frame = 0;
    const updateMockups = () => {
      frame = 0;
      const section = sectionRef.current;
      if (!section) return;
      const offset = Math.max(-180, Math.min(180, section.getBoundingClientRect().top - window.innerHeight * 0.5));
      if (leftMockupRef.current) leftMockupRef.current.style.transform = `translate3d(0, ${offset * -0.16}px, 0) rotate(13deg)`;
      if (rightMockupRef.current) rightMockupRef.current.style.transform = `translate3d(0, ${offset * 0.12}px, 0) rotate(-13deg)`;
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateMockups);
    };
    updateMockups();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative overflow-x-clip overflow-y-visible bg-transparent px-4 pb-8 pt-12 sm:px-6 sm:pb-10 sm:pt-14 lg:px-8 lg:pb-12 lg:pt-16" aria-labelledby="client-trust-title">
      <div ref={leftMockupRef} className="pointer-events-none absolute -left-[65px] top-7 hidden w-[142px] origin-center opacity-[0.22] will-change-transform lg:block">
        <Image src={burgerBazaarMockup} alt="" className="h-auto w-full object-contain drop-shadow-[0_26px_48px_rgba(5,48,83,0.18)]" sizes="142px" aria-hidden="true" />
      </div>
      <div ref={rightMockupRef} className="pointer-events-none absolute -right-[68px] top-14 hidden w-[142px] origin-center opacity-[0.2] will-change-transform lg:block">
        <Image src={vastukarMockup} alt="" className="h-auto w-full object-contain drop-shadow-[0_26px_48px_rgba(5,48,83,0.18)]" sizes="142px" aria-hidden="true" />
      </div>
      <Reveal>
        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="space-y-9 sm:px-2">
            <div className="text-center">
              <SectionBadge label="Trust" />
              <h2 id="client-trust-title" className="section-title-gradient font-display mt-4 text-[2rem] font-bold tracking-[-0.04em] sm:text-[2.45rem] lg:text-[2.75rem]">
                Trusted by growing businesses
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-[14px] font-medium leading-relaxed text-[#607286] sm:text-[15px]">
                Choose the right OneLink for your business.
              </p>
            </div>
            <dl className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-3 sm:gap-0">
              {trustStats.map((stat, index) => (
                <div key={stat.label} className={index > 0 ? "text-center sm:border-l sm:border-slate-900/[0.09] sm:px-5" : "text-center sm:px-5"}>
                  <dt className="font-display text-[3rem] font-extrabold tracking-[-0.055em] text-[#00A9FF] sm:text-[3.45rem] lg:text-[3.7rem]">
                    <CountUp value={stat.value} play={isInView} />{stat.suffix}
                  </dt>
                  <dd className="mt-1.5 text-[11px] font-semibold uppercase leading-snug tracking-[0.08em] text-[#526173] sm:text-[12px]">{stat.label}</dd>
                </div>
              ))}
            </dl>
          </div>

        </div>
      </Reveal>
    </section>
  );
}

function CountUp({ value, play }: { value: number; play: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!play) return;
    const start = performance.now();
    const duration = 900;
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(value * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [play, value]);

  return count;
}
