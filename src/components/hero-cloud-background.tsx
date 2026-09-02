"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef } from "react";

const cloudLayers = [
  {
    src: "/hero-clouds/cloud-left.jpeg",
    className: "-left-[10%] top-[5%] w-[46%] opacity-35 mix-blend-screen sm:-left-[6%] sm:w-[36%]",
    speed: 0.08,
  },
  {
    src: "/hero-clouds/cloud-right.jpeg",
    className: "-right-[12%] top-[2%] w-[47%] opacity-32 mix-blend-screen sm:-right-[7%] sm:w-[36%]",
    speed: 0.12,
  },
  {
    src: "/hero-clouds/cloud-center.jpeg",
    className: "right-[7%] top-[19%] w-[42%] opacity-20 mix-blend-screen sm:right-[18%] sm:w-[29%]",
    speed: 0.16,
  },
  {
    src: "/hero-clouds/cloud-bottom.jpeg",
    className: "-bottom-[8%] left-0 h-[54%] w-full object-cover object-bottom opacity-88 mix-blend-screen [mask-image:linear-gradient(to_bottom,transparent_0%,black_30%)]",
    speed: 0.06,
  },
] as const;

export function HeroCloudBackground() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const updateParallax = () => {
      frame = 0;
      const rect = root.getBoundingClientRect();
      const progress = Math.max(0, Math.min(window.innerHeight + root.offsetHeight, -rect.top));

      root.querySelectorAll<HTMLElement>("[data-cloud-speed]").forEach((layer) => {
        const speed = Number(layer.dataset.cloudSpeed ?? 0);
        layer.style.transform = `translate3d(0, ${-(progress * speed)}px, 0)`;
      });
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateParallax);
    };

    updateParallax();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={rootRef} className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      <img src="/hero-clouds/sky-background.jpeg" alt="" className="absolute inset-0 h-full w-full object-cover object-center opacity-100" />
      {cloudLayers.map((cloud) => (
        <img
          key={cloud.src}
          src={cloud.src}
          alt=""
          data-cloud-speed={cloud.speed}
          className={`absolute will-change-transform ${cloud.className}`}
        />
      ))}
      <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-b from-transparent via-white/72 to-white sm:via-[#edf6ff]/72 sm:to-[#edf6ff]" />
    </div>
  );
}
