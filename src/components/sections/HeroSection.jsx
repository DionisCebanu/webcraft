import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  const { t } = useTranslation();
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden parallax-bg">
      <div className="absolute inset-0 bg-gradient-to-br from-royal-purple/10 via-transparent to-electric-teal/10" />
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            {t('hero_title_1')}
            <br />
            <span className="gradient-text-purple-teal animated-underline">{t('hero_title_2')}</span> & <span className="gradient-text-purple-teal animated-underline">{t('hero_title_3')}</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
            {t('hero_subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => scrollToSection('contact')}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 text-lg shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow"
            >
              {t('hero_cta_quote')}
            </Button>
            <Button
              onClick={() => scrollToSection('portfolio')}
              variant="outline"
              size="lg"
              className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground font-semibold px-8 py-3 text-lg"
            >
              {t('hero_cta_portfolio')}
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}