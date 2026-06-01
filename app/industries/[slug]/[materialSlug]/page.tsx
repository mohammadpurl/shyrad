import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE } from "@/lib/constants";
import {
  getAllMaterialPaths,
  getIndustryBySlug,
  getMaterialBySlug,
  isMaterialInIndustry,
} from "@/lib/industries-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { MotionWrapper } from "@/components/ui/MotionWrapper";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/home/CTASection";
import { ArrowRight, CheckCircle2 } from "lucide-react";

type Props = {
  params: Promise<{ slug: string; materialSlug: string }>;
};

export async function generateStaticParams() {
  return getAllMaterialPaths().map(({ industry, material }) => ({
    slug: industry,
    materialSlug: material,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, materialSlug } = await params;
  const material = getMaterialBySlug(materialSlug);
  const industry = getIndustryBySlug(slug);
  if (!material || !industry) return {};

  return createMetadata({
    title: `${material.title} — ${industry.title}`,
    description: material.description,
    path: `/industries/${slug}/${materialSlug}`,
  });
}

export default async function MaterialPage({ params }: Props) {
  const { slug, materialSlug } = await params;
  const industry = getIndustryBySlug(slug);
  const material = getMaterialBySlug(materialSlug);

  if (!industry || !material || !isMaterialInIndustry(slug, materialSlug)) {
    notFound();
  }

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "خانه", url: SITE.url },
          { name: "صنایع", url: `${SITE.url}/industries` },
          { name: industry.title, url: `${SITE.url}/industries/${slug}` },
          {
            name: material.title,
            url: `${SITE.url}/industries/${slug}/${materialSlug}`,
          },
        ])}
      />

      <article className="pt-32 pb-20 xl:pt-28">
        <div className="section-container">
          <nav className="mb-8 flex flex-wrap items-center gap-2 text-sm text-muted">
            <Link href="/industries" className="hover:text-gold">
              صنایع
            </Link>
            <span aria-hidden>/</span>
            <Link href={`/industries/${slug}`} className="hover:text-gold">
              {industry.shortTitle}
            </Link>
            <span aria-hidden>/</span>
            <span className="text-gold">{material.title}</span>
          </nav>

          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <MotionWrapper variant="scaleIn">
              <div className="overflow-hidden rounded-3xl shadow-[0_20px_60px_rgba(8,43,99,0.18)]">
                <div className="relative aspect-square sm:aspect-[4/3]">
                  <Image
                    src={material.image}
                    alt={material.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </MotionWrapper>

            <MotionWrapper delay={0.1}>
              <span className="text-sm font-bold text-gold">{industry.title}</span>
              <h1 className="mt-3 text-3xl font-bold text-navy sm:text-4xl">
                {material.title}
              </h1>
              <p className="mt-6 text-base leading-relaxed text-muted lg:text-lg">
                {material.description}
              </p>

              {material.specs && material.specs.length > 0 && (
                <div className="mt-8">
                  <h2 className="mb-4 text-sm font-bold text-navy">
                    مشخصات و مزایا
                  </h2>
                  <ul className="space-y-3">
                    {material.specs.map((spec) => (
                      <li
                        key={spec}
                        className="flex items-center gap-2 text-sm text-muted"
                      >
                        <CheckCircle2
                          className="size-4 shrink-0 text-gold"
                          aria-hidden
                        />
                        {spec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button href="/contact" variant="gold">
                  استعلام قیمت
                </Button>
                <Link
                  href={`/industries/${slug}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-navy/15 px-6 py-3 text-sm font-bold text-navy transition-colors hover:border-gold hover:text-gold"
                >
                  <ArrowRight className="size-4" />
                  سایر مواد این صنعت
                </Link>
              </div>
            </MotionWrapper>
          </div>
        </div>
      </article>

      <CTASection />
    </>
  );
}
