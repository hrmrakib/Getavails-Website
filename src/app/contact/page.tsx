import ContactFormSection from "@/components/contact/ContactFormSection";
import { ContactHeroSection } from "@/components/contact/ContactHeroSection";
import { ContactInfoSection } from "@/components/contact/ContactInfoSection";
import { GlobalReachSection } from "@/components/contact/GlobalReachSection";

export default function ContactPage() {
  return (
    <div>
      <ContactHeroSection />
      <ContactInfoSection />
      <ContactFormSection haveLeft={false}/>
      <GlobalReachSection />
    </div>
  );
}
