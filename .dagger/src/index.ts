import { dag, Container, Directory, object, func, argument } from '@dagger.io/dagger';

@object()
export class FluidiseSite {
  source: Directory;

  constructor(
    @argument({
      defaultPath: '/',
      ignore: [
        'node_modules',
        '.git',
        'dist',
        'coverage',
        '.astro',
        '.dagger',
        '.worktrees',
        '.agents',
        '.gemini',
      ],
    })
    source: Directory,
  ) {
    this.source = source;
  }

  /**
   * Prepares the base container with Bun 1.4.4 and project dependencies installed.
   */
  @func()
  buildEnv(): Container {
    return dag
      .container()
      .from('oven/bun:1.4.4')
      .withMountedCache('/root/.bun/install/cache', dag.cacheVolume('bun-cache'))
      .withDirectory('/app', this.source)
      .withWorkdir('/app')
      .withEnvVariable('ASTRO_TELEMETRY_DISABLED', '1')
      .withExec(['bun', 'install', '--frozen-lockfile']);
  }

  /**
   * Checks code formatting with Oxfmt.
   */
  @func()
  async format(): Promise<string> {
    await this.buildEnv().withExec(['bun', 'run', 'format:check']).sync();
    return '✅ Code formatting is clean';
  }

  /**
   * Lints codebase with Oxlint.
   */
  @func()
  async lint(): Promise<string> {
    await this.buildEnv().withExec(['bun', 'run', 'lint']).sync();
    return '✅ Oxlint passed without errors';
  }

  /**
   * Audits dependencies for known security vulnerabilities.
   */
  @func()
  async audit(): Promise<string> {
    await this.buildEnv().withExec(['bun', 'audit']).sync();
    return '✅ Dependencies audited with zero vulnerabilities';
  }

  /**
   * Checks for typos across codebase with official typos CLI.
   */
  @func()
  async typos(): Promise<string> {
    await dag
      .container()
      .from('alpine:latest')
      .withExec(['apk', 'add', '--no-cache', 'typos'])
      .withDirectory('/work', this.source)
      .withWorkdir('/work')
      .withExec(['typos'])
      .sync();
    return '✅ Spelling check passed';
  }

  /**
   * Runs unit tests and collects code coverage with Vitest v8.
   */
  @func()
  async test(): Promise<string> {
    await this.buildEnv().withExec(['bun', 'run', 'test:coverage']).sync();
    return '✅ Unit tests and coverage completed';
  }

  /**
   * Runs type checking with Astro sync and tsc.
   */
  @func()
  async typecheck(): Promise<string> {
    await this.buildEnv().withExec(['bun', 'run', 'check']).sync();
    return '✅ Type check passed';
  }

  /**
   * Builds the static site and returns the output directory.
   */
  @func()
  build(): Directory {
    return this.buildEnv().withExec(['bun', 'run', 'build']).directory('/app/dist');
  }

  /**
   * Verifies generated static machine endpoints against schema contracts.
   */
  @func()
  async checkEndpoints(): Promise<string> {
    await this.buildEnv()
      .withExec(['bun', 'run', 'build'])
      .withExec(['bun', 'run', 'check:endpoints'])
      .sync();
    return '✅ Machine endpoints verified against schemas';
  }

  /**
   * Verifies internal link integrity offline with Lychee OCI image.
   */
  @func()
  async links(): Promise<string> {
    const dist = this.build();
    await dag
      .container()
      .from('lycheeverse/lychee:latest')
      .withEntrypoint([])
      .withDirectory('/work', this.source)
      .withDirectory('/work/dist', dist)
      .withWorkdir('/work')
      .withExec(['lychee', '--offline', '--config', 'lychee.toml', 'dist/'])
      .sync();
    return '✅ Link integrity verified with Lychee';
  }

  /**
   * Builds and validates the production Docker image.
   */
  @func()
  async buildDocker(): Promise<string> {
    await this.source.dockerBuild().sync();
    return '✅ Production Docker image built successfully';
  }

  /**
   * Complete CI suite: concurrent format, lint, audit, test:coverage, typecheck, typos;
   * then static build, machine endpoints check, link check, and Docker container verification.
   * Exports coverage/ and dist/ to host when exportArtifacts is true.
   */
  @func()
  async check(exportArtifacts = true): Promise<string> {
    const env = this.buildEnv();

    // 1. Parallel static and unit checks
    const [testCtr] = await Promise.all([
      env.withExec(['bun', 'run', 'test:coverage']).sync(),
      env.withExec(['bun', 'run', 'format:check']).sync(),
      env.withExec(['bun', 'run', 'lint']).sync(),
      env.withExec(['bun', 'audit']).sync(),
      env.withExec(['bun', 'run', 'check']).sync(),
      dag
        .container()
        .from('alpine:latest')
        .withExec(['apk', 'add', '--no-cache', 'typos'])
        .withDirectory('/work', this.source)
        .withWorkdir('/work')
        .withExec(['typos'])
        .sync(),
    ]);

    // 2. Sequential build and dependent endpoint verification
    const builtEnv = await env.withExec(['bun', 'run', 'build']).sync();
    await builtEnv.withExec(['bun', 'run', 'check:endpoints']).sync();

    // 3. Link check on generated dist
    const distDir = builtEnv.directory('/app/dist');
    await dag
      .container()
      .from('lycheeverse/lychee:latest')
      .withEntrypoint([])
      .withDirectory('/work', this.source)
      .withDirectory('/work/dist', distDir)
      .withWorkdir('/work')
      .withExec(['lychee', '--offline', '--config', 'lychee.toml', 'dist/'])
      .sync();

    // 4. Export artifacts to host for Codecov and external inspection
    if (exportArtifacts) {
      await testCtr.directory('/app/coverage').export('coverage');
      await distDir.export('dist');
    }

    // 5. Docker container verification
    await this.source.dockerBuild().sync();

    return '🎉 All checks, tests, coverage, links, and Docker builds passed successfully!';
  }
}
