
import React from 'react';

const Loader: React.FC = () => {
  const messages = [
    "Calibrating GIS layers...",
    "Calculating watershed runoff...",
    "Synthesizing irrigation data...",
    "optimizing hydraulic models...",
    "Rendering project locations...",
    "Checking water pressure..."
  ];

  const [messageIndex, setMessageIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-bg-app text-center px-4 overflow-hidden relative">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(var(--color-brand-accent) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

      <div className="relative">
        {/* Pulse effect */}
        <div className="absolute inset-0 bg-brand-accent/20 rounded-full animate-ping scale-150 opacity-20"></div>
        <div className="relative bg-bg-canvas p-6 rounded-2xl shadow-subtle border border-border-subtle flex items-center justify-center">
          <div className="flex space-x-1.5 items-end">
            <div className="w-1.5 h-8 bg-brand-accent rounded-full animate-[bounce_1s_infinite_0ms]"></div>
            <div className="w-1.5 h-12 bg-brand-accent/60 rounded-full animate-[bounce_1s_infinite_200ms]"></div>
            <div className="w-1.5 h-16 bg-brand-accent rounded-full animate-[bounce_1s_infinite_400ms]"></div>
            <div className="w-1.5 h-10 bg-brand-accent/40 rounded-full animate-[bounce_1s_infinite_600ms]"></div>
          </div>
        </div>
      </div>

      <div className="mt-12 space-y-2">
        <h1 className="text-xl font-bold text-text-primary tracking-tighter uppercase mb-4">Initializing Portal</h1>
        <div className="h-6 overflow-hidden">
          <p className="text-xs text-brand-accent font-bold uppercase tracking-[0.3em] transition-all duration-500 transform animate-pulse">
            {messages[messageIndex]}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loader;
