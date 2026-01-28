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
        className={`fas fa-star text-sm ${
          i < rating ? 'text-yellow-400' : 'text-slate-300'
        }`}
      ></i>
    ))}
  </div>
);

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  return (
    <Section id="testimonials" title="Testimonials" iconClass="fas fa-quote-left">
      {testimonials ? (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-slate-50 p-4 sm:p-6 rounded-lg border border-slate-200">
              <div className="mb-4">
                <StarRating rating={testimonial.rating} />
              </div>
              <blockquote className="text-slate-600 mb-4 italic text-sm sm:text-base">
                "{testimonial.content}"
              </blockquote>
              <div className="flex items-center">
                {(testimonial.avatar || testimonial.image) && (
                  <img
                    src={testimonial.avatar || testimonial.image}
                    alt={testimonial.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 sm:mr-4 object-cover"
                  />
                )}
                <div>
                  <h4 className="font-semibold text-slate-800 text-sm sm:text-base">{testimonial.name}</h4>
                  <p className="text-xs sm:text-sm text-slate-600">{testimonial.role || testimonial.position}</p>
                  <p className="text-xs sm:text-sm text-cyan-600">{testimonial.company}</p>
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