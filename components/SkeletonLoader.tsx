
import React from 'react';

const SkeletonLoader: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className="animate-pulse">
      <div className={`${className} bg-slate-200 dark:bg-slate-700`}></div>
    </div>
  );
};

export default SkeletonLoader;
