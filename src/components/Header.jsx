import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

export function Header() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { name: t('nav_services'), href: '#services' },
    { name: t('nav_portfolio'), href: '#portfolio' },
    { name: t('nav_why_it_works'), href: '#why-it-works' },
    { name: t('nav_contact'), href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-2 glass-panel shadow-lg' : 'py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('#home'); }} className="text-2xl font-bold gradient-text-purple-teal">
          Dionis
        </a>
        <nav className="hidden md:flex items-center gap-4">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }} className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              {link.name}
            </a>
          ))}
          <ThemeToggle />
          <LanguageSwitcher />
        </nav>
        <div className="md:hidden flex items-center gap-2">
           <LanguageSwitcher />
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={isOpen ? "x" : "menu"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isOpen ? <X /> : <Menu />}
              </motion.div>
            </AnimatePresence>
          </Button>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg overflow-hidden"
          >
            <nav className="flex flex-col items-center gap-6 py-6">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }} className="text-lg font-medium text-foreground hover:text-primary transition-colors">
                  {link.name}
                </a>
              ))}
              <ThemeToggle />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}