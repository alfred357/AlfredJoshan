import React, { useEffect } from 'react';
import { X, Download, Printer, ExternalLink, GraduationCap, Award, Users, HeartHandshake, FileText, Check } from 'lucide-react';
import { downloadCVPdf, cvAssetUrl } from '../utils/downloadCV';
import alfredRealPhoto from '../assets/images/alfred_profile_real.jpg';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
  profilePhoto: string | null;
}

export const CVModal: React.FC<CVModalProps> = ({ isOpen, onClose, profilePhoto }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-[#E4E4E7] flex flex-col max-h-[92vh] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E4E4E7] bg-[#FBFBFA] shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#18181B] text-white rounded-lg">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-display text-base font-bold text-[#18181B] leading-none">
                Curriculum Vitae — Alfred Joshan Richard
              </h2>
              <p className="text-xs text-[#71717A] mt-1 font-mono">
                Official 2-Page Verified Resume
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={cvAssetUrl}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 text-xs font-medium text-[#2563EB] hover:text-[#1D4ED8] bg-blue-50/70 border border-blue-100 rounded-lg transition-colors inline-flex items-center gap-1.5"
              title="Open Raw PDF in New Tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Open PDF</span>
            </a>

            <button
              onClick={() => downloadCVPdf()}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-[#18181B] hover:bg-[#27272A] rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
              title="Download PDF File"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Download PDF</span>
              <span className="sm:hidden">PDF</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 text-xs font-medium text-[#18181B] border border-[#E4E4E7] bg-white hover:bg-[#F4F4F5] rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer"
              title="Print or Save as PDF via Browser"
            >
              <Printer className="w-3.5 h-3.5 text-[#71717A]" />
              <span className="hidden sm:inline">Print / Save</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-[#71717A] hover:text-[#18181B] hover:bg-[#F4F4F5] rounded-lg transition-colors ml-1 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body - Document Preview */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#F4F4F5] space-y-6">
          
          {/* ================= PAGE 1 ================= */}
          <div className="bg-white p-6 sm:p-10 rounded-xl border border-[#E4E4E7] shadow-xs max-w-3xl mx-auto font-sans text-[#18181B]">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-[#E4E4E7]">
              <img
                src={profilePhoto || alfredRealPhoto}
                alt="Alfred Joshan Richard"
                className="w-24 h-24 rounded-2xl object-cover object-top border border-[#E4E4E7] shadow-xs shrink-0"
              />
              
              <div className="text-center sm:text-left flex-1">
                <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#18181B]">
                  ALFRED JOSHAN RICHARD
                </h1>
                
                <div className="mt-2 flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-xs text-[#52525B] font-mono">
                  <span>alfred.richard@binus.ac.id</span>
                  <span>•</span>
                  <span>+62 882-7402-5001</span>
                  <span>•</span>
                  <span>Perum Griya Madu Permata Blok Ruby No. 17</span>
                </div>

                <div className="mt-1 flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-xs text-[#71717A] font-mono">
                  <span>DOB: 2006-07-12 (Male)</span>
                  <span>•</span>
                  <span>Tangerang & Bandar Lampung</span>
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs">
                  <a
                    href="https://docs.google.com/document/d/1343kaFW--BMKV_SdtQ6Hpb2bET9kQBwauodj5qzNAJA/edit?usp=sharing"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#2563EB] hover:underline inline-flex items-center gap-1 font-mono text-[11px]"
                  >
                    <span>Google Docs Portfolio</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <span className="text-[#D4D4D8]">•</span>
                  <a
                    href="https://www.linkedin.com/in/alfred-richard-71a340326"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#2563EB] hover:underline inline-flex items-center gap-1 font-mono text-[11px]"
                  >
                    <span>LinkedIn Profile</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Profile Statement */}
            <div className="py-6 border-b border-[#E4E4E7]">
              <h2 className="text-xs font-mono font-bold tracking-wider text-[#71717A] uppercase mb-2">
                Profile
              </h2>
              <p className="text-xs sm:text-sm text-[#3F3F46] leading-relaxed">
                Hi, I'm <strong>Alfred Joshan Richard</strong>, an undergraduate Computer Science student at <strong>BINUS University Alam Sutera</strong> (Binusian 2028), alumnus of <strong>SMA Xaverius 2 Bandar Lampung</strong>. With a strong technical foundation in <strong>Java, C++, and Python</strong>, I engineer backend microservices, full-stack web platforms, and mobile-friendly travel products with a focus on code optimization, algorithm efficiency, and team collaboration.
              </p>
            </div>

            {/* Academic Information */}
            <div className="py-6 border-b border-[#E4E4E7]">
              <h2 className="text-xs font-mono font-bold tracking-wider text-[#71717A] uppercase mb-3">
                Academic Information
              </h2>
              
              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <strong className="text-[#18181B] block">Senior High School</strong>
                    <span className="text-[#52525B]">SMA Xaverius 2 Bandar Lampung</span>
                  </div>
                  <div className="text-right font-mono text-xs text-[#71717A]">
                    <span>2021 – 2024</span>
                    <span className="block text-[11px]">Bandar Lampung</span>
                  </div>
                </div>

                <div className="flex justify-between items-start pt-2">
                  <div>
                    <strong className="text-[#18181B] block">Undergraduate, Computer Science</strong>
                    <span className="text-[#52525B]">BINUS University · Streaming: Computer Science</span>
                    <div className="mt-1">
                      <span className="font-mono text-xs font-semibold px-2 py-0.5 bg-blue-50 text-[#2563EB] rounded">
                        Current GPA: 3.54 / 4.00
                      </span>
                    </div>
                  </div>
                  <div className="text-right font-mono text-xs text-[#71717A]">
                    <span>2024 – 2028</span>
                    <span className="block text-[11px]">Binus Alam Sutera</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Student Skills Matrix */}
            <div className="py-6 border-b border-[#E4E4E7]">
              <h2 className="text-xs font-mono font-bold tracking-wider text-[#71717A] uppercase mb-3">
                Student Skill
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-2">
                  <div>
                    <span className="text-[#71717A] block font-mono text-[11px]">Communication Skills</span>
                    <span className="font-semibold text-[#18181B]">Presentation (5/10)</span>
                  </div>
                  <div>
                    <span className="text-[#71717A] block font-mono text-[11px]">Organizational Skills</span>
                    <span className="font-semibold text-[#18181B]">Teamwork (8/10)</span>
                  </div>
                  <div>
                    <span className="text-[#71717A] block font-mono text-[11px]">Language Skills</span>
                    <span className="font-semibold text-[#18181B]">English (8/10)</span>
                  </div>
                  <div>
                    <span className="text-[#71717A] block font-mono text-[11px]">Project Skills</span>
                    <span className="font-semibold text-[#18181B]">Adaptability (7/10)</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div>
                    <span className="text-[#71717A] block font-mono text-[11px]">Computer Skills</span>
                    <span className="font-semibold text-[#18181B]">Java (6/10) · C++ (6/10) · Python (6/10)</span>
                  </div>
                  <div>
                    <span className="text-[#71717A] block font-mono text-[11px]">Technical Skills</span>
                    <span className="font-semibold text-[#18181B]">Fix Code & Debugging (6/10)</span>
                  </div>
                  <div>
                    <span className="text-[#71717A] block font-mono text-[11px]">Leadership Skills</span>
                    <span className="font-semibold text-[#18181B]">Leading (7/10)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Certificates */}
            <div className="py-6 border-b border-[#E4E4E7]">
              <h2 className="text-xs font-mono font-bold tracking-wider text-[#71717A] uppercase mb-3">
                Certificates
              </h2>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <strong className="text-[#18181B] block">Committee member of Liberation Festival</strong>
                    <span className="text-[#52525B]">Tomoro event volunteer</span>
                  </div>
                  <span className="font-mono text-xs text-[#71717A]">09 May 2026</span>
                </div>

                <div className="flex justify-between items-start">
                  <div>
                    <strong className="text-[#18181B] block">CERT006132 - Introduction to Software Testing</strong>
                    <span className="text-[#52525B]">Software Quality Assurance & Testing verification</span>
                  </div>
                  <span className="font-mono text-xs text-[#71717A]">03 Oct 2026</span>
                </div>
              </div>
            </div>

            {/* Projects */}
            <div className="pt-6">
              <h2 className="text-xs font-mono font-bold tracking-wider text-[#71717A] uppercase mb-3">
                Projects
              </h2>

              <div className="space-y-3 text-xs sm:text-sm">
                <div>
                  <div className="flex justify-between items-center">
                    <strong className="text-[#18181B]">Honkai Star Retail Backend</strong>
                    <a
                      href="https://github.com/alfred357/Honkai_Star_Retail"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#2563EB] hover:underline font-mono text-[11px]"
                    >
                      GitHub Repo
                    </a>
                  </div>
                  <p className="text-xs text-[#52525B] mt-0.5">
                    High-concurrency e-commerce retail engine, inventory ledger & REST API
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-center">
                    <strong className="text-[#18181B]">Daytourity</strong>
                    <a
                      href="https://github.com/alfred357/Daytourity"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#2563EB] hover:underline font-mono text-[11px]"
                    >
                      GitHub Repo
                    </a>
                  </div>
                  <p className="text-xs text-[#52525B] mt-0.5">
                    Crafted an intuitive, card-based discovery UI paired with dynamic schedule filtering, visual route maps, and a streamlined 3-step checkout flow optimized for mobile browsers.
                  </p>
                </div>

                <div>
                  <div className="flex justify-between items-center">
                    <strong className="text-[#18181B]">KelapaWeb</strong>
                    <span className="font-mono text-[11px] text-[#71717A]">Live Portal</span>
                  </div>
                  <p className="text-xs text-[#52525B] mt-0.5">
                    Built a bilingual, modern web portal with Swiss-inspired typography, interactive product specification sheets, and a direct inquiry conduit for bulk B2B procurement.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#F4F4F5] flex justify-between items-center text-[11px] font-mono text-[#A1A1AA]">
              <span>Alfred Joshan Richard — Page 1</span>
              <span>BINUS Alam Sutera (2802454846)</span>
            </div>
          </div>

          {/* ================= PAGE 2 ================= */}
          <div className="bg-white p-6 sm:p-10 rounded-xl border border-[#E4E4E7] shadow-xs max-w-3xl mx-auto font-sans text-[#18181B]">
            <div className="flex justify-between items-center pb-6 border-b border-[#E4E4E7]">
              <div>
                <h2 className="font-display text-xl font-bold text-[#18181B]">
                  ALFRED JOSHAN RICHARD
                </h2>
                <span className="text-xs text-[#71717A] font-mono">
                  Curriculum Vitae — Page 2 of 2
                </span>
              </div>
              <span className="font-mono text-xs px-2.5 py-1 bg-[#F4F4F5] text-[#52525B] rounded-md border border-[#E4E4E7]">
                Verified Experience
              </span>
            </div>

            {/* Organization and Volunteer Works */}
            <div className="py-6">
              <h2 className="text-xs font-mono font-bold tracking-wider text-[#71717A] uppercase mb-4">
                Organization and Volunteer Works
              </h2>

              <div className="space-y-6 text-xs sm:text-sm">
                {/* Nippon Club Sub-Division Officer */}
                <div className="p-4 bg-[#FBFBFA] border border-[#E4E4E7] rounded-xl">
                  <div className="flex justify-between items-start">
                    <div>
                      <strong className="text-sm text-[#18181B] block">Nippon Club</strong>
                      <span className="font-semibold text-[#2563EB] text-xs">Sub-Division Officer</span>
                    </div>
                    <div className="text-right font-mono text-xs">
                      <span className="font-semibold text-red-600 block">2025 – Present</span>
                      <span className="text-[#71717A] text-[11px]">Alam Sutera, Tangerang</span>
                    </div>
                  </div>
                  <p className="text-xs text-[#52525B] mt-2">
                    Manage Community Sub-Division Boardgame, coordinating group activities, player onboarding, and campus tournaments.
                  </p>
                </div>

                {/* Nippon Club Trainee */}
                <div className="p-4 bg-[#FBFBFA] border border-[#E4E4E7] rounded-xl">
                  <div className="flex justify-between items-start">
                    <div>
                      <strong className="text-sm text-[#18181B] block">Nippon Club</strong>
                      <span className="font-medium text-[#71717A] text-xs">Trainee</span>
                    </div>
                    <div className="text-right font-mono text-xs">
                      <span className="text-[#71717A] block">2024 – 2025</span>
                      <span className="text-[#71717A] text-[11px]">Alam Sutera, Tangerang</span>
                    </div>
                  </div>
                  <p className="text-xs text-[#52525B] mt-2">
                    Trainee at Community Sub-Division Boardgame, supporting event logistics and student initiatives.
                  </p>
                </div>

                {/* TzuChi Volunteer 1 */}
                <div className="p-4 bg-[#FBFBFA] border border-[#E4E4E7] rounded-xl">
                  <div className="flex justify-between items-start">
                    <div>
                      <strong className="text-sm text-[#18181B] block">TzuChi Foundation</strong>
                      <span className="font-semibold text-emerald-600 text-xs">Volunteer</span>
                    </div>
                    <div className="text-right font-mono text-xs">
                      <span className="font-semibold text-emerald-600 block">06/2026</span>
                      <span className="text-[#71717A] text-[11px]">Alam Sutera, Tangerang</span>
                    </div>
                  </div>
                  <p className="text-xs text-[#52525B] mt-2">
                    Sorted recyclable waste (plastic, paper) to support the foundation's environmental conservation efforts.
                  </p>
                </div>

                {/* TzuChi Volunteer 2 */}
                <div className="p-4 bg-[#FBFBFA] border border-[#E4E4E7] rounded-xl">
                  <div className="flex justify-between items-start">
                    <div>
                      <strong className="text-sm text-[#18181B] block">TzuChi Foundation</strong>
                      <span className="font-semibold text-emerald-600 text-xs">Volunteer</span>
                    </div>
                    <div className="text-right font-mono text-xs">
                      <span className="font-semibold text-emerald-600 block">06/2026</span>
                      <span className="text-[#71717A] text-[11px]">Cengkareng, Jakarta Barat</span>
                    </div>
                  </div>
                  <p className="text-xs text-[#52525B] mt-2">
                    Sorted recyclable waste and reusable items, strengthening teamwork, discipline, and awareness of sustainable living.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#F4F4F5] flex justify-between items-center text-[11px] font-mono text-[#A1A1AA]">
              <span>Alfred Joshan Richard — Page 2</span>
              <span>Official Curriculum Vitae</span>
            </div>
          </div>

        </div>

        {/* Modal Bottom Footer Actions */}
        <div className="px-6 py-4 border-t border-[#E4E4E7] bg-white flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <span className="text-xs font-mono text-[#71717A]">
            File: <span className="font-semibold text-[#18181B]">Alfred_Joshan_Richard_CV.pdf</span> (2 Pages)
          </span>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={cvAssetUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 sm:flex-none px-3.5 py-2 text-xs font-medium text-[#2563EB] bg-blue-50/70 border border-blue-100 hover:bg-blue-100/70 rounded-lg transition-colors inline-flex items-center justify-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open PDF</span>
            </a>

            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-none px-4 py-2 text-xs font-medium text-[#18181B] border border-[#E4E4E7] hover:bg-[#F4F4F5] rounded-lg transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-[#71717A]" />
              <span>Print Document</span>
            </button>

            <button
              onClick={() => downloadCVPdf()}
              className="flex-1 sm:flex-none px-5 py-2 text-xs font-semibold text-white bg-[#18181B] hover:bg-[#27272A] rounded-lg transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-white" />
              <span>Download PDF File</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
