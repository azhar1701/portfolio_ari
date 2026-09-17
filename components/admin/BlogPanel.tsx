import React from 'react';
import { Input, Textarea, ImageUploadInput, InlineConfirmDelete, AddButton } from './shared';

interface BlogPanelProps {
  fields: any[];
  append: (item: any) => void;
  remove: (index: number) => void;
  register: any;
  setValue: any;
  watch: any;
}

export const BlogPanel: React.FC<BlogPanelProps> = ({
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
          <h3 className="text-lg font-bold text-white tracking-tight mb-1">Articles & Technical Insights</h3>
          <p className="text-xs text-slate-400">Publications, case studies, and engineering blog posts</p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 bg-slate-800 text-slate-300 rounded-lg border border-slate-700">
          {fields.length} {fields.length === 1 ? 'article' : 'articles'}
        </span>
      </div>

      <div className="space-y-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="p-5 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-4 relative group/item hover:border-slate-700 transition-all"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
              <span className="text-xs font-semibold text-slate-300">Article #{index + 1}</span>
              <InlineConfirmDelete onConfirm={() => remove(index)} label="Remove Article" />
            </div>

            <Input label="Article Title" name={`blogPosts.${index}.title`} register={register} required placeholder="Implementing Drone LiDAR in Riparian Corridor Mapping" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Input label="Publish Date" name={`blogPosts.${index}.date`} register={register} type="date" required />
              <Input label="Author" name={`blogPosts.${index}.author`} register={register} required placeholder="Ari Azhari" />
              <Input label="Category" name={`blogPosts.${index}.category`} register={register} required placeholder="Hydrology, Remote Sensing" />
            </div>

            <Textarea
              label="Short Excerpt (Summary for Cards)"
              name={`blogPosts.${index}.excerpt`}
              register={register}
              rows={2}
              required
              placeholder="A step-by-step breakdown of processing point clouds to extract terrain models..."
            />

            <Textarea
              label="Article Full Content"
              name={`blogPosts.${index}.content`}
              register={register}
              rows={6}
              required
              placeholder="Full text or markdown content..."
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="md:col-span-2">
                <ImageUploadInput
                  label="Cover Image URL"
                  name={`blogPosts.${index}.image`}
                  register={register}
                  setValue={setValue}
                  watch={watch}
                  help="Header/banner image for the article."
                />
              </div>
              <Input
                label="Read Time (minutes)"
                name={`blogPosts.${index}.readTime`}
                register={register}
                type="number"
                min="1"
                required
                placeholder="5"
              />
            </div>
          </div>
        ))}

        <AddButton
          onClick={() =>
            append({
              id: `blog-${Date.now()}`,
              title: '',
              excerpt: '',
              content: '',
              date: new Date().toISOString().split('T')[0],
              author: '',
              category: '',
              image: '',
              readTime: 5,
            })
          }
          label="Add New Article"
          icon="fa-pen-to-square"
        />
      </div>
    </div>
  );
};
