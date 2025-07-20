import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Section, SectionTitle } from '@/components/Section';

const testimonialKeys = ['client_1', 'client_2', 'client_3'];

export function TestimonialsSection() {
  const { t } = useTranslation();
  
  const testimonials = testimonialKeys.map(key => ({
    name: t(`testimonials_${key}_name`),
    company: t(`testimonials_${key}_company`),
  }));

  return (
    <Section id="testimonials" parallax>
      <SectionTitle>
        {t('testimonials_title')} <span className="gradient-text-purple-teal">{t('testimonials_title_highlight')}</span>
      </SectionTitle>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="h-full glass-panel">
              <CardContent className="p-8">
                <div className="flex text-amber-gold mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
                </div>
                <p className="text-muted-foreground italic mb-6">{t('testimonials_quote')}</p>
                <div>
                  <p className="font-bold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}