import React, { useState, useEffect } from 'react';

interface MobileNavProps {
  navLinks?: { name: string; href: string }[];
}

const MobileNav: React.FC<MobileNavProps> = () => {
  const [activeSection, setActiveSection] = useState('#summary');

  const mobileLinks = [
    { name: 'Summary', href: '#summary', icon: 'fa-compass-drafting' },
    { name: 'Projects', href: '#projects', icon: 'fa-diagram-project' },
    { name: 'GIS Hub', href: '#locations', icon: 'fa-map-location-dot' },
    { name: 'Resume', href: '#resume', icon: 'fa-file-lines' },
    { name: 'Kontak', href: '#contact', icon: 'fa-paper-plane' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sections = mobileLinks.map(l => l.href.substring(1));
      const current = sections.find(id => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 180 && rect.bottom >= 180;
        }
        return false;
      });
      if (current) {
        setActiveSection(`#${current}`);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] bg-bg-canvas/95 backdrop-blur-md border-t border-border-subtle px-2 pb-safe pt-1.5 shadow-lg print:hidden"
      aria-label="Mobile Bottom Navigation"
    >
      <div className="max-w-md mx-auto flex justify-around items-center">
        {mobileLinks.map((link) => {
          const isActive = activeSection === link.href;
          return (
            <a
              key={link.href}
              href={link.href}
              aria-label={`Navigasi ke bagian ${link.name}`}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center py-1.5 px-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-brand-accent font-bold scale-105'
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              <i className={`fas ${link.icon} text-base mb-1 ${isActive ? 'text-brand-accent' : 'opacity-70'}`} aria-hidden="true"></i>
              <span className="text-[9px] font-bold uppercase tracking-wider">{link.name}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
};

export default MobileNav;
