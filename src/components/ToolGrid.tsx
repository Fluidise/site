import { useState } from 'react';
import { IconArrowUpRight, IconBrandGithub } from '@tabler/icons-react';
import { ToolCard, type ToolData } from './ToolCard';
import { CopyCommand } from './CopyCommand';

export function ToolGrid({ tools }: { tools: ToolData[] }) {
  const [filter, setFilter] = useState<'all' | 'released' | 'in-progress'>('all');
  const filteredTools = tools.filter((tool) => filter === 'all' || tool.status === filter);

  return (
    <>
      <section
        id="tools"
        className="tool-section shell background-frame"
        aria-labelledby="tools-heading"
      >
        <div className="catalog-header">
          <div>
            <h2 id="tools-heading">Start with the job.</h2>
            <p>Independent tools. Choose the one your workflow needs.</p>
          </div>
          <div className="catalog-toolbar">
            <fieldset className="catalog-filters" aria-label="Filter task results">
              {(
                [
                  { id: 'all', label: 'All tools' },
                  { id: 'released', label: 'Released' },
                  { id: 'in-progress', label: 'In development' },
                ] as const
              ).map((item) => (
                <button
                  type="button"
                  key={item.id}
                  className="catalog-filter"
                  aria-pressed={filter === item.id}
                  aria-controls="tool-results"
                  onClick={() => setFilter(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </fieldset>
            <output className="catalog-count">
              {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'} shown
            </output>
          </div>
        </div>
        <div className="task-list" id="tool-results">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
          {!filteredTools.length && (
            <p className="empty-state">
              No packages match this filter. Choose All tools to see the suite.
            </p>
          )}
        </div>
        <span className="background-hatch" aria-hidden="true" />
      </section>
      <section
        id="install"
        className="install-section shell background-frame"
        aria-labelledby="install-heading"
      >
        <div className="section-intro">
          <h2 id="install-heading">Install a tool.</h2>
          <p>Know what you need? Start here, or read the full installation options.</p>
        </div>
        <div className="install-list">
          {tools.map((tool) => (
            <article
              className="install-entry"
              id={`install-${tool.id}`}
              key={tool.id}
              aria-labelledby={`install-title-${tool.id}`}
            >
              <div className="install-identity">
                <h3 id={`install-title-${tool.id}`}>{tool.name}</h3>
                <p className="tool-status">
                  {tool.status === 'released' ? `${tool.version ?? ''} Released` : 'In Development'}
                </p>
                <div className="tool-links">
                  <a className="text-link" href={`/tools/${tool.id}`}>
                    Read docs <IconArrowUpRight size={16} aria-hidden="true" />
                  </a>
                  <a
                    className="text-link"
                    href={tool.repoUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={`View ${tool.name} repository on GitHub (opens in new tab)`}
                  >
                    <IconBrandGithub size={17} aria-hidden="true" /> GitHub
                  </a>
                </div>
              </div>
              {tool.brewCommand && (
                <CopyCommand
                  command={tool.brewCommand}
                  label={`Copy install command for ${tool.name}`}
                />
              )}
            </article>
          ))}
        </div>
        <div className="install-tap">
          <p>Homebrew tap</p>
          <CopyCommand
            command="brew tap Fluidise/homebrew-tap"
            label="Copy Homebrew tap installation command"
          />
        </div>
        <span className="background-hatch" aria-hidden="true" />
      </section>
    </>
  );
}
