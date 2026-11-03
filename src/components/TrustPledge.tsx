import React from 'react';
import { ShieldCheck, GitCommit, CheckCircle2, AlertTriangle, Sparkles, UserCheck, EyeOff } from 'lucide-react';
import { trustPledgeData } from '../data/portfolioData';

export const TrustPledge: React.FC = () => {
  const icons = [EyeOff, UserCheck, GitCommit];
  const borderColors = [
    'hover:border-blue-500/50 hover:shadow-glow-blue',
    'hover:border-cyan-500/50 hover:shadow-cyan-500/20',
    'hover:border-emerald-500/50 hover:shadow-glow-emerald',
  ];

  return (
    <section id="pledge" className="py-20 relative bg-[#080B11]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold mb-3">
            <ShieldCheck className="w-4 h-4" />
            <span>RADICAL TRANSPARENCY PHILOSOPHY</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            The &quot;Zero Fake Promises&quot; Trust Pledge
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Most freelance beginners lose client trust by pretending to be a 50-person agency with stock testimonials.
            We operate as an agile, highly accountable two-partner studio with verifiable academic credentials and real production code.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {trustPledgeData.commitments.map((commitment, index) => {
            const Icon = icons[index % icons.length];
            return (
              <div
                key={commitment.number}
                className={`p-6 sm:p-7 rounded-2xl bg-slate-900/60 border border-slate-800 transition-all duration-300 flex flex-col justify-between ${borderColors[index]}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-2xl font-bold text-slate-500">
                      {commitment.number}
                    </span>
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                      {commitment.tag}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-blue-400" />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2.5 tracking-tight">
                    {commitment.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {commitment.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-2 text-xs font-mono text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Backed by public repos &amp; live staging</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Studio Advantage Banner */}
        <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-slate-900/40 border border-blue-900/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white mb-1">
                Why Solo Freelancers and Large Agencies Fail Startup Founders
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
                When you hire a solo developer, you get working code with &quot;Lorem Ipsum&quot; copy and bland UI. When you hire a writer, you get a Google Doc that still needs to be built. We deliver complete, turnkey solutions under one roof.
              </p>
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-3">
            <span className="font-mono text-xs px-3 py-1.5 rounded-lg bg-slate-900 text-cyan-300 border border-cyan-500/30">
              Code + UI + Copy = Zero Friction
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
