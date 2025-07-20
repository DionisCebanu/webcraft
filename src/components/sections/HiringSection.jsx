import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Section } from '@/components/Section';

const techBadges = ['Laravel', 'React', 'MySQL', 'Tailwind', 'Git'];

export function HiringSection() {
  const { t } = useTranslation();

  return (
    <Section id="hiring" className="bg-primary/5">
      <div className="glass-panel rounded-2xl p-8 md:p-12 lg:p-16 overflow-hidden">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('hiring_title_1')} <span className="gradient-text-purple-teal animated-underline">{t('hiring_title_highlight')}</span> {t('hiring_title_2')}
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              {t('hiring_subtitle')}
            </p>
            <div className="mb-8">
              <h4 className="font-semibold mb-4">{t('hiring_tech_stack')}</h4>
              <div className="flex flex-wrap gap-3">
                {techBadges.map((tech) => (
                  <span key={tech} className="bg-primary/10 text-primary font-semibold px-4 py-2 rounded-lg text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
             <div className="mb-8">
                <h4 className="font-semibold mb-4">{t('hiring_certifications')}</h4>
                <div className="flex items-center gap-3 bg-amber-gold/10 text-amber-gold font-semibold px-4 py-2 rounded-lg text-sm w-fit">
                    <Award className="w-5 h-5" />
                    <span>{t('hiring_certifications_placeholder')}</span>
                </div>
            </div>
            <Button asChild size="lg" className="group bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold shadow-lg shadow-secondary/20 hover:shadow-secondary/40 transition-all duration-300 hover:scale-105">
              <a href="https://dioniscode.com/" target="_blank" rel="noopener noreferrer">
                {t('hiring_cta')}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="hidden md:block"
          >
            <div className="relative w-full h-80 bg-gray-900/50 rounded-lg p-4 border border-border/50 shadow-2xl">
              <div className="absolute top-2 left-2 flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <pre className="text-sm text-green-400 whitespace-pre-wrap font-mono mt-6">
                <code>
                  <span className="text-purple-400">const</span> <span className="text-blue-400">developer</span> = {'{\n'}
                  {'  '}<span className="text-red-400">name</span>: <span className="text-yellow-300">'Dionis'</span>,\n
                  {'  '}<span className="text-red-400">role</span>: <span className="text-yellow-300">'Full-Stack Developer'</span>,\n
                  {'  '}<span className="text-red-400">skills</span>: [<span className="text-yellow-300">'React'</span>, <span className="text-yellow-300">'Laravel'</span>, <span className="text-yellow-300">'Node.js'</span>],\n
                  {'  '}<span className="text-red-400">status</span>: <span className="text-yellow-300">'readyToHire'</span>,\n
                  {'  '}<span className="text-red-400">isAwesome</span>: <span className="text-purple-400">true</span>\n
                  {'}'};
                </code>
              </pre>
              <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                portfolio.jsx
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}