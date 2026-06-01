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
    <div ref={ref} className="flex flex-col items-center px-4 py-5 text-center sm:px-6 sm:py-6">
      <p
        className="text-2xl font-bold text-navy sm:text-3xl lg:text-4xl"
        aria-live="polite"
      >
        {count.toLocaleString("fa-IR")}
        {suffix}
      </p>
      <p className="mt-1 text-xs font-medium text-navy/75 sm:text-sm">{label}</p>
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
        <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-white/40 bg-white/20 shadow-[0_8px_32px_rgba(4,27,64,0.12)] backdrop-blur-md sm:rounded-3xl">
          <div className="grid grid-cols-3 divide-x divide-white/30">
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
