import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';

export async function getToolBanner(source: ImageMetadata, sizes: string) {
  const image = await getImage({
    src: source,
    width: 1280,
    widths: [320, 640, 960, 1280, 1600, 2048],
    format: 'webp',
    quality: 85,
  });

  return {
    src: image.src,
    srcSet: image.srcSet.attribute,
    sizes,
    width: source.width,
    height: source.height,
  };
}

export type ToolBanner = Awaited<ReturnType<typeof getToolBanner>>;
