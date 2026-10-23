import React, { useState } from 'react';
import { motion } from 'motion/react';
import { IconArrowRight, IconCheck, IconCopy, IconSparkles } from '@tabler/icons-react';
import { InteractiveTerminal } from './InteractiveTerminal';

export const Hero: React.FC = () => {
  const [copiedBrew, setCopiedBrew] = useState(false);

  const copyBrew = () => {
    navigator.clipboard.writeText('brew tap Fluidise/homebrew-tap');
    setCopiedBrew(true);
    setTimeout(() => setCopiedBrew(false), 2000);
  };

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-500/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-purple-500/10 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          {/* Tag badge */}
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-amber-300 text-xs font-mono mb-6 backdrop-blur-md"
          >
            <IconSparkles size={14} className="text-amber-400" />
            <span>Agent-First Developer Experience Suite</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: 'easeOut' }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6 leading-[1.1]"
          >
            Developer tools designed for{' '}
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
              AI agents
            </span>{' '}
            and developers.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2, ease: 'easeOut' }}
            className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto mb-8"
          >
            Autonomous tools with strict operational determinism, machine-readable JSON outputs, and zero side-effects. Designed as independent Unix-style building blocks.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3, ease: 'easeOut' }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <a
              href="#tools"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-semibold text-sm transition-all shadow-[0_0_24px_rgba(245,158,11,0.25)] hover:shadow-[0_0_32px_rgba(245,158,11,0.4)]"
            >
              Explore Tools
              <IconArrowRight size={16} />
            </a>

            <button
              onClick={copyBrew}
              className="w-full sm:w-auto inline-flex items-center justify-between gap-3 px-4 py-3 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-zinc-300 font-mono text-xs sm:text-sm transition-all"
            >
              <div className="flex items-center gap-2">
                <span className="text-amber-400">$</span>
                <span>brew tap Fluidise/homebrew-tap</span>
              </div>
              <span className="text-zinc-500 hover:text-white transition-colors">
                {copiedBrew ? <IconCheck size={16} className="text-emerald-400" /> : <IconCopy size={16} />}
              </span>
            </button>
          </motion.div>
        </div>

        {/* Live Interactive Playground Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.4, ease: 'easeOut' }}
          className="relative"
        >
          <InteractiveTerminal />
        </motion.div>
      </div>
    </section>
  );
};
