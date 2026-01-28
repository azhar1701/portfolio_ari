import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import { useTheme } from './hooks/useTheme';
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

const App: React.FC = () => {
  const [theme, toggleTheme] = useTheme();
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const portfolioData = await fetchPortfolioData();
        setData(portfolioData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
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
    { name: 'Summary', href: '#summary' },
    { name: 'Experience', href: '#experience' },
    { name: 'Showcase', href: '#showcase' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleSaveData = (updatedData: PortfolioData) => {
    savePortfolioData(updatedData);
    setData(updatedData);
  };

  const handleResetData = () => {
    const defaultData = resetPortfolioData();
    setData(defaultData);
    // The form inside AdminDashboard will also need to be reset
    // We can achieve this by re-creating it with the new key or passing a reset handler
    return defaultData;
  };

  const handleOpenAdminPanel = () => {
    // NOTE: In a real-world application, authentication should be handled by a secure backend system.
    // For this client-side-only project, a simple prompt with a hardcoded password provides a basic layer of security.
    const ADMIN_PASSWORD = 'admin';

    const password = window.prompt('Enter admin password:');
    
    if (password === ADMIN_PASSWORD) {
      setIsAdminOpen(true);
    } else if (password !== null) { // User entered something, but it was incorrect
      window.alert('Incorrect password. Access denied.');
    }
    // If password is null, the user clicked "Cancel", so we do nothing.
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
  } = data;

  return (
    <div className="font-sans text-slate-700 dark:text-slate-300">
      <Header profile={profile} navLinks={navLinks} theme={theme} toggleTheme={toggleTheme} />
      <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 pt-24">
        <Summary content={summary} />
        <Stats stats={stats} />
        <ExperienceComponent experience={experience} />
        <ProjectShowcase showcase={showcase} />
        <MapSection locations={locations} />
        <Projects projects={projects} />
        <Skills skills={skills} />
        <EducationComponent education={education} />
        <Certifications certifications={certifications} />
        <Publications publications={publications} />
        <Organizations organizations={organizations} />
        <ContactForm />
      </main>
      <Footer name={profile.name} onOpenAdmin={handleOpenAdminPanel} />
      <BackToTopButton />
      <AdminDashboard 
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        data={data}
        onSave={handleSaveData}
        onReset={handleResetData}
      />
    </div>
  );
};

export default App;
