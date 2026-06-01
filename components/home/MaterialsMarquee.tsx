"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Package } from "lucide-react";
import { getMarqueeMaterials } from "@/lib/industries-data";

type MarqueeItemData = { title: string; href: string };

const SCROLL_SPEED = 65;

function MarqueeStrip({
  items,
  stripRef,
  duplicate = false,
}: {
  items: MarqueeItemData[];
  stripRef?: React.RefObject<HTMLDivElement | null>;
  duplicate?: boolean;
}) {
  return (
    <div
      ref={stripRef}
      className="flex shrink-0 items-center"
      aria-hidden={duplicate}
    >
      {items.map((item, index) => (
        <Link
          key={`${duplicate ? "d" : "s"}-${item.href}-${index}`}
          href={item.href}
          tabIndex={duplicate ? -1 : undefined}
          aria-hidden={duplicate ? true : undefined}
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
      ))}
    </div>
  );
}

export function MaterialsMarquee() {
  const baseItems = useMemo(() => getMarqueeMaterials(), []);
  const unitRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const [stripItems, setStripItems] = useState<MarqueeItemData[]>(() =>
    Array.from({ length: 3 }, () => baseItems).flat()
  );
  const [stripWidth, setStripWidth] = useState(0);

  useEffect(() => {
    const recalcItems = () => {
      const unit = unitRef.current?.offsetWidth ?? 0;
      if (!unit) return;
      const repeats = Math.max(2, Math.ceil((window.innerWidth * 1.4) / unit));
      setStripItems(Array.from({ length: repeats }, () => baseItems).flat());
    };

    recalcItems();
    window.addEventListener("resize", recalcItems);
    return () => window.removeEventListener("resize", recalcItems);
  }, [baseItems]);

  useEffect(() => {
    const measure = () => {
      const width = stripRef.current?.offsetWidth ?? 0;
      if (width > 0) setStripWidth(width);
    };

    measure();
    const observer = new ResizeObserver(measure);
    if (stripRef.current) observer.observe(stripRef.current);
    return () => observer.disconnect();
  }, [stripItems]);

  const duration = stripWidth > 0 ? stripWidth / SCROLL_SPEED : 40;

  return (
    <section
      className="relative w-full overflow-hidden border-y border-white/10 bg-navy py-6 sm:py-8"
      aria-label="مواد و عناصر تأمینی"
    >
      <div className="pointer-events-none absolute inset-y-0 start-0 z-10 w-20 bg-gradient-to-l from-navy to-transparent sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 end-0 z-10 w-20 bg-gradient-to-r from-navy to-transparent sm:w-28" />

      <div
        ref={unitRef}
        className="pointer-events-none absolute flex opacity-0"
        aria-hidden
        dir="ltr"
      >
        <MarqueeStrip items={baseItems} />
      </div>

      <div className="relative w-full overflow-hidden">
        <div
          className="flex w-max will-change-transform"
          dir="ltr"
          style={
            stripWidth > 0
              ? {
                  animation: `marquee-scroll ${duration}s linear infinite`,
                  ["--marquee-shift" as string]: `${stripWidth}px`,
                }
              : undefined
          }
        >
          <MarqueeStrip items={stripItems} stripRef={stripRef} />
          <MarqueeStrip items={stripItems} duplicate />
        </div>
      </div>
    </section>
  );
}
