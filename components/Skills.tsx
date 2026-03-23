import React from 'react';
import { motion, Variants } from 'framer-motion';
import Section from './Section';
import type { SkillCategory } from '../types';
import SkeletonLoader from './SkeletonLoader';
import Card from './ui/Card';
import Badge from './ui/Badge';
import { SubHeading } from './ui/Typography';

interface SkillsProps {
  skills: SkillCategory[] | null;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};


const Skills: React.FC<SkillsProps> = ({ skills }) => {
  return (
    <Section id="skills" title="Skills" iconClass="fas fa-gears" noContainer>
      <div className="max-w-6xl mx-auto border-t border-border-subtle/50">
        {skills ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="divide-y divide-border-subtle/30"
          >
            {skills.map((category, index) => {
              const categoryIndex = (index + 1).toString().padStart(2, '0');
              return (
                <motion.div
                  variants={itemVariants}
                  key={category.category}
                  className="py-6 lg:py-8 lg:grid lg:grid-cols-12 lg:gap-12 items-baseline group hover:bg-bg-app transition-colors px-4 -mx-4 rounded-xl"
                >
                  {/* Category Identifier */}
                  <div className="lg:col-span-4 mb-6 lg:mb-0">
                    <div className="flex items-baseline space-x-4">
                      <span className="font-mono text-xs text-brand-accent font-bold opacity-50">{categoryIndex}.</span>
                      <h3 className="text-lg font-bold text-text-primary tracking-tight uppercase group-hover:text-brand-accent transition-colors">
                        {category.category}
                      </h3>
                    </div>
                    <div className="h-0.5 w-8 bg-brand-accent/20 mt-4 group-hover:w-16 transition-all duration-500"></div>
                  </div>

                  {/* Skills Registry */}
                  <div className="lg:col-span-8">
                    <div className="flex flex-wrap gap-x-8 gap-y-4">
                      {category.skills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="soft"
                          className="font-mono text-xs font-semibold py-1.5 px-3 bg-bg-canvas border border-border-subtle"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i}>
                <SkeletonLoader className="h-6 w-1/3 bg-border-subtle rounded mb-4" />
                <div className="flex flex-wrap gap-2">
                  <SkeletonLoader className="h-8 w-24 bg-border-subtle/50 rounded-md" />
                  <SkeletonLoader className="h-8 w-32 bg-border-subtle/50 rounded-md" />
                  <SkeletonLoader className="h-8 w-28 bg-border-subtle/50 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
};

export default Skills;
