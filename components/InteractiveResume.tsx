import React from 'react';
import Section from './Section';
import type { PortfolioData } from '../types';

interface InteractiveResumeProps {
  data: PortfolioData | null;
}

const InteractiveResume: React.FC<InteractiveResumeProps> = ({ data }) => {
  const downloadPDF = () => {
    window.print();
  };

  const downloadJSON = () => {
    if (!data) return;
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'resume-data.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!data) return null;

  return (
    <Section id="resume" title="Interactive Resume" iconClass="fas fa-file-export">
      <div className="space-y-6">
        <div className="bg-bg-canvas p-6 sm:p-8 rounded-xl border border-border-subtle shadow-subtle max-w-full overflow-hidden">
          <h3 className="text-lg font-bold text-text-primary mb-6 flex items-center tracking-tight">
            <i className="fas fa-download mr-2 text-brand-accent/50 text-sm"></i>
            Download Options
          </h3>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={downloadPDF}
              className="flex items-center min-h-[44px] px-6 py-2.5 bg-red-600 text-white font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-red-700 transition-all shadow-sm hover:shadow-md focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              <i className="fas fa-file-pdf mr-2"></i>
              Download PDF
            </button>
            <button
              onClick={downloadJSON}
              className="flex items-center min-h-[44px] px-6 py-2.5 bg-brand-accent text-white font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-brand-accent-hover transition-all shadow-sm hover:shadow-md focus:ring-2 focus:ring-brand-accent focus:ring-offset-2"
            >
              <i className="fas fa-code mr-2"></i>
              Download Data
            </button>
          </div>
        </div>

        <div className="print:block hidden">
          <div className="bg-white p-10 max-w-4xl mx-auto text-text-primary font-sans">
            {/* ATS Header */}
            <div className="text-center pb-6 mb-6 border-b-2 border-border-subtle">
              <h1 className="text-4xl font-bold text-text-primary mb-2">{data.profile.name}</h1>
              <p className="text-xl font-medium text-text-secondary mb-3">{data.profile.title}</p>
              <div className="text-sm font-medium text-text-secondary">
                {data.profile.location} • {data.profile.phone} • {data.profile.email} • {data.profile.socials.linkedin}
              </div>
            </div>

            <div className="space-y-8">
              {/* Profile Summary */}
              <section>
                <h2 className="text-lg font-bold uppercase tracking-widest text-text-primary mb-3 border-b border-border-subtle pb-1">Professional Summary</h2>
                <p className="text-text-secondary leading-relaxed text-sm">{data.summary}</p>
              </section>

              {/* Experience */}
              <section>
                <h2 className="text-lg font-bold uppercase tracking-widest text-text-primary mb-4 border-b border-border-subtle pb-1">Experience</h2>
                <div className="space-y-6">
                  {data.experience.map((exp, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-baseline mb-1">
                        <h3 className="font-bold text-base text-text-primary">{exp.role}</h3>
                        <span className="text-sm font-bold text-text-primary">{exp.period}</span>
                      </div>
                      <p className="text-text-secondary font-bold text-sm mb-3">{exp.company}</p>
                      <ul className="list-disc pl-5 space-y-1.5">
                        {exp.responsibilities.map((resp, i) => (
                          <li key={i} className="text-text-secondary text-sm leading-relaxed">
                            {resp}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* Education */}
              <section>
                <h2 className="text-lg font-bold uppercase tracking-widest text-text-primary mb-4 border-b border-border-subtle pb-1">Education</h2>
                <div className="space-y-4">
                  {data.education.map((edu, index) => (
                    <div key={index} className="flex justify-between items-baseline">
                      <div>
                        <h3 className="font-bold text-base text-text-primary">{edu.institution}</h3>
                        <p className="text-sm text-text-secondary">{edu.degree}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-text-primary">{edu.period}</p>
                        <p className="text-sm text-text-secondary">GPA: {edu.gpa}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Skills */}
              <section>
                <h2 className="text-lg font-bold uppercase tracking-widest text-text-primary mb-4 border-b border-border-subtle pb-1">Technical Skills</h2>
                <div className="space-y-2">
                  {data.skills.map((skillCat, index) => (
                    <div key={index} className="text-sm">
                      <span className="font-bold text-text-primary mr-2">{skillCat.category}:</span>
                      <span className="text-text-secondary">{skillCat.skills.join(', ')}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Certifications */}
              <section>
                <h2 className="text-lg font-bold uppercase tracking-widest text-text-primary mb-4 border-b border-border-subtle pb-1">Certifications</h2>
                <ul className="list-disc pl-5 space-y-1.5">
                  {data.certifications.map((cert, index) => (
                    <li key={index} className="text-text-secondary text-sm leading-relaxed">
                      {cert}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Print Footer */}
            <div className="mt-10 pt-4 border-t border-border-subtle text-center">
              <p className="text-xs text-text-muted uppercase tracking-widest">Compiled directly via the Portfolio Platform</p>
            </div>
          </div>
        </div>

        <div className="bg-bg-canvas p-6 sm:p-8 rounded-xl border border-border-subtle shadow-subtle max-w-full overflow-hidden">
          <h3 className="text-lg font-bold text-text-primary mb-4 flex items-center tracking-tight">
            <i className="fas fa-info-circle mr-2 text-brand-accent/50 text-sm"></i>
            Resume Preview
          </h3>
          <p className="text-text-secondary mb-6 leading-relaxed">
            Click <span className="font-bold text-text-primary">"Download PDF"</span> to generate a print-friendly version of the resume, or <span className="font-bold text-accent-primary text-brand-accent">"Download Data"</span> to get the structured data in JSON format.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-bold text-text-muted uppercase tracking-widest">
            <div className="flex items-center min-h-[32px]"><i className="fas fa-check-circle text-brand-accent mr-2"></i> ATS Optimized</div>
            <div className="flex items-center min-h-[32px]"><i className="fas fa-check-circle text-brand-accent mr-2"></i> JSON Integration</div>
            <div className="flex items-center min-h-[32px]"><i className="fas fa-check-circle text-brand-accent mr-2"></i> Print Ready</div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default InteractiveResume;