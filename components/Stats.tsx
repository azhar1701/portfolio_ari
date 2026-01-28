
import React, { useEffect, useState, useRef } from 'react';
import Section from './Section';
import SkeletonLoader from './SkeletonLoader';
import type { Stat } from '../types';

// Custom hook for counting animation that triggers on visibility.
const useCountUp = (end: number, duration: number = 2000) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            // Ease-out quint function for a smoother animation
            const easedProgress = 1 - Math.pow(1 - progress, 5);
            const currentCount = Math.floor(easedProgress * end);
            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(end); // Ensure it ends on the exact value
            }
          };
          requestAnimationFrame(animate);
          observer.disconnect(); // Animate only once
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the element is visible
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if(currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [end, duration]);

  return { count, ref };
};

const StatItem: React.FC<{ stat: Stat }> = ({ stat }) => {
    const { count, ref } = useCountUp(stat.value);
    return (
        <div className="text-center p-4">
            <span ref={ref} className="text-4xl md:text-5xl font-bold text-cyan-600 dark:text-cyan-400">
                {count}{stat.suffix}
            </span>
            <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 mt-2">{stat.label}</p>
        </div>
    );
};

const StatsSkeleton: React.FC = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-200 dark:divide-slate-700">
        {[...Array(4)].map((_, i) => (
            <div key={i} className="text-center p-4">
                <SkeletonLoader className="h-10 w-20 mx-auto rounded" />
                <SkeletonLoader className="h-4 w-24 mx-auto mt-3 rounded" />
            </div>
        ))}
    </div>
);

const Stats: React.FC<{ stats: Stat[] | null }> = ({ stats }) => {
    return (
        <Section id="stats" title="Key Metrics" iconClass="fas fa-chart-line">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm p-4">
                {stats ? (
                     <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-200 dark:divide-slate-700">
                        {stats.map((stat, index) => (
                            <StatItem key={index} stat={stat} />
                        ))}
                    </div>
                ) : <StatsSkeleton />}
            </div>
        </Section>
    );
};

export default Stats;
