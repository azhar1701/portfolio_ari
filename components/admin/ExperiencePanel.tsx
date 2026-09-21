import React from 'react';
import { Input, Textarea, InlineConfirmDelete, AddButton } from './shared';

interface ExperiencePanelProps {
  fields: any[];
  append: (item: any) => void;
  remove: (index: number) => void;
  register: any;
  watch?: any;
  onOpenAi?: (content: string, type: 'responsibilities' | 'achievements', fieldName: string) => void;
}

export const ExperiencePanel: React.FC<ExperiencePanelProps> = ({
  fields,
  append,
  remove,
  register,
  watch,
  onOpenAi,
}) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight mb-1">Work Experience</h3>
          <p className="text-xs text-slate-400">Career timeline, roles, responsibilities, and key achievements</p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-slate-800 text-slate-300 rounded-lg border border-slate-700">
          {fields.length} {fields.length === 1 ? 'position' : 'positions'}
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
                <span className="text-xs font-semibold text-slate-300">Position #{index + 1}</span>
              </div>
              <InlineConfirmDelete onConfirm={() => remove(index)} label="Remove Role" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Input label="Role / Title" name={`experience.${index}.role`} register={register} required placeholder="e.g. Lead GIS Engineer" />
              <Input label="Company / Institution" name={`experience.${index}.company`} register={register} required placeholder="e.g. Balai Wilayah Sungai" />
              <Input label="Employment Period" name={`experience.${index}.period`} register={register} required placeholder="e.g. 2021 - Present" />
            </div>

            <Textarea
              label="Key Responsibilities (one per line)"
              name={`experience.${index}.responsibilities`}
              register={register}
              rows={3}
              placeholder="Designed hydrodynamic modeling system&#10;Supervised drone photogrammetry team"
              extraAction={
                onOpenAi && watch && (
                  <button
                    type="button"
                    onClick={() =>
                      onOpenAi(
                        watch(`experience.${index}.responsibilities`) || '',
                        'responsibilities',
                        `experience.${index}.responsibilities`
                      )
                    }
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-300 hover:text-amber-200 bg-amber-950/60 hover:bg-amber-900/70 border border-amber-500/40 px-2 py-0.5 rounded-lg transition-colors"
                    title="Polish responsibilities with AI"
                  >
                    <i className="fas fa-wand-magic-sparkles text-[9px] text-amber-400"></i>
                    <span>AI Polish</span>
                  </button>
                )
              }
              help="Each line will be rendered as a discrete bullet point in the experience timeline."
            />

            <Textarea
              label="Key Achievements (one per line)"
              name={`experience.${index}.achievements`}
              register={register}
              rows={3}
              placeholder="Reduced modeling error margins by 34%&#10;Published 2 technical hydrological assessments"
              extraAction={
                onOpenAi && watch && (
                  <button
                    type="button"
                    onClick={() =>
                      onOpenAi(
                        watch(`experience.${index}.achievements`) || '',
                        'achievements',
                        `experience.${index}.achievements`
                      )
                    }
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-300 hover:text-amber-200 bg-amber-950/60 hover:bg-amber-900/70 border border-amber-500/40 px-2 py-0.5 rounded-lg transition-colors"
                    title="Enhance achievements with XYZ formula"
                  >
                    <i className="fas fa-wand-magic-sparkles text-[9px] text-amber-400"></i>
                    <span>XYZ Polish</span>
                  </button>
                )
              }
              help="Each line will be highlighted as a quantifiable milestone."
            />
          </div>
        ))}

        <AddButton
          onClick={() => append({ role: '', company: '', period: '', responsibilities: '', achievements: '' })}
          label="Add Work Experience"
          icon="fa-briefcase"
        />
      </div>
    </div>
  );
};
