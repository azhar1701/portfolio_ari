import React from 'react';
import { Input, Textarea, ImageUploadInput, InlineConfirmDelete, AddButton } from './shared';

interface TestimonialsPanelProps {
  fields: any[];
  append: (item: any) => void;
  remove: (index: number) => void;
  register: any;
  setValue: any;
  watch: any;
}

export const TestimonialsPanel: React.FC<TestimonialsPanelProps> = ({
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
          <h3 className="text-lg font-bold text-white tracking-tight mb-1">Testimonials & Recommendations</h3>
          <p className="text-xs text-slate-400">Endorsements from stakeholders, project leads, or clients</p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-slate-800 text-slate-300 rounded-lg border border-slate-700">
          {fields.length} {fields.length === 1 ? 'testimonial' : 'testimonials'}
        </span>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-4 relative group/item hover:border-slate-700 transition-all"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
              <span className="text-xs font-semibold text-slate-300">Testimonial #{index + 1}</span>
              <InlineConfirmDelete onConfirm={() => remove(index)} label="Remove Testimonial" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Input label="Name" name={`testimonials.${index}.name`} register={register} required placeholder="Dr. Budi Santoso" />
              <Input label="Role / Title" name={`testimonials.${index}.role`} register={register} required placeholder="Principal Hydrologist" />
              <Input label="Company / Organization" name={`testimonials.${index}.company`} register={register} placeholder="BBWS Citarum" />
            </div>

            <Textarea
              label="Endorsement Content"
              name={`testimonials.${index}.content`}
              register={register}
              rows={3}
              required
              placeholder="Ari demonstrated exceptional precision in hydrodynamic modeling and delivered GIS layers ahead of schedule..."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="md:col-span-2">
                <ImageUploadInput
                  label="Avatar Photo URL"
                  name={`testimonials.${index}.avatar`}
                  register={register}
                  setValue={setValue}
                  watch={watch}
                  help="Profile photo URL or file upload."
                />
              </div>
              <Input
                label="Rating (1 - 5)"
                name={`testimonials.${index}.rating`}
                register={register}
                type="number"
                min="1"
                max="5"
                required
                placeholder="5"
              />
            </div>
          </div>
        ))}

        <AddButton
          onClick={() =>
            append({
              name: '',
              role: '',
              company: '',
              content: '',
              avatar: '',
              rating: 5,
            })
          }
          label="Add Testimonial"
          icon="fa-quote-left"
        />
      </div>
    </div>
  );
};
