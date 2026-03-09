
import React from 'react';
import Section from './Section';
import SkeletonLoader from './SkeletonLoader';

interface CertificationsProps {
  certifications: string[] | null;
}

const CertificationsSkeleton: React.FC = () => (
  <div className="space-y-3">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="flex items-center">
        <SkeletonLoader className="h-2 w-2 bg-slate-200 rounded-full mr-3" />
        <SkeletonLoader className="h-4 w-5/6 bg-slate-200 rounded" />
      </div>
    ))}
  </div>
);

const Certifications: React.FC<CertificationsProps> = ({ certifications }) => {
  return (
    <Section id="certifications" title="Certifications" iconClass="fas fa-certificate">
      {certifications ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {certifications.map((cert, index) => (
            <li key={index} className="flex items-start bg-bg-app p-4 rounded-xl border border-border-subtle hover:border-brand-accent/30 transition-all duration-300 group">
              <i className="fas fa-certificate text-brand-accent mt-1 mr-3 text-xs group-hover:scale-110 transition-transform"></i>
              <span className="text-sm font-bold text-text-secondary group-hover:text-text-primary transition-colors leading-snug tracking-tight">{cert}</span>
            </li>
          ))}
        </ul>
      ) : <CertificationsSkeleton />}
    </Section>
  );
};

export default Certifications;
