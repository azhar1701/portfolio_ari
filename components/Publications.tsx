
import React from 'react';
import type { Publication } from '../types';
import Section from './Section';
import SkeletonLoader from './SkeletonLoader';

interface PublicationsProps {
  publications: Publication[] | null;
}

const PublicationsSkeleton: React.FC = () => (
  <div className="space-y-4">
    {[...Array(2)].map((_, i) => (
      <div key={i} className="p-4 border-l-4 border-border-subtle bg-bg-canvas rounded space-y-2 opacity-60">
        <SkeletonLoader className="h-5 w-full bg-border-subtle rounded" />
        <SkeletonLoader className="h-4 w-3/4 bg-border-subtle/50 rounded" />
        <SkeletonLoader className="h-4 w-1/4 bg-border-subtle/30 rounded" />
      </div>
    ))}
  </div>
);

const Publications: React.FC<PublicationsProps> = ({ publications }) => {
  return (
    <Section id="publications" title="Publications" iconClass="fas fa-file-lines">
      {publications ? (
        <div className="space-y-4">
          {publications.map((pub, index) => (
            <div key={index} className="p-5 border-l-4 border-brand-accent bg-bg-canvas rounded-r-lg border border-border-subtle shadow-subtle hover:shadow-md transition-all duration-300">
              <h3 className="font-bold text-text-primary text-lg leading-tight mb-2 tracking-tight">{pub.title}</h3>
              <p className="text-sm text-text-secondary leading-relaxed mb-4">{pub.details}</p>
              <a
                href={pub.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-bold text-brand-accent hover:text-brand-accent-hover transition-colors group"
              >
                View Publication
                <i className="fas fa-external-link-alt ml-2 text-xs transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"></i>
              </a>
            </div>
          ))}
        </div>
      ) : <PublicationsSkeleton />}
    </Section>
  );
};

export default Publications;
