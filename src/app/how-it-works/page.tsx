import { AIAssistantSection } from "@/components/how-it-works/AiAssistantSection";
import { HowItWorksHeroSection } from "@/components/how-it-works/HowItWorksHeroSection";
import { RoleJourneySection } from "@/components/how-it-works/RoleJourneySection";

export default function HowItWorksPage() {
  return (
    <div>
      <HowItWorksHeroSection />
      <RoleJourneySection />
      <AIAssistantSection />
    </div>
  );
}
