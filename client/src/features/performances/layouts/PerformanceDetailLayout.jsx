import PerformanceVideoSection from "../components/PerformanceVideoSection";
import PerformanceAboutSection from "../components/PerformanceAboutSection";
import PerformanceArchiveSection from "../components/PerformanceArchiveSection";

export default function PerformanceDetailLayout({
  performance,
  relatedVideos,
}) {
  return (
    <main className="pd-page">
      <div className="pd-page-inner">
        <div
          className="
        relative z-10 mx-auto
        my-[clamp(4.5rem,7.5vw,15rem)]
        w-full max-w-500
        px-5 sm:px-8
      "
        >
          <PerformanceVideoSection performance={performance} />
          <PerformanceAboutSection
            performance={performance}
            relatedVideos={relatedVideos}
          />
          <PerformanceArchiveSection performance={performance} />
        </div>
      </div>
    </main>
  );
}
