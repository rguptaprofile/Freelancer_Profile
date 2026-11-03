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

export interface ClientReview {
  id: string;
  clientName: string;
  clientTitle: string;
  company: string;
  companyType: string;
  rating: number;
  date: string;
  reviewText: string;
  serviceProvided: string;
  verified: boolean;
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
  priceEstimate?: string;
  estimatedTimeline?: string;
  whyClientsLoveThis?: string;
  isUSP?: boolean;
}

export interface ProjectPitchData {
  clientJurisdiction: 'domestic' | 'international';
  clientName: string;
  companyName: string;
  companyType: string;
  clientEmail: string;
  clientPhone: string;
  registeredAddress: string;
  identityType: string;
  identityNumber: string;
  identityDocName?: string;
  profilePhotoUrl?: string;
  serviceType: string;
  projectBudget: string;
  projectTimeline: string;
  projectDescription: string;
  signatoryName: string;
  signatoryTitle: string;
  agreedToBond: boolean;
  bondSignedDate: string;
  agreementId: string;
  currency: 'INR' | 'USD';
  paymentPlan: {
    advancePercentage: number;
    midPercentage: number;
    finalPercentage: number;
    advanceAmount: number;
    totalAmount: number;
    currencySymbol: string;
  };
}

export interface PaymentReceipt {
  receiptId: string;
  transactionId: string;
  date: string;
  payerName: string;
  payerEmail: string;
  companyName: string;
  clientJurisdiction: 'domestic' | 'international';
  amountPaid: number;
  totalAmount: number;
  currency: 'INR' | 'USD';
  currencySymbol: string;
  milestoneDescription: string;
  paymentMethod: string;
  identityVerified: boolean;
  identityReference: string;
  profilePhotoThumbnail?: string;
  status: 'SUCCESS' | 'PENDING';
}
