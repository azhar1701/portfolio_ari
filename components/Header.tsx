
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Profile } from '../types';
import SearchBar from './SearchBar';
import type { PortfolioData } from '../types';

interface HeaderProps {
  profile: Profile;
  navLinks: { name: string; href: string; icon?: string }[];
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
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 print:hidden ${isScrolled ? 'bg-bg-app border-b border-border-subtle shadow-md py-3' : 'bg-transparent py-6'}`}
    >
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <button
          className="flex items-center space-x-3 group relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-xl p-1 -m-1"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
        >
          <div className="overflow-hidden w-9 h-9 bg-brand-accent rounded-xl flex items-center justify-center text-white shadow-md group-hover:shadow-lg transition-all duration-500 relative">
            <span className="font-bold text-lg relative z-10">{profile.name.charAt(0)}</span>
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </div>
          <div className="hidden sm:block text-left">
            <h1 className="text-sm sm:text-base font-bold text-text-primary leading-none tracking-tight">{profile.name}</h1>
            <p className="text-[9px] sm:text-[10px] text-brand-accent font-bold uppercase tracking-[0.2em] mt-1 opacity-80 lg:block hidden">{profile.title}</p>
          </div>
        </button>

        {/* Main Navigation - Icon-only for desktop */}
        <nav className="hidden lg:flex items-center space-x-1 bg-bg-canvas px-2 py-1 rounded-full border border-border-subtle shadow-sm" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href;
            return (
              <a
                key={link.href}
                href={link.href}
                title={link.name}
                aria-label={link.name}
                className={`relative w-10 h-10 rounded-full transition-colors duration-300 flex items-center justify-center group/nav z-10 ${isActive ? 'text-brand-accent' : 'text-text-secondary hover:text-text-primary'}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeHeaderNav"
                    className="absolute inset-0 bg-brand-accent/15 rounded-full z-[-1]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                {link.icon && <i className={`${link.icon} text-sm relative z-10 transition-transform duration-300 group-hover/nav:scale-110`}></i>}
                <span className="absolute top-12 px-2.5 py-1 bg-text-primary text-bg-canvas text-[10px] font-bold uppercase tracking-widest rounded opacity-0 group-hover/nav:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-md">
                  {link.name}
                </span>
              </a>
            )
          })}
        </nav>

        {/* Utility Actions */}
        <div className="flex items-center space-x-4">
          <div className="hidden xl:block opacity-60 hover:opacity-100 transition-opacity">
            <SearchBar data={data} onResults={() => { }} />
          </div>

          <a
            href={`mailto:${profile.email}`}
            className="bg-brand-accent hover:bg-brand-accent-hover text-white px-4 sm:px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] rounded-full shadow-sm hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:scale-95 duration-300 flex items-center justify-center space-x-2"
          >
            <i className="fas fa-paper-plane text-[10px]"></i>
            <span className="hidden sm:inline">Connect</span>
          </a>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden w-10 h-10 rounded-xl text-text-secondary hover:text-brand-accent hover:bg-bg-app transition-colors border border-border-subtle/30 flex items-center justify-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'} text-lg`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Navigation List */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out bg-bg-canvas ${isMenuOpen ? 'max-h-screen border-t border-border-subtle shadow-2xl py-6' : 'max-h-0'
          }`}
      >
        <div className="px-6 space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`flex items-center space-x-4 px-6 py-4 rounded-2xl text-sm font-bold uppercase tracking-widest transition-all ${activeSection === link.href
                ? 'text-brand-accent bg-brand-accent-soft/20'
                : 'text-text-secondary hover:bg-bg-app'
                }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.icon && <i className={`${link.icon} text-base opacity-70`}></i>}
              <span>{link.name}</span>
            </a>
          ))}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
