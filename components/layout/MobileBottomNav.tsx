"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Globe, LayoutGrid, PhoneCall } from "lucide-react";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

const WHATSAPP_URL = "https://wa.me/989121234567";

const navLinks = [
  { href: "/contact", label: "تماس با ما", icon: PhoneCall, match: "/contact" },
  { href: "/global-supply", label: "تأمین جهانی", icon: Globe, match: "/global-supply" },
  { href: "/industries", label: "صنایع", icon: LayoutGrid, match: "/industries" },
  { href: "/", label: "خانه", icon: Home, match: "/" },
] as const;

function isActive(pathname: string, match: string) {
  if (match === "/") return pathname === "/";
  return pathname.startsWith(match);
}

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 pt-2 xl:hidden"
      aria-label="ناوبری موبایل"
    >
      <div className="mx-auto flex max-w-md items-end justify-between rounded-full border border-white/10 bg-navy/85 px-2 py-2 shadow-[0_8px_32px_rgba(4,27,64,0.45)] backdrop-blur-md">
        {navLinks.slice(0, 2).map((item) => {
          const active = isActive(pathname, item.match);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex min-w-0 flex-1 flex-col items-center gap-1 px-1 py-1"
              aria-current={active ? "page" : undefined}
            >
              <span
                className={cn(
                  "relative flex size-9 items-center justify-center rounded-full transition-all",
                  active && "bg-white/15 shadow-[0_0_16px_rgba(255,255,255,0.35)]"
                )}
              >
                <Icon
                  className={cn(
                    "size-5 transition-colors",
                    active ? "text-white" : "text-white/70"
                  )}
                  strokeWidth={active ? 2.5 : 1.75}
                  aria-hidden
                />
              </span>
              <span
                className={cn(
                  "truncate text-[10px] font-medium leading-tight",
                  active ? "text-white" : "text-white/70"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group -mt-7 flex flex-col items-center gap-1"
          aria-label="واتساپ"
        >
          <span className="animate-pulse-gold flex size-14 items-center justify-center rounded-full bg-gold text-navy-dark shadow-[0_0_20px_rgba(216,164,58,0.55)] transition-transform group-active:scale-95">
            <WhatsAppIcon className="size-7" />
          </span>
          <span className="text-[10px] font-medium text-white/90">واتساپ</span>
        </a>

        {navLinks.slice(2).map((item) => {
          const active = isActive(pathname, item.match);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex min-w-0 flex-1 flex-col items-center gap-1 px-1 py-1"
              aria-current={active ? "page" : undefined}
            >
              <span
                className={cn(
                  "relative flex size-9 items-center justify-center rounded-full transition-all",
                  active && "bg-white/15 shadow-[0_0_16px_rgba(255,255,255,0.35)]"
                )}
              >
                <Icon
                  className={cn(
                    "size-5 transition-colors",
                    active ? "text-white" : "text-white/70"
                  )}
                  strokeWidth={active ? 2.5 : 1.75}
                  aria-hidden
                />
              </span>
              <span
                className={cn(
                  "truncate text-[10px] font-medium leading-tight",
                  active ? "text-white" : "text-white/70"
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
