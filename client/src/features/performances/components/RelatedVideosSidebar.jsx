import { Link } from "react-router-dom";

export default function RelatedVideosSidebar({ videos = [] }) {
  return (
    <aside className="pd-related" aria-labelledby="pd-related-heading">
      <div className="pd-related-heading-row">
        <h3 id="pd-related-heading">Rekomendasi Terkait</h3>
        <span>{String(videos.length).padStart(2, "0")}</span>
      </div>

      {videos.length ? (
        <div className="pd-related-list">
          {videos.map((video, index) => (
            <Link className="pd-related-item" to={`/performances/${video.slug}`} key={video.id}>
              <div className="pd-related-poster">
                {video.poster ? <img src={video.poster} alt="" loading="lazy" /> : <span>PG</span>}
                <span className="pd-related-number">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="pd-related-copy">
                <span>{video.category || video.collectionName || "PERFORMANCE"}</span>
                <strong>{video.title}</strong>
                <small>{video.collectionName}</small>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="pd-related-empty">Belum ada rekomendasi untuk penampilan ini.</p>
      )}
    </aside>
  );
}
