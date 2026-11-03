import React from 'react';
import { foundersData } from '../data/portfolioData';
import { ExternalLink, Mail, CheckCircle2, Award, BookOpen, Quote, Maximize2, ShieldCheck, Terminal, GraduationCap } from 'lucide-react';
import { LinkedInIcon, GitHubIcon, LeetCodeIcon, QuoraIcon } from './BrandIcons';

interface AboutSectionProps {
  onOpenPhoto: (imageSrc: string, name: string, title: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenPhoto }) => {
  return (
    <section id="about" className="py-20 bg-[#0A0D14] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-semibold mb-3">
            <GraduationCap className="w-4 h-4" />
            <span>FOUNDERS PEDIGREE &amp; CREDENTIALS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            About Rahul Raj &amp; Jyoti Kumari
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            We are an agile two-partner engineering and content studio. Direct partner execution from day one—no junior subcontractors, no project managers, and 100% transparent communication.
          </p>
        </div>

        {/* Side-by-Side Co-Founders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {foundersData.map((founder) => {
            const isRahul = founder.id === 'rahul-raj';

            return (
              <div
                key={founder.id}
                className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between shadow-xl"
              >
                <div>
                  {/* Founder Visual Card Header */}
                  <div className="flex flex-col sm:flex-row gap-6 mb-6">
                    {/* Full Photo Container with Click-to-Open Lightbox */}
                    <div className="relative group shrink-0 self-center sm:self-start">
                      <div
                        onClick={() => onOpenPhoto(founder.image, founder.name, founder.role)}
                        className="relative w-44 sm:w-48 h-60 sm:h-64 rounded-2xl overflow-hidden border-2 border-slate-700/80 shadow-2xl cursor-pointer transition-transform duration-300 group-hover:scale-[1.02] group-hover:border-blue-500/60 bg-black/40"
                      >
                        <img
                          src={founder.image}
                          alt={founder.name}
                          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* Hover Overlay with expand hint */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 text-white backdrop-blur-[2px]">
                          <div className="p-2 rounded-full bg-blue-600/80 text-white shadow-lg">
                            <Maximize2 className="w-5 h-5" />
                          </div>
                          <span className="text-xs font-mono font-semibold">Open Full Photo</span>
                        </div>
                      </div>

                      {/* Click prompt badge below photo */}
                      <button
                        onClick={() => onOpenPhoto(founder.image, founder.name, founder.role)}
                        className="w-full mt-2 py-1 px-2 rounded-lg bg-slate-800/80 hover:bg-slate-800 text-[11px] font-mono text-cyan-300 border border-slate-700/60 flex items-center justify-center gap-1 transition-colors"
                      >
                        <Maximize2 className="w-3 h-3" />
                        <span>Click to View Full Photo</span>
                      </button>
                    </div>

                    {/* Basic Meta Details */}
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-2xl font-bold text-white tracking-tight">
                          {founder.name}
                        </h3>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                          isRahul
                            ? 'bg-blue-500/15 text-blue-300 border-blue-500/30'
                            : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                        }`}>
                          {isRahul ? 'Lead Full-Stack Engineer' : 'Lead Creative Strategist'}
                        </span>
                      </div>

                      <div className="text-xs font-mono text-cyan-400 font-semibold">
                        {founder.degree}
                      </div>

                      <div className="text-xs text-slate-300 font-medium">
                        {founder.institution} {founder.gradYear && `(${founder.gradYear})`}
                      </div>

                      <p className="text-xs text-slate-400 leading-relaxed pt-1">
                        {founder.experienceSummary}
                      </p>

                      {/* Founder Quote */}
                      <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs italic text-slate-400 flex items-start gap-2 mt-2">
                        <Quote className="w-3.5 h-3.5 text-slate-600 shrink-0 mt-0.5" />
                        <span>&quot;{founder.quote}&quot;</span>
                      </div>
                    </div>
                  </div>

                  {/* Verified Experiences & Institutional Proof */}
                  <div className="space-y-2 mb-6">
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block">
                      Verified Experience &amp; Institutional Proof:
                    </span>
                    <div className="grid grid-cols-1 gap-2">
                      {founder.verifiedBadges.map((badge, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs flex items-start gap-2.5"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                          <div>
                            <span className="font-semibold text-white block">{badge.title}</span>
                            {badge.subtitle && (
                              <span className="text-slate-400 text-[11px] block">{badge.subtitle}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Primary Client Ownership */}
                  <div className="space-y-2 mb-6">
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block">
                      Primary Client Project Ownership:
                    </span>
                    <ul className="space-y-1.5">
                      {founder.primaryResponsibilities.map((resp, idx) => (
                        <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                          <span className="text-blue-400 mt-0.5 font-bold">›</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Core Technical Stack / Skills */}
                  <div className="mb-6">
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block mb-2">
                      Verified Skills &amp; Technologies:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {founder.techStackOrSkills.map((skill) => (
                        <span
                          key={skill}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Direct Public Profiles & Socials */}
                <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center gap-2">
                  {founder.socialLinks.linkedin && (
                    <a
                      href={founder.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 text-xs font-mono font-medium rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 flex items-center gap-1.5 transition-colors"
                    >
                      <LinkedInIcon className="w-3.5 h-3.5 text-blue-400" />
                      <span>LinkedIn Profile</span>
                      <ExternalLink className="w-3 h-3 text-slate-500" />
                    </a>
                  )}

                  {isRahul && (
                    <>
                      <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 text-xs font-mono font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors"
                      >
                        <GitHubIcon className="w-3.5 h-3.5" />
                        <span>GitHub (25+ Repos)</span>
                      </a>
                      <a
                        href="https://leetcode.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 text-xs font-mono font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors"
                      >
                        <LeetCodeIcon className="w-3.5 h-3.5 text-amber-400" />
                        <span>LeetCode (85+)</span>
                      </a>
                      <a
                        href="https://quora.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 text-xs font-mono font-medium rounded-lg bg-red-950/30 hover:bg-red-900/40 text-red-300 border border-red-800/40 flex items-center gap-1.5 transition-colors"
                      >
                        <QuoraIcon className="w-3.5 h-3.5 text-red-400" />
                        <span>Quora Profile</span>
                      </a>
                    </>
                  )}

                  {founder.socialLinks.email && (
                    <a
                      href={founder.socialLinks.email}
                      className="px-3 py-1.5 text-xs font-mono font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Direct Email</span>
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
