import React from 'react';
import { motion } from 'framer-motion';
import Breadcrumbs from './Breadcrumbs';

export const PageLayout = ({ children, className = "", contentClassName = "pt-8", mainClassName = "pt-[72px] pb-12" }) => {
  return (
    <div className={`min-h-screen bg-bg-primary text-text-primary ${className}`}>
      {/* Subtle background gradient */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/5 blur-[120px] rounded-full" />
      </div>

      {/* Content */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={`relative z-10 ${mainClassName}`}
      >
        <div className={`container-custom ${contentClassName}`}>
          <Breadcrumbs />
          {children}
        </div>
      </motion.main>
    </div>
  );
};
