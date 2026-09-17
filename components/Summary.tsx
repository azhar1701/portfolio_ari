import React from 'react';
import { motion, Variants } from 'framer-motion';
import Section from './Section';
import SkeletonLoader from './SkeletonLoader';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
};

interface SummaryProps {
  content: string | null;
  image?: string;
}

const Summary: React.FC<SummaryProps> = ({ content, image }) => {
  return (
    <Section id="summary" title="Executive Overview" iconClass="fas fa-compass-drafting" noContainer>
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {content ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            {/* Mission Statement Column */}
            <motion.div className="lg:col-span-5" variants={itemVariants}>
              <div className="sticky top-32 space-y-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-accent/10 border border-brand-accent/20 rounded-full text-xs font-semibold text-brand-accent mb-4">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Available for Technical Consulting & Roles</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary tracking-tighter leading-[1.1]">
                    Water engineering meets <span className="text-brand-accent">GIS</span>.
                  </h3>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md border border-border-subtle hidden md:block"
                >
                  <motion.img
                    initial={{ scale: 1.1 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    src={image || "/images/summary_hero.png"}
                    alt="Field work and engineering"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-medium flex items-center justify-between">
                    <span><i className="fas fa-map-location-dot mr-1.5 text-sky-400"></i> Field Survey & Hydrodynamic Telemetry</span>
                    <span className="font-mono text-[10px] bg-white/20 px-2 py-0.5 rounded backdrop-blur">ITB Alum</span>
                  </div>
                </motion.div>

                {/* Credibility Credentials Pills */}
                <div className="space-y-2 pt-2">
                  <p className="font-mono text-[10px] font-bold text-text-muted uppercase tracking-[0.25em]">Verified Affiliations</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-bg-app border border-border-subtle rounded-xl text-xs font-bold text-text-primary">
                      <i className="fas fa-graduation-cap text-sky-400 text-xs"></i>
                      Institut Teknologi Bandung (ITB)
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-bg-app border border-border-subtle rounded-xl text-xs font-bold text-text-primary">
                      <i className="fas fa-shield-halved text-emerald-400 text-xs"></i>
                      HATHI Professional Member
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Narrative & Recruiter Actions Column */}
            <motion.div className="lg:col-span-7" variants={itemVariants}>
              <div className="bg-bg-app p-6 sm:p-10 md:p-14 rounded-3xl md:rounded-[2.5rem] border border-border-subtle shadow-sm space-y-8">
                <div>
                  <p className="text-xl md:text-2xl text-text-secondary leading-relaxed font-medium tracking-tight">
                    {content}
                  </p>
                </div>

                {/* Recruiter Action Bar */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href="#resume"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-brand-accent hover:bg-brand-accent-hover text-white text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all active:scale-95"
                  >
                    <i className="fas fa-file-pdf text-sm"></i>
                    Download Executive ATS Resume
                  </a>
                  <a
                    href="#projects"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl border border-border-subtle bg-bg-canvas hover:bg-bg-app text-text-primary text-xs font-bold uppercase tracking-wider transition-all shadow-sm active:scale-95"
                  >
                    <i className="fas fa-diagram-project text-brand-accent text-sm"></i>
                    Explore Case Studies
                  </a>
                </div>

                {/* Technical Domain Matrix Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 border-t border-border-subtle/30">
                  <div className="flex items-start">
                    <div className="w-1.5 h-10 bg-brand-accent mr-4 mt-0.5 rounded-full"></div>
                    <div>
                      <p className="font-mono text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] mb-1">Core Engineering Domain</p>
                      <p className="text-sm font-bold text-text-primary">Water Resources & Irrigation Engineering</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-1.5 h-10 bg-sky-500 mr-4 mt-0.5 rounded-full"></div>
                    <div>
                      <p className="font-mono text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] mb-1">Geospatial Technology</p>
                      <p className="text-sm font-bold text-text-primary">QGIS, ArcGIS Pro, Python & PostGIS</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-1.5 h-10 bg-emerald-500 mr-4 mt-0.5 rounded-full"></div>
                    <div>
                      <p className="font-mono text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] mb-1">Hydraulic Modeling</p>
                      <p className="text-sm font-bold text-text-primary">HEC-RAS 1D/2D & Hydrodynamic Analysis</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-1.5 h-10 bg-amber-500 mr-4 mt-0.5 rounded-full"></div>
                    <div>
                      <p className="font-mono text-[10px] font-bold text-text-muted uppercase tracking-[0.2em] mb-1">Current Initiative</p>
                      <p className="text-sm font-bold text-text-primary">SIPASDA Spatial Decision Support System</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-5 space-y-4">
              <SkeletonLoader className="h-12 w-full rounded-xl" />
              <SkeletonLoader className="h-12 w-3/4 rounded-xl" />
            </div>
            <div className="lg:col-span-7">
              <SkeletonLoader className="h-64 w-full rounded-[2.5rem]" />
            </div>
          </div>
        )}
      </motion.div>
    </Section>
  );
};

export default Summary;