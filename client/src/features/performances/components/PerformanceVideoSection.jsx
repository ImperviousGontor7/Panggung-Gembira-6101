import PerformanceIcon from "./PerformanceIcon";

export default function PerformanceVideoSection({ performance }) {
  const videoSrc = performance.video?.src;
  const poster = performance.video?.poster || performance.image;

  return (
    <section className="pd-video-section" aria-labelledby="pd-video-heading">
      <div className="pd-video-heading-row">
        <div>
          <span className="pd-eyebrow">IMPERVIOUS GENERATION · PG 6101</span>
          <h1 id="pd-video-heading" className="pd-video-heading">Video Documentation</h1>
        </div>
        <span className="pd-section-index">01 / DOCUMENTATION</span>
      </div>

      <div className="pd-video-frame">
        {videoSrc ? (
          <video
            className="pd-video-element"
            controls
            playsInline
            preload="metadata"
            poster={poster || undefined}
          >
            <source src={videoSrc} />
            Browser kamu tidak mendukung pemutaran video.
          </video>
        ) : (
          <div
            className="pd-video-placeholder"
            style={poster ? { backgroundImage: `linear-gradient(90deg, rgba(8,7,4,.94), rgba(8,7,4,.42)), url("${poster}")` } : undefined}
          >
            <div className="pd-video-placeholder-content">
              <span className="pd-play-mark"><PerformanceIcon name="play" size={27} /></span>
              <span className="pd-video-placeholder-label">VIDEO DOCUMENTATION</span>
              <strong>{performance.displayTitle}</strong>
              <small>Video belum ditambahkan pada data penampilan ini.</small>
            </div>
            <span className="pd-video-placeholder-meta">PG 6101 · IMPERVIOUS GENERATION</span>
          </div>
        )}
      </div>
    </section>
  );
}
