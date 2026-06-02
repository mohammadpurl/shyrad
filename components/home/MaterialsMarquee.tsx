"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Package } from "lucide-react";
import { getMarqueeMaterials } from "@/lib/industries-data";
import { cn } from "@/lib/utils";

type CarouselItem = { title: string; href: string };

function MaterialCarouselLink({ item }: { item: CarouselItem }) {
  return (
    <Link
      href={item.href}
      className="group inline-flex shrink-0 items-center gap-3.5 whitespace-nowrap px-6 py-1 transition-colors hover:text-gold sm:gap-4 sm:px-8"
      dir="rtl"
    >
      <span className="flex size-9 items-center justify-center rounded-xl bg-white/10 transition-colors group-hover:bg-gold/20 sm:size-10">
        <Package className="size-4 text-gold sm:size-[18px]" aria-hidden />
      </span>
      <span className="text-base font-semibold text-white sm:text-lg">
        {item.title}
      </span>
      <span className="ms-2 size-2 shrink-0 rounded-full bg-gold/60" aria-hidden />
    </Link>
  );
}

export function MaterialsMarquee() {
  const items = useMemo(() => getMarqueeMaterials(), []);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [firstVisible, setFirstVisible] = useState(0);
  const [lastVisible, setLastVisible] = useState(0);
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(false);

  const updateVisibleRange = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const cards = Array.from(
      container.querySelectorAll<HTMLElement>("[data-carousel-item]")
    );

    let first = -1;
    let last = -1;

    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const visible =
        rect.right > containerRect.left + 2 &&
        rect.left < containerRect.right - 2;
      if (visible) {
        if (first === -1) first = index;
        last = index;
      }
    });

    if (first === -1) {
      setFirstVisible(0);
      setLastVisible(Math.max(0, items.length - 1));
      return;
    }

    setFirstVisible(first);
    setLastVisible(last);
  }, [items.length]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    updateVisibleRange();
    container.addEventListener("scroll", updateVisibleRange, { passive: true });
    window.addEventListener("resize", updateVisibleRange);

    const observer = new ResizeObserver(updateVisibleRange);
    observer.observe(container);

    return () => {
      container.removeEventListener("scroll", updateVisibleRange);
      window.removeEventListener("resize", updateVisibleRange);
      observer.disconnect();
    };
  }, [updateVisibleRange, items]);

  const canScrollPrev = firstVisible > 0;
  const canScrollNext = lastVisible < items.length - 1;

  const scrollToIndex = (index: number) => {
    const container = scrollRef.current;
    if (!container) return;

    const card = container.querySelectorAll<HTMLElement>("[data-carousel-item]")[
      index
    ];
    card?.scrollIntoView({
      behavior: "smooth",
      inline: "start",
      block: "nearest",
    });
  };

  const handleItemEnter = (index: number) => {
    setShowPrev(index === firstVisible && canScrollPrev);
    setShowNext(index === lastVisible && canScrollNext);
  };

  const handleSectionLeave = () => {
    setShowPrev(false);
    setShowNext(false);
  };

  return (
    <section
      className="relative w-full overflow-hidden border-y border-white/10 bg-navy py-6 sm:py-8"
      aria-label="مواد و عناصر تأمینی"
      onMouseLeave={handleSectionLeave}
    >
      <div className="pointer-events-none absolute inset-y-0 start-0 z-10 w-16 bg-gradient-to-l from-navy to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 end-0 z-10 w-16 bg-gradient-to-r from-navy to-transparent sm:w-24" />

      <button
        type="button"
        onClick={() => scrollToIndex(firstVisible - 1)}
        className={cn(
          "absolute start-3 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-navy/95 text-white shadow-lg backdrop-blur-sm transition-all duration-200 hover:border-gold hover:text-gold sm:start-5 sm:size-11",
          showPrev
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
        tabIndex={showPrev ? 0 : -1}
        aria-hidden={!showPrev}
        aria-label="ماده قبلی"
      >
        <ChevronRight className="size-5" aria-hidden />
      </button>

      <button
        type="button"
        onClick={() => scrollToIndex(lastVisible + 1)}
        className={cn(
          "absolute end-3 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-navy/95 text-white shadow-lg backdrop-blur-sm transition-all duration-200 hover:border-gold hover:text-gold sm:end-5 sm:size-11",
          showNext
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
        tabIndex={showNext ? 0 : -1}
        aria-hidden={!showNext}
        aria-label="ماده بعدی"
      >
        <ChevronLeft className="size-5" aria-hidden />
      </button>

      <div
        ref={scrollRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-0 overflow-x-auto scroll-smooth px-4 sm:px-6"
        dir="rtl"
        role="list"
      >
        {items.map((item, index) => (
          <div
            key={item.href}
            data-carousel-item
            role="listitem"
            className="shrink-0 snap-start"
            onMouseEnter={() => handleItemEnter(index)}
          >
            <MaterialCarouselLink item={item} />
          </div>
        ))}
      </div>
    </section>
  );
}
