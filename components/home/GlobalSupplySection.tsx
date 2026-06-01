"use client";

import { motion } from "framer-motion";
import { SUPPLY_COUNTRIES } from "@/lib/constants";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MotionWrapper } from "@/components/ui/MotionWrapper";

const IRAN = { x: 58, y: 42 };

type GlobalSupplySectionProps = {
  embedded?: boolean;
};

export function GlobalSupplySection({ embedded = false }: GlobalSupplySectionProps) {
  const content = (
    <>
      {!embedded && (
        <MotionWrapper>
          <SectionHeading
            label="تأمین جهانی"
            title="شبکه تأمین بین‌المللی"
            description="همکاری با معتبرترین تأمین‌کنندگان اروپا و آسیا"
          />
        </MotionWrapper>
      )}

      {embedded && (
        <MotionWrapper>
          <SectionHeading
            label="تأمین جهانی"
            title="شبکه تأمین بین‌المللی"
            align="start"
          />
        </MotionWrapper>
      )}

      <MotionWrapper variant="scaleIn" className="relative mx-auto max-w-4xl">
          <div className="overflow-hidden rounded-3xl border border-navy/5 bg-background p-6 card-shadow-lg sm:p-10">
            <svg
              viewBox="0 0 100 60"
              className="w-full"
              role="img"
              aria-label="نقشه شبکه تأمین جهانی از ایران به کشورهای آلمان، ایتالیا، ترکیه، چین، هند و اسپانیا"
            >
              {/* Simplified world map grid */}
              <defs>
                <pattern
                  id="grid"
                  width="4"
                  height="4"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 4 0 L 0 0 0 4"
                    fill="none"
                    stroke="#082B63"
                    strokeWidth="0.08"
                    opacity="0.15"
                  />
                </pattern>
              </defs>
              <rect width="100" height="60" fill="url(#grid)" rx="2" />

              {/* Continents simplified */}
              <ellipse cx="25" cy="25" rx="12" ry="10" fill="#082B63" opacity="0.06" />
              <ellipse cx="50" cy="22" rx="10" ry="8" fill="#082B63" opacity="0.06" />
              <ellipse cx="72" cy="28" rx="18" ry="14" fill="#082B63" opacity="0.06" />
              <ellipse cx="58" cy="42" rx="6" ry="5" fill="#082B63" opacity="0.12" />

              {/* Supply routes */}
              {SUPPLY_COUNTRIES.map((country, i) => (
                <motion.path
                  key={country.code}
                  d={`M ${IRAN.x} ${IRAN.y} Q ${(IRAN.x + country.x) / 2} ${IRAN.y - 8} ${country.x} ${country.y}`}
                  fill="none"
                  stroke="#D8A43A"
                  strokeWidth="0.4"
                  strokeDasharray="1 0.5"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.8 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: i * 0.15 }}
                />
              ))}

              {/* Iran hub */}
              <circle cx={IRAN.x} cy={IRAN.y} r="2.5" fill="#082B63" />
              <circle cx={IRAN.x} cy={IRAN.y} r="1.2" fill="#D8A43A" />
              <text
                x={IRAN.x}
                y={IRAN.y + 4.5}
                textAnchor="middle"
                fontSize="2.2"
                fill="#082B63"
                fontWeight="bold"
              >
                ایران
              </text>

              {/* Country markers */}
              {SUPPLY_COUNTRIES.map((country) => (
                <g key={country.code}>
                  <circle
                    cx={country.x}
                    cy={country.y}
                    r="1.8"
                    fill="#D8A43A"
                    stroke="#082B63"
                    strokeWidth="0.3"
                  />
                  <text
                    x={country.x}
                    y={country.y + 3.5}
                    textAnchor="middle"
                    fontSize="1.8"
                    fill="#082B63"
                  >
                    {country.name}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </MotionWrapper>
    </>
  );

  if (embedded) return content;

  return (
    <section
      className="bg-white py-20 lg:py-28"
      aria-labelledby="global-supply-heading"
    >
      <div className="section-container">{content}</div>
    </section>
  );
}
