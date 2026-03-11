import React from 'react';
import type { Education as EducationType } from '../types';
import Section from './Section';
import SkeletonLoader from './SkeletonLoader';
import Card from './ui/Card';
import { SubHeading } from './ui/Typography';

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
    <Section id="education" title="Academic Background" iconClass="fas fa-user-graduate">
      <div className="space-y-6">
        {education ? education.map((edu, index) => (
          <Card key={index} variant="default" className="group">
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <div>
                <h3 className="text-xl font-bold text-text-primary group-hover:text-brand-accent transition-colors leading-tight tracking-tight">{edu.institution}</h3>
                <p className="text-lg font-bold text-text-secondary mt-1 tracking-tight">{edu.degree}</p>
                {edu.gpa && (
                  <SubHeading color="accent" className="mt-4" icon={<i className="fas fa-star text-xs"></i>}>
                    GPA: {edu.gpa}
                  </SubHeading>
                )}
              </div>
              <p className="text-sm font-bold text-text-muted bg-bg-canvas px-4 py-1.5 rounded-full border border-border-subtle whitespace-nowrap">{edu.period}</p>
            </div>
          </Card>
        )) : <EducationSkeleton />}
      </div>
    </Section>
  );
};

export default Education;
