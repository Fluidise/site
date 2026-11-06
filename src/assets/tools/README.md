# Tool banner provenance

These repository-local originals are unmodified copies of the supplied text-free Fluidise v2 artwork. Both are 2048 × 768 PNGs. Names, headings and actions are live HTML above the paintings, never baked into these images. Responsive cover crops are presentation-only; source bytes are unchanged.

- `clint-banner.png`: copied from `/Users/acrazie/.codex/worktrees/214f/lint/docs/assets/banner-v2-background.png`; SHA-256 `833dc0e65776ab12a6df6548276f5c0e9f261d29312eecc50717e6b8205d446f`.
- `relay-banner.png`: copied from `/Users/acrazie/Fluidise/relay/docs/assets/banner-v2-background.png`; SHA-256 `a35378dcd05159f5139f859db321241df900d812c32a9a9f768458f910556b1b`.

The user supplied these backgrounds and authorized their local integration in a separate worktree after PR #23 merged on 2026-11-05. The preceding branded originals remain in Git history. The source repositories are not build dependencies. Astro generates local responsive WebP variants at build time; the original PNGs are not served to visitors. No new image generation, retouching or third-party media service is involved. Source-generation details remain in each owning tool's adjacent `banner-v2.json`; those documents are provenance, not permission to modify another repository.

The cover presentation selects the full 2048 × 768 optimized variant, including on narrow screens: an 8:3 image filling a tall text-backed opening needs its height, not merely the narrow element width. Encoded WebP payloads are 76,108 bytes for Clint and 57,736 bytes for Relay. This bounded choice preserves the supplied detail without runtime measurements; enlargement remains limited by the original resolution.
