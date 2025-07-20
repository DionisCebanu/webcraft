import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { BarChart, TrendingUp, Zap, ShieldCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Section, SectionTitle } from '@/components/Section';

const featureKeys = [
  { icon: Zap, key: 'feature_1' },
  { icon: TrendingUp, key: 'feature_2' },
  { icon: BarChart, key: 'feature_3' },
  { icon: ShieldCheck, key: 'feature_4' },
];

export function WhyItWorksSection() {
  const { t } = useTranslation();

  const features = featureKeys.map(f => ({
    ...f,
    title: t(`why_${f.key}_title`),
    description: t(`why_${f.key}_desc`),
  }));

  return (
    <Section id="why-it-works">
      <SectionTitle>
        {t('why_title')} <span className="gradient-text-purple-teal">{t('why_title_highlight')}</span>
      </SectionTitle>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="h-full"
          >
            <Card className="h-full glass-panel text-center p-6 hover:border-primary transition-colors duration-300">
              <CardContent className="flex flex-col items-center">
                <div className="p-4 bg-primary/10 rounded-full mb-4">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}