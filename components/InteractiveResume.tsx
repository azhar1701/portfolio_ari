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
          <div className="bg-white p-10 max-w-5xl mx-auto text-slate-900 font-sans">
            {/* Header */}
            <div className="border-b-2 border-slate-900 pb-8 mb-8 flex justify-between items-end">
              <div>
                <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-1">{data.profile.name}</h1>
                <p className="text-xl font-medium text-cyan-700 uppercase tracking-widest">{data.profile.title}</p>
              </div>
              <div className="text-right text-sm space-y-1 text-slate-600 font-medium">
                <p>{data.profile.location}</p>
                <p>{data.profile.email}</p>
                <p>{data.profile.phone}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-12">
              {/* Main Column */}
              <div className="col-span-2 space-y-10">
                <section>
                  <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-4 border-b border-slate-100 pb-2">Profile</h2>
                  <p className="text-slate-700 leading-relaxed text-base">{data.summary}</p>
                </section>

                <section>
                  <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-6 border-b border-slate-100 pb-2">Experience</h2>
                  <div className="space-y-8">
                    {data.experience.map((exp, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-baseline mb-2">
                          <h3 className="font-bold text-lg text-slate-900">{exp.role}</h3>
                          <span className="text-sm font-bold text-slate-500 whitespace-nowrap ml-4">{exp.period}</span>
                        </div>
                        <p className="text-cyan-700 font-bold text-sm mb-3 uppercase tracking-wide">{exp.company}</p>
                        <ul className="space-y-2">
                          {exp.responsibilities.map((resp, i) => (
                            <li key={i} className="text-slate-700 text-sm leading-relaxed flex items-start">
                              <span className="text-cyan-600 mr-2 mt-1.5 w-1 h-1 bg-cyan-600 rounded-full flex-shrink-0"></span>
                              {resp}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              {/* Sidebar Column */}
              <div className="col-span-1 space-y-10">
                <section>
                  <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-4 border-b border-slate-100 pb-2">Technical Arsenal</h2>
                  <div className="space-y-6">
                    {data.skills.map((skillCat, index) => (
                      <div key={index}>
                        <h4 className="font-bold text-xs text-slate-900 uppercase tracking-wider mb-2">{skillCat.category}</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {skillCat.skills.map(skill => (
                            <span key={skill} className="text-[11px] font-medium text-slate-600 border border-slate-200 px-2 py-0.5 rounded leading-none">{skill}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-4 border-b border-slate-100 pb-2">Education</h2>
                  <div className="space-y-4">
                    {data.education.map((edu, index) => (
                      <div key={index}>
                        <h4 className="font-bold text-sm text-slate-900 leading-tight">{edu.institution}</h4>
                        <p className="text-xs text-slate-600 font-medium mt-1">{edu.degree}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">{edu.period} • GPA {edu.gpa}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-4 border-b border-slate-100 pb-2">Credentials</h2>
                  <div className="space-y-2">
                    {data.certifications.slice(0, 5).map((cert, index) => (
                      <div key={index} className="flex items-start text-[11px] leading-tight text-slate-600">
                        <i className="fas fa-check-circle text-cyan-600 mr-2 mt-0.5"></i>
                        <span>{cert}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
            </div>
            
            {/* Print Footer */}
            <div className="mt-12 pt-6 border-t border-slate-100 text-center">
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-[0.3em]">Generated via Portfolio Portal • {new Date().toLocaleDateString()}</p>
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