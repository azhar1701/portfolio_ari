
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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-bg-canvas/90 backdrop-blur-md shadow-subtle py-2 sm:py-3' : 'bg-transparent py-4 sm:py-5'}`}>
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 h-full flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center space-x-2 sm:space-x-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-brand-accent rounded-lg flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300">
            <span className="font-bold text-lg sm:text-xl">{profile.name.charAt(0)}</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-base sm:text-lg font-extrabold text-text-primary leading-tight tracking-tight">{profile.name}</h1>
            <p className="text-[10px] sm:text-xs text-brand-accent font-bold uppercase tracking-widest">{profile.title}</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`px-3 py-2 rounded-md text-xs xl:text-sm font-bold uppercase tracking-wider transition-all duration-200 ${activeSection === link.href
                ? 'text-brand-accent bg-brand-accent-soft'
                : 'text-text-secondary hover:text-brand-accent hover:bg-bg-app'
                }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right side Utility Area */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Search bar */}
          <div className="relative hidden md:block">
            <SearchBar data={data} onResults={() => { }} />
          </div>

          <a
            href={`mailto:${profile.email}`}
            className="bg-brand-accent hover:bg-brand-accent-hover text-white px-3 py-1.5 sm:px-5 sm:py-2 text-xs sm:text-sm font-bold rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 active:scale-95 duration-200"
          >
            Contact Me
          </a>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-1.5 sm:p-2 rounded-md text-text-secondary hover:text-brand-accent hover:bg-bg-app focus:outline-none transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-bg-canvas border-t border-border-subtle ${isMenuOpen ? 'max-h-screen opacity-100 py-4 sm:py-6 shadow-xl' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="px-4 space-y-1 sm:space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`block px-3 py-2.5 rounded-md text-base font-bold transition-all ${activeSection === link.href
                ? 'text-brand-accent bg-brand-accent-soft'
                : 'text-text-secondary hover:text-brand-accent hover:bg-bg-app'
                }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
