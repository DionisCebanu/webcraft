import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Power, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Section, SectionTitle } from '@/components/Section';
import { Modal } from '@/components/Modal';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

// EmailJS config
const SERVICE_ID = 'service_ncvuuml';
const TEMPLATE_ID = 'template_uflpnsc';
const PUBLIC_KEY = 'Om2GYi17iiz2sWWka';

export function ContactSection() {
  const { t } = useTranslation();
  const { toast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

     const validations = [
      { field: 'name', condition: !formData.name.trim(), message: 'contact_modal_name_required' },
      {
        field: 'email',
        condition: !formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email),
        message: 'contact_modal_email_invalid'
      },
      { field: 'message', condition: !formData.message.trim(), message: 'contact_modal_message_required' },
      { field: 'phone', condition: !formData.phone.trim(), message: 'contact_modal_phone_required' },
      { field: 'projectType', condition: !formData.projectType.trim(), message: 'contact_modal_project_type_required' },
      { field: 'budget', condition: !formData.budget.trim(), message: 'contact_modal_budget_required' }
    ];

    for (let rule of validations) {
      if (rule.condition) {
        toast({ title: t(rule.message) });
        return;
      }
    }
   
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          to_name: 'Dionis',
          to_email: 'dionis.cebanu003@gmail.com',
          phone: formData.phone || 'N/A',
          project_type: formData.projectType || 'N/A',
          budget: formData.budget || 'N/A',
          message: formData.message
        },
        PUBLIC_KEY
      );

      toast({
        title: t('contact_toast_success_title'),
        description: t('contact_toast_success_desc')
      });

      setFormData({ name: '', email: '', phone: '', projectType: '', budget: '', message: '' });
      setIsModalOpen(false);
    } catch (error) {
      toast({
        title: t('contact_toast_error_title'),
        description: t('contact_toast_error_desc'),
        variant: 'destructive'
      });
    }
  };

  return (
    <>
      <Section id="contact">
        <SectionTitle>
          {t('contact_title')}{' '}
          <span className="gradient-text-purple-teal">{t('contact_title_highlight')}</span>
        </SectionTitle>
        <p className="text-center text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
          {t('contact_subtitle')}
        </p>

        <div className="relative mx-auto border-gray-800 bg-gray-900 border-[8px] rounded-t-xl h-[172px] max-w-[301px] md:h-[294px] md:max-w-[512px]">
          <div className="rounded-lg overflow-hidden h-[156px] md:h-[278px] bg-background">
            <div className="relative w-full h-full glass-panel flex items-center justify-center overflow-hidden">
              <motion.div
                key="off"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="flex flex-col items-center"
              >
                <motion.button
                  onClick={() => setIsModalOpen(true)}
                  className="group relative"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30 group-hover:shadow-xl group-hover:shadow-primary/50 transition-all duration-300">
                    <Power className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary opacity-50"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </motion.button>
                <p className="mt-4 text-sm text-muted-foreground animate-pulse">
                  {t('contact_power_on')}
                </p>
              </motion.div>
            </div>
          </div>
        </div>
        <div className="relative mx-auto bg-gray-900/80 rounded-b-xl h-[24px] max-w-[301px] md:h-[42px] md:max-w-[512px]">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 rounded-b-xl w-[56px] h-[5px] md:w-[96px] md:h-[8px] bg-gray-700" />
        </div>
      </Section>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={t('contact_modal_title')}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input name="name" value={formData.name} onChange={handleInputChange} placeholder={t('contact_modal_name')} className="bg-background/80" />
            <Input name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder={t('contact_modal_email')} className="bg-background/80" />
          </div>

          <Input name="phone" value={formData.phone} onChange={handleInputChange} placeholder={t('contact_modal_phone')} className="bg-background/80" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select onValueChange={(value) => handleSelectChange('projectType', value)}>
              <SelectTrigger className="bg-background/80">
                <SelectValue placeholder={t('contact_modal_project_type')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="one-page">{t('contact_modal_project_type_one')}</SelectItem>
                <SelectItem value="multi-page">{t('contact_modal_project_type_multi')}</SelectItem>
                <SelectItem value="cms">{t('contact_modal_project_type_cms')}</SelectItem>
                <SelectItem value="other">{t('contact_modal_project_type_other')}</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={(value) => handleSelectChange('budget', value)}>
              <SelectTrigger className="bg-background/80">
                <SelectValue placeholder={t('contact_modal_budget')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="250-500">{t('contact_modal_budget_1')}</SelectItem>
                <SelectItem value="500-1000">{t('contact_modal_budget_2')}</SelectItem>
                <SelectItem value="1000-2000">{t('contact_modal_budget_3')}</SelectItem>
                <SelectItem value="2000+">{t('contact_modal_budget_4')}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Textarea name="message" value={formData.message} onChange={handleInputChange} placeholder={t('contact_modal_message')} rows={4} className="bg-background/80 resize-none" />


          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold mt-4">
            <Send className="w-4 h-4 mr-2" /> {t('contact_modal_send')}
          </Button>
        </form>
      </Modal>
    </>
  );
}
