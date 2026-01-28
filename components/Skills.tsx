
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
        <SkeletonLoader className="h-6 w-1/3 bg-slate-200 dark:bg-slate-700 rounded mb-4" />
        <div className="flex flex-wrap gap-2">
          <SkeletonLoader className="h-8 w-24 bg-slate-200 dark:bg-slate-700 rounded-full" />
          <SkeletonLoader className="h-8 w-32 bg-slate-200 dark:bg-slate-700 rounded-full" />
          <SkeletonLoader className="h-8 w-28 bg-slate-200 dark:bg-slate-700 rounded-full" />
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
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">
                {category.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-cyan-100 dark:bg-cyan-900/50 text-cyan-800 dark:text-cyan-300 text-sm font-medium px-4 py-2 rounded-full"
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
