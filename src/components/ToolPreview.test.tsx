import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { ToolPreview } from './ToolPreview';

const banner = {
  src: '/scene.webp',
  srcSet: '/scene.webp 2048w',
  sizes: '2048px',
  width: 2048,
  height: 768,
};

describe('static product scenes', () => {
  it('shows a labeled Clint input and JSON excerpt, not a live terminal', () => {
    const html = renderToStaticMarkup(<ToolPreview toolId="clint" banner={banner} />);
    expect(html).toContain('COMMIT_EDITMSG');
    expect(html).toContain('feat(core): add search');
    expect(html).toContain('&quot;schema_version&quot;: 1');
    expect(html).toContain('&quot;status&quot;: &quot;valid&quot;');
    expect(html).toContain('&quot;diagnostics&quot;: []');
    expect(html).toContain('Exit 0');
    expect(html).toContain('<figcaption>Illustrative example · JSON excerpt</figcaption>');
    expect(html).not.toContain('0.42ms');
    expect(html).not.toContain('interactive sandbox');
  });

  it('shows Relay configuration and the inspection/approval boundary without claiming execution', () => {
    const html = renderToStaticMarkup(<ToolPreview toolId="relay" banner={banner} />);
    expect(html).toContain('commit-msg');
    expect(html).toContain('fluidise-clint --file {message-file}');
    expect(html).toContain('Read-only');
    expect(html).toContain('<code>install</code>');
    expect(html).toContain('--plan &lt;id&gt;');
    expect(html).toContain('<figcaption>Illustrative example · Plan summary</figcaption>');
    expect(html).not.toContain('pre-commit');
    expect(html).not.toContain('Installed');
  });

  it('keeps previews selectable and server-rendered without fake controls or duplicate ids', () => {
    for (const toolId of ['clint', 'relay']) {
      const html = renderToStaticMarkup(<ToolPreview toolId={toolId} banner={banner} />);
      expect(html).toContain('class="preview-panels"');
      expect(html).toContain('alt="" loading="lazy" decoding="async"');
      expect(html).not.toMatch(/<(button|a|script)\b|\bid=/);
      expect(html).not.toContain('aria-hidden="true"><code');
    }
  });

  it('does not invent preview data for another tool', () => {
    const html = renderToStaticMarkup(<ToolPreview toolId="another-tool" banner={banner} />);
    expect(html).toContain('/scene.webp');
    expect(html).not.toContain('preview-panel');
    expect(html).not.toContain('Illustrative example');
  });
});
