
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
        <div className="w-full">
            <h4 className="font-bold text-xl text-slate-700 mb-2">{title}</h4>
            <div className="relative group aspect-video w-full rounded-lg overflow-hidden shadow-sm border border-slate-200">
                <div 
                    style={{ backgroundImage: `url(${images[currentIndex]})` }} 
                    className="w-full h-full bg-center bg-cover duration-500 transition-all"
                ></div>
                {/* Left Arrow */}
                <div className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 left-3 text-2xl rounded-full p-2 bg-black/40 text-white cursor-pointer">
                    <button onClick={goToPrevious} aria-label="Previous image"><i className="fas fa-chevron-left"></i></button>
                </div>
                {/* Right Arrow */}
                <div className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 right-3 text-2xl rounded-full p-2 bg-black/40 text-white cursor-pointer">
                    <button onClick={goToNext} aria-label="Next image"><i className="fas fa-chevron-right"></i></button>
                </div>
            </div>
            <div className="flex justify-center py-3 space-x-2">
                {images.map((_, slideIndex) => (
                    <button 
                        key={slideIndex} 
                        onClick={() => goToSlide(slideIndex)}
                        className={`w-3 h-3 rounded-full transition-colors ${currentIndex === slideIndex ? 'bg-cyan-600' : 'bg-slate-300 hover:bg-cyan-400'}`}
                        aria-label={`Go to image ${slideIndex + 1}`}
                    ></button>
                ))}
            </div>
            <p className="text-slate-600 text-sm mt-1">{description}</p>
        </div>
    );
};

const ProjectShowcase: React.FC<{ showcase: ShowcaseType | null }> = ({ showcase }) => {
  if (!showcase && showcase !== null) return null;

  return (
    <Section id="showcase" title="Project Showcase" iconClass="fas fa-images">
      {showcase ? (
        <div className="space-y-6">
          <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">{showcase.title}</h3>
          <p className="text-slate-600 mb-6">{showcase.description}</p>
          <div className="grid md:grid-cols-2 gap-8">
              <Carousel 
                title="Before"
                images={showcase.before.imageUrls}
                description={showcase.before.description}
              />
              <Carousel 
                title="After"
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