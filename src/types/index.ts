export interface Founder {
  id: string;
  name: string;
  role: string;
  specialization: string;
  degree: string;
  institution: string;
  gradYear?: string;
  experienceSummary: string;
  verifiedBadges: { title: string; subtitle?: string; verified: boolean }[];
  primaryResponsibilities: string[];
  techStackOrSkills: string[];
  socialLinks: {
    linkedin?: string;
    github?: string;
    leetcode?: string;
    quora?: string;
    email?: string;
  };
  image: string;
  quote: string;
}

export interface ServicePillar {
  id: string;
  number: string;
  title: string;
  badge?: string;
  ownership: string;
  targetClients: string[];
  deliverables: {
    title: string;
    description: string;
    tags: string[];
  }[];
  whyClientsLoveThis?: string;
  isUSP?: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  context: string;
  problem: string;
  architecture: string[];
  solution: string;
  outcomes: string[];
  techStack: string[];
  githubUrl?: string;
  liveDemoUrl?: string;
  isJoint: boolean;
  featured: boolean;
  diagramSnippet?: string;
}

export interface EditorialArticle {
  id: string;
  type: 'quora' | 'technical' | 'ux-copy' | 'research';
  categoryLabel: string;
  title: string;
  subtitle: string;
  author: 'Rahul Raj' | 'Jyoti Verma' | 'Rahul & Jyoti';
  authorDetails: string;
  readTime: string;
  quoraStats?: {
    views: string;
    upvotes: string;
    shares?: string;
  };
  quoraUrl?: string;
  summary: string;
  fullContentMarkdown: string;
  beforeAfterComparison?: {
    beforeTitle: string;
    beforeText: string;
    beforeIssues: string[];
    afterTitle: string;
    afterText: string;
    afterWins: string[];
    conversionLift: string;
  };
}

export interface ScopeCalculation {
  serviceId: string;
  serviceName: string;
  addons: string[];
  urgency: 'standard' | 'priority';
  estimatedDays: string;
  recommendedWorkflow: string;
}
