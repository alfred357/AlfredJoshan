import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  ArrowUpRight, 
  FileText,
  Download
} from 'lucide-react';
import { downloadCVPdf } from '../utils/downloadCV';

interface ContactSectionProps {
  onOpenCV?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onOpenCV }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const contactDetails = {
    academicEmail: 'alfred.richard@binus.ac.id',
    personalEmail: 'joshanrichard230@gmail.com',
    phone: '+62 882-7402-5001',
    whatsappNumber: '6288274025001',
    address: 'Griya Madu Permata, Ruby Block No. 17, Alam Sutera, Tangerang, Indonesia',
    linkedinUrl: 'https://www.linkedin.com/in/alfred-richard-71a340326',
    githubUrl: 'https://github.com/alfred357',
    portfolioDocUrl: 'https://docs.google.com/document/d/1343kaFW--BMKV_SdtQ6Hpb2bET9kQBwauodj5qzNAJA/edit?usp=sharing'
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <section id="contact" className="py-20 md:py-28 max-w-7xl mx-auto px-6 border-t border-[#E4E4E7]">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#71717A] mb-3 tracking-tight">
            <span>Contact</span>
            <span aria-hidden="true">/</span>
            <span>Direct Channels</span>
            <span aria-hidden="true">/</span>
            <span className="text-[#18181B] font-medium">Alfred Joshan Richard</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#18181B] mb-4 text-balance">
            Let's Connect.
          </h2>

          <p className="text-base text-[#52525B] max-w-xl mx-auto leading-relaxed">
            Interested in software engineering internships, backend API development, or collaborative projects? Reach out through any of the verified channels below.
          </p>
        </div>

        {/* Contact Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          
          {/* Academic Email Card */}
          <div className="p-6 bg-white border border-[#E4E4E7] rounded-2xl hover:border-[#18181B] transition-colors flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-[#71717A]">BINUS Academic Email</span>
                <Mail className="w-4 h-4 text-[#2563EB]" />
              </div>
              <a
                href={`mailto:${contactDetails.academicEmail}`}
                className="font-mono text-sm sm:text-base font-semibold text-[#18181B] hover:text-[#2563EB] transition-colors block break-all select-all"
              >
                {contactDetails.academicEmail}
              </a>
            </div>
            <div className="pt-4 mt-4 border-t border-[#F4F4F5] flex items-center justify-between">
              <a
                href={`mailto:${contactDetails.academicEmail}`}
                className="text-xs font-mono text-[#2563EB] hover:underline inline-flex items-center gap-1"
              >
                <span>Compose Mail</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <button
                type="button"
                onClick={() => handleCopy(contactDetails.academicEmail, 'academic')}
                className="px-2.5 py-1 text-xs font-mono text-[#52525B] hover:text-[#18181B] border border-[#E4E4E7] rounded hover:bg-[#F4F4F5] transition-colors inline-flex items-center gap-1"
              >
                {copiedKey === 'academic' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copiedKey === 'academic' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Personal Email Card */}
          <div className="p-6 bg-white border border-[#E4E4E7] rounded-2xl hover:border-[#18181B] transition-colors flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-[#71717A]">Personal Email</span>
                <Mail className="w-4 h-4 text-[#18181B]" />
              </div>
              <a
                href={`mailto:${contactDetails.personalEmail}`}
                className="font-mono text-sm sm:text-base font-semibold text-[#18181B] hover:text-[#2563EB] transition-colors block break-all select-all"
              >
                {contactDetails.personalEmail}
              </a>
            </div>
            <div className="pt-4 mt-4 border-t border-[#F4F4F5] flex items-center justify-between">
              <a
                href={`mailto:${contactDetails.personalEmail}`}
                className="text-xs font-mono text-[#2563EB] hover:underline inline-flex items-center gap-1"
              >
                <span>Compose Mail</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <button
                type="button"
                onClick={() => handleCopy(contactDetails.personalEmail, 'personal')}
                className="px-2.5 py-1 text-xs font-mono text-[#52525B] hover:text-[#18181B] border border-[#E4E4E7] rounded hover:bg-[#F4F4F5] transition-colors inline-flex items-center gap-1"
              >
                {copiedKey === 'personal' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copiedKey === 'personal' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Phone & WhatsApp Card */}
          <div className="p-6 bg-white border border-[#E4E4E7] rounded-2xl hover:border-[#10B981] transition-colors flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-[#71717A]">Phone & WhatsApp</span>
                <Phone className="w-4 h-4 text-[#10B981]" />
              </div>
              <p className="font-mono text-sm sm:text-base font-semibold text-[#18181B] select-all">
                {contactDetails.phone}
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-[#F4F4F5] flex items-center justify-between">
              <a
                href={`https://wa.me/${contactDetails.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-mono text-[#10B981] hover:underline inline-flex items-center gap-1 font-medium"
              >
                <span>Open WhatsApp Chat</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <button
                type="button"
                onClick={() => handleCopy(contactDetails.phone, 'phone')}
                className="px-2.5 py-1 text-xs font-mono text-[#52525B] hover:text-[#18181B] border border-[#E4E4E7] rounded hover:bg-[#F4F4F5] transition-colors inline-flex items-center gap-1"
              >
                {copiedKey === 'phone' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copiedKey === 'phone' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Location & Academic Base */}
          <div className="p-6 bg-white border border-[#E4E4E7] rounded-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-[#71717A]">Location & Campus</span>
                <MapPin className="w-4 h-4 text-[#71717A]" />
              </div>
              <p className="font-medium text-sm text-[#18181B] leading-snug">
                BINUS University @Alam Sutera
              </p>
              <p className="text-xs text-[#71717A] mt-1 font-mono">
                Tangerang, Banten, Indonesia
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-[#F4F4F5] text-xs font-mono text-[#71717A]">
              <span>Binusian 2028 · Computer Science</span>
            </div>
          </div>

        </div>

        {/* External Verified Profiles Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <a
            href={contactDetails.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="p-4 bg-white border border-[#E4E4E7] rounded-xl hover:border-[#2563EB] transition-colors flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <Linkedin className="w-5 h-5 text-[#2563EB]" />
              <div>
                <span className="text-xs font-semibold text-[#18181B] block">LinkedIn</span>
                <span className="text-[11px] font-mono text-[#71717A]">/in/alfred-richard</span>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#A1A1AA] group-hover:text-[#2563EB] transition-colors" />
          </a>

          <a
            href={contactDetails.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="p-4 bg-white border border-[#E4E4E7] rounded-xl hover:border-[#18181B] transition-colors flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <Github className="w-5 h-5 text-[#18181B]" />
              <div>
                <span className="text-xs font-semibold text-[#18181B] block">GitHub</span>
                <span className="text-[11px] font-mono text-[#71717A]">github.com/alfred357</span>
              </div>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[#A1A1AA] group-hover:text-[#18181B] transition-colors" />
          </a>

          <button
            onClick={() => {
              downloadCVPdf();
              onOpenCV?.();
            }}
            className="p-4 bg-white border border-[#E4E4E7] rounded-xl hover:border-[#2563EB] hover:shadow-xs transition-colors flex items-center justify-between group text-left cursor-pointer"
            title="Download & View Alfred Joshan Richard's Curriculum Vitae"
          >
            <div className="flex items-center gap-3">
              <Download className="w-5 h-5 text-[#2563EB]" />
              <div>
                <span className="text-xs font-semibold text-[#18181B] block group-hover:text-[#2563EB] transition-colors">Download CV (PDF)</span>
                <span className="text-[11px] font-mono text-[#71717A]">Official 2-Page CV</span>
              </div>
            </div>
            <Download className="w-4 h-4 text-[#A1A1AA] group-hover:text-[#2563EB] transition-colors" />
          </button>
        </div>

      </div>
    </section>
  );
};
