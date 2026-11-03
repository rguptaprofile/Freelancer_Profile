import { Founder, ServicePillar, ProjectItem } from '../types';

export const foundersData: Founder[] = [
  {
    id: 'rahul-raj',
    name: 'Rahul Raj',
    role: 'Co-Founder & Lead Engineer',
    specialization: 'Full-Stack Architecture & Tech Strategy',
    degree: 'B.Sc./B.S. in Computer Science & Data Analytics',
    institution: 'Indian Institute of Technology (IIT) Patna',
    gradYear: '2023 – 2027',
    experienceSummary:
      'Full-stack engineer with hands-on production experience in high-security government portal architectures and enterprise systems. Specializes in building resilient backend microservices, role-based workflows, and data-intensive web apps.',
    verifiedBadges: [
      {
        title: 'Software Engineering Intern',
        subtitle: 'NeGD, Ministry of Electronics & IT (MeitY), Govt. of India (Feb 2026 – Jul 2026)',
        verified: true,
      },
      {
        title: 'Full-Stack Development Intern',
        subtitle: 'HCL GUVI (Jul 2025 – Sep 2025 | Remote)',
        verified: true,
      },
      {
        title: 'Elite Academic Pedigree',
        subtitle: 'IIT Patna (CS & Data Analytics)',
        verified: true,
      },
      {
        title: 'Problem Solving Track Record',
        subtitle: '25+ Public GitHub Repositories • 85+ LeetCode Problems Solved',
        verified: true,
      },
    ],
    primaryResponsibilities: [
      'Frontend & Backend Architecture (React.js, TypeScript, Node.js, Express, Python)',
      'Database Design (PostgreSQL, MongoDB, MySQL, Redis) & REST API Integration',
      'Authentication (JWT), Multi-level Role Workflows & Cloud/Docker Deployment',
      'Deep Technical Writing, AI/Data Analytics Articles & Quora Thought Leadership',
    ],
    techStackOrSkills: [
      'React.js',
      'TypeScript',
      'Node.js',
      'Express.js',
      'Python',
      'PostgreSQL',
      'MongoDB',
      'Redis',
      'Docker',
      'JWT Auth',
      'Pandas',
      'NumPy',
      'Tailwind CSS',
      'REST APIs',
    ],
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/rahul-raj-33a6a225b',
      github: 'https://github.com',
      leetcode: 'https://leetcode.com',
      quora: 'https://quora.com',
      email: 'mailto:contact@rahulraj.dev',
    },
    image: '/images/rahul-raj.png',
    quote:
      'We do not deliver black-box code or broken promises. Every line of backend logic is engineered for audit-grade reliability, strict security, and clean API contracts.',
  },
  {
    id: 'jyoti-verma',
    name: 'Jyoti Verma',
    role: 'Co-Founder & Creative Strategist',
    specialization: 'Web Design & Editorial Content Strategy',
    degree: 'B.Tech in Electrical Engineering',
    institution: 'Birla Institute of Technology (BIT) Mesra — Patna Campus',
    gradYear: 'Engineering Graduate',
    experienceSummary:
      'Engineering-trained designer and content strategist. Bridges the gap between complex software logic and high-converting visual storytelling. Specializes in clear user journeys, microcopy, and authority research articles.',
    verifiedBadges: [
      {
        title: 'Engineering Pedigree',
        subtitle: 'BIT Mesra (Patna Extension Campus) — B.Tech EE',
        verified: true,
      },
      {
        title: 'Conversion UI/UX Systems',
        subtitle: 'Wireframing, Information Architecture & Responsive Layouts',
        verified: true,
      },
      {
        title: 'Authority Technical & SEO Copy',
        subtitle: 'B2B Landing Pages, Case Studies & Industry Guides',
        verified: true,
      },
      {
        title: 'Product Narrative Specialist',
        subtitle: 'Zero-Fluff, User-Centric Microcopy & Design Audits',
        verified: true,
      },
    ],
    primaryResponsibilities: [
      'UI/UX Wireframing, Visual Hierarchy, Typography & Responsive Web Design',
      'Website Copywriting (Landing Pages, About Pages, Product Messaging)',
      'Long-Form SEO Blog Articles, Research-Backed Industry Guides & Brand Voice',
      'UX Microcopy, Content Auditing & Client Design Walkthroughs',
    ],
    techStackOrSkills: [
      'UI/UX Wireframing',
      'Responsive Web Layouts',
      'Tailwind CSS UI',
      'SEO Content Architecture',
      'Landing Page Copywriting',
      'Information Hierarchy',
      'UX Microcopy',
      'Figma & Design Systems',
      'Technical Research',
      'Conversion Optimization',
    ],
    socialLinks: {
      linkedin: 'https://www.linkedin.com',
      email: 'mailto:jyoti.verma.studio@gmail.com',
    },
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
    quote:
      'Great web products fail when good code is wrapped in confusing text or generic templates. I design intuitive visual hierarchies and write copy that turns skeptical visitors into qualified clients.',
  },
];

export const trustPledgeData = {
  title: 'The Anti-Hype Trust Pledge',
  subtitle: 'Why high-growth founders, SaaS teams, and businesses choose to partner directly with us',
  commitments: [
    {
      number: '01',
      title: 'No Inflated Metrics',
      tag: 'Zero Fabricated Proof',
      description:
        'We never display fake 5-star review counters, invented "$10M+ generated" claims, or stock-photo testimonials. Every single project showcased links to a live deployment, a public GitHub repository, or a published article.',
    },
    {
      number: '02',
      title: 'Direct Partner Execution',
      tag: 'Zero Subcontracting',
      description:
        'Your project is never offloaded to unseen junior freelancers or overseas content mills. Rahul architects and codes every full-stack backend and API module; Jyoti leads the UI/UX wireframes and brand messaging directly.',
    },
    {
      number: '03',
      title: 'Scope & Timeline Honesty',
      tag: 'Radical Transparency',
      description:
        'If an enterprise feature requires 3 weeks of robust engineering and rigorous edge-case testing, we will never promise it in 4 days just to close the contract. You receive weekly staging builds and transparent Git commits.',
    },
  ],
};

export const servicePillarsData: ServicePillar[] = [
  {
    id: 'pillar-web-dev',
    number: '01',
    title: 'Full-Stack Web Development & Custom Portals',
    badge: 'Rahul (Full-Stack) + Jyoti (UI Design)',
    ownership: 'End-to-End Engineering & Systems Architecture',
    targetClients: [
      'Early-Stage Tech Startups',
      'SaaS Founders',
      'EdTech & Learning Platforms',
      'Agencies & SMEs needing Custom Tools',
    ],
    deliverables: [
      {
        title: 'Custom Web Applications & MVPs',
        description:
          'End-to-end React.js + TypeScript frontends paired with Node.js/Express or Python backends with clean separation of concerns and lightning-fast load times.',
        tags: ['React.js', 'TypeScript', 'Node.js', 'Express', 'Python'],
      },
      {
        title: 'Role-Based Portals & Dashboards',
        description:
          'Multi-level approval workflows, secure document handling pipelines, JWT authentication, and high-integrity PostgreSQL/MongoDB databases.',
        tags: ['PostgreSQL', 'MongoDB', 'JWT Auth', 'RBAC', 'REST APIs'],
      },
      {
        title: 'AI-Integrated Web Tools',
        description:
          'Custom automation engines, resume & document parsers, and interactive data analytics dashboards built with Python, Streamlit, and modern REST endpoints.',
        tags: ['Python', 'Streamlit', 'NLP/Parsing', 'Data Visuals'],
      },
      {
        title: 'UI/UX & Responsive Engineering',
        description:
          'Clean, conversion-focused interfaces designed with systematic typography and engineered in modern Tailwind CSS by Rahul.',
        tags: ['Tailwind CSS', 'Mobile First', 'Accessibility'],
      },
    ],
  },
  {
    id: 'pillar-content-writing',
    number: '02',
    title: 'Technical, SEO & Authority Content Writing',
    badge: 'Jyoti (Lead Strategist) + Rahul (Tech Review)',
    ownership: 'Research-Backed B2B & Editorial Strategy',
    targetClients: [
      'B2B Tech & SaaS Companies',
      'Software & Developer Tool Blogs',
      'Coaching & EdTech Brands',
      'Founders Building Personal Authority',
    ],
    deliverables: [
      {
        title: 'Technical Tutorials & Engineering Guides',
        description:
          'Developer guides, software architecture explainers, and data analytics deep dives backed by real, executable code snippets and clear diagrams.',
        tags: ['Developer Docs', 'Tech Guides', 'Code Walkthroughs'],
      },
      {
        title: 'Website & Landing Page Copywriting',
        description:
          'Clear, persuasive messaging for homepages, feature sections, and product launches without buzzword fluff or generic AI-generated cliches.',
        tags: ['Landing Pages', 'Microcopy', 'Conversion Strategy'],
      },
      {
        title: 'Long-Form SEO Articles & Case Studies',
        description:
          'Deeply researched 1,500–2,500 word articles structured around user intent, semantic keywords, and high reader retention.',
        tags: ['1,500–2,500 Words', 'Search Intent', 'Zero-Fluff'],
      },
      {
        title: 'Founder Ghostwriting & Quora/LinkedIn Assets',
        description:
          'Narrative-driven insights and educational thought leadership posts that establish genuine technical credibility and attract inbound leads.',
        tags: ['Quora Authority', 'Founder Narrative', 'Social Proof'],
      },
    ],
  },
  {
    id: 'pillar-launch-bundle',
    number: '03',
    title: 'The "Zero-Friction Launch" Bundle',
    badge: 'Signature Studio USP (Code + Design + Copy)',
    ownership: 'Unified Two-Partner Execution',
    isUSP: true,
    targetClients: [
      'Solo Founders Launching a New Venture',
      'Businesses Rebranding their Digital Presence',
      'Startups Preparing for Product Hunt / Investor Showcases',
    ],
    whyClientsLoveThis:
      'Eliminates the dreaded "communication canyon" between separate freelance writers, UI designers, and developers. You speak to just two owners who handle the entire pipeline.',
    deliverables: [
      {
        title: 'Complete Concept-to-Live Production',
        description:
          'Jyoti designs the UI wireframes and writes 100% of the high-converting copy; Rahul builds the full-stack web application, wires the database/CMS, and deploys to production.',
        tags: ['Figma to Code', 'Full Copywriting', 'Database & APIs', 'Vercel/Cloud Deploy'],
      },
      {
        title: 'Unified Brand & Technical Polish',
        description:
          'No placeholder "Lorem Ipsum" and no disconnected design systems. The code and narrative evolve simultaneously for maximum launch impact.',
        tags: ['Turnkey Solution', 'Staging Previews', '14-Day Bug Warranty'],
      },
    ],
  },
];

export const projectsData: ProjectItem[] = [
  {
    id: 'project-approval-workflow',
    title: 'Enterprise Multi-Level Approval & Document Workflow System',
    category: 'Enterprise B2B / GovTech Architecture',
    context:
      'Inspired by production architecture patterns engineered during Rahul’s Software Engineering Internship at the National e-Governance Division (NeGD), MeitY, Govt. of India.',
    problem:
      'Enterprise and institutional workflows suffer when manual paper approvals, unstructured email chains, and insecure file uploads cause process delays, data tampering risks, and lack of audit accountability.',
    architecture: [
      'Role-Based Access Control (RBAC): User, Reviewer, Approver, and Master Admin permission gates.',
      'Document Pipeline: Multi-format file verification, virus/MIME validation, and secure cryptographic storage.',
      'Audit Logging: Immutable PostgreSQL event tables recording every status transition, timestamp, and actor IP.',
      'API Security: Strict JWT bearer authentication with rotating refresh tokens and rate-limiting.',
    ],
    solution:
      'Engineered an enterprise-grade document approval engine with granular status state-machines, automated email notifications, and an intuitive dashboard that reduces administrative turnaround by over 60%.',
    outcomes: [
      'Multi-tiered role gating with 100% test coverage on permission boundaries',
      'Strict relational database integrity in PostgreSQL with foreign keys and cascade rules',
      'Production-ready UI in React & TypeScript designed for fast high-volume document reviews',
    ],
    techStack: [
      'React.js',
      'TypeScript',
      'Node.js',
      'Express.js',
      'PostgreSQL',
      'JWT Auth',
      'REST APIs',
      'Tailwind CSS',
    ],
    githubUrl: 'https://github.com',
    liveDemoUrl: 'https://demo.example.com/enterprise-workflow',
    isJoint: false,
    featured: true,
    diagramSnippet: `Client (React + TS) ──[JWT Auth]──> Express REST API ──> PostgreSQL (Audit Trail + Workflows)
       │                                     │
       └── Multi-level Review Dashboard <────┘ (Status State Machine)`,
  },
  {
    id: 'project-ai-resume',
    title: 'AI-Powered Resume Analyzer & Automated Builder Platform',
    category: 'AI/ML & Full-Stack Integration',
    context:
      'Verified full-stack portfolio build combining deep natural language parsing with responsive web UI.',
    problem:
      'Job seekers struggle to understand ATS rejection factors and spend hours formatting inconsistent resume templates that fail automated parser filters.',
    architecture: [
      'Document Parser: Python-based PDF/DOCX text extraction pipeline with semantic section segmentation.',
      'Skill-Gap Evaluator: LLM and heuristic comparison comparing candidate bullets against target job descriptions.',
      'Reactive Frontend: Real-time dynamic preview renderer in React with Tailwind CSS.',
      'Export Engine: Server-side high-fidelity PDF compilation preserving ATS-compliant formatting.',
    ],
    solution:
      'Built an end-to-end intelligent career platform that provides instant actionable ATS compatibility scores, pinpoint skill recommendations, and an interactive WYSIWYG editor.',
    outcomes: [
      'Instant parsing of multi-page resumes under 2.5 seconds',
      'Clear categorized feedback on action verbs, measurable metrics, and missing technical keywords',
      'Over 25+ successful mock candidate test runs with verified ATS parsing compatibility',
    ],
    techStack: [
      'Python',
      'React.js',
      'Node.js',
      'Tailwind CSS',
      'NLP / Parsing',
      'REST APIs',
    ],
    githubUrl: 'https://github.com',
    liveDemoUrl: 'https://demo.example.com/ai-resume-platform',
    isJoint: false,
    featured: true,
    diagramSnippet: `Resume Upload (PDF) ──> Python NLP Parser ──> Gap Analysis Engine
          │                                     │
          └── Interactive React Builder <───────┘ (Real-Time ATS Score)`,
  },
  {
    id: 'project-analytics-dashboard',
    title: 'Data Analytics & Interactive Insight Dashboard',
    category: 'CS & Data Analytics Showcase',
    context:
      'Academic and industry application of Rahul’s IIT Patna CS & Data Analytics foundational curriculum.',
    problem:
      'Business stakeholders drown in raw CSVs and multi-gigabyte transactional tables without digestible visuals, resulting in slow executive decisions and overlooked operational churn.',
    architecture: [
      'Automated ETL: Python, Pandas, and NumPy ingestion scripts that clean and normalize heterogeneous sales records.',
      'Caching Layer: Redis in-memory cache to guarantee sub-100ms dashboard widget refreshes.',
      'Visual Dashboard: Streamlit & React interactive plotting with dynamic multi-filter parameters.',
      'Containerization: Dockerized microservice architecture for reproducible cloud deployment.',
    ],
    solution:
      'Transformed millions of unstructured transaction records into visual executive decision maps featuring cohort retention, revenue forecasting, and anomaly detection.',
    outcomes: [
      'Sub-second query responses on 500,000+ data points utilizing optimized SQL indexing & Redis',
      'Custom interactive charts allowing non-technical leaders to drill down into unit economics',
      'Zero setup friction through containerized Docker Compose architecture',
    ],
    techStack: [
      'Python',
      'Pandas',
      'NumPy',
      'Streamlit',
      'SQL',
      'Redis',
      'Docker',
    ],
    githubUrl: 'https://github.com',
    liveDemoUrl: 'https://demo.example.com/analytics-dashboard',
    isJoint: false,
    featured: true,
  },
  {
    id: 'project-brand-editorial',
    title: 'Conversion-First Brand Website & Editorial System',
    category: 'Joint Rahul & Jyoti Duo Showcase',
    context:
      'Live demonstration of the studio’s two-partner synergy: Jyoti’s conversion-focused UX wireframes and persuasive copy paired with Rahul’s production frontend architecture.',
    problem:
      'Early-stage tech startups frequently launch websites with beautiful visuals but uninspired "Lorem Ipsum" copy, or vice-versa, resulting in sub-1% visitor conversion and high bounce rates.',
    architecture: [
      'UX Wireframing & Microcopy: Information architecture built by Jyoti prioritizing value proposition clarity.',
      'Headless Component Library: Built by Rahul with React and Tailwind CSS for 98+ Google Lighthouse scores.',
      'Editorial Showcase: Custom markdown-driven blog pipeline with instant search and category filtering.',
      'Performance Optimization: Sub-second load times, responsive typography scale, and zero cumulative layout shift (CLS).',
    ],
    solution:
      'Delivered a turnkey, high-converting digital storefront combining persuasive founder storytelling, clear product value anchors, and mobile-first responsive execution.',
    outcomes: [
      '99/100 Lighthouse Performance, Accessibility, and Best Practices score',
      'Interactive client inquiry calculator increasing lead capture rates',
      'Complete turnaround delivered in under 12 working days from initial scope to live deployment',
    ],
    techStack: [
      'UI/UX Design',
      'Responsive HTML/CSS',
      'Tailwind CSS',
      'React.js',
      'SEO Copywriting',
    ],
    githubUrl: 'https://github.com',
    liveDemoUrl: 'https://demo.example.com/editorial-system',
    isJoint: true,
    featured: true,
  },
];

export const workflowSteps = [
  {
    step: '01',
    phase: 'Days 1 – 2',
    title: 'Scope & Requirement Audit',
    owner: 'Rahul & Jyoti Joint Kickoff',
    description:
      'We conduct a deep audit of your project goals, technical constraints, target audience, and brand voice. You receive a crystal-clear written scope document with exact deliverables, tech stack, word counts, and milestone dates. Zero ambiguity.',
    deliverable: 'Written Scope & Architecture Specification Document',
  },
  {
    step: '02',
    phase: 'Days 3 – 5',
    title: 'UI Wireframe & Content Outline',
    owner: 'Jyoti Leads (Rahul Tech Review)',
    description:
      'Jyoti crafts the visual wireframes, information hierarchy, and complete copywriting outline before a single line of backend code is committed. This guarantees you see exactly how the product will look and sound before heavy engineering begins.',
    deliverable: 'Interactive Wireframe Prototype + Approved Copy Blueprint',
  },
  {
    step: '03',
    phase: 'Days 6 – 18',
    title: 'Full-Stack Engineering & Editorial Drafting',
    owner: 'Rahul Builds Code • Jyoti Crafts Content',
    description:
      'Rahul builds the React/Node/Python stack with clean Git commits, while Jyoti finalizes polished landing page copy, documentation, or SEO articles. You receive private staging server links to test real working features as they are built.',
    deliverable: 'Live Staging Build + Production Content Suite',
  },
  {
    step: '04',
    phase: 'Days 19 – 21',
    title: 'QA Testing, Deployment & 14-Day Warranty',
    owner: 'Joint Quality Assurance & Handover',
    description:
      'Cross-device mobile audits, database stress tests, and lighthouse speed tuning. We deploy to your custom domain or cloud server, hand over complete Git repository ownership, and back every release with 14 days of complimentary bug-fix support.',
    deliverable: 'Clean Production Launch + Complete Repo Handover + 14-Day Warranty',
  },
];

export const clientPitchTemplate = {
  subject: 'Quick UI/Engineering + Content note for [Client Company Name]',
  body: `Hi [Client First Name],

I came across [Company Name] while researching [their industry/product]. Loved what you are building with [specific feature], though I noticed [1 honest, specific observation — e.g., your landing page copy doesn't immediately highlight X, or your blog hasn't published technical guides lately / mobile page load could be smoother].

My partner Jyoti Verma (B.Tech EE, BIT Mesra Patna — Web Design & Content Strategy) and I (B.Sc. CS & Data Analytics, IIT Patna | Ex-Software Engineering Intern at NeGD MeitY & HCL GUVI) run a two-person Full-Stack Engineering & Content Studio. Because we handle both production code (React/TypeScript/Node/Python) and technical/brand content together, our clients don't have to coordinate between separate developers, designers, and writers.

Here is our live portfolio with our verified builds, GitHub repos, and published Quora/editorial articles (zero fake metrics, just our actual work): https://rahul-jyoti-studio.dev

If you're planning any web feature upgrades or content initiatives this month, would you be open to a quick 10-minute chat?`,
};
