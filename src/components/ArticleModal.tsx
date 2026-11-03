import React from 'react';
import { EditorialArticle } from '../types';
import { X, ExternalLink, ThumbsUp, Eye, Share2, Clock, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

interface ArticleModalProps {
  article: EditorialArticle | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl bg-[#0D121E] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between p-4 sm:p-5 border-b border-slate-800 bg-[#0D121E]/95 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded bg-blue-500/15 text-blue-400 border border-blue-500/30">
              {article.categoryLabel}
            </span>
            <span className="text-xs text-slate-400 hidden sm:inline-block">•</span>
            <span className="text-xs text-slate-400 flex items-center gap-1 hidden sm:flex">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-5 sm:p-8 space-y-6">
          {/* Article Title & Subtitle */}
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-snug mb-2">
              {article.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {article.subtitle}
            </p>
          </div>

          {/* Author bar & Quora stats */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-500/40 flex items-center justify-center font-bold text-blue-300 text-sm">
                {article.author === 'Rahul Raj' ? 'RR' : article.author === 'Jyoti Verma' ? 'JV' : 'R&J'}
              </div>
              <div>
                <div className="text-sm font-bold text-white">{article.author}</div>
                <div className="text-xs text-slate-400">{article.authorDetails}</div>
              </div>
            </div>

            {article.quoraStats && (
              <div className="flex items-center gap-3 text-xs font-mono text-slate-300 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                <span className="flex items-center gap-1 text-cyan-400 bg-cyan-950/40 px-2 py-1 rounded border border-cyan-800/40">
                  <Eye className="w-3.5 h-3.5" />
                  {article.quoraStats.views}
                </span>
                <span className="flex items-center gap-1 text-emerald-400 bg-emerald-950/40 px-2 py-1 rounded border border-emerald-800/40">
                  <ThumbsUp className="w-3.5 h-3.5" />
                  {article.quoraStats.upvotes}
                </span>
              </div>
            )}
          </div>

          {/* Before vs After Case Study Widget (for Jyoti's article) */}
          {article.beforeAfterComparison && (
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
                  Interactive UX &amp; Microcopy Audit Breakdown
                </span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  {article.beforeAfterComparison.conversionLift}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Before */}
                <div className="p-4 rounded-xl bg-red-950/20 border border-red-900/40 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-red-400 font-mono">
                    <AlertCircle className="w-4 h-4" />
                    <span>BEFORE: {article.beforeAfterComparison.beforeTitle}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-black/40 border border-red-900/30 text-xs italic text-slate-300">
                    &quot;{article.beforeAfterComparison.beforeText}&quot;
                  </div>
                  <ul className="space-y-1.5">
                    {article.beforeAfterComparison.beforeIssues.map((issue, i) => (
                      <li key={i} className="text-[11px] text-red-300 flex items-start gap-1.5">
                        <span className="text-red-500 mt-0.5">•</span>
                        <span>{issue}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* After */}
                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-900/40 space-y-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 font-mono">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>AFTER: {article.beforeAfterComparison.afterTitle}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-black/40 border border-emerald-900/30 text-xs font-medium text-emerald-200">
                    &quot;{article.beforeAfterComparison.afterText}&quot;
                  </div>
                  <ul className="space-y-1.5">
                    {article.beforeAfterComparison.afterWins.map((win, i) => (
                      <li key={i} className="text-[11px] text-emerald-300 flex items-start gap-1.5">
                        <span className="text-emerald-500 mt-0.5">✓</span>
                        <span>{win}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Full Markdown Content Render */}
          <div className="prose prose-invert max-w-none text-slate-300 text-sm sm:text-base leading-relaxed space-y-4 pt-2 border-t border-slate-800">
            {article.fullContentMarkdown.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={idx} className="text-lg sm:text-xl font-bold text-white pt-2">
                    {paragraph.replace('### ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('#### ')) {
                return (
                  <h4 key={idx} className="text-base sm:text-lg font-semibold text-blue-300 pt-2">
                    {paragraph.replace('#### ', '')}
                  </h4>
                );
              }
              if (paragraph.startsWith('```')) {
                const code = paragraph.replace(/```(typescript|python|bash)?/g, '').trim();
                return (
                  <pre key={idx} className="p-4 rounded-xl bg-black/70 border border-slate-800 font-mono text-xs overflow-x-auto text-blue-300">
                    <code>{code}</code>
                  </pre>
                );
              }
              if (paragraph.startsWith('- ')) {
                const items = paragraph.split('\n');
                return (
                  <ul key={idx} className="space-y-1.5 list-disc pl-5 text-slate-300 text-xs sm:text-sm">
                    {items.map((it, i) => (
                      <li key={i}>{it.replace('- ', '')}</li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={idx} className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-[#0D121E] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-400">
            Published under <span className="text-white font-medium">Rahul &amp; Jyoti Freelance Collective</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {article.quoraUrl && (
              <a
                href={article.quoraUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 py-2 text-xs font-semibold text-red-300 hover:text-white bg-red-950/40 hover:bg-red-900/60 border border-red-800/40 rounded-lg flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Read Live on Quora</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            >
              Close Article
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
