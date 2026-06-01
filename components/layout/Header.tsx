"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/icons/Logo";
import { Button } from "@/components/ui/Button";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isHome = pathname === "/";
  const solidHeader = scrolled;
  const overHero = isHome && !scrolled;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        solidHeader
          ? "bg-white/95 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      )}
      role="banner"
    >
      <div className="section-container">
        <div className="flex h-16 items-center justify-between gap-4 lg:h-20">
          <Link
            href="/"
            className="shrink-0"
            aria-label={`${SITE.name} - صفحه اصلی`}
          >
            <Logo variant={overHero || !solidHeader ? "light" : "dark"} />
          </Link>

          <nav
            className="hidden items-center gap-1 xl:flex"
            aria-label="منوی اصلی"
          >
            {NAV_LINKS.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    overHero || !solidHeader
                      ? active
                        ? "text-gold"
                        : "text-white/90 hover:text-gold"
                      : active
                        ? "text-navy"
                        : "text-muted hover:text-navy"
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <a
              href={`tel:${SITE.phone.replace(/-/g, "")}`}
              className={cn(
                "flex items-center gap-2 text-sm font-medium transition-colors",
                overHero || !solidHeader
                  ? "text-white/90 hover:text-gold"
                  : "text-navy hover:text-gold"
              )}
              aria-label={`تماس: ${SITE.phoneDisplay}`}
            >
              <Phone className="size-4 text-gold" aria-hidden />
              <span dir="ltr">{SITE.phoneDisplay}</span>
            </a>
            <Button
              href="/contact"
              variant={overHero || !solidHeader ? "white" : "primary"}
            >
              استعلام قیمت
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
