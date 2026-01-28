// Fix: Corrected the React import statement by removing the typo 'a,'.
import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import type { PortfolioData } from '../types';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioData;
  onSave: (data: PortfolioData) => void;
  onReset: () => PortfolioData;
}

const sections = [
  { id: 'profile', name: 'Profile', icon: 'fa-user' },
  { id: 'summary', name: 'Summary', icon: 'fa-file-alt' },
  { id: 'experience', name: 'Experience', icon: 'fa-briefcase' },
  { id: 'projects', name: 'Projects', icon: 'fa-project-diagram' },
  { id: 'skills', name: 'Skills', icon: 'fa-cogs' },
  { id: 'education', name: 'Education', icon: 'fa-graduation-cap' },
  { id: 'stats', name: 'Stats', icon: 'fa-chart-line' },
  { id: 'showcase', name: 'Showcase', icon: 'fa-images' },
  { id: 'locations', name: 'Locations', icon: 'fa-map-marked-alt' },
  { id: 'publications', name: 'Publications', icon: 'fa-book-open' },
  { id: 'certifications', name: 'Certifications', icon: 'fa-certificate' },
  { id: 'organizations', name: 'Organizations', icon: 'fa-users' },
];

const Input = ({ label, name, register, ...props }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{label}</label>
    <input id={name} {...register(name)} {...props} className="block w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" />
  </div>
);

const Textarea = ({ label, name, register, ...props }) => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{label}</label>
      <textarea id={name} {...register(name)} {...props} className="block w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" />
    </div>
  );

const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose, data, onSave, onReset }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const { register, control, handleSubmit, reset } = useForm<PortfolioData>();

  useEffect(() => {
    // Deep copy data to avoid mutating the original state
    const formValues = JSON.parse(JSON.stringify(data));

    // Transform array data into strings for form inputs, with defensive checks for data integrity
    if (Array.isArray(formValues.experience)) {
      formValues.experience.forEach(exp => {
          if (Array.isArray(exp.responsibilities)) exp.responsibilities = exp.responsibilities.join('\n');
          if (Array.isArray(exp.achievements)) exp.achievements = exp.achievements.join('\n');
      });
    }
    if (Array.isArray(formValues.projects)) {
      formValues.projects.forEach(proj => {
          if (Array.isArray(proj.technologies)) proj.technologies = proj.technologies.join(', ');
          if (Array.isArray(proj.images)) proj.images = proj.images.join(', ');
      });
    }
    if (Array.isArray(formValues.skills)) {
      formValues.skills.forEach(skillCat => {
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

    reset(formValues);
  }, [data, reset]);
  
  useEffect(() => {
    if (isOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  const onSubmit = (formData: PortfolioData) => {
    // Deep copy form data to process it for saving
    const processedData = JSON.parse(JSON.stringify(formData));

    // Transform string fields back into arrays, ensuring no corruption occurs.
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
    
    onSave(processedData);
    onClose();
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all data to default? This action cannot be undone.')) {
        onReset();
    }
  };

  const { fields: expFields, append: appendExp, remove: removeExp } = useFieldArray({ control, name: "experience" });
  const { fields: projFields, append: appendProj, remove: removeProj } = useFieldArray({ control, name: "projects" });
  const { fields: skillFields, append: appendSkill, remove: removeSkill } = useFieldArray({ control, name: "skills" });
  const { fields: eduFields, append: appendEdu, remove: removeEdu } = useFieldArray({ control, name: "education" });
  const { fields: pubFields, append: appendPub, remove: removePub } = useFieldArray({ control, name: "publications" });
  const { fields: statsFields, append: appendStat, remove: removeStat } = useFieldArray({ control, name: "stats" });
  const { fields: locFields, append: appendLoc, remove: removeLoc } = useFieldArray({ control, name: "locations" });

  if (!isOpen) return null;

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-4">
            <Input label="Full Name" name="profile.name" register={register} />
            <Input label="Title" name="profile.title" register={register} />
            <Input label="Location" name="profile.location" register={register} />
            <Input label="Phone" name="profile.phone" register={register} />
            <Input label="Email" name="profile.email" register={register} />
          </div>
        );
      case 'summary':
        return <Textarea label="Professional Summary" name="summary" register={register} rows={10} />;
      case 'experience':
        return (
            <div className="space-y-6">
            {expFields.map((field, index) => (
                <div key={field.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg space-y-3">
                    <Input label="Role" name={`experience.${index}.role`} register={register} />
                    <Input label="Company" name={`experience.${index}.company`} register={register} />
                    <Input label="Period" name={`experience.${index}.period`} register={register} />
                    <Textarea label="Responsibilities (one per line)" name={`experience.${index}.responsibilities`} register={register} rows={4} />
                    <Textarea label="Achievements (one per line)" name={`experience.${index}.achievements`} register={register} rows={4} />
                    <button type="button" onClick={() => removeExp(index)} className="text-red-500 text-sm">Remove Experience</button>
                </div>
            ))}
            <button type="button" onClick={() => appendExp({ role: '', company: '', period: '', responsibilities: [], achievements: [] })} className="text-cyan-600">Add Experience</button>
            </div>
        );
      case 'projects':
        return (
            <div className="space-y-6">
                {projFields.map((field, index) => (
                    <div key={field.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg space-y-3">
                        <Input label="ID" name={`projects.${index}.id`} register={register} />
                        <Input label="Name" name={`projects.${index}.name`} register={register} />
                        <Textarea label="Description" name={`projects.${index}.description`} register={register} />
                        <Textarea label="Challenge" name={`projects.${index}.challenge`} register={register} />
                        <Textarea label="Solution" name={`projects.${index}.solution`} register={register} />
                        <Input label="Technologies (comma separated)" name={`projects.${index}.technologies`} register={register} />
                        <Input label="Images (comma separated URLs)" name={`projects.${index}.images`} register={register} />
                        <button type="button" onClick={() => removeProj(index)} className="text-red-500 text-sm">Remove Project</button>
                    </div>
                ))}
                <button type="button" onClick={() => appendProj({ id: `proj-${Date.now()}`, name: '', description: '', technologies: [], challenge: '', solution: '', images: []})} className="text-cyan-600">Add Project</button>
            </div>
        );
      case 'skills':
            return (
                <div className="space-y-6">
                    {skillFields.map((field, index) => (
                        <div key={field.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg space-y-3">
                            <Input label="Category" name={`skills.${index}.category`} register={register} />
                            <Input label="Skills (comma separated)" name={`skills.${index}.skills`} register={register} />
                            <button type="button" onClick={() => removeSkill(index)} className="text-red-500 text-sm">Remove Category</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => appendSkill({ category: '', skills: [] })} className="text-cyan-600">Add Skill Category</button>
                </div>
            );
      case 'education':
        return (
            <div className="space-y-6">
                {eduFields.map((field, index) => (
                    <div key={field.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg space-y-3">
                        <Input label="Institution" name={`education.${index}.institution`} register={register} />
                        <Input label="Degree" name={`education.${index}.degree`} register={register} />
                        <Input label="Period" name={`education.${index}.period`} register={register} />
                        <Input label="GPA" name={`education.${index}.gpa`} register={register} />
                        <button type="button" onClick={() => removeEdu(index)} className="text-red-500 text-sm">Remove Education</button>
                    </div>
                ))}
                <button type="button" onClick={() => appendEdu({ institution: '', degree: '', period: '', gpa: '' })} className="text-cyan-600">Add Education</button>
            </div>
        );
      case 'publications':
        return (
            <div className="space-y-6">
                {pubFields.map((field, index) => (
                    <div key={field.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg space-y-3">
                        <Input label="Title" name={`publications.${index}.title`} register={register} />
                        <Input label="Details" name={`publications.${index}.details`} register={register} />
                        <Input label="Link" name={`publications.${index}.link`} register={register} />
                        <button type="button" onClick={() => removePub(index)} className="text-red-500 text-sm">Remove Publication</button>
                    </div>
                ))}
                <button type="button" onClick={() => appendPub({ title: '', details: '', link: '' })} className="text-cyan-600">Add Publication</button>
            </div>
        );
        case 'stats':
            return (
                <div className="space-y-6">
                    {statsFields.map((field, index) => (
                        <div key={field.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg space-y-3 grid grid-cols-3 gap-2">
                            <Input label="Label" name={`stats.${index}.label`} register={register} />
                            <Input label="Value" name={`stats.${index}.value`} register={register} type="number"/>
                            <Input label="Suffix" name={`stats.${index}.suffix`} register={register} />
                            <button type="button" onClick={() => removeStat(index)} className="text-red-500 text-sm col-span-3">Remove Stat</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => appendStat({ label: '', value: 0, suffix: '' })} className="text-cyan-600">Add Stat</button>
                </div>
            );
        case 'showcase':
            return (
                <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Project Showcase</h3>
                    <Input label="Title" name="showcase.title" register={register} />
                    <Textarea label="Description" name="showcase.description" register={register} />
                    <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg space-y-3">
                        <h4 className="font-semibold">Before</h4>
                        <Textarea label="Description" name="showcase.before.description" register={register} />
                        <Input label="Image URLs (comma separated)" name="showcase.before.imageUrls" register={register} />
                    </div>
                    <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg space-y-3">
                        <h4 className="font-semibold">After</h4>
                        <Textarea label="Description" name="showcase.after.description" register={register} />
                        <Input label="Image URLs (comma separated)" name="showcase.after.imageUrls" register={register} />
                    </div>
                </div>
            )
        case 'locations':
            return (
                <div className="space-y-6">
                    {locFields.map((field, index) => (
                        <div key={field.id} className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg space-y-3">
                            <Input label="Name" name={`locations.${index}.name`} register={register} />
                            <Input label="Latitude" name={`locations.${index}.position.0`} register={register} type="number" step="any"/>
                            <Input label="Longitude" name={`locations.${index}.position.1`} register={register} type="number" step="any"/>
                            <Textarea label="Description" name={`locations.${index}.description`} register={register} />
                            <button type="button" onClick={() => removeLoc(index)} className="text-red-500 text-sm">Remove Location</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => appendLoc({ name: '', position: [0,0], description: '' })} className="text-cyan-600">Add Location</button>
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
        className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-4 border-b border-slate-200 dark:border-slate-700 flex-shrink-0">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Admin Dashboard</h2>
          <button onClick={onClose} className="p-1 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700">
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        <div className="flex flex-grow overflow-hidden">
          {/* Sidebar */}
          <aside className="w-1/4 border-r border-slate-200 dark:border-slate-700 overflow-y-auto p-4">
            <nav className="space-y-1">
              {sections.map(section => (
                <button
                  key={section.id}
                  onClick={() => setActiveTab(section.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-left transition-colors ${
                    activeTab === section.id
                      ? 'bg-cyan-100 dark:bg-cyan-900/50 text-cyan-700 dark:text-cyan-300'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                >
                  <i className={`fas ${section.icon} mr-3 w-5 text-center`}></i>
                  {section.name}
                </button>
              ))}
            </nav>
          </aside>

          {/* Main Content */}
          <main className="w-3/4 overflow-y-auto p-6">
            <form id="admin-form" onSubmit={handleSubmit(onSubmit)}>
              {renderContent()}
            </form>
          </main>
        </div>

        <div className="flex justify-between items-center p-4 border-t border-slate-200 dark:border-slate-700 flex-shrink-0">
            <button
                type="button"
                onClick={handleReset}
                className="px-4 py-2 text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
            >
                Reset to Default
            </button>
            <div className="space-x-4">
                <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-sm font-medium rounded-md text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    form="admin-form"
                    className="px-4 py-2 text-sm font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700"
                >
                    Save Changes
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
