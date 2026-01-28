
import React from 'react';

const SkeletonLoader: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className="animate-pulse">
      <div className={`${className} bg-slate-200`}></div>
    </div>
  );
};

export default SkeletonLoader;
