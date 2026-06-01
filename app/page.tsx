import { HeroSection } from "@/components/home/HeroSection";
import { MaterialsMarquee } from "@/components/home/MaterialsMarquee";
import { IndustriesSection } from "@/components/home/IndustriesSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { GlobalWhySection } from "@/components/home/GlobalWhySection";
import { CTASection } from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MaterialsMarquee />
      <IndustriesSection />
      <ProcessSection />
      <GlobalWhySection />
      <CTASection />
    </>
  );
}
