import React from 'react';
import { Input, Textarea, InlineConfirmDelete, AddButton } from './shared';

interface LocationsPanelProps {
  fields: any[];
  append: (item: any) => void;
  remove: (index: number) => void;
  register: any;
}

export const LocationsPanel: React.FC<LocationsPanelProps> = ({ fields, append, remove, register }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight mb-1">GIS Interactive Map Hub Locations</h3>
          <p className="text-xs text-slate-400">Geographic coordinates and project markers displayed on Leaflet / OSM map</p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-slate-800 text-slate-300 rounded-lg border border-slate-700">
          {fields.length} {fields.length === 1 ? 'location' : 'locations'}
        </span>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-3 relative group/item hover:border-slate-700 transition-all"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
              <span className="text-xs font-semibold text-slate-300">Marker #{index + 1}</span>
              <InlineConfirmDelete onConfirm={() => remove(index)} label="Remove Marker" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Input
                label="Location / Project Name"
                name={`locations.${index}.name`}
                register={register}
                required
                placeholder="e.g. Citarum River Basin"
              />
              <Input
                label="Latitude"
                name={`locations.${index}.position.0`}
                register={register}
                type="number"
                step="any"
                required
                placeholder="-6.9175"
                help="WGS84 decimal degrees (e.g. -6.9175 for Bandung)"
              />
              <Input
                label="Longitude"
                name={`locations.${index}.position.1`}
                register={register}
                type="number"
                step="any"
                required
                placeholder="107.6191"
                help="WGS84 decimal degrees (e.g. 107.6191 for Bandung)"
              />
            </div>

            <Textarea
              label="Location Description / Project Summary"
              name={`locations.${index}.description`}
              register={register}
              rows={2}
              placeholder="Scope of hydraulic survey, hydrological station, or study site details..."
            />
          </div>
        ))}

        <AddButton
          onClick={() => append({ name: '', position: [0, 0], description: '' })}
          label="Add GIS Map Location"
          icon="fa-location-dot"
        />
      </div>
    </div>
  );
};
