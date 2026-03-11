import React from 'react';

interface MobileNavProps {
  navLinks: { name: string; href: string }[];
}

const MobileNav: React.FC<MobileNavProps> = ({ navLinks }) => {
  // Select a subset of links for the bottom bar to keep it clean
  const mobileLinks = [
    { name: 'Summary', href: '#summary', icon: 'fa-compass-drafting' },
    { name: 'Portfolio', href: '#projects', icon: 'fa-diagram-project' },
    { name: 'Trajectory', href: '#experience', icon: 'fa-route' },
    { name: 'Contact', href: '#contact', icon: 'fa-envelope-open-text' },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-[100] bg-bg-canvas/80 backdrop-blur-md border-t border-border-subtle/50 px-4 pb-safe pt-2 print:hidden" aria-label="Mobile Bottom Navigation">
      <div className="max-w-md mx-auto flex justify-around items-center">
        {mobileLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            aria-label={`Navigate to ${link.name} section`}
            className="flex flex-col items-center py-2 px-3 text-text-muted hover:text-brand-accent transition-colors"
          >
            <i className={`fas ${link.icon} text-lg mb-1`} aria-hidden="true"></i>
            <span className="text-[10px] font-bold uppercase tracking-widest">{link.name}</span>
          </a>
        ))}
      </div>
    </nav>
  );
};

export default MobileNav;
