import React, { useState } from 'react';
import { Menu, X, Sparkles, Send, FileSignature } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  currentPath?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate, currentPath }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', path: '/' },
    { id: 'about', label: 'About', path: '/about' },
    { id: 'work', label: 'Work (Hire & Pitch)', path: '/work' },
    { id: 'catalog', label: 'Catalog', path: '/catalog' },
    { id: 'contact', label: 'Contact', path: '/contact' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0A0D14]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3.5 text-left group"
          >
            {/* Custom SVG Tech Monogram Emblem */}
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-400 p-[1.5px] shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all duration-300 group-hover:scale-105 shrink-0">
              <div className="w-full h-full bg-[#0B0F19] rounded-[10px] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/15 to-transparent pointer-events-none" />
                <svg
                  className="w-5 h-5 text-cyan-300 relative z-10 transition-transform duration-300 group-hover:scale-110"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 8l-4 4 4 4" />
                  <path d="M17 8l4 4-4 4" />
                  <path d="M14 4l-4 16" stroke="#38BDF8" />
                </svg>
              </div>
            </div>

            {/* Brand Title */}
            <div className="flex items-center gap-2 sm:gap-2.5 text-left">
              <span className="font-extrabold text-white tracking-tight text-base sm:text-lg group-hover:text-cyan-200 transition-colors">
                Welcome Onboard
              </span>
              <span className="px-2.5 py-0.5 text-[10px] font-mono font-bold tracking-wide rounded-md bg-gradient-to-r from-blue-500/15 to-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-sm whitespace-nowrap">
                Freelancer Duo Profile
              </span>
              
              {/* Active Route Path Badge */}
              <span className="hidden xl:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-slate-950/80 border border-emerald-500/30 text-[10px] font-mono text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>url: <strong className="text-white">{currentPath || (activeSection === 'home' ? '/' : `/${activeSection}`)}</strong></span>
              </span>
            </div>
          </button>

          {/* Desktop Nav Tabs */}
          <nav className="hidden md:flex items-center gap-1.5 bg-slate-900/60 p-1 rounded-xl border border-slate-800/80">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  title={`Go to ${item.path}`}
                  className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Quick CTA to Work & Agreement */}
          <div className="hidden sm:flex items-center gap-2">
            <button
              onClick={() => handleNavClick('work')}
              className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 transform hover:-translate-y-0.5"
            >
              <FileSignature className="w-3.5 h-3.5 text-cyan-200" />
              <span>Pitch Project &amp; Hire</span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => handleNavClick('work')}
              className="px-2.5 py-1.5 text-xs font-semibold text-white bg-blue-600 rounded-lg"
            >
              Hire
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
        <div className="md:hidden border-b border-slate-800 bg-[#0E131F] px-4 pt-3 pb-6 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeSection === item.id
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <span>{item.label}</span>
              <span className={`text-[11px] font-mono ${activeSection === item.id ? 'text-blue-100 font-bold' : 'text-slate-500'}`}>
                {item.path}
              </span>
            </button>
          ))}
          <div className="pt-2 border-t border-slate-800">
            <button
              onClick={() => handleNavClick('work')}
              className="w-full py-2.5 text-xs font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center gap-2"
            >
              <FileSignature className="w-4 h-4 text-cyan-300" />
              <span>Pitch Project &amp; Digital Agreement</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
