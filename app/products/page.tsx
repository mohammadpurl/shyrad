import type { Metadata } from "next";
import Link from "next/link";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { PRODUCTS, SITE } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { MotionWrapper } from "@/components/ui/MotionWrapper";
import { CTASection } from "@/components/home/CTASection";
import { Package } from "lucide-react";

export const metadata: Metadata = createMetadata({
  title: "محصولات",
  description: "فهرست مواد اولیه صنعتی — ماسه سیلیس، سودا اش، کائولن، خاک نسوز و بیشتر.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "خانه", url: SITE.url },
          { name: "محصولات", url: `${SITE.url}/products` },
        ])}
      />
      <PageHero
        title="محصولات و مواد اولیه"
        description="تأمین مواد اولیه با استانداردهای بین‌المللی برای صنایع مختلف"
        breadcrumb="محصولات"
      />

      <section className="py-20 lg:py-28">
        <div className="section-container">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((product, index) => (
              <MotionWrapper key={product.slug} delay={index * 0.06}>
                <article
                  id={product.slug}
                  className="scroll-mt-28 flex h-full flex-col rounded-2xl border border-navy/5 bg-white p-6 card-shadow transition-shadow hover:card-shadow-lg"
                >
                  <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-navy/5">
                    <Package className="size-6 text-navy" aria-hidden />
                  </div>
                  <span className="text-xs font-bold text-gold">
                    {product.category}
                  </span>
                  <h2 className="mt-2 text-lg font-bold text-navy">
                    {product.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {product.description}
                  </p>
                  <Link
                    href="/contact"
                    className="mt-4 text-sm font-bold text-navy transition-colors hover:text-gold"
                  >
                    استعلام قیمت ←
                  </Link>
                </article>
              </MotionWrapper>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
