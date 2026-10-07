import React, { useEffect, useState } from 'react';
import { BlogPost, Project } from '../types';
import { X, Copy, Check, ArrowLeft, ArrowUpRight, Share2, BookOpen } from 'lucide-react';

interface ArticleModalProps {
  post: BlogPost | null;
  onClose: () => void;
  onOpenProject?: (projectId: string) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  post,
  onClose,
  onOpenProject
}) => {
  const [copiedCodeIdx, setCopiedCodeIdx] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (post) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [post, onClose]);

  if (!post) return null;

  const copyCode = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIdx(idx);
    setTimeout(() => setCopiedCodeIdx(null), 2000);
  };

  const copyArticleLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-2xl border border-[#E4E4E7] shadow-2xl my-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with Close button & Meta */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/95 backdrop-blur-md border-b border-[#E4E4E7]">
          <button
            onClick={onClose}
            className="text-xs font-semibold text-[#52525B] hover:text-[#18181B] inline-flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Journal</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={copyArticleLink}
              className="p-1.5 text-[#71717A] hover:text-[#18181B] rounded-lg transition-colors inline-flex items-center gap-1 text-xs"
              title="Copy share link"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copiedLink ? 'Copied' : 'Share'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-[#71717A] hover:text-[#18181B] hover:bg-[#F4F4F5] rounded-lg transition-colors"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Article Body */}
        <div className="p-6 sm:p-10 max-h-[82vh] overflow-y-auto">
          
          {/* Metadata */}
          <div className="flex items-center gap-2 text-xs font-mono text-[#71717A] mb-4">
            <span className="text-[#2563EB] font-medium">{post.category}</span>
            <span aria-hidden="true">·</span>
            <span>{post.publishedAt}</span>
            <span aria-hidden="true">·</span>
            <span>{post.readTime}</span>
          </div>

          {/* Title */}
          <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#18181B] leading-tight mb-6">
            {post.title}
          </h1>

          {/* Excerpt Lead */}
          <p className="text-base sm:text-lg text-[#52525B] font-medium leading-relaxed pb-6 mb-8 border-b border-[#E4E4E7]">
            {post.excerpt}
          </p>

          {/* Content Stream */}
          <div className="space-y-6 text-[#27272A] leading-relaxed text-sm sm:text-base">
            {post.content.map((block, idx) => {
              if (block.type === 'heading') {
                return (
                  <h2 key={idx} className="font-display text-xl sm:text-2xl font-bold text-[#18181B] pt-4 mt-6">
                    {block.text}
                  </h2>
                );
              }

              if (block.type === 'paragraph') {
                return (
                  <p key={idx} className="leading-relaxed text-[#3F3F46]">
                    {block.text}
                  </p>
                );
              }

              if (block.type === 'callout') {
                return (
                  <div key={idx} className="p-5 bg-[#FBFBFA] border-l-3 border-[#2563EB] rounded-r-xl my-6">
                    {block.caption && (
                      <p className="font-mono text-xs font-semibold text-[#2563EB] uppercase tracking-wider mb-1">
                        {block.caption}
                      </p>
                    )}
                    <p className="text-xs sm:text-sm text-[#27272A] leading-relaxed">
                      {block.text}
                    </p>
                  </div>
                );
              }

              if (block.type === 'code' && block.code) {
                return (
                  <div key={idx} className="rounded-xl overflow-hidden border border-[#27272A] bg-[#09090B] my-6">
                    <div className="flex items-center justify-between px-4 py-2 bg-[#121215] border-b border-[#27272A] text-xs font-mono text-[#A1A1AA]">
                      <span>{block.language || 'code'}</span>
                      <button
                        onClick={() => copyCode(block.code || '', idx)}
                        className="hover:text-white inline-flex items-center gap-1 transition-colors"
                      >
                        {copiedCodeIdx === idx ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy snippet</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-4 overflow-x-auto text-xs font-mono text-[#E4E4E7] leading-relaxed">
                      <code>{block.code}</code>
                    </pre>
                  </div>
                );
              }

              return null;
            })}
          </div>

          {/* Related Case Study if available */}
          {post.relatedProjectId && onOpenProject && (
            <div className="mt-12 p-6 bg-[#FBFBFA] border border-[#E4E4E7] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs font-mono text-[#71717A] mb-1">Companion Case Study</p>
                <p className="text-sm font-bold text-[#18181B]">Explore the Interactive System Behind This Research</p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onOpenProject(post.relatedProjectId!);
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#18181B] hover:bg-[#27272A] rounded-lg transition-colors inline-flex items-center gap-1.5 shrink-0"
              >
                <span>Inspect Design Case Study</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Author Footnote */}
          <div className="mt-12 pt-6 border-t border-[#E4E4E7] flex items-center justify-between text-xs text-[#71717A] font-mono">
            <span>Written by Josh Chen · CS Undergraduate</span>
            <button onClick={onClose} className="hover:text-[#18181B] font-semibold">
              Return to Journal ↑
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
