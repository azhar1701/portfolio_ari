import React, { useEffect, useState } from 'react';

interface TelemetryStep {
  code: string;
  step: string;
  label: string;
}

const TELEMETRY_STEPS: TelemetryStep[] = [
  { code: 'GIS_DATUM_INIT', step: '01/04', label: 'Calibrating Spatial Datum & CRS EPSG:32748' },
  { code: 'HYDRO_PARAM_SOLVE', step: '02/04', label: 'Initializing Hydrodynamic Flow Parameters' },
  { code: 'WATERSHED_MODEL_SYNC', step: '03/04', label: 'Synthesizing Basin Runoff & Bathymetry' },
  { code: 'PORTAL_CACHE_INDEX', step: '04/04', label: 'Rendering Geospatial Engineering Portfolio' }
];

const Loader: React.FC = () => {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % TELEMETRY_STEPS.length);
    }, 1900);
    return () => clearInterval(interval);
  }, []);

  const currentStep = TELEMETRY_STEPS[stepIndex];

  return (
    <aside
      role="status"
      aria-label="Loading engineering portfolio"
      aria-live="polite"
      className="fixed inset-0 z-50 flex flex-col justify-between items-center bg-bg-app text-text-primary px-6 py-8 sm:py-12 select-none overflow-hidden transition-colors duration-300"
    >
      {/* Background Engineering Micro-Grid */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(var(--color-text-primary) 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      {/* Top Precision Header Bar */}
      <header className="relative z-10 w-full max-w-xl flex justify-between items-center text-[10px] sm:text-[11px] font-mono tracking-widest text-text-muted uppercase border-b border-border-subtle/80 pb-3">
        <span className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
          </span>
          <span className="font-semibold text-text-primary">ARI AZHAR M.</span>
          <span className="hidden sm:inline text-text-muted">| WR-GIS SPECIALIST</span>
        </span>
        <span className="text-text-secondary font-medium tracking-wider">
          CRS: EPSG:32748
        </span>
      </header>

      {/* Center: Topographic & Hydrographic Minimalist Crosshair */}
      <main className="relative z-10 flex flex-col items-center justify-center my-auto w-full max-w-md">
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
          {/* Subtle Outer Ping Wave */}
          <div className="absolute inset-0 rounded-full border border-brand-accent/25 animate-ping [animation-duration:3.2s] pointer-events-none" />

          {/* Concentric Topo Contour Rings */}
          <div className="absolute inset-1 rounded-full border border-dashed border-border-subtle" />
          <div className="absolute inset-5 rounded-full border border-brand-accent/20" />
          <div className="absolute inset-9 rounded-full border border-border-subtle/80" />

          {/* Rotating Radar / Hydrodynamic Beam */}
          <div className="absolute inset-0 rounded-full border-t-2 border-brand-accent animate-spin [animation-duration:2.8s] [animation-timing-function:linear]" />

          {/* Precision Survey Crosshair */}
          <div className="relative flex items-center justify-center text-brand-accent">
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 opacity-90 stroke-current"
              viewBox="0 0 32 32"
              fill="none"
              strokeWidth="1.25"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Center axes with subtle gap */}
              <line x1="16" y1="4" x2="16" y2="12" />
              <line x1="16" y1="20" x2="16" y2="28" />
              <line x1="4" y1="16" x2="12" y2="16" />
              <line x1="20" y1="16" x2="28" y2="16" />

              {/* Center datum core */}
              <circle cx="16" cy="16" r="3.5" className="fill-brand-accent/15 stroke-brand-accent" strokeWidth="1" />
              <circle cx="16" cy="16" r="1" className="fill-brand-accent" />
            </svg>
          </div>
        </div>

        {/* Dynamic Telemetry Status */}
        <div className="mt-8 text-center space-y-2.5 w-full">
          {/* Code pill badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent-soft text-brand-accent-text text-[11px] font-mono font-medium tracking-wider shadow-subtle border border-brand-accent/20">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-accent animate-pulse" />
            <span>[{currentStep.step}]</span>
            <span className="font-semibold">{currentStep.code}</span>
          </div>

          {/* Natural language status */}
          <div className="h-6 flex items-center justify-center">
            <p
              key={currentStep.code}
              className="text-xs sm:text-sm text-text-secondary font-medium tracking-tight animate-fade-in transition-opacity duration-300 px-4"
            >
              {currentStep.label}
            </p>
          </div>
        </div>

        {/* Minimalist 2px Precision Progress Line */}
        <div className="w-48 sm:w-56 h-[2px] bg-border-subtle rounded-full overflow-hidden mt-6 relative">
          <div className="absolute top-0 bottom-0 bg-brand-accent rounded-full w-24 animate-progress-slide" />
        </div>
      </main>

      {/* Bottom Geodetic Telemetry Footer */}
      <footer className="relative z-10 w-full max-w-xl text-[10px] sm:text-[11px] font-mono text-text-muted tracking-wider text-center border-t border-border-subtle/80 pt-3 flex flex-wrap justify-center items-center gap-x-3 gap-y-1">
        <span>LAT: -6°53'33&quot; S</span>
        <span className="opacity-30">•</span>
        <span>LON: 107°36'38&quot; E</span>
        <span className="opacity-30">•</span>
        <span>ELEV: +768.40 m MSL</span>
        <span className="opacity-30 hidden sm:inline">•</span>
        <span className="hidden sm:inline">DATUM: EGM96</span>
      </footer>

      {/* Scoped CSS for Keyframe Animations */}
      <style>{`
        @keyframes progress-slide {
          0% {
            left: -35%;
            width: 30%;
          }
          50% {
            width: 50%;
          }
          100% {
            left: 105%;
            width: 30%;
          }
        }
        .animate-progress-slide {
          animation: progress-slide 1.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(2px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.35s ease-out forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-progress-slide,
          .animate-spin,
          .animate-ping,
          .animate-fade-in {
            animation: none !important;
          }
        }
      `}</style>
    </aside>
  );
};

export default Loader;
