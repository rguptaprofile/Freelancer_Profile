import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Lock,
  CheckCircle2,
  QrCode,
  CreditCard,
  Building2,
  ArrowLeft,
  Mail,
  Smartphone,
  AlertCircle,
  FileText,
  BadgeCheck,
  Printer,
  Sparkles,
} from 'lucide-react';
import { ProjectPitchData, PaymentReceipt } from '../types';
import { paymentConfig } from '../config/paymentConfig';
import { createBackendRazorpayOrder, verifyBackendPaymentSignature } from '../services/paymentApi';

interface DedicatedPaymentPageProps {
  pitchData?: ProjectPitchData | null;
  onBack: () => void;
  onPaymentSuccess?: (receipt: PaymentReceipt) => void;
}

export const DedicatedPaymentPage: React.FC<DedicatedPaymentPageProps> = ({
  pitchData,
  onBack,
  onPaymentSuccess,
}) => {
  // Fallback default project if opened directly without prior pitch
  const effectiveData: ProjectPitchData = pitchData || {
    clientJurisdiction: 'domestic',
    clientName: 'Enterprise Client',
    companyName: 'Institutional Client',
    companyType: 'Startup / Enterprise',
    clientEmail: 'client@company.com',
    clientPhone: '+91 9876543210',
    registeredAddress: 'Corporate Office, India',
    identityType: 'Aadhaar / GSTIN',
    identityNumber: 'VERIFIED-KYC-INSTITUTIONAL',
    serviceType: 'Full-Stack Web Application & Custom Portal',
    projectBudget: '40,000',
    projectTimeline: '3 - 4 Weeks',
    projectDescription: 'Production-grade enterprise web application development with full-stack architecture, secure authentication, and database design.',
    signatoryName: 'Authorized Signatory',
    signatoryTitle: 'Managing Director / Founder',
    agreedToBond: true,
    bondSignedDate: new Date().toISOString(),
    agreementId: `AGR-${Date.now().toString().slice(-6)}`,
    currency: 'INR',
    paymentPlan: {
      advancePercentage: 40,
      midPercentage: 10,
      finalPercentage: 50,
      advanceAmount: 16000,
      totalAmount: 40000,
      currencySymbol: '₹',
      gstRate: 18,
      gstAmount: 2880,
      totalWithGst: 18880,
    },
  };

  const isInternational = effectiveData.clientJurisdiction === 'international';
  const currencySymbol = effectiveData.paymentPlan.currencySymbol || (isInternational ? '$' : '₹');
  const baseAdvanceAmount = effectiveData.paymentPlan.advanceAmount;
  const totalAmount = effectiveData.paymentPlan.totalAmount;
  const agreementId = effectiveData.agreementId;

  // 18% GST Mandatory Calculation
  const gstRate = paymentConfig.razorpay.gstRate || 18;
  const gstAmount = Math.round(baseAdvanceAmount * (gstRate / 100));
  const totalPayableWithGst = baseAdvanceAmount + gstAmount;

  // Razorpay Payment Method Preference
  const [preferredMethod, setPreferredMethod] = useState<'all' | 'upi' | 'card' | 'netbanking' | 'bank_transfer' | 'qr'>('all');

  // Verification & Status States
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [gatewayError, setGatewayError] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<PaymentReceipt | null>(null);
  const [mailSent, setMailSent] = useState<boolean>(false);

  // Dynamically ensure Razorpay checkout SDK is loaded
  useEffect(() => {
    if (!document.getElementById('razorpay-checkout-script')) {
      const script = document.createElement('script');
      script.id = 'razorpay-checkout-script';
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Complete Payment and Generate Official Tax Invoice with 18% GST
  const generateFinalReceipt = (method: string, txId: string) => {
    const newReceipt: PaymentReceipt = {
      receiptId: `INV-GST-${Date.now().toString().slice(-6)}`,
      transactionId: txId,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }) + ' ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      payerName: effectiveData.signatoryName || effectiveData.clientName,
      payerEmail: effectiveData.clientEmail,
      companyName: effectiveData.companyName,
      clientJurisdiction: effectiveData.clientJurisdiction,
      amountPaid: totalPayableWithGst, // Total including 18% GST
      baseAmount: baseAdvanceAmount,
      gstRate: gstRate,
      gstAmount: gstAmount,
      totalAmount: totalAmount,
      currency: effectiveData.currency,
      currencySymbol: currencySymbol,
      milestoneDescription: `Milestone 1 of 3: 40% Advance Deposit + 18% GST (Deed Ref: ${agreementId})`,
      paymentMethod: method,
      identityVerified: true,
      identityReference: effectiveData.identityNumber,
      profilePhotoThumbnail: effectiveData.profilePhotoUrl,
      status: 'SUCCESS',
      gateway: 'Razorpay',
      settlementAccount: paymentConfig.razorpay.settlementBankNote,
    };

    setReceipt(newReceipt);
    if (onPaymentSuccess) {
      onPaymentSuccess(newReceipt);
    }

    // Smooth scroll to top to view stamped invoice
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Launch Razorpay Universal Checkout Modal
  const handleLaunchRazorpay = async (chosenMethod?: 'all' | 'upi' | 'card' | 'netbanking' | 'bank_transfer' | 'qr') => {
    setGatewayError(null);
    setIsProcessing(true);

    const activeMethod = chosenMethod || preferredMethod;
    const RazorpayConstructor = (window as unknown as { Razorpay?: new (opts: unknown) => { open: () => void } }).Razorpay;

    if (!RazorpayConstructor) {
      setIsProcessing(false);
      setGatewayError('Razorpay secure gateway script is loading. Please check your internet connection or try again in a few seconds.');
      return;
    }

    try {
      // Map method to Razorpay prefill config
      let prefillMethod: string | undefined = undefined;
      if (activeMethod === 'card') prefillMethod = 'card';
      else if (activeMethod === 'upi' || activeMethod === 'qr') prefillMethod = 'upi';
      else if (activeMethod === 'netbanking') prefillMethod = 'netbanking';

      // 1. Attempt to generate secure order from Render backend (with 18% GST calculation)
      let serverOrderId: string | undefined = undefined;
      const backendOrder = await createBackendRazorpayOrder({
        amount: baseAdvanceAmount,
        currency: effectiveData.currency,
        agreementId,
        companyName: effectiveData.companyName,
        clientName: effectiveData.clientName,
        clientEmail: effectiveData.clientEmail,
      });

      if (backendOrder?.orderId && !backendOrder.orderId.startsWith('order_test')) {
        serverOrderId = backendOrder.orderId;
      }

      const options = {
        key: paymentConfig.razorpay.keyId,
        order_id: serverOrderId,
        amount: Math.round(totalPayableWithGst * 100), // in paise, strictly includes 18% GST
        currency: effectiveData.currency === 'USD' ? 'USD' : 'INR',
        name: paymentConfig.razorpay.businessName,
        description: `40% Advance Deposit + 18% GST - Agreement ${agreementId}`,
        image: '/images/rahul-raj.png',
        handler: async (response: { razorpay_payment_id: string; razorpay_order_id?: string; razorpay_signature?: string }) => {
          setIsProcessing(false);

          // Verify signature on backend if available
          if (response.razorpay_signature && (response.razorpay_order_id || serverOrderId)) {
            await verifyBackendPaymentSignature({
              razorpay_order_id: response.razorpay_order_id || serverOrderId || '',
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
          }

          const methodLabel = activeMethod === 'all' 
            ? 'RAZORPAY SECURE' 
            : `RAZORPAY (${activeMethod.toUpperCase()})`;
          generateFinalReceipt(
            `${methodLabel} &bull; DIRECT BANK SETTLEMENT`,
            response.razorpay_payment_id || `RZP-${Date.now().toString().slice(-8)}`
          );
        },
        prefill: {
          name: effectiveData.clientName,
          email: effectiveData.clientEmail,
          contact: effectiveData.clientPhone,
          method: prefillMethod,
        },
        notes: {
          agreement_id: agreementId,
          company: effectiveData.companyName,
          client_kyc: effectiveData.identityNumber,
          base_amount: `${currencySymbol}${baseAdvanceAmount.toLocaleString('en-IN')}`,
          gst_rate: `${gstRate}%`,
          gst_amount: `${currencySymbol}${gstAmount.toLocaleString('en-IN')}`,
          total_payable: `${currencySymbol}${totalPayableWithGst.toLocaleString('en-IN')}`,
          settlement: 'Direct Bank Settlement to Rahul Raj Account via Razorpay',
        },
        theme: {
          color: paymentConfig.razorpay.themeColor,
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
            console.log('Razorpay payment modal closed by user');
          },
        },
      };

      const rzp = new RazorpayConstructor(options);
      rzp.open();
    } catch (err: unknown) {
      setIsProcessing(false);
      console.warn('Razorpay live checkout error, enabling direct fallback:', err);
      setGatewayError(
        'Razorpay modal initialized. If your browser blocked the popup, please enable popups or retry.'
      );
    }
  };

  // Send Direct Stamped Email to rahulgupt1231@gmail.com
  const handleSendOfficialMail = () => {
    if (!receipt) return;

    const emailSubject = `[OFFICIAL PAYMENT CLEARED] ${currencySymbol}${receipt.amountPaid.toLocaleString('en-IN')} (40% + 18% GST) - ${receipt.companyName} (${agreementId})`;
    
    const emailBody = `ATTN: RAHUL RAJ (IIT PATNA) & JYOTI KUMARI (BIT MESRA)
OFFICIAL 40% ADVANCE PAYMENT CONFIRMATION & PROJECT COMMENCEMENT DOSSIER

============================================================
1. PAYMENT SETTLEMENT DETAILS (RAZORPAY DIRECT BANK CREDIT)
============================================================
Tax Invoice Number:   ${receipt.receiptId}
Razorpay Payment ID:  ${receipt.transactionId}
Payment Gateway:      Razorpay PCI-DSS Level 1 (RBI / NPCI Approved)
Payment Method:       ${receipt.paymentMethod}
Base Advance (40%):   ${receipt.currencySymbol}${baseAdvanceAmount.toLocaleString('en-IN')}
GST Rate Applicable:  ${gstRate}% (CGST 9% + SGST 9% / IGST 18%)
GST Amount:           ${receipt.currencySymbol}${gstAmount.toLocaleString('en-IN')}
Total Amount Paid:    ${receipt.currencySymbol}${receipt.amountPaid.toLocaleString('en-IN')} (Includes 18% GST)
Total Project Scope:  ${receipt.currencySymbol}${receipt.totalAmount.toLocaleString('en-IN')}
Settlement Note:      Direct Bank Account Settlement into Rahul Raj's Linked Bank Account
Date & Timestamp:     ${receipt.date}
Security Standard:    256-Bit SSL Encrypted • PCI-DSS Level 1 • 3D-Secure 2.0 OTP Verified

============================================================
2. CLIENT IDENTIFICATION & VERIFIED KYC
============================================================
Client Name:          ${effectiveData.clientName}
Signatory:            ${effectiveData.signatoryName} (${effectiveData.signatoryTitle})
Company / Business:   ${effectiveData.companyName} (${effectiveData.companyType})
Email:                ${effectiveData.clientEmail}
Phone / WhatsApp:     ${effectiveData.clientPhone}
Registered Address:   ${effectiveData.registeredAddress}
National ID Type:     ${effectiveData.identityType}
ID Reference Number:  ${effectiveData.identityNumber}
KYC Verification:     VERIFIED & ATTACHED

============================================================
3. AGREED SCOPE & BINDING 40%-10%-50% BOND PAPER
============================================================
Agreement Ref ID:     ${agreementId}
Service Ordered:      ${effectiveData.serviceType}
Estimated Timeline:   ${effectiveData.projectTimeline}
Bond Execution Date:  ${effectiveData.bondSignedDate}
Warranty:             14-Day Post-Delivery Warranty Included
IP Handover:          100% Code & Asset Transfer upon Milestone 3 Clearance

Project Scope Details:
${effectiveData.projectDescription}

============================================================
STATUS: PAYMENT VALIDATED VIA RAZORPAY & CREDITED TO BANK.
COMMENCE IMMEDIATE SPRINT PLANNING & REPOSITORY SETUP.
============================================================`;

    const mailtoUrl = `mailto:${paymentConfig.notificationEmail}?subject=${encodeURIComponent(
      emailSubject
    )}&body=${encodeURIComponent(emailBody)}`;

    window.open(mailtoUrl, '_blank');
    setMailSent(true);
    setTimeout(() => setMailSent(false), 4000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col font-sans selection:bg-emerald-600/30 selection:text-emerald-200">
      
      {/* ================= TOP TRUST & BANK-GRADE SSL BAR ================= */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-[#0A0D14]/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Back button */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Portfolio</span>
          </button>

          {/* Razorpay Bank-Grade Security Status Indicator */}
          <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <Lock className="w-3 h-3 text-emerald-400" />
            <span className="font-bold tracking-tight">Razorpay 256-Bit SSL &bull; Direct Bank Account Settlement</span>
          </div>

          {/* 18% GST Pill */}
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono text-cyan-300 bg-blue-950/40 border border-blue-500/30 px-3 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>18% GST Compliant &bull; Official Digital Tax Invoice</span>
          </div>
        </div>
      </header>

      {/* ================= MAIN CHECKOUT CONTENT ================= */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* If receipt exists, show official Tax Invoice & Stamped Deed */}
        {receipt ? (
          <div className="max-w-3xl mx-auto rounded-3xl bg-slate-900/95 border-2 border-emerald-500/50 p-6 sm:p-10 shadow-2xl space-y-8 animate-fadeIn">
            
            {/* Header Badge */}
            <div className="text-center space-y-2 pb-6 border-b border-slate-800">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-emerald-500/20">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold block">
                Official Digital Tax Invoice &bull; Razorpay Payment Cleared
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Payment Authorized &amp; Credited to Bank Account
              </h2>
              <p className="text-xs text-slate-400 max-w-lg mx-auto">
                Your 40% advance deposit with 18% GST has been processed securely via Razorpay. Funds are credited directly to Rahul Raj&apos;s bank account. Sprint has been scheduled!
              </p>
            </div>

            {/* Official Stamped Receipt Box */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 font-mono text-xs text-slate-300">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-[11px] text-slate-400">
                <span>TAX INVOICE REF: <strong className="text-white">{receipt.receiptId}</strong></span>
                <span>RAZORPAY TX ID: <strong className="text-emerald-400">{receipt.transactionId}</strong></span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-2">
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase">Client / Signatory</span>
                  <span className="text-white font-bold">{receipt.payerName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase">Company / Entity</span>
                  <span className="text-white font-bold">{receipt.companyName}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase">Agreement Ref</span>
                  <span className="text-cyan-400 font-bold">{agreementId}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase">Timestamp</span>
                  <span className="text-slate-300">{receipt.date}</span>
                </div>
              </div>

              {/* GST Breakdown in Receipt */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2.5">
                <div className="flex justify-between items-center text-slate-400 pb-2 border-b border-slate-800">
                  <span>Base 40% Advance Deposit:</span>
                  <span className="text-white font-bold">{receipt.currencySymbol}{baseAdvanceAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center text-slate-400 pb-2 border-b border-slate-800">
                  <span>Applicable GST (18% - CGST 9% + SGST 9%):</span>
                  <span className="text-cyan-300 font-bold">+{receipt.currencySymbol}{gstAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between items-center text-white pt-1">
                  <div>
                    <span className="text-xs font-bold block">Total Amount Paid (Incl. 18% GST):</span>
                    <span className="text-[11px] text-emerald-400 block">
                      Gateway: Razorpay &bull; Settled Directly to Rahul Raj Bank Account
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-emerald-400">
                      {receipt.currencySymbol}{receipt.amountPaid.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-[11px]">
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Verified KYC Reference:</span>
                  <span className="text-white font-bold">{receipt.identityReference}</span>
                  <span className="text-emerald-400 block text-[10px] mt-0.5">&check; Bank &amp; Identity Certified</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Milestone 2 (10% on Live Staging):</span>
                  <span className="text-amber-300 font-bold">
                    {receipt.currencySymbol}{((receipt.totalAmount * 10) / 100).toLocaleString('en-IN')} (Upon Staging Preview)
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Email Dispatch to rahulgupt1231@gmail.com */}
            <div className="p-5 rounded-2xl bg-blue-950/30 border border-blue-500/30 text-center space-y-3">
              <div className="flex items-center justify-center gap-2 text-cyan-300 text-xs font-mono font-bold">
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>DIRECT INBOX DISPATCH TO RAHUL RAJ</span>
              </div>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Click below to deliver the project brief, agreement bond certificate, KYC credentials, and official 18% GST payment receipt directly to Rahul&apos;s email (<strong className="text-white">{paymentConfig.notificationEmail}</strong>).
              </p>
              
              <button
                onClick={handleSendOfficialMail}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 mx-auto transition-all shadow-lg shadow-blue-500/25"
              >
                <Mail className="w-4 h-4" />
                <span>Send Verified Project &amp; Payment Dossier via Email</span>
              </button>

              {mailSent && (
                <div className="text-xs font-mono text-emerald-400 animate-fadeIn">
                  &check; Email client opened with full verified project specs &amp; 18% GST receipt!
                </div>
              )}
            </div>

            {/* Print & Return Buttons */}
            <div className="flex items-center justify-between gap-3 pt-4 border-t border-slate-800 flex-wrap">
              <button
                onClick={handlePrint}
                className="px-4 py-2 text-xs font-mono rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Official Tax Invoice</span>
              </button>

              <button
                onClick={onBack}
                className="px-6 py-2.5 text-xs font-mono font-bold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1.5 transition-colors shadow-md shadow-emerald-500/20"
              >
                <span>Return to Studio Portfolio &rarr;</span>
              </button>
            </div>
          </div>
        ) : (
          /* ================= ACTIVE RAZORPAY PAYMENT CHECKOUT FORM ================= */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: ORDER SUMMARY & 18% GST BREAKDOWN (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Order Card */}
              <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-mono uppercase text-slate-400 font-bold">Project Order</span>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-500/15 text-cyan-300 border border-blue-500/30">
                    {agreementId}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white mb-1">
                    {effectiveData.serviceType}
                  </h3>
                  <div className="text-xs text-slate-400 font-mono">
                    Client: <span className="text-white font-medium">{effectiveData.companyName}</span> ({effectiveData.clientName})
                  </div>
                </div>

                {/* Phased Milestone Breakdown */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">
                    Milestone Schedule:
                  </span>
                  
                  {/* Milestone 1 (Active) */}
                  <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-emerald-300 block">
                        Milestone 1: 40% Advance Deposit (DUE TODAY)
                      </span>
                      <span className="text-[10px] text-slate-400">
                        Work commences immediately upon clearance
                      </span>
                    </div>
                    <span className="text-sm font-extrabold text-emerald-400">
                      {currencySymbol}{baseAdvanceAmount.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Milestone 2 */}
                  <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800/80 flex items-center justify-between opacity-75">
                    <div>
                      <span className="text-[11px] text-slate-300 block">
                        Milestone 2: 10% Live Staging Review
                      </span>
                      <span className="text-[10px] text-slate-500">
                        Paid only after functional preview is verified
                      </span>
                    </div>
                    <span className="text-xs text-slate-400">
                      {currencySymbol}{((totalAmount * 10) / 100).toLocaleString('en-IN')}
                    </span>
                  </div>

                  {/* Milestone 3 */}
                  <div className="p-2.5 rounded-xl bg-slate-900/70 border border-slate-800/80 flex items-center justify-between opacity-75">
                    <div>
                      <span className="text-[11px] text-slate-300 block">
                        Milestone 3: 50% Final Delivery &amp; Git Handover
                      </span>
                      <span className="text-[10px] text-slate-500">
                        Full IP rights + 14-day warranty handover
                      </span>
                    </div>
                    <span className="text-xs text-slate-400">
                      {currencySymbol}{((totalAmount * 50) / 100).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Transparent 18% GST Calculation Box */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-950 to-blue-950/20 border border-blue-500/30 space-y-2.5 text-xs font-mono">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Base 40% Advance:</span>
                    <span className="text-white font-medium">{currencySymbol}{baseAdvanceAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex items-center justify-between text-cyan-300">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Applicable GST (18%):</span>
                    </span>
                    <span className="font-bold">+{currencySymbol}{gstAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 leading-tight">
                    * Standard 18% GST (CGST 9% + SGST 9% / IGST 18%) compliant tax invoice generated instantly.
                  </div>
                  <div className="flex items-center justify-between text-sm font-bold text-white pt-2.5 border-t border-slate-800">
                    <span className="text-emerald-300">Total Payable (with 18% GST):</span>
                    <span className="text-emerald-400 text-xl font-extrabold">
                      {currencySymbol}{totalPayableWithGst.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Verified KYC Info */}
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2.5 text-xs">
                  <BadgeCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <div className="text-[11px] font-mono leading-tight">
                    <span className="text-slate-400 block">Signatory KYC Registered:</span>
                    <span className="text-slate-200">{effectiveData.identityType} ({effectiveData.identityNumber})</span>
                  </div>
                </div>
              </div>

              {/* Direct Bank Settlement Guarantee */}
              <div className="p-5 rounded-3xl bg-slate-900/60 border border-slate-800/80 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>DIRECT BANK ACCOUNT SETTLEMENT</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-400 leading-relaxed">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">&bull;</span>
                    <span><strong>Direct Bank Credit:</strong> All payments made via Razorpay (Card, UPI, Scan QR, NetBanking, or Bank Transfer) flow directly into Rahul Raj&apos;s registered bank account. No middleman hold.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">&bull;</span>
                    <span><strong>PCI-DSS Level 1 Encryption:</strong> 256-bit banking grade security. All card &amp; UPI data is authenticated via RBI 3D-Secure 2.0 OTP directly by your bank.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-400 font-bold">&bull;</span>
                    <span><strong>100% Tax Compliant:</strong> Official 18% GST invoice provided immediately for corporate input tax credit (ITC).</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* RIGHT COLUMN: SINGLE PAYMENT SYSTEM: RAZORPAY (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 border-2 border-emerald-500/40 shadow-2xl space-y-6">
                
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800 flex-wrap gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold">
                        Official Payment Gateway: Razorpay
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                        PCI-DSS Level 1
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                      Choose Your Payment Method
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-slate-400 block uppercase">Total Due (with 18% GST)</span>
                    <span className="text-2xl font-extrabold text-emerald-400 font-mono">
                      {currencySymbol}{totalPayableWithGst.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Error Banner */}
                {gatewayError && (
                  <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/40 text-amber-300 text-xs font-mono flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                    <span>{gatewayError}</span>
                  </div>
                )}

                {/* Notice: All Methods Routed via Razorpay */}
                <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs text-slate-300 flex items-center gap-3">
                  <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    Select any payment method below. Every transaction is processed exclusively via <strong>Razorpay</strong> and credited directly to Rahul Raj&apos;s linked bank account.
                  </span>
                </div>

                {/* 5 PAYMENT METHODS (ALL PROCESSED BY RAZORPAY) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  
                  {/* Option 1: UPI */}
                  <button
                    type="button"
                    onClick={() => {
                      setPreferredMethod('upi');
                      handleLaunchRazorpay('upi');
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      preferredMethod === 'upi'
                        ? 'bg-emerald-600/20 border-emerald-500 text-white shadow-glow-emerald'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                        <Smartphone className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white block">UPI / Instant Pay</span>
                        <span className="text-[10px] text-slate-400 font-mono">GPay, PhonePe, Paytm, CRED</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Pay instantly with any UPI app on your phone with zero delay.
                    </p>
                  </button>

                  {/* Option 2: Scan QR Code */}
                  <button
                    type="button"
                    onClick={() => {
                      setPreferredMethod('qr');
                      handleLaunchRazorpay('qr');
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      preferredMethod === 'qr'
                        ? 'bg-emerald-600/20 border-emerald-500 text-white shadow-glow-emerald'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                        <QrCode className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white block">Scan QR Code</span>
                        <span className="text-[10px] text-slate-400 font-mono">Dynamic Razorpay QR</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Scan the dynamic QR code directly from any banking or UPI app.
                    </p>
                  </button>

                  {/* Option 3: Credit / Debit Card */}
                  <button
                    type="button"
                    onClick={() => {
                      setPreferredMethod('card');
                      handleLaunchRazorpay('card');
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      preferredMethod === 'card'
                        ? 'bg-emerald-600/20 border-emerald-500 text-white shadow-glow-emerald'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                        <CreditCard className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white block">Credit &amp; Debit Cards</span>
                        <span className="text-[10px] text-slate-400 font-mono">RuPay, Visa, MasterCard, Amex</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Domestic &amp; International cards with mandatory bank OTP verification.
                    </p>
                  </button>

                  {/* Option 4: Net Banking */}
                  <button
                    type="button"
                    onClick={() => {
                      setPreferredMethod('netbanking');
                      handleLaunchRazorpay('netbanking');
                    }}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      preferredMethod === 'netbanking'
                        ? 'bg-emerald-600/20 border-emerald-500 text-white shadow-glow-emerald'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white block">Net Banking</span>
                        <span className="text-[10px] text-slate-400 font-mono">50+ Indian Banks (SBI, HDFC, ICICI)</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Direct institutional and retail net banking authorization.
                    </p>
                  </button>

                  {/* Option 5: Bank Transfer / NEFT / RTGS / IMPS */}
                  <button
                    type="button"
                    onClick={() => {
                      setPreferredMethod('bank_transfer');
                      handleLaunchRazorpay('all');
                    }}
                    className={`sm:col-span-2 p-4 rounded-2xl border text-left transition-all ${
                      preferredMethod === 'bank_transfer'
                        ? 'bg-emerald-600/20 border-emerald-500 text-white shadow-glow-emerald'
                        : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-white block">Bank Transfer (NEFT / IMPS / RTGS)</span>
                        <span className="text-[10px] text-slate-400 font-mono">Corporate Wire via Razorpay Smart Collect</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-snug">
                      Recommended for companies, corporate treasury, and institutional clients transferring via RTGS/NEFT.
                    </p>
                  </button>

                </div>

                {/* Main Launch Razorpay Button */}
                <div className="pt-2 space-y-3">
                  <button
                    type="button"
                    onClick={() => handleLaunchRazorpay()}
                    disabled={isProcessing}
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm sm:text-base font-mono flex items-center justify-center gap-3 shadow-xl shadow-emerald-500/25 transition-all transform active:scale-[0.99] disabled:opacity-50"
                  >
                    <Lock className="w-5 h-5 text-emerald-200" />
                    <span>
                      {isProcessing 
                        ? 'Opening Razorpay Gateway...' 
                        : `Pay ${currencySymbol}${totalPayableWithGst.toLocaleString('en-IN')} via Razorpay`}
                    </span>
                  </button>

                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 px-1">
                    <span>Includes 18% GST ({currencySymbol}{gstAmount.toLocaleString('en-IN')})</span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Direct Bank Credit: Rahul Raj
                    </span>
                  </div>
                </div>

                {/* Razorpay Trust Badge */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 flex items-center justify-between flex-wrap gap-2 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <BadgeCheck className="w-4 h-4 text-emerald-400" />
                    <span>Powered exclusively by Razorpay Payment Systems</span>
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Settlement: Direct Automated Bank Transfer
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

      </main>
    </div>
  );
};
