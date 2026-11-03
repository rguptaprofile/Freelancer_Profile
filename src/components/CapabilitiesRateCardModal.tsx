import React, { useState } from 'react';
import { X, Copy, CheckCircle2, Download, Printer, ExternalLink, ShieldCheck, FileText, Send } from 'lucide-react';
import { clientPitchTemplate } from '../data/portfolioData';

interface CapabilitiesRateCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CapabilitiesRateCardModal: React.FC<CapabilitiesRateCardModalProps> = ({ isOpen, onClose }) => {
  const [pitchCopied, setPitchCopied] = useState(false);

  if (!isOpen) return null;

  const copyPitch = () => {
    navigator.clipboard.writeText(`Subject: ${clientPitchTemplate.subject}\n\n${clientPitchTemplate.body}`);
    setPitchCopied(true);
    setTimeout(() => setPitchCopied(false), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div
        className="relative w-full max-w-4xl bg-[#0D121E] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-[#0D121E]/95 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider px-2.5 py-1 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
              Studio Capabilities &amp; Pitch Deck
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline-block">•</span>
            <span className="text-xs text-slate-400 hidden sm:inline-block">
              Rahul Raj (IIT Patna) &amp; Jyoti Verma (BIT Mesra)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors hidden sm:flex items-center gap-1 text-xs"
              title="Print Rate Card"
            >
              <Printer className="w-4 h-4" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto p-5 sm:p-8 space-y-8">
          
          {/* Executive Overview Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-900 to-indigo-950/60 border border-blue-500/30 space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Rahul &amp; Jyoti Freelance Collective
              </h2>
              <span className="text-xs font-mono px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Verified Direct Execution
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              A specialized two-partner studio combining IIT Patna Computer Science &amp; Data Analytics engineering with BIT Mesra Electrical Engineering-backed UX wireframing and authority B2B content writing.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-900 text-blue-300 border border-slate-700">
                IIT Patna (B.Sc. CS &amp; DA)
              </span>
              <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-900 text-amber-300 border border-slate-700">
                BIT Mesra (B.Tech EE)
              </span>
              <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-900 text-emerald-300 border border-slate-700">
                Ex-NeGD MeitY (Govt. of India)
              </span>
              <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-900 text-cyan-300 border border-slate-700">
                Ex-HCL GUVI
              </span>
            </div>
          </div>

          {/* Section: The 3 Core Service Offerings & Scope Breakdown */}
          <div className="space-y-4">
            <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 font-bold">
              Service Pillars &amp; Deliverables Structure
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <span className="text-xs font-mono text-blue-400 font-bold block">PILLAR 01</span>
                <h4 className="text-sm font-bold text-white">Full-Stack Web App &amp; Portals</h4>
                <p className="text-xs text-slate-400">
                  React.js, TypeScript, Node.js/Python, PostgreSQL, JWT Auth, REST APIs, and responsive Tailwind UI.
                </p>
                <div className="text-[11px] font-mono text-slate-500 pt-1">
                  Timeline: 14–21 Business Days
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                <span className="text-xs font-mono text-amber-400 font-bold block">PILLAR 02</span>
                <h4 className="text-sm font-bold text-white">Technical &amp; SEO Authority Copy</h4>
                <p className="text-xs text-slate-400">
                  Developer guides, 1,500–2,500 word SEO deep-dives, landing page microcopy, and Quora thought leadership.
                </p>
                <div className="text-[11px] font-mono text-slate-500 pt-1">
                  Timeline: 5–10 Business Days
                </div>
              </div>

              <div className="p-4 rounded-xl bg-gradient-to-b from-blue-950/40 to-slate-900/90 border border-blue-500/40 space-y-2">
                <span className="text-xs font-mono text-cyan-300 font-bold block">PILLAR 03 (USP)</span>
                <h4 className="text-sm font-bold text-white">&quot;Zero-Friction Launch&quot; Bundle</h4>
                <p className="text-xs text-slate-400">
                  Unified concept-to-live: Jyoti designs UI and writes 100% copy; Rahul codes full stack and deploys live.
                </p>
                <div className="text-[11px] font-mono text-cyan-400 pt-1">
                  Timeline: 15–24 Business Days
                </div>
              </div>
            </div>
          </div>

          {/* Section: High-Trust Client Outreach Message (From Page 8 of Blueprint) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-mono uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
                <FileText className="w-4 h-4" />
                <span>High-Trust Client Pitch Template (Page 8 Blueprint)</span>
              </h3>

              <button
                onClick={copyPitch}
                className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-mono flex items-center gap-1.5 transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{pitchCopied ? 'Pitch Copied!' : 'Copy Pitch Template'}</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-black/70 border border-slate-800 space-y-3 text-xs font-mono text-slate-300 leading-relaxed">
              <div className="text-cyan-400 font-bold">Subject: {clientPitchTemplate.subject}</div>
              <pre className="whitespace-pre-wrap font-sans text-xs text-slate-300">
                {clientPitchTemplate.body}
              </pre>
            </div>
          </div>

          {/* Section: 30-Day Execution Roadmap Summary */}
          <div className="space-y-3">
            <h3 className="text-sm font-mono uppercase tracking-wider text-slate-400 font-bold">
              30-Day Studio Milestones &amp; Assurance
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs space-y-1">
                <div className="text-[11px] font-mono text-blue-400 font-bold">Week 1</div>
                <div className="font-semibold text-white">Asset Curation</div>
                <p className="text-[11px] text-slate-400">
                  Clean GitHub READMEs, Quora metric curation, and design system wireframes.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs space-y-1">
                <div className="text-[11px] font-mono text-cyan-400 font-bold">Week 2</div>
                <div className="font-semibold text-white">Live Builds &amp; Audits</div>
                <p className="text-[11px] text-slate-400">
                  React/TS engineering, interactive showcase, mobile audits, and rate cards.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs space-y-1">
                <div className="text-[11px] font-mono text-amber-400 font-bold">Week 3</div>
                <div className="font-semibold text-white">Inbound Setup</div>
                <p className="text-[11px] text-slate-400">
                  LinkedIn optimization, Quora thought leadership answers, and studio profiles.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs space-y-1">
                <div className="text-[11px] font-mono text-emerald-400 font-bold">Week 4</div>
                <div className="font-semibold text-white">Value Outreach</div>
                <p className="text-[11px] text-slate-400">
                  Personalized technical + content audits for 25 high-potential tech founders.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-[#0D121E] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-400">
            For direct inquiries: <a href="mailto:contact@rahulraj.dev" className="text-blue-400 hover:underline">contact@rahulraj.dev</a>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={copyPitch}
              className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-amber-300 hover:text-white bg-amber-500/20 hover:bg-amber-500/30 rounded-lg flex items-center justify-center gap-1.5 transition-colors border border-amber-500/30"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Outreach Pitch</span>
            </button>
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            >
              Close Pitch Deck
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
