import React from 'react';
import { Award, ShieldCheck, CheckCircle2, ExternalLink, GraduationCap, Building2, Terminal, Code2 } from 'lucide-react';

export const PedigreeBar: React.FC = () => {
  const credentials = [
    {
      label: 'IIT Patna',
      detail: 'B.Sc. CS & Data Analytics (2023–2027)',
      type: 'Academic Pedigree',
      icon: GraduationCap,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
    },
    {
      label: 'BIT Mesra Patna',
      detail: 'B.Tech Electrical Engineering',
      type: 'Academic Pedigree',
      icon: GraduationCap,
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/20',
    },
    {
      label: 'NeGD, MeitY (Govt. of India)',
      detail: 'Software Engineering Intern (Production Portals)',
      type: 'Government Experience',
      icon: Building2,
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/20',
    },
    {
      label: 'HCL GUVI',
      detail: 'Full-Stack Development Intern (Web Features)',
      type: 'Industry Experience',
      icon: Building2,
      color: 'text-cyan-400',
      bgColor: 'bg-cyan-500/10',
      borderColor: 'border-cyan-500/20',
    },
    {
      label: '25+ Repos • 85+ LeetCode',
      detail: 'Verifiable Algorithmic & Open-Source Code',
      type: 'Public Track Record',
      icon: Terminal,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10',
      borderColor: 'border-purple-500/20',
    },
  ];

  return (
    <section className="border-y border-slate-800/80 bg-[#0c101a] py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Verified Institutional Pedigree &amp; Industry Track Record
            </span>
          </div>

          <a
            href="https://www.linkedin.com/in/rahul-raj-33a6a225b"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-blue-400 hover:text-blue-300 flex items-center gap-1.5 transition-colors group"
          >
            <span>Verify Rahul’s Credentials on LinkedIn</span>
            <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Credentials Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {credentials.map((cred, idx) => {
            const Icon = cred.icon;
            return (
              <div
                key={idx}
                className={`p-3.5 rounded-xl border ${cred.borderColor} ${cred.bgColor} backdrop-blur-sm flex flex-col justify-between transition-all hover:scale-[1.02]`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono uppercase text-slate-400 font-medium">
                    {cred.type}
                  </span>
                  <Icon className={`w-3.5 h-3.5 ${cred.color}`} />
                </div>
                <div className="text-sm font-bold text-white tracking-tight">{cred.label}</div>
                <div className="text-[11px] text-slate-400 leading-tight mt-1">{cred.detail}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
