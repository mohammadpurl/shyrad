"use client";

import {
  Search,
  Handshake,
  ShieldCheck,
  Ship,
  Factory,
  type LucideIcon,
} from "lucide-react";
import { PROCESS_STEPS } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  MotionWrapper,
  StaggerContainer,
  StaggerItem,
} from "@/components/ui/MotionWrapper";

const iconMap: Record<string, LucideIcon> = {
  search: Search,
  handshake: Handshake,
  "shield-check": ShieldCheck,
  ship: Ship,
  factory: Factory,
};

export function ProcessSection() {
  return (
    <section className="py-20 lg:py-28" aria-labelledby="process-heading">
      <div className="section-container">
        <MotionWrapper>
          <SectionHeading
            label="فرآیند همکاری"
            title="فرآیند تأمین و همکاری"
            description="از تحلیل نیاز تا تحویل در کارخانه — مسیر شفاف و قابل پیگیری"
          />
        </MotionWrapper>

        <StaggerContainer className="relative">
          <div
            className="absolute top-10 hidden h-0.5 w-full border-t-2 border-dashed border-gold/40 lg:block"
            aria-hidden
          />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {PROCESS_STEPS.map((step, index) => {
              const Icon = iconMap[step.icon];
              return (
                <StaggerItem key={step.title}>
                  <article className="relative flex flex-col items-center text-center">
                    <div className="relative z-10 mb-4 flex size-16 items-center justify-center rounded-full bg-navy text-white ring-4 ring-background card-shadow">
                      <Icon className="size-7 text-gold" aria-hidden />
                      <span className="absolute -top-1 -right-1 flex size-6 items-center justify-center rounded-full bg-gold text-xs font-bold text-navy-dark">
                        {index + 1}
                      </span>
                    </div>
                    <h3 className="mb-2 text-base font-bold text-navy">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted">
                      {step.description}
                    </p>
                  </article>
                </StaggerItem>
              );
            })}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}
