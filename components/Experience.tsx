import React from 'react';
import { motion, Variants } from 'framer-motion';
import type { Experience as ExperienceType } from '../types';
import Section from './Section';
import SkeletonLoader from './SkeletonLoader';
import { SubHeading } from './ui/Typography';

interface ExperienceProps {
  experience: ExperienceType[] | null;
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

const TimelineItem: React.FC<{ item: ExperienceType }> = ({ item }) => {
  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="group relative pb-8 last:pb-0"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
        {/* Date & Entity Column */}
        <div className="lg:col-span-4">
          <div className="sticky top-32">
            <span className="font-mono text-xs font-bold text-brand-accent uppercase tracking-[0.2em] block mb-2">{item.period}</span>
            <h3 className="text-xl font-bold text-text-primary mb-1 tracking-tight leading-tight">{item.company}</h3>
            <div className="h-px w-12 bg-border-subtle group-hover:w-24 transition-all duration-500 mt-6"></div>
          </div>
        </div>

        {/* Content & Outcomes Column */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-bg-app p-6 sm:p-10 md:p-16 rounded-3xl md:rounded-[2.5rem] border border-border-subtle group-hover:border-brand-accent/30 shadow-subtle transition-colors">
            <h4 className="text-2xl font-bold text-text-primary mb-10 tracking-tight flex items-center">
              <span className="w-2.5 h-2.5 bg-brand-accent rounded-full mr-4 opacity-60 shadow-sm shadow-brand-accent"></span>
              {item.role}
            </h4>

            <div className="space-y-10">
              {/* Responsibilities */}
              <div>
                <h5 className="font-mono text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] mb-6">Responsibilities</h5>
                <ul className="space-y-4">
                  {item.responsibilities.map((resp, index) => (
                    <li key={index} className="text-base text-text-secondary leading-relaxed pl-6 relative before:content-[''] before:absolute before:left-0 before:top-[0.7rem] before:w-2 before:h-[1px] before:bg-brand-accent/40">{resp}</li>
                  ))}
                </ul>
              </div>

              {/* Key Results */}
              {item.achievements && item.achievements.length > 0 && (
                <div className="pt-10 border-t border-border-subtle/20">
                  <h5 className="font-mono text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] mb-6">Key Results</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {item.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-start bg-bg-canvas p-6 rounded-2xl border border-border-subtle/20 shadow-subtle hover:shadow-md transition-all duration-300">
                        <i className="fas fa-check-circle text-brand-accent/60 mr-4 mt-1.5 text-xs"></i>
                        <span className="text-sm text-text-primary leading-relaxed font-medium">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};



const Experience: React.FC<ExperienceProps> = ({ experience }) => {
  return (
    <Section id="experience" title="Experience" iconClass="fas fa-route" noContainer>
      <div className="max-w-6xl mx-auto">
        {experience ? (
          <div className="space-y-8">
            {experience.map((item, index) => (
              <TimelineItem
                key={index}
                item={item}
              />
            ))}
          </div>
        ) : <SkeletonLoader.Timeline items={2} />}
      </div>
    </Section>
  );
};

export default Experience;
