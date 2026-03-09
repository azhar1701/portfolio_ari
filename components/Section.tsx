
import React from 'react';

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  iconClass: string;
}

const Section: React.FC<SectionProps> = ({ id, title, children, iconClass }) => {
  return (
    <section
      id={id}
      className="py-8 sm:py-12 lg:py-16"
      data-aos="fade-up"
      data-aos-duration="800"
    >
      <div className="flex items-center mb-6 lg:mb-8">
        <i className={`${iconClass} text-2xl sm:text-3xl text-brand-accent mr-3 sm:mr-4`}></i>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-text-primary border-b-2 border-brand-accent pb-2 tracking-tight">
          {title}
        </h2>
      </div>
      <div className="bg-bg-canvas rounded-lg shadow-subtle border border-border-subtle p-4 sm:p-6 lg:p-8">
        {children}
      </div>
    </section>
  );
};

export default Section;
