import React from 'react';
import Section from './Section';
import SkeletonLoader from './SkeletonLoader';
import Card from './ui/Card';
import Badge from './ui/Badge';

interface CertificationsProps {
  certifications: string[] | null;
}


const Certifications: React.FC<CertificationsProps> = ({ certifications }) => {
  return (
    <Section id="certifications" title="Certifications" iconClass="fas fa-award">
      {certifications ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certifications.map((cert, index) => (
            <Card
              key={index}
              variant="soft"
              padding="sm"
              className="group hover:border-brand-accent/30 flex items-start"
            >
              <i className="fas fa-shield-halved text-brand-accent mt-1 mr-3 text-xs group-hover:scale-110 transition-transform"></i>
              <span className="text-sm font-bold text-text-secondary group-hover:text-text-primary transition-colors leading-snug tracking-tight">{cert}</span>
            </Card>
          ))}
        </div>
      ) : <SkeletonLoader.List items={4} />}
    </Section>
  );
};

export default Certifications;
