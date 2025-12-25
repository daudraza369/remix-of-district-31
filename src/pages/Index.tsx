import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/layout/WhatsAppButton';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProblemFramingSection } from '@/components/sections/ProblemFramingSection';
import { SectionDivider } from '@/components/sections/SectionDivider';
import { ExpertQuotesCarousel } from '@/components/sections/ExpertQuotesCarousel';
import { OurApproachSection } from '@/components/sections/OurApproachSection';
import { WhyChooseUsSection } from '@/components/sections/WhyChooseUsSection';
import { ClientLogosSection } from '@/components/sections/ClientLogosSection';
import { StatsSection } from '@/components/sections/StatsSection';
import { PortfolioSection } from '@/components/sections/PortfolioSection';
import { DifferentiationSection } from '@/components/sections/DifferentiationSection';
import { TreeConsultationPreview } from '@/components/sections/TreeConsultationPreview';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { useEffect } from 'react';

const Index = () => {
  // Smooth scroll behavior enhancement
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen bg-ivory">
      <Header />
      <main>
        {/* Hero - Emotional hook, primary value proposition */}
        <HeroSection />
        
        {/* Trust signals - Social proof early */}
        <ClientLogosSection />
        
        {/* Problem framing - Create urgency */}
        <ProblemFramingSection />
        
        {/* Interactive divider */}
        <SectionDivider transitionText="But the research goes deeper" />
        
        {/* Expert quotes carousel */}
        <ExpertQuotesCarousel />
        
        {/* Solution - Our unique approach */}
        <OurApproachSection />
        
        {/* Why us - Differentiators */}
        <WhyChooseUsSection />
        
        {/* Stats - Credibility with numbers */}
        <StatsSection />
        
        {/* Portfolio - Visual proof */}
        <PortfolioSection />
        
        {/* Differentiation - Comparison with competitors */}
        <DifferentiationSection />
        
        {/* Tree solutions preview - Specific offering */}
        <TreeConsultationPreview />
        
        {/* Testimonials - Voice of customer */}
        <TestimonialsSection />
        
        {/* CTA - Conversion point */}
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;