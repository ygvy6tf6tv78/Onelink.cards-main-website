"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Reveal } from "@/components/ui/reveal";
import { SectionBadge } from "@/components/ui/section-badge";

const trustStats = [
  { value: 25, suffix: "+", label: "Businesses onboarded" },
  { value: 15, suffix: "+", label: "Business categories" },
  { value: 15, suffix: "+", label: "Customer actions" },
];

export function ClientLogoStrip() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.35 });

  return (
    <section ref={sectionRef} className="bg-white px-4 py-12 sm:px-6 sm:py-14 lg:px-8" aria-labelledby="client-trust-title">
      <Reveal>
        <div className="mx-auto max-w-7xl">
          <div className="space-y-9 sm:px-2">
            <div className="text-center">
              <SectionBadge label="Trust" />
              <h2 id="client-trust-title" className="section-title-gradient font-display mt-4 text-[1.35rem] font-bold tracking-[-0.035em] sm:text-[1.55rem]">
                Trusted by growing businesses
              </h2>
            </div>
            <dl className="mx-auto grid max-w-4xl gap-5 sm:grid-cols-3 sm:gap-0">
              {trustStats.map((stat, index) => (
                <div key={stat.label} className={index > 0 ? "text-center sm:border-l sm:border-slate-900/[0.09] sm:px-5" : "text-center sm:px-5"}>
                  <dt className="font-display text-[2.15rem] font-bold tracking-[-0.05em] text-[#00A9FF] sm:text-[2.55rem]">
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
