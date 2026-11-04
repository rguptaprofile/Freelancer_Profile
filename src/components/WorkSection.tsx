import React, { useState } from 'react';
import { bondTermsAndConditions } from '../data/portfolioData';
import { PaymentReceipt } from '../types';
import {
  FileSignature,
  Building2,
  Briefcase,
  CreditCard,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Send,
  Printer,
  Download,
  AlertCircle,
  Clock,
  Sparkles,
  ArrowRight,
  ExternalLink,
  DollarSign,
  ChevronRight,
  Globe,
  Upload,
  User,
  FileText,
  Lock,
  BadgeCheck,
  Check,
  Smartphone,
} from 'lucide-react';

interface WorkSectionProps {
  initialServiceId?: string;
}

export const WorkSection: React.FC<WorkSectionProps> = ({ initialServiceId }) => {
  // Navigation step within Work section
  const [currentStep, setCurrentStep] = useState<'pitch' | 'kyc' | 'bond' | 'payment' | 'receipt'>('pitch');

  // Client Jurisdiction
  const [jurisdiction, setJurisdiction] = useState<'domestic' | 'international'>('domestic');

  // Form State
  const [companyType, setCompanyType] = useState<string>('startup');
  const [serviceType, setServiceType] = useState<string>(
    initialServiceId || 'Full-Stack Web Application & Custom Portal'
  );
  const [clientName, setClientName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [selectedTimeline, setSelectedTimeline] = useState('2-3 Weeks');

  // KYC & Identification State
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [identityType, setIdentityType] = useState<string>('aadhaar');
  const [identityNumber, setIdentityNumber] = useState('');
  const [identityFileName, setIdentityFileName] = useState<string | null>(null);
  const [registeredAddress, setRegisteredAddress] = useState('');
  const [registeredCountry, setRegisteredCountry] = useState('India');

  // Currency & Budget Tiers
  // 1 USD approx = 85 INR
  const [selectedTierIndex, setSelectedTierIndex] = useState<number>(1); // default Growth Project

  const domesticTiers = [
    { label: 'Starter Sprint', amount: 20000, desc: 'Single-page app, high-conversion landing page or content suite' },
    { label: 'Growth Project', amount: 35000, desc: 'Full-stack web application with authentication & database' },
    { label: 'Enterprise Portal', amount: 65000, desc: 'Role-based workflows, RBAC, payment, document security, audit logs' },
    { label: 'Turnkey Launch Suite', amount: 95000, desc: 'High-concurrency systems, AI integration & turnkey B2B copy' },
  ];

  const internationalTiers = [
    { label: 'Starter Global Sprint', amount: 250, desc: 'SaaS MVP frontend, interactive landing page or technical articles' },
    { label: 'Growth Global App', amount: 450, desc: 'Full-stack application with React/Node/Python & PostgreSQL' },
    { label: 'Enterprise Custom Portal', amount: 800, desc: 'Enterprise approval engine, RBAC, API integrations & audit trails' },
    { label: 'Turnkey Global Launch Suite', amount: 1200, desc: 'End-to-end full stack architecture + complete UI design + B2B copy' },
  ];

  const currentTiers = jurisdiction === 'domestic' ? domesticTiers : internationalTiers;
  const currencySymbol = jurisdiction === 'domestic' ? '₹' : '$';
  const currencyCode = jurisdiction === 'domestic' ? 'INR' : 'USD';
  const totalAmount = currentTiers[selectedTierIndex].amount;

  // Milestone Calculations: 40% upfront, 10% mid-project, 50% final
  const advanceAmount = Math.round(totalAmount * 0.40);
  const midAmount = Math.round(totalAmount * 0.10);
  const finalAmount = Math.round(totalAmount * 0.50);

  // Bond & Signature State
  const [signatoryName, setSignatoryName] = useState('');
  const [signatoryTitle, setSignatoryTitle] = useState('Founder / Authorized Officer');
  const [agreedToBond, setAgreedToBond] = useState(false);
  const [agreementId] = useState(`AGR-${Math.floor(100000 + Math.random() * 900000)}`);
  const [signedDate] = useState(new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }));

  // Payment State
  // International: ONLY 'card' or 'global_qr'
  // Domestic: 'upi' | 'card' | 'netbanking'
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'global_qr' | 'upi' | 'netbanking'>('upi');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [billingZip, setBillingZip] = useState('');
  const [upiRef, setUpiRef] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [receipt, setReceipt] = useState<PaymentReceipt | null>(null);
  const [copiedSummary, setCopiedSummary] = useState(false);

  // Sync default payment method on jurisdiction change
  const handleJurisdictionChange = (newJur: 'domestic' | 'international') => {
    setJurisdiction(newJur);
    if (newJur === 'international') {
      setPaymentMethod('card');
      setRegisteredCountry('United States');
      setIdentityType('passport');
    } else {
      setPaymentMethod('upi');
      setRegisteredCountry('India');
      setIdentityType('aadhaar');
    }
  };

  const companyTypesList = [
    { id: 'startup', label: 'Startup / SaaS Founder', icon: '🚀' },
    { id: 'corporate-bank', label: 'Corporate / Bank / Enterprise', icon: '🏛️' },
    { id: 'shop-retail', label: 'E-Commerce / Shop Owner', icon: '🛍️' },
    { id: 'edtech', label: 'EdTech / Coaching Platform', icon: '🎓' },
    { id: 'sme-agency', label: 'SME / Local Business / Agency', icon: '🏢' },
  ];

  const serviceOptions = [
    'Full-Stack Web Application & Custom Portal',
    'Role-Based Approval & Banking/Fintech Workflow',
    'E-commerce Store & Inventory Web Portal',
    'AI-Integrated Web Tool & Document Parser',
    'Technical Tutorials & SEO Authority Content',
    'The "Zero-Friction Launch" Bundle (Code + Design + Copy)',
  ];

  // Handle Photo Upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Identity Document Upload
  const handleIdentityDocUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIdentityFileName(file.name);
    }
  };

  // Generate Email Content
  const generateFormattedEmailBody = () => {
    return `=====================================================
PROJECT PITCH & VERIFIED CLIENT-FREELANCER AGREEMENT
=====================================================

1. CLIENT JURISDICTION & VERIFICATION (KYC):
-----------------------------------------------------
Jurisdiction Type: ${jurisdiction === 'domestic' ? 'DOMESTIC CLIENT (INDIA)' : 'INTERNATIONAL CLIENT (GLOBAL)'}
Authorized Signatory: ${signatoryName || clientName || 'N/A'}
Signatory Designation: ${signatoryTitle || 'N/A'}
Company / Entity: ${companyName || 'N/A'}
Category: ${companyType.toUpperCase()}
Email: ${clientEmail || 'N/A'}
Phone / WhatsApp: ${clientPhone || 'N/A'}
Registered Address: ${registeredAddress || 'N/A'} (${registeredCountry})
National ID Type: ${identityType.toUpperCase()}
National ID Number: ${identityNumber || 'ATTACHED'}
Document Uploaded: ${identityFileName ? identityFileName + ' (Verified Attachment)' : 'Confirmed in Portal'}
Profile Photo Uploaded: ${profilePhoto ? 'YES (Verified Identity Attached)' : 'Confirmed in Portal'}

2. PROJECT SCOPE & SERVICE DELIVERABLES:
-----------------------------------------------------
Service Pillar: ${serviceType}
Selected Timeline: ${selectedTimeline}
Project Currency: ${currencyCode} (${currencySymbol})
Total Project Value: ${currencySymbol}${totalAmount.toLocaleString('en-IN')}

Project Details & Requirements:
${projectDescription || 'Client has submitted requirements for direct review.'}

3. MANDATORY MILESTONE PAYMENT SCHEDULE (40% - 10% - 50%):
-----------------------------------------------------
- 40% Initial Upfront Advance: ${currencySymbol}${advanceAmount.toLocaleString('en-IN')} (Required to start sprint)
- 10% Mid-Project Milestone:  ${currencySymbol}${midAmount.toLocaleString('en-IN')} (Upon live staging inspection)
- 50% Final Settlement:        ${currencySymbol}${finalAmount.toLocaleString('en-IN')} (Post QA & repository handover)

4. BOND PAPER & AGREEMENT STATUS:
-----------------------------------------------------
Agreement Certificate ID: ${agreementId}
Digital Bond Signed: ${agreedToBond ? 'YES, DIGITALLY ACKNOWLEDGED' : 'PENDING SIGNATURE'}
Signed Date: ${signedDate}
Authorized Signatory: ${signatoryName || clientName}
IP Transfer & NDA Clause: 100% IP Handover upon final milestone
Warranty Period: 14-Day Complimentary Post-Delivery Bug Support

${receipt ? `5. INITIAL 40% PAYMENT VERIFICATION (FREE & SECURE):
-----------------------------------------------------
Transaction Ref: ${receipt.transactionId}
Receipt ID: ${receipt.receiptId}
Amount Paid (40% Advance): ${currencySymbol}${receipt.amountPaid.toLocaleString('en-IN')}
Payment Channel: ${receipt.paymentMethod}
Payment Security: 256-Bit SSL Encrypted / PCI-DSS Level 1 Verified
Status: VERIFIED SUCCESSFUL` : ''}

=====================================================
Dispatched via Rahul & Jyoti Studio Hiring Engine
Official Recipient: rahulgupt1231@gmail.com
=====================================================`;
  };

  const handleSendEmail = () => {
    const subject = encodeURIComponent(
      `New ${jurisdiction === 'domestic' ? '🇮🇳 Indian' : '🌍 International'} Project Pitch: ${companyName || clientName} (${serviceType})`
    );
    const body = encodeURIComponent(generateFormattedEmailBody());
    window.location.href = `mailto:rahulgupt1231@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleCopySummary = () => {
    navigator.clipboard.writeText(generateFormattedEmailBody());
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 3000);
  };

  const handleDirectWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Rahul & Jyoti,\nI have submitted an official ${jurisdiction === 'domestic' ? 'Domestic' : 'International'} project pitch for *${companyName || clientName}*.\nService: ${serviceType}\nBudget: ${currencySymbol}${totalAmount.toLocaleString('en-IN')}\nAgreement ID: ${agreementId}\nPlease check the pitch details.`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  // Simulate Payment Processing
  const processAdvancePayment = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      const newReceipt: PaymentReceipt = {
        receiptId: `INV-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`,
        transactionId: jurisdiction === 'international' ? `TXN-STRIPE-${Date.now().toString().slice(-8)}` : `TXN-UPI-${Date.now().toString().slice(-8)}`,
        date: new Date().toLocaleString('en-IN'),
        payerName: clientName || signatoryName || 'Valued Client',
        payerEmail: clientEmail || 'client@example.com',
        companyName: companyName || 'Client Organization',
        clientJurisdiction: jurisdiction,
        amountPaid: advanceAmount,
        totalAmount: totalAmount,
        currency: currencyCode as any,
        currencySymbol: currencySymbol,
        milestoneDescription: '40% Initial Upfront Advance (Sprint Initiation & Architecture Setup)',
        paymentMethod: jurisdiction === 'international' ? (paymentMethod === 'card' ? 'INTERNATIONAL CARD (STRIPE 3D-SECURE)' : 'GLOBAL QR (WISE / STRIPE PAY)') : paymentMethod.toUpperCase(),
        identityVerified: true,
        identityReference: `${identityType.toUpperCase()}-${identityNumber ? identityNumber.slice(-4) : 'VERIFIED'}`,
        profilePhotoThumbnail: profilePhoto || undefined,
        status: 'SUCCESS',
      };
      setReceipt(newReceipt);
      setIsProcessingPayment(false);
      setCurrentStep('receipt');
    }, 1500);
  };

  return (
    <section id="work" className="py-20 bg-[#080B11] relative border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold mb-3">
            <Briefcase className="w-4 h-4" />
            <span>CLIENT ONBOARDING, PITCH &amp; SECURE PAYMENT ENGINE</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Pitch Your Project, Sign Agreement &amp; Hire Us
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Supporting Indian and International clients with localized payment channels, verified identity KYC, and an official binding 40%-10%-50% milestone deed.
          </p>

          {/* Interactive Step Navigator */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-5 gap-2 max-w-3xl mx-auto">
            <button
              onClick={() => setCurrentStep('pitch')}
              className={`p-2.5 rounded-xl text-xs font-mono font-semibold transition-all border ${
                currentStep === 'pitch'
                  ? 'bg-blue-600 text-white border-blue-500 shadow-glow-blue'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              <span>1. Project Scope</span>
            </button>

            <button
              onClick={() => setCurrentStep('kyc')}
              className={`p-2.5 rounded-xl text-xs font-mono font-semibold transition-all border ${
                currentStep === 'kyc'
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-indigo-500/20'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              <span>2. Identity &amp; KYC</span>
            </button>

            <button
              onClick={() => setCurrentStep('bond')}
              className={`p-2.5 rounded-xl text-xs font-mono font-semibold transition-all border ${
                currentStep === 'bond'
                  ? 'bg-cyan-600 text-white border-cyan-500 shadow-cyan-500/20'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              <span>3. Milestone Bond</span>
            </button>

            <button
              onClick={() => setCurrentStep('payment')}
              className={`p-2.5 rounded-xl text-xs font-mono font-semibold transition-all border ${
                currentStep === 'payment'
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-glow-emerald'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              <span>4. 40% Advance</span>
            </button>

            <button
              onClick={() => receipt && setCurrentStep('receipt')}
              disabled={!receipt}
              className={`p-2.5 rounded-xl text-xs font-mono font-semibold transition-all border ${
                currentStep === 'receipt'
                  ? 'bg-purple-600 text-white border-purple-500 shadow-purple-500/20'
                  : 'bg-slate-900 text-slate-500 border-slate-800 cursor-not-allowed'
              }`}
            >
              <span>5. Tax Invoice</span>
            </button>
          </div>
        </div>

        {/* ================= STEP 1: PROJECT PITCH FORM ================= */}
        {currentStep === 'pitch' && (
          <div className="max-w-4xl mx-auto rounded-3xl bg-slate-900/70 border border-slate-800 p-6 sm:p-10 shadow-2xl backdrop-blur-md animate-fadeIn">
            
            {/* Jurisdiction Switcher Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-950 to-indigo-950/60 border border-blue-500/30 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase text-cyan-400 font-bold block mb-1">
                  Step 1A: Select Client Origin / Jurisdiction
                </span>
                <p className="text-xs text-slate-300">
                  Configures your currency, banking channels, tax compliance, and KYC identity options.
                </p>
              </div>

              <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800 shrink-0">
                <button
                  type="button"
                  onClick={() => handleJurisdictionChange('domestic')}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    jurisdiction === 'domestic'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>🇮🇳 Indian Client (INR ₹)</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleJurisdictionChange('international')}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    jurisdiction === 'international'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>🌍 International (USD $)</span>
                </button>
              </div>
            </div>

            {/* A. Select Company / Organization Type */}
            <div className="mb-8">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block mb-3">
                A. What type of business / organization are you?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
                {companyTypesList.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setCompanyType(type.id)}
                    className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      companyType === type.id
                        ? 'bg-blue-600/20 border-blue-500 text-white shadow-glow-blue'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-xl mb-1">{type.icon}</span>
                    <span className="text-xs font-bold text-slate-200">{type.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* B. Select Required Service */}
            <div className="mb-8">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block mb-3">
                B. Select the primary online service you require:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {serviceOptions.map((srv) => (
                  <button
                    key={srv}
                    type="button"
                    onClick={() => setServiceType(srv)}
                    className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                      serviceType === srv
                        ? 'bg-slate-800 border-cyan-400 text-white shadow-sm'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <span className="text-xs font-medium">{srv}</span>
                    {serviceType === srv && <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />}
                  </button>
                ))}
              </div>
            </div>

            {/* C. Budget Tier & Automatic 40%-10%-50% Milestone Preview */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                  C. Estimated Budget Tier ({currencyCode} - Phased Milestones):
                </label>
                <span className="text-xs font-mono text-cyan-400">
                  {jurisdiction === 'international' ? 'International Rates (USD)' : 'Domestic Rates (INR)'}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                {currentTiers.map((tier, idx) => (
                  <button
                    key={tier.label}
                    type="button"
                    onClick={() => setSelectedTierIndex(idx)}
                    className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      selectedTierIndex === idx
                        ? 'bg-emerald-950/30 border-emerald-500 text-white shadow-glow-emerald'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-mono text-emerald-400 font-bold block mb-1">{tier.label}</span>
                      <span className="text-lg font-bold text-white block">
                        {currencySymbol}{tier.amount.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[11px] text-slate-400 leading-tight block mt-1">{tier.desc}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Phased Milestone Breakdown Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-950 to-indigo-950/40 border border-blue-500/30 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] font-mono uppercase text-blue-400 font-bold block">40% Upfront Advance</span>
                  <span className="text-base font-bold text-white">
                    {currencySymbol}{advanceAmount.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-slate-400 block">Required to begin work</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block">10% Mid-Project</span>
                  <span className="text-base font-bold text-white">
                    {currencySymbol}{midAmount.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-slate-400 block">Upon private staging demo</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">50% Final Settlement</span>
                  <span className="text-base font-bold text-white">
                    {currencySymbol}{finalAmount.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-slate-400 block">Post QA &amp; Git handover</span>
                </div>
              </div>
            </div>

            {/* D. Project Description & Timeline */}
            <div className="space-y-4 mb-8">
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1.5">
                  Detailed Project Scope / Features Needed:
                </label>
                <textarea
                  rows={4}
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  placeholder="Describe your requirements: e.g. Customer login portal, admin dashboard, payment gateway integration, product catalog, SEO blogs, reference links..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>
            </div>

            {/* Navigation to KYC Step */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-slate-800">
              <span className="text-xs text-slate-400 font-mono">
                Next: Client Identification, Profile Photo &amp; National ID Verification
              </span>

              <button
                onClick={() => setCurrentStep('kyc')}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all"
              >
                <span>Continue to Client Identity &amp; KYC</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 2: CLIENT IDENTITY & KYC VERIFICATION ================= */}
        {currentStep === 'kyc' && (
          <div className="max-w-4xl mx-auto rounded-3xl bg-slate-900/80 border border-indigo-500/40 p-6 sm:p-10 shadow-2xl backdrop-blur-md animate-fadeIn">
            
            <div className="flex items-center justify-between pb-6 border-b border-slate-800 mb-8">
              <div>
                <span className="text-xs font-mono uppercase text-indigo-400 font-bold block">
                  Step 2: Client Verification &amp; Authorized Signatory Profile
                </span>
                <h3 className="text-xl font-bold text-white">
                  Identity Verification &amp; Business Credentials
                </h3>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                100% Encrypted &bull; Strictly Confidential
              </span>
            </div>

            {/* Profile Photo & Document Upload Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              
              {/* Authorized Profile Photo Upload */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center text-center">
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-slate-700 bg-slate-900 mb-3 flex items-center justify-center">
                  {profilePhoto ? (
                    <img src={profilePhoto} alt="Client Photo" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-10 h-10 text-slate-600" />
                  )}
                </div>

                <span className="text-xs font-bold text-white mb-1">
                  Authorized Signatory Profile Photo
                </span>
                <p className="text-[11px] text-slate-400 mb-3">
                  Upload a clear portrait photo for the digital contract deed.
                </p>

                <label className="px-3.5 py-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-300 text-xs font-mono border border-indigo-500/40 cursor-pointer transition-colors flex items-center gap-1.5">
                  <Upload className="w-3.5 h-3.5" />
                  <span>{profilePhoto ? 'Change Photo' : 'Upload Profile Photo'}</span>
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                </label>
              </div>

              {/* National Identity Document Upload */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <BadgeCheck className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-white">
                      National Identity / Tax Registration Card
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 mb-3">
                    {jurisdiction === 'domestic'
                      ? 'Select Aadhaar Card, PAN Card, or GSTIN for Indian client contract security.'
                      : 'Select Passport, National ID, or Tax ID / EIN for international validation.'}
                  </p>

                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                        Select Document Type:
                      </label>
                      <select
                        value={identityType}
                        onChange={(e) => setIdentityType(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
                      >
                        {jurisdiction === 'domestic' ? (
                          <>
                            <option value="aadhaar">Government Aadhaar Card</option>
                            <option value="pan">Permanent Account Number (PAN Card)</option>
                            <option value="gstin">GSTIN Business Certificate</option>
                            <option value="incorporation">Certificate of Incorporation (MCA)</option>
                          </>
                        ) : (
                          <>
                            <option value="passport">International Passport</option>
                            <option value="national_id">Government National Identity Card</option>
                            <option value="tax_id">Corporate Tax ID / EIN / VAT Number</option>
                          </>
                        )}
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                        Card / Registration ID Number:
                      </label>
                      <input
                        type="text"
                        value={identityNumber}
                        onChange={(e) => setIdentityNumber(e.target.value)}
                        placeholder={jurisdiction === 'domestic' ? 'e.g. 5621 •••• •••• 9012 or ABCDE1234F' : 'e.g. P18290123 / US-TAX-90218'}
                        className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 mt-3 flex items-center justify-between">
                  <label className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono border border-slate-700 cursor-pointer transition-colors flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{identityFileName ? 'Replace ID File' : 'Upload ID Card Copy'}</span>
                    <input type="file" accept=".pdf,image/*" onChange={handleIdentityDocUpload} className="hidden" />
                  </label>

                  {identityFileName && (
                    <span className="text-[11px] font-mono text-emerald-400 truncate max-w-[150px]">
                      ✓ {identityFileName}
                    </span>
                  )}
                </div>
              </div>

            </div>

            {/* Personal & Company Contact Details */}
            <div className="space-y-4 mb-8">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block">
                Authorized Client Contact &amp; Registered Business Address:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1">
                    Your Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => {
                      setClientName(e.target.value);
                      if (!signatoryName) setSignatoryName(e.target.value);
                    }}
                    placeholder="e.g. Alexander Vance / Vikram Singhania"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1">
                    Company / Organization Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Vance Capital / Singhania Logistics"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1">
                    Official Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="e.g. alex@vancecapital.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1">
                    Verified Phone / WhatsApp (with Country Code) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder={jurisdiction === 'domestic' ? '+91 98765 43210' : '+1 (555) 019-2834'}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1">
                    Registered Business / Postal Address *
                  </label>
                  <input
                    type="text"
                    value={registeredAddress}
                    onChange={(e) => setRegisteredAddress(e.target.value)}
                    placeholder="Suite / Street Address, City, State/Province"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1">
                    Country of Residence / Operation *
                  </label>
                  <input
                    type="text"
                    value={registeredCountry}
                    onChange={(e) => setRegisteredCountry(e.target.value)}
                    placeholder="e.g. United States / India"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-slate-800">
              <button
                onClick={() => setCurrentStep('pitch')}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                &larr; Back to Scope
              </button>

              <button
                onClick={() => {
                  if (!clientName || !companyName || !clientEmail) {
                    alert('Please enter your Name, Company, and Email to proceed.');
                    return;
                  }
                  if (!signatoryName) setSignatoryName(clientName);
                  setCurrentStep('bond');
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/25 transition-all"
              >
                <span>Proceed to Digital Agreement Bond</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 3: LEGAL BOND PAPER & AGREEMENT ================= */}
        {currentStep === 'bond' && (
          <div className="max-w-4xl mx-auto rounded-3xl bg-[#0b0f19] border-2 border-cyan-500/40 p-6 sm:p-10 shadow-2xl animate-fadeIn relative">
            
            {/* Parchment / Bond Header */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-950 via-[#101726] to-slate-950 border border-slate-800 mb-8 text-center relative overflow-hidden">
              <div className="absolute top-2 right-4 text-[10px] font-mono text-slate-500">
                AGREEMENT NO: <span className="text-cyan-400 font-bold">{agreementId}</span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold mb-2">
                <FileSignature className="w-3.5 h-3.5" />
                <span>OFFICIAL DIGITAL FREELANCE CONTRACT &amp; BOND PAPER</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase">
                Service Level Agreement &amp; Phased Milestone Deed
              </h3>

              <p className="text-xs text-slate-400 max-w-xl mx-auto mt-1">
                Executed between <strong className="text-white">Rahul &amp; Jyoti Studio</strong> (Contractors) and{' '}
                <strong className="text-cyan-300">{companyName || 'The Client'}</strong> (Client - {registeredCountry}).
              </p>
            </div>

            {/* Attached KYC Badge in Bond */}
            <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/30 mb-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2.5">
                {profilePhoto ? (
                  <img src={profilePhoto} alt="Thumbnail" className="w-8 h-8 rounded-lg object-cover border border-cyan-400" />
                ) : (
                  <User className="w-6 h-6 text-cyan-400" />
                )}
                <div>
                  <span className="text-white font-bold block">{clientName} ({signatoryTitle})</span>
                  <span className="text-slate-400 text-[11px]">{companyName} &bull; {registeredCountry}</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>KYC Verified: {identityType.toUpperCase()} ({identityNumber || 'ATTACHED'})</span>
                </span>
                <span className="text-[11px] text-slate-500">Date: {signedDate}</span>
              </div>
            </div>

            {/* Bond Terms & Conditions Accordion / List */}
            <div className="space-y-4 mb-8">
              {bondTermsAndConditions.map((clause) => (
                <div key={clause.clauseNumber} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-mono font-bold text-cyan-400">{clause.clauseNumber}:</span>
                    <h4 className="text-xs sm:text-sm font-bold text-white">{clause.title}</h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed pl-6">
                    {clause.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Financial Summary Inside Agreement */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 mb-8 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Selected Service:</span>
                <span className="text-white font-bold">{serviceType}</span>
              </div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Total Fixed Project Value:</span>
                <span className="text-white font-bold">
                  {currencySymbol}{totalAmount.toLocaleString('en-IN')} {currencyCode}
                </span>
              </div>
              <div className="h-[1px] bg-slate-800 my-1" />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
                <div className="text-blue-400">
                  1. Upfront Advance (40%): {currencySymbol}{advanceAmount.toLocaleString('en-IN')}
                </div>
                <div className="text-cyan-400">
                  2. Mid-Milestone (10%): {currencySymbol}{midAmount.toLocaleString('en-IN')}
                </div>
                <div className="text-emerald-400">
                  3. Final Handover (50%): {currencySymbol}{finalAmount.toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            {/* Digital Signature & Execution Form */}
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-cyan-500/30 space-y-4 mb-8">
              <div className="text-xs font-mono uppercase text-cyan-400 font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Authorized Digital Signature &amp; Execution</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                    Signatory Legal Full Name:
                  </label>
                  <input
                    type="text"
                    value={signatoryName}
                    onChange={(e) => setSignatoryName(e.target.value)}
                    placeholder="Type legal name to digitally sign"
                    className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs sm:text-sm font-semibold focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-slate-400 block mb-1">
                    Signatory Designation:
                  </label>
                  <input
                    type="text"
                    value={signatoryTitle}
                    onChange={(e) => setSignatoryTitle(e.target.value)}
                    placeholder="e.g. Managing Director / Partner"
                    className="w-full px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Binding Consent Checkbox */}
              <label className="flex items-start gap-3 cursor-pointer pt-2">
                <input
                  type="checkbox"
                  checked={agreedToBond}
                  onChange={(e) => setAgreedToBond(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded text-blue-600 focus:ring-0 bg-slate-900 border-slate-700"
                />
                <span className="text-xs text-slate-300 leading-normal">
                  I solemnly declare that I am authorized to enter this agreement on behalf of{' '}
                  <strong className="text-white">{companyName || 'our company'}</strong>. I agree to the mandatory 40% initial advance, 10% mid-project milestone, and 50% final settlement under the terms of this deed.
                </span>
              </label>

              {agreedToBond && signatoryName && (
                <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-xs font-mono text-emerald-300 flex items-center justify-between">
                  <span>✓ Digitally Executed by: {signatoryName} ({signatoryTitle})</span>
                  <span>Date: {signedDate}</span>
                </div>
              )}
            </div>

            {/* Step 3 Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={() => setCurrentStep('kyc')}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                &larr; Back to KYC
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => window.print()}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-700"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Bond</span>
                </button>

                <button
                  onClick={() => {
                    if (!agreedToBond || !signatoryName) {
                      alert('Please sign and accept the agreement terms to proceed.');
                      return;
                    }
                    setCurrentStep('payment');
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25"
                >
                  <span>Accept Bond &amp; Pay 40% Advance</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================= STEP 4: HIGH-SECURITY & FREE PAYMENT GATEWAY ================= */}
        {currentStep === 'payment' && (
          <div className="max-w-2xl mx-auto rounded-3xl bg-slate-900/90 border border-emerald-500/40 p-6 sm:p-10 shadow-2xl animate-fadeIn">
            
            {/* Security Guarantee & Free Integration Header */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-950 to-blue-950/40 border border-emerald-500/30 mb-6 flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-300">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-white block">Bank-Grade 256-Bit SSL Encrypted</span>
                  <span className="text-[11px] text-emerald-400 font-mono">100% Free Integration &bull; 0% Client Surcharge</span>
                </div>
              </div>

              <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-slate-900 text-slate-300 border border-slate-700">
                PCI-DSS Level 1 Compliant
              </span>
            </div>

            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div>
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase block">
                  {jurisdiction === 'international' ? '🌍 Global Gateway' : '🇮🇳 Domestic Gateway'} &bull; Step 4
                </span>
                <h3 className="text-xl font-bold text-white">
                  Pay 40% Advance Deposit: {currencySymbol}{advanceAmount.toLocaleString('en-IN')}
                </h3>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                Total Scope: {currencySymbol}{totalAmount.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Jurisdiction-Aware Payment Method Selector */}
            {jurisdiction === 'international' ? (
              /* INTERNATIONAL CLIENT: STRICTLY CARD OR GLOBAL QR */
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3.5 rounded-xl border text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all ${
                      paymentMethod === 'card'
                        ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300 shadow-glow-emerald'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>International Card (Visa / MC / Amex)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('global_qr')}
                    className={`p-3.5 rounded-xl border text-xs font-mono font-bold flex items-center justify-center gap-2 transition-all ${
                      paymentMethod === 'global_qr'
                        ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300 shadow-glow-emerald'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <QrCode className="w-4 h-4" />
                    <span>Global QR (Stripe / Wise)</span>
                  </button>
                </div>
                <div className="text-[11px] text-slate-400 font-mono text-center">
                  * Domestic payment channels (UPI/RuPay/NetBanking) are restricted to Indian domestic accounts.
                </div>
              </div>
            ) : (
              /* INDIAN CLIENT: ALL PAYMENT METHODS AVAILABLE */
              <div className="grid grid-cols-3 gap-2 mb-6">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-xl border text-xs font-mono font-bold flex flex-col items-center gap-1.5 transition-all ${
                    paymentMethod === 'upi'
                      ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300 shadow-glow-emerald'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <QrCode className="w-4 h-4" />
                  <span>UPI (QR / Apps)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-xs font-mono font-bold flex flex-col items-center gap-1.5 transition-all ${
                    paymentMethod === 'card'
                      ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300 shadow-glow-emerald'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Cards (RuPay / Visa)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-3 rounded-xl border text-xs font-mono font-bold flex flex-col items-center gap-1.5 transition-all ${
                    paymentMethod === 'netbanking'
                      ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300 shadow-glow-emerald'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>Net Banking</span>
                </button>
              </div>
            )}

            {/* CHANNEL 1: CARD PAYMENT (INTERNATIONAL & DOMESTIC) */}
            {paymentMethod === 'card' && (
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 mb-6">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-2 border-b border-slate-800">
                  <span>Stripe 3D-Secure 2.0 Card Gateway</span>
                  <div className="flex items-center gap-1 text-[11px] text-cyan-400">
                    <span>Visa</span> &bull; <span>Mastercard</span> &bull; <span>Amex</span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-1">Cardholder Legal Name:</label>
                  <input
                    type="text"
                    value={cardHolder || clientName}
                    onChange={(e) => setCardHolder(e.target.value)}
                    placeholder="Name as it appears on card"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-slate-400 block mb-1">Card Number:</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4532 •••• •••• 8921"
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-mono text-slate-400 block mb-1">Expiry (MM/YY):</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="08/28"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono text-center"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-slate-400 block mb-1">CVV / CVC:</label>
                    <input
                      type="password"
                      maxLength={4}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      placeholder="•••"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono text-center"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-slate-400 block mb-1">Postal / ZIP Code:</label>
                    <input
                      type="text"
                      value={billingZip}
                      onChange={(e) => setBillingZip(e.target.value)}
                      placeholder="10001"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono text-center"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* CHANNEL 2: GLOBAL QR (INTERNATIONAL CLIENTS) */}
            {paymentMethod === 'global_qr' && (
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 mb-6 text-center">
                <div className="w-40 h-40 mx-auto bg-white p-2.5 rounded-2xl shadow-inner flex flex-col items-center justify-center">
                  <svg className="w-full h-full text-slate-900" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm8-2h2v2h-2v-2zm4 0h2v2h-2v-2zm-4 4h2v2h-2v-2zm4 0h2v2h-2v-2zm2-2h2v2h-2v-2zm0 4h2v2h-2v-2z" />
                  </svg>
                </div>
                <div className="text-xs font-mono text-slate-300">
                  Scan via Apple Pay, Google Pay Global, Stripe Link, or Wise App
                </div>
                <div className="text-[11px] text-emerald-400 font-mono">
                  Cross-Border Global Wire Ref: <strong>INTL-{agreementId}</strong>
                </div>
              </div>
            )}

            {/* CHANNEL 3: UPI PAYMENT (DOMESTIC CLIENTS) */}
            {paymentMethod === 'upi' && (
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 mb-6 text-center">
                <div className="w-40 h-40 mx-auto bg-white p-2.5 rounded-2xl shadow-inner flex flex-col items-center justify-center">
                  <svg className="w-full h-full text-slate-900" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm8-2h2v2h-2v-2zm4 0h2v2h-2v-2zm-4 4h2v2h-2v-2zm4 0h2v2h-2v-2zm2-2h2v2h-2v-2zm0 4h2v2h-2v-2z" />
                  </svg>
                </div>
                <div className="text-xs font-mono text-slate-300">
                  Scan with GPay, PhonePe, Paytm, or BHIM
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 inline-block font-mono text-xs text-emerald-400">
                  UPI ID: <strong className="text-white">6209980667-2@axl</strong> (Copy)
                </div>

                <div>
                  <label className="text-[11px] font-mono text-slate-400 block mb-1">
                    Enter UPI Reference / UTR Number (Optional for instant sync):
                  </label>
                  <input
                    type="text"
                    value={upiRef}
                    onChange={(e) => setUpiRef(e.target.value)}
                    placeholder="e.g. 402918291039"
                    className="w-full max-w-sm mx-auto px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono text-center focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            )}

            {/* CHANNEL 4: NET BANKING (DOMESTIC CLIENTS) */}
            {paymentMethod === 'netbanking' && (
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 mb-6">
                <label className="text-xs font-mono text-slate-400 block mb-1">Select Bank:</label>
                <select className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs">
                  <option>HDFC Bank Corporate / Retail</option>
                  <option>State Bank of India (SBI)</option>
                  <option>ICICI Bank</option>
                  <option>Axis Bank</option>
                  <option>Kotak Mahindra Bank</option>
                </select>
                <p className="text-[11px] text-slate-400">
                  Zero surcharge &bull; Redirects securely to your institutional net banking portal.
                </p>
              </div>
            )}

            {/* Payment Trigger Button */}
            <div className="space-y-3">
              <button
                onClick={processAdvancePayment}
                disabled={isProcessingPayment}
                className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/25 transition-all"
              >
                {isProcessingPayment ? (
                  <span>Securing Payment &amp; Registering Deed...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-emerald-200" />
                    <span>Authorize 40% Advance ({currencySymbol}{advanceAmount.toLocaleString('en-IN')})</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setCurrentStep('bond')}
                className="w-full py-2 text-xs font-mono text-slate-400 hover:text-white"
              >
                &larr; Return to Agreement Bond
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 5: OFFICIAL TAX INVOICE & DISPATCH TO INBOX ================= */}
        {currentStep === 'receipt' && receipt && (
          <div className="max-w-3xl mx-auto rounded-3xl bg-slate-900/90 border-2 border-emerald-500/50 p-6 sm:p-10 shadow-2xl animate-fadeIn space-y-8">
            
            {/* Header with verified check */}
            <div className="text-center space-y-2 pb-6 border-b border-slate-800">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-white tracking-tight">
                Project Sprint Confirmed &amp; KYC Registered!
              </h3>
              <p className="text-xs text-slate-300">
                Your 40% advance payment has been validated. Rahul &amp; Jyoti have been notified for immediate sprint kickoff.
              </p>
            </div>

            {/* Official Digital Tax Invoice Card */}
            <div className="p-6 rounded-2xl bg-black/80 border border-slate-800 space-y-4 font-mono text-xs">
              
              <div className="flex items-center justify-between text-slate-400 pb-3 border-b border-slate-800">
                <div>
                  <span className="text-[10px] uppercase text-cyan-400 block font-bold">DIGITAL TAX INVOICE &amp; RECEIPT</span>
                  <span className="text-white font-bold text-sm">{receipt.receiptId}</span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block">TRANSACTION REF</span>
                  <span className="text-emerald-400 font-bold">{receipt.transactionId}</span>
                </div>
              </div>

              {/* KYC Profile snippet */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3">
                {receipt.profilePhotoThumbnail ? (
                  <img src={receipt.profilePhotoThumbnail} alt="Signatory" className="w-10 h-10 rounded-lg object-cover border border-emerald-500" />
                ) : (
                  <User className="w-8 h-8 text-slate-500" />
                )}
                <div>
                  <div className="text-white font-bold">{companyName}</div>
                  <div className="text-slate-400 text-[11px]">Authorized Signatory: {signatoryName}</div>
                  <div className="text-emerald-400 text-[10px] font-semibold flex items-center gap-1 mt-0.5">
                    <BadgeCheck className="w-3.5 h-3.5" />
                    <span>Identity Verified: {receipt.identityReference} ({registeredCountry})</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300 pt-2">
                <div>Service: <span className="text-white font-bold">{serviceType}</span></div>
                <div>Payment Mode: <span className="text-white font-bold">{receipt.paymentMethod}</span></div>
                <div>Amount Paid (40%): <span className="text-emerald-400 font-bold text-sm">{receipt.currencySymbol}{receipt.amountPaid.toLocaleString('en-IN')}</span></div>
                <div>Remaining Balance: <span className="text-slate-400">{receipt.currencySymbol}{(receipt.totalAmount - receipt.amountPaid).toLocaleString('en-IN')}</span></div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                <div>✓ 10% Due: Upon private staging deployment review</div>
                <div>✓ 50% Balance: Upon complete QA verification and repository handover</div>
                <div>✓ Protected by 14-Day Post-Delivery Warranty &bull; Agreement ID: {agreementId}</div>
              </div>
            </div>

            {/* Direct Email to Rahul's Inbox Action Bar */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-indigo-950/60 border border-blue-500/30 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs font-mono font-bold text-cyan-300 uppercase">
                  Dispatch Complete Bond &amp; Receipt to Rahul&apos;s Inbox
                </span>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-800/40">
                  Ready to Dispatch
                </span>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Click below to instantly deliver the verified project brief, agreement bond certificate, KYC credentials, and payment confirmation to Rahul&apos;s direct email address (<strong className="text-white">rahulgupt1231@gmail.com</strong>).
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={handleSendEmail}
                  className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-500/25 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Directly to Rahul&apos;s Inbox</span>
                </button>

                <button
                  onClick={handleDirectWhatsApp}
                  className="w-full sm:w-auto py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all"
                >
                  <span>Notify via WhatsApp</span>
                </button>

                <button
                  onClick={handleCopySummary}
                  className="w-full sm:w-auto py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center justify-center gap-2 border border-slate-700"
                >
                  <Copy className="w-4 h-4" />
                  <span>{copiedSummary ? 'Copied!' : 'Copy Summary'}</span>
                </button>
              </div>

              {copiedSummary && (
                <div className="text-center text-xs text-emerald-400 font-mono animate-fadeIn">
                  ✓ Full project specification, agreement deed, and payment receipt copied to clipboard!
                </div>
              )}
            </div>

            {/* Print / Start New Project buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 text-xs font-mono text-slate-300 hover:text-white bg-slate-800 rounded-lg flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Official Invoice</span>
              </button>

              <button
                onClick={() => {
                  setReceipt(null);
                  setCurrentStep('pitch');
                }}
                className="text-xs font-mono text-blue-400 hover:underline"
              >
                Submit Another Project Scope &rarr;
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
