import { Link } from "react-router-dom";

function FilterBar({ filters, activeFilter, counts }) {
  return (
    <nav aria-label="Filter memories" className="-mx-1 overflow-x-auto px-1 pb-2 scrollbar-none [&::-webkit-scrollbar]:hidden">
      <div className="flex min-w-max items-center gap-2">
        {filters.map((filter) => {
          const active = activeFilter === filter.value;
          const count = counts[filter.value] ?? 0;

          return (
            <Link
              key={filter.value}
              to={`/memories/${filter.value}`}
              aria-current={active ? "page" : undefined}
              className={`inline-flex min-h-10 items-center gap-2 rounded-full border px-4 text-[1.15rem] font-medium transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marigold/70 ${
                active
                  ? "border-marigold/55 bg-marigold/15 text-marigold"
                  : "border-white/10 bg-white/2.5 text-antiquewhite/65 hover:border-white/25 hover:bg-white/6 hover:text-antiquewhite"
              }`}
            >
              <span>{filter.label}</span>
              <span className={`text-[1rem] tabular-nums ${active ? "text-marigold/75" : "text-antiquewhite/35"}`}>
                {count}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export default FilterBar;
