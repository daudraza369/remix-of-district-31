import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { WhyChooseUsSection } from '@/components/sections/WhyChooseUsSection';
import { CollectionPreviewSection } from '@/components/sections/CollectionPreviewSection';
import { ClientLogosSection } from '@/components/sections/ClientLogosSection';
import { PortfolioSection } from '@/components/sections/PortfolioSection';
import { TreeConsultationPreview } from '@/components/sections/TreeConsultationPreview';
import { ContactSection } from '@/components/sections/ContactSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-ivory">
      <Header />
      <main>
        {/* 1. Hero with slider */}
        <HeroSection />
        {/* 2. Trusted by Leading Brands */}
        <ClientLogosSection />
        {/* 3. Why Clients Choose District */}
        <WhyChooseUsSection />
        {/* 4. Tree Solutions highlight */}
        <TreeConsultationPreview />
        {/* 5. Our Collection */}
        <CollectionPreviewSection />
        {/* 6. Portfolio */}
        <PortfolioSection />
        {/* Contact for CTA */}
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
