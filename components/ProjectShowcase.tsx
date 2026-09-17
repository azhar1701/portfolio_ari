import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import type { ProjectShowcase as ShowcaseType } from '../types';
import Section from './Section';
import SkeletonLoader from './SkeletonLoader';

const ProjectShowcase: React.FC<{ showcase: ShowcaseType | null }> = ({ showcase }) => {
  const [selectedPairIndex, setSelectedPairIndex] = useState(0);

  if (!showcase) {
    return (
      <Section id="showcase" title="Geospatial Analysis Showcase" iconClass="fas fa-satellite" noContainer>
        <div className="space-y-4 max-w-6xl mx-auto">
          <SkeletonLoader className="h-8 w-3/4 rounded-xl" />
          <SkeletonLoader className="h-96 w-full rounded-3xl" />
        </div>
      </Section>
    );
  }

  const beforeImage = showcase.before.imageUrls[selectedPairIndex] || showcase.before.imageUrls[0];
  const afterImage = showcase.after.imageUrls[selectedPairIndex] || showcase.after.imageUrls[0];

  return (
    <Section id="showcase" title="Geospatial Analysis Showcase" iconClass="fas fa-satellite" noContainer>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        viewport={{ once: true, amount: 0.15 }}
        className="max-w-6xl mx-auto space-y-8 bg-bg-app p-6 sm:p-10 md:p-12 rounded-3xl md:rounded-[2.5rem] border border-border-subtle shadow-sm"
      >
        {/* Header Information */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-brand-accent/10 border border-brand-accent/20 rounded-full mb-3">
              <i className="fas fa-sliders text-brand-accent text-xs"></i>
              <span className="text-[10px] font-bold text-brand-accent uppercase tracking-widest">Interactive Comparative Analysis</span>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text-primary tracking-tight">
              {showcase.title}
            </h3>
            <p className="text-text-secondary md:text-base leading-relaxed font-medium mt-3">
              {showcase.description}
            </p>
          </div>

          {/* Pair selector if multiple images exist */}
          {showcase.before.imageUrls.length > 1 && (
            <div className="flex items-center space-x-2 bg-bg-canvas p-1.5 rounded-xl border border-border-subtle shrink-0">
              {showcase.before.imageUrls.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedPairIndex(idx)}
                  className={`px-3 py-1.5 text-xs font-bold uppercase rounded-lg transition-colors cursor-pointer ${
                    selectedPairIndex === idx
                      ? 'bg-brand-accent text-white shadow-sm'
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg-app'
                  }`}
                >
                  Layer {idx + 1}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Interactive Comparison Slider */}
        <div className="relative rounded-2xl overflow-hidden border border-border-subtle shadow-md bg-black">
          <ReactCompareSlider
            itemOne={
              <ReactCompareSliderImage
                src={beforeImage}
                alt="Before Condition / Historical Baseline"
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            }
            itemTwo={
              <ReactCompareSliderImage
                src={afterImage}
                alt="After Condition / Predictive Model Simulation"
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            }
            className="w-full aspect-[16/9] sm:aspect-[21/9] max-h-[520px]"
          />

          {/* Visual Badges Overlay */}
          <div className="absolute top-4 left-4 pointer-events-none z-10">
            <span className="px-3 py-1.5 bg-black/75 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider rounded-lg border border-white/20 shadow-md">
              <i className="fas fa-clock-rotate-left mr-1.5 text-amber-400"></i> Baseline / Before
            </span>
          </div>

          <div className="absolute top-4 right-4 pointer-events-none z-10">
            <span className="px-3 py-1.5 bg-brand-accent/90 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider rounded-lg border border-white/20 shadow-md">
              <i className="fas fa-layer-group mr-1.5 text-white"></i> GIS Model / After
            </span>
          </div>

          {/* Hint tag */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none z-10 hidden sm:block">
            <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white/80 text-[10px] font-semibold tracking-widest uppercase rounded-full">
              <i className="fas fa-arrows-left-right mr-1.5"></i> Drag slider to compare
            </span>
          </div>
        </div>

        {/* Technical Specs Comparison Notes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-border-subtle/40">
          <div className="p-5 rounded-2xl bg-bg-canvas border border-border-subtle">
            <div className="flex items-center space-x-2 text-amber-600 mb-2">
              <i className="fas fa-triangle-exclamation text-xs"></i>
              <span className="text-[10px] font-bold uppercase tracking-widest">Kondisi Awal / Baseline</span>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed font-medium">
              {showcase.before.description}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-bg-canvas border border-border-subtle">
            <div className="flex items-center space-x-2 text-brand-accent mb-2">
              <i className="fas fa-circle-check text-xs"></i>
              <span className="text-[10px] font-bold uppercase tracking-widest">Hasil Optimasi & Pemodelan</span>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed font-medium">
              {showcase.after.description}
            </p>
          </div>
        </div>
      </motion.div>
    </Section>
  );
};

export default ProjectShowcase;