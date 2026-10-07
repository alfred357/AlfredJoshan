import React from 'react';
import { ArrowDown, Code2, Sparkles, Terminal } from 'lucide-react';

interface HeroProps {
  onExploreWork: () => void;
  onExploreJournal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreWork, onExploreJournal }) => {
  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 border-b border-[#E4E4E7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Typographic Focus & Mission */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Unboxed Metadata Header (No static pills) */}
            <div className="flex items-center gap-2 text-xs font-mono text-[#71717A] mb-5 tracking-tight">
              <span>B.S. Computer Science & HCI</span>
              <span aria-hidden="true">·</span>
              <span>Undergraduate '27</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#2563EB] font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse"></span>
                Open for Summer '27 Internships
              </span>
            </div>

            {/* Display Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#18181B] leading-[1.08] text-balance mb-6">
              Designing tactile interfaces powered by <span className="font-serif italic font-normal text-[#27272A]">algorithmic rigor</span>.
            </h1>

            {/* Subtitle / Bio */}
            <p className="text-base sm:text-lg text-[#52525B] leading-relaxed max-w-2xl mb-8">
              I am an undergraduate computer science student exploring the intersection of distributed systems, high-density design architectures, and creative computing. I build tools where mathematical precision meets Swiss typographic discipline.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <button
                onClick={onExploreWork}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-[#18181B] rounded-lg hover:bg-[#27272A] transition-colors inline-flex items-center gap-2"
              >
                <span>Explore Selected Work</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreJournal}
                className="px-5 py-2.5 text-sm font-semibold text-[#18181B] hover:text-[#000000] border border-[#E4E4E7] bg-white rounded-lg hover:border-[#D4D4D8] transition-colors inline-flex items-center gap-2"
              >
                <Code2 className="w-4 h-4 text-[#71717A]" />
                <span>Read Technical Journal</span>
              </button>
            </div>

            {/* Adjacent Quantitative Proof Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#E4E4E7] text-left">
              <div>
                <p className="font-mono text-2xl font-semibold text-[#18181B] tabular-nums">148+</p>
                <p className="text-xs text-[#71717A] mt-0.5">Design Tokens Shipped</p>
              </div>
              <div>
                <p className="font-mono text-2xl font-semibold text-[#18181B] tabular-nums">4.2x</p>
                <p className="text-xs text-[#71717A] mt-0.5">WASM Speedup Achieved</p>
              </div>
              <div>
                <p className="font-mono text-2xl font-semibold text-[#18181B] tabular-nums">100%</p>
                <p className="text-xs text-[#71717A] mt-0.5">WCAG AAA Compliance</p>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[#E4E4E7] bg-[#F4F4F5] shadow-xs group">
              <img
                src="/src/assets/images/hero_student_creator_1791107482069.jpg"
                alt="Josh Chen in his studio workstation with code and sketches"
                referrerPolicy="no-referrer"
                className="w-full h-auto aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />

              {/* Quiet caption bar */}
              <div className="p-4 bg-white/95 backdrop-blur-xs border-t border-[#E4E4E7] flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-[#18181B]">Josh Chen</p>
                  <p className="text-xs text-[#71717A]">CS & HCI Student, Stanford / UC Berkeley</p>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#52525B]">
                  <Terminal className="w-3.5 h-3.5 text-[#2563EB]" />
                  <span>v2026.10</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Editorial Marquee Ribbon as Section Divider */}
      <div className="mt-14 py-3 bg-[#F4F4F5] border-y border-[#E4E4E7] overflow-hidden whitespace-nowrap">
        <div className="inline-flex gap-8 text-xs font-mono tracking-wider uppercase text-[#71717A]">
          <span>Design Systems & Tokens</span>
          <span aria-hidden="true">·</span>
          <span>WebAssembly & Performance</span>
          <span aria-hidden="true">·</span>
          <span>Computer Graphics & Canvas</span>
          <span aria-hidden="true">·</span>
          <span>HCI & Accessibility</span>
          <span aria-hidden="true">·</span>
          <span>Differential Equations In Browser</span>
          <span aria-hidden="true">·</span>
          <span>Swiss Typography & Grid Systems</span>
          <span aria-hidden="true">·</span>
          <span>Design Systems & Tokens</span>
          <span aria-hidden="true">·</span>
          <span>WebAssembly & Performance</span>
        </div>
      </div>
    </section>
  );
};
