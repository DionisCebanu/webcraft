import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const languages = [
  { code: 'en', name: 'EN', flag: '🇬🇧' },
  { code: 'fr', name: 'FR', flag: '🇫🇷' },
  { code: 'ro', name: 'RO', flag: '🇷🇴' },
  { code: 'ru', name: 'RU', flag: '🇷🇺' },
];

const langStyles = {
  en: 'hover:text-primary',
  fr: 'hover:text-blue-500 hover:underline decoration-blue-500 underline-offset-4',
  ro: 'hover:text-[#B30D0D]',
  ru: 'text-[#3BA8F9] hover:shadow-[0_0_10px_#FFD700] hover:border-[#FFD700] hover:bg-white/10 rounded-md border border-transparent transition-all',
};

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-muted-foreground hover:text-primary"
      >
        <Globe className="h-5 w-5" />
        <span className="font-semibold">{currentLanguage.name}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </Button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="absolute top-full right-0 mt-2 w-40 origin-top-right rounded-md shadow-lg glass-panel ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div className="py-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={cn(
                    'flex items-center w-full px-4 py-2 text-sm text-left',
                    i18n.language === lang.code ? 'font-bold text-primary' : 'text-foreground',
                    langStyles[lang.code]
                  )}
                >
                  <span className="mr-3">{lang.flag}</span>
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}