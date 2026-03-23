
import React, { useState } from 'react';

interface ImageCarouselProps {
    images: string[];
    projectName?: string;
    title?: string;
    description?: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, projectName, title, description }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!images || images.length === 0) {
        return null;
    }

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const goToNext = () => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex: number) => {
        setCurrentIndex(slideIndex);
    };

    const altText = title
        ? `${title} - View ${currentIndex + 1}`
        : `${projectName} - Image ${currentIndex + 1}`;

    return (
        <div className="w-full group/carousel">
            {title && (
                <h4 className="text-xs font-bold text-text-primary uppercase tracking-widest mb-4 border-b border-border-subtle/30 pb-1 w-fit">
                    {title}
                </h4>
            )}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-subtle border border-border-subtle group bg-bg-app">
                <img
                    src={images[currentIndex]}
                    alt={altText}
                    className="w-full h-full object-cover duration-500 transition-all hover:scale-105"
                    key={images[currentIndex]}
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (!target.src.includes('1559635013-35a82c40c39f')) {
                            target.src = 'https://images.unsplash.com/photo-1559635013-35a82c40c39f?q=80&w=2070&auto=format&fit=crop';
                        }
                    }}
                />
                {images.length > 1 && (
                    <>
                        <button
                            onClick={goToPrevious}
                            className="absolute top-1/2 -translate-y-1/2 left-4 text-xl rounded-full p-2 bg-black/40 text-white backdrop-blur-sm opacity-0 group-hover/carousel:opacity-100 transition-all hover:bg-black/60"
                            aria-label="Previous image"
                        >
                            <i className="fas fa-chevron-left"></i>
                        </button>
                        <button
                            onClick={goToNext}
                            className="absolute top-1/2 -translate-y-1/2 right-4 text-xl rounded-full p-2 bg-black/40 text-white backdrop-blur-sm opacity-0 group-hover/carousel:opacity-100 transition-all hover:bg-black/60"
                            aria-label="Next image"
                        >
                            <i className="fas fa-chevron-right"></i>
                        </button>
                    </>
                )}
            </div>
            {images.length > 1 && (
                <div className="flex justify-center py-4 space-x-2.5">
                    {images.map((_, slideIndex) => (
                        <button
                            key={slideIndex}
                            onClick={() => goToSlide(slideIndex)}
                            className={`transition-all duration-300 ${currentIndex === slideIndex ? 'w-8 h-2 bg-brand-accent rounded-full' : 'w-2 h-2 bg-text-muted/30 rounded-full hover:bg-brand-accent/50 hover:w-4'}`}
                            aria-label={`Go to image ${slideIndex + 1}`}
                        ></button>
                    ))}
                </div>
            )}
            {description && (
                <p className="text-text-secondary text-sm font-medium leading-relaxed italic">{description}</p>
            )}
        </div>
    );
};

export default ImageCarousel;
