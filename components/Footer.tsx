import React from 'react';
import DatabaseStatus from './DatabaseStatus';

interface FooterProps {
  name: string;
  onOpenAdmin: () => void;
}

const Footer: React.FC<FooterProps> = ({ name, onOpenAdmin }) => {
  return (
    <footer className="bg-white border-t border-slate-200 py-6 sm:py-8 mt-12">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-slate-800 font-medium text-sm sm:text-base">&copy; {new Date().getFullYear()} {name}</p>
              <p className="text-xs text-slate-500 mt-1">All Rights Reserved.</p>
            </div>
            
            <div className="flex flex-col items-center md:items-end space-y-2">
              <DatabaseStatus />
              <p className="text-xs text-slate-500">Built with React and Tailwind CSS</p>
              <button 
                onClick={onOpenAdmin}
                className="text-xs text-slate-600 hover:text-cyan-600 transition-colors px-2 py-1 rounded hover:bg-slate-50"
                aria-label="Open Admin Panel"
              >
                <i className="fas fa-cog mr-1"></i>
                Admin Panel
              </button>
            </div>
          </div>
          
          <div className="border-t border-slate-200 mt-6 pt-4 text-center">
            <p className="text-xs text-slate-600">
              Junior Expert Irrigation Engineer • Water Resources Specialist • GIS Professional
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
