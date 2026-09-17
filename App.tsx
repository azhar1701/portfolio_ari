import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import { fetchPortfolioData, savePortfolioData, resetPortfolioData } from './services/contentService';
import type { PortfolioData } from './types';
import { ToastProvider, useToast } from './contexts/ToastContext';

import Loader from './components/Loader';
import Error from './components/Error';
import Header from './components/Header';
import Summary from './components/Summary';
import ExperienceComponent from './components/Experience';
import Skills from './components/Skills';
import EducationComponent from './components/Education';
import Certifications from './components/Certifications';
import Publications from './components/Publications';
import Organizations from './components/Organizations';
import Projects from './components/Projects';
import Stats from './components/Stats';
import MapSection from './components/MapSection';
import ProjectShowcase from './components/ProjectShowcase';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import BackToTopButton from './components/BackToTopButton';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import Gallery from './components/Gallery';
import InteractiveResume from './components/InteractiveResume';
import MobileNav from './components/MobileNav';
import ReadingProgressBar from './components/ReadingProgressBar';

const PortfolioApp: React.FC = () => {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const portfolioData = await fetchPortfolioData();
        setData(portfolioData);
      } catch (err: any) {
        const errorMessage = err?.message || 'Failed to load portfolio data. Please try again later.';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  const navLinks = [
    { name: 'Summary', href: '#summary', icon: 'fas fa-compass-drafting' },
    { name: 'Projects', href: '#projects', icon: 'fas fa-diagram-project' },
    { name: 'GIS Hub', href: '#locations', icon: 'fas fa-map-location-dot' },
    { name: 'Resume', href: '#resume', icon: 'fas fa-file-lines' },
    { name: 'Experience', href: '#experience', icon: 'fas fa-route' },
    { name: 'Blog', href: '#blog', icon: 'fas fa-lightbulb' },
    { name: 'Contact', href: '#contact', icon: 'fas fa-paper-plane' },
  ];

  const handleSaveData = async (updatedData: PortfolioData) => {
    try {
      setLoading(true);
      await savePortfolioData(updatedData);
      setData(updatedData);

      const message =
        import.meta.env.VITE_USE_SUPABASE === 'true'
          ? 'Data synced and saved to Supabase successfully!'
          : 'Data saved to local storage successfully!';
      toast.success(message);
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to save data. Please try again.';
      toast.error(`Save failed: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleResetData = async (): Promise<PortfolioData | null> => {
    try {
      setLoading(true);
      const defaultData = await resetPortfolioData();
      setData(defaultData);

      if (import.meta.env.VITE_USE_SUPABASE === 'true') {
        await savePortfolioData(defaultData);
        toast.success('Data reset and synced to Supabase successfully!');
      } else {
        toast.success('Data reset to defaults successfully!');
      }

      return defaultData;
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to reset data. Please try again.';
      toast.error(`Reset failed: ${errorMessage}`);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdminPanel = () => {
    const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;
    if (!ADMIN_PASSWORD) {
      toast.error('Admin access is not properly configured in environment.');
      return;
    }
    setIsLoginOpen(true);
  };

  const handleLogin = (enteredPassword: string) => {
    const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;
    if (enteredPassword === ADMIN_PASSWORD) {
      setIsAdminOpen(true);
      setIsLoginOpen(false);
      toast.success('Admin authorization verified. Welcome!');
    } else {
      toast.error('Incorrect password. Access denied.');
    }
  };

  if (loading) return <Loader />;
  if (error || !data) return <Error message={error || 'Portfolio data could not be loaded.'} />;

  const {
    profile,
    summary,
    summaryImage,
    stats,
    experience,
    showcase,
    locations,
    projects,
    skills,
    education,
    certifications,
    publications,
    organizations,
    testimonials,
    blogPosts,
    gallery,
  } = data;

  return (
    <div className="min-h-screen">
      <ReadingProgressBar />
      <Header profile={profile} navLinks={navLinks} data={data} />
      <main className="w-full mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 pt-24 md:pt-32 pb-20 lg:pb-0">
        <div className="max-w-7xl mx-auto space-y-16 sm:space-y-24">
          <Summary content={summary} image={summaryImage} />
          <Stats stats={stats} />
          <ExperienceComponent experience={experience} />
          <ProjectShowcase showcase={showcase} />
          <MapSection locations={locations} />
          <Projects projects={projects} />
          <Skills skills={skills} />
          <InteractiveResume data={data} />
          <Testimonials testimonials={testimonials} />
          <Blog blogPosts={blogPosts} />
          <Gallery gallery={gallery} />
          <EducationComponent education={education} />
          <Certifications certifications={certifications} />
          <Publications publications={publications} />
          <Organizations organizations={organizations} />
          <ContactForm />
        </div>
      </main>
      <Footer data={data} onOpenAdmin={handleOpenAdminPanel} />
      <BackToTopButton />
      <AdminLogin
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={handleLogin}
      />
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        data={data}
        onSave={handleSaveData}
        onReset={handleResetData}
      />
      <MobileNav navLinks={navLinks} />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ToastProvider>
      <PortfolioApp />
    </ToastProvider>
  );
};

export default App;
