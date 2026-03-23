import React from 'react';
import Section from './Section';
import type { Testimonial } from '../types';
import SkeletonLoader from './SkeletonLoader';

interface TestimonialsProps {
  testimonials: Testimonial[] | null;
}


const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex space-x-1">
    {[...Array(5)].map((_, i) => (
      <i
        key={i}
        className={`fas fa-star text-sm ${i < rating ? 'text-yellow-400' : 'text-slate-300'
          }`}
      ></i>
    ))}
  </div>
);

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  return (
    <Section id="testimonials" title="Testimonials" iconClass="fas fa-quote-left">
      {testimonials ? (
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 -mx-4 px-4 sm:mx-0 sm:px-0 hide-scrollbar mt-4">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="min-w-[300px] w-[85vw] sm:w-[400px] snap-center bg-bg-canvas p-6 sm:p-8 rounded-xl border border-border-subtle shadow-subtle hover:shadow-md transition-all duration-300 flex flex-col flex-shrink-0">
              <div className="mb-6 flex justify-between items-start">
                <StarRating rating={testimonial.rating} />
                <i className="fas fa-quote-right text-brand-accent/20 text-3xl"></i>
              </div>
              <blockquote className="text-text-secondary mb-8 italic text-sm sm:text-base leading-relaxed flex-grow">
                "{testimonial.content}"
              </blockquote>
              <div className="flex items-center pt-6 border-t border-border-subtle/50">
                {(testimonial.avatar || testimonial.image) && (
                  <img
                    src={testimonial.avatar || testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover ring-2 ring-brand-accent-soft shadow-sm"
                  />
                )}
                <div>
                  <h4 className="font-bold text-text-primary text-sm sm:text-base leading-tight tracking-tight">{testimonial.name}</h4>
                  <p className="text-xs sm:text-sm text-text-muted mt-0.5 font-bold uppercase tracking-widest opacity-80">{testimonial.role || testimonial.position}</p>
                  <p className="text-xs sm:text-sm text-brand-accent font-bold mt-2 uppercase tracking-widest">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <SkeletonLoader.CardGrid items={3} />
      )}
    </Section>
  );
};

export default Testimonials;