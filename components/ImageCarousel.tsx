
import React, { useState } from 'react';

interface ImageCarouselProps {
    images: string[];
    projectName: string;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, projectName }) => {
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

    return (
        <div className="relative group w-full aspect-video rounded-lg overflow-hidden mb-4">
            <img 
                src={images[currentIndex]} 
                alt={`${projectName} - Image ${currentIndex + 1}`}
                className="w-full h-full object-cover duration-500 transition-all"
            />
            {/* Left Arrow */}
            {images.length > 1 && (
                <>
                    <button 
                        onClick={goToPrevious} 
                        aria-label="Previous image"
                        className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 left-3 text-2xl rounded-full p-2 bg-black/40 text-white cursor-pointer transition-opacity duration-300"
                    >
                        <i className="fas fa-chevron-left"></i>
                    </button>
                    {/* Right Arrow */}
                    <button 
                        onClick={goToNext} 
                        aria-label="Next image"
                        className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 right-3 text-2xl rounded-full p-2 bg-black/40 text-white cursor-pointer transition-opacity duration-300"
                    >
                        <i className="fas fa-chevron-right"></i>
                    </button>
                     {/* Dot Indicators */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                        {images.map((_, slideIndex) => (
                            <button 
                                key={slideIndex} 
                                onClick={() => goToSlide(slideIndex)}
                                className={`w-2 h-2 rounded-full transition-all duration-300 ${currentIndex === slideIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'}`}
                                aria-label={`Go to image ${slideIndex + 1}`}
                            ></button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default ImageCarousel;
