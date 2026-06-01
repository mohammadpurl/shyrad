"use client";

import {
  Globe,
  BadgeCheck,
  Truck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { WHY_CHOOSE_US, SITE } from "@/lib/constants";
import { MotionWrapper } from "@/components/ui/MotionWrapper";

const iconMap: Record<string, LucideIcon> = {
  globe: Globe,
  "badge-check": BadgeCheck,
  truck: Truck,
  users: Users,
};

type WhyChooseUsSectionProps = {
  embedded?: boolean;
};

export function WhyChooseUsSection({ embedded = false }: WhyChooseUsSectionProps) {
  const card = (
    <MotionWrapper variant="scaleIn">
      <div className="overflow-hidden rounded-3xl bg-navy-dark p-8 card-shadow-lg sm:p-10 lg:p-12">
        <div className="mb-8 max-w-xl">
          <span className="mb-3 inline-block text-sm font-bold text-gold">
            مزیت رقابتی
          </span>
          <h2
            id="why-us-heading"
            className="text-2xl font-bold text-white sm:text-3xl"
          >
            چرا {SITE.name}؟
          </h2>
          <p className="mt-4 text-white/70">
            ترکیبی از تجربه، شبکه جهانی و تعهد به کیفیت
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {WHY_CHOOSE_US.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <article
                key={item.title}
                className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:border-gold/30"
              >
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gold/15">
                  <Icon className="size-5 text-gold" aria-hidden />
                </div>
                <div>
                  <h3 className="mb-1.5 font-bold text-white">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-white/65">
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

  if (embedded) return card;

  return (
    <section className="py-20 lg:py-28" aria-labelledby="why-us-heading">
      <div className="section-container">{card}</div>
    </section>
  );
}
