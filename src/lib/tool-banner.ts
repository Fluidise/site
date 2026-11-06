import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';

export async function getToolBanner(source: ImageMetadata) {
  const image = await getImage({
    src: source,
    width: source.width,
    widths: [320, 640, 960, 1280, 1600, 2048],
    format: 'webp',
    quality: 85,
  });

  return {
    src: image.src,
    srcSet: image.srcSet.attribute,
    // Tall cover crops need the source's height, not just the narrow element width.
    sizes: `${source.width}px`,
    width: source.width,
    height: source.height,
  };
}

export type ToolBanner = Awaited<ReturnType<typeof getToolBanner>>;
