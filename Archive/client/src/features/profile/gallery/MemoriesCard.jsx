function formatDate(dateString) {
  const date = new Date(`${dateString}T00:00:00`);
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

function MemoriesCard({ item, viewMode }) {
  const isList = viewMode === "list";

  return (
    <article
      className={`group min-w-0 overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-white/[0.025] transition duration-300 hover:border-marigold/25 hover:bg-white/[0.04] ${
        isList ? "flex flex-col sm:flex-row" : "flex flex-col"
      }`}
    >
      <div className={`relative shrink-0 overflow-hidden bg-[#24170e] ${isList ? "aspect-[16/10] sm:aspect-auto sm:h-44 sm:w-64" : "aspect-[4/3] w-full"}`}>
        {item.video ? (
          <video
            src={item.video}
            poster={item.image}
            controls={isList}
            muted
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
          />
        ) : (
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
          />
        )}
        <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-black/35 px-3 py-1.5 text-[1rem] font-medium text-white/90 backdrop-blur-md">
          {formatDate(item.date)}
        </span>
        {item.video && (
          <span className="absolute right-3 top-3 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-[0.9rem] font-semibold tracking-[0.12em] text-white/90 backdrop-blur-md">
            VIDEO
          </span>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-between gap-4 p-4 sm:p-5">
        <div>
          <h2 className="line-clamp-2 text-[1.55rem] font-semibold leading-snug tracking-[-0.015em] text-antiquewhite">
            {item.title}
          </h2>
          <p className="mt-2 text-[1.15rem] text-antiquewhite/45">
            {item.categoryLabel}
          </p>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="text-[1rem] font-medium tracking-[0.1em] text-marigold/75">
            IMPERVIOUS ARCHIVE
          </span>
          <span aria-hidden="true" className="text-[1.6rem] text-antiquewhite/35 transition group-hover:translate-x-1 group-hover:text-marigold">
            ↗
          </span>
        </div>
      </div>
    </article>
  );
}

export default MemoriesCard;
