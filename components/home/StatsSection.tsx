import { STATS } from "@/lib/constants";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { MotionWrapper } from "@/components/ui/MotionWrapper";

export function StatsSection() {
  return (
    <section
      className="border-y border-navy/5 bg-white py-16 lg:py-20"
      aria-label="آمار و دستاوردها"
    >
      <div className="section-container">
        <MotionWrapper>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12">
            {STATS.map((stat) => (
              <AnimatedCounter
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
                isText={"isText" in stat ? stat.isText : false}
              />
            ))}
          </div>
        </MotionWrapper>
      </div>
    </section>
  );
}
