import { DifferentiatingFeaturesSection } from "@/components/services/DifferentiatingFeaturesSection";
import { ServicesHeroSection } from "@/components/services/ServicesHeroSection";
import { ServicesOverviewSection } from "@/components/services/ServicesOverviewSection";
import { TestimonialsSection } from "@/components/services/TestimonialsSection";

export default function ServicesPage() {
  return (
    <div>
      <ServicesHeroSection />
      <ServicesOverviewSection />
      <DifferentiatingFeaturesSection />
      <TestimonialsSection />
    </div>
  );
}
