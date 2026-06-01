"use client";

import {
  Ship,
  BadgeCheck,
  Clock,
  Headphones,
  type LucideIcon,
} from "lucide-react";
import { WHY_CHOOSE_US, SITE } from "@/lib/constants";
import { MotionWrapper } from "@/components/ui/MotionWrapper";
import { WhyChooseUsCard } from "@/components/home/GlobalWhySection";

const iconMap: Record<string, LucideIcon> = {
  ship: Ship,
  "badge-check": BadgeCheck,
  clock: Clock,
  headphones: Headphones,
};

type WhyChooseUsSectionProps = {
  embedded?: boolean;
};

export function WhyChooseUsSection({ embedded = false }: WhyChooseUsSectionProps) {
  if (embedded) {
    return <WhyChooseUsCard />;
  }

  return (
    <section className="py-20 lg:py-28" aria-labelledby="why-us-heading">
      <div className="section-container">
        <WhyChooseUsCard />
      </div>
    </section>
  );
}

export { iconMap };
