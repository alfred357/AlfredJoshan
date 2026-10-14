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
import { Footer } from './components/Footer';
import profilePhoto from './assets/images/cvprofile.jpg';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

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
        profilePhoto={profilePhoto}
      />

      {/* Main Content: Exactly 4 requested sections */}
      <main>
        {/* 1. About Section */}
        <AboutSection
          onExploreProjects={scrollToProjects}
          onExploreBackground={scrollToBackground}
          onOpenContact={scrollToContact}
          profilePhoto={profilePhoto}
        />

        {/* 2. Project Section */}
        <ProjectsSection
          projects={PROJECTS}
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* 3. Background Section */}
        <BackgroundSection />

        {/* 4. Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Full Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

    </div>
  );
}
