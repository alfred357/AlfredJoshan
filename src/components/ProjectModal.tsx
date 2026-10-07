import React, { useEffect, useState } from 'react';
import { Project } from '../types';
import { X, ArrowUpRight, Github, ExternalLink, Copy, Check, Info } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose
}) => {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [project, onClose]);

  if (!project) return null;

  const copyToken = (value: string, name: string) => {
    navigator.clipboard.writeText(value);
    setCopiedToken(name);
    setTimeout(() => setCopiedToken(null), 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-2xl border border-[#E4E4E7] shadow-2xl my-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with Close button */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/95 backdrop-blur-md border-b border-[#E4E4E7]">
          <div className="flex items-center gap-2 text-xs font-mono text-[#71717A]">
            <span>{project.category}</span>
            <span aria-hidden="true">·</span>
            <span>{project.year}</span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#71717A] hover:text-[#18181B] hover:bg-[#F4F4F5] rounded-lg transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-10 space-y-10 max-h-[82vh] overflow-y-auto">
          
          {/* Title Area */}
          <div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#18181B] mb-3">
              {project.title}
            </h1>
            <p className="text-base sm:text-lg text-[#52525B] leading-relaxed">
              {project.subtitle}
            </p>

            {/* Context & Role metadata */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 pt-4 mt-4 border-t border-[#F4F4F5] text-xs font-mono text-[#71717A]">
              <div>
                <span className="text-[#A1A1AA]">Role: </span>
                <span className="text-[#18181B] font-medium">{project.role}</span>
              </div>
              <div>
                <span className="text-[#A1A1AA]">Context: </span>
                <span className="text-[#18181B] font-medium">{project.context}</span>
              </div>
            </div>
          </div>

          {/* Cover Media */}
          <div className="rounded-xl overflow-hidden border border-[#E4E4E7] bg-[#F4F4F5]">
            <img
              src={project.coverImage}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-auto aspect-[16/10] object-cover"
            />
          </div>

          {/* Quantitative Proof Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-[#FBFBFA] border border-[#E4E4E7] rounded-xl">
            {project.metrics.map((m, idx) => (
              <div key={idx}>
                <p className="font-mono text-xl sm:text-2xl font-bold text-[#18181B] tabular-nums">
                  {m.value}
                </p>
                <p className="text-xs text-[#71717A] mt-0.5">{m.label}</p>
              </div>
            ))}
          </div>

          {/* Git Source Notice */}
          <div className="p-4 bg-[#F4F4F5] border border-[#E4E4E7] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono text-[#52525B]">
            <div className="flex items-center gap-2">
              <Github className="w-4 h-4 text-[#18181B]" />
              <span>Git Repository: {project.githubUrl || 'Available on GitHub'}</span>
            </div>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 text-xs font-semibold text-white bg-[#18181B] hover:bg-[#27272A] rounded-lg transition-colors inline-flex items-center gap-1.5 self-start sm:self-auto"
              >
                <span>View Source on GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          {/* Problem & Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-red-50/40 border border-red-100 rounded-xl">
              <h3 className="font-mono text-xs uppercase tracking-wider text-red-700 font-semibold mb-2">
                The Challenge
              </h3>
              <p className="text-xs sm:text-sm text-[#3F3F46] leading-relaxed">
                {project.problemStatement}
              </p>
            </div>

            <div className="p-6 bg-blue-50/40 border border-blue-100 rounded-xl">
              <h3 className="font-mono text-xs uppercase tracking-wider text-blue-700 font-semibold mb-2">
                Design & Engineering Approach
              </h3>
              <p className="text-xs sm:text-sm text-[#3F3F46] leading-relaxed">
                {project.solutionOverview}
              </p>
            </div>
          </div>

          {/* Design Token Inspector */}
          <div className="border border-[#E4E4E7] rounded-xl p-6 bg-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-display text-base font-bold text-[#18181B]">
                  Design Tokens & Variables
                </h3>
                <p className="text-xs text-[#71717A]">
                  Compiled system constants enforcing mathematical spatial and color consistency.
                </p>
              </div>
              <span className="text-xs font-mono text-[#71717A]">
                {project.designTokens.length} Tokens
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.designTokens.map((token) => (
                <div
                  key={token.name}
                  onClick={() => copyToken(token.value, token.name)}
                  className="flex items-center justify-between p-3 bg-[#FBFBFA] border border-[#E4E4E7] rounded-lg hover:border-[#18181B] cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    {token.previewType === 'color' && (
                      <div
                        className="w-5 h-5 rounded border border-[#E4E4E7] shrink-0"
                        style={{ backgroundColor: token.value }}
                      />
                    )}
                    <div>
                      <p className="font-mono text-xs font-semibold text-[#18181B]">
                        {token.name}
                      </p>
                      <p className="text-[11px] text-[#71717A] truncate max-w-[200px]">
                        {token.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-mono text-[#52525B]">
                    <span className="group-hover:text-[#18181B]">{token.value}</span>
                    {copiedToken === token.name ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Deep Case Study Sections */}
          <div className="space-y-8">
            {project.sections.map((section, idx) => (
              <div key={idx} className="border-t border-[#F4F4F5] pt-6">
                <h3 className="font-display text-xl font-bold text-[#18181B] mb-3">
                  {section.title}
                </h3>
                <p className="text-sm text-[#52525B] leading-relaxed mb-4">
                  {section.content}
                </p>
                {section.keyPoints && section.keyPoints.length > 0 && (
                  <ul className="space-y-2">
                    {section.keyPoints.map((point, pIdx) => (
                      <li key={pIdx} className="text-xs text-[#3F3F46] flex items-start gap-2">
                        <span className="text-[#2563EB] font-bold">✓</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Actions */}
          <div className="pt-6 border-t border-[#E4E4E7] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 text-xs font-semibold text-[#18181B] hover:text-black border border-[#E4E4E7] rounded-lg hover:border-[#18181B] transition-colors inline-flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Repository</span>
                </a>
              )}
            </div>

            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-white bg-[#18181B] hover:bg-[#27272A] rounded-lg transition-colors"
            >
              Close Case Study
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
