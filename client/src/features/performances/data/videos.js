import { PERFORMANCES } from "./performances";

/**
 * Katalog video dibentuk dari seluruh 23 data penampilan.
 * Isi src dan poster per item ketika file video/poster resmi sudah tersedia.
 */
export const VIDEO_CATALOG = PERFORMANCES.map((performance) => ({
  id: `video-${performance.id}`,
  performanceId: performance.id,
  slug: performance.slug,
  title: performance.displayTitle,
  performanceName: performance.title,
  collectionId: performance.collectionId,
  collectionName: performance.collectionName,
  category: performance.category,
  description: performance.shortDescription,
  tags: performance.tags,
  poster: performance.video.poster || performance.image,
  src: performance.video.src,
  duration: performance.video.duration,
}));

export function getVideoBySlug(slug) {
  return VIDEO_CATALOG.find((video) => video.slug === slug) || null;
}
