"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Globe } from "lucide-react";

type AnimatedCounterProps = {
  value: number;
  suffix?: string;
  label: string;
  isText?: boolean;
};

export function AnimatedCounter({
  value,
  suffix = "",
  label,
  isText,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView || isText) return;

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
  }, [isInView, value, isText]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center text-center"
    >
      <div className="mb-4 flex size-14 items-center justify-center rounded-2xl border border-navy/10 bg-white card-shadow">
        {isText ? (
          <Globe className="size-7 text-navy" aria-hidden />
        ) : (
          <span className="text-lg font-bold text-gold" aria-hidden>
            #
          </span>
        )}
      </div>
      <p className="text-3xl font-bold text-navy sm:text-4xl" aria-live="polite">
        {isText ? (
          <span className="text-xl sm:text-2xl">بین‌المللی</span>
        ) : (
          <>
            {count.toLocaleString("fa-IR")}
            {suffix}
          </>
        )}
      </p>
      <p className="mt-2 text-sm text-muted">{label}</p>
    </motion.div>
  );
}
