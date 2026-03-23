import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import { fetchPortfolioData, savePortfolioData, resetPortfolioData } from './services/contentService';
import type { PortfolioData } from './types';

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
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import Gallery from './components/Gallery';
import InteractiveResume from './components/InteractiveResume';
import WelcomeGuide from './components/WelcomeGuide';
import OnboardingTour from './components/OnboardingTour';
import MobileNav from './components/MobileNav';
import ReadingProgressBar from './components/ReadingProgressBar';

const App: React.FC = () => {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [runTour, setRunTour] = useState<boolean>(false);

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
    { name: 'Portfolio', href: '#projects', icon: 'fas fa-diagram-project' },
    { name: 'Experience', href: '#experience', icon: 'fas fa-route' },
    { name: 'Blog', href: '#blog', icon: 'fas fa-lightbulb' },
    { name: 'Contact', href: '#contact', icon: 'fas fa-envelope-open-text' },
  ];

  const handleSaveData = async (updatedData: PortfolioData) => {
    try {
      setLoading(true);
      await savePortfolioData(updatedData);
      setData(updatedData);

      // Show success message
      const message = import.meta.env.VITE_USE_SUPABASE === 'true'
        ? 'Data saved to Supabase successfully!'
        : 'Data saved to local storage successfully!';
      window.alert(message);
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to save data. Please try again.';
      window.alert(`Save failed: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleResetData = async (): Promise<PortfolioData | null> => {
    try {
      setLoading(true);
      const defaultData = await resetPortfolioData();
      setData(defaultData);

      // If using Supabase, also reset database
      if (import.meta.env.VITE_USE_SUPABASE === 'true') {
        await savePortfolioData(defaultData);
        window.alert('Data reset and synced to Supabase successfully!');
      } else {
        window.alert('Data reset to default successfully!');
      }

      return defaultData;
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to reset data. Please try again.';
      window.alert(`Reset failed: ${errorMessage}`);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdminPanel = () => {
    try {
      const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

      if (!ADMIN_PASSWORD) {
        window.alert('Admin access is not properly configured. Please check environment variables.');
        return;
      }

      const password = window.prompt('Enter admin password:');

      if (password === null) {
        return;
      }

      if (password === ADMIN_PASSWORD) {
        setIsAdminOpen(true);
      } else {
        window.alert('Incorrect password. Access denied.');
      }
    } catch (err) {
      window.alert('Unable to access admin panel. Please try again.');
    }
  };

  if (loading) return <Loader />;
  if (error || !data) return <Error message={error || "Portfolio data could not be loaded."} />;

  const {
    profile,
    summary,
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
        <div className="max-w-7xl mx-auto">
          <Summary content={summary} />
          <Stats stats={stats} />
          <ExperienceComponent experience={experience} />
          <ProjectShowcase showcase={showcase} />
          <MapSection locations={locations} />
          <Projects projects={projects} />
          <Skills skills={skills} />
          <Testimonials testimonials={testimonials} />
          <Blog blogPosts={blogPosts} />
          <Gallery gallery={gallery} />
          <InteractiveResume data={data} />
          <EducationComponent education={education} />
          <Certifications certifications={certifications} />
          <Publications publications={publications} />
          <Organizations organizations={organizations} />
          <ContactForm />
        </div>
      </main>
      <Footer data={data} onOpenAdmin={handleOpenAdminPanel} />
      <BackToTopButton />
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        data={data}
        onSave={handleSaveData}
        onReset={handleResetData}
      />
      <WelcomeGuide onStartTour={() => setRunTour(true)} />
      <OnboardingTour run={runTour} onFinish={() => setRunTour(false)} />
      <MobileNav navLinks={navLinks} />
    </div>
  );
};

export default App;
