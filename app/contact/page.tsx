import type { Metadata } from "next";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema, localBusinessSchema } from "@/lib/schema";
import { SITE } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { MotionWrapper } from "@/components/ui/MotionWrapper";
import { ContactForm, ContactInfo } from "@/components/contact/ContactForm";

export const metadata: Metadata = createMetadata({
  title: "تماس با ما",
  description: `تماس با ${SITE.name} — استعلام قیمت، مشاوره فنی و همکاری تجاری.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "خانه", url: SITE.url },
            { name: "تماس با ما", url: `${SITE.url}/contact` },
          ]),
          localBusinessSchema(),
        ]}
      />
      <PageHero
        title="تماس با ما"
        description="برای استعلام قیمت و مشاوره رایگان با ما در ارتباط باشید"
        breadcrumb="تماس با ما"
      />

      <section className="py-20 lg:py-28" id="consultation">
        <div className="section-container">
          <div className="grid gap-12 lg:grid-cols-5">
            <MotionWrapper className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-navy">اطلاعات تماس</h2>
              <p className="mt-4 leading-relaxed text-muted">
                تیم پشتیبانی {SITE.name} آماده پاسخگویی به سوالات فنی و
                تجاری شماست.
              </p>
              <div className="mt-8">
                <ContactInfo />
              </div>
            </MotionWrapper>

            <MotionWrapper delay={0.1} className="lg:col-span-3">
              <ContactForm />
            </MotionWrapper>
          </div>
        </div>
      </section>
    </>
  );
}
