import React from 'react';

interface SkeletonProps {
  className?: string;
}

const SkeletonLoader: React.FC<SkeletonProps> & {
  List: React.FC<{ items?: number }>;
  CardGrid: React.FC<{ items?: number; columns?: 2 | 3 | 4 }>;
  Block: React.FC<{ lines?: number }>;
  Timeline: React.FC<{ items?: number }>;
  SquareGrid: React.FC<{ items?: number }>;
} = ({ className }) => {
  return (
    <div className="animate-pulse">
      <div className={`${className || ''} bg-slate-200 dark:bg-slate-800 rounded-md`}></div>
    </div>
  );
};

SkeletonLoader.List = ({ items = 3 }) => (
  <div className="space-y-3">
    {[...Array(items)].map((_, i) => (
      <div key={i} className="flex items-center">
        <SkeletonLoader className="h-2 w-2 rounded-full mr-3" />
        <SkeletonLoader className="h-4 w-3/4" />
      </div>
    ))}
  </div>
);

SkeletonLoader.CardGrid = ({ items = 3, columns = 3 }) => {
  const colClass = columns === 2 ? 'sm:grid-cols-2' : columns === 4 ? 'sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4' : 'sm:grid-cols-2 xl:grid-cols-3';
  return (
    <div className={`grid ${colClass} gap-4 sm:gap-6`}>
      {[...Array(items)].map((_, i) => (
        <div key={i} className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 sm:p-6 rounded-lg space-y-3">
          <SkeletonLoader className="h-5 sm:h-6 w-3/4" />
          <SkeletonLoader className="h-4 w-full" />
          <SkeletonLoader className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
};

SkeletonLoader.Block = ({ lines = 3 }) => (
  <div className="space-y-2">
    <SkeletonLoader className="h-6 w-3/4" />
    {lines >= 2 && <SkeletonLoader className="h-5 w-1/2" />}
    {lines >= 3 && <SkeletonLoader className="h-4 w-1/4" />}
  </div>
);

SkeletonLoader.Timeline = ({ items = 2 }) => (
  <div className="space-y-12">
    {[...Array(items)].map((_, i) => (
      <div key={i} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <SkeletonLoader className="h-4 w-1/3 mb-2" />
          <SkeletonLoader className="h-6 w-3/4" />
        </div>
        <div className="lg:col-span-8">
          <SkeletonLoader className="h-64 w-full rounded-2xl" />
        </div>
      </div>
    ))}
  </div>
);

SkeletonLoader.SquareGrid = ({ items = 8 }) => (
  <div className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6">
    {[...Array(items)].map((_, i) => (
      <SkeletonLoader key={i} className="aspect-square rounded-lg w-full" />
    ))}
  </div>
);

export default SkeletonLoader;
