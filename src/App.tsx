/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PROJECTS } from './data/projects';
import { Project } from './types';
import { Navbar } from './components/Navbar';
import { AboutSection } from './components/AboutSection';
import { ProjectsSection } from './components/ProjectsSection';
import { BackgroundSection } from './components/BackgroundSection';
import { ContactSection } from './components/ContactSection';
import { ProjectModal } from './components/ProjectModal';
import { CVModal } from './components/CVModal';
import { Footer } from './components/Footer';

const PHOTO_STORAGE_KEY = 'alfred_custom_photo_v1';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);

  // Manual photo state stored in localStorage
  const [profilePhoto, setProfilePhoto] = useState<string | null>(() => {
    try {
      return localStorage.getItem(PHOTO_STORAGE_KEY);
    } catch {
      return null;
    }
  });

  const handleUpdatePhoto = (dataUrl: string) => {
    setProfilePhoto(dataUrl);
    try {
      localStorage.setItem(PHOTO_STORAGE_KEY, dataUrl);
    } catch {
      // ignore storage quota issues
    }
  };

  const handleRemovePhoto = () => {
    setProfilePhoto(null);
    try {
      localStorage.removeItem(PHOTO_STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToBackground = () => {
    const el = document.getElementById('background');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-[#18181B] selection:bg-[#18181B] selection:text-white font-sans">
      {/* Navigation Top Bar */}
      <Navbar 
        onOpenContact={scrollToContact} 
        onOpenCV={() => setIsCVModalOpen(true)}
        profilePhoto={profilePhoto}
      />

      {/* Main Content: Exactly 4 requested sections */}
      <main>
        {/* 1. About Section */}
        <AboutSection
          onExploreProjects={scrollToProjects}
          onExploreBackground={scrollToBackground}
          onOpenContact={scrollToContact}
          onOpenCV={() => setIsCVModalOpen(true)}
          profilePhoto={profilePhoto}
          onUpdatePhoto={handleUpdatePhoto}
          onRemovePhoto={handleRemovePhoto}
        />

        {/* 2. Project Section */}
        <ProjectsSection
          projects={PROJECTS}
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* 3. Background Section */}
        <BackgroundSection onOpenCV={() => setIsCVModalOpen(true)} />

        {/* 4. Contact Section */}
        <ContactSection onOpenCV={() => setIsCVModalOpen(true)} />
      </main>

      {/* Footer */}
      <Footer onOpenCV={() => setIsCVModalOpen(true)} />

      {/* Full Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Official Curriculum Vitae Modal */}
      <CVModal
        isOpen={isCVModalOpen}
        onClose={() => setIsCVModalOpen(false)}
        profilePhoto={profilePhoto}
      />
    </div>
  );
}
