
import React from 'react';

interface ErrorProps {
  message: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-red-50 text-red-700 p-4">
      <i className="fas fa-exclamation-triangle text-4xl mb-4"></i>
      <h2 className="text-2xl font-bold mb-2">An Error Occurred</h2>
      <p className="text-center">{message}</p>
      <button onClick={() => window.location.reload()} className="mt-6 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
        Try Again
      </button>
    </div>
  );
};

export default Error;
