"use client";

import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

type MaterialItem = {
  n: string;
  o: string;
  f: string;
  badge: "وارداتی" | "حیاتی" | "پریمیوم";
};

type IndustryItem = {
  id: string;
  label: string;
  icon: string;
  color: string;
  angle: number;
  mats: MaterialItem[];
};

const INDUSTRIES: IndustryItem[] = [
  {
    id: "ceramic",
    label: "کاشی و سرامیک",
    icon: "🏗️",
    color: "#C8A96E",
    angle: -90,
    mats: [
      { n: "سیلیکات زیرکونیوم ۴۵µ", o: "اسپانیا", f: "🇪🇸", badge: "وارداتی" },
      { n: "اکسید کبالت", o: "چین/اروپا", f: "🇨🇳", badge: "حیاتی" },
      { n: "کائولن AKW", o: "آلمان", f: "🇩🇪", badge: "وارداتی" },
      { n: "اکسید آلومینا گاما", o: "آلمان", f: "🇩🇪", badge: "وارداتی" },
      { n: "فلزات کمیاب خاکی", o: "چین", f: "🇨🇳", badge: "حیاتی" },
      { n: "اسید بوریک", o: "ترکیه", f: "🇹🇷", badge: "وارداتی" },
    ],
  },
  {
    id: "sanitary",
    label: "چینی بهداشتی",
    icon: "🚿",
    color: "#5DCAA5",
    angle: -30,
    mats: [
      { n: "هیدروکسید کبالت", o: "اروپا", f: "🇩🇪", badge: "حیاتی" },
      { n: "کائولن OKA", o: "آلمان", f: "🇩🇪", badge: "وارداتی" },
      { n: "اکسید آلومینا متال", o: "آلمان", f: "🇩🇪", badge: "وارداتی" },
      { n: "سیلیکات زیرکونیوم #۳۲۵", o: "اسپانیا", f: "🇪🇸", badge: "وارداتی" },
    ],
  },
  {
    id: "glaze",
    label: "لعاب‌سازی",
    icon: "✨",
    color: "#AFA9EC",
    angle: 30,
    mats: [
      { n: "اکسید تیتانیوم", o: "اروپا", f: "🇩🇪", badge: "وارداتی" },
      { n: "اکسید کبالت", o: "چین/اروپا", f: "🇨🇳", badge: "حیاتی" },
      { n: "فریت‌های صنعتی", o: "ایتالیا", f: "🇮🇹", badge: "پریمیوم" },
      { n: "اکسید زیرکونیوم", o: "اسپانیا", f: "🇪🇸", badge: "وارداتی" },
    ],
  },
  {
    id: "glass",
    label: "صنعت شیشه",
    icon: "🔬",
    color: "#378ADD",
    angle: 90,
    mats: [
      { n: "شن کوارتز درجه یک", o: "ایران/اروپا", f: "🇮🇷", badge: "وارداتی" },
      { n: "سودا اش", o: "ترکیه", f: "🇹🇷", badge: "حیاتی" },
      { n: "اکسید آنتیموان", o: "چین", f: "🇨🇳", badge: "وارداتی" },
      { n: "اکسید قلع", o: "اروپا", f: "🇩🇪", badge: "حیاتی" },
    ],
  },
  {
    id: "tableware",
    label: "چینی ظروف",
    icon: "🍽️",
    color: "#F0996B",
    angle: 150,
    mats: [
      { n: "خاک چینی باریوم", o: "آلمان", f: "🇩🇪", badge: "وارداتی" },
      { n: "اکسید روی", o: "اروپا", f: "🇩🇪", badge: "وارداتی" },
      { n: "تبولار آلومینا", o: "آلمان", f: "🇩🇪", badge: "حیاتی" },
    ],
  },
  {
    id: "battery",
    label: "باطری‌سازی",
    icon: "⚡",
    color: "#EF9F27",
    angle: 210,
    mats: [
      { n: "شمش قلع", o: "اندونزی/مالزی", f: "🇮🇩", badge: "حیاتی" },
      { n: "هیدروکسید کبالت", o: "اروپا", f: "🇩🇪", badge: "حیاتی" },
      { n: "گرافیت صنعتی", o: "چین", f: "🇨🇳", badge: "وارداتی" },
    ],
  },
];

const ORBIT_RADIUS = 170;
const ORBIT_SIZE = 480;
const ORBIT_CENTER = ORBIT_SIZE / 2;
const GOLD = "#C8A96E";
const BG = "#06080D";

const BADGE_STYLES: Record<MaterialItem["badge"], string> = {
  وارداتی: "rgba(55, 138, 221, 0.2)",
  حیاتی: "rgba(239, 159, 39, 0.2)",
  پریمیوم: "rgba(200, 169, 110, 0.25)",
};

function getNodePosition(angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    left: ORBIT_CENTER + ORBIT_RADIUS * Math.cos(rad) - 48,
    top: ORBIT_CENTER + ORBIT_RADIUS * Math.sin(rad) - 52,
  };
}

function HexNode({
  industry,
  onOpen,
  nodeRef,
  isMobile,
}: {
  industry: IndustryItem;
  onOpen: (industry: IndustryItem) => void;
  nodeRef: (el: HTMLButtonElement | null) => void;
  isMobile?: boolean;
}) {
  const pos = getNodePosition(industry.angle);
  const innerRef = useRef<HTMLButtonElement>(null);

  const setRef = (el: HTMLButtonElement | null) => {
    innerRef.current = el;
    nodeRef(el);
  };

  const onEnter = () => {
    if (innerRef.current) {
      gsap.killTweensOf(innerRef.current);
      gsap.to(innerRef.current, { scale: 1.08, duration: 0.25, ease: "power2.out" });
    }
  };

  const onLeave = () => {
    if (innerRef.current) {
      gsap.killTweensOf(innerRef.current);
      gsap.to(innerRef.current, { scale: 1, duration: 0.25, ease: "power2.out" });
    }
  };

  return (
    <button
      type="button"
      ref={setRef}
      data-hoverable
      className="hero-node group absolute flex flex-col items-center border-0 bg-transparent p-0 outline-none"
      style={
        isMobile
          ? undefined
          : {
              left: pos.left,
              top: pos.top,
              width: 96,
              height: 104,
            }
      }
      onClick={() => onOpen(industry)}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      aria-label={`${industry.label} — ${industry.mats.length} ماده`}
    >
      <div
        className="hero-node-glow pointer-events-none absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle, ${industry.color}55 0%, transparent 70%)`,
          transform: "scale(1.8)",
        }}
        aria-hidden
      />
      <svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        className="relative z-10"
        aria-hidden
      >
        <polygon
          points="40,4 72,22 72,58 40,76 8,58 8,22"
          fill="#0D1018"
          stroke={industry.color}
          strokeWidth="1.5"
          className="hero-hex transition-[stroke,filter] duration-300 group-hover:brightness-125"
        />
        <text
          x="40"
          y="46"
          textAnchor="middle"
          fontSize="22"
          className="select-none"
        >
          {industry.icon}
        </text>
      </svg>
      <span
        className="absolute -top-1 end-0 z-20 flex size-5 items-center justify-center rounded-full text-[10px] font-bold text-white"
        style={{ background: industry.color }}
        aria-hidden
      >
        {industry.mats.length}
      </span>
      <span
        className="hero-node-label relative z-10 mt-1 max-w-[88px] text-center text-[11px] font-semibold leading-tight text-white/90"
        style={{ color: industry.color }}
      >
        {industry.label}
      </span>
    </button>
  );
}

export default function HeroUniverse() {
  const sceneRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const ring1Ref = useRef<HTMLDivElement>(null);
  const ring2Ref = useRef<HTMLDivElement>(null);
  const ring3Ref = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalCardRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const particleFrameRef = useRef(0);
  const gsapCtxRef = useRef<gsap.Context | null>(null);
  const rotationTweensRef = useRef<gsap.core.Tween[]>([]);
  const orbitHoveredRef = useRef(false);

  const [isMobile, setIsMobile] = useState(false);
  const [activeIndustry, setActiveIndustry] = useState<IndustryItem | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = useCallback((industry: IndustryItem) => {
    setActiveIndustry(industry);
    setModalVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    const card = modalCardRef.current;
    if (!card) {
      setModalVisible(false);
      setActiveIndustry(null);
      return;
    }

    gsap.to(card, {
      scale: 0.9,
      opacity: 0,
      y: 20,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        setModalVisible(false);
        setActiveIndustry(null);
      },
    });
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.4 + 0.4,
      alpha: Math.random() * 0.5 + 0.2,
      speed: Math.random() * 0.3 + 0.1,
      phase: Math.random() * Math.PI * 2,
    }));

    const draw = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        const twinkle = 0.35 + 0.65 * ((Math.sin(time * 0.001 * p.speed + p.phase) + 1) / 2);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 169, 110, ${p.alpha * twinkle})`;
        ctx.fill();
      });
      particleFrameRef.current = requestAnimationFrame(draw);
    };

    particleFrameRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(particleFrameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  useLayoutEffect(() => {
    if (isMobile) {
      gsapCtxRef.current?.revert();
      gsapCtxRef.current = null;
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const scene = sceneRef.current;
    if (!scene) return;

    gsapCtxRef.current?.revert();
    gsapCtxRef.current = null;
    rotationTweensRef.current = [];

    gsapCtxRef.current = gsap.context(() => {
      const orbit = orbitRef.current;
      const ring1 = ring1Ref.current;
      const ring2 = ring2Ref.current;
      const ring3 = ring3Ref.current;
      const tweens: gsap.core.Tween[] = [];

      if (orbit) {
        tweens.push(
          gsap.to(orbit, {
            rotation: 360,
            duration: 40,
            repeat: -1,
            ease: "none",
            transformOrigin: "center center",
          })
        );
      }

      nodeRefs.current.forEach((node) => {
        if (!node) return;
        tweens.push(
          gsap.to(node, {
            rotation: -360,
            duration: 40,
            repeat: -1,
            ease: "none",
            transformOrigin: "48px 44px",
          })
        );
      });

      rotationTweensRef.current = tweens;

      if (ring1) {
        gsap.to(ring1, {
          rotation: 360,
          duration: 25,
          repeat: -1,
          ease: "none",
          transformOrigin: "center center",
        });
        gsap.to(ring1, {
          scale: 1.04,
          opacity: 0.7,
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
      if (ring2) {
        gsap.to(ring2, {
          rotation: -360,
          duration: 45,
          repeat: -1,
          ease: "none",
          transformOrigin: "center center",
        });
      }
      if (ring3) {
        gsap.to(ring3, {
          rotation: 360,
          duration: 70,
          repeat: -1,
          ease: "none",
          transformOrigin: "center center",
        });
      }
    }, scene);

    return () => {
      gsapCtxRef.current?.revert();
      gsapCtxRef.current = null;
      rotationTweensRef.current = [];
    };
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;

    const orbit = orbitRef.current;
    if (!orbit) return;

    const pauseRotations = () => {
      orbitHoveredRef.current = true;
      rotationTweensRef.current.forEach((tween) => tween.pause());
      gsap.to(orbit, { x: 0, y: 0, duration: 0.4, ease: "power2.out" });
    };

    const resumeRotations = () => {
      orbitHoveredRef.current = false;
      rotationTweensRef.current.forEach((tween) => tween.resume());
    };

    orbit.addEventListener("mouseenter", pauseRotations);
    orbit.addEventListener("mouseleave", resumeRotations);

    return () => {
      orbit.removeEventListener("mouseenter", pauseRotations);
      orbit.removeEventListener("mouseleave", resumeRotations);
      orbitHoveredRef.current = false;
    };
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;

    const scene = sceneRef.current;
    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    const orbit = orbitRef.current;
    const heroText = heroTextRef.current;
    if (!scene || !dot || !ring) return;

    const onMove = (e: MouseEvent) => {
      const rect = scene.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const nx = (x / rect.width - 0.5) * 2;
      const ny = (y / rect.height - 0.5) * 2;

      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        xPercent: -50,
        yPercent: -50,
        duration: 0.1,
        ease: "power2.out",
      });
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        xPercent: -50,
        yPercent: -50,
        duration: 0.35,
        ease: "power2.out",
      });

      if (orbit && !orbitHoveredRef.current) {
        gsap.to(orbit, {
          x: nx * 12,
          y: ny * 8,
          duration: 0.8,
          ease: "power2.out",
        });
      }
      if (heroText) {
        gsap.to(heroText, {
          x: nx * -10,
          y: ny * -8,
          duration: 0.8,
          ease: "power2.out",
        });
      }
    };

    const onEnterHoverable = () => {
      gsap.to(ring, { scale: 2, duration: 0.3, ease: "power2.out" });
    };
    const onLeaveHoverable = () => {
      gsap.to(ring, { scale: 1, duration: 0.3, ease: "power2.out" });
    };

    scene.addEventListener("mousemove", onMove);
    const hoverables = scene.querySelectorAll("[data-hoverable]");
    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", onEnterHoverable);
      el.addEventListener("mouseleave", onLeaveHoverable);
    });

    return () => {
      scene.removeEventListener("mousemove", onMove);
      hoverables.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterHoverable);
        el.removeEventListener("mouseleave", onLeaveHoverable);
      });
      gsap.killTweensOf([dot, ring, orbit, heroText]);
    };
  }, [isMobile]);

  useEffect(() => {
    if (!modalVisible || !activeIndustry) return;

    const card = modalCardRef.current;
    const modal = modalRef.current;
    if (!card || !modal) return;

    gsap.fromTo(
      card,
      { scale: 0.85, opacity: 0, y: 30 },
      { scale: 1, opacity: 1, y: 0, duration: 0.45, ease: "back.out(1.4)" }
    );

    const materialCards = card.querySelectorAll<HTMLElement>("[data-material-card]");
    gsap.fromTo(
      materialCards,
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.08,
        ease: "power2.out",
        delay: 0.15,
      }
    );

    const focusable = modal.querySelectorAll<HTMLElement>(
      'button, [href], [tabindex]:not([tabindex="-1"])'
    );
    focusable[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
        return;
      }
      if (e.key !== "Tab" || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      gsap.killTweensOf(card);
      gsap.killTweensOf(materialCards);
    };
  }, [modalVisible, activeIndustry, closeModal]);

  return (
    <>
      <section
        ref={sceneRef}
        className="hero-universe relative flex min-h-screen flex-col overflow-hidden"
        style={{ background: BG, cursor: isMobile ? "auto" : "none" }}
        dir="rtl"
        aria-label="بخش اصلی"
      >
        <canvas
          ref={canvasRef}
          className="pointer-events-none absolute inset-0 z-0 h-full w-full"
          aria-hidden
        />

        {!isMobile && (
          <>
            <div
              ref={cursorDotRef}
              className="pointer-events-none fixed top-0 left-0 z-[100] size-2 rounded-full"
              style={{ background: GOLD }}
              aria-hidden
            />
            <div
              ref={cursorRingRef}
              className="pointer-events-none fixed top-0 left-0 z-[99] size-8 rounded-full border"
              style={{ borderColor: `${GOLD}88` }}
              aria-hidden
            />
          </>
        )}

        <div className="relative z-10 flex min-h-screen flex-1 flex-col items-center justify-center px-4 py-16 lg:flex-row lg:items-center lg:justify-between lg:px-12 xl:px-20">
          <div
            ref={heroTextRef}
            className="relative z-20 mb-10 w-full max-w-md text-start lg:mb-0 lg:max-w-lg lg:flex-shrink-0"
          >
            <span
              className="mb-5 inline-block rounded-full border px-4 py-1.5 text-sm font-semibold"
              style={{ borderColor: `${GOLD}66`, color: GOLD }}
            >
              +۳۰ سال تجربه صنعتی
            </span>
            <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.6rem]">
              تأمین مواد اولیه برای صنایع پیشرو
            </h2>
            <p className="mt-4 text-base text-white/60 sm:text-lg">
              صنعت خود را انتخاب کنید
            </p>
          </div>

          {isMobile ? (
            <div className="grid w-full max-w-lg grid-cols-2 gap-4 sm:gap-5">
              {INDUSTRIES.map((industry, index) => (
                <button
                  key={industry.id}
                  type="button"
                  data-hoverable
                  className="flex flex-col items-center rounded-2xl border border-white/10 bg-[#0D1018] p-4 text-center transition-colors hover:border-white/25"
                  onClick={() => openModal(industry)}
                  aria-label={`${industry.label} — ${industry.mats.length} ماده`}
                >
                  <span className="text-3xl" aria-hidden>
                    {industry.icon}
                  </span>
                  <span
                    className="mt-2 text-sm font-bold"
                    style={{ color: industry.color }}
                  >
                    {industry.label}
                  </span>
                  <span className="mt-1 text-xs text-white/50">
                    {industry.mats.length} ماده
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="relative flex flex-1 items-center justify-center">
              <div className="absolute flex items-center justify-center">
                <div
                  ref={ring3Ref}
                  className="absolute rounded-full border border-white/5"
                  style={{ width: 360, height: 360 }}
                  aria-hidden
                />
                <div
                  ref={ring2Ref}
                  className="absolute rounded-full border"
                  style={{
                    width: 280,
                    height: 280,
                    borderColor: `${GOLD}33`,
                  }}
                  aria-hidden
                />
                <div
                  ref={ring1Ref}
                  className="absolute rounded-full border"
                  style={{
                    width: 200,
                    height: 200,
                    borderColor: `${GOLD}55`,
                  }}
                  aria-hidden
                />
                <div
                  className="relative z-10 flex size-28 items-center justify-center rounded-full border text-center text-xs font-bold leading-snug text-white sm:size-32 sm:text-sm"
                  style={{
                    borderColor: `${GOLD}88`,
                    background: "radial-gradient(circle, #0D1018 0%, #06080D 100%)",
                    boxShadow: `0 0 40px ${GOLD}33`,
                  }}
                >
                  شایراد
                  <br />
                  تجارت پارس
                </div>
              </div>

              <div
                ref={orbitRef}
                className="relative"
                style={{ width: ORBIT_SIZE, height: ORBIT_SIZE }}
              >
                {INDUSTRIES.map((industry, index) => (
                  <HexNode
                    key={industry.id}
                    industry={industry}
                    onOpen={openModal}
                    nodeRef={(el) => {
                      nodeRefs.current[index] = el;
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {modalVisible && activeIndustry && (
        <div
          ref={modalRef}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{
            background: "rgba(4, 5, 9, 0.85)",
            backdropFilter: "blur(8px)",
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="hero-modal-title"
          onClick={(e) => {
            if (e.target === modalRef.current) closeModal();
          }}
        >
          <div
            ref={modalCardRef}
            className="w-full max-w-[520px] overflow-hidden rounded-2xl border border-white/10"
            style={{ background: "#0D1018" }}
            dir="rtl"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="border-b border-white/10 px-6 py-5">
              <div className="flex items-start gap-4">
                <span className="text-4xl" aria-hidden>
                  {activeIndustry.icon}
                </span>
                <div>
                  <h3
                    id="hero-modal-title"
                    className="text-xl font-bold text-white"
                  >
                    {activeIndustry.label}
                  </h3>
                  <p className="mt-1 text-sm text-white/50">
                    {activeIndustry.mats.length} ماده تأمینی
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeModal}
                  className="ms-auto flex size-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-white/40 hover:text-white"
                  aria-label="بستن"
                >
                  ×
                </button>
              </div>
            </header>

            <div className="grid max-h-[50vh] grid-cols-1 gap-3 overflow-y-auto p-6 sm:grid-cols-2">
              {activeIndustry.mats.map((mat) => (
                <div
                  key={mat.n}
                  data-material-card
                  className="rounded-xl border border-white/8 p-3"
                  style={{ background: "rgba(255,255,255,0.03)" }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-lg" aria-hidden>
                      {mat.f}
                    </span>
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white/90"
                      style={{ background: BADGE_STYLES[mat.badge] }}
                    >
                      {mat.badge}
                    </span>
                  </div>
                  <p className="mt-2 text-sm font-semibold text-white">{mat.n}</p>
                  <p className="mt-1 text-xs text-white/45">مبدأ: {mat.o}</p>
                </div>
              ))}
            </div>

            <footer className="flex flex-col gap-3 border-t border-white/10 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-bold transition-opacity hover:opacity-90"
                style={{ background: GOLD, color: BG }}
              >
                استعلام قیمت
              </Link>
              <button
                type="button"
                onClick={closeModal}
                className="text-sm text-white/50 transition-colors hover:text-white"
              >
                بستن
              </button>
            </footer>
          </div>
        </div>
      )}
    </>
  );
}
