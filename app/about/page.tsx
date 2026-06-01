import type { Metadata } from "next";
import Image from "next/image";
import { createMetadata } from "@/lib/metadata";
import { breadcrumbSchema } from "@/lib/schema";
import { SITE } from "@/lib/constants";
import { JsonLd } from "@/components/seo/JsonLd";
import { PageHero } from "@/components/ui/PageHero";
import { MotionWrapper } from "@/components/ui/MotionWrapper";
import { StatsSection } from "@/components/home/StatsSection";
import { WhyChooseUsSection } from "@/components/home/WhyChooseUsSection";
import { CTASection } from "@/components/home/CTASection";

export const metadata: Metadata = createMetadata({
  title: "درباره ما",
  description:
    "شرکت بین‌المللی شایراد تجارت پارس — بیش از ۳۰ سال تجربه در تأمین مواد اولیه صنعتی.",
  path: "/about",
});

const aboutParagraphs = [
  "شرکت بین‌المللی شایراد تجارت پارس با بیش از ۳۰ سال تجربه، در تأمین مواد اولیه برای صنایع مختلف از جمله سرامیک، کاشی، پوشش‌ها، رزین‌ها، نسوزها، ریخته‌گری فولاد و شیشه تخصص دارد. این شرکت با بیش از ۱۰۰ واحد تولیدی در بخش‌های گوناگون همکاری داشته و همواره در تلاش است تا مواد اولیه باکیفیت را از تولیدکنندگان معتبر بین‌المللی تأمین نماید.",
  "شایراد تجارت پارس همچنین راهکارهای فنی نوآورانه ارائه می‌دهد، به کاهش هزینه‌های تولید کمک می‌کند و کیفیت محصولات نهایی را بهبود می‌بخشد.",
  "این شرکت با دفاتری در امارات متحده عربی، متعهد به ارائه بهترین خدمات به شرکای تجاری خود است. به عنوان یک شرکت بازرگانی بین‌المللی، شایراد تجارت پارس توانسته است در بازارهای داخلی و خارجی شهرتی قابل اعتماد کسب کند و روابطی سودمند و پایدار با مشتریان خود برقرار سازد.",
];

const ceoParagraphs = [
  "شرکت بین‌المللی شایراد تجارت پارس با رویکرد تأمین مواد اولیه معدنی مورد نیاز صنایع برتر کشور تأسیس گردید و در طول مدت فعالیتش، خود را متعهد به ارائه بهترین کالاها و خدمات به مشتریان دانسته است.",
  "این شرکت همواره قصد دارد تا فعالیت‌های بین‌المللی حرفه‌ای خود را گسترش داده و همیشه قدردان حمایت‌های مستمر مشتریان وفادارش بوده و خواهد بود.",
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "خانه", url: SITE.url },
          { name: "درباره ما", url: `${SITE.url}/about` },
        ])}
      />
      <PageHero
        title="درباره شایراد تجارت پارس"
        description="پیشرو در تأمین مواد اولیه صنعتی با استانداردهای بین‌المللی"
        breadcrumb="درباره ما"
      />

      <section className="py-20 lg:py-28">
        <div className="section-container">
          <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
            <MotionWrapper>
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl card-shadow-lg">
                <Image
                  src="/images/landingpage.png"
                  alt="شایراد تجارت پارس"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </MotionWrapper>

            <MotionWrapper delay={0.1}>
              <article className="max-w-none">
                {aboutParagraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className={`leading-relaxed text-muted lg:text-lg ${
                      index > 0 ? "mt-5" : ""
                    }`}
                  >
                    {paragraph}
                  </p>
                ))}
              </article>
            </MotionWrapper>
          </div>
        </div>
      </section>

      <section className="border-t border-navy/5 bg-white py-20 lg:py-28">
        <div className="section-container">
          <MotionWrapper>
            <article className="mx-auto max-w-3xl rounded-3xl border border-navy/5 bg-background p-8 card-shadow-lg sm:p-10 lg:p-12">
              <h2 className="text-2xl font-bold text-navy sm:text-3xl">
                یادداشت مدیرعامل
              </h2>

              <div className="mt-8 space-y-5">
                {ceoParagraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className="leading-relaxed text-muted lg:text-lg"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              <p className="mt-8 text-base font-medium text-navy">با سپاس</p>

              <footer className="mt-10 border-t border-navy/10 pt-8">
                <p className="text-sm font-bold text-gold">مدیر عامل</p>
                <p className="mt-2 text-lg font-bold text-navy">شهراد اتحادی</p>
                <div className="mt-4">
                  <Image
                    src="/images/sign.jpg"
                    alt="امضای شهراد اتحادی، مدیرعامل شایراد تجارت پارس"
                    width={220}
                    height={80}
                    className="h-auto w-44 object-contain sm:w-52"
                  />
                </div>
              </footer>
            </article>
          </MotionWrapper>
        </div>
      </section>

      <StatsSection />
      <WhyChooseUsSection />
      <CTASection />
    </>
  );
}
