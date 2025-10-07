import Navbar from "@/components/Navbar";
import AdvancedHeroSection from "@/components/AdvancedHeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import SafetyFeatures from "@/components/SafetyFeatures";
import ReferralBanner from "@/components/ReferralBanner";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <AdvancedHeroSection />
        <FeaturesSection />
        <SafetyFeatures />
        <div className="container mx-auto px-4 py-8">
          <ReferralBanner />
        </div>
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
