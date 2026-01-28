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
  { id: 'testimonials', name: 'Testimonials', icon: 'fa-quote-left' },
  { id: 'blog', name: 'Blog Posts', icon: 'fa-blog' },
  { id: 'gallery', name: 'Gallery', icon: 'fa-images' },
  { id: 'education', name: 'Education', icon: 'fa-graduation-cap' },
  { id: 'stats', name: 'Stats', icon: 'fa-chart-line' },
  { id: 'showcase', name: 'Showcase', icon: 'fa-star' },
  { id: 'locations', name: 'Locations', icon: 'fa-map-marked-alt' },
  { id: 'publications', name: 'Publications', icon: 'fa-book-open' },
  { id: 'certifications', name: 'Certifications', icon: 'fa-certificate' },
  { id: 'organizations', name: 'Organizations', icon: 'fa-users' },
];

const Input = ({ label, name, register, ...props }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
    <input id={name} {...register(name)} {...props} className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" />
  </div>
);

const Textarea = ({ label, name, register, ...props }) => (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      <textarea id={name} {...register(name)} {...props} className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" />
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

    // Ensure testimonials, blogPosts, and gallery are arrays
    if (!Array.isArray(formValues.testimonials)) formValues.testimonials = [];
    if (!Array.isArray(formValues.blogPosts)) formValues.blogPosts = [];
    if (!Array.isArray(formValues.gallery)) formValues.gallery = [];

    // Ensure locations position arrays are properly handled
    if (Array.isArray(formValues.locations)) {
      formValues.locations.forEach(loc => {
        if (Array.isArray(loc.position) && loc.position.length >= 2) {
          // Keep position as array for form handling
        } else {
          loc.position = [0, 0]; // Default fallback
        }
      });
    }

    reset(formValues);
    
    // Reset field arrays after form reset
    setTimeout(() => {
      if (formValues.experience) {
        formValues.experience.forEach((_, index) => {
          if (index >= expFields.length) {
            appendExp(formValues.experience[index]);
          }
        });
      }
      if (formValues.projects) {
        formValues.projects.forEach((_, index) => {
          if (index >= projFields.length) {
            appendProj(formValues.projects[index]);
          }
        });
      }
      if (formValues.skills) {
        formValues.skills.forEach((_, index) => {
          if (index >= skillFields.length) {
            appendSkill(formValues.skills[index]);
          }
        });
      }
      if (formValues.education) {
        formValues.education.forEach((_, index) => {
          if (index >= eduFields.length) {
            appendEdu(formValues.education[index]);
          }
        });
      }
      if (formValues.publications) {
        formValues.publications.forEach((_, index) => {
          if (index >= pubFields.length) {
            appendPub(formValues.publications[index]);
          }
        });
      }
      if (formValues.stats) {
        formValues.stats.forEach((_, index) => {
          if (index >= statsFields.length) {
            appendStat(formValues.stats[index]);
          }
        });
      }
      if (formValues.locations) {
        formValues.locations.forEach((_, index) => {
          if (index >= locFields.length) {
            appendLoc(formValues.locations[index]);
          }
        });
      }
      if (formValues.testimonials) {
        formValues.testimonials.forEach((_, index) => {
          if (index >= testimonialFields.length) {
            appendTestimonial(formValues.testimonials[index]);
          }
        });
      }
      if (formValues.blogPosts) {
        formValues.blogPosts.forEach((_, index) => {
          if (index >= blogFields.length) {
            appendBlog(formValues.blogPosts[index]);
          }
        });
      }
      if (formValues.gallery) {
        formValues.gallery.forEach((_, index) => {
          if (index >= galleryFields.length) {
            appendGallery(formValues.gallery[index]);
          }
        });
      }
    }, 0);
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
  const { fields: testimonialFields, append: appendTestimonial, remove: removeTestimonial } = useFieldArray({ control, name: "testimonials" });
  const { fields: blogFields, append: appendBlog, remove: removeBlog } = useFieldArray({ control, name: "blogPosts" });
  const { fields: galleryFields, append: appendGallery, remove: removeGallery } = useFieldArray({ control, name: "gallery" });

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
                <div key={field.id} className="p-4 border border-slate-200 rounded-lg space-y-3 bg-slate-50">
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
                        <div key={field.id} className="p-4 border border-slate-200 rounded-lg space-y-3 bg-slate-50">
                            <Input label="Name" name={`projects.${index}.name`} register={register} />
                            <Textarea label="Description" name={`projects.${index}.description`} register={register} rows={3} />
                            <Textarea label="Challenge" name={`projects.${index}.challenge`} register={register} rows={3} />
                            <Textarea label="Solution" name={`projects.${index}.solution`} register={register} rows={3} />
                            <Input label="Technologies (comma separated)" name={`projects.${index}.technologies`} register={register} />
                            <Input label="Images (comma separated URLs)" name={`projects.${index}.images`} register={register} />
                            <Input label="Link (optional)" name={`projects.${index}.link`} register={register} />
                            <button type="button" onClick={() => removeProj(index)} className="text-red-500 text-sm">Remove Project</button>
                        </div>
                ))}
                <button type="button" onClick={() => appendProj({ id: `proj-${Date.now()}`, name: '', description: '', technologies: [], challenge: '', solution: '', images: [], link: ''})} className="text-cyan-600">Add Project</button>
            </div>
        );
      case 'skills':
            return (
                <div className="space-y-6">
                    {skillFields.map((field, index) => (
                        <div key={field.id} className="p-4 border border-slate-200 rounded-lg space-y-3 bg-slate-50">
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
                    <div key={field.id} className="p-4 border border-slate-200 rounded-lg space-y-3 bg-slate-50">
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
                    <div key={field.id} className="p-4 border border-slate-200 rounded-lg space-y-3 bg-slate-50">
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
                        <div key={field.id} className="p-4 border border-slate-200 rounded-lg space-y-3 grid grid-cols-3 gap-2 bg-slate-50">
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
                    <h3 className="font-semibold text-lg text-slate-800">Project Showcase</h3>
                    <Input label="Title" name="showcase.title" register={register} />
                    <Textarea label="Description" name="showcase.description" register={register} />
                    <div className="p-4 border border-slate-200 rounded-lg space-y-3 bg-slate-50">
                        <h4 className="font-semibold text-slate-700">Before</h4>
                        <Textarea label="Description" name="showcase.before.description" register={register} />
                        <Input label="Image URLs (comma separated)" name="showcase.before.imageUrls" register={register} />
                    </div>
                    <div className="p-4 border border-slate-200 rounded-lg space-y-3 bg-slate-50">
                        <h4 className="font-semibold text-slate-700">After</h4>
                        <Textarea label="Description" name="showcase.after.description" register={register} />
                        <Input label="Image URLs (comma separated)" name="showcase.after.imageUrls" register={register} />
                    </div>
                </div>
            )
        case 'locations':
            return (
                <div className="space-y-6">
                    {locFields.map((field, index) => (
                        <div key={field.id} className="p-4 border border-slate-200 rounded-lg space-y-3 bg-slate-50">
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
        case 'testimonials':
            return (
                <div className="space-y-6">
                    {testimonialFields.map((field, index) => (
                        <div key={field.id} className="p-4 border border-slate-200 rounded-lg space-y-3 bg-slate-50">
                            <Input label="Name" name={`testimonials.${index}.name`} register={register} />
                            <Input label="Role" name={`testimonials.${index}.role`} register={register} />
                            <Input label="Company" name={`testimonials.${index}.company`} register={register} />
                            <Textarea label="Content" name={`testimonials.${index}.content`} register={register} rows={4} />
                            <Input label="Avatar URL" name={`testimonials.${index}.avatar`} register={register} />
                            <Input label="Rating (1-5)" name={`testimonials.${index}.rating`} register={register} type="number" min="1" max="5" />
                            <button type="button" onClick={() => removeTestimonial(index)} className="text-red-500 text-sm">Remove Testimonial</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => appendTestimonial({ name: '', role: '', company: '', content: '', avatar: '', rating: 5 })} className="text-cyan-600">Add Testimonial</button>
                </div>
            );
        case 'blog':
            return (
                <div className="space-y-6">
                    {blogFields.map((field, index) => (
                        <div key={field.id} className="p-4 border border-slate-200 rounded-lg space-y-3 bg-slate-50">
                            <Input label="Title" name={`blogPosts.${index}.title`} register={register} />
                            <Textarea label="Excerpt" name={`blogPosts.${index}.excerpt`} register={register} rows={3} />
                            <Textarea label="Content" name={`blogPosts.${index}.content`} register={register} rows={6} />
                            <Input label="Date (YYYY-MM-DD)" name={`blogPosts.${index}.date`} register={register} type="date" />
                            <Input label="Author" name={`blogPosts.${index}.author`} register={register} />
                            <Input label="Category" name={`blogPosts.${index}.category`} register={register} />
                            <Input label="Image URL" name={`blogPosts.${index}.image`} register={register} />
                            <Input label="Read Time (minutes)" name={`blogPosts.${index}.readTime`} register={register} type="number" />
                            <button type="button" onClick={() => removeBlog(index)} className="text-red-500 text-sm">Remove Blog Post</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => appendBlog({ id: `blog-${Date.now()}`, title: '', excerpt: '', content: '', date: new Date().toISOString().split('T')[0], author: '', category: '', image: '', readTime: 5 })} className="text-cyan-600">Add Blog Post</button>
                </div>
            );
        case 'gallery':
            return (
                <div className="space-y-6">
                    {galleryFields.map((field, index) => (
                        <div key={field.id} className="p-4 border border-slate-200 rounded-lg space-y-3 bg-slate-50">
                            <Input label="Title" name={`gallery.${index}.title`} register={register} />
                            <Textarea label="Description" name={`gallery.${index}.description`} register={register} rows={3} />
                            <Input label="Image URL" name={`gallery.${index}.image`} register={register} />
                            <Input label="Category" name={`gallery.${index}.category`} register={register} />
                            <button type="button" onClick={() => removeGallery(index)} className="text-red-500 text-sm">Remove Gallery Item</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => appendGallery({ id: `gallery-${Date.now()}`, title: '', description: '', image: '', category: '' })} className="text-cyan-600">Add Gallery Item</button>
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
        <div className="flex justify-between items-center p-4 border-b border-slate-200 flex-shrink-0">
          <h2 className="text-xl font-bold text-slate-800">Admin Dashboard</h2>
          <button onClick={onClose} className="p-1 rounded-full text-slate-500 hover:bg-slate-100">
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        <div className="flex flex-grow overflow-hidden">
          {/* Sidebar */}
          <aside className="w-1/4 border-r border-slate-200 overflow-y-auto p-4 bg-slate-50">
            <nav className="space-y-1">
              {sections.map(section => (
                <button
                  key={section.id}
                  onClick={() => setActiveTab(section.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-left transition-colors ${
                    activeTab === section.id
                      ? 'bg-cyan-100 text-cyan-700'
                      : 'text-slate-600 hover:bg-slate-100'
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

        <div className="flex justify-between items-center p-4 border-t border-slate-200 flex-shrink-0 bg-slate-50">
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
                    className="px-4 py-2 text-sm font-medium rounded-md text-slate-700 bg-slate-100 hover:bg-slate-200"
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