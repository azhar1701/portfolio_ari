import React, { useState, useEffect } from 'react';
import {
  getGeminiApiKey,
  saveGeminiApiKey,
  hasGeminiApiKey,
  polishEngineeringContent,
  generateProjectCaseStudy,
  translateTechnicalContent,
} from '../../services/aiService';

export type AIMode = 'polish' | 'case-study' | 'translate';

export interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: AIMode;
  initialContent?: string;
  initialContext?: {
    projectName?: string;
    tools?: string;
    targetType?: 'summary' | 'responsibilities' | 'achievements';
    fieldName?: string;
  };
  onApply: (result: any) => void;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'polish',
  initialContent = '',
  initialContext = {},
  onApply,
}) => {
  const [mode, setMode] = useState<AIMode>(initialMode);
  const [apiKey, setApiKey] = useState(getGeminiApiKey());
  const [showSettings, setShowSettings] = useState(!hasGeminiApiKey());
  const [tempApiKey, setTempApiKey] = useState(getGeminiApiKey());

  // Polish state
  const [polishInput, setPolishInput] = useState(initialContent);
  const [targetType, setTargetType] = useState<'summary' | 'responsibilities' | 'achievements'>(
    initialContext.targetType || 'responsibilities'
  );
  const [polishLang, setPolishLang] = useState<'id' | 'en'>('id');

  // Case study state
  const [projectName, setProjectName] = useState(initialContext.projectName || '');
  const [projectOverview, setProjectOverview] = useState(initialContent || '');
  const [projectTools, setProjectTools] = useState(initialContext.tools || 'QGIS, HEC-RAS, Python');
  const [caseStudyLang, setCaseStudyLang] = useState<'id' | 'en'>('id');

  // Translate state
  const [translateInput, setTranslateInput] = useState(initialContent);
  const [translateDirection, setTranslateDirection] = useState<'id_to_en' | 'en_to_id'>('id_to_en');

  // Execution & Output state
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [outputResult, setOutputResult] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      if (initialContent) {
        setPolishInput(initialContent);
        setProjectOverview(initialContent);
        setTranslateInput(initialContent);
      }
      if (initialContext.projectName) setProjectName(initialContext.projectName);
      if (initialContext.tools) setProjectTools(initialContext.tools);
      if (initialContext.targetType) setTargetType(initialContext.targetType);

      setOutputResult(null);
      setErrorMessage(null);
      setApiKey(getGeminiApiKey());
      setTempApiKey(getGeminiApiKey());
      setShowSettings(!hasGeminiApiKey());
    }
  }, [isOpen, initialMode, initialContent, initialContext]);

  if (!isOpen) return null;

  const handleSaveApiKey = () => {
    saveGeminiApiKey(tempApiKey);
    setApiKey(tempApiKey);
    setShowSettings(false);
    setErrorMessage(null);
  };

  const handleExecute = async () => {
    if (!hasGeminiApiKey()) {
      setShowSettings(true);
      setErrorMessage('Silakan masukkan Google Gemini API Key terlebih dahulu.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setOutputResult(null);

    try {
      if (mode === 'polish') {
        if (!polishInput.trim()) {
          throw new Error('Teks masukan tidak boleh kosong.');
        }
        const result = await polishEngineeringContent(polishInput, targetType, polishLang);
        setOutputResult(result);
      } else if (mode === 'case-study') {
        if (!projectName.trim()) {
          throw new Error('Nama proyek wajib diisi.');
        }
        const result = await generateProjectCaseStudy(
          projectName,
          projectOverview,
          projectTools,
          caseStudyLang
        );
        setOutputResult(result);
      } else if (mode === 'translate') {
        if (!translateInput.trim()) {
          throw new Error('Teks masukan tidak boleh kosong.');
        }
        const result = await translateTechnicalContent(translateInput, translateDirection);
        setOutputResult(result);
      }
    } catch (err: any) {
      console.error('AI execution failed:', err);
      setErrorMessage(err?.message || 'Terjadi kesalahan saat memproses AI.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyResult = () => {
    if (!outputResult) return;
    onApply(outputResult);
    onClose();
  };

  const handleCopy = () => {
    const textToCopy = typeof outputResult === 'string' ? outputResult : JSON.stringify(outputResult, null, 2);
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-[9990] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden text-slate-200 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-slate-950/90 border-b border-slate-800 px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500/20 to-sky-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
              <i className="fas fa-wand-magic-sparkles text-lg"></i>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-tight">AI Engineering Copilot</h3>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-500/40">
                  Gemini 2.0
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Otomasi & optimasi konten berstandar industri Water Resources & GIS
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowSettings(!showSettings)}
              className={`p-2 rounded-lg text-xs font-semibold border transition-colors ${
                showSettings || !hasGeminiApiKey()
                  ? 'bg-amber-950/60 border-amber-500/50 text-amber-300'
                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
              }`}
              title="Pengaturan API Key"
            >
              <i className="fas fa-key mr-1.5"></i>
              <span>API Key</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 flex items-center justify-center transition-colors"
            >
              <i className="fas fa-times text-sm"></i>
            </button>
          </div>
        </div>

        {/* API Key Settings Dropdown Drawer */}
        {showSettings && (
          <div className="bg-slate-950 border-b border-slate-800 p-4 space-y-3 animate-fadeIn shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                <i className="fas fa-shield-halved text-amber-400"></i>
                Konfigurasi Google Gemini API Key
              </span>
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-sky-400 hover:underline flex items-center gap-1"
              >
                Dapatkan API Key Gratis di Google AI Studio <i className="fas fa-arrow-up-right-from-square text-[9px]"></i>
              </a>
            </div>

            <div className="flex gap-2">
              <input
                type="password"
                value={tempApiKey}
                onChange={(e) => setTempApiKey(e.target.value)}
                placeholder="Paste AIzaSy... (tersimpan aman di browser Anda)"
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 font-mono"
              />
              <button
                type="button"
                onClick={handleSaveApiKey}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs transition-colors"
              >
                Simpan
              </button>
            </div>
            <p className="text-[11px] text-slate-500">
              API key hanya disimpan secara lokal di browser Anda (LocalStorage) untuk akun admin ini. Kuota gratis Google Gemini sangat memadai untuk penggunaan portfolio.
            </p>
          </div>
        )}

        {/* Mode Tabs */}
        <div className="flex items-center border-b border-slate-800 bg-slate-950/40 px-6 shrink-0">
          <button
            type="button"
            onClick={() => {
              setMode('polish');
              setOutputResult(null);
            }}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
              mode === 'polish'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <i className="fas fa-magic text-xs"></i>
            Tingkatkan Dampak (Impact Polish)
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('case-study');
              setOutputResult(null);
            }}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
              mode === 'case-study'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <i className="fas fa-diagram-project text-xs"></i>
            Studi Kasus Proyek (Case Study)
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('translate');
              setOutputResult(null);
            }}
            className={`py-3 px-4 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
              mode === 'translate'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <i className="fas fa-language text-xs"></i>
            Terjemahan Teknis (ID / EN)
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1 text-sm">
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-start gap-2.5">
              <i className="fas fa-triangle-exclamation text-rose-400 mt-0.5 shrink-0"></i>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Mode 1: Polish & Enhance */}
          {mode === 'polish' && (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <label className="text-xs text-slate-400 font-medium">Tipe Konten:</label>
                  <select
                    value={targetType}
                    onChange={(e: any) => setTargetType(e.target.value)}
                    className="bg-slate-800 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
                  >
                    <option value="summary">Summary / Bio Narasi</option>
                    <option value="responsibilities">Tanggung Jawab Pekerjaan</option>
                    <option value="achievements">Capaian Kinerja (Formula XYZ)</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-xs text-slate-400 font-medium">Bahasa:</label>
                  <div className="inline-flex rounded-lg border border-slate-700 p-0.5 bg-slate-800 text-xs">
                    <button
                      type="button"
                      onClick={() => setPolishLang('id')}
                      className={`px-2.5 py-0.5 rounded-md font-medium transition-colors ${
                        polishLang === 'id' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Indonesia
                    </button>
                    <button
                      type="button"
                      onClick={() => setPolishLang('en')}
                      className={`px-2.5 py-0.5 rounded-md font-medium transition-colors ${
                        polishLang === 'en' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      English
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Teks Asli (Draft atau Catatan):
                </label>
                <textarea
                  value={polishInput}
                  onChange={(e) => setPolishInput(e.target.value)}
                  rows={4}
                  placeholder="Ketik atau tempel kalimat yang ingin disempurnakan..."
                  className="w-full bg-slate-950/70 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400 font-sans"
                />
              </div>
            </div>
          )}

          {/* Mode 2: Case Study Generator */}
          {mode === 'case-study' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Nama Proyek:
                  </label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="misal: Pemodelan Banjir Citanduy & DTM QGIS"
                    className="w-full bg-slate-950/70 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Software / Tools Utama:
                  </label>
                  <input
                    type="text"
                    value={projectTools}
                    onChange={(e) => setProjectTools(e.target.value)}
                    placeholder="misal: HEC-RAS 2D, QGIS, Epaksi, Python"
                    className="w-full bg-slate-950/70 border border-slate-700 rounded-xl p-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Catatan Lapangan / Konteks Singkat:
                </label>
                <textarea
                  value={projectOverview}
                  onChange={(e) => setProjectOverview(e.target.value)}
                  rows={3}
                  placeholder="misal: Terjadi genangan rutin di musim hujan karena sedimentasi saluran primer. Menggunakan DEM drone dan simulasi debit kala ulang 25 tahun."
                  className="w-full bg-slate-950/70 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          )}

          {/* Mode 3: Translate */}
          {mode === 'translate' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <label className="text-xs text-slate-400 font-medium">Arah Terjemahan:</label>
                <div className="inline-flex rounded-lg border border-slate-700 p-0.5 bg-slate-800 text-xs">
                  <button
                    type="button"
                    onClick={() => setTranslateDirection('id_to_en')}
                    className={`px-3 py-1 rounded-md font-medium transition-colors ${
                      translateDirection === 'id_to_en' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Indonesia → Technical English
                  </button>
                  <button
                    type="button"
                    onClick={() => setTranslateDirection('en_to_id')}
                    className={`px-3 py-1 rounded-md font-medium transition-colors ${
                      translateDirection === 'en_to_id' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    English → Bahasa Indonesia
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Teks yang Ingin Diterjemahkan:
                </label>
                <textarea
                  value={translateInput}
                  onChange={(e) => setTranslateInput(e.target.value)}
                  rows={4}
                  placeholder="Ketik atau tempel teks teknik sipil/keairan yang ingin diterjemahkan..."
                  className="w-full bg-slate-950/70 border border-slate-700 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          )}

          {/* AI Result Section */}
          {outputResult && (
            <div className="p-4 rounded-xl bg-slate-950/80 border border-amber-500/30 space-y-3 animate-fadeIn">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                  <i className="fas fa-sparkles"></i> Hasil Optimasi AI
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                >
                  <i className={`fas ${copied ? 'fa-check text-emerald-400' : 'fa-copy'}`}></i>
                  <span>{copied ? 'Tersalin!' : 'Salin Teks'}</span>
                </button>
              </div>

              {typeof outputResult === 'string' ? (
                <div className="text-xs text-slate-200 whitespace-pre-wrap leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800 font-sans">
                  {outputResult}
                </div>
              ) : (
                /* Structured Case Study Result */
                <div className="space-y-2.5 text-xs">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-sky-400 uppercase tracking-wider block mb-0.5">
                      Short Overview:
                    </span>
                    <p className="text-slate-300 bg-slate-900/60 p-2 rounded border border-slate-800/80">
                      {outputResult.description}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-rose-400 uppercase tracking-wider block mb-0.5">
                      Engineering Challenge:
                    </span>
                    <p className="text-slate-300 bg-slate-900/60 p-2 rounded border border-slate-800/80">
                      {outputResult.challenge}
                    </p>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider block mb-0.5">
                      Technical Solution:
                    </span>
                    <p className="text-slate-300 bg-slate-900/60 p-2 rounded border border-slate-800/80">
                      {outputResult.solution}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-950/90 border-t border-slate-800 px-6 py-4 flex items-center justify-between shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            Tutup
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={isLoading}
              onClick={handleExecute}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-500/20 active:scale-95 transition-all disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Memproses AI...
                </>
              ) : (
                <>
                  <i className="fas fa-wand-magic-sparkles"></i>
                  {outputResult ? 'Coba Lagi (Regenerate)' : 'Proses dengan AI'}
                </>
              )}
            </button>

            {outputResult && (
              <button
                type="button"
                onClick={handleApplyResult}
                className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-600/20 active:scale-95 transition-all"
              >
                <i className="fas fa-check"></i> Terapkan ke Form
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistantModal;
