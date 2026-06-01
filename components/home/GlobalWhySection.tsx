"use client";

import Image from "next/image";
import {
  Ship,
  BadgeCheck,
  Clock,
  Headphones,
  type LucideIcon,
} from "lucide-react";
import { WHY_CHOOSE_US, SITE } from "@/lib/constants";
import { MotionWrapper } from "@/components/ui/MotionWrapper";

const iconMap: Record<string, LucideIcon> = {
  ship: Ship,
  "badge-check": BadgeCheck,
  clock: Clock,
  headphones: Headphones,
};

export function WhyChooseUsCard() {
  return (
    <MotionWrapper variant="scaleIn" className="h-full">
      <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-navy-dark p-8 card-shadow-lg lg:p-10">
        <h2
          id="why-us-heading"
          className="mb-8 text-xl font-bold text-white lg:text-2xl"
        >
          چرا {SITE.name}؟
        </h2>

        <div className="flex flex-1 flex-col divide-y divide-white/10">
          {WHY_CHOOSE_US.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <article
                key={item.title}
                className="flex items-start gap-4 py-5 first:pt-0 last:pb-0"
              >
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-gold/15">
                  <Icon className="size-6 text-gold" aria-hidden />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-white">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/65">
                    {item.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </MotionWrapper>
  );
}

export function GlobalNetworkMap() {
  return (
    <MotionWrapper variant="fadeIn" className="h-full">
      <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-[#f0f4f8] p-6 lg:p-8">
        <div className="mb-6 text-center">
          <h2
            id="global-supply-heading"
            className="text-2xl font-bold text-navy lg:text-3xl"
          >
            تأمین جهانی
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted lg:text-base">
            همکاری با برترین تولیدکنندگان مواد اولیه در سراسر جهان
          </p>
        </div>

        <div className="relative min-h-[280px] flex-1 sm:min-h-[340px] lg:min-h-[400px]">
          <Image
            src="/images/network.png"
            alt="نقشه شبکه تأمین جهانی از ایران به آلمان، ایتالیا، ترکیه، چین، هند و اسپانیا"
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-contain object-center"
          />
        </div>
      </div>
    </MotionWrapper>
  );
}

export function GlobalWhySection() {
  return (
    <section className="overflow-hidden bg-white" aria-label="تأمین جهانی">
      <div className="section-container py-20 lg:py-28">
        <div className="grid items-stretch gap-8 lg:grid-cols-5 lg:gap-10">
          {/* RTL: ستون اول = سمت راست — کارت مزایا */}
          <div className="lg:col-span-2">
            <WhyChooseUsCard />
          </div>

          {/* RTL: ستون دوم = سمت چپ — نقشه شبکه */}
          <div className="lg:col-span-3">
            <GlobalNetworkMap />
          </div>
        </div>
      </div>
    </section>
  );
}
