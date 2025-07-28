import React, { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ExternalLink, PlayCircle, PauseCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Section, SectionTitle } from '@/components/Section';

const portfolioProjects = [
  {
    key: 'portfolio_project_1',
    url: 'https://digitalorto.com/',
    video: '/textures/projects/dentall.mp4',
  },
  {
    key: 'portfolio_project_2',
    url: 'https://resto.dioniscode.com/',
    video: '/textures/projects/restoo.mp4',
  },
  {
    key: 'portfolio_project_3',
    url: 'https://chalets.dioniscode.com/',
    video: '/textures/projects/chalet.mp4',
  },
];

export function PortfolioSection() {
  const { t } = useTranslation();
  const videoRefs = useRef({});
  const [activeKey, setActiveKey] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobileView, setIsMobileView] = useState(false);

  const projects = portfolioProjects.map((p) => ({
    ...p,
    title: t(`${p.key}_title`),
    description: t(`${p.key}_desc`),
    features: t(`${p.key}_features`).split(';'),
  }));

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobileView(width < 1024 || projects.length > 3);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [projects.length]);

  // 👆 Swipe Gesture Support
  useEffect(() => {
    let startX = 0;
    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
      const endX = e.changedTouches[0].clientX;
      const diffX = startX - endX;
      if (diffX > 50) handleNext();
      else if (diffX < -50) handlePrev();
    };

    const slider = document.getElementById('mobile-project-slider');
    if (slider) {
      slider.addEventListener('touchstart', handleTouchStart);
      slider.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      if (slider) {
        slider.removeEventListener('touchstart', handleTouchStart);
        slider.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [currentIndex]);

  const handlePlayToggle = (key) => {
    const currentVideo = videoRefs.current[key];
    if (!currentVideo) return;

    if (activeKey && activeKey !== key && videoRefs.current[activeKey]) {
      videoRefs.current[activeKey].pause();
    }

    if (currentVideo.paused) {
      currentVideo.play();
      setActiveKey(key);
    } else {
      currentVideo.pause();
      setActiveKey(null);
    }
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  return (
    <Section id="portfolio" parallax>
      <SectionTitle>
        {t('portfolio_title')}{' '}
        <span className="gradient-text-purple-teal">
          {t('portfolio_title_highlight')}
        </span>
      </SectionTitle>

      {isMobileView ? (
        <div
          id="mobile-project-slider"
          className="flex flex-col items-center gap-6"
        >
          

          <ProjectCard
            project={projects[currentIndex]}
            videoRefs={videoRefs}
            activeKey={activeKey}
            handlePlayToggle={handlePlayToggle}
            t={t}
          />

          <div className="flex justify-between items-center w-full px-4">
            <Button onClick={handlePrev} variant="ghost" className="text-3xl">←</Button>
            <Button onClick={handleNext} variant="ghost" className="text-3xl">→</Button>
          </div>

          {/* 🔘 Pagination Dots */}
          <div className="flex justify-center mt-4 gap-2">
            {projects.map((_, index) => (
              <span
                key={index}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-primary scale-125' : 'bg-gray-400/50'
                }`}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {projects.map((project) => (
            <ProjectCard
              key={project.key}
              project={project}
              videoRefs={videoRefs}
              activeKey={activeKey}
              handlePlayToggle={handlePlayToggle}
              t={t}
            />
          ))}
        </div>
      )}
    </Section>
  );
}

function ProjectCard({ project, videoRefs, activeKey, handlePlayToggle, t }) {
  return (
    <div className="group">
      <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
        <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
        <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
        <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
        <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
        <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-background relative">
          <video
            ref={(el) => (videoRefs.current[project.key] = el)}
            className="w-full h-full object-cover"
            src={project.video}
            controls={false}
            muted
            playsInline
          />
          <button
            onClick={() => handlePlayToggle(project.key)}
            className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-100 hover:opacity-100 transition-opacity"
          >
            {activeKey === project.key && !videoRefs.current[project.key]?.paused ? (
              <PauseCircle className="w-20 h-20 text-white/70" />
            ) : (
              <PlayCircle className="w-20 h-20 text-white/70" />
            )}
          </button>
        </div>
      </div>

      <div className="text-center mt-6">
        <h3 className="text-2xl font-bold">{project.title}</h3>
        <p className="text-muted-foreground mt-2 mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 justify-center mb-4">
          {project.features.map((feature) => (
            <span
              key={feature}
              className="text-xs font-semibold bg-primary/10 text-primary px-3 py-1 rounded-full"
            >
              {feature}
            </span>
          ))}
        </div>
        <Button
          asChild
          variant="link"
          className="text-secondary hover:text-secondary/80"
        >
          <a href={project.url} target="_blank" rel="noopener noreferrer">
            {t('portfolio_view_live')} <ExternalLink className="w-4 h-4 ml-2" />
          </a>
        </Button>
      </div>
    </div>
  );
}
