
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-slate-50 dark:bg-slate-900 text-center px-4">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cyan-500"></div>
      <h1 className="mt-6 text-2xl text-slate-700 dark:text-slate-200 font-bold">Crafting Your Portfolio with AI</h1>
      <p className="mt-2 text-md text-slate-500 dark:text-slate-400">Our digital artisan is analyzing the CV to build your page.</p>
      <p className="text-sm text-slate-400 dark:text-slate-500">This may take a few moments. Thank you for your patience.</p>
    </div>
  );
};

export default Loader;
