import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE, SUPPLY_COUNTRIES } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { GlobalSupplySection } from "@/components/home/GlobalSupplySection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { WhyChooseUsSection } from "@/components/home/WhyChooseUsSection";
import { CTASection } from "@/components/home/CTASection";
import { MotionWrapper } from "@/components/ui/MotionWrapper";

export const metadata: Metadata = createMetadata({
  title: "تأمین جهانی",
  description: "شبکه تأمین بین‌المللی از آلمان، ایتالیا، ترکیه، چین، هند و اسپانیا.",
  path: "/global-supply",
});

export default function GlobalSupplyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "خانه", url: SITE.url },
          { name: "تأمین جهانی", url: `${SITE.url}/global-supply` },
        ])}
      />
      <PageHero
        title="تأمین جهانی"
        description="دسترسی به معتبرترین تأمین‌کنندگان اروپا و آسیا"
        breadcrumb="تأمین جهانی"
      />

      <section className="py-16">
        <div className="section-container">
          <MotionWrapper>
            <p className="mx-auto max-w-3xl text-center text-lg leading-relaxed text-muted">
              {SITE.name} با شبکه گسترده تأمین‌کنندگان بین‌المللی، مواد
              اولیه با کیفیت ثابت و قیمت رقابتی را برای صنایع داخلی
              فراهم می‌کند. فرآیند واردات، گمرک و لجستیک به‌طور کامل
              توسط تیم ما مدیریت می‌شود.
            </p>
          </MotionWrapper>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {SUPPLY_COUNTRIES.map((country) => (
              <MotionWrapper key={country.code}>
                <article className="rounded-2xl border border-navy/5 bg-white p-6 text-center card-shadow">
                  <span className="text-2xl font-bold text-gold">{country.code}</span>
                  <h3 className="mt-2 font-bold text-navy">{country.name}</h3>
                  <p className="mt-2 text-sm text-muted">
                    تأمین‌کنندگان معتبر و بازرسی کیفیت در مبدأ
                  </p>
                </article>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </section>

      <GlobalSupplySection />
      <ProcessSection />
      <WhyChooseUsSection />
      <CTASection />
    </>
  );
}
