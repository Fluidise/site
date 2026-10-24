import { useState } from 'react';
import { ToolCard, type ToolData } from './ToolCard';

export function ToolGrid({ tools }: { tools: ToolData[] }) {
  const [filter, setFilter] = useState<'all' | 'released' | 'in-progress'>('all');
  const filteredTools = tools.filter((tool) => filter === 'all' || tool.status === filter);

  return (
    <section id="tools" className="tool-section" aria-labelledby="tools-heading">
      <div className="shell">
        <div className="catalog-header">
          <h2 id="tools-heading">Tools &amp; Suite</h2>
          <fieldset className="catalog-filters" aria-label="Filter packages">
            {(
              [
                { id: 'all', label: 'All Packages' },
                { id: 'released', label: 'Production Ready' },
                { id: 'in-progress', label: 'In Scoping' },
              ] as const
            ).map((tab) => (
              <button
                type="button"
                key={tab.id}
                className="glacial-control"
                aria-pressed={filter === tab.id}
                aria-controls="tool-results"
                onClick={() => setFilter(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </fieldset>
        </div>
        <output className="sr-only">{filteredTools.length} packages shown</output>
        <div className="tool-list" id="tool-results">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
          {!filteredTools.length && (
            <p className="empty-state">
              No packages match this filter. Choose All Packages to see the suite.
            </p>
          )}
        </div>
        <p className="catalog-description">
          Each tool is independently installable, zero-runtime, and built with explicit
          machine-readable contracts.
        </p>
      </div>
    </section>
  );
}
