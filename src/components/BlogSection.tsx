import React, { useState } from 'react';
import { BlogPost, BlogCategory } from '../types';
import { ArrowUpRight, Search, BookOpen, Clock, Tag } from 'lucide-react';

interface BlogSectionProps {
  posts: BlogPost[];
  onSelectPost: (post: BlogPost) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ posts, onSelectPost }) => {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: BlogCategory[] = [
    'All',
    'Systems & WebAssembly',
    'Computer Graphics',
    'Algorithms',
    'Interface Architecture'
  ];

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="journal" className="py-20 md:py-28 max-w-7xl mx-auto px-6 border-t border-[#E4E4E7]">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#71717A] mb-2 tracking-tight">
            <span>Engineering Journal</span>
            <span aria-hidden="true">/</span>
            <span>CS Research</span>
            <span aria-hidden="true">/</span>
            <span className="text-[#18181B] font-medium">{filteredPosts.length} Technical Articles</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#18181B] text-balance">
            Technical Articles & Coding Projects
          </h2>
          <p className="text-sm text-[#52525B] max-w-2xl mt-2 leading-relaxed">
            Notes on systems programming, memory cache optimization, numerical dynamics, and type-level frontend architecture from my undergraduate CS studies.
          </p>
        </div>

        {/* Search input */}
        <div className="w-full md:w-72 relative">
          <Search className="w-4 h-4 text-[#A1A1AA] absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search articles or topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 text-xs bg-white border border-[#E4E4E7] rounded-lg text-[#18181B] placeholder-[#A1A1AA] focus:outline-none focus:border-[#18181B] transition-colors"
          />
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-[#F4F4F5] rounded-xl mb-10 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              selectedCategory === cat
                ? 'bg-white text-[#18181B] shadow-xs font-semibold'
                : 'text-[#71717A] hover:text-[#18181B]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Article Cards Grid */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-[#E4E4E7] rounded-2xl">
          <p className="text-sm text-[#71717A]">No articles found matching your query.</p>
          <button
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
            className="mt-3 text-xs font-medium text-[#2563EB] hover:underline"
          >
            Reset filter
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => onSelectPost(post)}
              className="group bg-white border border-[#E4E4E7] hover:border-[#18181B] rounded-2xl p-7 md:p-8 flex flex-col justify-between transition-all duration-300 cursor-pointer shadow-xs hover:shadow-sm"
            >
              <div>
                {/* Unboxed Metadata (No pills) */}
                <div className="flex items-center gap-2 text-xs font-mono text-[#71717A] mb-3">
                  <span>{post.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.publishedAt}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.readTime}</span>
                </div>

                {/* Article Title */}
                <h3 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-[#18181B] group-hover:text-[#2563EB] transition-colors mb-3 leading-snug">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-[#52525B] leading-relaxed mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              {/* Bottom Tags & Read CTA */}
              <div className="pt-4 border-t border-[#F4F4F5] flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs font-mono text-[#71717A] overflow-hidden">
                  <span className="truncate">{post.tags.slice(0, 3).join(' · ')}</span>
                </div>

                <div className="text-xs font-semibold text-[#18181B] group-hover:text-[#2563EB] inline-flex items-center gap-1 shrink-0 transition-colors">
                  <span>Read Paper</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};
