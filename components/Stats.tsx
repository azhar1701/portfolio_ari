
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
    <div className="flex flex-col items-start px-6 first:pl-0 border-l border-border-subtle/30 first:border-0">
      <span ref={ref} className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-accent tracking-tighter leading-none mb-2">
        {count}{stat.suffix || ''}
      </span>
      <p className="text-[10px] sm:text-xs text-text-muted font-bold uppercase tracking-widest opacity-70">{stat.label}</p>
    </div>
  );
};


const Stats: React.FC<{ stats: Stat[] | null }> = ({ stats }) => {
  return (
    <Section id="stats" title="By the Numbers" iconClass="fas fa-wave-square" noContainer>
      {stats ? (
        <div className="flex flex-wrap gap-y-8">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              stat={stat}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-12">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-32">
              <SkeletonLoader className="h-10 w-20 rounded" />
              <SkeletonLoader className="h-3 w-24 mt-4 rounded" />
            </div>
          ))}
        </div>
      )}
    </Section>
  );
};

export default Stats;
