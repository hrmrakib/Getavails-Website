import React from "react";
import { CorePlatformSection } from "@/components/solutions/CorePlatformSection";
import { PlatformFeaturesSection } from "@/components/solutions/PlatformFeaturesSection";
import SolutionsHeroSection from "@/components/solutions/SolutionHero";

const SolutionsPage = () => {
  return (
    <div>
      <SolutionsHeroSection />
      <PlatformFeaturesSection />
      <CorePlatformSection />
    </div>
  );
};

export default SolutionsPage;
