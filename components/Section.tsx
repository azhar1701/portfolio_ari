
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
      className="py-8 md:py-12"
      data-aos="fade-up"
      data-aos-duration="800"
    >
      <div className="flex items-center mb-6">
        <i className={`${iconClass} text-3xl text-cyan-600 dark:text-cyan-400 mr-4`}></i>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100 border-b-2 border-cyan-500 pb-2">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
};

export default Section;
