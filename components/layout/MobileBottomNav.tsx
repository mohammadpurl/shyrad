"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  LayoutGrid,
  PhoneCall,
  Package,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

const WHATSAPP_URL = "https://wa.me/989121234567";

const MOBILE_NAV = [
  { href: "/", label: "خانه", icon: Home },
  { href: "/products", label: "محصولات", icon: Package },
  { href: "/industries", label: "صنایع", icon: LayoutGrid },
  { href: "/contact", label: "تماس", icon: PhoneCall },
] as const;

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

function NavItem({
  href,
  label,
  icon: Icon,
  pathname,
}: {
  href: string;
  label: string;
  icon: typeof Home;
  pathname: string;
}) {
  const active = isActive(pathname, href);

  return (
    <Link
      href={href}
      className="flex flex-col items-center gap-0.5 py-1"
      aria-current={active ? "page" : undefined}
    >
      <span
        className={cn(
          "flex size-8 items-center justify-center rounded-full transition-all sm:size-9",
          active && "bg-white/15 shadow-[0_0_16px_rgba(255,255,255,0.35)]"
        )}
      >
        <Icon
          className={cn(
            "size-[18px] sm:size-5",
            active ? "text-white" : "text-white/70"
          )}
          strokeWidth={active ? 2.5 : 1.75}
          aria-hidden
        />
      </span>
      <span
        className={cn(
          "text-[9px] font-medium leading-tight sm:text-[10px]",
          active ? "text-white" : "text-white/70"
        )}
      >
        {label}
      </span>
    </Link>
  );
}

export function MobileBottomNav() {
  const pathname = usePathname();
  const [leftA, leftB, rightA, rightB] = MOBILE_NAV;

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 px-3 pb-3 pt-2 sm:px-4 sm:pb-4 xl:hidden"
      aria-label="ناوبری سریع موبایل"
    >
      <div className="relative mx-auto max-w-lg rounded-full border border-white/10 bg-navy/90 px-2 py-2 shadow-[0_8px_32px_rgba(4,27,64,0.45)] backdrop-blur-md sm:px-3">
        <div className="grid grid-cols-5 items-end">
          <NavItem {...leftA} pathname={pathname} />
          <NavItem {...leftB} pathname={pathname} />

          <div className="flex justify-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group -mt-7 flex flex-col items-center gap-0.5 sm:-mt-8"
              aria-label="واتساپ"
            >
              <span className="animate-pulse-gold flex size-12 items-center justify-center rounded-full bg-gold text-navy-dark shadow-[0_0_20px_rgba(216,164,58,0.55)] transition-transform group-active:scale-95 sm:size-14">
                <WhatsAppIcon className="size-6 sm:size-7" />
              </span>
              <span className="text-[9px] font-medium text-white/90 sm:text-[10px]">
                واتساپ
              </span>
            </a>
          </div>

          <NavItem {...rightA} pathname={pathname} />
          <NavItem {...rightB} pathname={pathname} />
        </div>
      </div>
    </nav>
  );
}
