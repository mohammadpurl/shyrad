"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

type IndustryCardLinkProps = {
  title: string;
  description: string;
  image: string;
  href: string;
  index?: number;
};

export function IndustryCardLink({
  title,
  description,
  image,
  href,
  index = 0,
}: IndustryCardLinkProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6 }}
    >
      <Link
        href={href}
        className="group block overflow-hidden rounded-3xl bg-white shadow-[0_8px_30px_rgba(8,43,99,0.1)] transition-shadow duration-500 hover:shadow-[0_20px_48px_rgba(8,43,99,0.2)]"
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/85 via-navy-dark/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
            <h2 className="text-xl font-bold text-white lg:text-2xl">{title}</h2>
            <p className="mt-2 line-clamp-2 text-sm text-white/75">{description}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-gold">
              مشاهده مواد
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
