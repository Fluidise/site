import { IconArrowRight, IconBrandGithub, IconGitFork } from '@tabler/icons-react';
import { CopyCommand } from './CopyCommand';

export interface ToolData {
  id: string;
  name: string;
  tagline: string;
  summary: string;
  status: 'released' | 'in-progress' | 'scoping';
  version?: string;
  color: 'copper' | 'plum' | 'emerald';
  icon: string;
  repoUrl: string;
  brewCommand?: string;
  cargoCommand?: string;
  keyFeatures: string[];
}

export function ToolCard({ tool }: { tool: ToolData }) {
  return (
    <article className="tool-entry" aria-labelledby={`tool-${tool.id}`}>
      <div className="tool-symbol" aria-hidden="true">
        {tool.id === 'clint' ? (
          <img src="/brand/logo.svg" alt="" width={52} height={52} />
        ) : (
          <IconGitFork size={32} />
        )}
      </div>
      <div>
        <h3 id={`tool-${tool.id}`}>{tool.name}</h3>
        <p className="tool-tagline">{tool.tagline}</p>
        <p className="tool-summary">{tool.summary}</p>
        <ul className="tool-features">
          {tool.keyFeatures.slice(0, 3).map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
        <div className="tool-links">
          <a className="text-link" href={`/tools/${tool.id}`}>
            Read Specification &amp; Docs <IconArrowRight size={16} aria-hidden="true" />
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
      <div className="tool-install">
        <p className="tool-status">
          {tool.status === 'released' ? `${tool.version ?? ''} Released` : 'In Development'}
        </p>
        {tool.brewCommand && (
          <CopyCommand command={tool.brewCommand} label={`Copy install command for ${tool.name}`} />
        )}
      </div>
    </article>
  );
}
