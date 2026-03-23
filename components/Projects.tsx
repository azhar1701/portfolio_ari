import React, { useState } from 'react';
import type { Project } from '../types';
import Section from './Section';
import SkeletonLoader from './SkeletonLoader';
import ImageCarousel from './ImageCarousel';
import Card from './ui/Card';
import Badge from './ui/Badge';
import Button from './ui/Button';
import { SubHeading } from './ui/Typography';

interface ProjectsProps {
    projects: Project[] | null;
}



const Projects: React.FC<ProjectsProps> = ({ projects }) => {
    const [expandedProjectId, setExpandedProjectId] = useState<string | null>(null);

    const handleToggleDetails = (projectId: string) => {
        setExpandedProjectId(prevId => (prevId === projectId ? null : projectId));
    };

    if (projects && projects.length === 0) {
        return null;
    }

    return (
        <Section id="projects" title="Projects" iconClass="fas fa-diagram-project" noContainer>
            <div className="max-w-6xl mx-auto">
                {projects ? (
                    <div className="space-y-12">
                        {projects.map((project, index) => {
                            const isExpanded = expandedProjectId === project.id;
                            const isFeatured = index === 0;
                            
                            return (
                                <div 
                                    key={project.id}
                                    className={`group relative ${isFeatured ? 'lg:grid lg:grid-cols-12 lg:gap-12 items-start' : ''}`}
                                >
                                    {/* Background Decorative element for Featured */}
                                    {isFeatured && (
                                        <div className="hidden lg:block absolute -left-12 top-0 bottom-0 w-1 bg-brand-accent/10 rounded-full"></div>
                                    )}

                                    <Card
                                        variant="interactive"
                                        padding="none"
                                        onClick={() => handleToggleDetails(project.id)}
                                        aria-expanded={isExpanded}
                                        aria-controls={`project-details-${project.id}`}
                                        className={`relative overflow-hidden border-border-subtle/50 transition-all duration-500 will-change-transform ${isFeatured ? 'lg:col-span-12 shadow-md hover:shadow-xl' : 'shadow-subtle'}`}
                                    >
                                        <div className={`flex flex-col ${isFeatured && !isExpanded ? 'lg:flex-row' : ''}`}>
                                            {/* Project Preview Image for Featured (Visible when collapsed) */}
                                            {isFeatured && !isExpanded && project.images && project.images.length > 0 && (
                                                <div className="lg:basis-2/5 aspect-video overflow-hidden border-b lg:border-b-0 lg:border-r border-border-subtle/30 bg-bg-app">
                                                    <img 
                                                        src={project.images[0]} 
                                                        alt={project.name} 
                                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                    />
                                                </div>
                                            )}

                                            <div className={`p-8 ${isFeatured && !isExpanded ? 'lg:basis-3/5 lg:flex lg:flex-col lg:justify-center' : 'w-full'}`}>
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        {isFeatured && <span className="text-[10px] font-bold text-brand-accent uppercase tracking-[0.2em] mb-2 block">Featured Case Study</span>}
                                                        <h3 className={`font-bold text-text-primary group-hover:text-brand-accent transition-colors break-words ${isFeatured ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
                                                            {project.name}
                                                        </h3>
                                                    </div>
                                                    <i
                                                        className={`fas fa-chevron-down text-text-muted transition-transform duration-500 mt-2 ${isExpanded ? 'rotate-180 text-brand-accent' : ''}`}
                                                        aria-hidden="true"
                                                    ></i>
                                                </div>
                                                <p className={`text-text-secondary leading-relaxed font-medium ${isExpanded ? 'mb-0' : 'line-clamp-2 text-base'}`}>
                                                    {project.description}
                                                </p>
                                            </div>
                                        </div>

                                        <div
                                            id={`project-details-${project.id}`}
                                            className={`grid transition-all duration-700 ease-in-out ${isExpanded ? 'grid-rows-[1fr] opacity-100 border-t border-border-subtle/30 bg-bg-app/30' : 'grid-rows-[0fr] opacity-0 overflow-hidden'}`}
                                        >
                                            <div className="overflow-hidden">
                                                <div className="p-8 space-y-10">
                                                    {project.images && project.images.length > 0 && (
                                                        <div className="rounded-2xl overflow-hidden shadow-lg border border-border-subtle/50 bg-bg-canvas">
                                                            <ImageCarousel images={project.images} projectName={project.name} />
                                                        </div>
                                                    )}

                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                                        <div className="space-y-4">
                                                            <SubHeading color="accent" icon={<i className="fas fa-exclamation-circle text-[10px]"></i>}>Problem</SubHeading>
                                                            <p className="text-base text-text-secondary leading-relaxed font-medium">{project.challenge}</p>
                                                        </div>

                                                        <div className="space-y-4">
                                                            <SubHeading color="accent" icon={<i className="fas fa-check-circle text-[10px]"></i>}>Solution</SubHeading>
                                                            <p className="text-base text-text-secondary leading-relaxed font-medium">{project.solution}</p>
                                                        </div>
                                                    </div>

                                                    <div className="pt-8 border-t border-border-subtle/30">
                                                        <SubHeading>Technologies & Tools</SubHeading>
                                                        <div className="flex flex-wrap gap-2.5">
                                                            {project.technologies.map((tech, idx) => (
                                                                <span key={idx} className="inline-flex items-center px-3 py-1.5 bg-bg-canvas text-text-primary text-[11px] font-bold uppercase tracking-wider rounded-lg border border-border-subtle shadow-sm">
                                                                    {tech}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {project.link && (
                                                        <div className="pt-4 flex justify-end">
                                                            <Button
                                                                href={project.link}
                                                                as="a"
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                icon={<i className="fas fa-arrow-right text-[10px]"></i>}
                                                                iconPosition="right"
                                                                className="px-8 shadow-md hover:shadow-lg"
                                                            >
                                                                Technical Documentation
                                                            </Button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <SkeletonLoader.CardGrid items={2} columns={2} />
                )}
            </div>
        </Section>
    );
};

export default Projects;
