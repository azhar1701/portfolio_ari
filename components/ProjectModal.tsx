
import React, { useEffect, useState, useRef } from 'react';
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
      // Set focus to close button when opened
      setTimeout(() => closeButtonRef.current?.focus(), 100);
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

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen && show ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" onClick={onClose}></div>
      <div
        ref={modalRef}
        className={`relative w-full max-w-4xl max-h-[90vh] bg-bg-canvas rounded-2xl shadow-2xl overflow-y-auto transform transition-all duration-300 border border-border-subtle ${isOpen && show ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        <div className="p-6 md:p-10">
          <div className="flex justify-between items-start mb-8">
            <h2 id="project-modal-title" className="text-2xl md:text-4xl font-bold text-text-primary tracking-tight pr-8">
              {project.name}
            </h2>
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className="p-2 rounded-full text-text-muted hover:bg-bg-app transition-colors focus:outline-none focus:ring-2 focus:ring-brand-accent"
              aria-label="Close project details"
            >
              <i className="fas fa-times text-2xl"></i>
            </button>
          </div>

          <div className="space-y-10">
            {/* Image Gallery */}
            <div>
              <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-md border border-border-subtle mb-4 bg-slate-100 flex items-center justify-center">
                <img 
                  src={mainImage} 
                  alt={project.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                  key={mainImage}
                />
              </div>
              {project.images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide" aria-label="Project images">
                  {project.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setMainImage(img)}
                      className="flex-shrink-0"
                      aria-label={`View image ${index + 1}`}
                    >
                      <div className={`w-24 h-16 rounded-lg overflow-hidden border-2 transition-all bg-slate-100 ${mainImage === img ? 'border-brand-accent shadow-md scale-95' : 'border-transparent hover:border-border-subtle hover:scale-105'}`}>
                        <img
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* Main content: Challenge and Solution */}
              <div className="md:col-span-2 space-y-8">
                <div>
                  <h3 className="text-sm font-bold text-brand-accent uppercase tracking-widest mb-4 flex items-center">
                    <i className="fas fa-exclamation-triangle mr-2 text-xs"></i>
                    The Challenge
                  </h3>
                  <p className="text-text-secondary leading-relaxed font-medium">{project.challenge}</p>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-brand-accent uppercase tracking-widest mb-4 flex items-center">
                    <i className="fas fa-lightbulb mr-2 text-xs"></i>
                    The Solution
                  </h3>
                  <p className="text-text-secondary leading-relaxed font-medium">{project.solution}</p>
                </div>
              </div>
              {/* Sidebar: Technologies */}
              <div className="md:col-span-1">
                <div className="bg-bg-app p-6 rounded-2xl border border-border-subtle h-fit">
                  <h3 className="text-sm font-bold text-text-primary uppercase tracking-widest mb-6 border-b border-border-subtle pb-3">
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="bg-bg-canvas text-text-primary text-[11px] font-bold px-3 py-1.5 rounded-lg border border-border-subtle shadow-sm uppercase tracking-wider">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
