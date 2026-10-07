import React, { useState } from 'react';
import { Project, ProjectCategory } from '../types';
import { ArrowUpRight, Github, ExternalLink, Code2 } from 'lucide-react';

interface ProjectsSectionProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  onSelectProject
}) => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: ProjectCategory[] = [
    'All',
    'Backend & APIs',
    'Web & Mobile Apps',
    'Full-Stack Platforms'
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = activeCategory === 'All' || project.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="projects" className="py-20 md:py-28 max-w-7xl mx-auto px-6">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#71717A] mb-2 tracking-tight">
            <span>Portfolio</span>
            <span aria-hidden="true">/</span>
            <span>Featured Repositories</span>
            <span aria-hidden="true">/</span>
            <span className="text-[#18181B] font-medium">{filteredProjects.length} Projects</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#18181B] text-balance">
            Selected Software Engineering & Design Work
          </h2>
        </div>

        {/* Search input with clean single line */}
        <div className="w-full md:w-72">
          <input
            type="text"
            placeholder="Search projects, tags, or stack..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3.5 py-2 text-xs bg-white border border-[#E4E4E7] rounded-lg text-[#18181B] placeholder-[#A1A1AA] focus:outline-none focus:border-[#18181B] transition-colors"
          />
        </div>
      </div>

      {/* Interactive Category Segmented Control */}
      <div className="flex items-center gap-1.5 p-1 bg-[#F4F4F5] rounded-xl mb-10 overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeCategory === category
                ? 'bg-white text-[#18181B] shadow-xs font-semibold'
                : 'text-[#71717A] hover:text-[#18181B]'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Bento Grid Layout */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-[#E4E4E7] rounded-2xl">
          <p className="text-sm text-[#71717A]">No projects match your current filter.</p>
          <button
            onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
            className="mt-3 text-xs font-medium text-[#2563EB] hover:underline"
          >
            Reset all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => {
            return (
              <div
                key={project.id}
                className="group flex flex-col justify-between bg-white border border-[#E4E4E7] rounded-2xl overflow-hidden hover:border-[#18181B] transition-all duration-300 shadow-xs hover:shadow-md"
              >
                {/* Media Container with fallback */}
                <div 
                  onClick={() => onSelectProject(project)}
                  className="relative aspect-[16/10] overflow-hidden bg-[#F4F4F5] cursor-pointer"
                >
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                    <span className="text-xs font-medium text-white inline-flex items-center gap-1.5 drop-shadow-sm">
                      <span>Inspect Case Study & Architecture</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    {/* Unboxed Metadata Line (No static pills) */}
                    <div className="flex items-center gap-2 text-xs font-mono text-[#71717A] mb-3">
                      <span className="text-[#2563EB] font-medium">{project.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.year}</span>
                    </div>

                    {/* Headline */}
                    <h3 
                      onClick={() => onSelectProject(project)}
                      className="font-display text-xl font-bold tracking-tight text-[#18181B] group-hover:text-[#2563EB] transition-colors cursor-pointer mb-2"
                    >
                      {project.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-xs text-[#52525B] leading-relaxed mb-6 line-clamp-3">
                      {project.subtitle}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-x-2 gap-y-1 text-[11px] font-mono text-[#71717A] mb-6">
                      {project.tags.slice(0, 3).map((t, idx) => (
                        <span key={idx}>#{t}</span>
                      ))}
                    </div>
                  </div>

                  {/* Actions & Git Link */}
                  <div className="pt-4 border-t border-[#F4F4F5] flex items-center justify-between gap-3">
                    {project.githubUrl ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 text-xs font-mono text-[#18181B] hover:text-white bg-[#F4F4F5] hover:bg-[#18181B] rounded-lg transition-colors inline-flex items-center gap-1.5"
                        title="Open GitHub source repository"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github className="w-3.5 h-3.5" />
                        <span>Source Code</span>
                      </a>
                    ) : (
                      <span className="text-xs font-mono text-[#71717A]">
                        Source linking soon
                      </span>
                    )}

                    <button
                      onClick={() => onSelectProject(project)}
                      className="px-3 py-1.5 text-xs font-semibold text-[#18181B] hover:text-[#2563EB] inline-flex items-center gap-1 transition-colors"
                    >
                      <span>Case Study</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
