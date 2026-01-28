
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
        <ul className="list-disc list-inside space-y-2 text-slate-600">
          {organizations.map((org, index) => (
            <li key={index}>{org}</li>
          ))}
        </ul>
      ) : <OrganizationsSkeleton />}
    </Section>
  );
};

export default Organizations;
