import React, { useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Upload, Camera, Trash2, Check, User, Download } from 'lucide-react';
import { downloadCVPdf } from '../utils/downloadCV';

interface AboutSectionProps {
  onExploreProjects: () => void;
  onExploreBackground: () => void;
  onOpenContact: () => void;
  onOpenCV?: () => void;
  profilePhoto: string | null;
  onUpdatePhoto: (dataUrl: string) => void;
  onRemovePhoto: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onExploreProjects,
  onExploreBackground,
  onOpenContact,
  onOpenCV,
  profilePhoto,
  onUpdatePhoto,
  onRemovePhoto
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        onUpdatePhoto(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

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
                onClick={() => {
                  downloadCVPdf();
                  onOpenCV?.();
                }}
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

          {/* Right Column: Visual Frame with Manual Photo Upload */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="w-full max-w-[240px] sm:max-w-[260px] relative rounded-2xl overflow-hidden border border-[#E4E4E7] bg-[#F4F4F5] shadow-xs">
              
              {/* Hidden file input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />

              {/* Photo Area */}
              {profilePhoto ? (
                <div className="relative aspect-[3/4] overflow-hidden bg-[#1E87F0] flex items-center justify-center group">
                  <img
                    src={profilePhoto}
                    alt="Alfred Joshan Richard"
                    className="w-full h-full object-cover object-top"
                  />

                  {/* Manual Controls Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-3">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-3 py-1.5 bg-white text-[#18181B] text-xs font-semibold rounded-lg shadow-md hover:bg-neutral-100 transition-colors inline-flex items-center gap-1.5"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Change Picture</span>
                    </button>

                    <button
                      onClick={onRemovePhoto}
                      className="px-3 py-1.5 bg-red-600 text-white text-xs font-semibold rounded-lg shadow-md hover:bg-red-700 transition-colors inline-flex items-center gap-1.5"
                      title="Remove picture"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Empty / Ready for manual upload dropzone (compact scale) */
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`aspect-[3/4] border-2 border-dashed rounded-t-2xl p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
                    isDragging 
                      ? 'border-[#2563EB] bg-blue-50/50' 
                      : 'border-[#D4D4D8] bg-[#FAFAFA] hover:border-[#18181B] hover:bg-[#F4F4F5]'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-white border border-[#E4E4E7] shadow-xs flex items-center justify-center text-[#71717A] mb-3">
                    <Camera className="w-5 h-5" />
                  </div>
                  <h3 className="font-display text-xs font-bold text-[#18181B] mb-1">
                    Add Your Picture
                  </h3>
                  <p className="text-[11px] text-[#71717A] max-w-[170px] mb-3">
                    Click to select <span className="font-mono text-[#18181B]">cvprofile.jpg</span>
                  </p>
                  <span className="px-2.5 py-1.5 bg-[#18181B] hover:bg-[#27272A] text-white text-[11px] font-semibold rounded-lg transition-colors inline-flex items-center gap-1">
                    <Upload className="w-3 h-3" />
                    <span>Upload Picture</span>
                  </span>
                </div>
              )}

              {/* Verified Student ID badge */}
              <div className="p-3 bg-white/95 backdrop-blur-xs border-t border-[#E4E4E7] space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <p className="text-xs font-semibold text-[#18181B] truncate max-w-[130px]">Alfred J. Richard</p>
                    {profilePhoto && (
                      <span className="text-[10px] font-mono text-emerald-600 flex items-center gap-0.5" title="Photo active">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
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
