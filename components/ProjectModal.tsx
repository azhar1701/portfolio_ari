
import React, { useEffect, useState } from 'react';
import type { Project } from '../types';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, project }) => {
  const [show, setShow] = useState(false);
  const [mainImage, setMainImage] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
      document.body.style.overflow = 'hidden';
      if (project?.images?.[0]) {
        setMainImage(project.images[0]);
      }
    } else {
      setShow(false);
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, project]);

  useEffect(() => {
    if (project?.images?.[0]) {
        setMainImage(project.images[0]);
    }
  }, [project]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  if (!project) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${isOpen && show ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={onClose}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" aria-hidden="true"></div>
      <div
        className={`relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-slate-800 rounded-lg shadow-xl overflow-y-auto transform transition-all duration-300 ${isOpen && show ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 md:p-8">
            <div className="flex justify-between items-start">
                <h2 id="project-modal-title" className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-slate-100">
                    {project.name}
                </h2>
                <button
                    onClick={onClose}
                    className="p-1 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                    aria-label="Close project details"
                >
                    <i className="fas fa-times text-xl"></i>
                </button>
            </div>

            <div className="mt-6">
                {/* Image Gallery */}
                <div className="mb-8">
                    <img src={mainImage} alt={project.name} className="w-full h-auto max-h-80 object-cover rounded-lg shadow-md mb-2" />
                    {project.images.length > 1 && (
                        <div className="flex space-x-2">
                            {project.images.map((img, index) => (
                                <button key={index} onClick={() => setMainImage(img)}>
                                    <img
                                        src={img}
                                        alt={`Thumbnail ${index + 1}`}
                                        className={`w-20 h-14 object-cover rounded-md cursor-pointer border-2 transition ${mainImage === img ? 'border-cyan-500' : 'border-transparent hover:border-slate-300'}`}
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8 text-slate-600 dark:text-slate-300">
                    {/* Main content: Challenge and Solution */}
                    <div className="md:col-span-2 space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-2">The Challenge</h3>
                            <p>{project.challenge}</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-2">The Solution</h3>
                            <p>{project.solution}</p>
                        </div>
                    </div>
                    {/* Sidebar: Technologies */}
                    <div className="md:col-span-1 mt-6 md:mt-0">
                        <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200 mb-2">Technologies Used</h3>
                        <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech, index) => (
                                <span key={index} className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-medium px-3 py-1.5 rounded-full">
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
  );
};

export default ProjectModal;
