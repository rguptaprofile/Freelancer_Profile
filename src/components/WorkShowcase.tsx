import React, { useState } from 'react';
import { projectsData } from '../data/portfolioData';
import { editorialArticles } from '../data/articlesData';
import { ProjectItem, EditorialArticle } from '../types';
import { Code2, PenTool, ExternalLink, Eye, ThumbsUp, Layers, Terminal, Sparkles, Filter, CheckCircle2 } from 'lucide-react';

interface WorkShowcaseProps {
  onSelectProject: (project: ProjectItem) => void;
  onSelectArticle: (article: EditorialArticle) => void;
}

export const WorkShowcase: React.FC<WorkShowcaseProps> = ({ onSelectProject, onSelectArticle }) => {
  const [activeTab, setActiveTab] = useState<'engineering' | 'editorial'>('engineering');
  const [articleFilter, setArticleFilter] = useState<'all' | 'quora' | 'technical' | 'ux-copy'>('all');

  const filteredArticles = editorialArticles.filter((item) => {
    if (articleFilter === 'all') return true;
    return item.type === articleFilter;
  });

  return (
    <section id="work" className="py-20 bg-[#080B11] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-semibold mb-3">
            <span>DUAL INTERACTIVE WORK SHOWCASE</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Production-Grade Builds &amp; Authority Editorial
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Zero placeholder projects. Inspect our full-stack system architectures and read real Quora thought leadership and UX copywriting case studies.
          </p>

          {/* Interactive Dual Tabs */}
          <div className="mt-8 inline-flex p-1.5 rounded-xl bg-slate-900 border border-slate-800 shadow-inner">
            <button
              onClick={() => setActiveTab('engineering')}
              className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'engineering'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span>Tab A: Full-Stack &amp; Web Design Builds</span>
            </button>

            <button
              id="editorial"
              onClick={() => setActiveTab('editorial')}
              className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'editorial'
                  ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md shadow-amber-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <PenTool className="w-4 h-4" />
              <span>Tab B: Editorial &amp; Quora Insights</span>
            </button>
          </div>
        </div>

        {/* Tab A: Full-Stack Engineering Builds */}
        {activeTab === 'engineering' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
              <span className="text-xs font-mono text-slate-400">
                Displaying 4 verified full-stack builds • Click any card for full architecture modal
              </span>
              <span className="text-xs font-mono text-cyan-400">
                Architecture Standard: Problem → System Architecture → Verifiable Outcome
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projectsData.map((project) => (
                <div
                  key={project.id}
                  onClick={() => onSelectProject(project)}
                  className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/90 hover:border-blue-500/50 hover:bg-slate-900/90 transition-all duration-300 cursor-pointer flex flex-col justify-between group shadow-lg"
                >
                  <div>
                    {/* Header tags */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {project.category}
                      </span>
                      {project.isJoint ? (
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/15 text-amber-300 border border-amber-500/30">
                          Joint Rahul + Jyoti
                        </span>
                      ) : (
                        <span className="text-[11px] font-mono text-slate-500">
                          Lead: Rahul Raj (IIT Patna)
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-blue-300 transition-colors mb-2 tracking-tight">
                      {project.title}
                    </h3>

                    <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-3">
                      {project.problem}
                    </p>

                    {/* Architecture highlights pill list */}
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-850 mb-4 space-y-1.5">
                      <div className="text-[10px] font-mono uppercase text-cyan-400 font-semibold flex items-center gap-1">
                        <Terminal className="w-3 h-3" />
                        <span>Core Architecture Spec:</span>
                      </div>
                      <p className="text-xs text-slate-300 line-clamp-2">
                        {project.architecture[0]}
                      </p>
                    </div>

                    {/* Tech Stack Chips */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800/70 text-slate-300 border border-slate-700/60"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Action Bar */}
                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <span className="text-xs font-semibold text-blue-400 group-hover:text-blue-300 flex items-center gap-1">
                      <Layers className="w-3.5 h-3.5" />
                      <span>Inspect System Specs &amp; Flow</span>
                    </span>
                    <span className="text-xs font-mono text-slate-500 group-hover:text-slate-300 flex items-center gap-1">
                      <span>View Details →</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab B: Editorial & Quora Insights */}
        {activeTab === 'editorial' && (
          <div className="space-y-8 animate-fadeIn">
            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-mono text-slate-400 mr-2 flex items-center gap-1">
                  <Filter className="w-3 h-3" /> Filter by:
                </span>
                {[
                  { id: 'all', label: 'All Articles & Answers' },
                  { id: 'quora', label: 'Quora Thought Leadership' },
                  { id: 'technical', label: 'Technical Tutorials' },
                  { id: 'ux-copy', label: 'UX & Copywriting Studies' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setArticleFilter(f.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      articleFilter === f.id
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                        : 'text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <span className="text-xs font-mono text-amber-400">
                100% Organic Writing • Zero AI-Generated Fluff
              </span>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => onSelectArticle(article)}
                  className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/90 hover:border-amber-500/50 hover:bg-slate-900/90 transition-all duration-300 cursor-pointer flex flex-col justify-between group shadow-lg"
                >
                  <div>
                    {/* Top Meta */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                        {article.categoryLabel}
                      </span>
                      <span className="text-[11px] text-slate-400">{article.readTime}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors mb-2 tracking-tight leading-snug">
                      {article.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-3">
                      {article.summary}
                    </p>

                    {/* Quora Stats or Before/After Badge */}
                    {article.quoraStats && (
                      <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 mb-4 flex items-center justify-between text-xs font-mono text-slate-300">
                        <span className="flex items-center gap-1 text-cyan-400">
                          <Eye className="w-3.5 h-3.5" />
                          {article.quoraStats.views}
                        </span>
                        <span className="flex items-center gap-1 text-emerald-400">
                          <ThumbsUp className="w-3.5 h-3.5" />
                          {article.quoraStats.upvotes}
                        </span>
                      </div>
                    )}

                    {article.beforeAfterComparison && (
                      <div className="p-2.5 rounded-xl bg-emerald-950/20 border border-emerald-900/30 mb-4 flex items-center justify-between text-xs font-mono text-emerald-300">
                        <span>Before vs. After Study</span>
                        <span className="font-bold">{article.beforeAfterComparison.conversionLift}</span>
                      </div>
                    )}
                  </div>

                  {/* Footer Author & CTA */}
                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <span className="text-slate-400">
                      By <strong className="text-white font-medium">{article.author}</strong>
                    </span>
                    <span className="font-semibold text-amber-400 group-hover:text-amber-300 flex items-center gap-1">
                      <span>Read Article →</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
