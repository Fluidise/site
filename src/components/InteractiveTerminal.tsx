import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { IconCheck, IconCopy, IconTerminal2, IconCpu } from '@tabler/icons-react';

const SAMPLES = {
  valid: {
    command: 'fluidise-clint "feat(core): introduce agent-first contract"',
    json: `{
  "schema_version": 1,
  "status": "valid",
  "diagnostics": [],
  "commit": {
    "type": "feat",
    "scope": "core",
    "description": "introduce agent-first contract",
    "breaking": false
  }
}`,
    text: `✔ Commit message conforms to Conventional Commits 1.0.0
  Type: feat
  Scope: core
  Subject: introduce agent-first contract

Deterministic check completed in 0.42ms. Zero side-effects.`,
  },
  invalid: {
    command: 'fluidise-clint "Fixed the bug and cleaned up code"',
    json: `{
  "schema_version": 1,
  "status": "invalid",
  "diagnostics": [
    {
      "code": "CC001",
      "severity": "error",
      "message": "Missing conventional commit type prefix",
      "span": { "start": 0, "end": 5 },
      "suggestion": "Prefix header with allowed type (e.g. feat:, fix:, chore:)"
    }
  ]
}`,
    text: `✖ Validation Error [CC001]: Missing conventional commit type prefix
  1 | Fixed the bug and cleaned up code
    | ^^^^^ Expected type prefix (feat, fix, docs, chore, etc.)

Exit code: 1 (Deterministic violation).`,
  },
};

export const InteractiveTerminal: React.FC = () => {
  const [mode, setMode] = useState<'json' | 'text'>('json');
  const [sample, setSample] = useState<'valid' | 'invalid'>('valid');
  const [copied, setCopied] = useState(false);

  const current = SAMPLES[sample];
  const output = mode === 'json' ? current.json : current.text;

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-3xl mx-auto rounded-xl border border-white/[0.12] bg-[#0c0a10]/95 shadow-2xl overflow-hidden backdrop-blur-xl">
      {/* Window Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white/[0.03] border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono text-zinc-400 pl-3">
            <IconTerminal2 size={14} className="text-amber-400" />
            <span>fluidise-clint interactive sandbox</span>
          </div>
        </div>

        {/* Mode selector */}
        <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-lg border border-white/[0.08]">
          <button
            onClick={() => setMode('json')}
            className={`px-2.5 py-1 text-xs font-mono rounded flex items-center gap-1 transition-all ${
              mode === 'json'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <IconCpu size={12} />
            JSON (Agent default)
          </button>
          <button
            onClick={() => setMode('text')}
            className={`px-2.5 py-1 text-xs font-mono rounded flex items-center gap-1 transition-all ${
              mode === 'text'
                ? 'bg-white/10 text-zinc-200 border border-white/20'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Text (--format text)
          </button>
        </div>
      </div>

      {/* Terminal Command bar */}
      <div className="px-5 py-3 bg-black/30 border-b border-white/[0.05] flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-mono text-xs sm:text-sm text-zinc-300 overflow-x-auto py-1">
          <span className="text-amber-400 font-bold">$</span>
          <span>{current.command}</span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setSample(sample === 'valid' ? 'invalid' : 'valid')}
            className="text-xs font-mono px-2 py-1 rounded bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 border border-white/[0.08] transition-colors"
          >
            Toggle {sample === 'valid' ? 'Error' : 'Success'}
          </button>
          <button
            onClick={handleCopy}
            className="p-1.5 rounded bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 border border-white/[0.08] transition-colors"
            title="Copy Output"
            aria-label="Copy Output"
          >
            {copied ? <IconCheck size={14} className="text-emerald-400" /> : <IconCopy size={14} />}
          </button>
        </div>
      </div>

      {/* Output Console */}
      <div className="p-5 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto min-h-[220px]">
        <AnimatePresence mode="wait">
          <motion.pre
            key={`${mode}-${sample}`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className={`whitespace-pre ${
              mode === 'json'
                ? 'text-amber-200/90'
                : sample === 'valid'
                ? 'text-emerald-300/90'
                : 'text-rose-300/90'
            }`}
          >
            {output}
          </motion.pre>
        </AnimatePresence>
      </div>

      {/* Terminal Footer info */}
      <div className="px-5 py-2.5 bg-black/40 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-zinc-400">
        <span className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${sample === 'valid' ? 'bg-emerald-400' : 'bg-rose-400'}`} />
          Exit code: {sample === 'valid' ? '0' : '1'}
        </span>
        <span className="text-zinc-400">Zero side-effects • Native Rust binary</span>
      </div>
    </div>
  );
};
