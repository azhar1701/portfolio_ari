import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Section from './Section';
import type { GalleryImage } from '../types';
import SkeletonLoader from './SkeletonLoader';

interface GalleryProps {
  gallery: GalleryImage[] | null;
}

const ImageModal: React.FC<{ image: GalleryImage; onClose: () => void }> = ({ image, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    (
    <div
      className="fixed inset-0 z-[9990] flex items-center justify-center p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={image.title}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-md"
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        className="relative max-w-5xl w-full max-h-[90vh] flex flex-col bg-bg-canvas border border-border-subtle rounded-2xl overflow-hidden shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="bg-bg-canvas border-b border-border-subtle px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3 min-w-0 pr-4">
            <span className="px-2.5 py-1 bg-brand-accent-soft border border-brand-accent/20 text-brand-accent-text text-[10px] font-bold uppercase tracking-wider rounded-lg shrink-0">
              {image.category || 'Gallery'}
            </span>
            <h3 className="font-bold text-text-primary text-base tracking-tight truncate">
              {image.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-bg-app hover:bg-red-50 text-text-muted hover:text-red-500 border border-border-subtle transition-all flex items-center justify-center shrink-0 focus:outline-none focus:ring-2 focus:ring-brand-accent/30 cursor-pointer active:scale-95"
            aria-label="Close image preview"
          >
            <i className="fas fa-xmark text-base"></i>
          </button>
        </div>

        {/* Central Responsive Image Viewport */}
        <div className="flex-1 min-h-0 w-full p-4 sm:p-6 flex items-center justify-center overflow-hidden">
          <img
            src={image.image || image.url}
            alt={image.title}
            className="max-w-full max-h-full object-contain rounded-xl"
          />
        </div>

        {/* Bottom Caption Bar */}
        {image.description && (
          <div className="bg-bg-app border-t border-border-subtle px-6 py-4 shrink-0">
            <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-3xl">
              {image.description}
            </p>
          </div>
        )}
      </div>
    </div>
  ), document.body);
};

const Gallery: React.FC<GalleryProps> = ({ gallery }) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [filter, setFilter] = useState<string>('All');

  const categories = gallery ? ['All', ...new Set(gallery.map((img) => img.category))] : [];
  const filteredImages = gallery?.filter((img) => filter === 'All' || img.category === filter) || [];

  return (
    <>
      <Section id="gallery" title="Gallery" iconClass="fas fa-images">
        {gallery ? (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${
                    filter === category
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
                  className="relative group cursor-pointer overflow-hidden rounded-2xl aspect-square bg-border-subtle border border-border-subtle shadow-sm hover:shadow-md transition-all"
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image.image || image.url || ''}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      if (!target.src.includes('1559635013-35a82c40c39f')) {
                        target.src = 'https://images.unsplash.com/photo-1559635013-35a82c40c39f?q=80&w=2070&auto=format&fit=crop';
                      }
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <span className="text-sky-400 text-[10px] font-bold uppercase tracking-wider block mb-1">
                      {image.category}
                    </span>
                    <h4 className="font-bold text-sm tracking-tight text-white leading-snug">{image.title}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <SkeletonLoader.SquareGrid items={8} />
        )}
      </Section>

      {selectedImage && (
        <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
    </>
  );
};

export default Gallery;