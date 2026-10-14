import React from 'react';
import { ArrowDown, ArrowUpRight, Download } from 'lucide-react';
import { downloadCVPdf } from '../utils/downloadCV';

interface AboutSectionProps {
  onExploreProjects: () => void;
  onExploreBackground: () => void;
  onOpenContact: () => void;
  profilePhoto: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onExploreProjects,
  onExploreBackground,
  onOpenContact,
  profilePhoto
}) => {
  return (
    <section id="about" className="relative pt-12 pb-20 md:pt-20 md:pb-28 border-b border-[#E4E4E7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Bio & Core Academic Facts */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Metadata Header */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#71717A] mb-5 tracking-tight">
              <span>Alfred Joshan Richard</span>
              <span aria-hidden="true">·</span>
              <span>BINUS University @Alam Sutera</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#2563EB] font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse"></span>
                GPA 3.54 / 4.00
              </span>
            </div>

            {/* Display Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#18181B] leading-[1.08] text-balance mb-6">
              Computer Science student building <span className="font-serif italic font-normal text-[#27272A]">scalable software</span> & intuitive interfaces.
            </h1>

            {/* Subtitle / Bio */}
            <div className="space-y-4 text-base sm:text-lg text-[#52525B] leading-relaxed max-w-2xl mb-8">
              <p>
                Hi, I'm <strong className="text-[#18181B] font-semibold">Alfred Joshan Richard</strong>, an undergraduate Computer Science student at <strong className="text-[#18181B] font-semibold">BINUS University Alam Sutera</strong> (Binusian 2028), alumnus of <strong className="text-[#18181B] font-semibold">SMA Xaverius 2 Bandar Lampung</strong>.
              </p>
              <p className="text-sm sm:text-base text-[#71717A]">
                With a strong technical foundation in <strong className="text-[#18181B] font-medium">Java, C++, and Python</strong>, I engineer backend microservices, full-stack web platforms, and mobile-friendly travel products with a focus on code optimization, algorithm efficiency, and team collaboration.
              </p>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                onClick={onExploreProjects}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-[#18181B] rounded-lg hover:bg-[#27272A] transition-colors inline-flex items-center gap-2"
              >
                <span>View Projects & Repositories</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                onClick={downloadCVPdf}
                className="px-5 py-2.5 text-sm font-semibold text-[#18181B] hover:text-[#000000] border border-[#E4E4E7] bg-white rounded-lg hover:border-[#18181B] shadow-xs transition-colors inline-flex items-center gap-2 cursor-pointer"
                title="Download & View Alfred Joshan Richard's Curriculum Vitae"
              >
                <Download className="w-4 h-4 text-[#2563EB]" />
                <span>Download CV (PDF)</span>
              </button>

              <button
                onClick={onExploreBackground}
                className="px-4 py-2.5 text-sm font-medium text-[#71717A] hover:text-[#18181B] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              >
                <span>Academic Record</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onOpenContact}
                className="px-4 py-2.5 text-sm font-medium text-[#2563EB] hover:text-[#1D4ED8] transition-colors inline-flex items-center gap-1.5"
              >
                <span>Get in Touch</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            {/* Adjacent Quantitative Proof Metrics from Verified CV */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#E4E4E7] text-left">
              <div>
                <p className="font-mono text-2xl font-semibold text-[#18181B] tabular-nums">3.54</p>
                <p className="text-xs text-[#71717A] mt-0.5">Cumulative GPA (Even 2026)</p>
              </div>
              <div>
                <p className="font-mono text-2xl font-semibold text-[#18181B] tabular-nums">B2028</p>
                <p className="text-xs text-[#71717A] mt-0.5">Binus CS Cohort</p>
              </div>
              <div>
                <p className="font-mono text-xl sm:text-2xl font-semibold text-[#18181B] tabular-nums">Nippon Club</p>
                <p className="text-xs text-[#71717A] mt-0.5">Sub-Division Officer (2025–Pres.)</p>
              </div>
            </div>

          </div>

          {/* Right Column: Profile Photo */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-[240px] sm:max-w-[260px] relative rounded-2xl overflow-hidden border border-[#E4E4E7] bg-[#F4F4F5] shadow-xs">
              <div className="relative aspect-[3/4] overflow-hidden bg-[#1E87F0] flex items-center justify-center">
                <img
                  src={profilePhoto}
                  alt="Alfred Joshan Richard"
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Verified Student ID badge */}
              <div className="p-3 bg-white/95 backdrop-blur-xs border-t border-[#E4E4E7] space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-semibold text-[#18181B] truncate max-w-[130px]">Alfred J. Richard</p>
                  </div>
                  <span className="text-[10px] font-mono text-[#2563EB] font-medium">NIM: 2802454846</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#71717A] font-mono">
                  <span>BINUS Alam Sutera</span>
                  <span>BN125374822</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Editorial Marquee Ribbon */}
      <div className="mt-14 py-3 bg-[#F4F4F5] border-y border-[#E4E4E7] overflow-hidden whitespace-nowrap">
        <div className="inline-flex gap-8 text-xs font-mono tracking-wider uppercase text-[#71717A]">
          <span>Alfred Joshan Richard</span>
          <span aria-hidden="true">·</span>
          <span>SMA Xaverius 2 Bandar Lampung</span>
          <span aria-hidden="true">·</span>
          <span>BINUS Alam Sutera</span>
          <span aria-hidden="true">·</span>
          <span>Computer Science</span>
          <span aria-hidden="true">·</span>
          <span>Java · C++ · Python</span>
          <span aria-hidden="true">·</span>
          <span>Data Structures & Algorithms</span>
          <span aria-hidden="true">·</span>
          <span>Backend REST APIs</span>
          <span aria-hidden="true">·</span>
          <span>Nippon Club (Trainee 2024–2025 · Sub-Division Officer 2025–Present)</span>
          <span aria-hidden="true">·</span>
          <span>TzuChi Volunteer</span>
          <span aria-hidden="true">·</span>
          <span>Software Testing</span>
          <span aria-hidden="true">·</span>
          <span>Full-Stack Web</span>
          <span aria-hidden="true">·</span>
          <span>Alfred Joshan Richard</span>
        </div>
      </div>
    </section>
  );
};
