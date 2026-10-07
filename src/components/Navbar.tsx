import React, { useState } from 'react';
import { ArrowUpRight, Menu, X, User, Download } from 'lucide-react';
import { downloadCVPdf } from '../utils/downloadCV';

interface NavbarProps {
  onOpenContact: () => void;
  onOpenCV: () => void;
  profilePhoto: string | null;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact, onOpenCV, profilePhoto }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Exactly the 4 requested sections: About, Project, Background, Contact
  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Background', href: '#background' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FBFBFA]/90 backdrop-blur-md border-b border-[#E4E4E7]">
      <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
        {/* Zone 1: Wordmark with Avatar */}
        <a 
          href="#about" 
          className="flex items-center gap-3 group"
        >
          {profilePhoto ? (
            <img
              src={profilePhoto}
              alt="Alfred Joshan Richard"
              className="w-9 h-9 rounded-full object-cover object-top border border-[#E4E4E7] shadow-xs group-hover:border-[#18181B] transition-colors"
            />
          ) : (
            <div className="w-9 h-9 rounded-full bg-[#18181B] text-white flex items-center justify-center text-xs font-mono font-bold shadow-xs">
              AR
            </div>
          )}
          <span className="font-display text-lg sm:text-xl font-bold tracking-tight text-[#18181B] group-hover:opacity-80 transition-opacity">
            Alfred Joshan Richard
          </span>
        </a>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#52525B]">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-[#18181B] transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-[#18181B] after:origin-bottom-right after:scale-x-0 hover:after:scale-x-100 hover:after:origin-bottom-left after:transition-transform"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary action - Download CV & Get in Touch */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              downloadCVPdf();
              onOpenCV();
            }}
            className="px-3.5 py-2 text-xs font-semibold text-[#18181B] hover:text-[#000000] border border-[#E4E4E7] bg-white rounded-lg hover:border-[#18181B] shadow-xs transition-colors whitespace-nowrap inline-flex items-center gap-1.5 cursor-pointer"
            title="Download & View Alfred Joshan Richard's Curriculum Vitae"
          >
            <Download className="w-3.5 h-3.5 text-[#2563EB]" />
            <span className="hidden sm:inline">Download CV</span>
            <span className="sm:hidden">CV</span>
          </button>

          <button
            onClick={onOpenContact}
            className="px-4 py-2 text-xs font-semibold text-[#FFFFFF] bg-[#18181B] rounded-lg hover:bg-[#27272A] transition-colors whitespace-nowrap inline-flex items-center gap-1.5 cursor-pointer"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#52525B] hover:text-[#18181B]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E4E4E7] bg-[#FBFBFA] px-6 py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-[#52525B] hover:text-[#18181B] py-1"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              downloadCVPdf();
              onOpenCV();
            }}
            className="text-left text-xs font-semibold text-[#18181B] py-1 inline-flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>Download CV (PDF)</span>
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenContact();
            }}
            className="text-left text-xs font-semibold text-[#2563EB] py-1 inline-flex items-center gap-1.5"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </header>
  );
};
