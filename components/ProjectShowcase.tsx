
import React from 'react';
import type { ProjectShowcase as ShowcaseType } from '../types';
import Section from './Section';
import SkeletonLoader from './SkeletonLoader';
import ImageCarousel from './ImageCarousel';



const ProjectShowcase: React.FC<{ showcase: ShowcaseType | null }> = ({ showcase }) => {
  if (!showcase && showcase !== null) return null;

  return (
    <Section id="showcase" title="Project Showcase" iconClass="fas fa-eye" noContainer>
      {showcase ? (
        <div className="space-y-8 bg-bg-canvas p-6 sm:p-10 rounded-2xl border border-border-subtle shadow-subtle">
          <div className="max-w-3xl">
            <h3 className="text-2xl md:text-4xl font-bold text-text-primary mb-4 tracking-tight">{showcase.title}</h3>
            <p className="text-text-secondary md:text-lg leading-relaxed font-medium">{showcase.description}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-10 pt-6 border-t border-border-subtle/50">
            <ImageCarousel
              title="Before"
              images={showcase.before.imageUrls}
              description={showcase.before.description}
            />
            <ImageCarousel
              title="After"
              images={showcase.after.imageUrls}
              description={showcase.after.description}
            />
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <SkeletonLoader className="h-8 w-3/4 bg-slate-200 rounded" />
          <SkeletonLoader className="h-5 w-full bg-slate-200 rounded" />
          <SkeletonLoader className="h-5 w-5/6 bg-slate-200 rounded" />
          <div className="aspect-video mt-4">
            <SkeletonLoader className="h-full w-full bg-slate-200 rounded-lg" />
          </div>
        </div>
      )}
    </Section>
  );
};

export default ProjectShowcase;