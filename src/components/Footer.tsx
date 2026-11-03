import React from 'react';
import { ShieldCheck, ExternalLink, Mail } from 'lucide-react';
import { LinkedInIcon, GitHubIcon, LeetCodeIcon, QuoraIcon } from './BrandIcons';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="border-t border-slate-800 bg-[#06080E] text-slate-400 text-xs py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Studio Identity */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 to-cyan-400 p-[1px] flex items-center justify-center">
                <div className="w-full h-full bg-[#0B0F19] rounded-[7px] flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-cyan-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M7 8l-4 4 4 4M17 8l4 4-4 4M14 4l-4 16" />
                  </svg>
                </div>
              </div>
              <span className="font-extrabold text-white tracking-tight text-sm">
                Rahul &amp; Jyoti <span className="text-cyan-400 font-mono text-[11px] px-2 py-0.5 rounded bg-blue-500/15 border border-cyan-500/30 ml-1">Freelancer Duo Profile</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Full-Stack Engineering &amp; Strategic Content Studio by Rahul Raj (IIT Patna) and Jyoti Kumari (BIT Mesra).
              Protected by a binding 40%-10%-50% phased milestone agreement.
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span>Zero Fake Promises &bull; Direct Execution</span>
            </div>
          </div>

          {/* Col 2: Navigation to the 5 Sections */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-200 font-bold mb-3">
              Studio Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-white transition-colors text-left"
                >
                  Home (Overview &amp; Ratings)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors text-left"
                >
                  About (Rahul &amp; Jyoti Profiles)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('work')}
                  className="hover:text-white transition-colors text-left"
                >
                  Work (Project Pitch, Bond &amp; Hire)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('catalog')}
                  className="hover:text-white transition-colors text-left"
                >
                  Catalog (Services &amp; Pricing)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors text-left"
                >
                  Contact (Direct Inbox &amp; Form)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Public Profiles & Verification */}
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
                  <LeetCodeIcon className="w-3.5 h-3.5 text-amber-400" />
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
                  <QuoraIcon className="w-3.5 h-3.5 text-red-400" />
                  <span>Rahul&apos;s Quora Editorial Answers</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Action Box */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-200 font-bold mb-3">
              Initiate Project
            </h4>
            <button
              onClick={() => onNavigate('work')}
              className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md shadow-blue-500/20"
            >
              <span>Pitch Scope &amp; Sign Bond</span>
            </button>
            <a
              href="mailto:rahulgupt1231@gmail.com"
              className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
            >
              <Mail className="w-3.5 h-3.5 text-cyan-400" />
              <span>rahulgupt1231@gmail.com</span>
            </a>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <div>
            &copy; {new Date().getFullYear()} Rahul Raj &amp; Jyoti Kumari. All Rights Reserved.
          </div>
          <div>
            IIT Patna &bull; BIT Mesra &bull; 40%-10%-50% Phased Milestone Agreement
          </div>
        </div>
      </div>
    </footer>
  );
};
