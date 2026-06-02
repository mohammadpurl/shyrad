import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE } from "@/lib/constants";
import { getAllMaterialsList } from "@/lib/industries-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { MotionWrapper } from "@/components/ui/MotionWrapper";
import { MaterialCard } from "@/components/industries/MaterialCard";
import { CTASection } from "@/components/home/CTASection";

export const metadata: Metadata = createMetadata({
  title: "محصولات",
  description:
    "فهرست عناصر و مواد اولیه — اکسید کبالت، فلزات کمیاب خاکی، کائولن، سیلیکات زیکونیوم، اسید بوریک و سایر مواد صنعتی.",
  path: "/products",
});

export default function ProductsPage() {
  const materials = getAllMaterialsList();

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "خانه", url: SITE.url },
          { name: "محصولات", url: `${SITE.url}/products` },
        ])}
      />
      <PageHero
        title="عناصر و مواد اولیه"
        description="محصولات ما همان مواد تخصصی هستند که برای صنایع مختلف تأمین می‌کنیم"
        breadcrumb="محصولات"
      />

      <section className="py-20 lg:py-28">
        <div className="section-container">
          <MotionWrapper>
            <p className="mx-auto mb-12 max-w-3xl text-center text-base leading-relaxed text-muted lg:text-lg">
              {SITE.name} عناصر و ترکیبات شیمیایی مورد نیاز خطوط تولید سرامیک،
              شیشه، لعاب، چینی بهداشتی و باطری را با استانداردهای بین‌المللی
              تأمین می‌کند. هر محصول در چندین صنعت کاربرد دارد و جزئیات فنی آن
              در صفحه اختصاصی در دسترس است.
            </p>
          </MotionWrapper>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {materials.map((material, index) => (
              <MaterialCard
                key={material.slug}
                title={material.title}
                image={material.image}
                href={material.href}
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
