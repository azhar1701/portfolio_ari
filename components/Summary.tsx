
import React from 'react';
import { motion, Variants } from 'framer-motion';
import Section from './Section';
import SkeletonLoader from './SkeletonLoader';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

interface SummaryProps {
  content: string | null;
  image?: string;
}

const Summary: React.FC<SummaryProps> = ({ content, image }) => {
  return (
    <Section id="summary" title="Summary" iconClass="fas fa-compass-drafting" noContainer>
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {content ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Mission Statement Column */}
            <motion.div className="lg:col-span-5" variants={itemVariants}>
              <div className="sticky top-32">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary tracking-tighter leading-[1.1] mb-10">
                  Water engineering meets <span className="text-brand-accent">GIS</span>.
                </h3>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md mb-10 border border-border-subtle hidden md:block"
                >
                  <motion.img
                    initial={{ scale: 1.1 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    src={image || "/images/summary_hero.png"}
                    alt="Field work and engineering"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div className="flex items-center space-x-4">
                  <div className="h-px w-12 bg-brand-accent/40"></div>
                  <p className="font-mono text-[10px] font-bold text-text-muted uppercase tracking-[0.3em]">About</p>
                </div>
              </div>
            </motion.div>

            {/* Narrative & Specs Column */}
            <motion.div className="lg:col-span-7" variants={itemVariants}>
              <div className="bg-bg-app p-6 sm:p-10 md:p-16 rounded-3xl md:rounded-[2.5rem] border border-border-subtle shadow-sm">
                <p className="text-xl md:text-2xl text-text-secondary leading-relaxed font-medium mb-12 tracking-tight">
                  {content}
                </p>

                {/* Technical Specifications Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 pt-12 border-t border-border-subtle/20">
                  <div className="flex items-start">
                    <div className="w-1 h-10 bg-brand-accent/20 mr-6 mt-1 rounded-full"></div>
                    <div>
                      <p className="font-mono text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] mb-2">Primary Domain</p>
                      <p className="text-sm font-bold text-text-primary uppercase tracking-widest">Water Resources</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-1 h-10 bg-brand-accent/20 mr-6 mt-1 rounded-full"></div>
                    <div>
                      <p className="font-mono text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] mb-2">Current Project</p>
                      <p className="text-sm font-bold text-text-primary uppercase tracking-widest">SIPASDA Platform</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-5 space-y-4">
              <SkeletonLoader className="h-12 w-full rounded-xl" />
              <SkeletonLoader className="h-12 w-3/4 rounded-xl" />
            </div>
            <div className="lg:col-span-7">
              <SkeletonLoader className="h-64 w-full rounded-[2.5rem]" />
            </div>
          </div>
        )}
      </motion.div>
    </Section>
  );
};

export default Summary;