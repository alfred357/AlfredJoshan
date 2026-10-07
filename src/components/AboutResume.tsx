import React, { useState } from 'react';
import { GraduationCap, Award, BookOpen, Terminal, FileText, Check, Download } from 'lucide-react';

export const AboutResume: React.FC = () => {
  const [copiedResume, setCopiedResume] = useState(false);

  const skills = [
    { group: 'Languages', items: ['TypeScript', 'Rust', 'C++', 'Python', 'Go', 'GLSL'] },
    { group: 'Systems & Web', items: ['WebAssembly', 'Canvas 2D / WebGL', 'WebAudio API', 'React 19', 'Next.js', 'Tailwind CSS'] },
    { group: 'Design & Craft', items: ['Design Systems', 'Figma Variables', 'Micro-typography', 'WCAG AAA Accessibility', 'Pen Plotter Generative'] },
    { group: 'Tools & DevOps', items: ['Git / GitHub Actions', 'Docker', 'Linux / POSIX', 'Vite', 'AST Linters'] }
  ];

  const coursework = [
    'CS 107: Computer Organization & Systems',
    'CS 148: Intro to Computer Graphics & Imaging',
    'CS 161: Design & Analysis of Algorithms',
    'CS 147: Human-Computer Interaction Design',
    'CS 110: Principles of Computer Systems',
    'MATH 51: Linear Algebra & Multivariable Calculus'
  ];

  const experiences = [
    {
      role: 'Undergraduate Researcher',
      org: 'Visual Computing & Interface Lab',
      period: 'Sept 2025 – Present',
      description: 'Investigating high-performance browser rendering pipelines for non-linear dynamic systems and accessible design token compilation.'
    },
    {
      role: 'Frontend Design Lead',
      org: 'Campus Developer Club (Open Source)',
      period: 'Jan 2025 – Present',
      description: 'Directed the design system rewrite for university hackathon portals, reducing page load latency by 64% and standardizing typography scales.'
    },
    {
      role: 'Software Engineering Intern',
      org: 'Vector Spatial Labs',
      period: 'June 2025 – Aug 2025',
      description: 'Implemented low-latency audio spatializer prototypes using WebAudio and Canvas WebGL shaders.'
    }
  ];

  const handleCopySummary = () => {
    const text = `Josh Chen - B.S. Computer Science & HCI (Class of 2027)\nFocus: High-Performance Web Graphics, Design Systems, WebAssembly\nGitHub: https://github.com\nEmail: contact@joshchen.dev`;
    navigator.clipboard.writeText(text);
    setCopiedResume(true);
    setTimeout(() => setCopiedResume(false), 2000);
  };

  return (
    <section id="about" className="py-20 md:py-28 max-w-7xl mx-auto px-6 border-t border-[#E4E4E7]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#71717A] mb-2 tracking-tight">
            <span>Profile</span>
            <span aria-hidden="true">/</span>
            <span>Education</span>
            <span aria-hidden="true">/</span>
            <span className="text-[#18181B] font-medium">Class of 2027</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#18181B] text-balance">
            Undergraduate Computer Science & Design Background
          </h2>
        </div>

        <button
          onClick={handleCopySummary}
          className="px-4 py-2 text-xs font-medium text-[#18181B] border border-[#E4E4E7] rounded-lg hover:bg-white hover:border-[#18181B] transition-colors inline-flex items-center gap-1.5 self-start md:self-auto"
        >
          {copiedResume ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <FileText className="w-3.5 h-3.5" />}
          <span>{copiedResume ? 'Summary Copied!' : 'Copy Quick Bio'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Education & Experience */}
        <div className="lg:col-span-7 flex flex-col gap-10">
          {/* Education Card */}
          <div className="bg-white border border-[#E4E4E7] rounded-2xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 bg-[#F4F4F5] rounded-xl text-[#18181B]">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display text-lg font-bold text-[#18181B]">
                  Bachelor of Science in Computer Science
                </h3>
                <p className="text-xs text-[#71717A]">
                  Concentration in Human-Computer Interaction & Graphics · Expected May 2027
                </p>
              </div>
            </div>

            <p className="text-sm text-[#52525B] leading-relaxed mb-6">
              Studying at the intersection of systems architecture, computer graphics, and design theory. Focused on building software where algorithms feel tangible, responsive, and respectful of human attention.
            </p>

            <div className="border-t border-[#F4F4F5] pt-4">
              <h4 className="text-xs font-mono uppercase tracking-wider text-[#71717A] mb-3">
                Selected Undergraduate Coursework
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#27272A] font-mono">
                {coursework.map((course, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-[#18181B]"></span>
                    <span>{course}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Experience Timeline */}
          <div className="bg-white border border-[#E4E4E7] rounded-2xl p-6 md:p-8">
            <h3 className="font-display text-lg font-bold text-[#18181B] mb-6 flex items-center gap-2">
              <Award className="w-4 h-4 text-[#2563EB]" />
              <span>Academic & Industry Experience</span>
            </h3>

            <div className="space-y-6">
              {experiences.map((exp, i) => (
                <div key={i} className="relative pl-6 before:absolute before:left-0 before:top-2 before:bottom-0 before:w-px before:bg-[#E4E4E7] last:before:hidden">
                  <span className="absolute left-[-3px] top-2 w-2 h-2 rounded-full bg-[#18181B]"></span>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                    <h4 className="text-sm font-bold text-[#18181B]">{exp.role}</h4>
                    <span className="text-xs font-mono text-[#71717A]">{exp.period}</span>
                  </div>
                  <p className="text-xs font-medium text-[#2563EB] mb-2">{exp.org}</p>
                  <p className="text-xs text-[#52525B] leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Skills Matrix & Principles */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          {/* Technical Toolchain */}
          <div className="bg-white border border-[#E4E4E7] rounded-2xl p-6 md:p-8">
            <h3 className="font-display text-lg font-bold text-[#18181B] mb-6 flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#18181B]" />
              <span>Technical & Design Toolchain</span>
            </h3>

            <div className="space-y-5">
              {skills.map((skillGroup, idx) => (
                <div key={idx}>
                  <p className="text-xs font-mono text-[#71717A] mb-2">{skillGroup.group}</p>
                  <p className="text-sm font-mono text-[#18181B] leading-relaxed">
                    {skillGroup.items.join(' · ')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Engineering & Design Philosophy */}
          <div className="bg-[#F4F4F5] border border-[#E4E4E7] rounded-2xl p-6 md:p-8">
            <h3 className="font-display text-base font-bold text-[#18181B] mb-3">
              Core Design & Engineering Constitution
            </h3>
            <ul className="space-y-3 text-xs text-[#52525B] leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="font-mono text-[#18181B] font-bold">01.</span>
                <span><strong>Mathematical Clarity:</strong> An interface should never obscure the underlying physical or logical model with decorative gimmicks.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono text-[#18181B] font-bold">02.</span>
                <span><strong>Cache & Frame Discipline:</strong> Respect user hardware. 60 FPS is not a suggestion; it is a fundamental accessibility criterion.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono text-[#18181B] font-bold">03.</span>
                <span><strong>Typographic Restraint:</strong> Quiet metadata with clean separators, disciplined type scales, and zero visual clutter.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
