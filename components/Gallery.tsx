import React, { useState } from 'react';
import Section from './Section';
import type { GalleryImage } from '../types';
import SkeletonLoader from './SkeletonLoader';

interface GalleryProps {
  gallery: GalleryImage[] | null;
}

const GallerySkeleton: React.FC = () => (
  <div className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6">
    {[...Array(8)].map((_, i) => (
      <SkeletonLoader key={i} className="aspect-square rounded-lg" />
    ))}
  </div>
);

const ImageModal: React.FC<{ image: GalleryImage; onClose: () => void }> = ({ image, onClose }) => (
  <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
    <div className="relative max-w-4xl max-h-[90vh]" onClick={e => e.stopPropagation()}>
      <button onClick={onClose} className="absolute -top-10 right-0 text-white hover:text-gray-300">
        <i className="fas fa-times text-2xl"></i>
      </button>
      <img src={image.image || image.url} alt={image.title} className="max-w-full max-h-full object-contain rounded-lg" />
      <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4 rounded-b-lg">
        <h3 className="font-semibold">{image.title}</h3>
        <p className="text-sm text-gray-300">{image.description}</p>
      </div>
    </div>
  </div>
);

const Gallery: React.FC<GalleryProps> = ({ gallery }) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [filter, setFilter] = useState<string>('All');

  const categories = gallery ? ['All', ...new Set(gallery.map(img => img.category))] : [];
  const filteredImages = gallery?.filter(img => filter === 'All' || img.category === filter) || [];

  return (
    <>
      <Section id="gallery" title="Project Gallery" iconClass="fas fa-images">
        {gallery ? (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-2 rounded-lg text-xs font-extrabold uppercase tracking-widest transition-all ${filter === category
                      ? 'bg-brand-accent-soft text-brand-accent-text border border-brand-accent/20'
                      : 'bg-bg-app text-text-secondary hover:bg-border-subtle/50 border border-transparent'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  className="relative group cursor-pointer overflow-hidden rounded-lg aspect-square"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image.image || image.url}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                    <i className="fas fa-expand text-white opacity-0 group-hover:opacity-100 transition-opacity text-xl"></i>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <h4 className="text-white font-extrabold text-sm tracking-tight">{image.title}</h4>
                    <span className="text-brand-accent-text text-[10px] font-extrabold uppercase tracking-widest">{image.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <GallerySkeleton />
        )}
      </Section>

      {selectedImage && (
        <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
    </>
  );
};

export default Gallery;