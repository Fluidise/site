import { useEffect, useRef, useState } from 'react';
import { IconCheck, IconCopy } from '@tabler/icons-react';

export function CopyCommand({
  command,
  label = 'Copy installation command',
}: {
  command: string;
  label?: string;
}) {
  const [status, setStatus] = useState('');
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  async function copy() {
    clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(command);
      setStatus('Command copied to clipboard');
      timer.current = setTimeout(() => setStatus(''), 2000);
    } catch {
      setStatus('Copy failed. Select and copy the command manually.');
    }
  }

  return (
    <div className="copy-command-wrapper">
      <div className="copy-command">
        <code>{command}</code>
        <button type="button" className="copy-button" aria-label={label} onClick={copy}>
          {status === 'Command copied to clipboard' ? (
            <IconCheck size={17} aria-hidden="true" />
          ) : (
            <IconCopy size={17} aria-hidden="true" />
          )}
        </button>
      </div>
      <output className={status.startsWith('Copy failed') ? 'terminal-feedback' : 'sr-only'}>
        {status}
      </output>
    </div>
  );
}
