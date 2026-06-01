"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { SITE } from "@/lib/constants";
import { Button } from "@/components/ui/Button";

export function HeroSection() {
  return (
    <section
      className="relative min-h-[92vh] overflow-hidden lg:min-h-screen"
      aria-labelledby="hero-heading"
    >
      <Image
        src="/images/Hero2.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-left"
      />

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-l from-navy-dark/92 via-navy-dark/50 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-dark/60 via-transparent to-navy-dark/20 lg:hidden"
        aria-hidden
      />

      <div className="section-container relative grid min-h-[92vh] items-center py-28 lg:min-h-screen lg:grid-cols-2 lg:py-32">
        {/* RTL: first column = right half — text block */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full max-w-xl text-start lg:max-w-none lg:justify-self-start"
        >
          <span className="mb-4 inline-block text-sm font-bold tracking-wide text-gold">
            {SITE.name}
          </span>

          <h1
            id="hero-heading"
            className="text-3xl font-bold leading-[1.35] text-white sm:text-4xl lg:text-[2.75rem] lg:leading-tight xl:text-5xl"
          >
            تأمین مطمئن مواد اولیه
            <br className="hidden sm:block" />
            {" "}برای صنایع پیشرو
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-white/75 lg:text-lg">
            {SITE.description}
          </p>

          <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row">
            <Button href="/contact" variant="gold" className="sm:min-w-[160px]">
              استعلام قیمت
            </Button>
            <Button
              href="/contact#consultation"
              variant="outline"
              className="sm:min-w-[160px]"
            >
              مشاوره تخصصی
            </Button>
          </div>

          <a
            href={`tel:${SITE.phone.replace(/-/g, "")}`}
            className="mt-8 inline-flex items-center gap-2 text-white/85 transition-colors hover:text-gold"
            aria-label={`تماس: ${SITE.phoneDisplay}`}
          >
            <span className="flex size-9 items-center justify-center rounded-full border border-white/15 bg-white/10 backdrop-blur-sm">
              <Phone className="size-4 text-gold" aria-hidden />
            </span>
            <span dir="ltr" className="text-base font-semibold tracking-wide">
              {SITE.phoneDisplay}
            </span>
          </a>
        </motion.div>

        {/* Left half — keeps image visible */}
        <div className="hidden lg:block" aria-hidden />
      </div>
    </section>
  );
}
