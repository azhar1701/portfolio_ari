import React from 'react';
import { Input, Textarea, ImageUploadInput, InlineConfirmDelete, AddButton } from './shared';

interface GalleryPanelProps {
  fields: any[];
  append: (item: any) => void;
  remove: (index: number) => void;
  register: any;
  setValue: any;
  watch: any;
}

export const GalleryPanel: React.FC<GalleryPanelProps> = ({
  fields,
  append,
  remove,
  register,
  setValue,
  watch,
}) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight mb-1">Visual Gallery & Field Photos</h3>
          <p className="text-xs text-slate-400">Drone orthomosaics, field surveys, charts, and technical imagery</p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-slate-800 text-slate-300 rounded-lg border border-slate-700">
          {fields.length} {fields.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-3 relative group/item hover:border-slate-700 transition-all"
          >
            <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
              <span className="text-xs font-semibold text-slate-300">Gallery Item #{index + 1}</span>
              <InlineConfirmDelete onConfirm={() => remove(index)} label="Remove Item" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input label="Title / Caption" name={`gallery.${index}.title`} register={register} required placeholder="Citarum River Weir Survey" />
              <Input label="Category Filter" name={`gallery.${index}.category`} register={register} required placeholder="Fieldwork, Drones, GIS" />
            </div>

            <Textarea
              label="Description"
              name={`gallery.${index}.description`}
              register={register}
              rows={2}
              placeholder="High-resolution multispectral scan taken during dry season campaign..."
            />

            <ImageUploadInput
              label="Image URL or File Upload"
              name={`gallery.${index}.image`}
              register={register}
              setValue={setValue}
              watch={watch}
              required
              help="Direct image file or CDN URL."
            />
          </div>
        ))}

        <AddButton
          onClick={() =>
            append({
              id: `gallery-${Date.now()}`,
              title: '',
              description: '',
              image: '',
              category: 'Fieldwork',
            })
          }
          label="Add Gallery Photo"
          icon="fa-images"
        />
      </div>
    </div>
  );
};
