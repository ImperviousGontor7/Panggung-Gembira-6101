function Sidebar({ filters, activeFilter, onSelectFilter }) {
  return (
    <aside className="flex h-full flex-col rounded-4xl border border-white/10 bg-white/3 p-4 shadow-[0_20px_60px_rgba(0,0,0,.35)] lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)] lg:p-6">
      <div className="mb-5 flex items-center justify-between px-2">
        <h2 className="text-sm font-medium tracking-[0.2em] text-white/80">
          FILTER
        </h2>
        <span className="text-lg text-white/70">≡</span>
      </div>

      <div className="flex-1 overflow-y-auto pr-1">
        <div className="flex flex-col gap-3">
          {filters.map((item) => {
            const active = activeFilter === item.value;

            return (
              <button
                key={item.value}
                type="button"
                onClick={() => onSelectFilter(item.value)}
                className={[
                  "group flex items-center justify-between rounded-[1.6rem] border px-4 py-4 text-left transition-all duration-200",
                  active
                    ? "border-indigo-400/30 bg-[#2a3050] shadow-[0_12px_30px_rgba(90,102,255,.18)]"
                    : "border-white/8 bg-white/2 hover:border-white/15 hover:bg-white/5",
                ].join(" ")}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={[
                      "flex h-10 w-10 items-center justify-center rounded-xl border text-sm transition-all",
                      active
                        ? "border-indigo-300/30 bg-indigo-400/20 text-indigo-200"
                        : "border-white/10 bg-white/3 text-white/70 group-hover:text-white",
                    ].join(" ")}
                  >
                    ▦
                  </span>

                  <span className="text-sm font-medium text-white/90">
                    {item.label}
                  </span>
                </div>

                <span
                  className={[
                    "min-w-10 rounded-full px-3 py-1 text-center text-xs font-semibold",
                    active
                      ? "bg-white/10 text-white"
                      : "bg-white/5 text-white/70",
                  ].join(" ")}
                >
                  {item.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 rounded-[1.75rem] border border-white/10 bg-linear-to-b from-white/5 to-white/2 p-5">
        <div className="text-5xl leading-none text-indigo-300">“</div>
        <p className="mt-4 text-sm leading-7 text-white/80">
          Memories are timeless treasures of the heart.
        </p>

        <div className="mt-8 flex justify-end">
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/3 text-lg text-white/70 transition hover:bg-white/8"
          >
            ♡
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;