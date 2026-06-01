"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { INDUSTRIES } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IndustryCard } from "@/components/ui/IndustryCard";
import { MotionWrapper } from "@/components/ui/MotionWrapper";
import { cn } from "@/lib/utils";

export function IndustriesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveIndex = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const containerRect = el.getBoundingClientRect();
    const containerCenter = containerRect.left + containerRect.width / 2;
    const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-carousel-item]"));

    let closest = 0;
    let minDistance = Infinity;

    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const distance = Math.abs(containerCenter - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closest = index;
      }
    });

    setActiveIndex(closest);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateActiveIndex();
    el.addEventListener("scroll", updateActiveIndex, { passive: true });
    return () => el.removeEventListener("scroll", updateActiveIndex);
  }, [updateActiveIndex]);

  const scrollToIndex = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;

    const card = el.querySelectorAll<HTMLElement>("[data-carousel-item]")[index];
    card?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  return (
    <section className="py-20 lg:py-28" aria-labelledby="industries-heading">
      <div className="section-container">
        <MotionWrapper>
          <SectionHeading
            label="صنایع"
            title="راهکارهای تخصصی برای صنایع مختلف"
            description="مواد اولیه با کیفیت برای هر صنعت، با پشتیبانی فنی و تأمین پایدار"
          />
        </MotionWrapper>

        {/* Mobile & tablet: carousel */}
        <div className="lg:hidden">
          <div className="relative -mx-4 sm:-mx-6">
            <div
              ref={scrollRef}
              className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-2 pt-1 sm:gap-5 sm:px-6"
              role="list"
              aria-label="اسلایدر صنایع"
            >
              {INDUSTRIES.map((industry, index) => (
                <div key={industry.slug} data-carousel-item className="shrink-0">
                  <IndustryCard
                    title={industry.title}
                    image={industry.image}
                    href={`/industries/${industry.slug}`}
                    index={index}
                    variant="carousel"
                  />
                </div>
              ))}
            </div>

            <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-background to-transparent sm:w-12" />
            <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-background to-transparent sm:w-12" />
          </div>

          <div className="mt-5 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
              className="flex size-9 items-center justify-center rounded-full border border-navy/10 bg-white text-navy shadow-sm transition-colors hover:border-gold hover:text-gold disabled:opacity-40"
              disabled={activeIndex === 0}
              aria-label="صنعت قبلی"
            >
              <ChevronRight className="size-4" />
            </button>

            <div className="flex items-center gap-1.5" role="tablist" aria-label="صفحات اسلایدر">
              {INDUSTRIES.map((industry, index) => (
                <button
                  key={industry.slug}
                  type="button"
                  role="tab"
                  aria-selected={index === activeIndex}
                  aria-label={`${industry.title}${index === activeIndex ? " — فعال" : ""}`}
                  onClick={() => scrollToIndex(index)}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    index === activeIndex
                      ? "w-6 bg-gold"
                      : "w-2 bg-navy/20 hover:bg-navy/35"
                  )}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() =>
                scrollToIndex(Math.min(INDUSTRIES.length - 1, activeIndex + 1))
              }
              className="flex size-9 items-center justify-center rounded-full border border-navy/10 bg-white text-navy shadow-sm transition-colors hover:border-gold hover:text-gold disabled:opacity-40"
              disabled={activeIndex === INDUSTRIES.length - 1}
              aria-label="صنعت بعدی"
            >
              <ChevronLeft className="size-4" />
            </button>
          </div>
        </div>

        {/* Desktop: wide grid */}
        <div
          className="hidden grid-cols-2 gap-6 lg:grid xl:grid-cols-3 xl:gap-8"
          role="list"
        >
          {INDUSTRIES.map((industry, index) => (
            <IndustryCard
              key={industry.slug}
              title={industry.title}
              image={industry.image}
              href={`/industries/${industry.slug}`}
              index={index}
              variant="grid"
            />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/industries"
            className="text-sm font-bold text-navy transition-colors hover:text-gold"
          >
            مشاهده همه صنایع ←
          </Link>
        </div>
      </div>
    </section>
  );
}
