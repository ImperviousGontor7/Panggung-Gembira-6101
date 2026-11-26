function getPaginationItems(currentPage, totalPages) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const items = [1];
  if (currentPage > 3) items.push("...");
  const start = Math.max(2, currentPage - 1);
  const end = Math.min(totalPages - 1, currentPage + 1);
  for (let page = start; page <= end; page += 1) items.push(page);
  if (currentPage < totalPages - 2) items.push("...");
  items.push(totalPages);
  return items;
}

export default function ExplorePagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <nav className="mt-8 flex flex-wrap items-center justify-center gap-2" aria-label="Pagination">
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        aria-label="Halaman sebelumnya"
        className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[.025] text-xl text-antiquewhite/80 transition hover:border-marigold/35 hover:bg-white/[.06] disabled:cursor-not-allowed disabled:opacity-35"
      >‹</button>
      {getPaginationItems(currentPage, totalPages).map((page, index) =>
        page === "..." ? (
          <span key={`ellipsis-${index}`} className="px-2 text-antiquewhite/45">…</span>
        ) : (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? "page" : undefined}
            className={`grid h-11 min-w-11 place-items-center rounded-xl border px-4 text-[1.15rem] font-semibold transition ${page === currentPage ? "border-marigold/60 bg-marigold text-[#211306] shadow-[0_8px_22px_rgba(227,164,25,.18)]" : "border-white/10 bg-white/[.025] text-antiquewhite/75 hover:border-marigold/35 hover:bg-white/[.06]"}`}
          >{page}</button>
        )
      )}
      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        aria-label="Halaman berikutnya"
        className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[.025] text-xl text-antiquewhite/80 transition hover:border-marigold/35 hover:bg-white/[.06] disabled:cursor-not-allowed disabled:opacity-35"
      >›</button>
    </nav>
  );
}
