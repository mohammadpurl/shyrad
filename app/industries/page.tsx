import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE } from "@/lib/constants";
import { INDUSTRIES_DATA } from "@/lib/industries-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { IndustryCardLink } from "@/components/industries/IndustryCardLink";
import { MotionWrapper } from "@/components/ui/MotionWrapper";
import { CTASection } from "@/components/home/CTASection";

export const metadata: Metadata = createMetadata({
  title: "صنایع",
  description:
    "راهکارهای تخصصی تأمین مواد اولیه برای صنایع کاشی، سرامیک، شیشه، لعاب، باطری و بیشتر.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "خانه", url: SITE.url },
          { name: "صنایع", url: `${SITE.url}/industries` },
        ])}
      />
      <PageHero
        title="صنایع تحت پوشش"
        description="مواد اولیه تخصصی برای هر صنعت — انتخاب صنعت برای مشاهده مواد"
        breadcrumb="صنایع"
      />

      <section className="py-20 lg:py-28">
        <div className="section-container">
          <MotionWrapper>
            <p className="mx-auto mb-12 max-w-2xl text-center text-muted lg:text-lg">
              هر صنعت مجموعه‌ای از مواد اولیه تخصصی دارد. روی هر کارت کلیک کنید
              تا مواد مرتبط را مشاهده کنید.
            </p>
          </MotionWrapper>

          <div className="grid gap-8 sm:grid-cols-2 lg:gap-10">
            {INDUSTRIES_DATA.map((industry, index) => (
              <IndustryCardLink
                key={industry.slug}
                title={industry.title}
                description={industry.description}
                image={industry.image}
                href={`/industries/${industry.slug}`}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
