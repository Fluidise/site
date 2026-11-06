import { IconCircleCheck, IconFileText, IconGitBranch, IconLock } from '@tabler/icons-react';
import type { ToolBanner } from '../lib/tool-banner';

export function ToolPreview({ toolId, banner }: { toolId: string; banner: ToolBanner }) {
  const hasPreview = toolId === 'clint' || toolId === 'relay';

  return (
    <figure className="tool-scene">
      <img
        className="tool-banner"
        src={banner.src}
        srcSet={banner.srcSet}
        sizes={banner.sizes}
        width={banner.width}
        height={banner.height}
        alt=""
        loading="lazy"
        decoding="async"
      />
      {hasPreview && (
        <>
          <div className="preview-panels">
            {toolId === 'clint' ? (
              <>
                <div className="preview-panel preview-input">
                  <div className="preview-panel-heading">
                    <IconFileText size={18} aria-hidden="true" />
                    <strong>Commit message</strong>
                  </div>
                  <p className="preview-detail">COMMIT_EDITMSG</p>
                  <code className="preview-message">feat(core): add search</code>
                </div>
                <div className="preview-panel preview-result">
                  <div className="preview-panel-heading">
                    <IconCircleCheck size={18} className="preview-positive" aria-hidden="true" />
                    <strong>Valid commit</strong>
                    <span className="preview-exit">Exit 0</span>
                  </div>
                  <pre>
                    <code>{`{\n  "schema_version": 1,\n  "status": "valid",\n  "diagnostics": []\n}`}</code>
                  </pre>
                </div>
              </>
            ) : (
              <>
                <div className="preview-panel preview-input">
                  <div className="preview-panel-heading">
                    <IconGitBranch size={18} aria-hidden="true" />
                    <strong>commit-msg</strong>
                  </div>
                  <p className="preview-detail">Configured command</p>
                  <code className="preview-message">{'fluidise-clint --file {message-file}'}</code>
                </div>
                <div className="preview-panel preview-result">
                  <div className="preview-panel-heading">
                    <IconLock size={18} aria-hidden="true" />
                    <strong>Inspect before applying</strong>
                  </div>
                  <dl className="preview-plan">
                    <div>
                      <dt>Inspection</dt>
                      <dd>Read-only</dd>
                    </div>
                    <div>
                      <dt>Operation</dt>
                      <dd>
                        <code>install</code>
                      </dd>
                    </div>
                  </dl>
                  <p className="preview-approval">
                    Apply only with a matching <code>{'--plan <id>'}</code>.
                  </p>
                </div>
              </>
            )}
          </div>
          <figcaption>
            Illustrative example · {toolId === 'clint' ? 'JSON excerpt' : 'Plan summary'}
          </figcaption>
        </>
      )}
    </figure>
  );
}
