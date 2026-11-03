import React, { useState } from 'react';
import { Code2, PenTool, ShieldCheck, Terminal, Menu, X, ArrowUpRight, Sparkles, FileText } from 'lucide-react';

interface NavbarProps {
  onOpenEstimator: () => void;
  onOpenRateCard: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenEstimator, onOpenRateCard }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Pledge', href: '#pledge' },
    { name: 'Services', href: '#services' },
    { name: 'Engineering Work', href: '#work' },
    { name: 'Quora & Editorial', href: '#editorial' },
    { name: 'Workflow', href: '#workflow' },
    { name: 'Co-Founders', href: '#founders' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0A0D14]/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo / Brand */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 p-[1px] shadow-glow-blue transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-[#0E131F] rounded-[11px] flex items-center justify-center">
                <span className="font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 text-sm">
                  &lt;R&amp;J/&gt;
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-100 tracking-tight text-base sm:text-lg">
                  Rahul <span className="text-blue-400 font-mono">&amp;</span> Jyoti
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Studio
                </span>
              </div>
              <span className="text-xs text-slate-400 font-medium hidden sm:inline-block">
                Full-Stack Code + Editorial Strategy
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-1.5 text-xs xl:text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenRateCard}
              className="px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 rounded-lg transition-all flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>Pitch Deck &amp; Rate Card</span>
            </button>

            <button
              onClick={onOpenEstimator}
              className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-lg shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span>Scope Estimator</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenEstimator}
              className="px-2.5 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-md"
            >
              Estimate
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/60"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-[#0E131F] px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800/60 rounded-md"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRateCard();
              }}
              className="w-full py-2.5 px-4 text-xs font-medium text-center text-slate-200 bg-slate-800/80 rounded-lg border border-slate-700 flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              Pitch Deck &amp; Capabilities Card
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenEstimator();
              }}
              className="w-full py-2.5 px-4 text-xs font-semibold text-center text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-sm flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-cyan-300" />
              Open Scope Estimator &amp; WhatsApp Pitch
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
