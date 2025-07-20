import React from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { PricingSection } from '@/components/sections/PricingSection';
import { PortfolioSection } from './components/sections/PortfolioSection';
import { WhyItWorksSection } from '@/components/sections/WhyItWorksSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { HiringSection } from '@/components/sections/HiringSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/Footer';

function App() {
  const { t, i18n } = useTranslation();

  return (
    <div className="bg-background text-foreground">
      <Helmet htmlAttributes={{ lang: i18n.language }}>
        <title>{t('meta_title')}</title>
        <meta name="description" content={t('meta_description')} />
        <meta property="og:title" content={t('meta_title')} />
        <meta property="og:description" content={t('meta_description')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dioniscode.com/" />
      </Helmet>

      <Header />
      <main>
        <HeroSection />
        <PricingSection />
        <PortfolioSection />
        <WhyItWorksSection />
        <TestimonialsSection />
        <HiringSection />
        <ContactSection />
      </main>
      <Footer />
      
      <Toaster />
    </div>
  );
}

export default App;