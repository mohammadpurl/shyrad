'use client'
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  HERO_INDUSTRIES,
  HERO_UNIQUE_MATERIAL_COUNT,
  type HeroIndustry,
} from "@/lib/hero-industries";
import { INDUSTRY_LUCIDE_ICONS } from "@/lib/industry-icons";

/** 'inline' = کادر کناری | 'modal' = پنجره modal */
const INDUSTRY_DETAILS_MODE: "inline" | "modal" = "inline";

function IndustryDetailsContent({ industry }: { industry: HeroIndustry }) {
  const Icon = INDUSTRY_LUCIDE_ICONS[industry.icon];

  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <div className="text-[11px] uppercase tracking-[0.3em] text-[#d4a84a]/80">
          {industry.name}
        </div>
        <Icon className="h-5 w-5 shrink-0 text-[#e6c068]" />
      </div>
      <div
        className="text-xl font-bold text-white lg:text-2xl"
        id="industry-details-title"
      >
        {industry.product}
      </div>
      <p className="text-sm leading-relaxed text-[#9fb3d1]">{industry.description}</p>
      <div className="flex max-h-36 flex-wrap gap-2 overflow-y-auto md:max-h-40">
        {industry.materials.map((material) => (
          <Link
            key={material.slug}
            href={material.href}
            className="rounded-full border border-[#d4a84a]/30 bg-[#d4a84a]/8 px-3 py-1.5 text-xs text-[#f0d78c] transition-colors hover:border-[#e6c068]/60 hover:text-white"
          >
            {material.title}
          </Link>
        ))}
      </div>
    </>
  );
}

function IndustryDetailsInlineCard({
  industry,
  empty,
}: {
  industry: HeroIndustry | null;
  empty?: boolean;
}) {
  if (empty || !industry) {
    return (
      <div className="flex min-h-40 flex-col justify-center gap-2 text-center">
        <div className="text-sm text-[#9fb3d1]">روی یک صنعت کلیک کنید</div>
        <div className="text-xs text-[#6b7fa3]">
          در دسکتاپ با حرکت ماوس پیش‌نمایش ببینید؛ مواد اولیهٔ متناسب نمایش
          داده می‌شود
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <IndustryDetailsContent industry={industry} />
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#d4a84a]/15 pt-4">
        <Link
          href={industry.href}
          className="rounded-xl bg-[#d4a84a] px-4 py-2 text-sm font-bold text-[#061230] transition-opacity hover:opacity-90"
        >
          مشاهده صنعت
        </Link>
        <Link
          href="/contact"
          className="text-sm text-[#9fb3d1] transition-colors hover:text-[#e6c068]"
        >
          استعلام قیمت
        </Link>
      </div>
    </div>
  );
}

function ParticleCanvas({
  activeId,
  touchPulse,
}: {
  activeId: string | null;
  touchPulse?: { x: number; y: number; id: number } | null;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    mx: 0,
    my: 0,
    t: 0,
    activeId: activeId as string | null,
    pointerInside: false,
    touchAttract: false,
    restoreBlend: 0,
  });

  useEffect(() => {
    const prev = stateRef.current.activeId;
    stateRef.current.activeId = activeId;
    if (prev && !activeId) {
      stateRef.current.restoreBlend = 1;
      stateRef.current.pointerInside = false;
    }
  }, [activeId]);

  useEffect(() => {
    if (!touchPulse) return;

    stateRef.current.mx = touchPulse.x;
    stateRef.current.my = touchPulse.y;
    stateRef.current.touchAttract = true;
    stateRef.current.restoreBlend = 0;

    const timer = window.setTimeout(() => {
      stateRef.current.touchAttract = false;
      stateRef.current.restoreBlend = 1;
    }, 750);

    return () => clearTimeout(timer);
  }, [touchPulse?.id, touchPulse?.x, touchPulse?.y]);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const host = canvas.parentElement;
    if (!host) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const N = window.innerWidth < 768 ? 80 : 140;
    const particles = Array.from({ length: N }, () => ({
      x: 0,
      y: 0,
      homeX: 0,
      homeY: 0,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.6 + 0.4,
      a: Math.random() * 0.5 + 0.2,
    }));

    const scatterParticles = (width: number, height: number) => {
      for (const p of particles) {
        p.x = Math.random() * width;
        p.y = Math.random() * height;
        p.homeX = p.x;
        p.homeY = p.y;
        p.vx = (Math.random() - 0.5) * 0.25;
        p.vy = (Math.random() - 0.5) * 0.25;
      }
    };

    const resize = () => {
      const nextW = host.clientWidth;
      const nextH = host.clientHeight;
      if (nextW <= 0 || nextH <= 0) return;

      const prevW = w;
      const prevH = h;

      w = nextW;
      h = nextH;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (prevW <= 0 || prevH <= 0) {
        scatterParticles(w, h);
        return;
      }

      const scaleX = w / prevW;
      const scaleY = h / prevH;
      for (const p of particles) {
        p.x *= scaleX;
        p.y *= scaleY;
        p.homeX *= scaleX;
        p.homeY *= scaleY;
        p.x = Math.min(Math.max(p.x, 0), w);
        p.y = Math.min(Math.max(p.y, 0), h);
        p.homeX = Math.min(Math.max(p.homeX, 0), w);
        p.homeY = Math.min(Math.max(p.homeY, 0), h);
      }
    };

    resize();

    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(host);
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      const rect = host.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      stateRef.current.pointerInside = true;
      stateRef.current.mx = e.clientX - rect.left;
      stateRef.current.my = e.clientY - rect.top;
    };

    const onLeave = () => {
      stateRef.current.pointerInside = false;
      stateRef.current.restoreBlend = 1;
      if (w > 0 && h > 0) {
        stateRef.current.mx = w / 2;
        stateRef.current.my = h / 2;
      }
    };

    const coarsePointer = window.matchMedia(
      "(hover: none), (pointer: coarse)"
    ).matches;

    if (!coarsePointer) {
      host.addEventListener("mousemove", onMove);
      host.addEventListener("mouseleave", onLeave);
    }

    const render = () => {
      if (w > 0 && h > 0) {
        stateRef.current.t += 0.005;
        ctx.clearRect(0, 0, w, h);

        const cx = w / 2;
        const cy = h / 2;
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.6);
        g.addColorStop(0, "rgba(86, 140, 220, 0.14)");
        g.addColorStop(1, "rgba(10, 24, 56, 0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);

        const {
          mx,
          my,
          activeId: currentActiveId,
          pointerInside,
          touchAttract,
        } = stateRef.current;
        const attract =
          touchAttract || (Boolean(currentActiveId) && pointerInside);
        const springStrength =
          0.0015 + stateRef.current.restoreBlend * 0.006;

        if (stateRef.current.restoreBlend > 0) {
          stateRef.current.restoreBlend = Math.max(
            0,
            stateRef.current.restoreBlend - 0.018
          );
        }

        for (const p of particles) {
          if (attract) {
            const dx = mx - p.x;
            const dy = my - p.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < 18000) {
              const f = (1 - d2 / 18000) * (touchAttract ? 0.045 : 0.035);
              p.vx += dx * f * 0.01;
              p.vy += dy * f * 0.01;
            }
          } else {
            const dx = p.homeX - p.x;
            const dy = p.homeY - p.y;
            p.vx += dx * springStrength;
            p.vy += dy * springStrength;
          }

          const damping = attract ? 0.985 : 0.96;
          p.vx *= damping;
          p.vy *= damping;
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0) p.x += w;
          else if (p.x > w) p.x -= w;
          if (p.y < 0) p.y += h;
          else if (p.y > h) p.y -= h;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(140, 185, 240, ${p.a})`;
          ctx.fill();
        }

        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const a = particles[i];
            const b = particles[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < 9000) {
              const alpha = (1 - d2 / 9000) * 0.18;
              ctx.strokeStyle = `rgba(120, 170, 230, ${alpha})`;
              ctx.lineWidth = 0.5;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
      }

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      window.removeEventListener("resize", resize);
      if (!coarsePointer) {
        host.removeEventListener("mousemove", onMove);
        host.removeEventListener("mouseleave", onLeave);
      }
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" />;
}

export default function IndustriesHero() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [isTouch, setIsTouch] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(hover: none), (pointer: coarse)").matches;
  });
  const orbitAreaRef = useRef<HTMLDivElement>(null);
  const hoverClearTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchPulseIdRef = useRef(0);
  const [touchPulse, setTouchPulse] = useState<{
    x: number;
    y: number;
    id: number;
  } | null>(null);

  const displayedId =
    INDUSTRY_DETAILS_MODE === "inline" ? hoveredId ?? selectedId : hoveredId;
  const displayed =
    HERO_INDUSTRIES.find((i) => i.slug === displayedId) ?? null;
  const selected =
    HERO_INDUSTRIES.find((i) => i.slug === selectedId) ?? null;

  useEffect(() => {
    const mq = window.matchMedia("(hover: none), (pointer: coarse)");
    const update = () => setIsTouch(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    return () => {
      if (hoverClearTimerRef.current) clearTimeout(hoverClearTimerRef.current);
    };
  }, []);

  const setHoveredIndustry = (slug: string | null) => {
    if (hoverClearTimerRef.current) {
      clearTimeout(hoverClearTimerRef.current);
      hoverClearTimerRef.current = null;
    }
    if (slug) {
      setHoveredId(slug);
      return;
    }
    hoverClearTimerRef.current = setTimeout(() => setHoveredId(null), 100);
  };

  const handleIndustryPointerLeave = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (isTouch) return;
    const related = e.relatedTarget as Node | null;
    if (related && orbitAreaRef.current?.contains(related)) return;
    setHoveredIndustry(null);
  };

  const pulseTouchAtIndustry = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isTouch || !orbitAreaRef.current) return;

    const hostRect = orbitAreaRef.current.getBoundingClientRect();
    const btnRect = e.currentTarget.getBoundingClientRect();
    touchPulseIdRef.current += 1;
    setTouchPulse({
      id: touchPulseIdRef.current,
      x: btnRect.left + btnRect.width / 2 - hostRect.left,
      y: btnRect.top + btnRect.height / 2 - hostRect.top,
    });
  };

  const selectIndustry = (
    slug: string,
    e?: React.MouseEvent<HTMLButtonElement>
  ) => {
    setSelectedId((prev) => (prev === slug ? null : slug));
    if (e) pulseTouchAtIndustry(e);
  };

  return (
    <section
      dir="rtl"
      lang="fa"
      className="font-vazir relative min-h-screen w-full overflow-hidden bg-[#061230] text-[#e6ecf7]"
    >
      {/* ambient backdrop */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 right-1/3 h-[520px] w-[520px] rounded-full bg-[#1e3a7a]/40 blur-[140px]" />
        <div className="absolute bottom-0 left-1/4 h-[420px] w-[420px] rounded-full bg-[#d4a84a]/10 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(140,185,240,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(140,185,240,.4) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* top bar */}
        {/* <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-10">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-md border border-[#d4a84a]/50 bg-[#d4a84a]/10">
              <span className="text-[#e6c068] text-sm font-bold">ش</span>
            </div>
            <div className="leading-tight">
              <div className="text-[11px] uppercase tracking-[0.3em] text-[#d4a84a]/80">
                Shayrad Tejarat Pars
              </div>
              <div className="text-sm font-semibold text-[#e6ecf7]">شایراد تجارت پارس</div>
            </div>
          </div>
          <div className="hidden items-center gap-6 text-xs text-[#8aa3c8] md:flex">
            <span className="inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#e6c068]" />
              تأمین زنده ۲۴ ساعته
            </span>
            <span>۳۰+ سال تجربه • شبکه بین‌المللی</span>
          </div>
        </header> */}

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 px-5 pb-12 pt-20 md:gap-10 md:px-10 md:pb-20 md:pt-24 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pt-28">
        {/* LEFT: copy + active product */}
        <div className="flex flex-col justify-center">
          {/* <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#d4a84a]/40 bg-[#d4a84a]/10 px-3 py-1 text-[11px] tracking-widest text-[#e6c068]">
            <span className="h-1 w-1 rounded-full bg-[#e6c068]" />
            شایراد تجارت پارس
          </div> */}

          <h1 className="mt-5 text-balance text-[2rem] font-black leading-[1.15] text-white sm:text-4xl md:text-6xl lg:text-7xl">
            تأمین مطمئن مواد اولیه
            <br />

            <span className="bg-gradient-to-l from-[#d4a84a] via-[#e6c068] to-[#a47820] bg-clip-text text-transparent">
              برای صنایع پیشرو
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-7 text-[#9fb3d1] sm:text-base md:mt-6 md:text-lg md:leading-8">
            بیش از ۳۰ سال تجربه در تأمین مواد اولیه صنعتی برای صنایع شیشه،
            سرامیک، نسوز، بهداشتی و ریخته‌گری با شبکه تأمین بین‌المللی.
          </p>

          {INDUSTRY_DETAILS_MODE === "inline" && (
          <div
            className="relative mt-8 hidden md:mt-10 md:block"
            aria-live="polite"
            aria-atomic="true"
          >
            <div className="min-h-56 rounded-2xl border border-[#d4a84a]/25 bg-gradient-to-br from-[#0c1d44]/80 to-[#061230]/80 p-5 backdrop-blur-sm lg:p-6">
              <div
                key={displayed?.slug ?? "idle"}
                className="animate-[fade-in_150ms_ease-out]"
              >
                <IndustryDetailsInlineCard industry={displayed} empty={!displayed} />
              </div>
            </div>
          </div>
          )}
        </div>

        {/* orbital industries */}
        <div
          ref={orbitAreaRef}
          className="relative mx-auto aspect-square w-full max-w-[min(100%,480px)] shrink-0 rounded-3xl border border-[#d4a84a]/20 bg-[#091a3d]/60 backdrop-blur-sm sm:max-w-[520px] md:mx-0 md:max-w-none md:aspect-auto md:h-[560px] lg:justify-self-end"
          onMouseLeave={() => !isTouch && setHoveredIndustry(null)}
        >
          <ParticleCanvas activeId={hoveredId} touchPulse={touchPulse} />

          {/* concentric rings */}
          <div className="pointer-events-none absolute inset-0 grid place-items-center">
            <div className="aspect-square w-[90%] max-w-[420px] rounded-full border border-[#d4a84a]/12" />
            <div className="absolute aspect-square w-[64%] max-w-[300px] rounded-full border border-[#d4a84a]/18" />
            <div className="absolute aspect-square w-[38%] max-w-[180px] rounded-full border border-[#d4a84a]/25" />
            <div
              className="absolute z-10 flex max-w-[108px] flex-col items-center justify-center rounded-full border px-2 py-3 text-center sm:max-w-[128px] sm:px-3 sm:py-4"
              style={{
                borderColor: "rgba(230, 192, 104, 0.55)",
                background:
                  "radial-gradient(circle, rgba(13, 29, 68, 0.95) 0%, rgba(6, 18, 48, 0.9) 100%)",
                boxShadow: "0 0 32px rgba(230, 192, 104, 0.25)",
              }}
            >
              <span className="text-[10px] font-bold leading-tight text-[#e6c068] sm:text-xs">
                شایراد
              </span>
              <span className="mt-0.5 text-[10px] font-bold leading-tight text-[#e6c068] sm:text-xs">
                تجارت پارس
              </span>
            </div>
          </div>

          {/* radial industry nodes */}
          <div className="absolute inset-0">
            {HERO_INDUSTRIES.map((ind, i) => {
              const angle = (i / HERO_INDUSTRIES.length) * Math.PI * 2 - Math.PI / 2;
              const radius = 38;
              const x = 50 + Math.cos(angle) * radius;
              const y = 50 + Math.sin(angle) * radius;
              const isDisplayed = displayedId === ind.slug;
              const isSelected = selectedId === ind.slug;
              const Icon = INDUSTRY_LUCIDE_ICONS[ind.icon];
              return (
                <button
                  key={ind.slug}
                  type="button"
                  onMouseEnter={() => !isTouch && setHoveredIndustry(ind.slug)}
                  onMouseLeave={handleIndustryPointerLeave}
                  onFocus={() => !isTouch && setHoveredIndustry(ind.slug)}
                  onBlur={() => !isTouch && setHoveredIndustry(null)}
                  onClick={(e) => selectIndustry(ind.slug, e)}
                  style={{ left: `${x}%`, top: `${y}%` }}
                  className="group absolute -translate-x-1/2 -translate-y-1/2 touch-manipulation p-3"
                  aria-pressed={isSelected}
                >
                  <div
                    className={`flex flex-col items-center gap-1.5 transition-[filter,opacity] duration-300 sm:gap-2 ${
                      isDisplayed ? "brightness-110" : "brightness-100"
                    }`}
                  >
                    <div
                      className={`grid h-12 w-12 place-items-center rounded-xl border backdrop-blur-md transition-all duration-300 sm:h-14 sm:w-14 sm:rounded-2xl md:h-16 md:w-16 ${
                        isDisplayed
                          ? "border-[#e6c068] bg-[#e6c068]/20 shadow-[0_0_40px_rgba(230,192,104,.5)]"
                          : isSelected
                            ? "border-[#d4a84a]/70 bg-[#d4a84a]/10"
                            : "border-[#d4a84a]/35 bg-[#0c1d44]/70 group-hover:border-[#e6c068]/70"
                      }`}
                    >
                      <Icon
                        className={`h-5 w-5 transition-colors sm:h-6 sm:w-6 md:h-7 md:w-7 ${
                          isDisplayed ? "text-white" : "text-[#e6c068]"
                        }`}
                      />
                    </div>
                    <span
                      className={`max-w-[72px] text-center text-[10px] font-medium leading-tight transition-colors sm:max-w-none sm:whitespace-nowrap sm:text-xs ${
                        isDisplayed ? "text-white" : "text-[#9fb3d1]"
                      }`}
                    >
                      {ind.name}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* mobile: inline card only */}
        {INDUSTRY_DETAILS_MODE === "inline" && selected && (
          <div className="rounded-2xl border border-[#d4a84a]/25 bg-gradient-to-br from-[#0c1d44]/80 to-[#061230]/80 p-5 backdrop-blur-sm md:hidden">
            <IndustryDetailsInlineCard industry={selected} />
          </div>
        )}
      </div>

      {/* bottom bar */}
      <div className="relative z-10 mx-auto max-w-7xl border-t border-[#d4a84a]/15 px-5 py-5 md:px-10">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] text-[#6b7fa3] md:text-xs">
          <span>
            {HERO_INDUSTRIES.length} صنعت کلیدی • {HERO_UNIQUE_MATERIAL_COUNT} ماده
            اولیه تخصصی
          </span>
          <span className="text-[#9fb3d1]">
            برای جزئیات کلیک کنید؛ در دسکتاپ با hover پیش‌نمایش ببینید
          </span>
        </div>
      </div>
    </section>
  );
}
