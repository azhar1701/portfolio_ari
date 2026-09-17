import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Profile } from '../types';
import SearchBar from './SearchBar';
import type { PortfolioData } from '../types';
import { useToast } from '../contexts/ToastContext';

interface HeaderProps {
  profile: Profile;
  navLinks: { name: string; href: string; icon?: string }[];
  data: PortfolioData | null;
}

const Header: React.FC<HeaderProps> = ({ profile, navLinks, data }) => {
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const { toast } = useToast();

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

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!profile.email) return;
    navigator.clipboard.writeText(profile.email);
    toast.success(`Copied email to clipboard: ${profile.email}`);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 print:hidden ${
        isScrolled ? 'bg-bg-app border-b border-border-subtle shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo & Recruiter Availability Badge */}
        <div className="flex items-center gap-4">
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

          {/* Availability Status Badge for Recruiters */}
          <div className="hidden 2xl:flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/25 rounded-full text-[11px] font-semibold text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Open for Consulting & Roles</span>
          </div>
        </div>

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
                className={`relative w-10 h-10 rounded-full transition-colors duration-300 flex items-center justify-center group/nav z-10 ${
                  isActive ? 'text-brand-accent' : 'text-text-secondary hover:text-text-primary'
                }`}
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
            );
          })}
        </nav>

        {/* Utility Actions for Recruiters */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="hidden xl:block opacity-60 hover:opacity-100 transition-opacity">
            <SearchBar data={data} onResults={() => { }} />
          </div>

          {/* Quick Resume CTA */}
          <a
            href="#resume"
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-full border border-border-subtle bg-bg-canvas hover:bg-bg-app text-text-primary transition-all shadow-sm hover:shadow hover:border-brand-accent/40 active:scale-95"
            title="Jump to ATS Resume"
          >
            <i className="fas fa-file-pdf text-rose-400 text-xs"></i>
            <span>Resume</span>
          </a>

          {/* 1-Click Copy Email */}
          <button
            type="button"
            onClick={handleCopyEmail}
            className="hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-full border border-border-subtle bg-bg-canvas hover:bg-bg-app text-text-secondary hover:text-brand-accent transition-all shadow-sm active:scale-95"
            title="Copy email to clipboard"
            aria-label="Copy email address"
          >
            <i className="fas fa-copy text-xs"></i>
          </button>

          {/* Direct Connect */}
          <a
            href={`mailto:${profile.email}`}
            className="bg-brand-accent hover:bg-brand-accent-hover text-white px-4 sm:px-5 py-2 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:scale-95 duration-300 flex items-center justify-center space-x-2"
          >
            <i className="fas fa-paper-plane text-[11px]"></i>
            <span>Connect</span>
          </a>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
