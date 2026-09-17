import React from 'react';
import { Input } from './shared';

interface ProfilePanelProps {
  register: any;
}

export const ProfilePanel: React.FC<ProfilePanelProps> = ({ register }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h3 className="text-lg font-bold text-white tracking-tight mb-1">Personal & Contact Profile</h3>
        <p className="text-xs text-slate-400">Manage basic bio, identity and contact channels</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Full Name" name="profile.name" register={register} required placeholder="Ari Azhari" />
        <Input label="Professional Title" name="profile.title" register={register} required placeholder="GIS Specialist & Water Engineer" />
        <Input label="Current Location" name="profile.location" register={register} placeholder="Bandung, Indonesia" />
        <Input label="Phone / WhatsApp" name="profile.phone" register={register} placeholder="+62 8..." />
        <div className="md:col-span-2">
          <Input label="Primary Contact Email" name="profile.email" register={register} required type="email" placeholder="ari@example.com" />
        </div>
      </div>

      <div className="pt-6 border-t border-slate-800 space-y-4">
        <div>
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Social & Professional Links</h4>
          <p className="text-[11px] text-slate-500">Links shown in header, footer, and contact sections</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input label="LinkedIn URL" name="profile.socials.linkedin" register={register} placeholder="https://linkedin.com/in/..." />
          <Input label="GitHub URL" name="profile.socials.github" register={register} placeholder="https://github.com/..." />
          <Input label="YouTube Channel" name="profile.socials.youtube" register={register} placeholder="https://youtube.com/@..." />
          <Input label="Instagram URL" name="profile.socials.instagram" register={register} placeholder="https://instagram.com/..." />
        </div>
      </div>
    </div>
  );
};
