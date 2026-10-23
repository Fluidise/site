import React from 'react';
import { IconBrandGithub, IconExternalLink, IconSparkles } from '@tabler/icons-react';
import { CompanionLogo } from './CompanionLogo';

export const Navbar: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-[#09080c]/80 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <a href="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-lg p-1">
          <CompanionLogo size={32} className="text-amber-400 group-hover:text-amber-300 transition-colors" />
          <div className="flex flex-col">
            <span className="font-bold tracking-wider text-sm sm:text-base text-white group-hover:text-amber-200 transition-colors">
              FLUIDISE
            </span>
            <span className="text-[10px] tracking-widest uppercase text-zinc-400 -mt-1 font-mono">
              Agent-First DX
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <a
            href="/#tools"
            className="hover:text-white transition-colors py-1 hover:border-b-2 hover:border-amber-400"
          >
            Tools & Suite
          </a>
          <a
            href="/#philosophy"
            className="hover:text-white transition-colors py-1 hover:border-b-2 hover:border-amber-400"
          >
            Philosophy
          </a>
          <a
            href="https://github.com/Fluidise/core/tree/main/docs"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 hover:text-white transition-colors py-1"
          >
            Specifications
            <IconExternalLink size={14} className="opacity-70" />
          </a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono">
            <IconSparkles size={12} className="text-amber-400" />
            <span>v1.0 Ready</span>
          </div>

          <a
            href="https://github.com/Fluidise"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-zinc-200 text-sm font-medium transition-all hover:scale-105 active:scale-95"
            aria-label="GitHub Organization"
          >
            <IconBrandGithub size={18} />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
};
