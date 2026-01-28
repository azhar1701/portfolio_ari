
import React, { useState } from 'react';
import type { Project } from '../types';
import Section from './Section';
import SkeletonLoader from './SkeletonLoader';
import ImageCarousel from './ImageCarousel';

interface ProjectsProps {
  projects: Project[] | null;
}

const ProjectsSkeleton: React.FC = () => (
    <div className="grid md:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm space-y-3">
                <SkeletonLoader className="h-6 w-3/4 rounded" />
                <SkeletonLoader className="h-4 w-full rounded" />
                <SkeletonLoader className="h-4 w-5/6 rounded" />
                <SkeletonLoader className="h-4 w-1/4 rounded mt-2" />
            </div>
        ))}
    </div>
);


const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);

  const handleToggleDetails = (projectId: string) => {
    setExpandedProjectId(prevId => (prevId === projectId ? null : projectId));
  };

  if (projects && projects.length === 0) {
    return null; // Don't render the section if no projects were found
  }
    
  return (
    <Section id="projects" title="Key Projects" iconClass="fas fa-project-diagram">
      {projects ? (
        <div className="space-y-6">
          {projects.map((project) => {
             const isExpanded = expandedProjectId === project.id;
             return (
                <div key={project.id} className="bg-white dark:bg-slate-800 rounded-lg shadow-sm flex flex-col transition-all duration-300 hover:shadow-lg dark:hover:shadow-cyan-500/10">
                    <div
                        className="p-6 cursor-pointer"
                        onClick={() => handleToggleDetails(project.id)}
                        role="button"
                        aria-expanded={isExpanded}
                        aria-controls={`project-details-${project.id}`}
                    >
                        <div className="flex justify-between items-start">
                            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2 pr-4">{project.name}</h3>
                            <i className={`fas fa-chevron-down text-slate-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}></i>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 text-sm">{project.description}</p>
                    </div>

                    <div
                        id={`project-details-${project.id}`}
                        className={`transition-all duration-500 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[1000px]' : 'max-h-0'}`}
                    >
                        <div className="px-6 pb-6 pt-0">
                            {isExpanded && project.images && project.images.length > 0 && (
                                <ImageCarousel images={project.images} projectName={project.name} />
                            )}
                            <div className="border-t border-slate-200 dark:border-slate-700 pt-4 text-slate-600 dark:text-slate-300">
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="text-md font-semibold text-slate-700 dark:text-slate-200 mb-2">The Challenge</h4>
                                        <p className="text-sm">{project.challenge}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-md font-semibold text-slate-700 dark:text-slate-200 mb-2">The Solution</h4>
                                        <p className="text-sm">{project.solution}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-md font-semibold text-slate-700 dark:text-slate-200 mb-2">Technologies Used</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {project.technologies.map((tech, index) => (
                                                <span key={index} className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-medium px-2.5 py-1 rounded-full">
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
             )
          })}
        </div>
      ) : (
        <ProjectsSkeleton />
      )}
    </Section>
  );
};

export default Projects;
