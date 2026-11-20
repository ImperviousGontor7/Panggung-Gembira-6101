import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import Header from "../gallery/Header.jsx";
import GalleryControls from "../gallery/GalleryControls.jsx";
import Sidebar from "../gallery/Sidebar.jsx";
import Archive from "../gallery/Archive.jsx";

import { memoriesData, memoryFilters } from "../gallery/memories_data";

// Infinite scroll loads no more than 50 memories in each batch.
const MAX_ITEMS_PER_LOAD = 50;

function formatYear(dateString) {
  return new Date(`${dateString}T00:00:00`).getFullYear().toString();
}

function Memories() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");
  const [visibleCount, setVisibleCount] = useState(MAX_ITEMS_PER_LOAD);
  const [supportsObserver, setSupportsObserver] = useState(true);
  const sentinelRef = useRef(null);

  const filters = useMemo(() => {
    return memoryFilters.map((filter) => {
      const count =
        filter.value === "all"
          ? memoriesData.length
          : filter.value === "2025" || filter.value === "2024"
            ? memoriesData.filter(
                (item) => formatYear(item.date) === filter.value,
              ).length
            : memoriesData.filter(
                (item) => item.categoryKey === filter.value,
              ).length;

      return { ...filter, count };
    });
  }, []);

  const filteredMemories = useMemo(() => {
    const byFilter = memoriesData.filter((item) => {
      if (activeFilter === "all") return true;

      if (activeFilter === "2025" || activeFilter === "2024") {
        return formatYear(item.date) === activeFilter;
      }

      return item.categoryKey === activeFilter;
    });

    return [...byFilter].sort((a, b) => {
      if (sortBy === "newest") return new Date(b.date) - new Date(a.date);
      if (sortBy === "oldest") return new Date(a.date) - new Date(b.date);
      if (sortBy === "most-liked") return b.likes - a.likes;
      if (sortBy === "least-liked") return a.likes - b.likes;
      return 0;
    });
  }, [activeFilter, sortBy]);

  const visibleMemories = useMemo(
    () => filteredMemories.slice(0, visibleCount),
    [filteredMemories, visibleCount],
  );

  const hasMore = visibleMemories.length < filteredMemories.length;

  const handleFilterChange = useCallback((filterValue) => {
    setActiveFilter(filterValue);
    setVisibleCount(MAX_ITEMS_PER_LOAD);
  }, []);

  const handleSortChange = useCallback((value) => {
    setSortBy(value);
    setVisibleCount(MAX_ITEMS_PER_LOAD);
  }, []);

  const loadNextBatch = useCallback(() => {
    setVisibleCount((currentCount) =>
      Math.min(currentCount + MAX_ITEMS_PER_LOAD, filteredMemories.length),
    );
  }, [filteredMemories.length]);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setSupportsObserver(false);
      return undefined;
    }

    setSupportsObserver(true);

    if (!hasMore || !sentinelRef.current) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          loadNextBatch();
        }
      },
      {
        root: null,
        rootMargin: "600px 0px",
        threshold: 0,
      },
    );

    observer.observe(sentinelRef.current);

    return () => observer.disconnect();
  }, [hasMore, loadNextBatch, visibleMemories.length]);

  return (
    <div className="min-h-screen overflow-x-clip text-white">
      <div className="mx-auto w-full max-w-[1680px] px-4 pb-16 pt-[clamp(9rem,11vw,14rem)] sm:px-6 lg:px-8">
        <div className="space-y-6 sm:space-y-8">
          {/* 1. Title and subtitle */}
          <Header />

          {/* 2. Filter A: sort, grid, and list controls */}
          <GalleryControls
            sortBy={sortBy}
            onSortChange={handleSortChange}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        </div>

        {/* 3. Filter B: year and category filters */}
        <div className="mt-5 sm:mt-7">
          <Sidebar
            filters={filters}
            activeFilter={activeFilter}
            onSelectFilter={handleFilterChange}
          />
        </div>

        {/* 4. Gallery images */}
        <section aria-label="Our memories gallery" className="mt-5 sm:mt-7">
          <Archive items={visibleMemories} viewMode={viewMode} />

          {/* 5. Infinite pagination: load the next batch when this enters view */}
          {hasMore && supportsObserver && (
            <div
              ref={sentinelRef}
              aria-live="polite"
              className="flex min-h-20 items-center justify-center gap-3 py-6"
            >
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-marigold/25 border-t-marigold" />
              <span className="font-root text-xs text-white/45">
                Loading more memories...
              </span>
            </div>
          )}

          {/* Fallback for browsers without IntersectionObserver */}
          {hasMore && !supportsObserver && (
            <div className="flex justify-center py-7">
              <button
                type="button"
                onClick={loadNextBatch}
                className="rounded-full border border-marigold/35 bg-marigold/10 px-5 py-3 font-root text-xs font-semibold text-marigold transition hover:bg-marigold/20"
              >
                Load more memories
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Memories;
