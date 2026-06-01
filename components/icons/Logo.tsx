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
      <Image
        src="/images/Logo.png"
        alt={SITE.name}
        width={48}
        height={48}
        className="size-11 shrink-0 object-contain sm:size-12"
        priority
      />

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
