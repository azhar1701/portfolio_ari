
import React from 'react';
import Section from './Section';
import SkeletonLoader from './SkeletonLoader';

interface SummaryProps {
  content: string | null;
}

const Summary: React.FC<SummaryProps> = ({ content }) => {
  return (
    <Section id="summary" title="Professional Summary" iconClass="fas fa-user-tie">
      {content ? (
        <p className="text-base md:text-lg leading-relaxed text-slate-600 dark:text-slate-300">
          {content}
        </p>
      ) : (
        <div className="space-y-3">
          <SkeletonLoader className="h-4 rounded w-full" />
          <SkeletonLoader className="h-4 rounded w-5/6" />
          <SkeletonLoader className="h-4 rounded w-full" />
          <SkeletonLoader className="h-4 rounded w-3/4" />
        </div>
      )}
    </Section>
  );
};

export default Summary;