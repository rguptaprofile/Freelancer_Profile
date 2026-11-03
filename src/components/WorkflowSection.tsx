import React from 'react';
import { workflowSteps } from '../data/portfolioData';
import { ClipboardCheck, Layout, GitPullRequest, ShieldCheck, ArrowRight, Clock, CheckCircle } from 'lucide-react';

export const WorkflowSection: React.FC = () => {
  const stepIcons = [ClipboardCheck, Layout, GitPullRequest, ShieldCheck];

  return (
    <section id="workflow" className="py-20 bg-[#0A0D14] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-semibold mb-3">
            <span>DISCIPLINED FOUR-STEP EXECUTION</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            The &quot;How We Work Together&quot; Workflow
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Eliminating scope creep and missed deadlines. Every project progresses through four transparent milestones
            with staging links, Git commits, and zero guesswork.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {workflowSteps.map((step, idx) => {
            const Icon = stepIcons[idx % stepIcons.length];
            return (
              <div
                key={step.step}
                className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Step number & Phase timeline */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-3xl font-black text-slate-700 group-hover:text-cyan-400 transition-colors">
                      {step.step}
                    </span>
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-800 text-cyan-300 border border-slate-700 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {step.phase}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-cyan-400" />
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white mb-1 tracking-tight">
                    {step.title}
                  </h3>

                  <div className="text-xs font-mono text-blue-400 mb-3">
                    {step.owner}
                  </div>

                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                {/* Tangible deliverable badge */}
                <div className="pt-4 border-t border-slate-800/80">
                  <span className="text-[10px] font-mono uppercase text-slate-500 block mb-1">
                    Tangible Milestone Deliverable:
                  </span>
                  <div className="text-xs font-medium text-slate-200 flex items-start gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                    <span>{step.deliverable}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 14-Day Warranty Assurance */}
        <div className="mt-12 p-6 rounded-2xl bg-slate-900/80 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white">
                14-Day Post-Delivery Revision &amp; Bug Support Included
              </h4>
              <p className="text-xs text-slate-400">
                We do not vanish after final deployment. Every project comes with 14 days of dedicated post-launch monitoring and bug resolution.
              </p>
            </div>
          </div>
          <span className="font-mono text-xs px-3 py-1.5 rounded-lg bg-emerald-950/40 text-emerald-300 border border-emerald-800/40 shrink-0">
            ✓ Written Guarantee in Statement of Work
          </span>
        </div>

      </div>
    </section>
  );
};
