function formatDate(dateString) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(dateString));
}

function MemoriesCard({ item, viewMode }) {
  const imageBlock = (
    <div className="relative overflow-hidden">
      <img
        src={item.image}
        alt={item.title}
        className={[
          "h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]",
          viewMode === "grid" ? "aspect-4/3" : "h-full min-h-52 w-full sm:w-56",
        ].join(" ")}
      />

      <div className="absolute left-3 top-3 rounded-2xl bg-black/35 px-3 py-1.5 text-[11px] font-medium text-white/90 backdrop-blur-md">
        {formatDate(item.date)}
      </div>

      <button
        type="button"
        className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-2xl bg-white/12 text-white/90 backdrop-blur-md transition hover:bg-white/20"
      >
        ▣
      </button>
    </div>
  );

  const contentBlock = (
    <div className="flex flex-1 flex-col justify-between p-4">
      <div>
        <h3 className="text-base font-semibold text-white">
          {item.title}
        </h3>
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <span className="rounded-xl border border-indigo-400/20 bg-indigo-400/15 px-3 py-1 text-xs font-medium text-indigo-200">
          {item.categoryLabel}
        </span>

        <span className="flex items-center gap-1.5 text-sm text-white/70">
          <span className="text-base leading-none">♡</span>
          <span>{item.likes}</span>
        </span>
      </div>
    </div>
  );

  return (
    <article
      className={[
        "group overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/[0.035] shadow-[0_16px_42px_rgba(0,0,0,.28)] transition duration-300 hover:-translate-y-1 hover:border-white/15 hover:bg-white/5",
        viewMode === "grid" ? "flex flex-col" : "flex flex-col sm:flex-row",
      ].join(" ")}
    >
      {imageBlock}
      {contentBlock}
    </article>
  );
}

export default MemoriesCard;