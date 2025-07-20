import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Check, FileText, Layers, DatabaseZap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Section, SectionTitle } from '@/components/Section';
import { Modal } from '@/components/Modal';

export function PricingSection() {
  const { t } = useTranslation();
  const [selectedPackage, setSelectedPackage] = useState(null);

  const pricingPackages = [
    {
      key: 'one_page',
      title: t('pricing_one_page_title'),
      price: t('pricing_one_page_price'),
      icon: FileText,
      color: "electric-teal",
      features: t('pricing_one_page_features').split(';'),
      details: {
        title: t('pricing_modal_one_page_title'),
        description: t('pricing_modal_one_page_desc'),
        included: t('pricing_modal_one_page_included').split(';'),
        delivery: t('pricing_modal_one_page_delivery')
      }
    },
    {
      key: 'multi_page',
      title: t('pricing_multi_page_title'),
      price: t('pricing_multi_page_price'),
      icon: Layers,
      color: "royal-purple",
      isFeatured: true,
      features: t('pricing_multi_page_features').split(';'),
      details: {
        title: t('pricing_modal_multi_page_title'),
        description: t('pricing_modal_multi_page_desc'),
        included: t('pricing_modal_multi_page_included').split(';'),
        delivery: t('pricing_modal_multi_page_delivery')
      }
    },
    {
      key: 'cms',
      title: t('pricing_cms_title'),
      price: t('pricing_cms_price'),
      icon: DatabaseZap,
      color: "amber-gold",
      features: t('pricing_cms_features').split(';'),
      details: {
        title: t('pricing_modal_cms_title'),
        description: t('pricing_modal_cms_desc'),
        included: t('pricing_modal_cms_included').split(';'),
        delivery: t('pricing_modal_cms_delivery')
      }
    },
  ];

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Section id="services">
        <SectionTitle>
          {t('pricing_title')} <span className="gradient-text-purple-teal">{t('pricing_title_highlight')}</span>
        </SectionTitle>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pricingPackages.map((pkg, index) => (
            <motion.div
              key={pkg.key}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Card className={`h-full flex flex-col group glass-panel hover:border-primary transition-all duration-300 ${pkg.isFeatured ? 'border-primary glow-effect' : 'border-transparent'}`}>
                <CardHeader className="items-center text-center">
                  <div className={`mb-4 p-4 rounded-full bg-primary/10`}>
                    <pkg.icon className={`w-8 h-8 text-${pkg.color}`} />
                  </div>
                  <CardTitle className="text-2xl">{pkg.title}</CardTitle>
                  <CardDescription className="text-xl font-semibold gradient-text-purple-teal">{pkg.price}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow p-6">
                  <ul className="space-y-4 mb-8 flex-grow">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <Check className="w-5 h-5 text-electric-teal mr-3 mt-1 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="space-y-3">
                    <Button onClick={() => setSelectedPackage(pkg.details)} variant="outline" className="w-full border-primary/50 text-primary/80 hover:bg-primary/10 hover:text-primary">
                      {t('pricing_whats_included')}
                    </Button>
                    <Button onClick={() => scrollToSection('contact')} className={`w-full font-bold text-white ${pkg.isFeatured ? 'bg-primary' : 'bg-muted-foreground/50'} group-hover:bg-primary transition-colors`}>
                      {t('pricing_cta')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      <Modal isOpen={!!selectedPackage} onClose={() => setSelectedPackage(null)} title={selectedPackage?.title}>
        {selectedPackage && (
          <div>
            <p className="text-muted-foreground mb-6">{selectedPackage.description}</p>
            <ul className="space-y-3 mb-6">
              {selectedPackage.included.map((item) => (
                <li key={item} className="flex items-start">
                  <Check className="w-5 h-5 text-electric-teal mr-3 mt-1 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="font-bold text-center bg-primary/10 text-primary py-2 px-4 rounded-lg">
              ⏱️ {selectedPackage.delivery}
            </p>
          </div>
        )}
      </Modal>
    </>
  );
}