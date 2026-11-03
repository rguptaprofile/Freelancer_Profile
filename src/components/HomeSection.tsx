import React from 'react';
import { clientReviewsData } from '../data/portfolioData';
import { Star, ShieldCheck, ArrowRight, Code2, PenTool, Rocket, CheckCircle2, Building2, UserCheck, Sparkles, FileSignature } from 'lucide-react';

interface HomeSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const HomeSection: React.FC<HomeSectionProps> = ({ onNavigate }) => {
  return (
    <section id="home" className="py-12 sm:py-20 bg-grid-pattern relative">
      {/* Background glow effects */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-1/2 right-4 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* 1. STUDIO OVERVIEW HERO */}
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 mb-6 backdrop-blur-md">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-mono font-medium text-slate-300">
              Freelancer Duo Profile &bull; Direct Execution by Rahul Raj (IIT Patna) &amp; Jyoti Kumari (BIT Mesra)
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-6">
            Engineering <span className="gradient-text-blue">Scalable Full-Stack Code</span> &amp; Writing{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-400 to-amber-200">
              Authority Content
            </span>{' '}
            That Converts.
          </h1>

          {/* Sub-headline / Studio Overview */}
          <p className="text-sm sm:text-lg text-slate-300 leading-relaxed max-w-3xl mb-8">
            We partner with <strong className="text-white">Startups, Companies, Banks, Shop Owners, and EdTech platforms</strong> to deliver high-security web applications, custom portals, and research-backed technical content. Zero junior outsourcing, complete transparency, and protected by an official <span className="text-cyan-400 font-semibold underline decoration-cyan-500/50 underline-offset-4">40%-10%-50% Milestone Bond Paper</span>.
          </p>

          {/* Quick Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto mb-12">
            <button
              onClick={() => onNavigate('work')}
              className="w-full sm:w-auto px-7 py-3.5 text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
            >
              <FileSignature className="w-5 h-5 text-cyan-200" />
              <span>Pitch Your Project &amp; Hire Us</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('catalog')}
              className="w-full sm:w-auto px-6 py-3.5 text-sm sm:text-base font-semibold text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-850 border border-slate-700/80 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <span>Explore Service Catalog</span>
            </button>
          </div>

          {/* Verified Institutional Pedigree Ticker */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Academic Foundation</span>
              <span className="text-sm font-bold text-white block">IIT Patna (2025 – 2028)</span>
              <span className="text-xs text-blue-400">B.Sc. CS &amp; Data Analytics</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Engineering Pedigree</span>
              <span className="text-sm font-bold text-white block">BIT Mesra</span>
              <span className="text-xs text-amber-400">B.Tech ECE (Electronics &amp; Comm.)</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Govt. Portal Experience</span>
              <span className="text-sm font-bold text-white block">NeGD, MeitY</span>
              <span className="text-xs text-emerald-400">Govt. of India Software Intern</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 backdrop-blur-sm">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Client Protection</span>
              <span className="text-sm font-bold text-white block">40% - 10% - 50%</span>
              <span className="text-xs text-purple-400">Signed Milestone Bond</span>
            </div>
          </div>
        </div>

        {/* 2. THREE PILLARS OVERVIEW CARDS */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight mb-2">
              Complete Dual-Engine Capabilities
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Why business clients choose a unified two-partner studio over chaotic freelance coordination
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mb-4">
                  <Code2 className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Production Full-Stack Code</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  React.js, TypeScript, Node.js, Express, and Python backends with PostgreSQL and Redis. Secure JWT authentication, role-based workflows (RBAC), and high-concurrency database design.
                </p>
              </div>
              <div className="text-[11px] font-mono text-cyan-400 pt-3 border-t border-slate-800">
                Lead: Rahul Raj (IIT Patna)
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mb-4">
                  <PenTool className="w-5 h-5 text-amber-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">High-Conversion UX &amp; Copy</h3>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  Figma wireframes, responsive Tailwind layouts, and persuasive B2B copy. Long-form technical guides, product messaging, and SEO articles designed to educate visitors into buyers.
                </p>
              </div>
              <div className="text-[11px] font-mono text-amber-400 pt-3 border-t border-slate-800">
                Lead: Jyoti Kumari (BIT Mesra)
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-b from-blue-950/40 via-slate-900 to-slate-950 border border-blue-500/40 flex flex-col justify-between shadow-glow-blue">
              <div>
                <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center mb-4">
                  <Rocket className="w-5 h-5 text-cyan-300" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Turnkey Launch Bundle (USP)</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Both code and copy built concurrently. Eliminates the dreaded gap between designers and developers. Delivered concept-to-live with staging reviews and a 14-day warranty.
                </p>
              </div>
              <div className="text-[11px] font-mono text-emerald-300 pt-3 border-t border-slate-800">
                Joint Rahul &amp; Jyoti Synergy
              </div>
            </div>
          </div>
        </div>

        {/* 3. CLIENT RATINGS & REVIEWS SECTION */}
        <div className="pt-6 border-t border-slate-800/80">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-semibold mb-2">
                <Star className="w-3.5 h-3.5 fill-current text-amber-400" />
                <span>VERIFIED CLIENT RATINGS &amp; REVIEWS</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Trusted by Startups, Banks, and Businesses
              </h2>
            </div>

            {/* Rating summary badge */}
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-3xl font-black text-white">4.95</div>
              <div className="text-left">
                <div className="flex items-center text-amber-400 gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-[11px] text-slate-400 font-mono">
                  100% On-Time Delivery Guarantee
                </span>
              </div>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {clientReviewsData.map((rev) => (
              <div
                key={rev.id}
                className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-[11px] font-mono text-slate-500">{rev.date}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 italic">
                    &quot;{rev.reviewText}&quot;
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-white flex items-center gap-1.5">
                      <span>{rev.clientName}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    </div>
                    <div className="text-xs text-slate-400">
                      {rev.clientTitle} &bull; <span className="text-slate-300">{rev.company}</span>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono px-2 py-1 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                    {rev.companyType}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Pitch Callout Banner */}
          <div className="mt-10 p-6 rounded-2xl bg-gradient-to-r from-blue-950/60 via-indigo-950/50 to-slate-900 border border-blue-500/30 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <h3 className="text-base sm:text-lg font-bold text-white">
                Have an upcoming web application, portal, or content project?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Submit your project pitch, review our digital bond terms, and calculate your 40% initial deposit in under 2 minutes.
              </p>
            </div>
            <button
              onClick={() => onNavigate('work')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shrink-0 shadow-lg shadow-blue-500/25 transition-all"
            >
              <FileSignature className="w-4 h-4 text-cyan-200" />
              <span>Open Work &amp; Hire Section</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
