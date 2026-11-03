import React, { useState } from 'react';
import { bondTermsAndConditions } from '../data/portfolioData';
import { ProjectPitchData, PaymentReceipt } from '../types';
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
} from 'lucide-react';

interface WorkSectionProps {
  initialServiceId?: string;
}

export const WorkSection: React.FC<WorkSectionProps> = ({ initialServiceId }) => {
  // Navigation step within Work section
  const [currentStep, setCurrentStep] = useState<'pitch' | 'bond' | 'payment' | 'receipt'>('pitch');

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
  const [budgetTier, setBudgetTier] = useState<number>(35000); // INR default
  const [selectedTimeline, setSelectedTimeline] = useState('2-3 Weeks');

  // Bond & Signature State
  const [signatoryName, setSignatoryName] = useState('');
  const [signatoryTitle, setSignatoryTitle] = useState('Founder / Director');
  const [agreedToBond, setAgreedToBond] = useState(false);
  const [agreementId] = useState(`AGR-${Math.floor(100000 + Math.random() * 900000)}`);
  const [signedDate] = useState(new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }));

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [upiRef, setUpiRef] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [receipt, setReceipt] = useState<PaymentReceipt | null>(null);
  const [copiedSummary, setCopiedSummary] = useState(false);

  // Financial calculations
  const totalAmount = budgetTier;
  const advanceAmount = Math.round(totalAmount * 0.40); // 40% upfront
  const midAmount = Math.round(totalAmount * 0.10);     // 10% during project
  const finalAmount = Math.round(totalAmount * 0.50);   // 50% upon completion

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

  const budgetOptions = [
    { label: 'Starter Sprint', amount: 20000, desc: 'Single-page app, landing page or content suite' },
    { label: 'Growth Project', amount: 35000, desc: 'Full-stack web application with authentication & DB' },
    { label: 'Enterprise / Custom Portal', amount: 65000, desc: 'Multi-level workflows, RBAC, payment, audit logs' },
    { label: 'Custom Enterprise Scope', amount: 95000, desc: 'High-concurrency systems, AI integration & turnkey copy' },
  ];

  // Generate Email Content
  const generateFormattedEmailBody = () => {
    return `=====================================================
PROJECT PITCH & CLIENT-FREELANCER AGREEMENT SUBMISSION
=====================================================

1. CLIENT & COMPANY OVERVIEW:
-----------------------------------------------------
Signatory / Client Name: ${clientName || signatoryName || 'N/A'}
Designation / Title: ${signatoryTitle || 'N/A'}
Company / Business: ${companyName || 'N/A'}
Organization Category: ${companyType.toUpperCase()}
Email Address: ${clientEmail || 'N/A'}
Phone / WhatsApp: ${clientPhone || 'N/A'}

2. PROJECT SCOPE & SERVICE REQUIRED:
-----------------------------------------------------
Service Pillar: ${serviceType}
Selected Timeline: ${selectedTimeline}
Agreed Total Project Budget: ₹${totalAmount.toLocaleString('en-IN')}

Project Details & Requirements:
${projectDescription || 'Client has submitted requirements for direct review.'}

3. MANDATORY MILESTONE PAYMENT SCHEDULE (40% - 10% - 50%):
-----------------------------------------------------
- 40% Upfront Advance Deposit: ₹${advanceAmount.toLocaleString('en-IN')} (Sprint Initiation)
- 10% Mid-Project Milestone:  ₹${midAmount.toLocaleString('en-IN')} (Staging Review)
- 50% Final Settlement:        ₹${finalAmount.toLocaleString('en-IN')} (Post QA & Repo Handover)

4. BOND PAPER & CONTRACTUAL STATUS:
-----------------------------------------------------
Official Agreement ID: ${agreementId}
Digital Bond Signed: ${agreedToBond ? 'YES, DIGITALLY ACKNOWLEDGED' : 'PENDING SIGNATURE'}
Signed Date: ${signedDate}
Authorized Signatory: ${signatoryName || clientName}
IP Transfer & NDA Clause: INCLUDED (100% IP Handover upon final milestone)
Warranty Period: 14-Day Post-Delivery Bug Support

${receipt ? `5. PAYMENT VERIFICATION RECORD:
-----------------------------------------------------
Transaction Ref: ${receipt.transactionId}
Amount Paid (40% Advance): ₹${receipt.amountPaid.toLocaleString('en-IN')}
Status: VERIFIED SUCCESSFUL` : ''}

=====================================================
Dispatched via Rahul & Jyoti Studio Hiring Engine
Recipient: rahulgupt1231@gmail.com
=====================================================`;
  };

  const handleSendEmail = () => {
    const subject = encodeURIComponent(`New Project Pitch & Signed Bond: ${companyName || clientName} (${serviceType})`);
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
      `Hello Rahul & Jyoti,\nI have submitted a project pitch for *${companyName || clientName}*.\nService: ${serviceType}\nBudget: ₹${totalAmount.toLocaleString('en-IN')}\nAgreement ID: ${agreementId}\nPlease check the pitch details.`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  // Simulate Payment Execution
  const processAdvancePayment = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      const newReceipt: PaymentReceipt = {
        receiptId: `REC-${Math.floor(100000 + Math.random() * 900000)}`,
        transactionId: `TXN-UPI-${Date.now().toString().slice(-8)}`,
        date: new Date().toLocaleString('en-IN'),
        payerName: clientName || signatoryName || 'Valued Client',
        payerEmail: clientEmail || 'client@example.com',
        companyName: companyName || 'Company / Store',
        amountPaid: advanceAmount,
        totalAmount: totalAmount,
        milestoneDescription: '40% Initial Upfront Advance (Sprint & Wireframe Kickoff)',
        paymentMethod: paymentMethod.toUpperCase(),
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
            <span>CLIENT HIRING &amp; PROJECT PITCH ENGINE</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Pitch Your Project, Sign Agreement &amp; Hire Us
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Whether you are a startup founder, bank, retail shop owner, or company, submit your exact project requirements, review our binding 40%-10%-50% agreement bond, and initiate your build securely.
          </p>

          {/* Interactive Step Navigator */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-2xl mx-auto">
            <button
              onClick={() => setCurrentStep('pitch')}
              className={`p-2.5 rounded-xl text-xs font-mono font-semibold transition-all flex items-center justify-center gap-1.5 border ${
                currentStep === 'pitch'
                  ? 'bg-blue-600 text-white border-blue-500 shadow-glow-blue'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              <span>1. Project Pitch</span>
            </button>

            <button
              onClick={() => setCurrentStep('bond')}
              className={`p-2.5 rounded-xl text-xs font-mono font-semibold transition-all flex items-center justify-center gap-1.5 border ${
                currentStep === 'bond'
                  ? 'bg-cyan-600 text-white border-cyan-500 shadow-cyan-500/20'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              <span>2. Milestone Bond</span>
            </button>

            <button
              onClick={() => setCurrentStep('payment')}
              className={`p-2.5 rounded-xl text-xs font-mono font-semibold transition-all flex items-center justify-center gap-1.5 border ${
                currentStep === 'payment'
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-glow-emerald'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
              }`}
            >
              <span>3. 40% Payment</span>
            </button>

            <button
              onClick={() => receipt && setCurrentStep('receipt')}
              disabled={!receipt}
              className={`p-2.5 rounded-xl text-xs font-mono font-semibold transition-all flex items-center justify-center gap-1.5 border ${
                currentStep === 'receipt'
                  ? 'bg-purple-600 text-white border-purple-500 shadow-purple-500/20'
                  : 'bg-slate-900 text-slate-500 border-slate-800 cursor-not-allowed'
              }`}
            >
              <span>4. Execution Receipt</span>
            </button>
          </div>
        </div>

        {/* ================= STEP 1: PROJECT PITCH FORM ================= */}
        {currentStep === 'pitch' && (
          <div className="max-w-4xl mx-auto rounded-3xl bg-slate-900/70 border border-slate-800 p-6 sm:p-10 shadow-2xl backdrop-blur-md animate-fadeIn">
            <div className="flex items-center justify-between pb-6 border-b border-slate-800 mb-8">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white">
                  Step 1: Company Profile &amp; Project Requirements
                </h3>
                <p className="text-xs text-slate-400">
                  Fill in your project specifications to structure your custom freelance contract.
                </p>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                Direct to Rahul&apos;s Inbox
              </span>
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
              <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block mb-3">
                C. Estimated Budget Tier (Transparent Milestone Model):
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
                {budgetOptions.map((tier) => (
                  <button
                    key={tier.amount}
                    type="button"
                    onClick={() => setBudgetTier(tier.amount)}
                    className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      budgetTier === tier.amount
                        ? 'bg-emerald-950/30 border-emerald-500 text-white shadow-glow-emerald'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <span className="text-xs font-mono text-emerald-400 font-bold block mb-1">{tier.label}</span>
                      <span className="text-lg font-bold text-white block">₹{tier.amount.toLocaleString('en-IN')}</span>
                      <span className="text-[11px] text-slate-400 leading-tight block mt-1">{tier.desc}</span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Phased Milestone Breakdown Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-950 to-indigo-950/40 border border-blue-500/30 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] font-mono uppercase text-blue-400 font-bold block">40% Upfront Advance</span>
                  <span className="text-base font-bold text-white">₹{advanceAmount.toLocaleString('en-IN')}</span>
                  <span className="text-[10px] text-slate-400 block">Required to begin work</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block">10% Mid-Project</span>
                  <span className="text-base font-bold text-white">₹{midAmount.toLocaleString('en-IN')}</span>
                  <span className="text-[10px] text-slate-400 block">Upon private staging demo</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
                  <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">50% Final Settlement</span>
                  <span className="text-base font-bold text-white">₹{finalAmount.toLocaleString('en-IN')}</span>
                  <span className="text-[10px] text-slate-400 block">Post QA &amp; Git handover</span>
                </div>
              </div>
            </div>

            {/* D. Project Description & Client Details */}
            <div className="space-y-4 mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1.5">
                    Your Name / Contact Person *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. Vikram Singhania"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1.5">
                    Company / Shop / Organization Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Singhania Retail &amp; Logistics"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1.5">
                    Email Address (For Agreement Copy) *
                  </label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="e.g. vikram@singhania.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1.5">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

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

            {/* Navigation to Bond Step */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-slate-800">
              <span className="text-xs text-slate-400 font-mono">
                Next: Review &amp; Sign the Official 40%-10%-50% Project Bond Paper
              </span>

              <button
                onClick={() => {
                  if (!clientName || !companyName || !clientEmail) {
                    alert('Please provide your Name, Company, and Email to proceed.');
                    return;
                  }
                  setSignatoryName(clientName);
                  setCurrentStep('bond');
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all"
              >
                <span>Proceed to Digital Agreement Bond</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* ================= STEP 2: LEGAL BOND PAPER & AGREEMENT ================= */}
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
                <strong className="text-cyan-300">{companyName || 'The Client'}</strong> (Client).
              </p>
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
                <span className="text-white font-bold">₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="h-[1px] bg-slate-800 my-1" />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
                <div className="text-blue-400">1. Upfront Advance (40%): ₹{advanceAmount.toLocaleString('en-IN')}</div>
                <div className="text-cyan-400">2. Mid-Milestone (10%): ₹{midAmount.toLocaleString('en-IN')}</div>
                <div className="text-emerald-400">3. Final Handover (50%): ₹{finalAmount.toLocaleString('en-IN')}</div>
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
                  <strong className="text-white">{companyName || 'our company'}</strong>. I agree to the mandatory 40% initial advance, 10% mid-project milestone, and 50% final settlement as detailed in this binding agreement.
                </span>
              </label>

              {agreedToBond && signatoryName && (
                <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/40 text-xs font-mono text-emerald-300 flex items-center justify-between">
                  <span>✓ Digitally Executed by: {signatoryName} ({signatoryTitle})</span>
                  <span>Date: {signedDate}</span>
                </div>
              )}
            </div>

            {/* Step 2 Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                onClick={() => setCurrentStep('pitch')}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                &larr; Back to Scope
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

        {/* ================= STEP 3: 40% PAYMENT GATEWAY INTEGRATION ================= */}
        {currentStep === 'payment' && (
          <div className="max-w-2xl mx-auto rounded-3xl bg-slate-900/80 border border-emerald-500/40 p-6 sm:p-10 shadow-2xl animate-fadeIn">
            
            <div className="flex items-center justify-between pb-6 border-b border-slate-800 mb-6">
              <div>
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase block">
                  Step 3: Initial Milestone Clearance
                </span>
                <h3 className="text-xl font-bold text-white">
                  Pay 40% Advance Deposit: ₹{advanceAmount.toLocaleString('en-IN')}
                </h3>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                Total Scope: ₹{totalAmount.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Payment Method Selector */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              <button
                type="button"
                onClick={() => setPaymentMethod('upi')}
                className={`p-3 rounded-xl border text-xs font-mono font-bold flex flex-col items-center gap-1.5 transition-all ${
                  paymentMethod === 'upi'
                    ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <QrCode className="w-4 h-4" />
                <span>UPI (GPay / PhonePe)</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border text-xs font-mono font-bold flex flex-col items-center gap-1.5 transition-all ${
                  paymentMethod === 'card'
                    ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Card (Debit / Credit)</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('netbanking')}
                className={`p-3 rounded-xl border text-xs font-mono font-bold flex flex-col items-center gap-1.5 transition-all ${
                  paymentMethod === 'netbanking'
                    ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>Net Banking</span>
              </button>
            </div>

            {/* UPI Payment Channel */}
            {paymentMethod === 'upi' && (
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 mb-6 text-center">
                <div className="w-40 h-40 mx-auto bg-white p-2.5 rounded-2xl shadow-inner flex flex-col items-center justify-center">
                  {/* Generated QR Placeholder SVG */}
                  <svg className="w-full h-full text-slate-900" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm8-2h2v2h-2v-2zm4 0h2v2h-2v-2zm-4 4h2v2h-2v-2zm4 0h2v2h-2v-2zm2-2h2v2h-2v-2zm0 4h2v2h-2v-2z" />
                  </svg>
                </div>
                <div className="text-xs font-mono text-slate-300">
                  Scan with GPay, PhonePe, Paytm, or BHIM
                </div>
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 inline-block font-mono text-xs text-emerald-400">
                  UPI ID: <strong className="text-white">rahulraj@oksbi</strong> (Copy)
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

            {/* Card Payment Channel */}
            {paymentMethod === 'card' && (
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 mb-6">
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
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-mono text-slate-400 block mb-1">Expiry (MM/YY):</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="08/28"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-slate-400 block mb-1">CVV:</label>
                    <input
                      type="password"
                      maxLength={4}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      placeholder="•••"
                      className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Net Banking Channel */}
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
                  Redirects securely to your institutional net banking portal.
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
                  <span>Securing Payment &amp; Registering Bond...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-emerald-200" />
                    <span>Authorize 40% Advance (₹{advanceAmount.toLocaleString('en-IN')})</span>
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

        {/* ================= STEP 4: OFFICIAL RECEIPT & DISPATCH TO INBOX ================= */}
        {currentStep === 'receipt' && receipt && (
          <div className="max-w-3xl mx-auto rounded-3xl bg-slate-900/90 border-2 border-emerald-500/50 p-6 sm:p-10 shadow-2xl animate-fadeIn space-y-8">
            
            {/* Header with verified check */}
            <div className="text-center space-y-2 pb-6 border-b border-slate-800">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-2">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-white tracking-tight">
                Project Sprint Confirmed &amp; Bond Registered!
              </h3>
              <p className="text-xs text-slate-300">
                Your 40% advance payment has been validated. Rahul &amp; Jyoti have been notified for immediate sprint kickoff.
              </p>
            </div>

            {/* Official Digital Receipt Card */}
            <div className="p-6 rounded-2xl bg-black/70 border border-slate-800 space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between text-slate-400 pb-2 border-b border-slate-800">
                <span>RECEIPT NUMBER: <strong className="text-white">{receipt.receiptId}</strong></span>
                <span>TXN: <strong className="text-emerald-400">{receipt.transactionId}</strong></span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
                <div>Company: <span className="text-white font-bold">{companyName}</span></div>
                <div>Authorized By: <span className="text-white font-bold">{signatoryName}</span></div>
                <div>Service: <span className="text-white font-bold">{serviceType}</span></div>
                <div>Payment Mode: <span className="text-white font-bold">{receipt.paymentMethod}</span></div>
                <div>Amount Paid (40%): <span className="text-emerald-400 font-bold text-sm">₹{receipt.amountPaid.toLocaleString('en-IN')}</span></div>
                <div>Remaining Balance: <span className="text-slate-400">₹{(totalAmount - receipt.amountPaid).toLocaleString('en-IN')}</span></div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                <div>✓ 10% Due: Upon private staging deployment review</div>
                <div>✓ 50% Balance: Upon complete QA verification and repository handover</div>
                <div>✓ Protected by 14-Day Post-Delivery Warranty</div>
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
                Click below to instantly deliver the verified project brief, agreement bond certificate, and payment confirmation to Rahul&apos;s direct email address (<strong className="text-white">rahulgupt1231@gmail.com</strong>).
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
                  ✓ Full project specification and agreement summary copied to clipboard!
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
                <span>Print Official Receipt</span>
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
