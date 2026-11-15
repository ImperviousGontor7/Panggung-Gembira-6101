function Header({ sortBy, onSortChange, viewMode, onViewModeChange }) {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
      <div>
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Our Memories
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
          Every moment, a story. Every story, a memory.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="h-12 rounded-2xl border border-white/10 bg-white/3 px-4 pr-10 text-sm text-white outline-none transition focus:border-indigo-400/40"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="most-liked">Most Liked</option>
            <option value="least-liked">Least Liked</option>
          </select>
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/60">
            ▾
          </span>
        </div>

        <div className="flex rounded-2xl border border-white/10 bg-white/3 p-1">
          <button
            type="button"
            onClick={() => onViewModeChange("grid")}
            className={[
              "flex h-11 w-11 items-center justify-center rounded-xl text-sm transition",
              viewMode === "grid"
                ? "bg-indigo-400 text-white shadow-[0_8px_22px_rgba(99,102,241,.35)]"
                : "text-white/60 hover:bg-white/5 hover:text-white",
            ].join(" ")}
            aria-pressed={viewMode === "grid"}
          >
            ▦
          </button>

          <button
            type="button"
            onClick={() => onViewModeChange("list")}
            className={[
              "flex h-11 w-11 items-center justify-center rounded-xl text-sm transition",
              viewMode === "list"
                ? "bg-indigo-400 text-white shadow-[0_8px_22px_rgba(99,102,241,.35)]"
                : "text-white/60 hover:bg-white/5 hover:text-white",
            ].join(" ")}
            aria-pressed={viewMode === "list"}
          >
            ☰
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;