import React from 'react';
import DatabaseStatus from './DatabaseStatus';

interface FooterProps {
  name: string;
  onOpenAdmin: () => void;
}

const Footer: React.FC<FooterProps> = ({ name, onOpenAdmin }) => {
  return (
    <footer className="bg-bg-canvas border-t border-border-subtle py-6 sm:py-8 mt-12 transition-colors duration-300">
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-text-primary font-bold text-sm sm:text-base tracking-tight">&copy; {new Date().getFullYear()} {name}</p>
              <p className="text-xs text-text-muted mt-1">All Rights Reserved.</p>
            </div>

            <div className="flex flex-col items-center md:items-end space-y-2">
              <DatabaseStatus />
              <p className="text-xs text-text-muted">Built with Precision & Pride</p>
              <button
                onClick={onOpenAdmin}
                className="text-xs text-text-secondary hover:text-brand-accent hover:bg-bg-app transition-all px-3 py-1.5 rounded-md font-medium border border-transparent hover:border-border-subtle shadow-sm"
                aria-label="Open Admin Panel"
              >
                <i className="fas fa-cog mr-1.5 text-text-muted"></i>
                Admin Access
              </button>
            </div>
          </div>

          <div className="border-t border-border-subtle mt-6 pt-4 text-center">
            <p className="text-[10px] sm:text-xs text-text-muted uppercase tracking-[0.2em] font-medium">
              Irrigation Engineering • Water Resources • GIS Analytics
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
