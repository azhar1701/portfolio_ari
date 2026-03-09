
import React from 'react';
import Section from './Section';
import type { SkillCategory } from '../types';
import SkeletonLoader from './SkeletonLoader';

interface SkillsProps {
  skills: SkillCategory[] | null;
}

const SkillsSkeleton: React.FC = () => (
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
);

const Skills: React.FC<SkillsProps> = ({ skills }) => {
  return (
    <Section id="skills" title="Technical Skills" iconClass="fas fa-cogs">
      {skills ? (
        <div className="space-y-8">
          {skills.map((category) => (
            <div key={category.category}>
              <h3 className="text-lg font-extrabold text-text-primary mb-4 flex items-center tracking-tight">
                <i className="fas fa-layer-group mr-2 text-brand-accent/50 text-xs"></i>
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-brand-accent-soft text-brand-accent-text text-[10px] font-extrabold px-3 py-1.5 rounded-md border border-brand-accent/10 transition-transform hover:scale-105 uppercase tracking-widest"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : <SkillsSkeleton />}
    </Section>
  );
};

export default Skills;
