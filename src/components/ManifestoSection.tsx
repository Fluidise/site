import React from 'react';
import { motion } from 'motion/react';
import { IconCpu, IconLayersSubtract, IconShieldCheck } from '@tabler/icons-react';

const PRINCIPLES = [
  {
    icon: IconCpu,
    number: '01',
    title: 'Agent-First Invariant',
    description:
      'Outputs and telemetry are structured as versioned, machine-readable JSON by default. AI agents parse precise byte-range diagnostic spans without error-prone regex or unstructured stdout scraping.',
    highlight: 'JSON by default, text on request',
  },
  {
    icon: IconLayersSubtract,
    number: '02',
    title: 'Strict Unix Philosophy',
    description:
      'Each tool serves a precise, singular purpose. Packages remain independently usable and composable without requiring the adoption of the entire suite or heavy runtime environments.',
    highlight: 'Single responsibility, standalone binaries',
  },
  {
    icon: IconShieldCheck,
    number: '03',
    title: 'Zero Unannounced Mutation',
    description:
      'Tools never silently rewrite repository configurations, install unannounced background hooks, or trigger unexpected network requests. Every lifecycle mutation requires explicit user or agent confirmation.',
    highlight: 'Read-only plan inspection, bounded execution',
  },
];

export const ManifestoSection: React.FC = () => {
  return (
    <section id="philosophy" className="py-16 md:py-24 border-t border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-amber-400 mb-2 block">
            Core Principles
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            The Product Contract
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-3">
            Every package published under Fluidise conforms to foundational invariants established in our core specifications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PRINCIPLES.map((principle, idx) => {
            const Icon = principle.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className="relative rounded-2xl border border-white/[0.08] bg-[#0c0a12]/80 p-8 backdrop-blur-xl flex flex-col justify-between hover:border-amber-500/30 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      <Icon size={24} />
                    </div>
                    <span className="text-2xl font-mono font-bold text-zinc-600">
                      {principle.number}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3 font-mono">
                    {principle.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                    {principle.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] text-xs font-mono text-amber-300/80">
                  ⚡ {principle.highlight}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
