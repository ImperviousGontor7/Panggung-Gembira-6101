import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FiArrowUpRight, FiSearch, FiX } from "react-icons/fi";

import { COLLECTIONS, PERFORMANCES } from "../data/performances";
import ExplorePagination from "../components/ExplorePagination";

const ITEMS_PER_PAGE = 9;

function normalize(value = "") {
  return String(value)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function PerformanceCard({ performance }) {
  const image = performance.video?.poster || performance.image;

  return (
    <Link
      to={`/performances/${performance.slug}`}
      className="group min-w-0 overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/[0.025] transition duration-300 hover:-translate-y-1 hover:border-marigold/40 hover:bg-white/[0.045] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-marigold/70"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-[#24170e]">
        {image ? (
          <img
            src={image}
            alt={performance.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.045]"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_center,rgba(227,164,25,.16),transparent_65%)]">
            <span className="font-[var(--font-main)] text-4xl text-marigold/65">IG</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#100802]/95 via-[#100802]/15 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/35 px-3 py-1.5 text-[.9rem] font-semibold tracking-[.16em] text-antiquewhite/90 backdrop-blur-md">
          {performance.collectionName}
        </span>
        <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[.95rem] font-semibold uppercase tracking-[.18em] text-marigold">
              Panggung Gembira 6101
            </p>
            <h2 className="mt-1 line-clamp-2 text-xl font-semibold leading-tight text-white sm:text-2xl">
              {performance.title}
            </h2>
          </div>
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/30 bg-white/10 text-xl text-white transition duration-300 group-hover:translate-x-1 group-hover:border-marigold/70 group-hover:bg-marigold group-hover:text-[#241306]">
            <FiArrowUpRight aria-hidden="true" />
          </span>
        </div>
      </div>
      <div className="space-y-3 p-4 sm:p-5">
        <p className="line-clamp-2 min-h-[3.2em] text-[1.2rem] leading-6 text-antiquewhite/60">
          {performance.shortDescription || "Dokumentasi penampilan Impervious Generation."}
        </p>
        <div className="flex flex-wrap items-center gap-2 text-[.95rem] text-antiquewhite/45">
          {performance.category ? (
            <span className="rounded-full border border-marigold/20 bg-marigold/10 px-3 py-1 text-marigold/90">
              {performance.category}
            </span>
          ) : null}
          {performance.time ? <span>{performance.time}</span> : null}
          <span className="ml-auto font-semibold tracking-[.12em] text-marigold/85">LIHAT PENAMPILAN</span>
        </div>
      </div>
    </Link>
  );
}

export default function ExplorePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const collectionFilter = searchParams.get("collection") || "all";
  const categoryFilter = searchParams.get("category") || "all";

  const [searchInput, setSearchInput] = useState(query);
  const [sortBy, setSortBy] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setSearchInput(query);
  }, [query]);

  useEffect(() => {
    setCurrentPage(1);
  }, [query, collectionFilter, categoryFilter, sortBy]);

  const categories = useMemo(() => {
    return [...new Set(PERFORMANCES.map((item) => item.category).filter(Boolean))]
      .sort((a, b) => a.localeCompare(b, "id"));
  }, []);

  const collectionCounts = useMemo(() => {
    return Object.fromEntries([
      ["all", PERFORMANCES.length],
      ...COLLECTIONS.map((collection) => [
        collection.id,
        PERFORMANCES.filter((item) => item.collectionId === collection.id).length,
      ]),
    ]);
  }, []);

  const filteredPerformances = useMemo(() => {
    const needle = normalize(query);
    const filtered = PERFORMANCES.filter((item) => {
      const matchesCollection = collectionFilter === "all" || item.collectionId === collectionFilter;
      const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;
      const searchableText = normalize([
        item.title,
        item.displayTitle,
        item.collectionName,
        item.category,
        item.shortDescription,
        ...(item.tags || []),
      ].join(" "));
      const matchesQuery = !needle || searchableText.includes(needle);
      return matchesCollection && matchesCategory && matchesQuery;
    });

    if (sortBy === "title-asc") {
      filtered.sort((a, b) => a.title.localeCompare(b.title, "id"));
    } else if (sortBy === "title-desc") {
      filtered.sort((a, b) => b.title.localeCompare(a.title, "id"));
    } else {
      filtered.sort((a, b) => a.collectionOrder - b.collectionOrder || a.id.localeCompare(b.id));
    }

    return filtered;
  }, [query, collectionFilter, categoryFilter, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredPerformances.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const visiblePerformances = useMemo(() => {
    const start = (safePage - 1) * ITEMS_PER_PAGE;
    return filteredPerformances.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredPerformances, safePage]);

  const updateParams = (updates = {}) => {
    const next = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (!value || value === "all") next.delete(key);
      else next.set(key, value);
    });
    setSearchParams(next);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    updateParams({ q: searchInput.trim() });
  };

  const clearFilters = () => {
    setSearchInput("");
    setSortBy("featured");
    setSearchParams({});
  };

  return (
    <main className="min-h-[70vh] w-full text-white">
      <div className="mx-auto w-full max-w-[1680px] px-4 py-8 sm:px-6 sm:py-12 lg:px-10">
        <header className="mb-8 sm:mb-10">
          <p className="text-[1rem] font-semibold uppercase tracking-[.32em] text-marigold">IMPERVIOUS ARCHIVE · PG 6101</p>
          <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="font-[var(--font-main)] text-4xl font-semibold leading-tight text-antiquewhite sm:text-5xl lg:text-6xl">
                Jelajahi Penampilan
              </h1>
              <p className="mt-3 max-w-2xl text-[1.25rem] leading-7 text-antiquewhite/55 sm:text-[1.4rem]">
                Temukan dokumentasi Panggung Gembira 6101 berdasarkan nama penampilan, koleksi, atau kategori.
              </p>
            </div>
            <p className="text-[1.1rem] uppercase tracking-[.16em] text-antiquewhite/40">
              {PERFORMANCES.length} PENAMPILAN TERCATAT
            </p>
          </div>
        </header>

        <form
          onSubmit={handleSearch}
          className="flex min-h-14 items-center gap-3 rounded-2xl border border-white/10 bg-white/[.035] p-2 transition focus-within:border-marigold/50"
        >
          <FiSearch className="ml-3 shrink-0 text-xl text-marigold" aria-hidden="true" />
          <input
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Cari nama penampilan, koleksi, atau kata kunci..."
            aria-label="Cari penampilan"
            className="h-12 min-w-0 flex-1 bg-transparent px-2 text-[1.25rem] text-white outline-none placeholder:text-antiquewhite/30"
          />
          {searchInput ? (
            <button type="button" onClick={() => setSearchInput("")} aria-label="Hapus pencarian" className="grid h-10 w-10 shrink-0 place-items-center rounded-xl text-antiquewhite/45 transition hover:bg-white/10 hover:text-white">
              <FiX />
            </button>
          ) : null}
          <button type="submit" className="h-11 shrink-0 rounded-xl bg-marigold px-5 text-[1.15rem] font-bold text-[#211306] transition hover:brightness-110 active:scale-[.98]">
            Cari
          </button>
        </form>

        <section className="mt-6 space-y-4">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="-mx-1 flex min-w-0 items-center gap-2 overflow-x-auto px-1 pb-1 scrollbar-hidden" aria-label="Filter koleksi">
              <button
                type="button"
                onClick={() => updateParams({ collection: "all" })}
                aria-pressed={collectionFilter === "all"}
                className={`inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-[1.1rem] font-medium transition ${collectionFilter === "all" ? "border-marigold/55 bg-marigold/15 text-marigold" : "border-white/10 bg-white/[.025] text-antiquewhite/65 hover:border-white/25 hover:text-white"}`}
              >
                Semua koleksi <span className="text-[.95rem] opacity-65">{collectionCounts.all}</span>
              </button>
              {COLLECTIONS.map((collection) => (
                <button
                  key={collection.id}
                  type="button"
                  onClick={() => updateParams({ collection: collection.id })}
                  aria-pressed={collectionFilter === collection.id}
                  className={`inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full border px-4 text-[1.1rem] font-medium transition ${collectionFilter === collection.id ? "border-marigold/55 bg-marigold/15 text-marigold" : "border-white/10 bg-white/[.025] text-antiquewhite/65 hover:border-white/25 hover:text-white"}`}
                >
                  {collection.name} <span className="text-[.95rem] opacity-65">{collectionCounts[collection.id]}</span>
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {categories.length > 0 ? (
                <label className="relative">
                  <span className="sr-only">Filter kategori</span>
                  <select value={categoryFilter} onChange={(event) => updateParams({ category: event.target.value })} className="h-10 rounded-full border border-white/10 bg-[#170e07] px-4 pr-8 text-[1.1rem] text-antiquewhite outline-none focus:border-marigold/50">
                    <option value="all">Semua kategori</option>
                    {categories.map((category) => <option key={category} value={category}>{category}</option>)}
                  </select>
                </label>
              ) : null}
              <label className="relative">
                <span className="sr-only">Urutkan penampilan</span>
                <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="h-10 rounded-full border border-white/10 bg-[#170e07] px-4 pr-8 text-[1.1rem] text-antiquewhite outline-none focus:border-marigold/50">
                  <option value="featured">Urutan koleksi</option>
                  <option value="title-asc">Nama A–Z</option>
                  <option value="title-desc">Nama Z–A</option>
                </select>
              </label>
              {(query || collectionFilter !== "all" || categoryFilter !== "all") ? (
                <button type="button" onClick={clearFilters} className="inline-flex h-10 items-center gap-2 rounded-full px-3 text-[1.05rem] text-antiquewhite/50 transition hover:text-marigold">
                  <FiX aria-hidden="true" /> Reset
                </button>
              ) : null}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
            <h2 className="text-[1.35rem] font-semibold text-antiquewhite">
              {query ? `Hasil pencarian: “${query}”` : "Seluruh penampilan"}
            </h2>
            <span className="text-[1.05rem] tabular-nums text-antiquewhite/40">{filteredPerformances.length} hasil</span>
          </div>

          {visiblePerformances.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 sm:gap-5">
                {visiblePerformances.map((performance) => (
                  <PerformanceCard key={performance.id} performance={performance} />
                ))}
              </div>
              <ExplorePagination currentPage={safePage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </>
          ) : (
            <div className="rounded-[1.6rem] border border-white/10 bg-white/[.025] px-5 py-14 text-center sm:py-20">
              <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-marigold/20 bg-marigold/10 text-2xl text-marigold"><FiSearch /></span>
              <h3 className="mt-5 text-2xl font-semibold text-antiquewhite">Penampilan tidak ditemukan</h3>
              <p className="mx-auto mt-2 max-w-md text-[1.2rem] leading-7 text-antiquewhite/50">Coba kata kunci lain atau ubah filter koleksi untuk menemukan dokumentasi yang dicari.</p>
              <button type="button" onClick={clearFilters} className="mt-6 rounded-full bg-marigold px-5 py-3 text-[1.1rem] font-bold text-[#211306] transition hover:brightness-110">Tampilkan semua penampilan</button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
