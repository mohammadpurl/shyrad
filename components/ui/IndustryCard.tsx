"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

type IndustryCardProps = {
  title: string;
  image: string;
  href: string;
  index?: number;
  variant?: "carousel" | "grid";
};

export function IndustryCard({
  title,
  image,
  href,
  index = 0,
  variant = "grid",
}: IndustryCardProps) {
  const isCarousel = variant === "carousel";

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={cn(
        "group relative shrink-0 overflow-hidden rounded-2xl",
        isCarousel
          ? "h-[300px] w-[82vw] max-w-[320px] snap-center sm:h-[340px] sm:w-[70vw] sm:max-w-[360px]"
          : "h-[380px] w-full lg:h-[420px] xl:h-[440px]"
      )}
    >
      <Link href={href} className="block h-full" aria-label={`مشاهده ${title}`}>
        <Image
          src={image}
          alt={title}
          fill
          sizes={
            isCarousel
              ? "(max-width: 640px) 82vw, 360px"
              : "(max-width: 1024px) 100vw, 33vw"
          }
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/90 via-navy-dark/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
          <h3 className="text-lg font-bold text-white sm:text-xl">{title}</h3>
          <motion.span
            className="mt-4 flex size-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white backdrop-blur-sm transition-colors group-hover:border-gold group-hover:bg-gold group-hover:text-navy-dark sm:size-11"
            whileHover={{ scale: 1.1 }}
          >
            <ArrowLeft className="size-4" aria-hidden />
          </motion.span>
        </div>
      </Link>
    </motion.article>
  );
}
