const SORT_OPTIONS = [
  { label: "Newest First", value: "newest" },
  { label: "Oldest First", value: "oldest" },
  { label: "Most Liked", value: "most-liked" },
  { label: "Least Liked", value: "least-liked" },
];

function GalleryControls({
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
}) {
  return (
    <div className="flex w-full flex-wrap items-center justify-start gap-2.5 sm:gap-3">
      <div className="relative min-w-0">
        <label className="sr-only" htmlFor="memories-sort">
          Sort memories
        </label>

        <select
          id="memories-sort"
          value={sortBy}
          onChange={(event) => onSortChange(event.target.value)}
          className="h-11 min-w-40 appearance-none rounded-full border border-white/12 bg-[#241307] pl-4 pr-11 font-root text-xs font-semibold text-antiquewhite outline-none transition hover:border-marigold/40 focus:border-marigold/60 sm:h-12 sm:min-w-48 sm:text-sm"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-marigold"
        >
          ▾
        </span>
      </div>

      <div
        role="group"
        aria-label="Gallery display mode"
        className="flex items-center gap-1 rounded-full border border-white/10 bg-black/20 p-1"
      >
        <button
          type="button"
          onClick={() => onViewModeChange("grid")}
          aria-label="Grid view"
          aria-pressed={viewMode === "grid"}
          title="Grid view"
          className={`grid h-9 w-9 place-items-center rounded-full text-lg transition sm:h-10 sm:w-10 ${
            viewMode === "grid"
              ? "bg-marigold text-[#241307] shadow-[0_4px_16px_rgba(227,164,25,0.2)]"
              : "text-white/55 hover:bg-white/8 hover:text-antiquewhite"
          }`}
        >
          ▦
        </button>

        <button
          type="button"
          onClick={() => onViewModeChange("list")}
          aria-label="List view"
          aria-pressed={viewMode === "list"}
          title="List view"
          className={`grid h-9 w-9 place-items-center rounded-full text-base transition sm:h-10 sm:w-10 ${
            viewMode === "list"
              ? "bg-marigold text-[#241307] shadow-[0_4px_16px_rgba(227,164,25,0.2)]"
              : "text-white/55 hover:bg-white/8 hover:text-antiquewhite"
          }`}
        >
          ☰
        </button>
      </div>
    </div>
  );
}

export default GalleryControls;
