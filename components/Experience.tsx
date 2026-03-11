import React from 'react';
import type { Experience as ExperienceType } from '../types';
import Section from './Section';
import SkeletonLoader from './SkeletonLoader';
import Card from './ui/Card';
import { SubHeading } from './ui/Typography';

interface ExperienceProps {
  experience: ExperienceType[] | null;
}

const TimelineItem: React.FC<{ item: ExperienceType }> = ({ item }) => {
  return (
    <div
      className="group relative pb-16 last:pb-0"
      data-aos="fade-up"
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
          <div className="bg-bg-app/50 p-10 md:p-16 rounded-[2.5rem] border border-border-subtle/30 group-hover:border-brand-accent/20 transition-colors">
            <h4 className="text-2xl font-bold text-text-primary mb-10 tracking-tight flex items-center">
              <span className="w-2.5 h-2.5 bg-brand-accent rounded-full mr-4 opacity-60 shadow-sm shadow-brand-accent"></span>
              {item.role}
            </h4>

            <div className="space-y-10">
              {/* Strategic Focus */}
              <div>
                <h5 className="font-mono text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] mb-6">Strategic Focus</h5>
                <ul className="space-y-4">
                  {item.responsibilities.map((resp, index) => (
                    <li key={index} className="text-base text-text-secondary leading-relaxed pl-6 relative before:content-[''] before:absolute before:left-0 before:top-[0.7rem] before:w-2 before:h-[1px] before:bg-brand-accent/40">{resp}</li>
                  ))}
                </ul>
              </div>

              {/* Technical Outcomes */}
              {item.achievements && item.achievements.length > 0 && (
                <div className="pt-10 border-t border-border-subtle/20">
                  <h5 className="font-mono text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] mb-6">Technical Outcomes</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {item.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-start bg-bg-canvas p-6 rounded-2xl border border-border-subtle/20 shadow-subtle hover:shadow-md transition-all duration-300">
                        <i className="fas fa-arrow-up-right-dots text-brand-accent/40 mr-4 mt-1.5 text-xs"></i>
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
    </div>
  );
};

const ExperienceSkeleton: React.FC = () => (
  <div className="space-y-12">
    {[...Array(2)].map((_, i) => (
      <div key={i} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <SkeletonLoader className="h-4 w-1/3 mb-2 rounded" />
          <SkeletonLoader className="h-6 w-3/4 rounded" />
        </div>
        <div className="lg:col-span-8">
          <SkeletonLoader className="h-64 w-full rounded-2xl" />
        </div>
      </div>
    ))}
  </div>
);


const Experience: React.FC<ExperienceProps> = ({ experience }) => {
  return (
    <Section id="experience" title="Trajectory" iconClass="fas fa-route" noContainer>
      <div className="max-w-6xl mx-auto">
        {experience ? (
          <div className="space-y-16">
            {experience.map((item, index) => (
              <TimelineItem
                key={index}
                item={item}
              />
            ))}
          </div>
        ) : <ExperienceSkeleton />}
      </div>
    </Section>
  );
};

export default Experience;
