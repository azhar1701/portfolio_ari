
import React from 'react';

interface ErrorProps {
  message: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-slate-50 text-slate-700 p-4">
      <div className="bg-white rounded-lg shadow-sm p-8 text-center max-w-md">
        <i className="fas fa-exclamation-circle text-3xl text-red-500 mb-4"></i>
        <h2 className="text-xl font-semibold text-slate-800 mb-2">Something went wrong</h2>
        <p className="text-slate-600 mb-6">{message}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 transition-colors"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
};

export default Error;