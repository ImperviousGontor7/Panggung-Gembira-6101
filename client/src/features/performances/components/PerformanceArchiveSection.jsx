import PhotoDocumentationSlider from "./PhotoDocumentationSlider";

export default function PerformanceArchiveSection({ performance }) {
  return (
    <section className="pd-archive-section" aria-labelledby="pd-archive-heading">
      <div className="pd-archive-heading-row">
        <div>
          <span className="pd-eyebrow">03 / PRESERVED MOMENTS</span>
          <h2 id="pd-archive-heading">Performance Archive</h2>
        </div>
        <span className="pd-archive-collection">{performance.collectionName}</span>
      </div>

      <div className="pd-behind-heading">
        <span>BEHIND THE PERFORMANCE</span>
        <span className="pd-behind-line" />
      </div>

      <PhotoDocumentationSlider
        photos={performance.documentationPhotos || []}
        performanceTitle={performance.title}
      />
    </section>
  );
}
