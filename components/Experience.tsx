
import React from 'react';
import type { Experience as ExperienceType } from '../types';
import Section from './Section';
import SkeletonLoader from './SkeletonLoader';

interface ExperienceProps {
  experience: ExperienceType[] | null;
}

const TimelineItem: React.FC<{ item: ExperienceType }> = ({ item }) => {
  return (
    <div 
      className="relative"
      data-aos="fade-left"
    >
      {/* Timeline Dot */}
      <div className="absolute -left-12 top-1 z-10 flex items-center justify-center bg-cyan-600 shadow-xl w-8 h-8 rounded-full ring-8 ring-slate-50 dark:ring-slate-900">
        <span className="text-lg text-white">
            <i className="fas fa-briefcase"></i>
        </span>
      </div>

      {/* Content Card */}
      <div className="relative bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6">
        {/* Arrow Indicator */}
        <div className="absolute top-6 h-0 w-0 
                        border-t-8 border-t-transparent
                        border-b-8 border-b-transparent
                        border-r-8 border-r-white dark:border-r-slate-800
                        -left-2">
        </div>

        <p className="text-sm font-medium text-cyan-700 dark:text-cyan-400 mb-1">{item.period}</p>
        <h3 className="mb-2 font-bold text-slate-800 dark:text-slate-100 text-lg">{item.role}</h3>
        <p className="text-md leading-snug tracking-wide text-slate-600 dark:text-slate-400 mb-4">{item.company}</p>
        
        <div className="text-sm text-slate-600 dark:text-slate-400 space-y-2 mb-4">
            <h4 className="font-semibold text-slate-700 dark:text-slate-300">Responsibilities:</h4>
            <ul className="list-disc list-inside space-y-1">
                {item.responsibilities.map((resp, index) => <li key={index}>{resp}</li>)}
            </ul>
        </div>
        {item.achievements && item.achievements.length > 0 && (
             <div className="text-sm text-slate-600 dark:text-slate-400 space-y-2">
                <h4 className="font-semibold text-slate-700 dark:text-slate-300">Key Achievements:</h4>
                <ul className="list-disc list-inside space-y-1">
                    {item.achievements.map((ach, index) => <li key={index}>{ach}</li>)}
                </ul>
            </div>
        )}
      </div>
    </div>
  );
};

const ExperienceSkeleton: React.FC = () => (
    <div className="pl-12 space-y-12">
        {[...Array(2)].map((_, i) => (
            <div key={i} className="relative">
                <div className="absolute -left-12 top-1 z-10 w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 ring-8 ring-slate-50 dark:ring-slate-900"></div>
                <div className="p-6">
                    <SkeletonLoader className="h-4 w-1/3 mb-2 rounded"/>
                    <SkeletonLoader className="h-6 w-3/4 mb-2 rounded"/>
                    <SkeletonLoader className="h-5 w-1/2 mb-4 rounded"/>
                    <div className="space-y-2">
                        <SkeletonLoader className="h-4 w-full rounded"/>
                        <SkeletonLoader className="h-4 w-5/6 rounded"/>
                    </div>
                </div>
            </div>
        ))}
    </div>
);


const Experience: React.FC<ExperienceProps> = ({ experience }) => {
  return (
    <Section id="experience" title="Work Experience" iconClass="fas fa-briefcase">
      <div className="relative">
          {/* Timeline */}
          <div className="absolute top-0 left-4 w-0.5 h-full bg-slate-200 dark:bg-slate-700" aria-hidden="true"></div>

          {experience ? (
              <div className="pl-12 space-y-12">
                  {experience.map((item, index) => (
                      <TimelineItem key={index} item={item} />
                  ))}
              </div>
          ) : <ExperienceSkeleton />}
      </div>
    </section>
  );
};

export default Experience;
