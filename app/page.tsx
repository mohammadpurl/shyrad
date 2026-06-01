import { HeroSection } from "@/components/home/HeroSection";
import { IndustriesSection } from "@/components/home/IndustriesSection";
import { StatsSection } from "@/components/home/StatsSection";
import { ProcessSection } from "@/components/home/ProcessSection";
import { GlobalWhySection } from "@/components/home/GlobalWhySection";
import { CTASection } from "@/components/home/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <IndustriesSection />
      <StatsSection />
      <ProcessSection />
      <GlobalWhySection />
      <CTASection />
    </>
  );
}
