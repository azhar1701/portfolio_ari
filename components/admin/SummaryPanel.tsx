import React from 'react';
import { Textarea, ImageUploadInput } from './shared';

interface SummaryPanelProps {
  register: any;
  setValue: any;
  watch: any;
  onOpenAi?: (content: string, type: 'summary') => void;
}

export const SummaryPanel: React.FC<SummaryPanelProps> = ({ register, setValue, watch, onOpenAi }) => {
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
          extraAction={
            onOpenAi && (
              <button
                type="button"
                onClick={() => onOpenAi(watch('summary') || '', 'summary')}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-300 hover:text-amber-200 bg-amber-950/60 hover:bg-amber-900/70 border border-amber-500/40 px-2 py-0.5 rounded-lg transition-colors"
                title="Polish summary narrative with AI"
              >
                <i className="fas fa-wand-magic-sparkles text-[9px] text-amber-400"></i>
                <span>AI Polish</span>
              </button>
            )
          }
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
