
import React, { useEffect, useState, useRef } from 'react';
import Section from './Section';
import SkeletonLoader from './SkeletonLoader';
import type { Stat } from '../types';

// Custom hook for counting animation that triggers on visibility.
const useCountUp = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Safety check for non-numeric or invalid end values
    const targetValue = isNaN(end) ? 0 : end;
    if (targetValue <= 0) {
      setCount(0);
      return;
    }

    let isCancelled = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isCancelled) {
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            if (isCancelled) return;
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            // Ease-out quint function for a smoother animation
            const easedProgress = 1 - Math.pow(1 - progress, 5);
            const currentCount = Math.floor(easedProgress * targetValue);

            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(targetValue);
            }
          };
          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.1 } // More stable trigger
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      isCancelled = true;
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [end, duration]);

  return { count, ref };
};

const StatItem: React.FC<{ stat: Stat }> = ({ stat }) => {
  const { count, ref } = useCountUp(stat.value);
  return (
    <div className="text-center p-3 sm:p-4">
      <span ref={ref} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-brand-accent tracking-tighter">
        {count}{stat.suffix || ''}
      </span>
      <p className="text-xs sm:text-sm lg:text-base text-text-secondary mt-2 font-bold uppercase tracking-widest">{stat.label}</p>
    </div>
  );
};

const StatsSkeleton: React.FC = () => (
  <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-slate-200 gap-y-4 lg:gap-y-0">
    {[...Array(4)].map((_, i) => (
      <div key={i} className="text-center p-3 sm:p-4">
        <SkeletonLoader className="h-8 sm:h-10 w-16 sm:w-20 mx-auto rounded" />
        <SkeletonLoader className="h-3 sm:h-4 w-20 sm:w-24 mx-auto mt-3 rounded" />
      </div>
    ))}
  </div>
);

const Stats: React.FC<{ stats: Stat[] | null }> = ({ stats }) => {
  return (
    <Section id="stats" title="Key Metrics" iconClass="fas fa-chart-line">
      {stats ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-slate-200 gap-y-4 lg:gap-y-0">
          {stats.map((stat, index) => (
            <StatItem key={index} stat={stat} />
          ))}
        </div>
      ) : <StatsSkeleton />}
    </Section>
  );
};

export default Stats;
