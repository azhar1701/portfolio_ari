import React from 'react';
import { Input, Textarea, ImageUploadInput, InlineConfirmDelete, AddButton } from './shared';

interface ProjectsPanelProps {
  fields: any[];
  append: (item: any) => void;
  remove: (index: number) => void;
  register: any;
  setValue: any;
  watch: any;
  onOpenAi?: (context: { projectName: string; overview: string; tools: string; index: number }) => void;
}

export const ProjectsPanel: React.FC<ProjectsPanelProps> = ({
  fields,
  append,
  remove,
  register,
  setValue,
  watch,
  onOpenAi,
}) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight mb-1">Projects Portfolio</h3>
          <p className="text-xs text-slate-400">Featured engineering, GIS, and software case studies</p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-slate-800 text-slate-300 rounded-lg border border-slate-700">
          {fields.length} {fields.length === 1 ? 'project' : 'projects'}
        </span>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-4 relative group/item hover:border-slate-700 transition-all"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-sky-500/10 text-sky-400 text-xs font-bold flex items-center justify-center border border-sky-500/20">
                  {index + 1}
                </span>
                <span className="text-xs font-semibold text-slate-300">Project #{index + 1}</span>
              </div>
              <InlineConfirmDelete onConfirm={() => remove(index)} label="Remove Project" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input label="Project Name" name={`projects.${index}.name`} register={register} required placeholder="Citarum Flood Mitigation Mapping" />
              <Input label="External Link (Optional)" name={`projects.${index}.link`} register={register} placeholder="https://..." />
            </div>

            <Textarea
              label="Short Overview / Description"
              name={`projects.${index}.description`}
              register={register}
              rows={2}
              required
              extraAction={
                onOpenAi && (
                  <button
                    type="button"
                    onClick={() =>
                      onOpenAi({
                        projectName: watch(`projects.${index}.name`) || '',
                        overview: watch(`projects.${index}.description`) || '',
                        tools: watch(`projects.${index}.technologies`) || '',
                        index,
                      })
                    }
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-300 hover:text-amber-200 bg-amber-950/60 hover:bg-amber-900/70 border border-amber-500/40 px-2 py-0.5 rounded-lg transition-colors"
                    title="Generate Challenge & Solution with AI"
                  >
                    <i className="fas fa-wand-magic-sparkles text-[9px] text-amber-400"></i>
                    <span>Generate Case Study</span>
                  </button>
                )
              }
              placeholder="High-resolution digital elevation modeling and flood risk analysis..."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Textarea
                label="Engineering Challenge"
                name={`projects.${index}.challenge`}
                register={register}
                rows={3}
                placeholder="Describe the initial hurdle or technical bottleneck..."
              />
              <Textarea
                label="Technical Solution"
                name={`projects.${index}.solution`}
                register={register}
                rows={3}
                placeholder="Detail the GIS methodology, algorithm, or engineering approach used..."
              />
            </div>

            <Input
              label="Technologies / Tools (comma separated)"
              name={`projects.${index}.technologies`}
              register={register}
              placeholder="QGIS, Python, HEC-RAS, PostgreSQL, Leaflet"
              help="Separate each tool or skill with a comma."
            />

            <ImageUploadInput
              label="Project Images (comma separated URLs)"
              name={`projects.${index}.images`}
              register={register}
              setValue={setValue}
              watch={watch}
              isMultiple={true}
              help="Upload or paste multiple image URLs separated by commas."
            />
          </div>
        ))}

        <AddButton
          onClick={() =>
            append({
              id: `proj-${Date.now()}`,
              name: '',
              description: '',
              technologies: '',
              challenge: '',
              solution: '',
              images: '',
              link: '',
            })
          }
          label="Add New Project"
          icon="fa-diagram-project"
        />
      </div>
    </div>
  );
};
