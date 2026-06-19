import HeroUniverse from "@/components/HeroUniverse";
import { MaterialsMarquee } from "@/components/home/MaterialsMarquee";
import { IndustriesSection } from "@/components/home/IndustriesSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { GlobalWhySection } from "@/components/home/GlobalWhySection";
import { CTASection } from "@/components/home/CTASection";
import IndustriesHero from "@/components/home/IndustriesHero";
import { getHeroIndustries } from "@/lib/hero-industries";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "شایراد تجارت پارس",
  alternateName: "Sayrad Tejarat Pars",
  url: "https://sayradtejarat.com",
  logo: "https://sayradtejarat.com/images/Logo.png",
  description: "تأمین مواد اولیه صنعتی با بیش از ۳۰ سال تجربه",
  address: {
    "@type": "PostalAddress",
    addressLocality: "تهران",
    addressCountry: "IR",
    streetAddress: "خیابان آفریقا، خیابان یزدان‌پناه، پلاک ۷۶",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+98-21-58695000",
      contactType: "sales",
      availableLanguage: "Persian",
    },
    {
      "@type": "ContactPoint",
      telephone: "+98-35-38410742",
      contactType: "sales",
      areaServed: "یزد",
      availableLanguage: "Persian",
    },
  ],
  sameAs: ["https://linkedin.com", "https://instagram.com"],
};

export default function HomePage() {
  const heroIndustries = getHeroIndustries();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* <HeroUniverse /> */}
      <IndustriesHero />

      <div className="sr-only" aria-hidden="true">
        <h1>شایراد تجارت پارس — تأمین مواد اولیه صنعتی</h1>
        <p>
          بیش از ۳۰ سال تجربه در واردات مستقیم مواد اولیه برای صنایع کاشی و
          سرامیک، شیشه، لعاب‌سازی، چینی بهداشتی، چینی ظروف و باطری‌سازی از
          آلمان، ایتالیا، اسپانیا، چین و ترکیه.
        </p>
        <ul>
          {heroIndustries.map((industry) => (
            <li key={industry.slug}>
              {industry.shortTitle}:{" "}
              {industry.materials.map((m) => m.title).join("، ")}
            </li>
          ))}
        </ul>
      </div>

      <MaterialsMarquee />
      <IndustriesSection />
      <ProcessSection />
      <GlobalWhySection />
      <CTASection />
    </>
  );
}
