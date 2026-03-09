
import React, { useState } from 'react';
import type { Project } from '../types';
import Section from './Section';
import SkeletonLoader from './SkeletonLoader';
import ImageCarousel from './ImageCarousel';

interface ProjectsProps {
    projects: Project[] | null;
}

const ProjectsSkeleton: React.FC = () => (
    <div className="space-y-6">
        {[...Array(2)].map((_, i) => (
            <div key={i} className="bg-slate-50 border border-slate-200 p-6 rounded-lg space-y-3">
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
                            <div key={project.id} className="bg-bg-canvas border border-border-subtle rounded-lg flex flex-col transition-all duration-300 hover:shadow-md hover:border-brand-accent group overflow-hidden">
                                <div
                                    className="p-6 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-inset"
                                    onClick={() => handleToggleDetails(project.id)}
                                    onKeyDown={(e) => e.key === 'Enter' || e.key === ' ' ? handleToggleDetails(project.id) : null}
                                    role="button"
                                    tabIndex={0}
                                    aria-expanded={isExpanded}
                                    aria-controls={`project-details-${project.id}`}
                                >
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-lg font-bold text-text-primary mb-2 pr-4 break-words line-clamp-2" title={project.name}>{project.name}</h3>
                                        <i
                                            className={`fas fa-chevron-down text-text-muted group-hover:text-brand-accent transition-transform duration-300 mt-1 ${isExpanded ? 'rotate-180' : ''}`}
                                            aria-hidden="true"
                                        ></i>
                                    </div>
                                    <p className="text-text-secondary text-sm line-clamp-3 overflow-hidden leading-relaxed">{project.description}</p>
                                </div>

                                <div
                                    id={`project-details-${project.id}`}
                                    className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-[2000px] opacity-100 border-t border-border-subtle' : 'max-h-0 opacity-0'}`}
                                >
                                    <div className="p-6 space-y-6">
                                        {project.images && project.images.length > 0 && (
                                            <ImageCarousel images={project.images} projectName={project.name} />
                                        )}

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <h4 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-2 flex items-center">
                                                    <i className="fas fa-exclamation-triangle mr-2 text-brand-accent text-xs"></i>
                                                    The Challenge
                                                </h4>
                                                <p className="text-sm text-text-secondary leading-relaxed">{project.challenge}</p>
                                            </div>

                                            <div>
                                                <h4 className="text-sm font-bold text-text-primary uppercase tracking-wider mb-2 flex items-center">
                                                    <i className="fas fa-lightbulb mr-2 text-brand-accent text-xs"></i>
                                                    The Solution
                                                </h4>
                                                <p className="text-sm text-text-secondary leading-relaxed">{project.solution}</p>
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-border-subtle/50">
                                            <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Technologies</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {project.technologies.map((tech, idx) => (
                                                    <span key={idx} className="px-2.5 py-1 bg-brand-accent-soft text-brand-accent-text text-xs font-bold rounded-md border border-brand-accent/10">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {project.link && (
                                            <div className="pt-2">
                                                <a
                                                    href={project.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center text-sm font-bold text-brand-accent hover:text-brand-accent-hover transition-colors group/link"
                                                >
                                                    Visit Project Page
                                                    <i className="fas fa-external-link-alt ml-2 text-[10px] transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"></i>
                                                </a>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <ProjectsSkeleton />
            )}
        </Section>
    );
};

export default Projects;
