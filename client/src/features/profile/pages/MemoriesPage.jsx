import { useCallback, useMemo, useState } from "react";

import Sidebar from "../gallery/sidebar";
import Header from "../gallery/header";
import Archive from "../gallery/archive";
import Pagination from "../gallery/pagination";

import {
  memoriesData,
  memoryFilters,
} from "../gallery/memories_data";

const ITEMS_PER_PAGE = 8;

function formatYear(dateString) {
  return new Date(dateString).getFullYear().toString();
}

function Memories() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);

  const filters = useMemo(() => {
    return memoryFilters.map((filter) => {
      const count =
        filter.value === "all"
          ? memoriesData.length
          : filter.value === "2025" || filter.value === "2024"
            ? memoriesData.filter((item) => formatYear(item.date) === filter.value).length
            : memoriesData.filter((item) => item.categoryKey === filter.value).length;

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

  const totalPages = Math.max(
    1,
    Math.ceil(filteredMemories.length / ITEMS_PER_PAGE)
  );

  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedMemories = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
    return filteredMemories.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [safeCurrentPage, filteredMemories]);

  const handleFilterChange = useCallback((filterValue) => {
    setActiveFilter(filterValue);
    setCurrentPage(1);
  }, []);

  const handleSortChange = useCallback((value) => {
    setSortBy(value);
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  return (
    <main className="min-h-screen text-white">
      <div className="mx-auto max-w-[1680px] px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
        <div className="grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          <Sidebar
            filters={filters}
            activeFilter={activeFilter}
            onSelectFilter={handleFilterChange}
          />

          <section className="rounded-4xl border border-white/10 bg-white/2 p-4 sm:p-6 lg:p-10">
            <Header
              sortBy={sortBy}
              onSortChange={handleSortChange}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />

            <div className="mt-8">
              <Archive items={paginatedMemories} viewMode={viewMode} />
            </div>

            <Pagination
              currentPage={safeCurrentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </section>
        </div>
      </div>
    </main>
  );
}

export default Memories;