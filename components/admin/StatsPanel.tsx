import React from 'react';
import { Input, InlineConfirmDelete, AddButton } from './shared';

interface StatsPanelProps {
  fields: any[];
  append: (item: any) => void;
  remove: (index: number) => void;
  register: any;
}

export const StatsPanel: React.FC<StatsPanelProps> = ({ fields, append, remove, register }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight mb-1">Key Impact Metrics & Statistics</h3>
          <p className="text-xs text-slate-400">Counters showcasing quantifiable impact, projects delivered, or watershed scale</p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-slate-800 text-slate-300 rounded-lg border border-slate-700">
          {fields.length} {fields.length === 1 ? 'metric' : 'metrics'}
        </span>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-3 relative group/item hover:border-slate-700 transition-all"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
              <span className="text-xs font-semibold text-slate-300">Metric #{index + 1}</span>
              <InlineConfirmDelete onConfirm={() => remove(index)} label="Remove Metric" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Input
                label="Metric Label"
                name={`stats.${index}.label`}
                register={register}
                required
                placeholder="e.g. Basin Area Mapped"
              />
              <Input
                label="Numeric Value"
                name={`stats.${index}.value`}
                register={register}
                type="number"
                required
                placeholder="4500"
                help="Raw numeric value without commas or symbols (used for counting animations)."
              />
              <Input
                label="Suffix / Unit"
                name={`stats.${index}.suffix`}
                register={register}
                placeholder="km², +, %, Years"
                help="Character displayed immediately after the number."
              />
            </div>
          </div>
        ))}

        <AddButton
          onClick={() => append({ label: '', value: 0, suffix: '' })}
          label="Add Impact Metric"
          icon="fa-chart-line"
        />
      </div>
    </div>
  );
};
