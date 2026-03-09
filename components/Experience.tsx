
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
      <div className="absolute -left-12 top-1 z-10 flex items-center justify-center bg-cyan-600 shadow-xl w-8 h-8 rounded-full ring-8 ring-white">
        <span className="text-lg text-white">
          <i className="fas fa-briefcase"></i>
        </span>
      </div>

      {/* Content Card */}
      <div className="relative bg-slate-50 rounded-lg shadow-sm p-6 border border-slate-200">
        {/* Arrow Indicator */}
        <div className="absolute top-6 h-0 w-0 
                        border-t-8 border-t-transparent
                        border-b-8 border-b-transparent
                        border-r-8 border-r-border-subtle
                        -left-2">
        </div>

        <p className="text-xs font-bold text-brand-accent mb-2 uppercase tracking-widest">{item.period}</p>
        <h3 className="mb-1 font-extrabold text-text-primary text-lg sm:text-xl break-words leading-tight tracking-tight">{item.role}</h3>
        <p className="text-sm sm:text-base font-bold text-text-secondary mb-4 break-words opacity-90">{item.company}</p>

        <div className="text-sm text-text-secondary space-y-3 mb-4">
          <h4 className="text-[10px] font-extrabold text-text-muted uppercase tracking-widest flex items-center">
            <i className="fas fa-bullseye mr-2 text-brand-accent text-[10px]"></i>
            Core Responsibilities
          </h4>
          <ul className="list-disc list-inside space-y-2 marker:text-brand-accent">
            {item.responsibilities.map((resp, index) => (
              <li key={index} className="break-words leading-relaxed pl-1">{resp}</li>
            ))}
          </ul>
        </div>
        {item.achievements && item.achievements.length > 0 && (
          <div className="mt-4 pt-4 border-t border-border-subtle/50">
            <h4 className="text-[10px] font-extrabold text-text-muted uppercase tracking-widest mb-3 flex items-center">
              <i className="fas fa-trophy mr-2 text-brand-accent text-[10px]"></i>
              Key Achievements
            </h4>
            <ul className="space-y-2">
              {item.achievements.map((achievement, index) => (
                <li key={index} className="flex items-start text-sm text-text-primary">
                  <i className="fas fa-star text-brand-accent mt-1 mr-2 text-[10px]"></i>
                  <span className="leading-snug">{achievement}</span>
                </li>
              ))}
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
        <div className="absolute -left-12 top-1 z-10 w-8 h-8 rounded-full bg-slate-200 ring-8 ring-white"></div>
        <div className="p-6">
          <SkeletonLoader className="h-4 w-1/3 mb-2 rounded" />
          <SkeletonLoader className="h-6 w-3/4 mb-2 rounded" />
          <SkeletonLoader className="h-5 w-1/2 mb-4 rounded" />
          <div className="space-y-2">
            <SkeletonLoader className="h-4 w-full rounded" />
            <SkeletonLoader className="h-4 w-5/6 rounded" />
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
        <div className="absolute top-0 left-4 w-0.5 h-full bg-slate-300" aria-hidden="true"></div>

        {experience ? (
          <div className="pl-12 space-y-12">
            {experience.map((item, index) => (
              <TimelineItem key={index} item={item} />
            ))}
          </div>
        ) : <ExperienceSkeleton />}
      </div>
    </Section>
  );
};

export default Experience;
