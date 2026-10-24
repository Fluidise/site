import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { IconCheck, IconCopy } from '@tabler/icons-react';

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

export function InteractiveTerminal() {
  const [mode, setMode] = useState<'json' | 'text'>('json');
  const [sample, setSample] = useState<'valid' | 'invalid'>('valid');
  const [feedback, setFeedback] = useState('');
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  const current = SAMPLES[sample];
  const output = current[mode];

  function handleFormatKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next =
      event.key === 'Home'
        ? 'json'
        : event.key === 'End'
          ? 'text'
          : mode === 'json'
            ? 'text'
            : 'json';
    setMode(next);
    document.getElementById(`terminal-format-${next}`)?.focus();
  }

  async function copy() {
    clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(output);
      setFeedback('Terminal output copied to clipboard');
      timer.current = setTimeout(() => setFeedback(''), 2000);
    } catch {
      setFeedback('Copy failed. Select and copy the output manually.');
    }
  }

  return (
    <div className="terminal">
      <div className="terminal-header">
        <div>
          <h3 className="terminal-heading">fluidise-clint interactive sandbox</h3>
          <p className="terminal-demo-label">Demonstration · Sample output, not live execution</p>
        </div>
        <div className="terminal-controls">
          <div role="tablist" aria-label="Output format selector" className="terminal-controls">
            <button
              type="button"
              className="glacial-control"
              id="terminal-format-json"
              role="tab"
              aria-selected={mode === 'json'}
              tabIndex={mode === 'json' ? 0 : -1}
              onKeyDown={handleFormatKeyDown}
              aria-controls="terminal-output"
              onClick={() => setMode('json')}
            >
              JSON (Agent default)
            </button>
            <button
              type="button"
              className="glacial-control"
              id="terminal-format-text"
              role="tab"
              aria-selected={mode === 'text'}
              tabIndex={mode === 'text' ? 0 : -1}
              onKeyDown={handleFormatKeyDown}
              aria-controls="terminal-output"
              onClick={() => setMode('text')}
            >
              Text (--format text)
            </button>
          </div>
          <button
            type="button"
            className="glacial-control"
            aria-controls="terminal-output"
            onClick={() => setSample(sample === 'valid' ? 'invalid' : 'valid')}
          >
            Toggle {sample === 'valid' ? 'Error' : 'Success'}
          </button>
        </div>
      </div>
      <div className="terminal-body">
        <div className="terminal-command">
          <code>$ {current.command}</code>
        </div>
        <div className="terminal-output">
          <pre
            role="tabpanel"
            aria-labelledby={`terminal-format-${mode}`}
            id="terminal-output"
            data-sample={sample}
            tabIndex={0}
            aria-label={`${mode === 'json' ? 'JSON' : 'Text'} sample output`}
          >
            {output}
          </pre>
          <button
            type="button"
            className="copy-button"
            aria-label="Copy terminal output"
            onClick={copy}
          >
            {feedback === 'Terminal output copied to clipboard' ? (
              <IconCheck size={17} aria-hidden="true" />
            ) : (
              <IconCopy size={17} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
      <div className="terminal-footer">
        <span>Exit code: {sample === 'valid' ? '0' : '1'}</span>
        <span>Zero side-effects · Native Rust binary</span>
      </div>
      <output className={feedback.startsWith('Copy failed') ? 'terminal-feedback' : 'sr-only'}>
        {feedback}
      </output>
      <output className="sr-only">
        {mode === 'json' ? 'JSON' : 'Text'} format, {sample} sample
      </output>
    </div>
  );
}
