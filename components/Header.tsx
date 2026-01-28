
import React, { useState, useEffect } from 'react';
import type { Profile } from '../types';
import SearchBar from './SearchBar';
import type { PortfolioData } from '../types';

interface HeaderProps {
  profile: Profile;
  navLinks: { name: string; href: string }[];
  data: PortfolioData | null;
}

const Header: React.FC<HeaderProps> = ({ profile, navLinks, data }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      // Update active section based on scroll position
      const sections = navLinks.map(link => link.href.substring(1));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(`#${currentSection}`);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navLinks]);
  
  return (
    <header className={`fixed top-0 left-0 right-0 backdrop-blur-sm z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 shadow-lg' : 'bg-slate-50/90 shadow-md'
    }`}>
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-14 sm:h-16 lg:h-20">
          <div className="flex-shrink-0 cursor-pointer min-w-0" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <h1 className="text-sm sm:text-lg lg:text-xl font-bold text-slate-800 hover:text-cyan-700 transition-colors truncate">{profile.name}</h1>
            <p className="text-xs sm:text-sm text-cyan-600 truncate">{profile.title}</p>
          </div>
          
          <div className="hidden lg:flex items-center space-x-6">
            <nav className="flex items-center space-x-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-3 xl:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeSection === link.href
                      ? 'bg-cyan-100 text-cyan-700 shadow-sm'
                      : 'text-slate-600 hover:bg-cyan-50 hover:text-cyan-700'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </nav>
            
            <div className="w-48 xl:w-64">
              <SearchBar data={data} onResults={() => {}} />
            </div>
            
            <div className="flex items-center space-x-2">
              <a
                href={`mailto:${profile.email}`}
                className="p-2 text-slate-600 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors"
                aria-label="Send email"
              >
                <i className="fas fa-envelope"></i>
              </a>
              <a
                href={`tel:${profile.phone}`}
                className="p-2 text-slate-600 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors"
                aria-label="Call phone"
              >
                <i className="fas fa-phone"></i>
              </a>
            </div>
          </div>
          
          <div className="lg:hidden flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
            <div className="w-32 sm:w-40">
              <SearchBar data={data} onResults={() => {}} />
            </div>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-1.5 sm:p-2 rounded-lg text-slate-600 hover:text-cyan-700 hover:bg-cyan-50 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors flex-shrink-0"
            >
              <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
              <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-sm transition-transform duration-200 ${isMenuOpen ? 'rotate-90' : ''}`}></i>
            </button>
          </div>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-sm border-t border-slate-200 shadow-lg">
          <div className="px-4 sm:px-6 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  activeSection === link.href
                    ? 'bg-cyan-100 text-cyan-700'
                    : 'text-slate-600 hover:bg-cyan-50 hover:text-cyan-700'
                }`}
              >
                {link.name}
              </a>
            ))}
            
            <div className="flex justify-center space-x-4 pt-4 border-t border-slate-200 mt-4">
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center px-4 py-2 text-slate-600 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors"
              >
                <i className="fas fa-envelope mr-2"></i>
                Email
              </a>
              <a
                href={`tel:${profile.phone}`}
                className="flex items-center px-4 py-2 text-slate-600 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors"
              >
                <i className="fas fa-phone mr-2"></i>
                Call
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
