import Image from "next/image";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/constants";

type LogoProps = {
  variant?: "light" | "dark";
  className?: string;
};

export function Logo({ variant = "dark", className }: LogoProps) {
  const isLight = variant === "light";

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="relative flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#061230] ring-1 ring-gold/35 sm:size-12">
        <Image
          src={SITE.logo}
          alt={SITE.name}
          width={48}
          height={48}
          className="size-full object-contain p-1"
          priority
        />
      </div>

      <div className="flex flex-col leading-tight">
        <span
          className={cn(
            "text-sm font-bold tracking-wide",
            isLight ? "text-white" : "text-navy"
          )}
        >
          {SITE.name}
        </span>
        <span
          className={cn(
            "text-[10px] tracking-widest uppercase",
            isLight ? "text-white/60" : "text-muted"
          )}
        >
          {SITE.nameEn}
        </span>
      </div>
    </div>
  );
}
