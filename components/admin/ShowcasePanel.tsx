import React from 'react';
import { Input, Textarea, ImageUploadInput } from './shared';

interface ShowcasePanelProps {
  register: any;
  setValue: any;
  watch: any;
}

export const ShowcasePanel: React.FC<ShowcasePanelProps> = ({ register, setValue, watch }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h3 className="text-lg font-bold text-white tracking-tight mb-1">Interactive Showcase (Before / After)</h3>
        <p className="text-xs text-slate-400">Interactive comparison slider demonstrating transformation or project results</p>
      </div>

      <div className="space-y-4">
        <Input label="Showcase Section Title" name="showcase.title" register={register} placeholder="Interactive Before & After Analysis" />
        <Textarea label="Showcase Description" name="showcase.description" register={register} rows={2} placeholder="Drag the comparison slider to view satellite telemetry versus flood extent modeling..." />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
          {/* Before Column */}
          <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">Before State</h4>
            </div>
            <Textarea
              label="Before Description"
              name="showcase.before.description"
              register={register}
              rows={3}
              placeholder="Raw imagery or pre-intervention topographical conditions..."
            />
            <ImageUploadInput
              label="Before Image URLs (comma separated)"
              name="showcase.before.imageUrls"
              register={register}
              setValue={setValue}
              watch={watch}
              isMultiple={true}
              help="Enter or upload image URLs for the 'Before' state."
            />
          </div>

          {/* After Column */}
          <div className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-800">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <h4 className="text-sm font-bold text-white uppercase tracking-wider">After State</h4>
            </div>
            <Textarea
              label="After Description"
              name="showcase.after.description"
              register={register}
              rows={3}
              placeholder="Calibrated hydraulic flow model or post-construction state..."
            />
            <ImageUploadInput
              label="After Image URLs (comma separated)"
              name="showcase.after.imageUrls"
              register={register}
              setValue={setValue}
              watch={watch}
              isMultiple={true}
              help="Enter or upload image URLs for the 'After' state."
            />
          </div>
        </div>
      </div>
    </div>
  );
};
