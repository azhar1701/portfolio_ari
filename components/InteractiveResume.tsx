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
    <Section id="resume" title="Interactive Resume" iconClass="fas fa-file-download">
      <div className="space-y-6">
        <div className="bg-bg-canvas p-6 sm:p-8 rounded-xl border border-border-subtle shadow-subtle">
          <h3 className="text-lg font-extrabold text-text-primary mb-6 flex items-center tracking-tight">
            <i className="fas fa-download mr-2 text-brand-accent/50 text-sm"></i>
            Download Options
          </h3>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={downloadPDF}
              className="flex items-center px-5 py-2.5 bg-red-600 text-white font-extrabold text-xs uppercase tracking-widest rounded-lg hover:bg-red-700 transition-all shadow-sm hover:shadow-md focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              <i className="fas fa-file-pdf mr-2"></i>
              Download PDF
            </button>
            <button
              onClick={downloadJSON}
              className="flex items-center px-5 py-2.5 bg-brand-accent text-white font-extrabold text-xs uppercase tracking-widest rounded-lg hover:bg-brand-accent-hover transition-all shadow-sm hover:shadow-md focus:ring-2 focus:ring-brand-accent focus:ring-offset-2"
            >
              <i className="fas fa-code mr-2"></i>
              Download Data
            </button>
          </div>
        </div>

        <div className="print:block hidden">
          <div className="bg-white p-8 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-slate-800">{data.profile.name}</h1>
              <p className="text-xl text-cyan-600 mb-2">{data.profile.title}</p>
              <div className="flex justify-center space-x-4 text-sm text-slate-600">
                <span>{data.profile.email}</span>
                <span>•</span>
                <span>{data.profile.phone}</span>
                <span>•</span>
                <span>{data.profile.location}</span>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold text-slate-800 border-b border-slate-300 pb-2 mb-3">
                Professional Summary
              </h2>
              <p className="text-slate-600">{data.summary}</p>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold text-slate-800 border-b border-slate-300 pb-2 mb-3">
                Experience
              </h2>
              {data.experience.map((exp, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-slate-800">{exp.role}</h3>
                      <p className="text-slate-600">{exp.company}</p>
                    </div>
                    <span className="text-sm text-slate-500">{exp.period}</span>
                  </div>
                  <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                    {exp.responsibilities.slice(0, 3).map((resp, i) => (
                      <li key={i}>{resp}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg font-semibold text-slate-800 border-b border-slate-300 pb-2 mb-3">
                  Skills
                </h2>
                {data.skills.map((skillCat, index) => (
                  <div key={index} className="mb-3">
                    <h4 className="font-medium text-slate-700">{skillCat.category}</h4>
                    <p className="text-sm text-slate-600">{skillCat.skills.join(', ')}</p>
                  </div>
                ))}
              </div>

              <div>
                <h2 className="text-lg font-semibold text-slate-800 border-b border-slate-300 pb-2 mb-3">
                  Education
                </h2>
                {data.education.map((edu, index) => (
                  <div key={index} className="mb-3">
                    <h4 className="font-medium text-slate-700">{edu.degree}</h4>
                    <p className="text-sm text-slate-600">{edu.institution}</p>
                    <p className="text-sm text-slate-500">{edu.period} • GPA: {edu.gpa}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-bg-canvas p-6 sm:p-8 rounded-xl border border-border-subtle shadow-subtle">
          <h3 className="text-lg font-extrabold text-text-primary mb-4 flex items-center tracking-tight">
            <i className="fas fa-info-circle mr-2 text-brand-accent/50 text-sm"></i>
            Resume Preview
          </h3>
          <p className="text-text-secondary mb-6 leading-relaxed">
            Click <span className="font-bold text-text-primary">"Download PDF"</span> to generate a print-friendly version of the resume, or <span className="font-bold text-accent-primary text-brand-accent">"Download Data"</span> to get the structured data in JSON format.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-[10px] font-extrabold text-text-muted uppercase tracking-widest">
            <div className="flex items-center"><i className="fas fa-check-circle text-brand-accent mr-2"></i> ATS Optimized</div>
            <div className="flex items-center"><i className="fas fa-check-circle text-brand-accent mr-2"></i> JSON Integration</div>
            <div className="flex items-center"><i className="fas fa-check-circle text-brand-accent mr-2"></i> Print Ready</div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default InteractiveResume;