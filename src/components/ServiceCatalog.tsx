import React from 'react';
import { servicePillarsData } from '../data/portfolioData';
import { Code2, PenTool, Rocket, Check, ArrowRight, Sparkles, Star } from 'lucide-react';

interface ServiceCatalogProps {
  onSelectService: (serviceId: string) => void;
}

export const ServiceCatalog: React.FC<ServiceCatalogProps> = ({ onSelectService }) => {
  const getPillarIcon = (index: number) => {
    switch (index) {
      case 0:
        return Code2;
      case 1:
        return PenTool;
      case 2:
      default:
        return Rocket;
    }
  };

  return (
    <section id="services" className="py-20 bg-[#0A0D14] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono font-semibold mb-3">
            <span>THREE CRYSTAL-CLEAR SERVICE PILLARS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Dual-Engine Service Catalog
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Avoid 20 random freelance gigs. We focus exclusively on what we execute at an industry-leading standard:
            high-performance web engineering, authority B2B technical content, and our signature turnkey launch bundle.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {servicePillarsData.map((pillar, idx) => {
            const Icon = getPillarIcon(idx);
            const isUSP = pillar.isUSP;

            return (
              <div
                key={pillar.id}
                className={`rounded-2xl flex flex-col justify-between transition-all duration-300 relative ${
                  isUSP
                    ? 'bg-gradient-to-b from-blue-950/60 via-slate-900/90 to-slate-950 border-2 border-blue-500/50 shadow-2xl shadow-blue-500/15 p-7 lg:-translate-y-2'
                    : 'bg-slate-900/50 border border-slate-800 p-6 sm:p-7 hover:border-slate-700'
                }`}
              >
                {/* USP Ribbon */}
                {isUSP && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[11px] font-bold tracking-wide uppercase shadow-md flex items-center gap-1.5 whitespace-nowrap">
                    <Star className="w-3.5 h-3.5 fill-current text-yellow-300" />
                    Signature Studio USP • Code + Design + Copy
                  </div>
                )}

                <div>
                  {/* Top meta */}
                  <div className="flex items-center justify-between mb-4 mt-1">
                    <div className="w-11 h-11 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center">
                      <Icon className={`w-5 h-5 ${isUSP ? 'text-blue-400' : 'text-slate-300'}`} />
                    </div>
                    <span className="font-mono text-xs text-slate-500 font-semibold">
                      PILLAR {pillar.number}
                    </span>
                  </div>

                  {/* Title & Badge */}
                  <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                    {pillar.title}
                  </h3>
                  
                  <div className="inline-block px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/70 text-xs font-mono text-cyan-300 mb-5">
                    {pillar.badge}
                  </div>

                  {/* Deliverables List */}
                  <div className="space-y-4 mb-6">
                    <div className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                      Concrete Deliverables:
                    </div>

                    {pillar.deliverables.map((item, dIdx) => (
                      <div key={dIdx} className="space-y-1.5 p-3 rounded-xl bg-slate-950/50 border border-slate-800/60">
                        <div className="flex items-start gap-2 text-xs font-semibold text-slate-200">
                          <Check className="w-3.5 h-3.5 text-blue-400 mt-0.5 shrink-0" />
                          <span>{item.title}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-normal pl-5">
                          {item.description}
                        </p>
                        <div className="flex flex-wrap gap-1 pl-5 pt-1">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Why Clients Love This (for USP) */}
                  {pillar.whyClientsLoveThis && (
                    <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-200 leading-relaxed mb-6">
                      <span className="font-bold text-blue-300">Why Founders Love This: </span>
                      {pillar.whyClientsLoveThis}
                    </div>
                  )}

                  {/* Target Clients */}
                  <div className="mb-6">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-medium block mb-2">
                      Ideal Target Clients:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {pillar.targetClients.map((client) => (
                        <span
                          key={client}
                          className="text-xs px-2 py-0.5 rounded-full bg-slate-800/60 text-slate-300 border border-slate-700/60"
                        >
                          {client}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom CTA */}
                <button
                  onClick={() => onSelectService(pillar.id)}
                  className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                    isUSP
                      ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white border border-slate-700'
                  }`}
                >
                  <span>Configure &amp; Estimate This Pillar</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
