
import React, { useState } from 'react';
import type { ProjectShowcase as ShowcaseType } from '../types';
import Section from './Section';
import SkeletonLoader from './SkeletonLoader';

const ShowcaseSkeleton: React.FC = () => (
  <div className="space-y-4">
    <SkeletonLoader className="h-8 w-3/4 bg-slate-200 rounded" />
    <SkeletonLoader className="h-5 w-full bg-slate-200 rounded" />
    <SkeletonLoader className="h-5 w-5/6 bg-slate-200 rounded" />
    <div className="aspect-video mt-4">
      <SkeletonLoader className="h-full w-full bg-slate-200 rounded-lg" />
    </div>
  </div>
);

interface CarouselProps {
  images: string[];
  title: string;
  description: string;
}

const Carousel: React.FC<CarouselProps> = ({ images, title, description }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  }

  return (
    <div className="w-full group/carousel">
      <h4 className="text-xs font-bold text-text-primary uppercase tracking-widest mb-4 border-b border-border-subtle/30 pb-1 w-fit">
        {title}
      </h4>
      <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-subtle border border-border-subtle group bg-bg-app">
        <img
          src={images[currentIndex]}
          alt={`${title} - View ${currentIndex + 1}`}
          className="w-full h-full object-cover duration-500 transition-all hover:scale-105"
        />
        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute top-1/2 -translate-y-1/2 left-4 text-xl rounded-full p-2 bg-black/40 text-white backdrop-blur-sm opacity-0 group-hover/carousel:opacity-100 transition-all hover:bg-black/60"
          aria-label="Previous image"
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <button
          onClick={goToNext}
          className="absolute top-1/2 -translate-y-1/2 right-4 text-xl rounded-full p-2 bg-black/40 text-white backdrop-blur-sm opacity-0 group-hover/carousel:opacity-100 transition-all hover:bg-black/60"
          aria-label="Next image"
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
      <div className="flex justify-center py-4 space-x-2.5">
        {images.map((_, slideIndex) => (
          <button
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`transition-all duration-300 ${currentIndex === slideIndex ? 'w-8 h-2 bg-brand-accent rounded-full' : 'w-2 h-2 bg-text-muted/30 rounded-full hover:bg-brand-accent/50 hover:w-4'}`}
            aria-label={`Go to image ${slideIndex + 1}`}
          ></button>
        ))}
      </div>
      <p className="text-text-secondary text-sm font-medium leading-relaxed italic">{description}</p>
    </div>
  );
};

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
            <Carousel
              title="Legacy System"
              images={showcase.before.imageUrls}
              description={showcase.before.description}
            />
            <Carousel
              title="Modernized Platform"
              images={showcase.after.imageUrls}
              description={showcase.after.description}
            />
          </div>
        </div>
      ) : (
        <ShowcaseSkeleton />
      )}
    </Section>
  );
};

export default ProjectShowcase;