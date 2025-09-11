import ContactFormSection from "@/components/contact/ContactFormSection";
import { AIAssistantInterface } from "@/components/home/AIAssistance";
import BlogInsightsSection from "@/components/home/BlogInsightsSection";
import { FeaturesSection } from "@/components/home/FeaturesSection";
import { HeroSection } from "@/components/home/Hero";
import { PricingSection } from "@/components/home/PricingSection";
import { RoleJourneySection } from "@/components/how-it-works/RoleJourneySection";
import { TestimonialsSection } from "@/components/services/TestimonialsSection";
import React from "react";

const HomePage = () => {
  return (
    <div className='bg-white'>
      <HeroSection />
      <FeaturesSection />
      <RoleJourneySection />
      <PricingSection />
      <TestimonialsSection />
      <BlogInsightsSection />
      <ContactFormSection />
      <AIAssistantInterface />
    </div>
  );
};

export default HomePage;
