
import React from 'react';
import Section from './Section';
import SkeletonLoader from './SkeletonLoader';

interface OrganizationsProps {
  organizations: string[] | null;
}

const OrganizationsSkeleton: React.FC = () => (
  <div className="space-y-3">
    <div className="flex items-center">
      <SkeletonLoader className="h-2 w-2 bg-slate-200 rounded-full mr-3" />
      <SkeletonLoader className="h-4 w-3/4 bg-slate-200 rounded" />
    </div>
  </div>
);

const Organizations: React.FC<OrganizationsProps> = ({ organizations }) => {
  return (
    <Section id="organizations" title="Professional Memberships" iconClass="fas fa-users">
      {organizations ? (
        <ul className="grid grid-cols-1 gap-3">
          {organizations.map((org, index) => (
            <li key={index} className="flex items-center bg-bg-app p-4 rounded-xl border border-border-subtle hover:border-brand-accent/30 transition-all duration-300 group">
              <i className="fas fa-users text-brand-accent mr-3 text-sm group-hover:scale-110 transition-transform font-bold"></i>
              <span className="text-sm font-bold text-text-secondary group-hover:text-text-primary transition-colors">{org}</span>
            </li>
          ))}
        </ul>
      ) : <OrganizationsSkeleton />}
    </Section>
  );
};

export default Organizations;
