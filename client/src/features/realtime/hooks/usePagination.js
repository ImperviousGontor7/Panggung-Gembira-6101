import { useEffect, useMemo, useState } from "react";

const EMPTY_ITEMS = [];

export function usePagination(items = EMPTY_ITEMS, initialItemsPerPage = 10) {
  const safeItems = useMemo(
    () => (Array.isArray(items) ? items : EMPTY_ITEMS),
    [items]
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);

  const totalItems = safeItems.length;

  const totalPages = Math.max(
    1,
    Math.ceil(totalItems / itemsPerPage)
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return safeItems.slice(startIndex, endIndex);
  }, [safeItems, currentPage, itemsPerPage]);

  const startIndex = (currentPage - 1) * itemsPerPage;

  const endIndex = Math.min(
    startIndex + itemsPerPage,
    totalItems
  );

  const goToPage = (page) => {
    const nextPage = Number(page);

    if (Number.isNaN(nextPage)) {
      return;
    }

    setCurrentPage(
      Math.min(
        Math.max(nextPage, 1),
        totalPages
      )
    );
  };

  const nextPage = () => {
    setCurrentPage((page) =>
      Math.min(page + 1, totalPages)
    );
  };

  const prevPage = () => {
    setCurrentPage((page) =>
      Math.max(page - 1, 1)
    );
  };

  const resetPagination = () => {
    setCurrentPage(1);
  };

  return {
    currentPage,
    setCurrentPage,

    itemsPerPage,
    setItemsPerPage,

    totalItems,
    totalPages,

    startIndex,
    endIndex,

    paginatedItems,

    goToPage,
    nextPage,
    prevPage,
    resetPagination,
  };
}

export default usePagination;