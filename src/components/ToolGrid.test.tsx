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
  banner: {
    src: '/_astro/example-banner.webp',
    srcSet: '/_astro/example-banner-small.webp 320w, /_astro/example-banner.webp 1280w',
    sizes: '(max-width: 900px) 92vw, 46vw',
    width: 2048,
    height: 768,
  },
};

describe('task gateway and installation desk', () => {
  it('groups native text filters and the live count in one catalog toolbar', () => {
    const html = renderToStaticMarkup(<ToolGrid tools={[tool]} />);
    const gateway = html.slice(html.indexOf('id="tools"'), html.indexOf('id="install"'));
    const toolbar = gateway.match(/class="catalog-toolbar">([\s\S]*?)<\/output>/)?.[1];
    expect(toolbar).toBeDefined();
    expect(toolbar).toContain(
      '<fieldset class="catalog-filters" aria-label="Filter task results">',
    );
    expect(toolbar?.match(/<button type="button" class="catalog-filter"/g)).toHaveLength(3);
    expect(toolbar?.match(/aria-pressed="true"/g)).toHaveLength(1);
    expect(toolbar?.match(/aria-pressed="false"/g)).toHaveLength(2);
    expect(toolbar?.match(/aria-controls="tool-results"/g)).toHaveLength(3);
    for (const label of ['All tools', 'Released', 'In development']) {
      expect(toolbar).toContain(`>${label}</button>`);
    }
    expect(toolbar).toContain('<output class="catalog-count">1 tool shown');
    expect(gateway).not.toContain('glacial-control');
    expect(gateway.match(/class="catalog-count"/g)).toHaveLength(1);
    expect(gateway).toContain('<h2 id="tools-heading">Start with the job.</h2>');
    expect(gateway).toContain('Independent tools. Choose the one your workflow needs.');
  });

  it('separates live task content and actions from the landscape scene', () => {
    const html = renderToStaticMarkup(<ToolGrid tools={[tool]} />);
    const task = html.slice(html.indexOf('<article'), html.indexOf('</article>'));
    expect(task).toContain('class="tool-feature"');
    expect(task.indexOf('A useful task')).toBeLessThan(task.indexOf('class="tool-scene"'));
    expect(task.indexOf('fluidise-example')).toBeLessThan(task.indexOf('class="tool-scene"'));
    expect(task.indexOf('Install command')).toBeLessThan(task.indexOf('class="tool-scene"'));
    expect(task.indexOf('class="tool-scene"')).toBeLessThan(task.indexOf('example-banner.webp'));
    expect(task).toContain('class="tool-banner"');
    expect(task).toContain('alt=""');
    expect(task).toContain('width="2048" height="768"');
    expect(task).toContain('loading="lazy"');
    expect(task).toContain('decoding="async"');
    expect(task).toContain('srcSet=');
    expect(task).toContain('sizes=');
    expect(task.indexOf('class="tool-presentation"')).toBeLessThan(task.indexOf('A useful task'));
    expect(task.match(/<svg/g)).toHaveLength(1);
  });

  it('does not repeat banners in the independent installation desk', () => {
    const html = renderToStaticMarkup(<ToolGrid tools={[tool]} />);
    const install = html.slice(html.indexOf('id="install"'));
    expect(install).not.toContain('example-banner');
    expect(install).toContain('fluidise-example');
  });

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
    expect(html).toContain('href="/tools/example/"');
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
