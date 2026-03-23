
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
      className="py-8 sm:py-12 lg:py-16 will-change-transform-opacity"
    >
      <div className="mb-10 sm:mb-14">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text-primary tracking-tighter">
          {title}
        </h2>
        <div className="h-1.5 w-16 bg-brand-accent mt-5 rounded-full opacity-80"></div>
      </div>
      {noContainer ? children : (
        <div className="bg-bg-canvas rounded-3xl sm:rounded-[2.5rem] shadow-subtle border border-border-subtle/50 p-6 sm:p-10 lg:p-12">
          {children}
        </div>
      )}
    </section>
  );
};

export default Section;
