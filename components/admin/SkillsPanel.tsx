import React from 'react';
import { Input, InlineConfirmDelete, AddButton } from './shared';

interface SkillsPanelProps {
  fields: any[];
  append: (item: any) => void;
  remove: (index: number) => void;
  register: any;
}

export const SkillsPanel: React.FC<SkillsPanelProps> = ({ fields, append, remove, register }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight mb-1">Technical Skills & Stacks</h3>
          <p className="text-xs text-slate-400">Organize skills by domain categories (GIS, Engineering, Code, etc.)</p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-slate-800 text-slate-300 rounded-lg border border-slate-700">
          {fields.length} {fields.length === 1 ? 'category' : 'categories'}
        </span>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-3 relative group/item hover:border-slate-700 transition-all"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
              <span className="text-xs font-semibold text-slate-300">Category #{index + 1}</span>
              <InlineConfirmDelete onConfirm={() => remove(index)} label="Remove Category" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Input
                label="Category Name"
                name={`skills.${index}.category`}
                register={register}
                required
                placeholder="e.g. Geospatial & Remote Sensing"
              />
              <div className="md:col-span-2">
                <Input
                  label="Skills (comma separated)"
                  name={`skills.${index}.skills`}
                  register={register}
                  required
                  placeholder="ArcGIS Pro, QGIS, Google Earth Engine, PostGIS, GDAL"
                  help="Comma-separated list of individual tools, technologies, or concepts."
                />
              </div>
            </div>
          </div>
        ))}

        <AddButton
          onClick={() => append({ category: '', skills: '' })}
          label="Add Skill Category"
          icon="fa-gears"
        />
      </div>
    </div>
  );
};
