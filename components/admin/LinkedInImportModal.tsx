import React, { useState, useRef } from 'react';
import { parseLinkedInPdf, ParsedLinkedInData, mergeLinkedInIntoPortfolio } from '../../services/linkedinPdfParser';
import type { PortfolioData } from '../../types';

interface LinkedInImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPortfolioData: PortfolioData;
  onApplyParsedData: (mergedData: PortfolioData) => void;
}

export const LinkedInImportModal: React.FC<LinkedInImportModalProps> = ({
  isOpen,
  onClose,
  currentPortfolioData,
  onApplyParsedData,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);
  const [parsedResult, setParsedResult] = useState<ParsedLinkedInData | null>(null);

  // Selected sections to import
  const [selectedSections, setSelectedSections] = useState({
    profile: true,
    summary: true,
    experience: true,
    education: true,
    skills: true,
    certifications: true,
    publications: true,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      if (selected.type !== 'application/pdf' && !selected.name.endsWith('.pdf')) {
        setParseError('Please select a valid .pdf file.');
        return;
      }
      setFile(selected);
      setParseError(null);
      setParsedResult(null);
    }
  };

  const handleStartParse = async () => {
    if (!file) return;
    setIsParsing(true);
    setParseError(null);

    try {
      const data = await parseLinkedInPdf(file);
      setParsedResult(data);
    } catch (err: any) {
      console.error('LinkedIn PDF Parse error:', err);
      setParseError(err?.message || 'Failed to parse LinkedIn PDF. Ensure it is an official PDF export from LinkedIn.');
    } finally {
      setIsParsing(false);
    }
  };

  const handleApply = () => {
    if (!parsedResult) return;
    const merged = mergeLinkedInIntoPortfolio(currentPortfolioData, parsedResult, selectedSections);
    onApplyParsedData(merged);
    onClose();
  };

  const toggleSection = (key: keyof typeof selectedSections) => {
    setSelectedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const resetState = () => {
    setFile(null);
    setParsedResult(null);
    setParseError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div
      className="fixed inset-0 z-[9990] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden text-slate-200 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-950/90 border-b border-slate-800 px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0a66c2]/20 border border-[#0a66c2]/40 flex items-center justify-center text-[#0a66c2]">
              <i className="fab fa-linkedin text-xl"></i>
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                Import from LinkedIn Resume (PDF)
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-sky-950 text-sky-400 border border-sky-800">
                  Option B
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Ekstrak riwayat karir, edukasi, dan keahlian langsung dari resume PDF LinkedIn
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              resetState();
              onClose();
            }}
            className="w-8 h-8 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 flex items-center justify-center transition-colors"
          >
            <i className="fas fa-times text-sm"></i>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
          {!parsedResult ? (
            /* Upload & Instructions Stage */
            <div className="space-y-6">
              {/* LinkedIn Guide Steps */}
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 space-y-3">
                <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                  <i className="fas fa-circle-info text-sky-400"></i>
                  Cara Mengunduh PDF dari LinkedIn:
                </h4>
                <ol className="text-xs text-slate-400 space-y-2 list-decimal list-inside pl-1">
                  <li>Buka profil LinkedIn Anda di browser (<a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-sky-400 hover:underline">linkedin.com</a>).</li>
                  <li>Di bagian atas profil Anda, klik tombol <span className="text-slate-200 font-semibold bg-slate-800 px-1.5 py-0.5 rounded">More / Lainnya</span> di samping tombol Edit Profile.</li>
                  <li>Pilih opsi <span className="text-slate-200 font-semibold bg-slate-800 px-1.5 py-0.5 rounded"><i className="fas fa-download mr-1"></i>Save to PDF</span>.</li>
                  <li>Unggah file PDF hasil unduhan tersebut di bawah ini.</li>
                </ol>
              </div>

              {/* Drag and Drop Zone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                  file
                    ? 'border-sky-500/60 bg-sky-950/10'
                    : 'border-slate-700 hover:border-slate-500 hover:bg-slate-800/40'
                }`}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".pdf,application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-300">
                  <i className="fas fa-file-pdf text-2xl text-rose-400"></i>
                </div>
                {file ? (
                  <div className="space-y-1">
                    <p className="font-semibold text-white text-sm">{file.name}</p>
                    <p className="text-xs text-slate-400 font-mono">
                      {(file.size / 1024).toFixed(1)} KB • Siap diproses
                    </p>
                    <p className="text-[11px] text-sky-400 pt-2 font-medium">
                      Klik untuk ganti file
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <p className="font-semibold text-slate-200 text-sm">
                      Klik atau seret file PDF LinkedIn ke sini
                    </p>
                    <p className="text-xs text-slate-500">Mendukung file resume resmi berformat .PDF</p>
                  </div>
                )}
              </div>

              {parseError && (
                <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
                  <i className="fas fa-triangle-exclamation text-rose-400 mt-0.5 shrink-0"></i>
                  <span>{parseError}</span>
                </div>
              )}
            </div>
          ) : (
            /* Parsed Review & Selection Stage */
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <i className="fas fa-check-circle text-emerald-400"></i>
                    Data Berhasil Diekstrak dari PDF
                  </h4>
                  <p className="text-xs text-slate-400">
                    Pilih bagian data yang ingin Anda terapkan ke formulir portfolio:
                  </p>
                </div>
                <button
                  type="button"
                  onClick={resetState}
                  className="text-xs text-slate-400 hover:text-white underline"
                >
                  Unggah file lain
                </button>
              </div>

              {/* Summary Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {/* Profile Card */}
                <div
                  onClick={() => toggleSection('profile')}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    selectedSections.profile
                      ? 'bg-slate-800/80 border-sky-500/60'
                      : 'bg-slate-900/60 border-slate-800 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-xs text-slate-200 flex items-center gap-2">
                      <i className="fas fa-id-card text-sky-400"></i> Profile Info
                    </span>
                    <input
                      type="checkbox"
                      checked={selectedSections.profile}
                      onChange={() => {}}
                      className="rounded border-slate-700 text-sky-500 focus:ring-0"
                    />
                  </div>
                  <div className="text-xs text-slate-400 space-y-1 font-mono">
                    <p className="text-white font-sans font-medium">{parsedResult.profile?.name || '-'}</p>
                    <p className="text-[11px] truncate">{parsedResult.profile?.title || '-'}</p>
                    <p className="text-[11px] truncate">{parsedResult.profile?.location || '-'}</p>
                    {parsedResult.profile?.email && (
                      <p className="text-[11px] text-sky-400 truncate">{parsedResult.profile.email}</p>
                    )}
                  </div>
                </div>

                {/* Experience Card */}
                <div
                  onClick={() => toggleSection('experience')}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    selectedSections.experience
                      ? 'bg-slate-800/80 border-sky-500/60'
                      : 'bg-slate-900/60 border-slate-800 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-xs text-slate-200 flex items-center gap-2">
                      <i className="fas fa-route text-emerald-400"></i> Work Experience
                    </span>
                    <input
                      type="checkbox"
                      checked={selectedSections.experience}
                      onChange={() => {}}
                      className="rounded border-slate-700 text-sky-500 focus:ring-0"
                    />
                  </div>
                  <div className="text-xs text-slate-400 space-y-1">
                    <p className="text-emerald-400 font-semibold">
                      {parsedResult.experience?.length || 0} Posisi Pekerjaan Terdeteksi
                    </p>
                    {parsedResult.experience?.slice(0, 2).map((exp, i) => (
                      <p key={i} className="truncate text-[11px]">
                        • {exp.role} ({exp.company})
                      </p>
                    ))}
                    {(parsedResult.experience?.length || 0) > 2 && (
                      <p className="text-[10px] text-slate-500 italic">+ {(parsedResult.experience?.length || 0) - 2} lainnya...</p>
                    )}
                  </div>
                </div>

                {/* Education Card */}
                <div
                  onClick={() => toggleSection('education')}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    selectedSections.education
                      ? 'bg-slate-800/80 border-sky-500/60'
                      : 'bg-slate-900/60 border-slate-800 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-xs text-slate-200 flex items-center gap-2">
                      <i className="fas fa-graduation-cap text-amber-400"></i> Education
                    </span>
                    <input
                      type="checkbox"
                      checked={selectedSections.education}
                      onChange={() => {}}
                      className="rounded border-slate-700 text-sky-500 focus:ring-0"
                    />
                  </div>
                  <div className="text-xs text-slate-400 space-y-1">
                    <p className="text-amber-400 font-semibold">
                      {parsedResult.education?.length || 0} Riwayat Pendidikan Terdeteksi
                    </p>
                    {parsedResult.education?.map((edu, i) => (
                      <p key={i} className="truncate text-[11px]">
                        • {edu.institution} - {edu.degree}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Skills & Certifications Card */}
                <div
                  onClick={() => {
                    toggleSection('skills');
                    toggleSection('certifications');
                  }}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    selectedSections.skills || selectedSections.certifications
                      ? 'bg-slate-800/80 border-sky-500/60'
                      : 'bg-slate-900/60 border-slate-800 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-xs text-slate-200 flex items-center gap-2">
                      <i className="fas fa-certificate text-purple-400"></i> Skills & Certifications
                    </span>
                    <input
                      type="checkbox"
                      checked={selectedSections.skills || selectedSections.certifications}
                      onChange={() => {}}
                      className="rounded border-slate-700 text-sky-500 focus:ring-0"
                    />
                  </div>
                  <div className="text-xs text-slate-400 space-y-1">
                    <p className="text-purple-400 font-semibold">
                      {parsedResult.skills?.length || 0} Skills • {parsedResult.certifications?.length || 0} Sertifikasi
                    </p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {parsedResult.skills?.slice(0, 4).map((sk, i) => (
                        <span key={i} className="px-1.5 py-0.5 rounded bg-slate-950 text-[10px] text-slate-300">
                          {sk}
                        </span>
                      ))}
                      {(parsedResult.skills?.length || 0) > 4 && (
                        <span className="text-[10px] text-slate-500">+{(parsedResult.skills?.length || 0) - 4}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary Text Preview (if present) */}
              {parsedResult.summary && (
                <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <i className="fas fa-align-left text-sky-400"></i> Professional Summary Preview
                    </span>
                    <input
                      type="checkbox"
                      checked={selectedSections.summary}
                      onChange={() => toggleSection('summary')}
                      className="rounded border-slate-700 text-sky-500 focus:ring-0"
                    />
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-3 italic">
                    "{parsedResult.summary}"
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-950/90 border-t border-slate-800 px-6 py-4 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={() => {
              resetState();
              onClose();
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            Batal
          </button>

          {!parsedResult ? (
            <button
              type="button"
              disabled={!file || isParsing}
              onClick={handleStartParse}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold text-white transition-all ${
                !file || isParsing
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-[#0a66c2] hover:bg-[#004182] shadow-lg shadow-[#0a66c2]/20'
              }`}
            >
              {isParsing ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Membaca PDF LinkedIn...
                </>
              ) : (
                <>
                  <i className="fas fa-wand-magic-sparkles"></i> Analisis & Ekstrak Data
                </>
              )}
            </button>
          ) : (
            <button
              type="button"
              onClick={handleApply}
              className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-600/20 transition-all"
            >
              <i className="fas fa-arrow-right-to-bracket"></i> Terapkan ke Form Admin
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default LinkedInImportModal;
