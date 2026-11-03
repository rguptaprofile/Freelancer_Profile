import React from 'react';
import { ShieldCheck, Heart, ExternalLink, Terminal, BookOpen, Mail } from 'lucide-react';
import { LinkedInIcon, GitHubIcon, LeetCodeIcon, QuoraIcon } from './BrandIcons';

interface FooterProps {
  onOpenRateCard: () => void;
  onOpenEstimator: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenRateCard, onOpenEstimator }) => {
  return (
    <footer className="border-t border-slate-800 bg-[#06080E] text-slate-400 text-xs py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Studio Identity */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 text-base">
                &lt;Rahul &amp; Jyoti Studio/&gt;
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              A specialized two-partner studio by Rahul Raj (IIT Patna) and Jyoti Verma (BIT Mesra).
              Production-grade code and authority content with zero agency fluff.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span>Zero Fake Testimonials Guaranteed</span>
            </div>
          </div>

          {/* Col 2: Fast Navigation */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-200 font-bold mb-3">
              Studio Navigation
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <a href="#pledge" className="hover:text-white transition-colors">The Anti-Hype Trust Pledge</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">3-Pillar Service Catalog</a>
              </li>
              <li>
                <a href="#work" className="hover:text-white transition-colors">Full-Stack Builds &amp; Code</a>
              </li>
              <li>
                <a href="#editorial" className="hover:text-white transition-colors">Quora &amp; Editorial Insights</a>
              </li>
              <li>
                <a href="#workflow" className="hover:text-white transition-colors">4-Step Transparent Workflow</a>
              </li>
              <li>
                <a href="#founders" className="hover:text-white transition-colors">Meet the Co-Founders</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Verified Profiles */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-200 font-bold mb-3">
              Direct Verification
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://www.linkedin.com/in/rahul-raj-33a6a225b"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-300 flex items-center gap-1.5 transition-colors"
                >
                  <LinkedInIcon className="w-3.5 h-3.5 text-blue-400" />
                  <span>Rahul Raj (LinkedIn Profile)</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-slate-200 flex items-center gap-1.5 transition-colors"
                >
                  <GitHubIcon className="w-3.5 h-3.5 text-slate-300" />
                  <span>Rahul&apos;s GitHub (25+ Repos)</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a
                  href="https://leetcode.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-amber-300 flex items-center gap-1.5 transition-colors"
                >
                  <Terminal className="w-3.5 h-3.5 text-amber-400" />
                  <span>Rahul&apos;s LeetCode (85+ Solved)</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a
                  href="https://quora.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-300 flex items-center gap-1.5 transition-colors"
                >
                  <BookOpen className="w-3.5 h-3.5 text-red-400" />
                  <span>Rahul&apos;s Quora Editorial Answers</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Action Actions */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-200 font-bold mb-3">
              Client Tools
            </h4>
            <button
              onClick={onOpenEstimator}
              className="w-full py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>Instant Scope Estimator</span>
            </button>
            <button
              onClick={onOpenRateCard}
              className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
            >
              <span>View Pitch Deck &amp; Rate Card</span>
            </button>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <div>
            &copy; {new Date().getFullYear()} Rahul Raj &amp; Jyoti Verma. All Rights Reserved.
          </div>
          <div>
            IIT Patna &bull; BIT Mesra Patna &bull; Verified Production Code &bull; Zero Agency Fluff
          </div>
        </div>
      </div>
    </footer>
  );
};
