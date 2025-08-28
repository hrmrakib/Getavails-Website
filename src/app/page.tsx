import { FeaturesSection } from "@/components/home/FeaturesSection";
import { HeroSection } from "@/components/home/Hero";
import CarouselCards from "@/components/home/ok";
import React from "react";

const HomePage = () => {
  return <div>
    <HeroSection />
    <FeaturesSection />
    <CarouselCards />
  </div>;
};

export default HomePage;
