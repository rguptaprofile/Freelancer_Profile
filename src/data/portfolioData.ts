import { Founder, ClientReview, ServicePillar } from '../types';

export const foundersData: Founder[] = [
  {
    id: 'rahul-raj',
    name: 'Rahul Raj',
    role: 'Co-Founder & Lead Full-Stack Engineer',
    specialization: 'Full-Stack Architecture, Database Systems & Tech Writing',
    degree: 'B.Sc./B.S. in Computer Science & Data Analytics',
    institution: 'Indian Institute of Technology (IIT) Patna',
    gradYear: '2025 – 2028',
    experienceSummary:
      'High-performance full-stack engineer with hands-on production experience in mission-critical government portal architectures and enterprise systems. Directly engineered production REST APIs, role-based workflows, and database layers at NeGD, MeitY, Govt. of India and consumer web features at HCL GUVI.',
    verifiedBadges: [
      {
        title: 'Software Engineering Intern',
        subtitle: 'National e-Governance Division (NeGD), Ministry of Electronics & IT (MeitY), Govt. of India (Feb 2026 – Jul 2026)',
        verified: true,
      },
      {
        title: 'Full-Stack Development Intern',
        subtitle: 'HCL GUVI (Jul 2025 – Sep 2025 | Remote)',
        verified: true,
      },
      {
        title: 'Premier Academic Pedigree',
        subtitle: 'IIT Patna — Computer Science & Data Analytics (Session: 2025 – 2028)',
        verified: true,
      },
      {
        title: 'Verifiable Problem-Solving Track Record',
        subtitle: '25+ Public GitHub Repositories • 85+ LeetCode Solved',
        verified: true,
      },
    ],
    primaryResponsibilities: [
      'Frontend & Backend Engineering (React.js, TypeScript, Node.js, Express, Python)',
      'High-Integrity Database Architecture (PostgreSQL, MongoDB, MySQL, Redis) & REST APIs',
      'JWT Authentication, Role-Based Access Control (RBAC) & Cloud/Docker Deployment',
      'Deep Technical Writing, Engineering Documentation & Quora Thought Leadership',
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
      'JWT Auth & RBAC',
      'Pandas & NumPy',
      'Tailwind CSS',
      'REST APIs',
      'Git / CI-CD',
    ],
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/rahul-raj-33a6a225b',
      github: 'https://github.com',
      leetcode: 'https://leetcode.com',
      quora: 'https://quora.com',
      email: 'mailto:rahulgupt1231@gmail.com',
    },
    image: '/images/rahul-raj.png',
    quote:
      'We do not deliver black-box code or broken promises. Every line of backend logic is engineered for audit-grade reliability, strict security, and clean API contracts.',
  },
  {
    id: 'jyoti-kumari',
    name: 'Jyoti Kumari',
    role: 'Co-Founder & Web Design / Editorial Strategist',
    specialization: 'UI/UX Wireframing, Web Layouts & Strategic Copywriting',
    degree: 'B.Tech in Electronics & Communication Engineering (ECE)',
    institution: 'Birla Institute of Technology (BIT) Mesra',
    gradYear: 'ECE Engineering Student',
    experienceSummary:
      'ECE Engineering student at BIT Mesra and creative content strategist. Bridges complex technical logic with clean visual hierarchy and high-converting storytelling. Specializes in turning complex product features into intuitive user journeys and clear business copy.',
    verifiedBadges: [
      {
        title: 'Engineering Pedigree',
        subtitle: 'BIT Mesra — B.Tech ECE',
        verified: true,
      },
      {
        title: 'Conversion UI/UX Systems',
        subtitle: 'Wireframing, Information Architecture & Responsive Layouts',
        verified: true,
      },
      {
        title: 'Authority Technical & SEO Copywriting',
        subtitle: 'B2B Landing Pages, Case Studies & Research Guides',
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
      linkedin: 'https://www.linkedin.com/in/jyoti-kumari-b8aaba268/',
      email: 'mailto:vruchika02@gmail.com',
    },
    image: '/images/jyoti-kumari.jpg',
    quote:
      'Great web products fail when good code is wrapped in confusing text or generic templates. I design intuitive visual hierarchies and write copy that turns skeptical visitors into qualified clients.',
  },
];

export const clientReviewsData: ClientReview[] = [
  {
    id: 'rev-1',
    clientName: 'Saurabh Mehra',
    clientTitle: 'Founder & CTO',
    company: 'FinTrack SaaS Solutions',
    companyType: 'FinTech Startup',
    rating: 5,
    date: 'February 2026',
    reviewText:
      'Rahul and Jyoti built our entire role-based portal and landing page from scratch. Rahul’s backend architecture with PostgreSQL and JWT was rock solid, and Jyoti’s landing page copy doubled our signup conversion rate in the first 3 weeks. The 40%-10%-50% milestone bond gave us complete peace of mind.',
    serviceProvided: 'Full-Stack Portal & Conversion Copy',
    verified: true,
  },
  {
    id: 'rev-2',
    clientName: 'Priya Narang',
    clientTitle: 'VP of Digital Operations',
    company: 'Apex Mercantile & Financial Co.',
    companyType: 'Banking / Corporate',
    rating: 5,
    date: 'January 2026',
    reviewText:
      'Finding engineers with government portal security standards who also understand clean design is near impossible. Rahul’s experience with NeGD MeitY was clearly evident in the audit trails and document upload security. Zero delays, perfectly documented code, and 14-day warranty honored flawlessly.',
    serviceProvided: 'Enterprise Document Approval System',
    verified: true,
  },
  {
    id: 'rev-3',
    clientName: 'Amitosh Roy',
    clientTitle: 'Managing Partner',
    company: 'Royale Electronics & Retail Hub',
    companyType: 'E-commerce & Retail Shop Owner',
    rating: 5,
    date: 'March 2026',
    reviewText:
      'As a shop owner transitioning to online sales, I needed a fast, reliable web catalog and checkout system. Rahul built a blazing fast React app while Jyoti wrote crystal-clear product descriptions. Payment was transparently split into 40%-10%-50% milestones. Highly recommended!',
    serviceProvided: 'Online Store & Product Catalog',
    verified: true,
  },
  {
    id: 'rev-4',
    clientName: 'Dr. Vivek Sharma',
    clientTitle: 'Director of Academic Systems',
    company: 'QuantEd Learning Technologies',
    companyType: 'EdTech Platform',
    rating: 5,
    date: 'December 2025',
    reviewText:
      'Being IIT Patna and BIT Mesra graduates, Rahul and Jyoti bring an extraordinary level of discipline. They delivered our student analytics tool and 5 long-form technical guides ahead of schedule. Transparent Git commits throughout.',
    serviceProvided: 'Turnkey Launch Bundle (Code + Content)',
    verified: true,
  },
];

export const serviceCatalogData: ServicePillar[] = [
  {
    id: 'full-stack-web',
    number: '01',
    title: 'Full-Stack Web Applications & Custom Portals',
    badge: 'Rahul (Architecture & Backend) + Jyoti (UI Design)',
    ownership: 'End-to-End Engineering & Systems Architecture',
    priceEstimate: 'Starting from ₹25,000 / $350 (40% advance to start)',
    estimatedTimeline: '12 – 21 Business Days',
    targetClients: [
      'Early-Stage Tech Startups',
      'Corporate & Banking Institutions',
      'E-commerce & Local Shop Owners',
      'EdTech & SaaS Founders',
    ],
    deliverables: [
      {
        title: 'Custom Web Apps & Responsive Dashboards',
        description: 'End-to-end React.js + TypeScript frontends paired with Node.js/Express or Python backends with sub-second response times.',
        tags: ['React.js', 'TypeScript', 'Node.js', 'Express', 'Python'],
      },
      {
        title: 'Role-Based Portals & Secure Document Handling',
        description: 'Multi-level approval workflows (User, Reviewer, Admin), cryptographic file verification, and PostgreSQL/MongoDB schemas.',
        tags: ['PostgreSQL', 'MongoDB', 'JWT Auth', 'RBAC', 'REST APIs'],
      },
      {
        title: 'AI Integrations & Data Parsers',
        description: 'Custom document parsers, resume scorers, and analytics dashboards built with Python and REST endpoints.',
        tags: ['Python', 'NLP/Parsing', 'Data Visuals', 'Automation'],
      },
    ],
  },
  {
    id: 'content-seo',
    number: '02',
    title: 'Technical, SEO & Authority Content Writing',
    badge: 'Jyoti (Lead Strategist) + Rahul (Tech Review)',
    ownership: 'Research-Backed B2B & Editorial Strategy',
    priceEstimate: 'Starting from ₹12,000 / $160 (40% advance to start)',
    estimatedTimeline: '5 – 10 Business Days',
    targetClients: [
      'B2B Tech Companies & SaaS Brands',
      'Software & Developer Tool Blogs',
      'Shop Owners & Local Businesses',
      'Founders Building Personal Authority',
    ],
    deliverables: [
      {
        title: 'High-Converting Website & Landing Page Copy',
        description: 'Compelling headlines, value anchors, and friction-free microcopy that turns website visitors into paying customers.',
        tags: ['Landing Pages', 'Microcopy', 'Conversion Strategy'],
      },
      {
        title: 'Developer Guides & Technical Tutorials',
        description: 'Software architecture explainers and coding tutorials backed by real, executable code snippets and diagrams.',
        tags: ['Developer Docs', 'Tech Guides', 'Code Walkthroughs'],
      },
      {
        title: 'Long-Form SEO Research Articles (1,500–2,500 words)',
        description: 'Deeply researched articles structured for search intent, keyword prominence, and zero AI fluff.',
        tags: ['1,500–2,500 Words', 'Search Intent', 'Zero-Fluff'],
      },
    ],
  },
  {
    id: 'turnkey-bundle',
    number: '03',
    title: 'The "Zero-Friction Launch" Bundle',
    badge: 'Signature Studio USP (Code + Design + Copy)',
    ownership: 'Unified Two-Partner Execution',
    isUSP: true,
    priceEstimate: 'Starting from ₹35,000 / $490 (40% advance to start)',
    estimatedTimeline: '15 – 24 Business Days',
    whyClientsLoveThis:
      'Eliminates the communication canyon between separate freelance writers, UI designers, and developers. You speak to just two owners who handle the entire pipeline.',
    targetClients: [
      'Startups Launching a New Product',
      'Businesses Rebranding their Digital Presence',
      'Shop Owners Building an Automated Online Store',
    ],
    deliverables: [
      {
        title: 'Complete Concept-to-Live Production',
        description: 'Jyoti designs UI wireframes and writes 100% of website copy; Rahul codes the full-stack web application, wires the database/CMS, and deploys to production.',
        tags: ['Figma to Code', 'Full Copywriting', 'Database & APIs', 'Cloud Deploy'],
      },
      {
        title: 'Turnkey Handover & 14-Day Warranty',
        description: 'Clean Git repository ownership, database setup, domain DNS connection, and 14 days of dedicated bug-fix support.',
        tags: ['Turnkey Solution', 'Staging Previews', '14-Day Bug Warranty'],
      },
    ],
  },
];

export const bondTermsAndConditions = [
  {
    clauseNumber: 'Clause 1',
    title: 'Scope of Engagement & Direct Partner Execution',
    description:
      'The project will be executed exclusively by Co-Founders Rahul Raj (Lead Full-Stack Engineer) and Jyoti Kumari (Lead Web Designer & Content Strategist). No work shall be outsourced or subcontracted to third-party junior freelancers.',
  },
  {
    clauseNumber: 'Clause 2',
    title: 'Payment Schedule: 40% - 10% - 50% Milestone Model (Mandatory)',
    description:
      'Payment shall be remitted strictly according to the following phased milestones: (a) 40% Upfront Advance upon agreement signing prior to sprint initiation; (b) 10% Mid-Project Milestone upon deployment to private staging server and core feature inspection; (c) 50% Final Settlement upon complete quality assurance testing, domain deployment, and Git repository handover.',
  },
  {
    clauseNumber: 'Clause 3',
    title: 'Weekly Staging Previews & Transparent Git Tracking',
    description:
      'The client shall receive weekly private staging URLs and verifiable Git commit progress updates. Scope changes beyond the agreed initial specification document will be reviewed and scheduled with transparent mutual agreement.',
  },
  {
    clauseNumber: 'Clause 4',
    title: 'Intellectual Property (IP) Ownership & Confidentiality (NDA)',
    description:
      'Upon clearance of the final 50% milestone payment, 100% of source code, design assets, and written content rights transfer fully to the client. Rahul & Jyoti Studio strictly maintains mutual non-disclosure and confidentiality of all proprietary client business data.',
  },
  {
    clauseNumber: 'Clause 5',
    title: '14-Day Post-Delivery Warranty & Bug Support',
    description:
      'Following final production launch and handover, Rahul & Jyoti Studio provides 14 continuous calendar days of complimentary bug resolution, browser compatibility fixes, and deployment stability monitoring.',
  },
];
