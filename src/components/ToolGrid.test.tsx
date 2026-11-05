import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { ToolGrid } from './ToolGrid';
import type { ToolData } from './ToolCard';

const tool: ToolData = {
  id: 'example',
  name: 'fluidise-example',
  taskTitle: 'A useful task',
  tagline: 'One purpose',
  summary: 'A summary',
  status: 'in-progress',
  color: 'plum',
  icon: 'Icon',
  repoUrl: 'https://example.com',
  keyFeatures: [],
};

describe('task gateway and installation desk', () => {
  it('renders an empty task result without inventing a package', () => {
    const html = renderToStaticMarkup(<ToolGrid tools={[]} />);
    expect(html).toContain('0 tools shown');
    expect(html).toContain('No packages match this filter');
    expect(html).toContain('id="install"');
    expect(html).not.toContain('id="install-example"');
  });

  it('keeps task/docs/source destinations when a command is missing', () => {
    const html = renderToStaticMarkup(<ToolGrid tools={[tool]} />);
    expect(html).toContain('id="tool-example"');
    expect(html).toContain('id="install-example"');
    expect(html).toContain('href="/tools/example"');
    expect(html).toContain('href="https://example.com"');
    expect(html).not.toContain('Copy install command for fluidise-example');
    expect(html).toContain('Copy Homebrew tap installation command');
  });

  it('server-renders both task choices and all install rows from one catalog', () => {
    const second = {
      ...tool,
      id: 'second',
      name: 'fluidise-second',
      taskTitle: 'Another task',
      status: 'released' as const,
      version: 'v1.0.0',
      brewCommand: 'brew install fluidise-second',
    };
    const html = renderToStaticMarkup(<ToolGrid tools={[tool, second]} />);
    expect(html).toContain('2 tools shown');
    expect(html).toContain('id="tool-example"');
    expect(html).toContain('id="tool-second"');
    expect(html).toContain('id="install-example"');
    expect(html).toContain('id="install-second"');
    expect(html).toContain('brew install fluidise-second');
    expect(html).toContain('aria-controls="tool-results"');
  });
});
