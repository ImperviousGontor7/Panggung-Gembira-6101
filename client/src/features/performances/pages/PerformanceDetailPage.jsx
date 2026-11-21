import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import PerformanceDetailLayout from "../layouts/PerformanceDetailLayout";
import { getPerformanceBySlug } from "../data/performances";
import { VIDEO_CATALOG } from "../data/videos";
import { recommendRelatedVideos } from "../services/videoRecommendation";

export default function PerformanceDetailPage() {
  const { slug } = useParams();
  const performance = getPerformanceBySlug(slug);

  const relatedVideos = useMemo(() => {
    if (!performance) return [];
    const currentVideo = VIDEO_CATALOG.find(
      (video) => video.performanceId === performance.id,
    );
    return recommendRelatedVideos(currentVideo, VIDEO_CATALOG, 4);
  }, [performance]);

  if (!performance) {
    return (
      <main className="pd-not-found">
        <span className="pd-eyebrow">PERFORMANCE ARCHIVE · PG 6101</span>
        <h1>Penampilan tidak ditemukan</h1>
        <p>
          Slug yang kamu buka tidak cocok dengan data penampilan yang tersedia.
        </p>
        <Link to="/">Kembali ke homepage</Link>
      </main>
    );
  }

  return (
    <PerformanceDetailLayout
      performance={performance}
      relatedVideos={relatedVideos}
    />
  );
}
