import React, { useState, useMemo } from 'react';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import type { Project } from '../types';
import Section from './Section';
import SkeletonLoader from './SkeletonLoader';
import Card from './ui/Card';
import ProjectModal from './ProjectModal';

interface ProjectsProps {
  projects: Project[] | null;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
};

type FilterCategory = 'ALL' | 'WATER_RESOURCES' | 'GIS' | 'MODELING';

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  const [selectedFilter, setSelectedFilter] = useState<FilterCategory>('ALL');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    if (!projects) return [];
    if (selectedFilter === 'ALL') return projects;

    return projects.filter((p) => {
      const allText = `${p.name} ${p.description} ${p.technologies.join(' ')} ${p.challenge} ${p.solution}`.toLowerCase();
      if (selectedFilter === 'WATER_RESOURCES') {
        return allText.includes('irrigation') || allText.includes('irigasi') || allText.includes('water') || allText.includes('sipasda');
      }
      if (selectedFilter === 'GIS') {
        return allText.includes('gis') || allText.includes('geospatial') || allText.includes('spasial') || allText.includes('mapping');
      }
      if (selectedFilter === 'MODELING') {
        return allText.includes('hec-ras') || allText.includes('hydrology') || allText.includes('sih3') || allText.includes('modeling');
      }
      return true;
    });
  }, [projects, selectedFilter]);

  if (projects && projects.length === 0) {
    return null;
  }

  const filters: { id: FilterCategory; label: string; icon: string }[] = [
    { id: 'ALL', label: 'Semua Proyek', icon: 'fa-layer-group' },
    { id: 'WATER_RESOURCES', label: 'Irigasi & Sumber Daya Air', icon: 'fa-water' },
    { id: 'GIS', label: 'GIS & Pemetaan Spasial', icon: 'fa-map' },
    { id: 'MODELING', label: 'Pemodelan Hidraulika & SIH3', icon: 'fa-chart-line' },
  ];

  return (
    <Section id="projects" title="Featured Engineering Case Studies" iconClass="fas fa-diagram-project" noContainer>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Domain Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-bg-app rounded-2xl border border-border-subtle max-w-fit">
          {filters.map((f) => {
            const isActive = selectedFilter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? 'bg-brand-accent text-white shadow-sm'
                    : 'text-text-secondary hover:text-text-primary hover:bg-bg-canvas'
                }`}
              >
                <i className={`fas ${f.icon} text-xs ${isActive ? 'text-white' : 'text-brand-accent'}`}></i>
                <span>{f.label}</span>
              </button>
            );
          })}
        </div>

        {/* Projects List */}
        {projects ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => {
                const isFeatured = index === 0 && selectedFilter === 'ALL';
                return (
                  <motion.div
                    layout
                    variants={itemVariants}
                    key={project.id}
                    className={`group relative ${isFeatured ? 'lg:grid lg:grid-cols-12 lg:gap-8 items-start' : ''}`}
                  >
                    {isFeatured && (
                      <div className="hidden lg:block absolute -left-8 top-0 bottom-0 w-1 bg-brand-accent rounded-full"></div>
                    )}

                    <motion.div
                      whileHover={{ y: -3 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      className="w-full lg:col-span-12"
                    >
                      <Card
                        variant="default"
                        padding="none"
                        className={`relative overflow-hidden border-border-subtle transition-all duration-300 ${
                          isFeatured ? 'shadow-md hover:shadow-xl border-brand-accent/40 ring-1 ring-brand-accent/10' : 'shadow-sm hover:shadow-md'
                        }`}
                      >
                        <div className={`flex flex-col ${isFeatured ? 'lg:flex-row' : ''}`}>
                          {/* Project Preview Image */}
                          {project.images && project.images.length > 0 && (
                            <div className={`${isFeatured ? 'lg:basis-5/12' : 'hidden'} aspect-video overflow-hidden border-b lg:border-b-0 lg:border-r border-border-subtle bg-slate-900 relative`}>
                              <img
                                src={project.images[0]}
                                alt={project.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[10px] font-mono uppercase tracking-widest font-bold">
                                <span><i className="fas fa-microscope mr-1"></i> Technical Spec</span>
                                <span>{project.technologies[0]}</span>
                              </div>
                            </div>
                          )}

                          {/* Content Body */}
                          <div className={`p-6 sm:p-8 ${isFeatured ? 'lg:basis-7/12 flex flex-col justify-between' : 'w-full'}`}>
                            <div>
                              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                                {isFeatured ? (
                                  <span className="px-3 py-1 bg-brand-accent/10 text-brand-accent border border-brand-accent/20 text-[10px] font-bold uppercase tracking-widest rounded-full">
                                    <i className="fas fa-star mr-1"></i> Featured Implementation
                                  </span>
                                ) : (
                                  <span className="text-[10px] font-mono text-text-muted font-bold uppercase tracking-widest">
                                    Project Node #{project.id.replace('proj-', '')}
                                  </span>
                                )}
                              </div>

                              <h3 className={`font-bold text-text-primary tracking-tight group-hover:text-brand-accent transition-colors ${
                                isFeatured ? 'text-2xl sm:text-3xl' : 'text-xl'
                              }`}>
                                {project.name}
                              </h3>

                              <p className="text-text-secondary text-sm sm:text-base leading-relaxed font-medium mt-3 mb-6">
                                {project.description}
                              </p>

                              {/* Tech Badges */}
                              <div className="flex flex-wrap gap-2 mb-6">
                                {project.technologies.map((tech, idx) => (
                                  <span
                                    key={idx}
                                    className="px-2.5 py-1 bg-bg-app text-text-primary border border-border-subtle rounded-lg text-xs font-semibold uppercase tracking-wider"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="pt-4 border-t border-border-subtle/50 flex flex-wrap items-center justify-between gap-4">
                              <button
                                type="button"
                                onClick={() => setActiveModalProject(project)}
                                className="px-4 py-2 bg-brand-accent hover:bg-brand-accent-hover text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm hover:shadow-md flex items-center space-x-2 cursor-pointer active:scale-95"
                              >
                                <span>Detail Studi Kasus</span>
                                <i className="fas fa-arrow-right text-[10px]"></i>
                              </button>

                              {project.link && (
                                <a
                                  href={project.link}
                                  target={project.link.startsWith('http') ? '_blank' : '_self'}
                                  rel="noopener noreferrer"
                                  className="text-xs font-bold text-text-secondary hover:text-brand-accent transition-colors flex items-center space-x-1.5"
                                >
                                  <span>Dokumentasi Terkait</span>
                                  <i className="fas fa-external-link-alt text-[10px]"></i>
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <SkeletonLoader key={i} className="h-56 w-full rounded-3xl" />
            ))}
          </div>
        )}
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        isOpen={!!activeModalProject}
        onClose={() => setActiveModalProject(null)}
        project={activeModalProject}
      />
    </Section>
  );
};

export default Projects;
