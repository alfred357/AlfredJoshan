import React from 'react';
import { ArrowUp } from 'lucide-react';
import { downloadCVPdf } from '../utils/downloadCV';

interface FooterProps {
  onOpenCV?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenCV }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#E4E4E7] bg-white py-12 text-[#71717A]">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <p className="text-xs font-mono text-[#18181B] font-semibold">
            Alfred Joshan Richard — Personal Portfolio
          </p>
          <p className="text-xs text-[#71717A] mt-1">
            Computer Science Undergraduate · BINUS University @Alam Sutera (B2028)
          </p>
        </div>

        <div className="flex items-center gap-6 text-xs font-mono">
          <a href="#about" className="hover:text-[#18181B] transition-colors">About</a>
          <a href="#projects" className="hover:text-[#18181B] transition-colors">Projects</a>
          <a href="#background" className="hover:text-[#18181B] transition-colors">Background</a>
          <a href="#contact" className="hover:text-[#18181B] transition-colors">Contact</a>
          <button
            onClick={() => {
              downloadCVPdf();
              onOpenCV?.();
            }}
            className="hover:text-[#18181B] transition-colors cursor-pointer text-[#2563EB] font-medium"
          >
            Download CV
          </button>

          <button
            onClick={scrollToTop}
            className="p-2 text-[#71717A] hover:text-[#18181B] hover:bg-[#F4F4F5] rounded-lg transition-colors ml-2"
            title="Back to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
