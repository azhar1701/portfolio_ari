
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-slate-50 text-center px-4">
      <div className="animate-spin rounded-full h-12 w-12 border-t-3 border-cyan-600"></div>
      <h1 className="mt-6 text-xl text-slate-800 font-semibold">Loading Portfolio</h1>
      <p className="mt-2 text-sm text-slate-600">Please wait a moment...</p>
    </div>
  );
};

export default Loader;
