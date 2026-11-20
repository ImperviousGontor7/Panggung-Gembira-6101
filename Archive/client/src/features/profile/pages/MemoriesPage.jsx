import { useEffect, useMemo, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

import Archive from "../gallery/Archive";
import CollectionsGrid from "../gallery/CollectionsGrid";
import FilterBar from "../gallery/FilterBar";
import GalleryToolbar from "../gallery/GalleryToolbar";
import Header from "../gallery/Header";
import {
  memoriesData,
  memoryCollections,
  memoryFilters,
} from "../gallery/memories_data";

const ITEMS_PER_BATCH = 50;

function getYear(dateString) {
  return new Date(`${dateString}T00:00:00`).getFullYear().toString();
}

function matchesFilter(memory, filterValue) {
  if (filterValue === "all") return true;
  if (filterValue === "2025" || filterValue === "2024") {
    return getYear(memory.date) === filterValue;
  }
  return memory.categoryKey === filterValue;
}

function MemoriesPage() {
  const { collection: collectionParam } = useParams();
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_BATCH);
  const sentinelRef = useRef(null);

  const activeCollection = collectionParam || null;
  const isOverview = activeCollection === null;
  const isValidCollection =
    activeCollection === "all" ||
    memoryCollections.some((collection) => collection.value === activeCollection);

  const counts = useMemo(() => {
    return Object.fromEntries(
      memoryFilters.map((filter) => [
        filter.value,
        memoriesData.filter((memory) => matchesFilter(memory, filter.value)).length,
      ])
    );
  }, []);

  const selectedCollection = useMemo(() => {
    if (!activeCollection || activeCollection === "all") return null;
    return memoryCollections.find((collection) => collection.value === activeCollection) || null;
  }, [activeCollection]);

  const sortedMemories = useMemo(() => {
    const filterValue = activeCollection || "all";
    const filtered = memoriesData.filter((memory) => matchesFilter(memory, filterValue));

    return [...filtered].sort((first, second) => {
      const firstDate = new Date(`${first.date}T00:00:00`).getTime();
      const secondDate = new Date(`${second.date}T00:00:00`).getTime();
      return sortBy === "oldest" ? firstDate - secondDate : secondDate - firstDate;
    });
  }, [activeCollection, sortBy]);

  const visibleMemories = useMemo(
    () => sortedMemories.slice(0, visibleCount),
    [sortedMemories, visibleCount]
  );

  const hasMore = visibleCount < sortedMemories.length;
  const supportsIntersectionObserver = typeof IntersectionObserver !== "undefined";

  useEffect(() => {
    setVisibleCount(ITEMS_PER_BATCH);
  }, [activeCollection, sortBy]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore || !supportsIntersectionObserver) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisibleCount((current) =>
            Math.min(current + ITEMS_PER_BATCH, sortedMemories.length)
          );
        }
      },
      { root: null, rootMargin: "360px 0px", threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [activeCollection, sortBy, visibleCount, hasMore, sortedMemories.length, supportsIntersectionObserver]);

  if (!isOverview && !isValidCollection) {
    return <Navigate to="/memories" replace />;
  }

  const pageTitle = selectedCollection?.label || "All Memories";
  const pageSubtitle = selectedCollection?.description || "Every moment, a story. Every story, a memory.";

  return (
    <div className="min-h-screen text-antiquewhite">
      <div className="w-full max-w-500 mx-auto px-5 sm:px-8 pb-16 pt-[clamp(5.5rem,12.5vw,10rem)] relative z-10">
        {isOverview ? (
          <>
            <Header
              title="Our Memories"
              subtitle="Every moment, a story. Every story, a memory."
            >
              <div className="flex items-center gap-5 border-t border-white/10 pt-4 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                <div>
                  <p className="text-[2.2rem] font-semibold leading-none text-antiquewhite">
                    {String(memoryCollections.length).padStart(2, "0")}
                  </p>
                  <p className="mt-2 text-[0.95rem] tracking-[0.13em] text-antiquewhite/45">COLLECTIONS</p>
                </div>
                <span className="h-10 w-px bg-white/10" />
                <div>
                  <p className="text-[2.2rem] font-semibold leading-none text-antiquewhite">
                    {String(memoriesData.length).padStart(2, "0")}
                  </p>
                  <p className="mt-2 text-[0.95rem] tracking-[0.13em] text-antiquewhite/45">MEMORIES</p>
                </div>
              </div>
            </Header>

            <section className="mt-8 sm:mt-10">
              <div className="mb-5 flex items-center justify-between gap-3">
                <div>
                  <p className="text-[1.05rem] font-semibold tracking-[0.2em] text-marigold/85">
                    EXPLORE THE ARCHIVE
                  </p>
                  <p className="mt-1.5 text-[1.25rem] text-antiquewhite/45">
                    Choose a collection to start exploring.
                  </p>
                </div>
                <span className="hidden text-[1rem] tracking-[0.13em] text-antiquewhite/35 sm:block">
                  06 FOLDERS
                </span>
              </div>

              <CollectionsGrid collections={memoryCollections} memories={memoriesData} />
            </section>

            <section className="mt-6 flex flex-col gap-4 rounded-[1.7rem] border border-white/9 bg-white/2.5 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-7 sm:py-6">
              <div>
                <p className="text-[1.6rem] font-semibold text-antiquewhite">
                  Looking for a specific moment?
                </p>
                <p className="mt-1.5 text-[1.2rem] text-antiquewhite/50">
                  Browse the complete collection in one place.
                </p>
              </div>
              <Link
                to="/memories/all"
                className="inline-flex min-h-11 items-center justify-center gap-3 self-start rounded-full bg-marigold px-5 text-[1.2rem] font-semibold text-[#241306] transition hover:bg-[#f0b72e] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-antiquewhite/70 sm:self-auto"
              >
                Browse All Memories <span aria-hidden="true">↗</span>
              </Link>
            </section>
          </>
        ) : (
          <>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <Link
                to="/memories"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-[1.15rem] text-antiquewhite/65 transition hover:border-marigold/40 hover:text-antiquewhite"
              >
                <span aria-hidden="true">←</span> All Collections
              </Link>
              <p className="text-[1rem] tracking-[0.12em] text-antiquewhite/35">
                OUR MEMORIES <span className="mx-2 text-marigold/70">/</span> {pageTitle.toUpperCase()}
              </p>
            </div>

            <Header
              eyebrow={selectedCollection?.eyebrow || "THE COMPLETE ARCHIVE"}
              title={pageTitle}
              subtitle={pageSubtitle}
            >
              <div className="border-t border-white/10 pt-4 lg:border-t-0 lg:pt-0 lg:text-right">
                <p className="text-[2.2rem] font-semibold leading-none text-antiquewhite">
                  {String(sortedMemories.length).padStart(2, "0")}
                </p>
                <p className="mt-2 text-[0.95rem] tracking-[0.13em] text-antiquewhite/45">
                  {sortedMemories.length === 1 ? "MEMORY" : "MEMORIES"}
                </p>
              </div>
            </Header>

            <section className="mt-6 space-y-5 sm:mt-8">
              <GalleryToolbar
                sortBy={sortBy}
                onSortChange={setSortBy}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
              />
              <FilterBar
                filters={memoryFilters}
                activeFilter={activeCollection}
                counts={counts}
              />
            </section>

            <section className="mt-6 sm:mt-8" aria-live="polite">
              <Archive items={visibleMemories} viewMode={viewMode} />

              {hasMore && (
                <div
                  ref={supportsIntersectionObserver ? sentinelRef : null}
                  className="flex min-h-20 items-center justify-center text-[1.15rem] text-antiquewhite/45"
                  aria-label="Load more memories"
                >
                  {supportsIntersectionObserver ? (
                    <span className="inline-flex items-center gap-3">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-marigold/25 border-t-marigold" />
                      Loading more memories
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setVisibleCount((current) => Math.min(current + ITEMS_PER_BATCH, sortedMemories.length))}
                      className="rounded-full border border-white/15 px-5 py-2 text-antiquewhite/75 transition hover:border-marigold/45 hover:text-marigold"
                    >
                      Load more memories
                    </button>
                  )}
                </div>
              )}

              <p className="mt-6 text-center text-[1.05rem] text-antiquewhite/35">
                Showing {visibleMemories.length} of {sortedMemories.length} memories
              </p>
            </section>
          </>
        )}
      </div>
    </div>
  );
}

export default MemoriesPage;
