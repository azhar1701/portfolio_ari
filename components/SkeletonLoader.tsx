import React from 'react';

const SkeletonLoader: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className="animate-pulse">
      <div className={`${className} bg-border-subtle/50 rounded-md`}></div>
    </div>
  );
};

export default SkeletonLoader;
