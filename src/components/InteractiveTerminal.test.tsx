import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { InteractiveTerminal } from './InteractiveTerminal';

describe('terminal text controls', () => {
  it('preserves the format tabs, sample action and copy affordance without capsule controls', () => {
    const html = renderToStaticMarkup(<InteractiveTerminal />);
    expect(html.match(/class="terminal-control"/g)).toHaveLength(3);
    expect(html).not.toContain('glacial-control');
    expect(html).toContain('role="tablist" aria-label="Output format selector"');
    expect(html.match(/role="tab"/g)).toHaveLength(2);
    expect(html).toContain('aria-selected="true" tabindex="0"');
    expect(html).toContain('aria-selected="false" tabindex="-1"');
    expect(html).toContain('JSON (Agent default)');
    expect(html).toContain('Text (--format text)');
    expect(html).toContain('Toggle Error');
    expect(html).toContain('aria-label="Copy terminal output"');
    expect(html).toContain('Demonstration · Sample output, not live execution');
  });
});
