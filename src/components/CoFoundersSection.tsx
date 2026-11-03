import React from 'react';
import { foundersData } from '../data/portfolioData';
import { Terminal, ExternalLink, Mail, CheckCircle2, Award, BookOpen, Quote } from 'lucide-react';
import { LinkedInIcon, GitHubIcon, LeetCodeIcon, QuoraIcon } from './BrandIcons';

export const CoFoundersSection: React.FC = () => {
  return (
    <section id="founders" className="py-20 bg-[#080B11] relative border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-semibold mb-3">
            <span>AUTHENTIC OWNERSHIP &amp; PEDIGREE</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Meet the Co-Founders
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Direct partner execution from day one. You collaborate directly with Rahul and Jyoti—no project managers,
            no outsourced junior coders, and zero communication loss.
          </p>
        </div>

        {/* Side-by-Side Co-Founders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {foundersData.map((founder) => {
            const isRahul = founder.id === 'rahul-raj';

            return (
              <div
                key={founder.id}
                className="p-6 sm:p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Top Profile Header with Image */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-6">
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 border-2 border-slate-700/80 shadow-lg">
                      <img
                        src={founder.image}
                        alt={founder.name}
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                          {founder.name}
                        </h3>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                          isRahul 
                            ? 'bg-blue-500/15 text-blue-300 border-blue-500/30' 
                            : 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                        }`}>
                          {isRahul ? 'Engineering Co-Founder' : 'Creative Co-Founder'}
                        </span>
                      </div>

                      <div className="text-xs sm:text-sm font-medium text-slate-300">
                        {founder.degree}
                      </div>

                      <div className="text-xs font-mono text-cyan-400 font-semibold">
                        {founder.institution} {founder.gradYear && `(${founder.gradYear})`}
                      </div>

                      <p className="text-xs text-slate-400 pt-1 leading-relaxed">
                        {founder.experienceSummary}
                      </p>
                    </div>
                  </div>

                  {/* Verified Credentials Pills */}
                  <div className="mb-6 space-y-2">
                    <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                      Verified Background &amp; Proof:
                    </div>
                    <div className="grid grid-cols-1 gap-1.5">
                      {founder.verifiedBadges.map((badge, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-300 flex items-start gap-2"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                          <div>
                            <span className="font-semibold text-white">{badge.title}</span>
                            {badge.subtitle && (
                              <span className="text-slate-400 block text-[11px]">{badge.subtitle}</span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Primary Ownership in Client Projects */}
                  <div className="mb-6 space-y-2">
                    <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                      Primary Client Project Ownership:
                    </div>
                    <ul className="space-y-1.5">
                      {founder.primaryResponsibilities.map((resp, idx) => (
                        <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                          <span className="text-blue-400 mt-0.5 font-bold">›</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Skills / Tech Stack Badges */}
                  <div className="mb-6">
                    <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold mb-2">
                      Core Stack &amp; Specialization:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {founder.techStackOrSkills.map((skill) => (
                        <span
                          key={skill}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Founder Quote */}
                  <div className="p-3.5 rounded-xl bg-slate-950/40 border border-slate-800/60 text-xs italic text-slate-400 flex items-start gap-2.5 mb-6">
                    <Quote className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
                    <span>&quot;{founder.quote}&quot;</span>
                  </div>
                </div>

                {/* Direct Action & Social Buttons */}
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
                      <ExternalLink className="w-3 h-3" />
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
