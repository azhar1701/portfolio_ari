import React, { useState } from 'react';
import { SupabaseService } from '../../services/supabaseService';
import { useToast } from '../../contexts/ToastContext';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  register: any;
  help?: string;
  required?: boolean;
}

export const Input: React.FC<InputProps> = ({ label, name, register, help, required, className = '', ...props }) => (
  <div className="group/input relative space-y-1.5">
    <div className="flex items-center justify-between">
      <label htmlFor={name} className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
        {label} {required && <span className="text-rose-400">*</span>}
      </label>
      {help && (
        <div className="relative group/help">
          <i className="fas fa-circle-question text-slate-500 hover:text-sky-400 cursor-help transition-colors text-xs"></i>
          <div className="absolute bottom-full right-0 mb-2 w-52 p-2 bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg shadow-2xl opacity-0 group-hover/help:opacity-100 transition-opacity pointer-events-none z-30 leading-relaxed font-normal">
            {help}
          </div>
        </div>
      )}
    </div>
    <input
      id={name}
      {...register(name)}
      {...props}
      className={`block w-full px-3.5 py-2.5 bg-slate-900/80 border border-slate-700/80 rounded-xl text-sm font-medium text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all ${className}`}
    />
  </div>
);

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
  register: any;
  help?: string;
  required?: boolean;
  extraAction?: React.ReactNode;
}

export const Textarea: React.FC<TextareaProps> = ({ label, name, register, help, required, extraAction, className = '', ...props }) => (
  <div className="group/input relative space-y-1.5">
    <div className="flex items-center justify-between gap-2">
      <label htmlFor={name} className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
        {label} {required && <span className="text-rose-400">*</span>}
      </label>
      <div className="flex items-center gap-2">
        {extraAction}
        {help && (
          <div className="relative group/help">
            <i className="fas fa-circle-question text-slate-500 hover:text-sky-400 cursor-help transition-colors text-xs"></i>
            <div className="absolute bottom-full right-0 mb-2 w-52 p-2 bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg shadow-2xl opacity-0 group-hover/help:opacity-100 transition-opacity pointer-events-none z-30 leading-relaxed font-normal">
              {help}
            </div>
          </div>
        )}
      </div>
    </div>
    <textarea
      id={name}
      {...register(name)}
      {...props}
      className={`block w-full px-3.5 py-2.5 bg-slate-900/80 border border-slate-700/80 rounded-xl text-sm font-medium text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all resize-y ${className}`}
    />
  </div>
);

export interface ImageUploadInputProps {
  label: string;
  name: string;
  register: any;
  setValue: any;
  watch: any;
  help?: string;
  required?: boolean;
  isMultiple?: boolean;
  [key: string]: any;
}

export const ImageUploadInput: React.FC<ImageUploadInputProps> = ({
  label,
  name,
  register,
  setValue,
  watch,
  help,
  required,
  isMultiple = false,
  ...props
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const { toast } = useToast();
  const currentValue = watch(name);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;

      if (import.meta.env.VITE_USE_SUPABASE !== 'true') {
        toast.warning('Supabase storage not enabled. Please paste image URL directly.');
        return;
      }

      setIsUploading(true);
      setUploadError('');

      const publicUrl = await SupabaseService.uploadImage(file);

      if (isMultiple) {
        const current = watch(name) || '';
        const newVal = current ? `${current}, ${publicUrl}` : publicUrl;
        setValue(name, newVal, { shouldDirty: true, shouldValidate: true });
      } else {
        setValue(name, publicUrl, { shouldDirty: true, shouldValidate: true });
      }
      toast.success('Image uploaded successfully!');
    } catch (err: any) {
      console.error('Upload error:', err);
      const errMsg = err?.message || 'Failed to upload image.';
      setUploadError(errMsg);
      toast.error(errMsg);
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  return (
    <div className="group/input relative space-y-1.5">
      <div className="flex items-center justify-between">
        <label htmlFor={name} className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
          {label} {required && <span className="text-rose-400">*</span>}
        </label>
        {help && (
          <div className="relative group/help">
            <i className="fas fa-circle-question text-slate-500 hover:text-sky-400 cursor-help transition-colors text-xs"></i>
            <div className="absolute bottom-full right-0 mb-2 w-52 p-2 bg-slate-900 border border-slate-700 text-slate-200 text-xs rounded-lg shadow-2xl opacity-0 group-hover/help:opacity-100 transition-opacity pointer-events-none z-30 leading-relaxed font-normal">
              {help}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <input
          id={name}
          {...register(name)}
          {...props}
          placeholder="https://... or upload file"
          className="flex-1 block w-full px-3.5 py-2.5 bg-slate-900/80 border border-slate-700/80 rounded-xl text-sm font-medium text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500/30 focus:border-sky-500 transition-all"
        />

        <div className="relative flex-shrink-0">
          <input
            type="file"
            accept="image/*"
            onChange={handleUpload}
            title="Upload image"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
            disabled={isUploading}
          />
          <button
            type="button"
            disabled={isUploading}
            className="w-full sm:w-auto px-4 py-2.5 bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-sky-400 rounded-xl font-semibold text-xs tracking-wider transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isUploading ? (
              <>
                <i className="fas fa-spinner fa-spin text-xs"></i> Uploading...
              </>
            ) : (
              <>
                <i className="fas fa-cloud-arrow-up text-xs"></i> Upload File
              </>
            )}
          </button>
        </div>
      </div>

      {uploadError && (
        <p className="text-rose-400 text-xs font-medium flex items-center gap-1 mt-1">
          <i className="fas fa-circle-exclamation text-xs"></i> {uploadError}
        </p>
      )}

      {!isMultiple && currentValue && (currentValue.startsWith('http') || currentValue.startsWith('/')) && (
        <div className="h-20 w-28 rounded-lg border border-slate-700 overflow-hidden bg-slate-950/60 mt-2 relative group-preview shadow-md">
          <img src={currentValue} alt="Preview" className="w-full h-full object-cover" />
        </div>
      )}
    </div>
  );
};

export const InlineConfirmDelete: React.FC<{
  onConfirm: () => void;
  label?: string;
}> = ({ onConfirm, label = 'Remove' }) => {
  const [isConfirming, setIsConfirming] = useState(false);

  if (isConfirming) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-rose-300 font-medium">Confirm delete?</span>
        <button
          type="button"
          onClick={() => {
            setIsConfirming(false);
            onConfirm();
          }}
          className="px-2.5 py-1 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 rounded-lg transition-colors"
        >
          Yes, Delete
        </button>
        <button
          type="button"
          onClick={() => setIsConfirming(false)}
          className="px-2 py-1 text-xs font-medium text-slate-400 hover:text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setIsConfirming(true)}
      className="text-rose-400/80 hover:text-rose-300 text-xs font-semibold hover:bg-rose-500/10 px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1.5"
    >
      <i className="fas fa-trash-can text-xs"></i>
      {label}
    </button>
  );
};

export const AddButton: React.FC<{
  onClick: () => void;
  label: string;
  icon?: string;
}> = ({ onClick, label, icon = 'fa-plus' }) => (
  <button
    type="button"
    onClick={onClick}
    className="w-full py-3 px-4 border border-dashed border-sky-500/30 hover:border-sky-500/60 bg-sky-500/5 hover:bg-sky-500/10 rounded-xl text-sky-400 hover:text-sky-300 text-sm font-semibold transition-all flex items-center justify-center gap-2 active:scale-[0.99]"
  >
    <i className={`fas ${icon} text-xs`}></i>
    {label}
  </button>
);
