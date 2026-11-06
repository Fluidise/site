import { IconArrowRight } from '@tabler/icons-react';
import type { ToolBanner } from '../lib/tool-banner';
import { ToolPreview } from './ToolPreview';

export interface ToolData {
  id: string;
  name: string;
  taskTitle: string;
  banner: ToolBanner;
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
    <article className="task-entry" aria-labelledby={`tool-${tool.id}`}>
      <div className="tool-feature">
        <div className="tool-presentation">
          <h3 id={`tool-${tool.id}`}>{tool.taskTitle}</h3>
          <div className="tool-identity">
            <span>{tool.name}</span>
            <span className="tool-status">
              {tool.status === 'released' ? `${tool.version ?? ''} Released` : 'In Development'}
            </span>
          </div>
          <p className="tool-tagline">{tool.tagline}</p>
          <div className="tool-links">
            <a
              className="primary-link"
              href={`/tools/${tool.id}/`}
              aria-label={`Get started with ${tool.name}`}
            >
              Get started <IconArrowRight size={18} aria-hidden="true" />
            </a>
            <a className="text-link" href={`/#install-${tool.id}`}>
              Install command
            </a>
          </div>
        </div>
        <ToolPreview toolId={tool.id} banner={tool.banner} />
      </div>
    </article>
  );
}
