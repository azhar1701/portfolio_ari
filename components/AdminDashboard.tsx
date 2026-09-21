import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import type { PortfolioData } from '../types';
import { useToast } from '../contexts/ToastContext';

// Import modular admin panels
import { ProfilePanel } from './admin/ProfilePanel';
import { SummaryPanel } from './admin/SummaryPanel';
import { ExperiencePanel } from './admin/ExperiencePanel';
import { ProjectsPanel } from './admin/ProjectsPanel';
import { SkillsPanel } from './admin/SkillsPanel';
import { EducationPanel } from './admin/EducationPanel';
import { ShowcasePanel } from './admin/ShowcasePanel';
import { LocationsPanel } from './admin/LocationsPanel';
import { StatsPanel } from './admin/StatsPanel';
import { TestimonialsPanel } from './admin/TestimonialsPanel';
import { BlogPanel } from './admin/BlogPanel';
import { GalleryPanel } from './admin/GalleryPanel';
import { MiscPanel } from './admin/MiscPanel';
import { LinkedInImportModal } from './admin/LinkedInImportModal';
import { AIAssistantModal, AIMode } from './admin/AIAssistantModal';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
  onSave: (data: PortfolioData) => void | Promise<void>;
  onReset: () => PortfolioData | Promise<PortfolioData | null>;
}

interface SectionTab {
  id: string;
  name: string;
  icon: string;
  countKey?: keyof PortfolioData;
}

const SECTIONS: SectionTab[] = [
  { id: 'profile', name: 'Profile & Social', icon: 'fa-id-card' },
  { id: 'summary', name: 'Summary & Hero', icon: 'fa-compass-drafting' },
  { id: 'experience', name: 'Experience', icon: 'fa-route', countKey: 'experience' },
  { id: 'projects', name: 'Projects', icon: 'fa-diagram-project', countKey: 'projects' },
  { id: 'skills', name: 'Skills & Tools', icon: 'fa-gears', countKey: 'skills' },
  { id: 'showcase', name: 'Showcase (Before/After)', icon: 'fa-eye' },
  { id: 'locations', name: 'GIS Locations', icon: 'fa-location-dot', countKey: 'locations' },
  { id: 'stats', name: 'Metrics & Stats', icon: 'fa-wave-square', countKey: 'stats' },
  { id: 'testimonials', name: 'Testimonials', icon: 'fa-quote-left', countKey: 'testimonials' },
  { id: 'blog', name: 'Blog & Insights', icon: 'fa-lightbulb', countKey: 'blogPosts' },
  { id: 'gallery', name: 'Visual Gallery', icon: 'fa-camera', countKey: 'gallery' },
  { id: 'education', name: 'Education', icon: 'fa-user-graduate', countKey: 'education' },
  { id: 'misc', name: 'Pubs & Credentials', icon: 'fa-file-lines' },
];

const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose, data, onSave, onReset }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [isLinkedInModalOpen, setIsLinkedInModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiModalConfig, setAiModalConfig] = useState<{
    mode: AIMode;
    content: string;
    context: any;
    applyCallback: (val: any) => void;
  }>({
    mode: 'polish',
    content: '',
    context: {},
    applyCallback: () => {},
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const initialValues = useMemo(() => {
    const formValues = JSON.parse(JSON.stringify(data));

    if (Array.isArray(formValues.experience)) {
      formValues.experience.forEach((exp: any) => {
        if (Array.isArray(exp.responsibilities)) exp.responsibilities = exp.responsibilities.join('\n');
        if (Array.isArray(exp.achievements)) exp.achievements = exp.achievements.join('\n');
      });
    }
    if (Array.isArray(formValues.projects)) {
      formValues.projects.forEach((proj: any) => {
        if (Array.isArray(proj.technologies)) proj.technologies = proj.technologies.join(', ');
        if (Array.isArray(proj.images)) proj.images = proj.images.join(', ');
      });
    }
    if (Array.isArray(formValues.skills)) {
      formValues.skills.forEach((skillCat: any) => {
        if (Array.isArray(skillCat.skills)) skillCat.skills = skillCat.skills.join(', ');
      });
    }
    if (formValues.showcase?.before?.imageUrls && Array.isArray(formValues.showcase.before.imageUrls)) {
      formValues.showcase.before.imageUrls = formValues.showcase.before.imageUrls.join(', ');
    }
    if (formValues.showcase?.after?.imageUrls && Array.isArray(formValues.showcase.after.imageUrls)) {
      formValues.showcase.after.imageUrls = formValues.showcase.after.imageUrls.join(', ');
    }
    if (Array.isArray(formValues.certifications)) formValues.certifications = formValues.certifications.join('\n');
    if (Array.isArray(formValues.organizations)) formValues.organizations = formValues.organizations.join('\n');

    if (!Array.isArray(formValues.testimonials)) formValues.testimonials = [];
    if (!Array.isArray(formValues.blogPosts)) formValues.blogPosts = [];
    if (!Array.isArray(formValues.gallery)) formValues.gallery = [];

    if (Array.isArray(formValues.locations)) {
      formValues.locations.forEach((loc: any) => {
        if (!Array.isArray(loc.position) || loc.position.length < 2) {
          loc.position = [0, 0];
        }
      });
    }

    return formValues;
  }, [data]);

  const { register, control, handleSubmit, reset, setValue, watch } = useForm<PortfolioData>({
    defaultValues: initialValues,
  });

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape' && !showResetConfirm) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, showResetConfirm, onClose]);

  // Field arrays
  const { fields: expFields, append: appendExp, remove: removeExp } = useFieldArray({ control, name: 'experience' });
  const { fields: projFields, append: appendProj, remove: removeProj } = useFieldArray({ control, name: 'projects' });
  const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({ control, name: 'skills' });
  const { fields: eduFields, append: appendEdu, remove: removeEdu } = useFieldArray({ control, name: 'education' });
  const { fields: pubFields, append: appendPub, remove: removePub } = useFieldArray({ control, name: 'publications' });
  const { fields: statsFields, append: appendStat, remove: removeStat } = useFieldArray({ control, name: 'stats' });
  const { fields: locFields, append: appendLoc, remove: removeLoc } = useFieldArray({ control, name: 'locations' });
  const { fields: testimonialFields, append: appendTestimonial, remove: removeTestimonial } = useFieldArray({ control, name: 'testimonials' });
  const { fields: blogFields, append: appendBlog, remove: removeBlog } = useFieldArray({ control, name: 'blogPosts' });
  const { fields: galleryFields, append: appendGallery, remove: removeGallery } = useFieldArray({ control, name: 'gallery' });

  const onSubmit = async (formData: PortfolioData) => {
    setIsSaving(true);
    try {
      const processedData = JSON.parse(JSON.stringify(formData));

      if (Array.isArray(processedData.experience)) {
        processedData.experience.forEach((exp: any) => {
          if (typeof exp.responsibilities === 'string') exp.responsibilities = exp.responsibilities.split('\n').filter(Boolean);
          if (typeof exp.achievements === 'string') exp.achievements = exp.achievements.split('\n').filter(Boolean);
        });
      }
      if (Array.isArray(processedData.projects)) {
        processedData.projects.forEach((proj: any) => {
          if (typeof proj.technologies === 'string') proj.technologies = proj.technologies.split(',').map((s: string) => s.trim()).filter(Boolean);
          if (typeof proj.images === 'string') proj.images = proj.images.split(',').map((s: string) => s.trim()).filter(Boolean);
        });
      }
      if (Array.isArray(processedData.skills)) {
        processedData.skills.forEach((skillCat: any) => {
          if (typeof skillCat.skills === 'string') skillCat.skills = skillCat.skills.split(',').map((s: string) => s.trim()).filter(Boolean);
        });
      }
      if (processedData.showcase?.before?.imageUrls && typeof processedData.showcase.before.imageUrls === 'string') {
        processedData.showcase.before.imageUrls = processedData.showcase.before.imageUrls.split(',').map((s: string) => s.trim()).filter(Boolean);
      }
      if (processedData.showcase?.after?.imageUrls && typeof processedData.showcase.after.imageUrls === 'string') {
        processedData.showcase.after.imageUrls = processedData.showcase.after.imageUrls.split(',').map((s: string) => s.trim()).filter(Boolean);
      }
      if (typeof processedData.certifications === 'string') processedData.certifications = processedData.certifications.split('\n').filter(Boolean);
      if (typeof processedData.organizations === 'string') processedData.organizations = processedData.organizations.split('\n').filter(Boolean);

      if (Array.isArray(processedData.locations)) {
        processedData.locations.forEach((loc: any) => {
          if (loc.position && Array.isArray(loc.position)) {
            loc.position = [parseFloat(loc.position[0]) || 0, parseFloat(loc.position[1]) || 0];
          }
        });
      }

      if (Array.isArray(processedData.stats)) {
        processedData.stats.forEach((stat: any) => {
          stat.value = parseInt(stat.value) || 0;
          if (!stat.suffix) stat.suffix = '';
        });
      }

      if (Array.isArray(processedData.testimonials)) {
        processedData.testimonials.forEach((testimonial: any) => {
          testimonial.rating = parseInt(testimonial.rating) || 5;
        });
      }

      if (Array.isArray(processedData.blogPosts)) {
        processedData.blogPosts.forEach((post: any) => {
          post.readTime = parseInt(post.readTime) || 5;
        });
      }

      await onSave(processedData);
      onClose();
    } catch (err: any) {
      console.error('Failed to save dashboard data:', err);
      toast.error(err?.message || 'Failed to save changes.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleExecuteReset = async () => {
    setIsResetting(true);
    try {
      await onReset();
      setShowResetConfirm(false);
      onClose();
    } catch (err: any) {
      toast.error(err?.message || 'Failed to reset data.');
    } finally {
      setIsResetting(false);
    }
  };

  // Export JSON functionality
  const handleExportJSON = () => {
    try {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `portfolio-data-${new Date().toISOString().split('T')[0]}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      toast.success('Portfolio backup exported as JSON!');
    } catch (err) {
      toast.error('Failed to export JSON.');
    }
  };

  // Import JSON functionality
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result as string);
        if (imported && typeof imported === 'object' && imported.profile) {
          reset(imported);
          toast.success('Portfolio data successfully loaded into form! Click Save to apply.');
        } else {
          toast.error('Invalid portfolio JSON structure.');
        }
      } catch (err: any) {
        toast.error('Failed to parse JSON file: ' + err?.message);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const formatForForm = (raw: PortfolioData) => {
    const formValues = JSON.parse(JSON.stringify(raw));
    if (Array.isArray(formValues.experience)) {
      formValues.experience.forEach((exp: any) => {
        if (Array.isArray(exp.responsibilities)) exp.responsibilities = exp.responsibilities.join('\n');
        if (Array.isArray(exp.achievements)) exp.achievements = exp.achievements.join('\n');
      });
    }
    if (Array.isArray(formValues.projects)) {
      formValues.projects.forEach((proj: any) => {
        if (Array.isArray(proj.technologies)) proj.technologies = proj.technologies.join(', ');
        if (Array.isArray(proj.images)) proj.images = proj.images.join(', ');
      });
    }
    if (Array.isArray(formValues.skills)) {
      formValues.skills.forEach((skillCat: any) => {
        if (Array.isArray(skillCat.skills)) skillCat.skills = skillCat.skills.join(', ');
      });
    }
    if (Array.isArray(formValues.certifications)) formValues.certifications = formValues.certifications.join('\n');
    if (Array.isArray(formValues.organizations)) formValues.organizations = formValues.organizations.join('\n');
    return formValues;
  };

  const handleApplyLinkedInData = (mergedData: PortfolioData) => {
    const formatted = formatForForm(mergedData);
    reset(formatted);
    toast.success('LinkedIn resume data successfully loaded into form! Review and click Save Changes.');
  };

  // AI Copilot Handlers
  const handleOpenGeneralAi = (mode: AIMode = 'polish') => {
    setAiModalConfig({
      mode,
      content: '',
      context: {},
      applyCallback: (val) => {
        if (typeof val === 'string') {
          navigator.clipboard.writeText(val);
          toast.success('Hasil AI disalin ke clipboard!');
        }
      },
    });
    setIsAiModalOpen(true);
  };

  const handleOpenSummaryAi = (content: string, type: 'summary') => {
    setAiModalConfig({
      mode: 'polish',
      content,
      context: { targetType: 'summary', fieldName: 'summary' },
      applyCallback: (val: string) => {
        setValue('summary', val, { shouldDirty: true });
        toast.success('Summary berhasil diperbarui oleh AI!');
      },
    });
    setIsAiModalOpen(true);
  };

  const handleOpenExperienceAi = (content: string, type: 'responsibilities' | 'achievements', fieldName: string) => {
    setAiModalConfig({
      mode: 'polish',
      content,
      context: { targetType: type, fieldName },
      applyCallback: (val: string) => {
        setValue(fieldName as any, val, { shouldDirty: true });
        toast.success('Poin pengalaman berhasil diperbarui oleh AI!');
      },
    });
    setIsAiModalOpen(true);
  };

  const handleOpenProjectAi = (ctx: { projectName: string; overview: string; tools: string; index: number }) => {
    setAiModalConfig({
      mode: 'case-study',
      content: ctx.overview,
      context: { projectName: ctx.projectName, tools: ctx.tools },
      applyCallback: (val: { description?: string; challenge?: string; solution?: string }) => {
        if (val.description) setValue(`projects.${ctx.index}.description` as any, val.description, { shouldDirty: true });
        if (val.challenge) setValue(`projects.${ctx.index}.challenge` as any, val.challenge, { shouldDirty: true });
        if (val.solution) setValue(`projects.${ctx.index}.solution` as any, val.solution, { shouldDirty: true });
        toast.success('Studi kasus proyek berhasil diperbarui oleh AI!');
      },
    });
    setIsAiModalOpen(true);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9980] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl w-full max-w-7xl h-[92vh] flex flex-col overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="bg-slate-950/80 border-b border-slate-800 px-5 py-3.5 flex items-center justify-between z-30 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <i className="fas fa-sliders text-base"></i>
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">Portfolio Admin Hub</h2>
              <div className="flex items-center gap-2 mt-0.5">
                {import.meta.env.VITE_USE_SUPABASE === 'true' ? (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Supabase Connected
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-400 bg-amber-950/60 border border-amber-500/30 px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                    Local Storage Mode
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* AI Copilot button */}
            <button
              type="button"
              onClick={() => handleOpenGeneralAi('polish')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-amber-300 bg-amber-950/60 hover:bg-amber-900/80 border border-amber-500/40 transition-colors shadow-sm"
              title="AI Engineering Copilot (Impact Polish, Case Study, Translate)"
            >
              <i className="fas fa-wand-magic-sparkles text-xs text-amber-400"></i>
              <span className="hidden sm:inline">AI Copilot</span>
              <span className="sm:hidden">AI</span>
            </button>

            {/* LinkedIn Import button */}
            <button
              type="button"
              onClick={() => setIsLinkedInModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#0a66c2] hover:bg-[#004182] border border-[#0a66c2]/50 transition-colors shadow-sm"
              title="Import resume from LinkedIn PDF"
            >
              <i className="fab fa-linkedin text-xs"></i>
              <span className="hidden sm:inline">Import LinkedIn</span>
              <span className="sm:hidden">LinkedIn</span>
            </button>

            {/* Export JSON button */}
            <button
              type="button"
              onClick={handleExportJSON}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:text-white transition-colors"
              title="Export all portfolio data as JSON"
            >
              <i className="fas fa-file-export text-xs text-sky-400"></i>
              Export JSON
            </button>

            {/* Import JSON button */}
            <input
              type="file"
              ref={fileInputRef}
              accept=".json"
              onChange={handleImportJSON}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:text-white transition-colors"
              title="Import portfolio data from a JSON file"
            >
              <i className="fas fa-file-import text-xs text-amber-400"></i>
              Import JSON
            </button>

            {/* Close modal button */}
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close dashboard"
            >
              <i className="fas fa-xmark text-lg"></i>
            </button>
          </div>
        </div>

        {/* Content Body: Sidebar + Active Panel */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar Nav */}
          <aside className="w-60 md:w-64 bg-slate-950/50 border-r border-slate-800/80 overflow-y-auto p-3 space-y-1 shrink-0">
            {SECTIONS.map((section) => {
              const isActive = activeTab === section.id;
              const count = section.countKey && Array.isArray((data as any)[section.countKey])
                ? (data as any)[section.countKey].length
                : undefined;

              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => setActiveTab(section.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-sky-500/15 text-sky-400 border border-sky-500/30 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <i className={`fas ${section.icon} w-4 text-center ${isActive ? 'text-sky-400' : 'text-slate-500'}`}></i>
                    <span className="truncate">{section.name}</span>
                  </div>
                  {count !== undefined && (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        isActive ? 'bg-sky-500/20 text-sky-300' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </aside>

          {/* Main Form Work Area */}
          <main className="flex-1 overflow-y-auto p-5 sm:p-8 bg-slate-900/40">
            <form id="admin-main-form" onSubmit={handleSubmit(onSubmit)}>
              {activeTab === 'profile' && <ProfilePanel register={register} />}
              {activeTab === 'summary' && (
                <SummaryPanel
                  register={register}
                  setValue={setValue}
                  watch={watch}
                  onOpenAi={handleOpenSummaryAi}
                />
              )}
              {activeTab === 'experience' && (
                <ExperiencePanel
                  fields={expFields}
                  append={appendExp}
                  remove={removeExp}
                  register={register}
                  watch={watch}
                  onOpenAi={handleOpenExperienceAi}
                />
              )}
              {activeTab === 'projects' && (
                <ProjectsPanel
                  fields={projFields}
                  append={appendProj}
                  remove={removeProj}
                  register={register}
                  setValue={setValue}
                  watch={watch}
                  onOpenAi={handleOpenProjectAi}
                />
              )}
              {activeTab === 'skills' && (
                <SkillsPanel
                  fields={skillFields}
                  append={appendSkill}
                  remove={removeSkill}
                  register={register}
                />
              )}
              {activeTab === 'showcase' && (
                <ShowcasePanel register={register} setValue={setValue} watch={watch} />
              )}
              {activeTab === 'locations' && (
                <LocationsPanel
                  fields={locFields}
                  append={appendLoc}
                  remove={removeLoc}
                  register={register}
                />
              )}
              {activeTab === 'stats' && (
                <StatsPanel
                  fields={statsFields}
                  append={appendStat}
                  remove={removeStat}
                  register={register}
                />
              )}
              {activeTab === 'testimonials' && (
                <TestimonialsPanel
                  fields={testimonialFields}
                  append={appendTestimonial}
                  remove={removeTestimonial}
                  register={register}
                  setValue={setValue}
                  watch={watch}
                />
              )}
              {activeTab === 'blog' && (
                <BlogPanel
                  fields={blogFields}
                  append={appendBlog}
                  remove={removeBlog}
                  register={register}
                  setValue={setValue}
                  watch={watch}
                />
              )}
              {activeTab === 'gallery' && (
                <GalleryPanel
                  fields={galleryFields}
                  append={appendGallery}
                  remove={removeGallery}
                  register={register}
                  setValue={setValue}
                  watch={watch}
                />
              )}
              {activeTab === 'education' && (
                <EducationPanel
                  fields={eduFields}
                  append={appendEdu}
                  remove={removeEdu}
                  register={register}
                />
              )}
              {activeTab === 'misc' && (
                <MiscPanel
                  pubFields={pubFields}
                  appendPub={appendPub}
                  removePub={removePub}
                  register={register}
                />
              )}
            </form>
          </main>
        </div>

        {/* Bottom Action Footer */}
        <div className="bg-slate-950/90 border-t border-slate-800 px-5 py-3.5 flex items-center justify-between shrink-0 z-30">
          <div>
            {!showResetConfirm ? (
              <button
                type="button"
                onClick={() => setShowResetConfirm(true)}
                disabled={isResetting || isSaving}
                className="px-3.5 py-2 text-xs font-semibold rounded-xl text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 border border-rose-500/20 transition-all flex items-center gap-2 disabled:opacity-40"
              >
                <i className="fas fa-rotate-left text-xs"></i>
                Reset to Default
              </button>
            ) : (
              <div className="flex items-center gap-2 p-1 bg-rose-950/60 border border-rose-500/30 rounded-xl">
                <span className="text-xs text-rose-200 px-2 font-medium">Reset all content?</span>
                <button
                  type="button"
                  onClick={handleExecuteReset}
                  disabled={isResetting}
                  className="px-3 py-1 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  {isResetting ? <i className="fas fa-spinner fa-spin text-xs"></i> : null}
                  Confirm Reset
                </button>
                <button
                  type="button"
                  onClick={() => setShowResetConfirm(false)}
                  disabled={isResetting}
                  className="px-2.5 py-1 text-xs text-slate-400 hover:text-slate-200 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving || isResetting}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="admin-main-form"
              disabled={isSaving || isResetting}
              className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 shadow-lg shadow-sky-500/20 active:scale-95 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <i className="fas fa-spinner fa-spin text-xs"></i>
                  Saving Changes...
                </>
              ) : (
                <>
                  <i className="fas fa-check text-xs"></i>
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>

        {/* LinkedIn PDF Import Modal */}
        <LinkedInImportModal
          isOpen={isLinkedInModalOpen}
          onClose={() => setIsLinkedInModalOpen(false)}
          currentPortfolioData={watch() as PortfolioData}
          onApplyParsedData={handleApplyLinkedInData}
        />

        {/* AI Copilot Modal */}
        <AIAssistantModal
          isOpen={isAiModalOpen}
          onClose={() => setIsAiModalOpen(false)}
          initialMode={aiModalConfig.mode}
          initialContent={aiModalConfig.content}
          initialContext={aiModalConfig.context}
          onApply={aiModalConfig.applyCallback}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;