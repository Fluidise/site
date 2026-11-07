import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const DIST_DIR = resolve(process.cwd(), 'dist');

interface DiagnosticError {
  file: string;
  message: string;
}

const errors: DiagnosticError[] = [];

function assert(condition: boolean, file: string, message: string): void {
  if (!condition) {
    errors.push({ file, message });
  }
}

function verifyToolsJson(): void {
  const filePath = resolve(DIST_DIR, 'tools.json');
  assert(existsSync(filePath), 'dist/tools.json', 'File does not exist in build output');
  if (!existsSync(filePath)) return;

  let data: any;
  try {
    data = JSON.parse(readFileSync(filePath, 'utf-8'));
  } catch (err) {
    assert(false, 'dist/tools.json', `Malformed JSON: ${(err as Error).message}`);
    return;
  }

  assert(
    data.$schema === 'https://fluidise.dev/schemas/tools.schema.json',
    'dist/tools.json',
    'Invalid $schema URL',
  );
  assert(data.version === '1.0.0', 'dist/tools.json', 'Invalid catalog version (expected 1.0.0)');
  assert(
    data.name === 'Fluidise Developer Experience Suite',
    'dist/tools.json',
    'Invalid suite name',
  );
  assert(
    typeof data.updatedAt === 'string' &&
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(data.updatedAt),
    'dist/tools.json',
    'updatedAt must be a valid ISO 8601 string',
  );
  assert(
    Array.isArray(data.tools) && data.tools.length >= 2,
    'dist/tools.json',
    'tools must be an array with at least 2 entries',
  );

  if (Array.isArray(data.tools)) {
    for (const tool of data.tools) {
      const toolId = tool.id ?? 'unknown';
      assert(
        typeof tool.id === 'string' && tool.id.length > 0,
        'dist/tools.json',
        `Tool missing valid id: ${toolId}`,
      );
      assert(
        typeof tool.name === 'string' && tool.name.length > 0,
        'dist/tools.json',
        `Tool ${toolId} missing name`,
      );
      assert(typeof tool.tagline === 'string', 'dist/tools.json', `Tool ${toolId} missing tagline`);
      assert(typeof tool.summary === 'string', 'dist/tools.json', `Tool ${toolId} missing summary`);
      assert(
        ['released', 'beta', 'planned'].includes(tool.status),
        'dist/tools.json',
        `Tool ${toolId} has invalid status: ${tool.status}`,
      );
      assert(
        tool.endpoints?.html === `https://fluidise.dev/tools/${tool.id}`,
        'dist/tools.json',
        `Tool ${toolId} invalid HTML endpoint`,
      );
      assert(
        tool.endpoints?.markdown === `https://fluidise.dev/tools/${tool.id}.md`,
        'dist/tools.json',
        `Tool ${toolId} invalid Markdown endpoint`,
      );
      assert(
        Array.isArray(tool.keyFeatures) && tool.keyFeatures.length > 0,
        'dist/tools.json',
        `Tool ${toolId} missing keyFeatures`,
      );
      assert(
        typeof tool.cli?.binary === 'string',
        'dist/tools.json',
        `Tool ${toolId} missing cli.binary`,
      );
      assert(Array.isArray(tool.cli?.args), 'dist/tools.json', `Tool ${toolId} missing cli.args`);
      assert(Array.isArray(tool.cli?.flags), 'dist/tools.json', `Tool ${toolId} missing cli.flags`);
      assert(
        typeof tool.cli?.exitCodes === 'object' && tool.cli.exitCodes !== null,
        'dist/tools.json',
        `Tool ${toolId} missing cli.exitCodes`,
      );
      assert(
        tool.cli?.exitCodes?.['0'] !== undefined,
        'dist/tools.json',
        `Tool ${toolId} missing exit code 0 definition`,
      );
    }
  }
}

function verifyLlmsTxt(): void {
  const filePath = resolve(DIST_DIR, 'llms.txt');
  assert(existsSync(filePath), 'dist/llms.txt', 'File does not exist in build output');
  if (!existsSync(filePath)) return;

  const content = readFileSync(filePath, 'utf-8');
  assert(
    content.startsWith('# Fluidise\n'),
    'dist/llms.txt',
    'Must begin with "# Fluidise" H1 title',
  );
  assert(
    content.includes('## Core Documentation & Specifications'),
    'dist/llms.txt',
    'Missing "Core Documentation & Specifications" section',
  );
  assert(
    content.includes('## Standalone Tools Catalog'),
    'dist/llms.txt',
    'Missing "Standalone Tools Catalog" section',
  );
  assert(
    content.includes('## Key Agent Invariants'),
    'dist/llms.txt',
    'Missing "Key Agent Invariants" section',
  );
  assert(
    content.includes('https://fluidise.dev/manifesto.md'),
    'dist/llms.txt',
    'Must link to architectural manifesto',
  );
  assert(
    content.includes('https://fluidise.dev/tools.json'),
    'dist/llms.txt',
    'Must link to machine catalog tools.json',
  );
  assert(
    content.includes('https://fluidise.dev/tools/clint.md'),
    'dist/llms.txt',
    'Must link to clint markdown endpoint',
  );
  assert(
    content.includes('https://fluidise.dev/tools/relay.md'),
    'dist/llms.txt',
    'Must link to relay markdown endpoint',
  );
}

function verifyLlmsFullTxt(): void {
  const filePath = resolve(DIST_DIR, 'llms-full.txt');
  assert(existsSync(filePath), 'dist/llms-full.txt', 'File does not exist in build output');
  if (!existsSync(filePath)) return;

  const content = readFileSync(filePath, 'utf-8');
  assert(
    content.includes('# Fluidise — Comprehensive Documentation & Agent Context Corpus'),
    'dist/llms-full.txt',
    'Missing top-level header',
  );
  assert(
    /> Generated: \d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(content),
    'dist/llms-full.txt',
    'Missing or malformed generation timestamp',
  );
  assert(
    content.includes('# The Fluidise Architectural Manifesto'),
    'dist/llms-full.txt',
    'Must embed the architectural manifesto',
  );
  assert(
    content.includes('# Tool Specification: fluidise-clint'),
    'dist/llms-full.txt',
    'Must embed fluidise-clint specification',
  );
  assert(
    content.includes('# Tool Specification: fluidise-relay'),
    'dist/llms-full.txt',
    'Must embed fluidise-relay specification',
  );
}

function verifyManifestoMd(): void {
  const filePath = resolve(DIST_DIR, 'manifesto.md');
  assert(existsSync(filePath), 'dist/manifesto.md', 'File does not exist in build output');
  if (!existsSync(filePath)) return;

  const content = readFileSync(filePath, 'utf-8');
  assert(
    content.includes('# The Fluidise Architectural Manifesto'),
    'dist/manifesto.md',
    'Missing manifesto title',
  );
  assert(
    content.includes('Principle 01: Agent-First Invariant'),
    'dist/manifesto.md',
    'Missing Principle 01',
  );
  assert(
    content.includes('Principle 02: Strict Unix Philosophy'),
    'dist/manifesto.md',
    'Missing Principle 02',
  );
  assert(
    content.includes('Principle 03: Zero Unannounced Mutation'),
    'dist/manifesto.md',
    'Missing Principle 03',
  );
}

function verifyToolMarkdownEndpoints(): void {
  for (const toolId of ['clint', 'relay']) {
    const filePath = resolve(DIST_DIR, `tools/${toolId}.md`);
    assert(existsSync(filePath), `dist/tools/${toolId}.md`, `Endpoint file does not exist`);
    if (existsSync(filePath)) {
      const content = readFileSync(filePath, 'utf-8');
      assert(
        content.includes(`# fluidise-${toolId}`),
        `dist/tools/${toolId}.md`,
        `Missing tool title header`,
      );
      assert(
        content.includes('## Operational Guarantees'),
        `dist/tools/${toolId}.md`,
        `Missing Operational Guarantees section`,
      );
      assert(
        content.includes('## Installation'),
        `dist/tools/${toolId}.md`,
        `Missing Installation section`,
      );
    }
  }
}

export function runVerification(): boolean {
  console.log('🔍 Validating static machine endpoints in dist/...');
  verifyToolsJson();
  verifyLlmsTxt();
  verifyLlmsFullTxt();
  verifyManifestoMd();
  verifyToolMarkdownEndpoints();

  if (errors.length > 0) {
    console.error(`\n❌ Endpoint verification failed with ${errors.length} error(s):`);
    for (const err of errors) {
      console.error(`  - [${err.file}]: ${err.message}`);
    }
    return false;
  }

  console.log(
    '✅ All static machine endpoints conform to schema contracts and architectural invariants.',
  );
  return true;
}

if (import.meta.main || process.argv[1] === import.meta.filename) {
  const success = runVerification();
  if (!success) {
    process.exit(1);
  }
}
