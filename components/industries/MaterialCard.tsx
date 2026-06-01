"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

type MaterialCardProps = {
  title: string;
  image: string;
  href: string;
  index?: number;
};

export function MaterialCard({
  title,
  image,
  href,
  index = 0,
}: MaterialCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.55,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -8 }}
      className="group"
    >
      <Link
        href={href}
        className="block overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgba(8,43,99,0.12)] transition-shadow duration-500 hover:shadow-[0_20px_50px_rgba(8,43,99,0.22)]"
        aria-label={`مشاهده ${title}`}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/80 via-navy-dark/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-90" />
          <div className="absolute inset-x-0 bottom-0 p-5">
            <h3 className="text-lg font-bold text-white sm:text-xl">{title}</h3>
            <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-gold opacity-0 transition-all duration-300 group-hover:opacity-100">
              مشاهده جزئیات
              <ArrowLeft className="size-4" aria-hidden />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
