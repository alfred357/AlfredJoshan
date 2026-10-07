export type ProjectCategory = 
  | 'All'
  | 'Backend & APIs'
  | 'Web & Mobile Apps'
  | 'Full-Stack Platforms';

export interface DesignToken {
  name: string;
  value: string;
  description: string;
  previewType?: 'color' | 'font' | 'spacing';
}

export interface CaseStudySection {
  title: string;
  content: string;
  keyPoints?: string[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: Exclude<ProjectCategory, 'All'>;
  year: string;
  role: string;
  context: string;
  summary: string;
  problemStatement: string;
  solutionOverview: string;
  metrics: { label: string; value: string }[];
  coverImage: string;
  tags: string[];
  liveDemoUrl?: string;
  githubUrl?: string;
  gitStatus?: string;
  figmaUrl?: string;
  designTokens: DesignToken[];
  sections: CaseStudySection[];
  interactiveLabPreset?: string;
}

export type BlogCategory = 
  | 'All'
  | 'Systems & WebAssembly'
  | 'Computer Graphics'
  | 'Algorithms'
  | 'Interface Architecture';

export interface ContentBlock {
  type: 'paragraph' | 'heading' | 'code' | 'callout' | 'quote' | 'list';
  text?: string;
  code?: string;
  language?: string;
  caption?: string;
  items?: string[];
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: Exclude<BlogCategory, 'All'>;
  readTime: string;
  publishedAt: string;
  tags: string[];
  coverImage?: string;
  content: ContentBlock[];
  relatedProjectId?: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  inquiryType: string;
  timeline: string;
  message: string;
  createdAt: string;
}
