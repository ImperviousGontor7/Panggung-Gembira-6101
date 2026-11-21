import { useRef } from "react";
import PerformanceIcon from "./PerformanceIcon";

export default function PhotoDocumentationSlider({ photos = [], performanceTitle }) {
  const trackRef = useRef(null);
  const items = photos.length ? photos : [0, 1, 2, 3].map((index) => ({
    id: `photo-slot-${index + 1}`,
    src: null,
    caption: `Dokumentasi ${String(index + 1).padStart(2, "0")}`,
  }));

  function scroll(direction) {
    if (!trackRef.current) return;
    const distance = Math.max(trackRef.current.clientWidth * 0.72, 260);
    trackRef.current.scrollBy({ left: direction * distance, behavior: "smooth" });
  }

  return (
    <div className="pd-photo-slider-wrap">
      <div className="pd-photo-slider-toolbar">
        <div>
          <span className="pd-mini-label">PHOTO DOCUMENTATION</span>
          <p>{photos.length ? `${photos.length} foto dokumentasi · ${performanceTitle}` : "Area slider siap diisi foto dokumentasi resmi."}</p>
        </div>
        <div className="pd-slider-controls">
          <button type="button" onClick={() => scroll(-1)} aria-label="Geser foto ke kiri"><PerformanceIcon name="arrowLeft" /></button>
          <button type="button" onClick={() => scroll(1)} aria-label="Geser foto ke kanan"><PerformanceIcon name="arrowRight" /></button>
        </div>
      </div>

      <div className="pd-photo-track scrollbar-hidden" ref={trackRef}>
        {items.map((photo, index) => (
          <figure className={`pd-photo-slide ${photo.src ? "has-photo" : "is-placeholder"}`} key={photo.id || photo.src || index}>
            {photo.src ? (
              <img src={photo.src} alt={photo.alt || photo.caption || `Dokumentasi ${index + 1}`} loading="lazy" />
            ) : (
              <div className="pd-photo-placeholder">
                <PerformanceIcon name="camera" size={30} />
                <span>PHOTO {String(index + 1).padStart(2, "0")}</span>
                <small>Dokumentasi belum ditambahkan</small>
              </div>
            )}
            <figcaption>{photo.caption || `Moment ${String(index + 1).padStart(2, "0")}`}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
