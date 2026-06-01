"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { HERO_STATS } from "@/lib/constants";

function HeroStatItem({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const step = value / (duration / 16);

    const timer = setInterval(() => {
      start += step;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div
      ref={ref}
      className="flex min-w-0 flex-1 flex-col items-center rounded-2xl border border-white/70 bg-white/90 px-3 py-4 text-center shadow-[0_4px_24px_rgba(4,27,64,0.15)] backdrop-blur-xl sm:rounded-3xl sm:px-5 sm:py-5 lg:px-6 lg:py-6"
    >
      <p
        className="text-xl font-bold text-navy sm:text-2xl lg:text-3xl"
        aria-live="polite"
      >
        {count.toLocaleString("fa-IR")}
        {suffix}
      </p>
      <p className="mt-1.5 text-[11px] font-semibold leading-snug text-navy/85 sm:text-xs lg:text-sm">
        {label}
      </p>
    </div>
  );
}

export function HeroStatsBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-x-0 bottom-6 z-20 sm:bottom-8 lg:bottom-12"
      aria-label="آمار و دستاوردها"
    >
      <div className="section-container">
        <div className="relative mx-auto max-w-4xl">
          <div
            className="pointer-events-none absolute -inset-x-4 -bottom-4 -top-8 rounded-3xl bg-gradient-to-t from-navy-dark/50 via-navy-dark/20 to-transparent sm:-inset-x-8"
            aria-hidden
          />

          <div className="relative flex gap-3 sm:gap-5 lg:gap-6">
            {HERO_STATS.map((stat) => (
              <HeroStatItem
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
