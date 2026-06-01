import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE } from "@/lib/constants";
import {
  getAllIndustrySlugs,
  getIndustryBySlug,
  getIndustryMaterials,
} from "@/lib/industries-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { MaterialCard } from "@/components/industries/MaterialCard";
import { MotionWrapper } from "@/components/ui/MotionWrapper";
import { CTASection } from "@/components/home/CTASection";
import { ArrowRight } from "lucide-react";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllIndustrySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) return {};

  return createMetadata({
    title: industry.title,
    description: industry.description,
    path: `/industries/${slug}`,
  });
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params;
  const industry = getIndustryBySlug(slug);
  if (!industry) notFound();

  const materials = getIndustryMaterials(slug);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "خانه", url: SITE.url },
          { name: "صنایع", url: `${SITE.url}/industries` },
          { name: industry.title, url: `${SITE.url}/industries/${slug}` },
        ])}
      />

      <PageHero
        title={industry.title}
        description={industry.description}
        image={industry.image}
        breadcrumb="صنایع"
      />

      <section className="py-16 lg:py-24">
        <div className="section-container">
          <nav className="mb-8">
            <Link
              href="/industries"
              className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-gold"
            >
              <ArrowRight className="size-4" />
              بازگشت به صنایع
            </Link>
          </nav>

          <MotionWrapper>
            <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <span className="text-sm font-bold text-gold">مواد اولیه</span>
                <h2 className="mt-2 text-2xl font-bold text-navy lg:text-3xl">
                  عناصر و مواد {industry.shortTitle}
                </h2>
              </div>
              <p className="max-w-md text-sm text-muted">
                {materials.length} ماده تأمینی — برای مشاهده جزئیات فنی روی هر
                کارت کلیک کنید
              </p>
            </div>
          </MotionWrapper>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
            {materials.map((material, index) => (
              <MaterialCard
                key={material.slug}
                title={material.title}
                image={material.image}
                href={`/industries/${slug}/${material.slug}`}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-navy/5 bg-white py-16">
        <div className="section-container">
          <div className="relative aspect-[21/9] overflow-hidden rounded-3xl card-shadow-lg">
            <Image
              src={industry.image}
              alt={industry.title}
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-navy-dark/60" />
            <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
              <p className="max-w-2xl text-lg leading-relaxed text-white/90">
                {SITE.name} با بیش از ۳۰ سال تجربه، مواد اولیه {industry.title}{" "}
                را با استانداردهای بین‌المللی و پشتیبانی فنی تأمین می‌کند.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
