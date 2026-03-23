import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import type { PortfolioData } from '../types';
import EmptyState from './ui/EmptyState';
import Button from './ui/Button';
import { SupabaseService } from '../services/supabaseService';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
  onSave: (data: PortfolioData) => void | Promise<void>;
  onReset: () => PortfolioData | Promise<PortfolioData | null>;
}

const sections = [
  { id: 'profile', name: 'Profile', icon: 'fa-id-card' },
  { id: 'summary', name: 'Summary', icon: 'fa-compass-drafting' },
  { id: 'experience', name: 'Experience', icon: 'fa-route' },
  { id: 'projects', name: 'Projects', icon: 'fa-diagram-project' },
  { id: 'skills', name: 'Skills', icon: 'fa-gears' },
  { id: 'testimonials', name: 'Testimonials', icon: 'fa-quote-left' },
  { id: 'blog', name: 'Blog', icon: 'fa-lightbulb' },
  { id: 'gallery', name: 'Gallery', icon: 'fa-microscope' },
  { id: 'education', name: 'Education', icon: 'fa-user-graduate' },
  { id: 'stats', name: 'Stats', icon: 'fa-wave-square' },
  { id: 'showcase', name: 'Showcase', icon: 'fa-eye' },
  { id: 'locations', name: 'Locations', icon: 'fa-location-dot' },
  { id: 'publications', name: 'Publications', icon: 'fa-file-lines' },
  { id: 'certifications', name: 'Certifications', icon: 'fa-award' },
  { id: 'organizations', name: 'Organizations', icon: 'fa-building-columns' },
];

const Input = ({ label, name, register, help, ...props }: { label: string, name: string, register: any, help?: string, [key: string]: any }) => (
  <div className="group/input relative">
    <div className="flex items-center justify-between mb-1.5">
      <label htmlFor={name} className="block text-xs font-bold text-text-muted uppercase tracking-widest">{label}</label>
      {help && (
        <div className="relative group/help">
          <i className="fas fa-question-circle text-text-muted/30 hover:text-brand-accent cursor-help transition-colors text-xs"></i>
          <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-text-primary text-white text-[10px] rounded-lg shadow-xl opacity-0 group-hover/help:opacity-100 transition-opacity pointer-events-none z-20 leading-relaxed font-medium">
            {help}
          </div>
        </div>
      )}
    </div>
    <input id={name} {...register(name)} {...props} className="block w-full px-4 py-2.5 bg-bg-app border border-border-subtle rounded-xl text-sm font-medium text-text-primary placeholder-text-muted/40 focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all group-hover/input:border-border-subtle/80" />
  </div>
);

const Textarea = ({ label, name, register, help, ...props }: { label: string, name: string, register: any, help?: string, [key: string]: any }) => (
  <div className="group/input relative">
    <div className="flex items-center justify-between mb-1.5">
      <label htmlFor={name} className="block text-xs font-bold text-text-muted uppercase tracking-widest">{label}</label>
      {help && (
        <div className="relative group/help">
          <i className="fas fa-question-circle text-text-muted/30 hover:text-brand-accent cursor-help transition-colors text-xs"></i>
          <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-text-primary text-white text-[10px] rounded-lg shadow-xl opacity-0 group-hover/help:opacity-100 transition-opacity pointer-events-none z-20 leading-relaxed font-medium">
            {help}
          </div>
        </div>
      )}
    </div>
    <textarea id={name} {...register(name)} {...props} className="block w-full px-4 py-3 bg-bg-app border border-border-subtle rounded-xl text-sm font-medium text-text-primary placeholder-text-muted/40 focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all group-hover/input:border-border-subtle/80" />
  </div>
);

const ImageUploadInput = ({ label, name, register, setValue, watch, help, isMultiple = false, ...props }: any) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const currentValue = watch(name);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      if (import.meta.env.VITE_USE_SUPABASE !== 'true') {
        alert("Image upload requires Supabase to be connected. Please paste an image URL instead.");
        return;
      }

      setIsUploading(true);
      setUploadError('');

      const publicUrl = await SupabaseService.uploadImage(file);

      if (isMultiple) {
        const current = watch(name) || '';
        const newVal = current ? `${current}, ${publicUrl}` : publicUrl;
        setValue(name, newVal, { shouldDirty: true, shouldValidate: true });
      } else {
        setValue(name, publicUrl, { shouldDirty: true, shouldValidate: true });
      }
    } catch (err: any) {
      console.error("Upload error:", err);
      setUploadError(err.message || "Failed to upload image.");
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div className="group/input relative">
      <div className="flex items-center justify-between mb-1.5">
        <label htmlFor={name} className="block text-xs font-bold text-text-muted uppercase tracking-widest">{label}</label>
        {help && (
          <div className="relative group/help">
            <i className="fas fa-question-circle text-text-muted/30 hover:text-brand-accent cursor-help transition-colors text-xs"></i>
            <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-text-primary text-white text-[10px] rounded-lg shadow-xl opacity-0 group-hover/help:opacity-100 transition-opacity pointer-events-none z-20 leading-relaxed font-medium">
              {help}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col space-y-2">
        <div className="flex flex-col xl:flex-row xl:space-x-2 gap-y-2 xl:gap-y-0">
          <input id={name} {...register(name)} {...props} className="flex-1 block w-full px-4 py-2.5 bg-bg-app border border-border-subtle rounded-xl text-sm font-medium text-text-primary placeholder-text-muted/40 focus:outline-none focus:ring-2 focus:ring-brand-accent/20 focus:border-brand-accent transition-all group-hover/input:border-border-subtle/80" />

          <div className="relative flex-shrink-0 h-10 xl:h-auto">
            <input type="file" accept="image/*" onChange={handleUpload} title="Upload image" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10" disabled={isUploading} />
            <button type="button" disabled={isUploading} className="h-full w-full xl:w-auto px-4 bg-brand-accent/10 hover:bg-brand-accent/20 border border-brand-accent/20 rounded-xl text-brand-accent font-bold text-xs uppercase tracking-widest transition-colors flex items-center justify-center min-w-[140px]">
              {isUploading ? <><i className="fas fa-spinner fa-spin mr-2 text-sm"></i> Uploading</> : <><i className="fas fa-cloud-upload-alt mr-2 text-sm"></i> Upload File</>}
            </button>
          </div>
        </div>

        {uploadError && <p className="text-red-500 text-xs mt-1 font-medium"><i className="fas fa-exclamation-circle mr-1"></i> {uploadError}</p>}

        {!isMultiple && currentValue && (currentValue.startsWith('http') || currentValue.startsWith('/')) && (
          <div className="h-24 w-32 rounded-lg border border-border-subtle overflow-hidden bg-bg-app mt-2 relative group-preview">
            <img src={currentValue} alt="Preview" className="w-full h-full object-cover" />
          </div>
        )}
      </div>
    </div>
  );
};

const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose, data, onSave, onReset }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showWelcome, setShowWelcome] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    const hasSeenAdminWelcome = localStorage.getItem('ari_portfolio_admin_welcome_seen');
    if (isOpen && !hasSeenAdminWelcome) {
      setShowWelcome(true);
    }
  }, [isOpen]);

  const dismissWelcome = () => {
    localStorage.setItem('ari_portfolio_admin_welcome_seen', 'true');
    setShowWelcome(false);
  };

  const initialValues = React.useMemo(() => {
    // Deep copy data to avoid mutating the original state
    const formValues = JSON.parse(JSON.stringify(data));

    // Convert array data to strings for form inputs
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

    // Ensure testimonials, blogPosts, and gallery are arrays
    if (!Array.isArray(formValues.testimonials)) formValues.testimonials = [];
    if (!Array.isArray(formValues.blogPosts)) formValues.blogPosts = [];
    if (!Array.isArray(formValues.gallery)) formValues.gallery = [];

    // Ensure locations position arrays are properly handled
    if (Array.isArray(formValues.locations)) {
      formValues.locations.forEach((loc: any) => {
        if (Array.isArray(loc.position) && loc.position.length >= 2) {
          // Keep position as array for form handling
        } else {
          loc.position = [0, 0]; // Default fallback
        }
      });
    }

    return formValues;
  }, [data]);

  const { register, control, handleSubmit, reset, setValue, watch } = useForm<PortfolioData>({
    defaultValues: initialValues
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
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  const onSubmit = async (formData: PortfolioData) => {
    setIsSaving(true);
    try {
      // Deep copy form data to process it for saving
      const processedData = JSON.parse(JSON.stringify(formData));

      // Convert string fields back into arrays.
      if (Array.isArray(processedData.experience)) {
        processedData.experience.forEach(exp => {
          if (typeof exp.responsibilities === 'string') exp.responsibilities = exp.responsibilities.split('\n').filter(Boolean);
          if (typeof exp.achievements === 'string') exp.achievements = exp.achievements.split('\n').filter(Boolean);
        });
      }
      if (Array.isArray(processedData.projects)) {
        processedData.projects.forEach(proj => {
          if (typeof proj.technologies === 'string') proj.technologies = proj.technologies.split(',').map(s => s.trim()).filter(Boolean);
          if (typeof proj.images === 'string') proj.images = proj.images.split(',').map(s => s.trim()).filter(Boolean);
        });
      }
      if (Array.isArray(processedData.skills)) {
        processedData.skills.forEach(skillCat => {
          if (typeof skillCat.skills === 'string') skillCat.skills = skillCat.skills.split(',').map(s => s.trim()).filter(Boolean);
        });
      }
      if (processedData.showcase?.before?.imageUrls && typeof processedData.showcase.before.imageUrls === 'string') {
        processedData.showcase.before.imageUrls = processedData.showcase.before.imageUrls.split(',').map(s => s.trim()).filter(Boolean);
      }
      if (processedData.showcase?.after?.imageUrls && typeof processedData.showcase.after.imageUrls === 'string') {
        processedData.showcase.after.imageUrls = processedData.showcase.after.imageUrls.split(',').map(s => s.trim()).filter(Boolean);
      }
      if (typeof processedData.certifications === 'string') processedData.certifications = processedData.certifications.split('\n').filter(Boolean);
      if (typeof processedData.organizations === 'string') processedData.organizations = processedData.organizations.split('\n').filter(Boolean);

      // Ensure locations position arrays are properly converted
      if (Array.isArray(processedData.locations)) {
        processedData.locations.forEach(loc => {
          if (loc.position && Array.isArray(loc.position)) {
            loc.position = [parseFloat(loc.position[0]) || 0, parseFloat(loc.position[1]) || 0];
          }
        });
      }

      // Ensure stats values are numbers and suffix is handled properly
      if (Array.isArray(processedData.stats)) {
        processedData.stats.forEach(stat => {
          stat.value = parseInt(stat.value) || 0;
          if (!stat.suffix) stat.suffix = '';
        });
      }

      // Ensure testimonials have proper rating values
      if (Array.isArray(processedData.testimonials)) {
        processedData.testimonials.forEach(testimonial => {
          testimonial.rating = parseInt(testimonial.rating) || 5;
        });
      }

      // Ensure blog posts have proper readTime values
      if (Array.isArray(processedData.blogPosts)) {
        processedData.blogPosts.forEach(post => {
          post.readTime = parseInt(post.readTime) || 5;
        });
      }

      await onSave(processedData);
      onClose();
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = async () => {
    if (window.confirm('Are you sure you want to reset all data to default? This action cannot be undone.')) {
      setIsResetting(true);
      try {
        await onReset();
      } finally {
        setIsResetting(false);
      }
    }
  };

  const confirmRemove = (removeFn: (index: number) => void, index: number) => {
    if (window.confirm("Are you sure you want to remove this item?")) {
      removeFn(index);
    }
  };

  const { fields: expFields, append: appendExp, remove: removeExp } = useFieldArray({ control, name: "experience" });
  const { fields: projFields, append: appendProj, remove: removeProj } = useFieldArray({ control, name: "projects" });
  const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({ control, name: "skills" });
  const { fields: eduFields, append: appendEdu, remove: removeEdu } = useFieldArray({ control, name: "education" });
  const { fields: pubFields, append: appendPub, remove: removePub } = useFieldArray({ control, name: "publications" });
  const { fields: statsFields, append: appendStat, remove: removeStat } = useFieldArray({ control, name: "stats" });
  const { fields: locFields, append: appendLoc, remove: removeLoc } = useFieldArray({ control, name: "locations" });
  const { fields: testimonialFields, append: appendTestimonial, remove: removeTestimonial } = useFieldArray({ control, name: "testimonials" });
  const { fields: blogFields, append: appendBlog, remove: removeBlog } = useFieldArray({ control, name: "blogPosts" });
  const { fields: galleryFields, append: appendGallery, remove: removeGallery } = useFieldArray({ control, name: "gallery" });

  if (!isOpen) return null;

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Full Name" name="profile.name" register={register} required />
              <Input label="Professional Title" name="profile.title" register={register} required />
              <Input label="Location" name="profile.location" register={register} />
              <Input label="Phone" name="profile.phone" register={register} />
              <div className="md:col-span-2">
                <Input label="Primary Contact Email" name="profile.email" register={register} required type="email" />
              </div>
            </div>

            <div className="pt-6 border-t border-border-subtle">
              <h4 className="text-xs font-bold text-text-muted uppercase tracking-[0.2em] mb-6">Social Links</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input label="LinkedIn Profile URL" name="profile.socials.linkedin" register={register} placeholder="https://linkedin.com/in/..." />
                <Input label="GitHub Handle URL" name="profile.socials.github" register={register} placeholder="https://github.com/..." />
                <Input label="YouTube Channel URL" name="profile.socials.youtube" register={register} placeholder="https://youtube.com/@..." />
                <Input label="Instagram Handle URL" name="profile.socials.instagram" register={register} placeholder="https://instagram.com/..." />
              </div>
            </div>
          </div>
        );
      case 'summary':
        return (
          <div className="space-y-6">
            <Textarea label="Professional Summary" name="summary" register={register} rows={10} required />
            <ImageUploadInput label="Summary Hero Image" name="summaryImage" register={register} setValue={setValue} watch={watch} help="The large image displayed alongside your summary." />
          </div>
        );
      case 'experience':
        return (
          <div className="space-y-6">
            {expFields.length > 0 ? (
              <>
                {expFields.map((field, index) => (
                  <div key={field.id} className="p-4 border border-border-subtle rounded-lg space-y-3 bg-bg-app">
                    <Input label="Role" name={`experience.${index}.role`} register={register} required />
                    <Input label="Company" name={`experience.${index}.company`} register={register} required />
                    <Input label="Period" name={`experience.${index}.period`} register={register} required />
                    <Textarea label="Responsibilities (one per line)" name={`experience.${index}.responsibilities`} register={register} rows={4} />
                    <Textarea label="Achievements (one per line)" name={`experience.${index}.achievements`} register={register} rows={4} />
                    <button type="button" onClick={() => confirmRemove(removeExp, index)} className="text-red-500 text-sm font-medium hover:text-red-700 transition-colors"><i className="fas fa-trash-alt mr-1.5"></i>Remove Experience</button>
                  </div>
                ))}
                <button type="button" onClick={() => appendExp({ role: '', company: '', period: '', responsibilities: [], achievements: [] })} className="text-brand-accent font-medium hover:text-brand-accent-hover transition-colors"><i className="fas fa-plus mr-1.5"></i>Add Experience</button>
              </>
            ) : (
              <EmptyState
                title="No Experience listed"
                description="Add your work history here."
                icon="fa-briefcase"
                onAction={() => appendExp({ role: '', company: '', period: '', responsibilities: [], achievements: [] })}
              />
            )}
          </div>
        );
      case 'projects':
        return (
          <div className="space-y-6">
            {projFields.length > 0 ? (
              <>
                {projFields.map((field, index) => (
                  <div key={field.id} className="p-4 border border-border-subtle rounded-lg space-y-3 bg-bg-app">
                    <Input label="Name" name={`projects.${index}.name`} register={register} required />
                    <Textarea label="Description" name={`projects.${index}.description`} register={register} rows={3} required />
                    <Textarea label="Challenge" name={`projects.${index}.challenge`} register={register} rows={3} />
                    <Textarea label="Solution" name={`projects.${index}.solution`} register={register} rows={3} />
                    <Input label="Technologies (comma separated)" name={`projects.${index}.technologies`} register={register} />
                    <ImageUploadInput label="Images (comma separated URLs)" name={`projects.${index}.images`} register={register} setValue={setValue} watch={watch} isMultiple={true} />
                    <Input label="Link (optional)" name={`projects.${index}.link`} register={register} />
                    <button type="button" onClick={() => confirmRemove(removeProj, index)} className="text-red-500 text-sm font-medium hover:text-red-700 transition-colors"><i className="fas fa-trash-alt mr-1.5"></i>Remove Project</button>
                  </div>
                ))}
                <button type="button" onClick={() => appendProj({ id: `proj-${Date.now()}`, name: '', description: '', technologies: [], challenge: '', solution: '', images: [], link: '' })} className="text-brand-accent font-medium hover:text-brand-accent-hover transition-colors"><i className="fas fa-plus mr-1.5"></i>Add Project</button>
              </>
            ) : (
              <EmptyState
                title="No Projects added"
                description="Add your projects here."
                icon="fa-diagram-project"
                onAction={() => appendProj({ id: `proj-${Date.now()}`, name: '', description: '', technologies: [], challenge: '', solution: '', images: [], link: '' })}
              />
            )}
          </div>
        );
      case 'skills':
        return (
          <div className="space-y-6">
            {skillFields.length > 0 ? (
              <>
                {skillFields.map((field, index) => (
                  <div key={field.id} className="p-4 border border-border-subtle rounded-lg space-y-3 bg-bg-app">
                    <Input label="Category" name={`skills.${index}.category`} register={register} required />
                    <Input label="Skills (comma separated)" name={`skills.${index}.skills`} register={register} required />
                    <button type="button" onClick={() => confirmRemove(removeSkill, index)} className="text-red-500 text-sm font-medium hover:text-red-700 transition-colors"><i className="fas fa-trash-alt mr-1.5"></i>Remove Category</button>
                  </div>
                ))}
                <button type="button" onClick={() => appendSkill({ category: '', skills: [] })} className="text-brand-accent font-medium hover:text-brand-accent-hover transition-colors"><i className="fas fa-plus mr-1.5"></i>Add Skill Category</button>
              </>
            ) : (
              <EmptyState
                title="No Skills defined"
                description="List your technical and professional skills by category."
                icon="fa-gears"
                onAction={() => appendSkill({ category: '', skills: [] })}
              />
            )}
          </div>
        );
      case 'education':
        return (
          <div className="space-y-6">
            {eduFields.length > 0 ? (
              <>
                {eduFields.map((field, index) => (
                  <div key={field.id} className="p-4 border border-border-subtle rounded-lg space-y-3 bg-bg-app">
                    <Input label="Institution" name={`education.${index}.institution`} register={register} required />
                    <Input label="Degree" name={`education.${index}.degree`} register={register} help="e.g., Bachelor of Science in Civil Engineering" required />
                    <Input label="Period" name={`education.${index}.period`} register={register} help="e.g., 2015 - 2019" required />
                    <Input label="GPA" name={`education.${index}.gpa`} register={register} help="Optional: Your academic performance score." />
                    <button type="button" onClick={() => confirmRemove(removeEdu, index)} className="text-red-500 text-sm font-medium hover:text-red-700 transition-colors"><i className="fas fa-trash-alt mr-1.5"></i>Remove Education</button>
                  </div>
                ))}
                <button type="button" onClick={() => appendEdu({ institution: '', degree: '', period: '', gpa: '' })} className="text-brand-accent font-medium hover:text-brand-accent-hover transition-colors"><i className="fas fa-plus mr-1.5"></i>Add Education</button>
              </>
            ) : (
              <EmptyState
                title="No Education history"
                description="List your degrees and certifications to build academic credibility."
                icon="fa-graduation-cap"
                onAction={() => appendEdu({ institution: '', degree: '', period: '', gpa: '' })}
              />
            )}
          </div>
        );
      case 'publications':
        return (
          <div className="space-y-6">
            {pubFields.length > 0 ? (
              <>
                {pubFields.map((field, index) => (
                  <div key={field.id} className="p-4 border border-border-subtle rounded-lg space-y-3 bg-bg-app">
                    <Input label="Title" name={`publications.${index}.title`} register={register} required />
                    <Input label="Details" name={`publications.${index}.details`} register={register} help="Journal name, date, or collaborators." required />
                    <Input label="Link" name={`publications.${index}.link`} register={register} help="Direct URL to the publication or PDF." />
                    <button type="button" onClick={() => confirmRemove(removePub, index)} className="text-red-500 text-sm font-medium hover:text-red-700 transition-colors"><i className="fas fa-trash-alt mr-1.5"></i>Remove Publication</button>
                  </div>
                ))}
                <button type="button" onClick={() => appendPub({ title: '', details: '', link: '' })} className="text-brand-accent font-medium hover:text-brand-accent-hover transition-colors"><i className="fas fa-plus mr-1.5"></i>Add Publication</button>
              </>
            ) : (
              <EmptyState
                title="No Publications"
                description="Share your research papers, articles, or books with the world."
                icon="fa-book-open"
                onAction={() => appendPub({ title: '', details: '', link: '' })}
              />
            )}
          </div>
        );
      case 'stats':
        return (
          <div className="space-y-6">
            {statsFields.length > 0 ? (
              <>
                {statsFields.map((field, index) => (
                  <div key={field.id} className="p-4 border border-border-subtle rounded-lg space-y-3 grid grid-cols-3 gap-2 bg-bg-app">
                    <Input label="Label" name={`stats.${index}.label`} register={register} help="e.g., Projects Done, Happy Clients" required />
                    <Input label="Value" name={`stats.${index}.value`} register={register} type="number" help="Numeric value only." required />
                    <Input label="Suffix" name={`stats.${index}.suffix`} register={register} help="e.g., +, %, km" />
                    <button type="button" onClick={() => confirmRemove(removeStat, index)} className="text-red-500 text-sm font-medium hover:text-red-700 transition-colors col-span-3"><i className="fas fa-trash-alt mr-1.5"></i>Remove Stat</button>
                  </div>
                ))}
                <button type="button" onClick={() => appendStat({ label: '', value: 0, suffix: '' })} className="text-brand-accent font-medium hover:text-brand-accent-hover transition-colors"><i className="fas fa-plus mr-1.5"></i>Add Stat</button>
              </>
            ) : (
              <EmptyState
                title="No Stats recorded"
                description="Add numbers to highlight your work."
                icon="fa-chart-line"
                onAction={() => appendStat({ label: '', value: 0, suffix: '' })}
              />
            )}
          </div>
        );
      case 'showcase':
        return (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-text-primary">Project Showcase</h3>
            <Input label="Title" name="showcase.title" register={register} />
            <Textarea label="Description" name="showcase.description" register={register} />
            <div className="p-4 border border-border-subtle rounded-lg space-y-3 bg-bg-app">
              <h4 className="font-semibold text-text-secondary">Before</h4>
              <Textarea label="Description" name="showcase.before.description" register={register} />
              <ImageUploadInput label="Image URLs (comma separated)" name="showcase.before.imageUrls" register={register} setValue={setValue} watch={watch} isMultiple={true} />
            </div>
            <div className="p-4 border border-border-subtle rounded-lg space-y-3 bg-bg-app">
              <h4 className="font-semibold text-text-secondary">After</h4>
              <Textarea label="Description" name="showcase.after.description" register={register} />
              <ImageUploadInput label="Image URLs (comma separated)" name="showcase.after.imageUrls" register={register} setValue={setValue} watch={watch} isMultiple={true} />
            </div>
          </div>
        )
      case 'locations':
        return (
          <div className="space-y-6">
            {locFields.length > 0 ? (
              <>
                {locFields.map((field, index) => (
                  <div key={field.id} className="p-4 border border-border-subtle rounded-lg space-y-3 bg-bg-app">
                    <Input label="Name" name={`locations.${index}.name`} register={register} required />
                    <Input label="Latitude" name={`locations.${index}.position.0`} register={register} type="number" step="any" required />
                    <Input label="Longitude" name={`locations.${index}.position.1`} register={register} type="number" step="any" required />
                    <Textarea label="Description" name={`locations.${index}.description`} register={register} />
                    <button type="button" onClick={() => confirmRemove(removeLoc, index)} className="text-red-500 text-sm font-medium hover:text-red-700 transition-colors"><i className="fas fa-trash-alt mr-1.5"></i>Remove Location</button>
                  </div>
                ))}
                <button type="button" onClick={() => appendLoc({ name: '', position: [0, 0], description: '' })} className="text-brand-accent font-medium hover:text-brand-accent-hover transition-colors"><i className="fas fa-plus mr-1.5"></i>Add Location</button>
              </>
            ) : (
              <EmptyState
                title="No Locations mapped"
                description="Add geographical points of interest for your projects or experience."
                icon="fa-location-dot"
                onAction={() => appendLoc({ name: '', position: [0, 0], description: '' })}
              />
            )}
          </div>
        );
      case 'testimonials':
        return (
          <div className="space-y-6">
            {testimonialFields.length > 0 ? (
              <>
                {testimonialFields.map((field, index) => (
                  <div key={field.id} className="p-4 border border-border-subtle rounded-lg space-y-3 bg-bg-app">
                    <Input label="Name" name={`testimonials.${index}.name`} register={register} required />
                    <Input label="Role" name={`testimonials.${index}.role`} register={register} required />
                    <Input label="Company" name={`testimonials.${index}.company`} register={register} />
                    <Textarea label="Content" name={`testimonials.${index}.content`} register={register} rows={4} help="The recommendation text." required />
                    <ImageUploadInput label="Avatar URL" name={`testimonials.${index}.avatar`} register={register} setValue={setValue} watch={watch} help="Link to a profile picture." />
                    <Input label="Rating (1-5)" name={`testimonials.${index}.rating`} register={register} type="number" min="1" max="5" required />
                    <button type="button" onClick={() => confirmRemove(removeTestimonial, index)} className="text-red-500 text-sm font-medium hover:text-red-700 transition-colors"><i className="fas fa-trash-alt mr-1.5"></i>Remove Testimonial</button>
                  </div>
                ))}
                <button type="button" onClick={() => appendTestimonial({ name: '', role: '', company: '', content: '', avatar: '', rating: 5 })} className="text-brand-accent font-medium hover:text-brand-accent-hover transition-colors"><i className="fas fa-plus mr-1.5"></i>Add Testimonial</button>
              </>
            ) : (
              <EmptyState
                title="No Testimonials"
                description="Display social proof from colleagues and clients to build trust."
                icon="fa-quote-left"
                onAction={() => appendTestimonial({ name: '', role: '', company: '', content: '', avatar: '', rating: 5 })}
              />
            )}
          </div>
        );
      case 'blog':
        return (
          <div className="space-y-6">
            {blogFields.length > 0 ? (
              <>
                {blogFields.map((field, index) => (
                  <div key={field.id} className="p-4 border border-border-subtle rounded-lg space-y-3 bg-bg-app">
                    <Input label="Title" name={`blogPosts.${index}.title`} register={register} required />
                    <Textarea label="Excerpt" name={`blogPosts.${index}.excerpt`} register={register} rows={3} help="A short summary shown in the blog list." required />
                    <Textarea label="Content" name={`blogPosts.${index}.content`} register={register} rows={6} help="The main body of your post. Supports Markdown-like structure." required />
                    <Input label="Date (YYYY-MM-DD)" name={`blogPosts.${index}.date`} register={register} type="date" required />
                    <Input label="Author" name={`blogPosts.${index}.author`} register={register} required />
                    <Input label="Category" name={`blogPosts.${index}.category`} register={register} help="e.g., Engineering, Personal, Water Resources" required />
                    <ImageUploadInput label="Image URL" name={`blogPosts.${index}.image`} register={register} setValue={setValue} watch={watch} help="Cover image for the post." />
                    <Input label="Read Time (minutes)" name={`blogPosts.${index}.readTime`} register={register} type="number" required />
                    <button type="button" onClick={() => confirmRemove(removeBlog, index)} className="text-red-500 text-sm font-medium hover:text-red-700 transition-colors"><i className="fas fa-trash-alt mr-1.5"></i>Remove Blog Post</button>
                  </div>
                ))}
                <button type="button" onClick={() => appendBlog({ id: `blog-${Date.now()}`, title: '', excerpt: '', content: '', date: new Date().toISOString().split('T')[0], author: '', category: '', image: '', readTime: 5 })} className="text-brand-accent font-medium hover:text-brand-accent-hover transition-colors"><i className="fas fa-plus mr-1.5"></i>Add Blog Post</button>
              </>
            ) : (
              <EmptyState
                title="No Blog Posts"
                description="Share your thoughts, tutorials, or project updates with your audience."
                icon="fa-blog"
                onAction={() => appendBlog({ id: `blog-${Date.now()}`, title: '', excerpt: '', content: '', date: new Date().toISOString().split('T')[0], author: '', category: '', image: '', readTime: 5 })}
              />
            )}
          </div>
        );
      case 'gallery':
        return (
          <div className="space-y-6">
            {galleryFields.length > 0 ? (
              <>
                {galleryFields.map((field, index) => (
                  <div key={field.id} className="p-4 border border-border-subtle rounded-lg space-y-3 bg-bg-app">
                    <Input label="Title" name={`gallery.${index}.title`} register={register} required />
                    <Textarea label="Description" name={`gallery.${index}.description`} register={register} rows={3} />
                    <ImageUploadInput label="Image URL" name={`gallery.${index}.image`} register={register} setValue={setValue} watch={watch} help="Direct link to the image file." required />
                    <Input label="Category" name={`gallery.${index}.category`} register={register} help="Used for filtering your gallery." required />
                    <button type="button" onClick={() => confirmRemove(removeGallery, index)} className="text-red-500 text-sm font-medium hover:text-red-700 transition-colors"><i className="fas fa-trash-alt mr-1.5"></i>Remove Gallery Item</button>
                  </div>
                ))}
                <button type="button" onClick={() => appendGallery({ id: `gallery-${Date.now()}`, title: '', description: '', image: '', category: '' })} className="text-brand-accent font-medium hover:text-brand-accent-hover transition-colors"><i className="fas fa-plus mr-1.5"></i>Add Gallery Item</button>
              </>
            ) : (
              <EmptyState
                title="Gallery is empty"
                description="Add photos, sketches, or team moments."
                icon="fa-images"
                onAction={() => appendGallery({ id: `gallery-${Date.now()}`, title: '', description: '', image: '', category: '' })}
              />
            )}
          </div>
        );
      case 'certifications':
        return <Textarea label="Certifications (one per line)" name="certifications" register={register} rows={10} />;
      case 'organizations':
        return <Textarea label="Organizations (one per line)" name="organizations" register={register} rows={5} />;
      default:
        return null;
    }
  };


  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div
        className="bg-white rounded-lg shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-border-subtle p-4 flex justify-between items-center z-30">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-bold text-text-primary">Admin Dashboard</h2>
            {import.meta.env.VITE_USE_SUPABASE === 'true' && (
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                Supabase Connected
              </span>
            )}
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-text-muted hover:bg-border-subtle">
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        {/* Welcome Overlay */}
        {showWelcome && (
          <div className="absolute inset-x-0 top-16 bottom-0 z-40 bg-white/95 flex items-center justify-center p-8 backdrop-blur-sm">
            <div className="max-w-md text-center">
              <div className="w-20 h-20 bg-brand-accent-soft text-brand-accent rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
                <i className="fas fa-magic"></i>
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-4 tracking-tight">Welcome to your Dashboard!</h3>
              <p className="text-text-secondary mb-8 leading-relaxed">
                This is where you manage all your portfolio content. Changes are saved locally or to Supabase. Look for the <i className="fas fa-question-circle text-brand-accent text-xs"></i> icons for help with specific fields.
              </p>
              <Button variant="primary" onClick={dismissWelcome} fullWidth>
                Get Started
              </Button>
            </div>
          </div>
        )}

        <div className="flex flex-grow overflow-hidden">
          {/* Sidebar */}
          <aside className="w-1/4 border-r border-border-subtle overflow-y-auto p-4 bg-bg-app">
            <nav className="space-y-1">
              {sections.map(section => (
                <button
                  key={section.id}
                  onClick={() => setActiveTab(section.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-left transition-colors ${activeTab === section.id
                    ? 'bg-brand-accent-soft text-brand-accent-hover'
                    : 'text-text-secondary hover:bg-border-subtle'
                    }`}
                >
                  <i className={`fas ${section.icon} mr-3 w-5 text-center`}></i>
                  {section.name}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="w-3/4 overflow-y-auto p-6 bg-white">
            <form id="admin-form" onSubmit={handleSubmit(onSubmit)}>
              {renderContent()}
            </form>
          </main>
        </div>

        <div className="flex justify-between items-center p-4 border-t border-border-subtle flex-shrink-0 bg-bg-app">
          <button
            type="button"
            onClick={handleReset}
            disabled={isResetting || isSaving}
            className="px-4 py-2 text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isResetting ? (
              <><i className="fas fa-spinner fa-spin mr-2"></i>Resetting...</>
            ) : (
              <><i className="fas fa-rotate-left mr-2"></i>Reset to Default</>
            )}
          </button>
          <div className="space-x-4 flex items-center">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving || isResetting}
              className="px-4 py-2 text-sm font-medium rounded-md text-text-secondary bg-border-subtle hover:bg-border-subtle disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="admin-form"
              disabled={isSaving || isResetting}
              className="px-4 py-2 text-sm font-medium rounded-md text-white bg-brand-accent hover:bg-brand-accent-hover disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isSaving ? (
                <><i className="fas fa-spinner fa-spin mr-2"></i>Saving...</>
              ) : (
                <><i className="fas fa-save mr-2"></i>Save Changes</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;