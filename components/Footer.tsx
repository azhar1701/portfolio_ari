import React from 'react';
import type { PortfolioData } from '../types';

interface FooterProps {
  data: PortfolioData;
  onOpenAdmin: () => void;
}

const Footer: React.FC<FooterProps> = ({ data, onOpenAdmin }) => {
  const { profile } = data;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bg-canvas border-t border-border-subtle pt-16 pb-24 lg:pb-8 mt-20 transition-colors duration-300 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Column 1: Identity */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-brand-accent rounded-xl flex items-center justify-center text-white shadow-md font-bold text-xl">
                  {profile.name.charAt(0)}
                </div>
                <span className="text-lg font-bold text-text-primary tracking-tight">{profile.name}</span>
              </div>
              <p className="text-sm text-text-secondary leading-relaxed max-w-xs">
                Water Resources Engineer specialized in water resources and digital GIS innovation.
              </p>
            </div>
            <div className="flex space-x-4">
              {profile.socials?.linkedin && (
                <a href={profile.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-brand-accent transition-colors" aria-label="LinkedIn">
                  <i className="fab fa-linkedin-in text-lg"></i>
                </a>
              )}
              {profile.socials?.github && (
                <a href={profile.socials.github} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-brand-accent transition-colors" aria-label="GitHub">
                  <i className="fab fa-github text-lg"></i>
                </a>
              )}
              {profile.socials?.instagram && (
                <a href={profile.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-brand-accent transition-colors" aria-label="Instagram">
                  <i className="fab fa-instagram text-lg"></i>
                </a>
              )}
            </div>
          </div>

          {/* Column 2: Strategic */}
          <div>
            <h4 className="text-xs font-bold text-text-primary uppercase tracking-[0.2em] mb-6">Strategic</h4>
            <ul className="space-y-4">
              <li><a href="#summary" className="text-sm text-text-secondary hover:text-brand-accent transition-colors">Summary</a></li>
              <li><a href="#projects" className="text-sm text-text-secondary hover:text-brand-accent transition-colors">Portfolio</a></li>
              <li><a href="#experience" className="text-sm text-text-secondary hover:text-brand-accent transition-colors">Trajectory</a></li>
              <li><a href="#blog" className="text-sm text-text-secondary hover:text-brand-accent transition-colors">Insights</a></li>
            </ul>
          </div>

          {/* Column 3: Technical */}
          <div>
            <h4 className="text-xs font-bold text-text-primary uppercase tracking-[0.2em] mb-6">Technical</h4>
            <ul className="space-y-4">
              <li><a href="#skills" className="text-sm text-text-secondary hover:text-brand-accent transition-colors">Arsenal</a></li>
              <li><a href="#certifications" className="text-sm text-text-secondary hover:text-brand-accent transition-colors">Credentials</a></li>
              <li><a href="#publications" className="text-sm text-text-secondary hover:text-brand-accent transition-colors">Publications</a></li>
              <li><a href="#resume" className="text-sm text-text-secondary hover:text-brand-accent transition-colors">Technical Resume</a></li>
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-bold text-text-primary uppercase tracking-[0.2em] mb-6">Inquiry</h4>
              <a href={`mailto:${profile.email}`} className="group block">
                <span className="text-sm text-text-secondary group-hover:text-brand-accent transition-colors block mb-1">Email Address</span>
                <span className="text-sm font-bold text-text-primary group-hover:text-brand-accent transition-colors break-all">{profile.email}</span>
              </a>
            </div>
            <button
              onClick={onOpenAdmin}
              className="w-full text-[10px] font-bold uppercase tracking-widest py-3 border border-border-subtle rounded-xl text-text-muted hover:text-brand-accent hover:border-brand-accent/30 transition-all shadow-subtle"
            >
              System Access
            </button>
          </div>
        </div>

        {/* Bottom Bar: System Info */}
        <div className="pt-8 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-[10px] font-bold uppercase tracking-widest text-text-muted opacity-60">
          <p>&copy; {currentYear} {profile.name} • All Rights Reserved</p>
          <div className="flex items-center space-x-4">
            <span>Build v4.2.1-stable</span>
            <span>•</span>
            <span>{new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} Update</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
