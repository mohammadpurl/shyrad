import { useEffect, useRef, useState } from "react";
import { FlaskConical, Sparkles, Droplets, GlassWater, Flame, LayoutGrid, X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

type Industry = {
  id: string;
  name: string;
  product: string;
  materials: string[];
  Icon: React.ComponentType<{ className?: string }>;
};

const INDUSTRIES: Industry[] = [
  {
    id: "glass",
    name: "صنعت شیشه",
    product: "مواد اولیه شیشه‌سازی",
    materials: ["سیلیس درجه یک", "سودااش سبک", "دولومیت", "فلدسپات سدیک"],
    Icon: GlassWater,
  },
  {
    id: "glaze",
    name: "صنعت لعاب‌سازی",
    product: "فریت و رنگدانه لعاب",
    materials: ["فریت شفاف", "اکسید زیرکونیوم", "کائولن کلسینه", "اکسید روی"],
    Icon: Sparkles,
  },
  {
    id: "sanitary",
    name: "چینی بهداشتی",
    product: "بدنه و لعاب چینی بهداشتی",
    materials: ["کائولن واش‌شده", "بال‌کلی استاندارد", "فلدسپات پتاسیک", "کوارتز میکرونیزه"],
    Icon: Droplets,
  },
  {
    id: "tableware",
    name: "چینی مظروف و بلور",
    product: "ظروف چینی و کریستال",
    materials: ["کائولن ممتاز", "نفلین سینیت", "سرب کریستال‌ساز", "اکسید پتاسیم"],
    Icon: FlaskConical,
  },
  {
    id: "refractory",
    name: "نسوز و دیرگداز",
    product: "آجر و ملات نسوز",
    materials: ["بوکسیت کلسینه", "آلومینا تابولار", "منیزیت دد‌برند", "گرافیت طبیعی"],
    Icon: Flame,
  },
  {
    id: "tile",
    name: "کاشی و سرامیک",
    product: "بدنه و لعاب کاشی",
    materials: ["خاک رس بنتونیتی", "فلدسپات سدیک", "زیرکن میکرونیزه", "فریت مات"],
    Icon: LayoutGrid,
  },
];

function ParticleCanvas({ activeId }: { activeId: string | null }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({ mx: 0, my: 0, t: 0 });

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const N = 140;
    const particles = Array.from({ length: N }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.6 + 0.4,
      a: Math.random() * 0.5 + 0.2,
    }));

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      stateRef.current.mx = e.clientX - rect.left;
      stateRef.current.my = e.clientY - rect.top;
    };
    window.addEventListener("mousemove", onMove);

    const render = () => {
      stateRef.current.t += 0.005;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.6);
      g.addColorStop(0, "rgba(86, 140, 220, 0.14)");
      g.addColorStop(1, "rgba(10, 24, 56, 0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      const { mx, my } = stateRef.current;
      const boost = activeId ? 1 : 0.4;

      for (const p of particles) {
        const dx = mx - p.x;
        const dy = my - p.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 18000) {
          const f = (1 - d2 / 18000) * 0.04 * boost;
          p.vx += dx * f * 0.01;
          p.vy += dy * f * 0.01;
        }
        p.vx *= 0.985;
        p.vy *= 0.985;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x += w;
        if (p.x > w) p.x -= w;
        if (p.y < 0) p.y += h;
        if (p.y > h) p.y -= h;

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

      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, [activeId]);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" />;
}

export default function IndustriesHero() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [sheetIndustry, setSheetIndustry] = useState<Industry | null>(null);

  const active = INDUSTRIES.find((i) => i.id === activeId) ?? null;

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
      <header className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-10">
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
      </header>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-8 px-5 pb-12 pt-2 md:gap-10 md:px-10 md:pb-20 md:pt-6 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pt-12">
        {/* LEFT: copy + active product */}
        <div className="flex flex-col justify-center">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#d4a84a]/40 bg-[#d4a84a]/10 px-3 py-1 text-[11px] tracking-widest text-[#e6c068]">
            <span className="h-1 w-1 rounded-full bg-[#e6c068]" />
            شایراد تجارت پارس
          </div>

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

          {/* active product card — desktop only (hover-driven) */}
          <div className="relative mt-10 hidden h-44 md:block md:h-48">

            <div
              key={active?.id ?? "idle"}
              className="absolute inset-0 animate-[fade-in_400ms_ease-out] rounded-2xl border border-[#d4a84a]/25 bg-gradient-to-br from-[#0c1d44]/80 to-[#061230]/80 p-6 backdrop-blur-sm"
            >
              {active ? (
                <div className="flex h-full flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <div className="text-[11px] uppercase tracking-[0.3em] text-[#d4a84a]/80">
                      {active.name}
                    </div>
                    <active.Icon className="h-5 w-5 text-[#e6c068]" />
                  </div>
                  <div className="text-2xl font-bold text-white md:text-3xl">
                    {active.product}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {active.materials.map((m) => (
                      <span
                        key={m}
                        className="rounded-full border border-[#d4a84a]/30 bg-[#d4a84a]/8 px-3 py-1 text-xs text-[#f0d78c]"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex h-full flex-col justify-center gap-2 text-center">
                  <div className="text-sm text-[#9fb3d1]">
                    نشانگر را روی یک صنعت ببرید
                  </div>
                  <div className="text-xs text-[#6b7fa3]">
                    تا مواد اولیهٔ متناسب با آن نمایش داده شود
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT: canvas + industries */}
        <div className="relative hidden h-[560px] rounded-3xl border border-[#d4a84a]/20 bg-[#091a3d]/60 backdrop-blur-sm md:block">
          <ParticleCanvas activeId={activeId} />

          {/* concentric rings */}
          <div className="pointer-events-none absolute inset-0 grid place-items-center">
            <div className="h-[420px] w-[420px] rounded-full border border-[#d4a84a]/12" />
            <div className="absolute h-[300px] w-[300px] rounded-full border border-[#d4a84a]/18" />
            <div className="absolute h-[180px] w-[180px] rounded-full border border-[#d4a84a]/25" />
            <div className="absolute h-3 w-3 rounded-full bg-[#e6c068] shadow-[0_0_30px_8px_rgba(230,192,104,.55)]" />
          </div>

          {/* radial industry nodes */}
          <div className="absolute inset-0">
            {INDUSTRIES.map((ind, i) => {
              const angle = (i / INDUSTRIES.length) * Math.PI * 2 - Math.PI / 2;
              const radius = 38;
              const x = 50 + Math.cos(angle) * radius;
              const y = 50 + Math.sin(angle) * radius;
              const isActive = activeId === ind.id;
              return (
                <button
                  key={ind.id}
                  type="button"
                  onMouseEnter={() => setActiveId(ind.id)}
                  onMouseLeave={() => setActiveId(null)}
                  onFocus={() => setActiveId(ind.id)}
                  onBlur={() => setActiveId(null)}
                  style={{ left: `${x}%`, top: `${y}%` }}
                  className="group absolute -translate-x-1/2 -translate-y-1/2"
                >
                  <div
                    className={`flex flex-col items-center gap-2 transition-all duration-300 ${
                      isActive ? "scale-110" : "scale-100"
                    }`}
                  >
                    <div
                      className={`grid h-16 w-16 place-items-center rounded-2xl border backdrop-blur-md transition-all duration-300 ${
                        isActive
                          ? "border-[#e6c068] bg-[#e6c068]/20 shadow-[0_0_40px_rgba(230,192,104,.5)]"
                          : "border-[#d4a84a]/35 bg-[#0c1d44]/70 group-hover:border-[#e6c068]/70"
                      }`}
                    >
                      <ind.Icon
                        className={`h-7 w-7 transition-colors ${
                          isActive ? "text-white" : "text-[#e6c068]"
                        }`}
                      />
                    </div>
                    <span
                      className={`whitespace-nowrap text-xs font-medium transition-colors ${
                        isActive ? "text-white" : "text-[#9fb3d1]"
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

        {/* MOBILE: industry grid */}
        <div className="md:hidden">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-[11px] uppercase tracking-[0.25em] text-[#d4a84a]/80">
              صنایع تحت پوشش
            </div>
            <div className="text-[10px] text-[#6b7fa3]">برای جزئیات، لمس کنید</div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {INDUSTRIES.map((ind) => (
              <button
                key={ind.id}
                onClick={() => setSheetIndustry(ind)}
                className="group flex flex-col items-start gap-2.5 rounded-2xl border border-[#d4a84a]/25 bg-[#0c1d44]/70 p-3.5 text-right transition-colors active:scale-[0.98] active:bg-[#d4a84a]/10"
              >
                <div className="grid h-10 w-10 place-items-center rounded-xl border border-[#d4a84a]/35 bg-[#d4a84a]/10">
                  <ind.Icon className="h-5 w-5 text-[#e6c068]" />
                </div>
                <div className="text-[13px] font-semibold leading-tight text-white">
                  {ind.name}
                </div>
                <div className="line-clamp-2 text-[10.5px] leading-snug text-[#9fb3d1]">
                  {ind.product}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* bottom bar */}
      <div className="relative z-10 mx-auto max-w-7xl border-t border-[#d4a84a]/15 px-5 py-5 md:px-10">
        <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] text-[#6b7fa3] md:text-xs">
          <span>۶ صنعت کلیدی • ۲۴+ ماده اولیه تخصصی</span>
          <span className="hidden text-[#9fb3d1] md:inline">
            برای دیدن جزئیات، نشانگر را روی هر صنعت ببرید ←
          </span>
        </div>
      </div>


      {/* mobile sheet */}
      <Sheet open={!!sheetIndustry} onOpenChange={(o) => !o && setSheetIndustry(null)}>
        <SheetContent
          side="bottom"
          dir="rtl"
          className="rounded-t-3xl border-[#d4a84a]/25 bg-[#091a3d] text-[#e6ecf7]"
        >
          {sheetIndustry && (
            <>
              <SheetHeader className="text-right">
                <div className="mx-auto mb-2 h-1 w-10 rounded-full bg-[#d4a84a]/40" />
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-xl border border-[#d4a84a]/35 bg-[#d4a84a]/10">
                    <sheetIndustry.Icon className="h-6 w-6 text-[#e6c068]" />
                  </div>
                  <div>
                    <SheetTitle className="text-right text-lg text-white">
                      {sheetIndustry.name}
                    </SheetTitle>
                    <div className="text-xs text-[#9fb3d1]">{sheetIndustry.product}</div>
                  </div>
                </div>
              </SheetHeader>
              <div className="mt-6 space-y-2 pb-6">
                <div className="text-[11px] uppercase tracking-[0.2em] text-[#d4a84a]/80">
                  مواد اولیه
                </div>
                <ul className="divide-y divide-[#d4a84a]/15 rounded-xl border border-[#d4a84a]/20">
                  {sheetIndustry.materials.map((m) => (
                    <li key={m} className="flex items-center justify-between px-4 py-3 text-sm">
                      <span className="text-[#f0d78c]">{m}</span>
                      <span className="text-[10px] text-[#6b7fa3]">موجود</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </section>
  );
}
