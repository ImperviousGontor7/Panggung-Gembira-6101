function formatMemoryDate(dateString) {
  const date = new Date(`${dateString}T00:00:00`);

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function MemoriesCard({ item, viewMode }) {
  const isList = viewMode === "list";
  const mediaClass = isList
    ? "aspect-[16/10] w-full sm:w-64 sm:shrink-0"
    : "aspect-[4/3] w-full";

  return (
    <article
      className={`group relative min-w-0 overflow-hidden border border-white/10 bg-[#211307] transition duration-300 hover:border-marigold/30 ${
        isList
          ? "flex flex-col rounded-2xl sm:flex-row sm:items-stretch"
          : "rounded-xl sm:rounded-2xl"
      }`}
    >
      <div className={`relative min-w-0 overflow-hidden ${mediaClass}`}>
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
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        )}

        {item.video && !isList && (
          <span className="pointer-events-none absolute right-2 top-2 rounded-full border border-white/15 bg-black/65 px-2 py-1 font-root text-[9px] font-bold tracking-wider text-white">
            VIDEO
          </span>
        )}

        {!isList && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-black/90 via-black/35 to-transparent p-3 opacity-100 transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
            <h2 className="line-clamp-1 font-root text-xs font-bold text-white sm:text-sm">
              {item.title}
            </h2>
            <p className="mt-1 font-root text-[10px] text-white/65 sm:text-xs">
              {item.categoryLabel} <span className="px-1 text-marigold/70">·</span>{" "}
              {formatMemoryDate(item.date)}
            </p>
          </div>
        )}
      </div>

      {isList && (
        <div className="flex min-w-0 flex-1 flex-col justify-center p-4 sm:p-5">
          <p className="font-root text-[10px] font-semibold uppercase tracking-[0.18em] text-marigold/75">
            {item.categoryLabel}
          </p>
          <h2 className="mt-1 font-root text-base font-bold text-antiquewhite sm:text-lg">
            {item.title}
          </h2>
          <time
            dateTime={item.date}
            className="mt-2 font-root text-xs text-white/45"
          >
            {formatMemoryDate(item.date)}
          </time>
        </div>
      )}
    </article>
  );
}

export default MemoriesCard;
