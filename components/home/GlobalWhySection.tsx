import { GlobalSupplySection } from "@/components/home/GlobalSupplySection";
import { WhyChooseUsSection } from "@/components/home/WhyChooseUsSection";

export function GlobalWhySection() {
  return (
    <section className="overflow-hidden bg-white" aria-label="تأمین جهانی و مزایا">
      <div className="section-container py-20 lg:py-28">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <GlobalSupplySection embedded />
          <WhyChooseUsSection embedded />
        </div>
      </div>
    </section>
  );
}
