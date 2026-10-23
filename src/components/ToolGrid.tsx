import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ToolCard, type ToolData } from './ToolCard';

interface ToolGridProps {
  tools: ToolData[];
}

export const ToolGrid: React.FC<ToolGridProps> = ({ tools }) => {
  const [filter, setFilter] = useState<'all' | 'released' | 'in-progress'>('all');

  const filteredTools = tools.filter((t) => {
    if (filter === 'all') return true;
    return t.status === filter;
  });

  return (
    <section id="tools" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-2 block">
              The Ecosystem
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Modular DX Packages
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 mt-2 max-w-xl">
              Each tool is independently installable, zero-runtime, and built with explicit machine-readable contracts.
            </p>
          </div>

          {/* Filter Pills with Motion layoutId */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-md self-start md:self-auto">
            {(
              [
                { id: 'all', label: 'All Packages' },
                { id: 'released', label: 'Production Ready' },
                { id: 'in-progress', label: 'In Scoping' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`relative px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors z-10 ${
                  filter === tab.id ? 'text-black font-semibold' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {filter === tab.id && (
                  <motion.div
                    layoutId="activeFilterPill"
                    className="absolute inset-0 bg-amber-400 rounded-lg -z-10 shadow-[0_0_12px_rgba(245,158,11,0.3)]"
                    transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                  />
                )}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Cards Grid */}
        <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredTools.map((tool) => (
              <motion.div
                key={tool.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
              >
                <ToolCard tool={tool} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
