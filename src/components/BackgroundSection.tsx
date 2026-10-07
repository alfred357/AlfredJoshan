import React, { useState } from 'react';
import { 
  GraduationCap, 
  School,
  Award, 
  Terminal, 
  FileText, 
  Check, 
  ExternalLink, 
  Code2, 
  Users, 
  HeartHandshake,
  Download,
  CheckCircle2
} from 'lucide-react';
import { downloadCVPdf, cvAssetUrl } from '../utils/downloadCV';

interface BackgroundSectionProps {
  onOpenCV?: () => void;
}

export const BackgroundSection: React.FC<BackgroundSectionProps> = ({ onOpenCV }) => {
  const [copiedSummary, setCopiedSummary] = useState(false);

  const academicData = {
    name: 'Alfred Joshan Richard',
    studentId: '2802454846',
    degree: 'Undergraduate, Computer Science',
    university: 'BINUS University',
    campus: 'Binus Alam Sutera',
    period: '2024 – 2028',
    streaming: 'Computer Science',
    gpa: '3.54 / 4.00',
    highSchool: 'SMA Xaverius 2 Bandar Lampung',
    highSchoolPeriod: '2021 – 2024',
    highSchoolLocation: 'Bandar Lampung',
    portfolioDocUrl: 'https://docs.google.com/document/d/1343kaFW--BMKV_SdtQ6Hpb2bET9kQBwauodj5qzNAJA/edit?usp=sharing'
  };

  const studentSkills = {
    computer: [
      { name: 'Java', score: '6/10', pct: 60 },
      { name: 'C++', score: '6/10', pct: 60 },
      { name: 'Python', score: '6/10', pct: 60 }
    ],
    technical: [
      { name: 'Fix Code', score: '6/10', pct: 60 }
    ],
    soft: [
      { name: 'Teamwork', score: '8/10', category: 'Organizational Skills', pct: 80 },
      { name: 'English', score: '8/10', category: 'Language Skills', pct: 80 },
      { name: 'Adaptability', score: '7/10', category: 'Project Skills', pct: 70 },
      { name: 'Leading', score: '7/10', category: 'Leadership Skills', pct: 70 },
      { name: 'Presentation', score: '5/10', category: 'Communication Skills', pct: 50 }
    ]
  };

  const certificates = [
    {
      title: 'Committee member of Liberation Festival',
      subtitle: 'Tomoro event volunteer',
      date: '9 May 2026'
    },
    {
      title: 'CERT006132 - Introduction to Software Testing',
      subtitle: 'Software Testing & Quality Assurance Verification',
      date: '03 October 2026'
    }
  ];

  const organizationWorks = [
    {
      org: 'Nippon Club',
      role: 'Sub-Division Officer',
      period: '2025 – Present',
      location: 'Alam Sutera, Tangerang',
      description: 'Manage Community Sub-Division Boardgame',
      highlight: true
    },
    {
      org: 'Nippon Club',
      role: 'Trainee',
      period: '2024 – 2025',
      location: 'Alam Sutera, Tangerang',
      description: 'Trainee at Community Sub-Division Boardgame',
      highlight: false
    },
    {
      org: 'TzuChi',
      role: 'Volunteer',
      period: '06/2026',
      location: 'Alam Sutera, Tangerang',
      description: "Sorted recyclable waste (plastic, paper) to support the foundation's environmental conservation efforts",
      highlight: false
    },
    {
      org: 'TzuChi',
      role: 'Volunteer',
      period: '06/2026',
      location: 'Cengkareng, Jakarta Barat',
      description: 'Sorted recyclable waste and reusable items, strengthening teamwork, discipline, and awareness of sustainable living.',
      highlight: false
    }
  ];

  const handleCopySummary = () => {
    const text = `Alfred Joshan Richard
Academic Information:
- BINUS University (2024 – 2028, Binus Alam Sutera) - Undergraduate, Computer Science | GPA: 3.54
- SMA Xaverius 2 Bandar Lampung (2021 – 2024, Bandar Lampung) - Senior High School
Student Skills:
- Computer Skills: Java (6), C++ (6), Python (6)
- Technical Skills: Fix Code (6)
- Soft Skills: Teamwork (8), English (8), Adaptability (7), Leading (7), Presentation (5)
Certificates:
- Committee member of Liberation Festival (Tomoro event volunteer, 9 May 2026)
- CERT006132 - Introduction to Software Testing (03 October 2026)
Organization and Volunteer Works:
- Nippon Club: Sub-Division Officer (2025–Present) & Trainee (2024–2025) - Community Sub-Division Boardgame
- TzuChi Foundation: Volunteer (06/2026) - Environmental Conservation & Waste Sorting
Contact: alfred.richard@binus.ac.id | +62 882-7402-5001`;

    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  return (
    <section id="background" className="py-20 md:py-28 max-w-7xl mx-auto px-6 border-t border-[#E4E4E7]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#71717A] mb-2 tracking-tight">
            <span>Curriculum Vitae</span>
            <span aria-hidden="true">/</span>
            <span>Official Records</span>
            <span aria-hidden="true">/</span>
            <span className="text-[#18181B] font-medium">Alfred Joshan Richard</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#18181B] text-balance">
            Academic Information, Skills & Verified Organization
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              downloadCVPdf();
              onOpenCV?.();
            }}
            className="px-4 py-2 text-xs font-semibold text-white bg-[#18181B] hover:bg-[#27272A] rounded-lg shadow-xs transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            title="Download & View Official Curriculum Vitae"
          >
            <Download className="w-3.5 h-3.5 text-white" />
            <span>Download CV (PDF)</span>
          </button>

          <a
            href={cvAssetUrl}
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-2 text-xs font-medium text-[#2563EB] hover:text-[#1D4ED8] bg-blue-50/70 border border-blue-100 rounded-lg transition-colors inline-flex items-center gap-1.5"
          >
            <span>Open PDF</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={handleCopySummary}
            className="px-3.5 py-2 text-xs font-medium text-[#18181B] border border-[#E4E4E7] rounded-lg hover:bg-white hover:border-[#18181B] transition-colors inline-flex items-center gap-1.5 cursor-pointer"
          >
            {copiedSummary ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <FileText className="w-3.5 h-3.5" />}
            <span>{copiedSummary ? 'Copied CV Bio!' : 'Copy Summary'}</span>
          </button>
        </div>
      </div>

      {/* Two-Column Grid matching exactly Page 1 & Page 2 of the CV */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* ================= LEFT COLUMN: Academic & Skills (From CV Page 1) ================= */}
        <div className="space-y-8">
          
          {/* 1. Academic Information Card */}
          <div className="bg-white border border-[#E4E4E7] rounded-2xl p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-3 pb-6 border-b border-[#F4F4F5]">
              <div className="p-3 bg-[#F4F4F5] rounded-xl text-[#18181B]">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-[#18181B]">
                  Academic Information
                </h3>
                <p className="text-xs text-[#71717A]">
                  Formal education credentials recorded in official CV
                </p>
              </div>
            </div>

            <div className="pt-6 space-y-6">
              {/* Undergraduate - BINUS */}
              <div className="p-4 bg-[#FBFBFA] border border-[#E4E4E7] rounded-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <div>
                    <span className="font-display text-base font-bold text-[#18181B] block">
                      Undergraduate, Computer Science
                    </span>
                    <span className="text-xs text-[#52525B] font-medium">
                      BINUS University · {academicData.campus}
                    </span>
                  </div>
                  <span className="font-mono text-xs font-semibold text-[#18181B] bg-white border border-[#E4E4E7] px-2.5 py-1 rounded self-start sm:self-auto">
                    {academicData.period}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-[#71717A] border-t border-[#E4E4E7]/60">
                  <span>Streaming: <strong className="text-[#18181B]">{academicData.streaming}</strong></span>
                  <span>•</span>
                  <span>Current GPA: <strong className="text-[#2563EB] text-sm">{academicData.gpa}</strong></span>
                </div>
              </div>

              {/* Senior High School - SMA Xaverius 2 */}
              <div className="p-4 bg-[#FBFBFA] border border-[#E4E4E7] rounded-xl">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                  <div>
                    <span className="font-display text-base font-bold text-[#18181B] block">
                      Senior High School
                    </span>
                    <span className="text-xs text-[#52525B] font-medium">
                      {academicData.highSchool}
                    </span>
                  </div>
                  <span className="font-mono text-xs font-semibold text-[#18181B] bg-white border border-[#E4E4E7] px-2.5 py-1 rounded self-start sm:self-auto">
                    {academicData.highSchoolPeriod}
                  </span>
                </div>
                <div className="pt-2 text-xs font-mono text-[#71717A] border-t border-[#E4E4E7]/60">
                  <span>Location: <strong className="text-[#18181B]">{academicData.highSchoolLocation}</strong></span>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Student Skill Card */}
          <div className="bg-white border border-[#E4E4E7] rounded-2xl p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-3 pb-6 border-b border-[#F4F4F5]">
              <div className="p-3 bg-blue-50 rounded-xl text-[#2563EB]">
                <Terminal className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-[#18181B]">
                  Student Skill
                </h3>
                <p className="text-xs text-[#71717A]">
                  Verified competency scores from CV Page 1
                </p>
              </div>
            </div>

            <div className="pt-6 space-y-6">
              {/* Computer & Technical Skills */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#71717A] mb-3">
                  Computer & Technical Skills
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {studentSkills.computer.map((sk) => (
                    <div key={sk.name} className="p-3 bg-[#FBFBFA] border border-[#E4E4E7] rounded-xl text-center">
                      <span className="font-display text-sm font-bold text-[#18181B] block">{sk.name}</span>
                      <span className="font-mono text-xs font-bold text-[#2563EB] mt-1 block">{sk.score}</span>
                    </div>
                  ))}
                  {studentSkills.technical.map((sk) => (
                    <div key={sk.name} className="p-3 bg-[#FBFBFA] border border-[#E4E4E7] rounded-xl text-center">
                      <span className="font-display text-sm font-bold text-[#18181B] block">{sk.name}</span>
                      <span className="font-mono text-xs font-bold text-[#2563EB] mt-1 block">{sk.score}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Soft, Language & Leadership Skills */}
              <div>
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#71717A] mb-3">
                  Communication, Language & Leadership Skills
                </h4>
                <div className="space-y-3">
                  {studentSkills.soft.map((sk) => (
                    <div key={sk.name} className="p-3 bg-[#FBFBFA] border border-[#E4E4E7] rounded-xl flex items-center justify-between gap-4">
                      <div>
                        <span className="font-display text-sm font-bold text-[#18181B]">{sk.name}</span>
                        <span className="text-[11px] font-mono text-[#71717A] ml-2">({sk.category})</span>
                      </div>
                      <span className="font-mono text-xs font-bold px-2 py-0.5 bg-white border border-[#E4E4E7] text-[#18181B] rounded">
                        Score: {sk.score}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ================= RIGHT COLUMN: Organization, Volunteers & Certificates (From CV Page 1 & 2) ================= */}
        <div className="space-y-8">
          
          {/* 3. Organization and Volunteer Works (CV Page 2) */}
          <div className="bg-white border border-[#E4E4E7] rounded-2xl p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-3 pb-6 border-b border-[#F4F4F5]">
              <div className="p-3 bg-red-50 text-red-600 rounded-xl">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-[#18181B]">
                  Organization and Volunteer Works
                </h3>
                <p className="text-xs text-[#71717A]">
                  Student leadership & volunteer service from CV Page 2
                </p>
              </div>
            </div>

            <div className="pt-6 space-y-4">
              {organizationWorks.map((item, idx) => (
                <div 
                  key={idx} 
                  className={`p-4 rounded-xl border transition-colors ${
                    item.highlight 
                      ? 'bg-red-50/40 border-red-200' 
                      : 'bg-[#FBFBFA] border-[#E4E4E7]'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-display text-base font-bold text-[#18181B]">
                        {item.org}
                      </span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded bg-white border border-[#E4E4E7] text-[#2563EB]">
                        {item.role}
                      </span>
                    </div>
                    <span className="font-mono text-xs font-bold text-[#71717A] self-start sm:self-auto">
                      {item.period}
                    </span>
                  </div>

                  <p className="text-xs text-[#52525B] leading-relaxed mb-2">
                    {item.description}
                  </p>

                  <div className="text-[11px] font-mono text-[#71717A] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#A1A1AA]"></span>
                    <span>{item.location}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4. Certificates (CV Page 1) */}
          <div className="bg-white border border-[#E4E4E7] rounded-2xl p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-3 pb-6 border-b border-[#F4F4F5]">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-[#18181B]">
                  Certificates
                </h3>
                <p className="text-xs text-[#71717A]">
                  Verified credentials from CV Page 1
                </p>
              </div>
            </div>

            <div className="pt-6 space-y-4">
              {certificates.map((cert, idx) => (
                <div key={idx} className="p-4 bg-[#FBFBFA] border border-[#E4E4E7] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="font-display text-sm font-bold text-[#18181B] block">
                      {cert.title}
                    </span>
                    <span className="text-xs text-[#52525B] mt-0.5 block">
                      {cert.subtitle}
                    </span>
                  </div>
                  <span className="font-mono text-xs font-semibold px-2.5 py-1 bg-white border border-[#E4E4E7] text-[#18181B] rounded self-start sm:self-center whitespace-nowrap">
                    {cert.date}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick CV Download Footer Callout */}
          <div className="p-5 bg-gradient-to-r from-[#18181B] to-[#27272A] rounded-2xl text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#A1A1AA] block">
                Official Document Available
              </span>
              <p className="font-display text-sm font-bold mt-0.5">
                Download Alfred Joshan Richard's 2-Page CV (PDF)
              </p>
            </div>
            <button
              onClick={() => {
                downloadCVPdf();
                onOpenCV?.();
              }}
              className="w-full sm:w-auto px-4 py-2 bg-white text-[#18181B] hover:bg-[#F4F4F5] rounded-xl text-xs font-bold inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
