
import React from 'react';

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  iconClass: string;
  noContainer?: boolean;
}

const Section: React.FC<SectionProps> = ({ id, title, children, iconClass, noContainer }) => {
  return (
    <section
      id={id}
      className="py-20 sm:py-28 lg:py-32 will-change-transform-opacity"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      <div className="mb-12 sm:mb-16">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary tracking-tighter">
          {title}
        </h2>
        <div className="h-1.5 w-16 bg-brand-accent mt-5 rounded-full opacity-80"></div>
      </div>
      {noContainer ? children : (
        <div className="bg-bg-canvas rounded-[2.5rem] shadow-subtle border border-border-subtle/50 p-8 sm:p-16 lg:p-20">
          {children}
        </div>
      )}
    </section>
  );
};

export default Section;
