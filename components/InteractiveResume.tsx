import React, { useState } from 'react';
import Section from './Section';
import type { PortfolioData } from '../types';

interface InteractiveResumeProps {
  data: PortfolioData | null;
}

const InteractiveResume: React.FC<InteractiveResumeProps> = ({ data }) => {
  const [showScreenPreview, setShowScreenPreview] = useState(false);

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
    link.download = `resume-${data.profile.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!data) return null;

  const linkedinUrl = data.profile.socials?.linkedin || '';

  return (
    <Section id="resume" title="Curriculum Vitae" iconClass="fas fa-file-lines" noContainer>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Actions Card */}
        <div className="bg-bg-app p-6 sm:p-8 rounded-3xl border border-border-subtle shadow-sm no-print">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 bg-brand-accent/10 border border-brand-accent/20 rounded-full mb-3">
                <span className="w-2 h-2 rounded-full bg-brand-accent"></span>
                <span className="text-[10px] font-bold text-brand-accent uppercase tracking-widest">Verified Credentials</span>
              </div>
              <h3 className="text-2xl font-bold text-text-primary tracking-tight mb-2">
                Executive ATS-Ready Resume
              </h3>
              <p className="text-sm text-text-secondary leading-relaxed font-medium max-w-2xl">
                Format resume terstandarisasi untuk evaluasi teknis, instansi pemerintahan, dan perusahaan konsultan teknik. Dapat diunduh dalam format PDF atau diekspor ke data terstruktur JSON.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setShowScreenPreview(!showScreenPreview)}
                className="flex items-center px-4 py-2.5 rounded-xl border border-border-subtle bg-bg-canvas hover:bg-bg-app text-text-primary text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
              >
                <i className={`fas ${showScreenPreview ? 'fa-eye-slash' : 'fa-eye'} mr-2 text-brand-accent`}></i>
                {showScreenPreview ? 'Hide Preview' : 'Preview ATS'}
              </button>

              <button
                onClick={downloadPDF}
                className="flex items-center px-5 py-2.5 rounded-xl bg-brand-accent hover:bg-brand-accent-hover text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm hover:shadow-md active:scale-95 cursor-pointer"
              >
                <i className="fas fa-file-pdf mr-2"></i>
                Download PDF
              </button>

              <button
                onClick={downloadJSON}
                className="flex items-center px-4 py-2.5 rounded-xl border border-border-subtle bg-bg-canvas hover:bg-bg-app text-text-secondary hover:text-text-primary text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
              >
                <i className="fas fa-code mr-2 text-text-muted"></i>
                Export JSON
              </button>
            </div>
          </div>
        </div>

        {/* ATS Resume View (Visible when print OR when preview toggled on screen) */}
        <div className={`${showScreenPreview ? 'block' : 'print:block hidden'} transition-all duration-300`}>
          <div className="bg-white p-8 sm:p-12 max-w-4xl mx-auto text-black font-sans rounded-2xl border border-border-subtle shadow-md print:shadow-none print:border-none print:p-0">
            {/* ATS Header */}
            <div className="text-center pb-6 mb-6 border-b-2 border-gray-300">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1">{data.profile.name}</h1>
              <p className="text-lg font-semibold text-gray-700 mb-2">{data.profile.title}</p>
              <div className="text-xs sm:text-sm font-medium text-gray-600 flex flex-wrap justify-center gap-x-3 gap-y-1">
                <span>{data.profile.location}</span>
                <span>•</span>
                <span>{data.profile.phone}</span>
                <span>•</span>
                <a href={`mailto:${data.profile.email}`} className="text-gray-900 underline">{data.profile.email}</a>
                {linkedinUrl && (
                  <>
                    <span>•</span>
                    <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-gray-900 underline">LinkedIn</a>
                  </>
                )}
              </div>
            </div>

            <div className="space-y-6">
              {/* Profile Summary */}
              <section>
                <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-2 border-b border-gray-300 pb-1">
                  Professional Summary
                </h2>
                <p className="text-gray-800 leading-relaxed text-xs sm:text-sm">{data.summary}</p>
              </section>

              {/* Experience */}
              <section>
                <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-3 border-b border-gray-300 pb-1">
                  Work Experience
                </h2>
                <div className="space-y-4">
                  {data.experience.map((exp, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between items-baseline">
                        <h3 className="font-bold text-sm text-gray-900">{exp.role}</h3>
                        <span className="text-xs font-semibold text-gray-600">{exp.period}</span>
                      </div>
                      <p className="text-xs font-semibold text-gray-700">{exp.company}</p>
                      <ul className="list-disc pl-5 space-y-1 mt-1">
                        {exp.responsibilities.map((resp, i) => (
                          <li key={i} className="text-gray-800 text-xs leading-relaxed">
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
                <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-2 border-b border-gray-300 pb-1">
                  Education
                </h2>
                <div className="space-y-2">
                  {data.education.map((edu, index) => (
                    <div key={index} className="flex justify-between items-baseline">
                      <div>
                        <h3 className="font-bold text-xs sm:text-sm text-gray-900">{edu.institution}</h3>
                        <p className="text-xs text-gray-700">{edu.degree}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-semibold text-gray-900">{edu.period}</p>
                        <p className="text-xs text-gray-600">IPK / GPA: {edu.gpa}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Skills */}
              <section>
                <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-2 border-b border-gray-300 pb-1">
                  Technical Expertise & Engineering Tools
                </h2>
                <div className="space-y-1">
                  {data.skills.map((skillCat, index) => (
                    <div key={index} className="text-xs leading-relaxed">
                      <span className="font-bold text-gray-900">{skillCat.category}: </span>
                      <span className="text-gray-700">{skillCat.skills.join(', ')}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Certifications */}
              <section>
                <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900 mb-2 border-b border-gray-300 pb-1">
                  Professional Certifications & Credentials
                </h2>
                <ul className="list-disc pl-5 space-y-1">
                  {data.certifications.map((cert, index) => (
                    <li key={index} className="text-gray-800 text-xs leading-relaxed">
                      {cert}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Print Footer */}
            <div className="mt-8 pt-3 border-t border-gray-300 text-center">
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">
                Curriculum Vitae • Ari Azhar Maulana, ST. • Water Resources & GIS Engineer
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default InteractiveResume;