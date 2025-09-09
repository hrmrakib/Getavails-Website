import ContactFormSection from "@/components/contact/ContactFormSection";
import { HowItWorksHeroSection } from "@/components/how-it-works/HowItWorksHeroSection";
import ProcessFlow from "@/components/how-it-works/ProcessFlow";

export default function HowItWorksPage() {
  return (
    <div>
      <HowItWorksHeroSection />
      <ProcessFlow />
      <ContactFormSection />
    </div>
  );
}
