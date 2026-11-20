const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

export function parsePositiveInt(value, fallback = DEFAULT_PAGE) {
  const parsed = Number.parseInt(value, 10);

  if (Number.isNaN(parsed) || parsed < 1) {
    return fallback;
  }

  return parsed;
}

export function calculateSkip(
  page = DEFAULT_PAGE,
  limit = DEFAULT_LIMIT
) {
  const safePage = parsePositiveInt(page, DEFAULT_PAGE);
  const safeLimit = normalizeLimit(limit);

  return (safePage - 1) * safeLimit;
}

export function normalizeLimit(
  limit = DEFAULT_LIMIT,
  maxLimit = MAX_LIMIT
) {
  const safeLimit = parsePositiveInt(limit, DEFAULT_LIMIT);

  return Math.min(safeLimit, maxLimit);
}

export function getPaginationParams(
  query = {},
  {
    defaultPage = DEFAULT_PAGE,
    maxLimit = MAX_LIMIT,
  } = {}
) {
  const page = parsePositiveInt(query.page, defaultPage);
  const limit = normalizeLimit(query.limit, maxLimit);

  return {
    page,
    limit,
    skip: calculateSkip(page, limit),
  };
}

export function buildPaginationMeta({
  page = DEFAULT_PAGE,
  limit = DEFAULT_LIMIT,
  total = 0,
} = {}) {
  const safePage = parsePositiveInt(page, DEFAULT_PAGE);
  const safeLimit = normalizeLimit(limit);
  const safeTotal = Math.max(Number(total) || 0, 0);

  const totalPages =
    safeLimit > 0 ? Math.ceil(safeTotal / safeLimit) : 0;

  return {
    page: safePage,
    limit: safeLimit,
    total: safeTotal,
    totalPages,
    hasPrevPage: safePage > 1,
    hasNextPage: safePage < totalPages,
    prevPage: safePage > 1 ? safePage - 1 : null,
    nextPage: safePage < totalPages ? safePage + 1 : null,
  };
}

export default {
  parsePositiveInt,
  calculateSkip,
  normalizeLimit,
  getPaginationParams,
  buildPaginationMeta,
};