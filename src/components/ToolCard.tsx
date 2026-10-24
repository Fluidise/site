import React, { useState } from 'react';
import {
  IconCheck,
  IconCopy,
  IconArrowRight,
  IconBrandGithub,
  IconChecklist,
  IconGitFork,
  IconFlame,
} from '@tabler/icons-react';

export interface ToolData {
  id: string;
  name: string;
  tagline: string;
  summary: string;
  status: 'released' | 'in-progress' | 'scoping';
  version?: string;
  color: 'copper' | 'plum' | 'emerald';
  icon: string;
  repoUrl: string;
  brewCommand?: string;
  cargoCommand?: string;
  keyFeatures: string[];
}

const colorStyles = {
  copper: {
    accent: 'border-amber-500/30 group-hover:border-amber-500/60',
    badge: 'bg-amber-500/10 text-amber-300 border-amber-500/20',
    iconBg: 'bg-amber-500/10 text-amber-400',
    glow: 'group-hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]',
  },
  plum: {
    accent: 'border-purple-500/30 group-hover:border-purple-500/60',
    badge: 'bg-purple-500/10 text-purple-300 border-purple-500/20',
    iconBg: 'bg-purple-500/10 text-purple-400',
    glow: 'group-hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]',
  },
  emerald: {
    accent: 'border-emerald-500/30 group-hover:border-emerald-500/60',
    badge: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
    iconBg: 'bg-emerald-500/10 text-emerald-400',
    glow: 'group-hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]',
  },
};

export const ToolCard: React.FC<{ tool: ToolData }> = ({ tool }) => {
  const [copied, setCopied] = useState(false);
  const styles = colorStyles[tool.color];

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (tool.brewCommand) {
      navigator.clipboard
        .writeText(tool.brewCommand)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch((err) => console.error('Copy failed: ', err));
    }
  };

  const renderIcon = () => {
    switch (tool.icon) {
      case 'IconChecklist':
        return <IconChecklist size={24} />;
      case 'IconGitFork':
        return <IconGitFork size={24} />;
      default:
        return <IconFlame size={24} />;
    }
  };

  return (
    <div
      className={`group relative rounded-2xl border bg-[#0e0c14]/90 p-6 sm:p-8 backdrop-blur-xl transition-all duration-200 hover:-translate-y-1 ${styles.accent} ${styles.glow} flex flex-col justify-between`}
    >
      <div>
        {/* Card Header */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className={`p-3 rounded-xl border border-white/[0.08] ${styles.iconBg}`}>
            {renderIcon()}
          </div>

          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-1 rounded-full text-xs font-mono border ${styles.badge}`}>
              {tool.status === 'released' ? 'v1.0.0 Released' : 'In Development'}
            </span>
          </div>
        </div>

        {/* Title & Tagline */}
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-amber-200 transition-colors font-mono">
          {tool.name}
        </h3>
        <p className="text-sm font-medium text-zinc-300 mb-3">{tool.tagline}</p>
        <p className="text-xs text-zinc-400 leading-relaxed mb-6">{tool.summary}</p>

        {/* Feature Highlights */}
        <div className="space-y-2 mb-6">
          {tool.keyFeatures.slice(0, 3).map((feature, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Card Actions & Links */}
      <div className="pt-6 border-t border-white/[0.08] space-y-4">
        {tool.brewCommand && (
          <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-black/40 border border-white/[0.06] font-mono text-xs text-zinc-300">
            <span className="truncate">{tool.brewCommand}</span>
            <button
              onClick={handleCopy}
              className="p-1.5 min-w-[32px] min-h-[32px] flex items-center justify-center rounded hover:bg-white/[0.1] text-zinc-400 hover:text-white transition-colors focus-visible:ring-1 focus-visible:ring-amber-400"
              title={`Copy install command for ${tool.name}`}
              aria-label={`Copy install command for ${tool.name}`}
            >
              {copied ? (
                <IconCheck size={14} className="text-emerald-400" />
              ) : (
                <IconCopy size={14} />
              )}
            </button>
          </div>
        )}

        <div className="flex items-center justify-between gap-3 pt-1">
          <a
            href={`/tools/${tool.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors group/link focus-visible:ring-1 focus-visible:ring-amber-400 rounded"
          >
            <span>Read Specification & Docs</span>
            <IconArrowRight
              size={14}
              className="group-hover/link:translate-x-1 transition-transform"
            />
          </a>

          <a
            href={tool.repoUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="p-1.5 min-w-[32px] min-h-[32px] flex items-center justify-center rounded-md hover:bg-white/[0.08] text-zinc-400 hover:text-white transition-colors focus-visible:ring-1 focus-visible:ring-amber-400"
            title={`View ${tool.name} repository on GitHub`}
            aria-label={`View ${tool.name} repository on GitHub`}
          >
            <IconBrandGithub size={18} />
          </a>
        </div>
      </div>
    </div>
  );
};
