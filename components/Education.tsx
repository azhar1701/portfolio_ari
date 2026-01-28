
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
        <div key={index} className="mb-4 last:mb-0">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold text-slate-800">{edu.institution}</h3>
              <p className="text-md text-slate-600">{edu.degree}</p>
              {edu.gpa && <p className="text-sm text-slate-500 mt-1">GPA: {edu.gpa}</p>}
            </div>
            <p className="text-sm font-medium text-slate-500">{edu.period}</p>
          </div>
        </div>
      )) : <EducationSkeleton />}
    </Section>
  );
};

export default Education;
