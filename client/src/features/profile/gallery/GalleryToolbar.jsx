import { sortOptions } from "./memories_data";

function GalleryToolbar({ sortBy, onSortChange, viewMode, onViewModeChange }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <label className="relative inline-flex h-11 min-w-62 items-center">
        <span className="sr-only">Sort memories</span>
        <select
          value={sortBy}
          onChange={(event) => onSortChange(event.target.value)}
          className="h-full w-full appearance-none rounded-full border border-white/10 bg-white/[0.035] pl-4 pr-11 text-[1.25rem] font-medium text-antiquewhite outline-none transition hover:border-marigold/35 focus:border-marigold/60"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value} className="bg-[#170e07] text-white">
              {option.label}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-4 text-[1.2rem] text-antiquewhite/55">
          ▾
        </span>
      </label>

      <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/2.5 p-1">
        <button
          type="button"
          onClick={() => onViewModeChange("grid")}
          aria-label="Grid view"
          aria-pressed={viewMode === "grid"}
          className={`flex h-9 w-10 items-center justify-center rounded-full text-[1.65rem] transition ${
            viewMode === "grid"
              ? "bg-marigold text-[#241306]"
              : "text-antiquewhite/55 hover:bg-white/10 hover:text-white"
          }`}
        >
          ▦
        </button>
        <button
          type="button"
          onClick={() => onViewModeChange("list")}
          aria-label="List view"
          aria-pressed={viewMode === "list"}
          className={`flex h-9 w-10 items-center justify-center rounded-full text-[1.55rem] transition ${
            viewMode === "list"
              ? "bg-marigold text-[#241306]"
              : "text-antiquewhite/55 hover:bg-white/10 hover:text-white"
          }`}
        >
          ☰
        </button>
      </div>
    </div>
  );
}

export default GalleryToolbar;
