function Sidebar({ filters, activeFilter, onSelectFilter }) {
  return (
    <nav
      aria-label="Memory categories"
      className="sticky top-[clamp(9rem,11vw,14rem)] z-40 -mx-4 border-y border-white/10 bg-[#170e07]/95 px-4 py-3 backdrop-blur-xl sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
    >
      <div className="scrollbar-hidden flex items-center gap-2 overflow-x-auto pb-0.5">
        {filters.map((item) => {
          const active = activeFilter === item.value;

          return (
            <button
              key={item.value}
              type="button"
              onClick={() => onSelectFilter(item.value)}
              aria-pressed={active}
              className={`flex h-9 shrink-0 items-center gap-2 rounded-full border px-3.5 font-root text-[11px] font-semibold transition sm:h-10 sm:px-4 sm:text-xs ${
                active
                  ? "border-marigold/55 bg-marigold/12 text-marigold"
                  : "border-white/10 bg-white/[0.035] text-white/60 hover:border-white/25 hover:text-antiquewhite"
              }`}
            >
              <span>{item.label}</span>
              <span
                className={`tabular-nums text-[10px] ${
                  active ? "text-marigold/75" : "text-white/35"
                }`}
              >
                {item.count}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default Sidebar;
