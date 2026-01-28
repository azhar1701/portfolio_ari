import React from 'react';

interface FooterProps {
  name: string;
  onOpenAdmin: () => void;
}

const Footer: React.FC<FooterProps> = ({ name, onOpenAdmin }) => {
  return (
    <footer className="bg-slate-800 dark:bg-black/50 text-white py-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-slate-300">&copy; {new Date().getFullYear()} {name}. All Rights Reserved.</p>
        <p className="text-xs text-slate-400 mt-2">Built with React and Tailwind CSS.</p>
        <div className="mt-4">
          <button 
            onClick={onOpenAdmin}
            className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
            aria-label="Open Admin Panel"
          >
            Admin Panel
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
