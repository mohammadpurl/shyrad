import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "gold" | "white" | "outline";
  className?: string;
  external?: boolean;
};

const variants = {
  primary:
    "bg-navy text-white hover:bg-navy-dark shadow-md hover:shadow-lg",
  gold: "bg-gold text-navy-dark hover:bg-gold-light shadow-md hover:shadow-lg",
  white:
    "bg-white text-navy hover:bg-white/90 shadow-md hover:shadow-lg",
  outline:
    "border-2 border-white/30 text-white hover:border-gold hover:text-gold bg-transparent",
};

export function Button({
  href,
  children,
  variant = "primary",
  className,
  external,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-all duration-300",
    variants[variant],
    className
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {children}
        <ChevronLeft className="size-4" aria-hidden />
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
      <ChevronLeft className="size-4" aria-hidden />
    </Link>
  );
}
