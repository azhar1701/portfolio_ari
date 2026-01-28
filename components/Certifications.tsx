
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
        <ul className="list-disc list-inside space-y-2 text-slate-600">
          {certifications.map((cert, index) => (
            <li key={index}>{cert}</li>
          ))}
        </ul>
      ) : <CertificationsSkeleton />}
    </Section>
  );
};

export default Certifications;
