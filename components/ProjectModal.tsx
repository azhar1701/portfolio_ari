import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import type { Project } from '../types';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, project }) => {
  const [show, setShow] = useState(false);
  const [mainImage, setMainImage] = useState<string | undefined>(undefined);
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }

      if (event.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            event.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            event.preventDefault();
          }
        }
      }
    };

    if (isOpen) {
      setShow(true);
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);
      if (project?.images?.[0]) {
        setMainImage(project.images[0]);
      }
      setTimeout(() => closeButtonRef.current?.focus(), 50);
    } else {
      setShow(false);
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, project, onClose]);

  useEffect(() => {
    if (project?.images?.[0]) {
      setMainImage(project.images[0]);
    }
  }, [project]);

  if (!project) return null;

  return ReactDOM.createPortal(
    (
    <div
      className={`fixed inset-0 z-[9990] flex items-center justify-center p-3 sm:p-6 transition-opacity duration-300 ${
        isOpen && show ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-md transition-opacity"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Modal Dialog Container */}
      <div
        ref={modalRef}
        className={`relative w-full max-w-5xl max-h-[92vh] bg-bg-canvas border border-border-subtle rounded-2xl shadow-xl flex flex-col overflow-hidden transform transition-all duration-300 ${
          isOpen && show ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
        }`}
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        {/* Sticky Header Bar */}
        <div className="bg-bg-canvas border-b border-border-subtle px-6 py-4 flex items-center justify-between shrink-0 z-30">
          <div className="flex items-center gap-3 min-w-0 pr-4">
            <div className="w-8 h-8 rounded-xl bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent shrink-0">
              <i className="fas fa-diagram-project text-xs"></i>
            </div>
            <div className="min-w-0">
              <span className="text-[10px] font-mono font-bold text-brand-accent uppercase tracking-widest block truncate">
                Engineering Case Study
              </span>
              <h2 id="project-modal-title" className="text-base sm:text-lg font-bold text-text-primary tracking-tight truncate">
                {project.name}
              </h2>
            </div>
          </div>

          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-bg-app hover:bg-red-50 text-text-muted hover:text-red-500 border border-border-subtle transition-all flex items-center justify-center shrink-0 focus:outline-none focus:ring-2 focus:ring-brand-accent/30 cursor-pointer active:scale-95"
            aria-label="Close project modal"
          >
            <i className="fas fa-xmark text-base"></i>
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Main Visual Showcase Container */}
          <div className="space-y-3">
            <div className="w-full h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden border border-border-subtle">
              <img
                src={mainImage || '/images/summary_hero.png'}
                alt={project.name}
                className="w-full h-full object-cover transition-all duration-300"
                key={mainImage}
              />
            </div>

            {/* Thumbnail Navigation Bar */}
            {project.images && project.images.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto pb-1.5 scrollbar-thin" aria-label="Project gallery thumbnails">
                {project.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setMainImage(img)}
                    className="flex-shrink-0 cursor-pointer focus:outline-none"
                    aria-label={`View image thumbnail ${index + 1}`}
                  >
                    <div
                      className={`w-20 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                        mainImage === img
                          ? 'border-brand-accent shadow-md scale-95'
                          : 'border-border-subtle hover:border-brand-accent/40 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Project Overview Statement */}
          <div className="p-5 bg-bg-app border border-border-subtle rounded-2xl">
            <h3 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-2 flex items-center gap-2">
              <i className="fas fa-circle-info text-brand-accent"></i>
              Executive Overview
            </h3>
            <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* STAR Methodology Grid: The Challenge & The Solution */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Col: STAR Challenge & Technical Solution */}
            <div className="lg:col-span-8 space-y-6">
              {project.challenge && (
                <div className="p-6 bg-bg-app border border-amber-500/30 rounded-2xl">
                  <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold text-xs uppercase tracking-wider mb-3">
                    <i className="fas fa-triangle-exclamation"></i>
                    <span>The Engineering Challenge</span>
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed whitespace-pre-line">
                    {project.challenge}
                  </p>
                </div>
              )}

              {project.solution && (
                <div className="p-6 bg-bg-app border border-brand-accent/25 rounded-2xl">
                  <div className="flex items-center gap-2 text-brand-accent font-bold text-xs uppercase tracking-wider mb-3">
                    <i className="fas fa-lightbulb"></i>
                    <span>Methodology & Technical Solution</span>
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed whitespace-pre-line">
                    {project.solution}
                  </p>
                </div>
              )}
            </div>

            {/* Right Col: Technology Stack & Documentation Link */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-bg-app p-6 rounded-2xl border border-border-subtle space-y-4">
                <h4 className="text-xs font-bold text-text-muted uppercase tracking-widest border-b border-border-subtle pb-3 flex items-center gap-2">
                  <i className="fas fa-screwdriver-wrench text-brand-accent"></i>
                  Technologies & Tools
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-bg-canvas text-text-secondary text-xs font-semibold px-3 py-1.5 rounded-lg border border-border-subtle"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {project.link && (
                  <div className="pt-4 border-t border-border-subtle">
                    <a
                      href={project.link}
                      target={project.link.startsWith('http') ? '_blank' : '_self'}
                      rel="noopener noreferrer"
                      className="w-full py-2.5 px-4 bg-brand-accent/10 hover:bg-brand-accent/20 border border-brand-accent/30 text-brand-accent rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                    >
                      <span>External Documentation</span>
                      <i className="fas fa-arrow-up-right-from-square text-[10px]"></i>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ), document.body);
};

export default ProjectModal;
