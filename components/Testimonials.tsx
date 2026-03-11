import React from 'react';
import Section from './Section';
import type { Testimonial } from '../types';
import SkeletonLoader from './SkeletonLoader';

interface TestimonialsProps {
  testimonials: Testimonial[] | null;
}

const TestimonialsSkeleton: React.FC = () => (
  <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="bg-slate-50 p-4 sm:p-6 rounded-lg space-y-3">
        <SkeletonLoader className="h-4 w-full rounded" />
        <SkeletonLoader className="h-4 w-5/6 rounded" />
        <SkeletonLoader className="h-4 w-1/3 rounded" />
      </div>
    ))}
  </div>
);

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
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-bg-canvas p-6 sm:p-8 rounded-xl border border-border-subtle shadow-subtle hover:shadow-md transition-all duration-300 flex flex-col">
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
        <TestimonialsSkeleton />
      )}
    </Section>
  );
};

export default Testimonials;