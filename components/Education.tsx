
import React from 'react';
import type { Education as EducationType } from '../types';
import Section from './Section';
import SkeletonLoader from './SkeletonLoader';

interface EducationProps {
  education: EducationType[] | null;
}

const EducationSkeleton: React.FC = () => (
  <div className="space-y-2">
    <SkeletonLoader className="h-6 w-3/4 bg-slate-200 rounded" />
    <SkeletonLoader className="h-5 w-1/2 bg-slate-200 rounded" />
    <SkeletonLoader className="h-4 w-1/4 bg-slate-200 rounded" />
  </div>
)

const Education: React.FC<EducationProps> = ({ education }) => {
  return (
    <Section id="education" title="Education" iconClass="fas fa-graduation-cap">
      {education ? education.map((edu, index) => (
        <div key={index} className="mb-6 last:mb-0 group">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-extrabold text-text-primary group-hover:text-brand-accent transition-colors leading-tight tracking-tight">{edu.institution}</h3>
              <p className="text-md font-bold text-text-secondary mt-1 tracking-tight">{edu.degree}</p>
              {edu.gpa && (
                <p className="text-[10px] font-extrabold text-brand-accent uppercase tracking-widest mt-3 flex items-center">
                  <i className="fas fa-star mr-1.5 text-[10px]"></i>
                  GPA: {edu.gpa}
                </p>
              )}
            </div>
            <p className="text-sm font-bold text-text-muted bg-bg-app px-3 py-1 rounded-md border border-border-subtle">{edu.period}</p>
          </div>
        </div>
      )) : <EducationSkeleton />}
    </Section>
  );
};

export default Education;
