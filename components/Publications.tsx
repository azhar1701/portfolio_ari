
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
            <div key={i} className="p-4 border-l-4 border-cyan-500 bg-slate-50 rounded space-y-2">
                <SkeletonLoader className="h-5 w-full bg-slate-200 rounded" />
                <SkeletonLoader className="h-4 w-3/4 bg-slate-200 rounded" />
                <SkeletonLoader className="h-4 w-1/4 bg-slate-200 rounded" />
            </div>
        ))}
    </div>
);

const Publications: React.FC<PublicationsProps> = ({ publications }) => {
  return (
    <Section id="publications" title="Publications" iconClass="fas fa-book-open">
      {publications ? (
        <div className="space-y-4">
          {publications.map((pub, index) => (
            <div key={index} className="p-4 border-l-4 border-cyan-500 bg-slate-50 rounded">
              <h3 className="font-semibold text-slate-800">{pub.title}</h3>
              <p className="text-sm text-slate-500 my-1">{pub.details}</p>
              <a
                href={pub.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-cyan-600 hover:text-cyan-800 hover:underline"
              >
                View Publication <i className="fas fa-external-link-alt ml-1"></i>
              </a>
            </div>
          ))}
        </div>
      ) : <PublicationsSkeleton />}
    </Section>
  );
};

export default Publications;
