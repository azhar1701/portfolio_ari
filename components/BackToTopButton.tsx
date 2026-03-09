
import React, { useState, useEffect } from 'react';

const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <button
        type="button"
        onClick={scrollToTop}
        className={`bg-brand-accent hover:bg-brand-accent-hover text-white rounded-full w-12 h-12 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
          }`}
        aria-label="Go to top"
      >
        <i className="fas fa-arrow-up"></i>
      </button>
    </div>
  );
};

export default BackToTopButton;
