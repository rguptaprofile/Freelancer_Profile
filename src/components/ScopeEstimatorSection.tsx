import React, { useState } from 'react';
import { Sparkles, MessageSquare, Send, CheckCircle2, Copy, Clock, Layers, ArrowRight } from 'lucide-react';

interface ScopeEstimatorProps {
  initialService?: string;
}

export const ScopeEstimatorSection: React.FC<ScopeEstimatorProps> = ({ initialService }) => {
  const [selectedService, setSelectedService] = useState<string>(
    initialService || 'bundle'
  );
  const [features, setFeatures] = useState<string[]>([
    'auth-rbac',
    'responsive-ui',
    'production-deploy',
  ]);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [projectBrief, setProjectBrief] = useState('');
  const [copied, setCopied] = useState(false);

  const serviceOptions = [
    {
      id: 'pillar-web-dev',
      title: 'Full-Stack Web App',
      tag: 'Code Architecture',
      baseDays: '14–21 Days',
    },
    {
      id: 'pillar-content-writing',
      title: 'Technical / SEO Writing',
      tag: 'Authority Content',
      baseDays: '5–10 Days',
    },
    {
      id: 'pillar-design-copy',
      title: 'Web Design + Copy',
      tag: 'UI & Messaging',
      baseDays: '7–12 Days',
    },
    {
      id: 'bundle',
      title: 'Complete Turnkey Package',
      tag: 'Code + Design + Copy (USP)',
      baseDays: '15–24 Days',
    },
  ];

  const featureOptions = [
    { id: 'auth-rbac', label: 'Role-Based Authentication & Permissions (JWT / RBAC)' },
    { id: 'database', label: 'PostgreSQL / MongoDB Database Design with Schema Integrity' },
    { id: 'ai-tools', label: 'AI Document Parsing / Analytics API Integration' },
    { id: 'seo-articles', label: '3x Long-Form Technical / SEO Authority Articles' },
    { id: 'responsive-ui', label: 'Conversion-Focused Tailwind UI & Figma Wireframes' },
    { id: 'production-deploy', label: 'Cloud / Vercel Production Deployment + 14-Day Warranty' },
  ];

  const toggleFeature = (id: string) => {
    if (features.includes(id)) {
      setFeatures(features.filter((f) => f !== id));
    } else {
      setFeatures([...features, id]);
    }
  };

  // Calculate estimated timeline
  const getEstimatedTimeline = () => {
    let daysMin = selectedService === 'pillar-content-writing' ? 5 : selectedService === 'bundle' ? 14 : 10;
    let daysMax = selectedService === 'pillar-content-writing' ? 10 : selectedService === 'bundle' ? 24 : 18;

    if (features.includes('ai-tools')) {
      daysMin += 2;
      daysMax += 3;
    }
    if (features.includes('seo-articles')) {
      daysMin += 2;
      daysMax += 3;
    }
    return `${daysMin}–${daysMax} Business Days`;
  };

  const getSelectedServiceName = () => {
    return serviceOptions.find((s) => s.id === selectedService)?.title || 'Custom Scope';
  };

  const generateFormattedInquiry = () => {
    const serviceName = getSelectedServiceName();
    const activeFeatures = featureOptions
      .filter((f) => features.includes(f.id))
      .map((f) => `• ${f.label}`)
      .join('\n');

    return `Hi Rahul & Jyoti,

I am interested in collaborating on a project:
Name: ${clientName || '[Your Name]'}
Email: ${clientEmail || '[Your Email]'}
Service Selected: ${serviceName}
Estimated Timeline: ${getEstimatedTimeline()}

Key Scope Deliverables:
${activeFeatures}

Project Brief:
${projectBrief || 'Looking forward to discussing the project scope, technical requirements, and milestones.'}

Live Portfolio Reference: https://rahul-jyoti-studio.dev`;
  };

  const handleCopyInquiry = () => {
    navigator.clipboard.writeText(generateFormattedInquiry());
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(generateFormattedInquiry());
    // Direct WhatsApp link
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(`Project Inquiry: ${getSelectedServiceName()} - ${clientName || 'New Client'}`);
    const body = encodeURIComponent(generateFormattedInquiry());
    window.location.href = `mailto:contact@rahulraj.dev,jyoti.verma.studio@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="estimator" className="py-20 bg-[#0A0D14] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-semibold mb-3">
            <Sparkles className="w-4 h-4 text-cyan-300" />
            <span>FRICTIONLESS INQUIRY &amp; SCOPE ESTIMATOR</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Interactive Scope &amp; Timeline Calculator
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Configure your deliverables to receive an honest timeline estimate and structured scope outline.
            No spam, no aggressive sales follow-ups—just direct partner review.
          </p>
        </div>

        {/* Main Estimator Box */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-slate-900/70 border border-slate-800 p-6 sm:p-10 shadow-2xl backdrop-blur-md">
          
          {/* Step 1: Smart Service Selector */}
          <div className="mb-8">
            <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-3 font-semibold">
              1. What does your project require?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {serviceOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedService(opt.id)}
                  className={`p-4 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    selectedService === opt.id
                      ? 'bg-blue-600/20 border-blue-500 text-white shadow-glow-blue'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="text-xs font-mono text-cyan-400 block mb-1">{opt.tag}</span>
                  <span className="text-sm font-bold text-white block mb-2">{opt.title}</span>
                  <span className="text-[11px] font-mono text-slate-400">{opt.baseDays}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Key Deliverables Checkboxes */}
          <div className="mb-8">
            <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-3 font-semibold">
              2. Select Critical Features &amp; Deliverables:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {featureOptions.map((feat) => {
                const isChecked = features.includes(feat.id);
                return (
                  <div
                    key={feat.id}
                    onClick={() => toggleFeature(feat.id)}
                    className={`p-3 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                      isChecked
                        ? 'bg-slate-800/80 border-cyan-500/40 text-slate-200'
                        : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
                        isChecked
                          ? 'bg-cyan-500 border-cyan-400 text-black'
                          : 'border-slate-600'
                      }`}
                    >
                      {isChecked && <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>
                    <span className="text-xs font-medium">{feat.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Real-Time Estimated Calculation Banner */}
          <div className="mb-8 p-4 rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-indigo-950/60 border border-blue-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <div className="text-xs font-mono uppercase text-slate-400 font-semibold">
                  Estimated Transparent Timeline
                </div>
                <div className="text-lg sm:text-xl font-bold text-white">
                  {getEstimatedTimeline()}
                </div>
              </div>
            </div>

            <div className="text-xs font-mono text-cyan-300 bg-slate-950/60 px-3 py-1.5 rounded-lg border border-slate-800">
              ✓ Direct Execution by Rahul &amp; Jyoti
            </div>
          </div>

          {/* Step 3: Contact & Project Details */}
          <div className="space-y-4 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1.5">
                  Your Name / Startup
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Alex, Founder at SaaSify"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1.5">
                  Work Email / WhatsApp
                </label>
                <input
                  type="text"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  placeholder="e.g. alex@saasify.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1.5">
                Quick Project Brief (Optional)
              </label>
              <textarea
                rows={3}
                value={projectBrief}
                onChange={(e) => setProjectBrief(e.target.value)}
                placeholder="Share your target audience, existing stack, reference links, or core deadline..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
              />
            </div>
          </div>

          {/* Step 4: Dispatch Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleEmail}
              className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-500/20"
            >
              <Send className="w-4 h-4" />
              <span>Send Formatted Scope via Email</span>
            </button>

            <button
              onClick={handleWhatsApp}
              className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-500/20"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Direct WhatsApp Inquiry</span>
            </button>

            <button
              onClick={handleCopyInquiry}
              className="w-full sm:w-auto py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all border border-slate-700"
              title="Copy formatted scope inquiry to clipboard"
            >
              <Copy className="w-4 h-4" />
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Summary'}</span>
            </button>
          </div>

          {copied && (
            <div className="mt-3 text-center text-xs text-emerald-400 font-mono flex items-center justify-center gap-1.5 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4" />
              <span>Scope summary copied! You can paste it directly on LinkedIn, WhatsApp, or Slack.</span>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
