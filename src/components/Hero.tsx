import React from 'react';
import { ArrowRight, Calendar, CheckCircle2, Terminal, PenTool, Sparkles, Shield, ExternalLink, Code2 } from 'lucide-react';

interface HeroProps {
  onOpenEstimator: () => void;
  onOpenRateCard: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenEstimator, onOpenRateCard }) => {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-grid-pattern">
      {/* Background ambient glowing orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/15 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-10 w-[350px] h-[350px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          
          {/* Studio Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-inner mb-6 backdrop-blur-md">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-mono font-medium text-slate-300">
              Specialized Two-Partner Studio • Available for Select Q1/Q2 Projects
            </span>
          </div>

          {/* Main Headline (Exact from Blueprint) */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-100 tracking-tight leading-[1.15] mb-6">
            We Engineer <span className="gradient-text-blue">Scalable Full-Stack</span> Web Apps &amp; Write{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-amber-200">
              Authority Content
            </span>{' '}
            That Converts.
          </h1>

          {/* Sub-headline (Exact from Blueprint) */}
          <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed max-w-3xl mb-8 font-normal">
            A transparent two-partner studio by{' '}
            <strong className="text-white font-semibold">Rahul Raj</strong> (CS &amp; Data Analytics,{' '}
            <span className="text-blue-400 font-medium">IIT Patna</span> | Ex-Intern at{' '}
            <span className="text-cyan-400 font-medium">NeGD MeitY</span> &amp; HCL GUVI) and{' '}
            <strong className="text-white font-semibold">Jyoti Verma</strong> (Electrical Engineering,{' '}
            <span className="text-amber-400 font-medium">BIT Mesra Patna</span>). Production-ready code, thoughtful web
            design, and research-backed writing—with <span className="underline decoration-blue-500 decoration-2 underline-offset-4">zero agency fluff</span>.
          </p>

          {/* Primary Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-12">
            <a
              href="#work"
              className="w-full sm:w-auto px-7 py-3.5 text-sm sm:text-base font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2.5 transition-all transform hover:-translate-y-0.5"
            >
              <Code2 className="w-5 h-5 text-cyan-200" />
              <span>Explore Engineering &amp; Content Work</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={onOpenEstimator}
              className="w-full sm:w-auto px-6 py-3.5 text-sm sm:text-base font-semibold text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-850 border border-slate-700/80 rounded-xl transition-all flex items-center justify-center gap-2.5 shadow-sm hover:border-slate-600"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Instant Scope &amp; Fee Estimator</span>
            </button>
          </div>

          {/* Co-founders Quick Trust Card */}
          <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md text-left">
            {/* Rahul's quick card */}
            <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800/60 hover:border-blue-500/30 transition-all">
              <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-blue-500/30">
                <img
                  src="/images/rahul-raj.png"
                  alt="Rahul Raj - Full-Stack Engineer"
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    // Fallback to avatar if file issue
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div className="w-full h-full bg-blue-900/40 flex items-center justify-center font-bold text-blue-300">
                  RR
                </div>
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-white text-sm truncate">Rahul Raj</span>
                  <span className="text-[10px] px-1.5 py-0.2 bg-blue-500/15 text-blue-300 rounded font-mono border border-blue-500/30">
                    IIT Patna
                  </span>
                </div>
                <p className="text-xs text-slate-400 truncate">Ex-Software Eng Intern, NeGD MeitY</p>
                <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                  <span className="text-emerald-400 font-medium">✓ React • Node • Postgres • Python</span>
                </div>
              </div>
            </div>

            {/* Jyoti's quick card */}
            <div className="flex items-center gap-3.5 p-3 rounded-xl bg-slate-950/60 border border-slate-800/60 hover:border-amber-500/30 transition-all">
              <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-amber-500/30 bg-gradient-to-tr from-amber-700/20 to-orange-500/20 flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
                  alt="Jyoti Verma - Web Designer & Content Strategist"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-white text-sm truncate">Jyoti Verma</span>
                  <span className="text-[10px] px-1.5 py-0.2 bg-amber-500/15 text-amber-300 rounded font-mono border border-amber-500/30">
                    BIT Mesra
                  </span>
                </div>
                <p className="text-xs text-slate-400 truncate">Web Design &amp; Content Strategist</p>
                <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                  <span className="text-amber-400 font-medium">✓ UI Wireframing • SEO • Microcopy</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
