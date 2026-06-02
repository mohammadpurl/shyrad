"use client";

import { useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { Package } from "lucide-react";
import { getMarqueeMaterials } from "@/lib/industries-data";

type MarqueeItem = { title: string; href: string };

const PIXELS_PER_SECOND = 55;
const SEGMENT_REPEATS = 4;

function MarqueeItemLink({
  item,
  duplicate = false,
}: {
  item: MarqueeItem;
  duplicate?: boolean;
}) {
  return (
    <Link
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
  );
}

function MarqueeSegment({
  items,
  duplicate = false,
  segmentRef,
}: {
  items: MarqueeItem[];
  duplicate?: boolean;
  segmentRef?: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      ref={segmentRef}
      className="flex shrink-0 items-center"
      aria-hidden={duplicate}
    >
      {items.map((item, index) => (
        <MarqueeItemLink
          key={`${duplicate ? "b" : "a"}-${item.href}-${index}`}
          item={item}
          duplicate={duplicate}
        />
      ))}
    </div>
  );
}

export function MaterialsMarquee() {
  const baseItems = useMemo(() => getMarqueeMaterials(), []);
  const segmentItems = useMemo(
    () =>
      Array.from({ length: SEGMENT_REPEATS }, () => baseItems).flat(),
    [baseItems]
  );

  const trackRef = useRef<HTMLDivElement>(null);
  const segmentRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const segmentWidthRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    const segment = segmentRef.current;
    if (!track || !segment) return;

    const measure = () => {
      segmentWidthRef.current = segment.getBoundingClientRect().width;
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(segment);
    window.addEventListener("resize", measure);

    let frameId = 0;
    let lastTime = performance.now();
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const speed = reducedMotion ? PIXELS_PER_SECOND * 0.35 : PIXELS_PER_SECOND;

    const animate = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      const width = segmentWidthRef.current;
      if (width > 0) {
        offsetRef.current += speed * delta;
        if (offsetRef.current >= width) {
          offsetRef.current %= width;
        }
        track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      }

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [segmentItems]);

  return (
    <section
      className="relative w-full overflow-hidden border-y border-white/10 bg-navy py-6 sm:py-8"
      aria-label="مواد و عناصر تأمینی"
    >
      <div className="pointer-events-none absolute inset-y-0 start-0 z-10 w-20 bg-gradient-to-l from-navy to-transparent sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 end-0 z-10 w-20 bg-gradient-to-r from-navy to-transparent sm:w-28" />

      <div className="relative w-full overflow-hidden">
        <div
          ref={trackRef}
          className="flex w-max will-change-transform"
          dir="ltr"
        >
          <MarqueeSegment items={segmentItems} segmentRef={segmentRef} />
          <MarqueeSegment items={segmentItems} duplicate />
        </div>
      </div>
    </section>
  );
}
