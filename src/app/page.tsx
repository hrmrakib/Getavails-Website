import { ContactSection } from "@/components/contact/ContactSection";
import { BlogInsightsSection } from "@/components/home/BlogInsightsSection";
import { ComprehensiveFeaturesSection } from "@/components/home/ComprehensiveFeaturesSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { HeroSection } from "@/components/home/Hero";
import CarouselCards from "@/components/home/ok";
import { PricingSection } from "@/components/home/PricingSection";
import { RoleSelectionSection } from "@/components/home/RoleSelectionSection";
import React from "react";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <CarouselCards />
      <ComprehensiveFeaturesSection />
      <RoleSelectionSection />
      <PricingSection />
      <BlogInsightsSection />
      <ContactSection />
    </div>
  );
};

export default HomePage;
