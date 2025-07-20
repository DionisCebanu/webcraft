import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ExternalLink, PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Section, SectionTitle } from '@/components/Section';

const portfolioProjects = [
  {
    key: 'project_1',
    url: "https://digitalorto.com/",
  },
  {
    key: 'project_2',
    url: "https://resto.dioniscode.com/",
  },
  {
    key: 'project_3',
    url: "https://chalets.dioniscode.com/",
  }
];

export function PortfolioSection() {
  const { t } = useTranslation();
  
  const projects = portfolioProjects.map(p => ({
    ...p,
    title: t(`${p.key}_title`),
    description: t(`${p.key}_desc`),
    features: t(`${p.key}_features`).split(';'),
  }));

  return (
    <Section id="portfolio" parallax>
      <SectionTitle>
        {t('portfolio_title')} <span className="gradient-text-purple-teal">{t('portfolio_title_highlight')}</span>
      </SectionTitle>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
        {projects.map((project, index) => (
          <motion.div
            key={project.key}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
              <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
              <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
              <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
              <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
              <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-background">
                <div className="w-full h-full bg-cover bg-center">
                  <img  alt={project.title} src="https://images.unsplash.com/photo-1692976001563-41fa7497d81d" />
                   <div className="w-full h-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute inset-0">
                      <PlayCircle className="w-20 h-20 text-white/70" />
                   </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-6">
              <h3 className="text-2xl font-bold">{project.title}</h3>
              <p className="text-muted-foreground mt-2 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {project.features.map((feature) => (
                  <span key={feature} className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full">{feature}</span>
                ))}
              </div>
              <Button asChild variant="link" className="text-secondary hover:text-secondary/80">
                <a href={project.url} target="_blank" rel="noopener noreferrer">
                  {t('portfolio_view_live')} <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}