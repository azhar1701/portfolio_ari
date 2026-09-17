import React from 'react';
import { Input, InlineConfirmDelete, AddButton } from './shared';

interface EducationPanelProps {
  fields: any[];
  append: (item: any) => void;
  remove: (index: number) => void;
  register: any;
}

export const EducationPanel: React.FC<EducationPanelProps> = ({ fields, append, remove, register }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight mb-1">Education Background</h3>
          <p className="text-xs text-slate-400">Degrees, academic institutions, and credentials</p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-slate-800 text-slate-300 rounded-lg border border-slate-700">
          {fields.length} {fields.length === 1 ? 'entry' : 'entries'}
        </span>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-3 relative group/item hover:border-slate-700 transition-all"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
              <span className="text-xs font-semibold text-slate-300">Degree #{index + 1}</span>
              <InlineConfirmDelete onConfirm={() => remove(index)} label="Remove Degree" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input
                label="Institution / University"
                name={`education.${index}.institution`}
                register={register}
                required
                placeholder="Institut Teknologi Bandung (ITB)"
              />
              <Input
                label="Degree & Major"
                name={`education.${index}.degree`}
                register={register}
                required
                placeholder="B.Sc. in Water Resources Engineering"
              />
              <Input
                label="Study Period"
                name={`education.${index}.period`}
                register={register}
                required
                placeholder="2018 - 2022"
              />
              <Input
                label="GPA / Honors (Optional)"
                name={`education.${index}.gpa`}
                register={register}
                placeholder="3.85 / 4.00 (Cum Laude)"
              />
            </div>
          </div>
        ))}

        <AddButton
          onClick={() => append({ institution: '', degree: '', period: '', gpa: '' })}
          label="Add Academic Degree"
          icon="fa-user-graduate"
        />
      </div>
    </div>
  );
};
