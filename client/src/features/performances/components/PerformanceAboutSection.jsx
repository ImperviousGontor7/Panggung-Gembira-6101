import { useState } from "react";
import { Link } from "react-router-dom";
import PerformanceIcon from "./PerformanceIcon";
import RelatedVideosSidebar from "./RelatedVideosSidebar";
import ResponsiblePeople from "./ResponsiblePeople";

export default function PerformanceAboutSection({ performance, relatedVideos = [] }) {
  const [reaction, setReaction] = useState(null);

  function toggleReaction(nextReaction) {
    setReaction((current) => current === nextReaction ? null : nextReaction);
  }

  const paragraphs = performance.aboutParagraphs?.length
    ? performance.aboutParagraphs
    : [performance.shortDescription];

  return (
    <section className="pd-about-section" aria-labelledby="pd-about-heading">
      <div className="pd-about-main">
        <div className="pd-about-title-row">
          <div>
            <span className="pd-eyebrow">02 / ABOUT THE PERFORMANCE</span>
            <h2 id="pd-about-heading" className="pd-about-title">{performance.displayTitle}</h2>
          </div>
        </div>

        <div className="pd-meta-row">
          {performance.category ? <span className="pd-category-pill">{performance.category}</span> : null}
          {(performance.time || performance.video?.duration) ? <span className="pd-time">{performance.time || performance.video.duration}</span> : null}
          <span className="pd-meta-divider">•</span>
          <span className="pd-collection-label">{performance.collectionName}</span>
        </div>

        <div className="pd-actions-row">
          <Link
            className="pd-license-button"
            to="/login"
            state={{ from: `/performances/${performance.slug}`, intent: "license-activation" }}
          >
            <PerformanceIcon name="lock" size={16} />
            <span>Masukkan Kode Lisensi</span>
          </Link>

          <div className="pd-reaction-group" aria-label="Penilaian penampilan">
            <button
              type="button"
              className={reaction === "like" ? "is-selected" : ""}
              onClick={() => toggleReaction("like")}
              aria-pressed={reaction === "like"}
              aria-label="Suka"
            >
              <PerformanceIcon name="thumbUp" size={15} />
              <span>{(performance.likes || 0) + (reaction === "like" ? 1 : 0)}</span>
            </button>
            <span className="pd-reaction-separator" />
            <button
              type="button"
              className={reaction === "dislike" ? "is-selected" : ""}
              onClick={() => toggleReaction("dislike")}
              aria-pressed={reaction === "dislike"}
              aria-label="Tidak suka"
            >
              <PerformanceIcon name="thumbDown" size={15} />
              <span>{(performance.dislikes || 0) + (reaction === "dislike" ? 1 : 0)}</span>
            </button>
          </div>
        </div>

        <div className="pd-about-copy">
          {paragraphs.map((paragraph, index) => (
            <p key={`${performance.id}-paragraph-${index}`}>{paragraph}</p>
          ))}
        </div>

        <ResponsiblePeople people={performance.responsiblePeople} />
      </div>

      <RelatedVideosSidebar videos={relatedVideos} />
    </section>
  );
}
