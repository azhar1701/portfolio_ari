import React from 'react';
import { Textarea, ImageUploadInput } from './shared';

interface SummaryPanelProps {
  register: any;
  setValue: any;
  watch: any;
}

export const SummaryPanel: React.FC<SummaryPanelProps> = ({ register, setValue, watch }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h3 className="text-lg font-bold text-white tracking-tight mb-1">Professional Summary & Hero</h3>
        <p className="text-xs text-slate-400">Narrative overview and lead banner image</p>
      </div>

      <div className="space-y-4">
        <Textarea
          label="Professional Summary"
          name="summary"
          register={register}
          rows={8}
          required
          help="Main introductory biography outlining your domain expertise, engineering focus, and achievements."
          placeholder="Write your professional summary here..."
        />
        <ImageUploadInput
          label="Summary Hero / Profile Image"
          name="summaryImage"
          register={register}
          setValue={setValue}
          watch={watch}
          help="Featured image displayed alongside the summary section."
        />
      </div>
    </div>
  );
};
