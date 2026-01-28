
import React from 'react';
import type { Education as EducationType } from '../types';
import Section from './Section';
import SkeletonLoader from './SkeletonLoader';

interface EducationProps {
  education: EducationType[] | null;
}

const EducationSkeleton: React.FC = () => (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-start">
            <div className="w-2/3 space-y-2">
                <SkeletonLoader className="h-6 w-3/4 bg-slate-200 dark:bg-slate-700 rounded" />
                <SkeletonLoader className="h-5 w-1/2 bg-slate-200 dark:bg-slate-700 rounded" />
            </div>
            <SkeletonLoader className="h-5 w-1/4 bg-slate-200 dark:bg-slate-700 rounded" />
        </div>
    </div>
)

const Education: React.FC<EducationProps> = ({ education }) => {
  return (
    <Section id="education" title="Education" iconClass="fas fa-graduation-cap">
      {education ? education.map((edu, index) => (
        <div key={index} className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm mb-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">{edu.institution}</h3>
              <p className="text-md text-slate-600 dark:text-slate-300">{edu.degree}</p>
              {edu.gpa && <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">GPA: {edu.gpa}</p>}
            </div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{edu.period}</p>
          </div>
        </div>
      )) : <EducationSkeleton />}
    </Section>
  );
};

export default Education;
