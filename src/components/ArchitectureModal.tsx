import React from 'react';
import { ProjectItem } from '../types';
import { X, ExternalLink, Layers, ShieldCheck, Terminal, CheckCircle2, ArrowRight } from 'lucide-react';
import { GitHubIcon } from './BrandIcons';

interface ArchitectureModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div
        className="relative w-full max-w-3xl bg-[#0D121E] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-[#0D121E]/95 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded bg-blue-500/15 text-blue-400 border border-blue-500/30">
              {project.category}
            </span>
            {project.isJoint && (
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                Joint Showcase
              </span>
            )}
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-5 sm:p-8 space-y-6">
          {/* Title & Context */}
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-2 leading-snug">
              {project.title}
            </h2>
            <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs sm:text-sm text-blue-200">
              <span className="font-semibold text-blue-300">Verified Origin &amp; Context: </span>
              {project.context}
            </div>
          </div>

          {/* Architecture Visual Diagram Snippet */}
          {project.diagramSnippet && (
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5 font-bold">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>System Architecture Flow Diagram</span>
              </div>
              <pre className="p-4 rounded-xl bg-black/80 border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto whitespace-pre leading-relaxed">
                {project.diagramSnippet}
              </pre>
            </div>
          )}

          {/* Problem vs Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-slate-300 font-mono uppercase flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-400"></span>
                The Business Problem
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="text-xs font-bold text-emerald-300 font-mono uppercase flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                The Engineering Solution
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Deep Architecture Breakdown */}
          <div className="space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-blue-400" />
              <span>Technical Pillars &amp; Security Specs</span>
            </div>
            <div className="space-y-2">
              {project.architecture.map((item, i) => (
                <div key={i} className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs sm:text-sm text-slate-300 flex items-start gap-2.5">
                  <span className="font-mono text-blue-400 font-bold">0{i + 1}.</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Verifiable Outcomes */}
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/40 space-y-2.5">
            <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Verifiable Outcomes &amp; Quality Metrics</span>
            </div>
            <ul className="space-y-1.5">
              {project.outcomes.map((outcome, idx) => (
                <li key={idx} className="text-xs sm:text-sm text-emerald-200 flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack Badges */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-2 font-bold">
              Verified Tech Stack:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs font-mono rounded-lg bg-slate-800 text-slate-200 border border-slate-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-[#0D121E] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-400">
            Engineered by <span className="text-white font-medium">Rahul Raj</span> (IIT Patna)
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
              >
                <GitHubIcon className="w-4 h-4" />
                <span>View GitHub Repo</span>
              </a>
            )}
            {project.liveDemoUrl && (
              <a
                href={project.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Live Staging Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
