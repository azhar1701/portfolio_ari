import React from 'react';
import { Input, Textarea, InlineConfirmDelete, AddButton } from './shared';

interface MiscPanelProps {
  pubFields: any[];
  appendPub: (item: any) => void;
  removePub: (index: number) => void;
  register: any;
}

export const MiscPanel: React.FC<MiscPanelProps> = ({
  pubFields,
  appendPub,
  removePub,
  register,
}) => {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Publications Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight">Academic & Technical Publications</h3>
            <p className="text-xs text-slate-400">Papers, symposium proceedings, technical reports, and whitepapers</p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-slate-800 text-slate-300 rounded-lg border border-slate-700">
            {pubFields.length} {pubFields.length === 1 ? 'paper' : 'papers'}
          </span>
        </div>

        <div className="space-y-4">
          {pubFields.map((field, index) => (
            <div
              key={field.id}
              className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-3 relative group/item hover:border-slate-700 transition-all"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                <span className="text-xs font-semibold text-slate-300">Publication #{index + 1}</span>
                <InlineConfirmDelete onConfirm={() => removePub(index)} label="Remove Paper" />
              </div>

              <Input
                label="Publication Title"
                name={`publications.${index}.title`}
                register={register}
                required
                placeholder="Hydrodynamic simulation of upper Citarum tributary backwater"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  label="Conference / Journal Details"
                  name={`publications.${index}.details`}
                  register={register}
                  required
                  placeholder="Journal of Water Resources, Vol. 14, 2023"
                />
                <Input
                  label="Direct Link / DOI URL"
                  name={`publications.${index}.link`}
                  register={register}
                  placeholder="https://doi.org/..."
                />
              </div>
            </div>
          ))}

          <AddButton
            onClick={() => appendPub({ title: '', details: '', link: '' })}
            label="Add Publication"
            icon="fa-file-lines"
          />
        </div>
      </div>

      {/* Certifications Section */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight">Certifications & Licenses</h3>
          <p className="text-xs text-slate-400">Professional credentials, GIS licenses, and specialized training</p>
        </div>
        <Textarea
          label="Certifications (one per line)"
          name="certifications"
          register={register}
          rows={6}
          placeholder="Esri Certified GIS Professional (EGP)&#10;Certified Hydrological Modeler (HMR)&#10;FAA Remote Pilot Drone License"
          help="Enter each certification or license on a new line."
        />
      </div>

      {/* Organizations Section */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight">Professional Organizations & Affiliations</h3>
          <p className="text-xs text-slate-400">Membership in industry bodies, associations, or research groups</p>
        </div>
        <Textarea
          label="Organizations (one per line)"
          name="organizations"
          register={register}
          rows={4}
          placeholder="HATHI (Himpunan Ahli Teknik Hidraulik Indonesia)&#10;Indonesian Geospatial Society (ISI)&#10;International Association for Hydro-Environment Engineering (IAHR)"
          help="Enter each professional organization on a new line."
        />
      </div>
    </div>
  );
};
