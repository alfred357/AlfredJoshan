import { Project } from '../types';

export const PROJECTS: Project[] = [
  {
    id: 'honkai-star-retail-backend',
    title: 'Honkai Star Retail Backend',
    subtitle: 'High-concurrency e-commerce retail engine, inventory ledger & REST API',
    category: 'Backend & APIs',
    year: '2026',
    role: 'Backend Architect & API Engineer',
    context: 'Collaborative Project with Francesco Chris Nugraha',
    summary: 'A robust transactional retail backend service engineered to handle gaming merchandise inventory, order fulfillment pipelines, and secure user checkout with strict ACID guarantees.',
    problemStatement: 'High-demand merchandise drops cause race conditions during simultaneous cart checkout, risking inventory overselling and inconsistent order states under burst traffic.',
    solutionOverview: 'Architected database row-level locking, idempotent payment webhook verification, JWT-based role authorization, and structured relational schemas for atomic order processing.',
    metrics: [
      { label: 'API Response Time', value: '<24ms' },
      { label: 'Checkout Concurrency', value: '100% ACID' },
      { label: 'Relational Entities', value: '14 Models' },
      { label: 'Codebase', value: 'GitHub Open' }
    ],
    coverImage: '/src/assets/images/honkai_star_retail_1791108640973.jpg',
    tags: ['Backend', 'REST API', 'Database Schema', 'Authentication', 'E-Commerce', 'Microservices'],
    githubUrl: 'https://github.com/alfred357/Honkai_Star_Retail',
    gitStatus: 'Repository active on GitHub',
    designTokens: [
      { name: '--retail-primary', value: '#1E1B4B', description: 'Astral deep navy background', previewType: 'color' },
      { name: '--accent-cosmic', value: '#6366F1', description: 'Electric stellar accent hue', previewType: 'color' },
      { name: '--status-success', value: '#10B981', description: 'Transaction verified signal', previewType: 'color' },
      { name: '--font-api', value: 'JetBrains Mono, 400', description: 'JSON payload & endpoint format', previewType: 'font' },
      { name: '--max-burst-rate', value: '120 req/min', description: 'Rate-limiting window', previewType: 'spacing' }
    ],
    sections: [
      {
        title: '01. Relational Modeling & Transaction Isolation',
        content: 'Constructed normalized relational entities connecting Users, Products, Categories, Inventory Buckets, Orders, and Payment Transactions. Implemented database transactions to guarantee that product quantities decrement atomically upon order verification.',
        keyPoints: [
          'Enforced atomic transaction boundaries to prevent double-spending',
          'Indexed foreign keys and frequently queried fields for sub-30ms reads',
          'Designed modular controllers following clean service-repository architectural patterns'
        ]
      },
      {
        title: '02. Security, Authentication & Role Access',
        content: 'Secured all client endpoints using cryptographic JWT tokens and bcrypt password hashing. Implemented role-based access control (RBAC) separating administrative stock management from customer purchasing flows.',
        keyPoints: [
          'Secure authorization middleware guarding administrative store operations',
          'Rigorous input sanitization and payload schema validation',
          'Detailed request logging and centralized error handling middleware'
        ]
      }
    ]
  },
  {
    id: 'daytourity',
    title: 'Daytourity',
    subtitle: 'Personalized day tour discovery, curated itinerary planner & travel booking app',
    category: 'Web & Mobile Apps',
    year: '2026',
    role: 'Lead Full-Stack Developer & UI/UX Designer',
    context: 'Independent Engineering & Product Venture',
    summary: 'A responsive travel platform empowering travelers to discover, customize, and schedule local day tours with interactive maps, transparent pricing, and instant itinerary generation.',
    problemStatement: 'Travelers visiting new cities waste hours sifting through fragmented blog posts and clunky booking portals with outdated schedules and hidden booking fees.',
    solutionOverview: 'Crafted an intuitive, card-based discovery UI paired with dynamic schedule filtering, visual route maps, and a streamlined 3-step checkout flow optimized for mobile browsers.',
    metrics: [
      { label: 'Mobile Load Time', value: '0.8s' },
      { label: 'Booking Flow', value: '3 Steps' },
      { label: 'Accessibility Score', value: '98/100' },
      { label: 'Git Repository', value: 'alfred357' }
    ],
    coverImage: '/src/assets/images/daytourity_travel_1791108653884.jpg',
    tags: ['Full-Stack', 'UI/UX Design', 'Travel Tech', 'Mobile-First', 'Itinerary Planner'],
    githubUrl: 'https://github.com/alfred357/Daytourity',
    gitStatus: 'Repository active on GitHub',
    designTokens: [
      { name: '--travel-sun', value: '#F59E0B', description: 'Warm golden expedition accent', previewType: 'color' },
      { name: '--ocean-teal', value: '#0D9488', description: 'Scenic destination highlight', previewType: 'color' },
      { name: '--canvas-sand', value: '#FBFBFA', description: 'Clean daylight neutral ground', previewType: 'color' },
      { name: '--font-editorial', value: 'Syne, Bold', description: 'Destination headline typeface', previewType: 'font' },
      { name: '--card-radius', value: '16px smooth', description: 'Curated card corner geometry', previewType: 'spacing' }
    ],
    sections: [
      {
        title: '01. User-Centric Itinerary Exploration',
        content: 'Engineered an exploratory travel dashboard allowing users to filter day tours by duration, difficulty, budget, and travel style. Each tour package displays route stops, inclusions, and transparent guest capacity.',
        keyPoints: [
          'Visual timeline interface detailing hourly departure and stop activities',
          'Responsive mobile-first layout prioritizing thumb-zone navigation',
          'Real-time date picker and seat availability calculation'
        ]
      },
      {
        title: '02. Frictionless Booking Experience',
        content: 'Eliminated multi-page redirect loops by engineering an inline reservation drawer that keeps travelers anchored in their destination context while confirming booking details.',
        keyPoints: [
          'Lightweight state management ensuring zero form data loss',
          'Instant booking confirmation receipt generation'
        ]
      }
    ]
  },
  {
    id: 'kelapaweb',
    title: 'Kelapaweb',
    subtitle: 'Sustainable agro-industry digital marketplace & supply chain web platform',
    category: 'Full-Stack Platforms',
    year: '2025',
    role: 'Lead Full-Stack Web Engineer & Typographer',
    context: 'Enterprise Agriculture Web Venture',
    summary: 'A web platform connecting sustainable coconut derivative producers with domestic and international commercial buyers, showcasing product transparency and origin verification.',
    problemStatement: 'Smallholder agricultural producers face barriers reaching premium commercial buyers due to fragmented marketing and lack of verifiable product quality specifications online.',
    solutionOverview: 'Built a bilingual, modern web portal with Swiss-inspired typography, interactive product specification sheets, and a direct inquiry conduit for bulk B2B procurement.',
    metrics: [
      { label: 'Core Web Vitals', value: '100% Green' },
      { label: 'Interactive Specs', value: '8 Products' },
      { label: 'Mobile Responsive', value: '100%' },
      { label: 'Git Repository', value: 'joshanrichard230' }
    ],
    coverImage: '/src/assets/images/kelapaweb_platform_1791108665728.jpg',
    tags: ['Web Platform', 'Full-Stack', 'E-Commerce', 'B2B Procurement', 'Agro-Tech', 'Swiss Design'],
    githubUrl: 'https://github.com/joshanrichard230-pixel/Kelapaweb',
    gitStatus: 'Repository active on GitHub',
    designTokens: [
      { name: '--kelapa-emerald', value: '#064E3B', description: 'Deep palm canopy green', previewType: 'color' },
      { name: '--copra-gold', value: '#D97706', description: 'Natural organic fiber tone', previewType: 'color' },
      { name: '--pure-milk', value: '#FAFAF9', description: 'Clean tactile card surface', previewType: 'color' },
      { name: '--font-heritage', value: 'Instrument Serif, Italic', description: 'Artisanal agricultural display', previewType: 'font' },
      { name: '--grid-col', value: '12-column baseline', description: 'Balanced Swiss layout grid', previewType: 'spacing' }
    ],
    sections: [
      {
        title: '01. Digital Showcase for Agricultural Sustainability',
        content: 'Designed high-fidelity product cards for coconut derivatives (crude oil, briquettes, desiccated flour, virgin coconut oil), featuring moisture percentage, carbon content, and export packaging specifications.',
        keyPoints: [
          'Tabular technical specification sheets for commercial import standards',
          'High-contrast typography ensuring effortless legibility in desktop and mobile viewports',
          'Direct procurement inquiry flow routed straight to supplier sales leads'
        ]
      },
      {
        title: '02. Modern Performance & Accessibility',
        content: 'Engineered with clean semantic HTML5, zero unnecessary JavaScript bloat, and optimized WebP visual assets, achieving top scores across Google Lighthouse performance benchmarks.',
        keyPoints: [
          'Sub-second first contentful paint (FCP) on 4G cellular connections',
          'Strict WCAG AA contrast compliance across all environmental surface colors'
        ]
      }
    ]
  }
];
