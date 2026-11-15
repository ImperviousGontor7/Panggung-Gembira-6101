function getPaginationItems(currentPage, totalPages) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const items = [1];

  if (currentPage > 3) items.push("...");

  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);

  for (let i = start; i <= end; i += 1) {
    items.push(i);
  }

  if (currentPage < totalPages - 2) items.push("...");

  items.push(totalPages);

  return items;
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = getPaginationItems(currentPage, totalPages);

  return (
    <nav className="mt-8 flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/3 text-white/80 transition hover:bg-white/8 disabled:cursor-not-allowed disabled:opacity-40"
      >
        ‹
      </button>

      {pages.map((page, index) =>
        page === "..." ? (
          <span key={`dots-${index}`} className="px-2 text-white/60">
            ...
          </span>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            className={[
              "flex h-11 min-w-11 items-center justify-center rounded-xl border px-4 text-sm font-medium transition",
              page === currentPage
                ? "border-indigo-400/30 bg-indigo-400 text-white shadow-[0_8px_22px_rgba(99,102,241,.35)]"
                : "border-white/10 bg-white/3 text-white/80 hover:bg-white/8",
            ].join(" ")}
          >
            {page}
          </button>
        )
      )}

      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/3 text-white/80 transition hover:bg-white/8 disabled:cursor-not-allowed disabled:opacity-40"
      >
        ›
      </button>
    </nav>
  );
}

export default Pagination;