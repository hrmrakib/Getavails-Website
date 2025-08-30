import { ContactHeroSection } from "@/components/contact/ContactHeroSection";
import { ContactInfoSection } from "@/components/contact/ContactInfoSection";
import { GlobalReachSection } from "@/components/contact/GlobalReachSection";

export default function ContactPage() {
  return (
    <div>
      <ContactHeroSection />
      <ContactInfoSection />
      <GlobalReachSection />
    </div>
  );
}
