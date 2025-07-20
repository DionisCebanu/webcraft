import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function Section({ children, id, className, parallax = false }) {
  return (
    <section id={id} className={cn("py-20 lg:py-32 relative overflow-hidden", className, parallax && "parallax-bg")}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-6"
      >
        {children}
      </motion.div>
    </section>
  );
}

export function SectionTitle({ children, className }) {
  return (
    <h2 className={cn("text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-16", className)}>
      {children}
    </h2>
  );
}
