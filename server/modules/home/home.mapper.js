// ======================================================
// HOME MAPPER
// ======================================================

function normalizeString(value, fallback = null) {
  if (value === undefined || value === null) {
    return fallback;
  }

  return String(value);
}

function normalizeBoolean(value, fallback = true) {
  if (value === undefined || value === null) {
    return fallback;
  }

  return Boolean(value);
}

function normalizeNumber(value, fallback = 0) {
  const number = Number(value);

  return Number.isFinite(number)
    ? number
    : fallback;
}

function normalizePayload(payload) {
  if (
    payload === null ||
    payload === undefined ||
    typeof payload !== "object" ||
    Array.isArray(payload)
  ) {
    return {};
  }

  return payload;
}

export function mapHomeEntity(home) {
  if (!home) {
    return null;
  }

  const payload = normalizePayload(home.payload);

  return {
    id: home.id,

    key: home.key,

    sectionType: home.sectionType,

    placement: home.placement,

    status: home.status,

    title: normalizeString(home.title, ""),

    subtitle: normalizeString(home.subtitle),

    description: normalizeString(home.description),

    image: normalizeString(home.image),

    mobileImage: normalizeString(home.mobileImage),

    badge: normalizeString(home.badge),

    ctaLabel: normalizeString(home.ctaLabel),

    ctaUrl: normalizeString(home.ctaUrl),

    secondaryLabel: normalizeString(home.secondaryLabel),

    secondaryUrl: normalizeString(home.secondaryUrl),

    metaTitle: normalizeString(home.metaTitle),

    metaDescription: normalizeString(home.metaDescription),

    payload,

    order: normalizeNumber(home.order),

    isActive: normalizeBoolean(home.isActive),

    authorId: home.authorId ?? null,

    createdAt: home.createdAt,

    updatedAt: home.updatedAt,
  };
}

export function mapHomeEntities(items = []) {
  return items
    .map(mapHomeEntity)
    .filter(Boolean);
}

export function mapHomePayload(payload = {}) {
  const normalized = normalizePayload(payload);

  return {
    category: normalizeString(
      normalized.category,
      "",
    ),

    date: normalizeString(
      normalized.date,
      "",
    ),

    time: normalizeString(
      normalized.time,
      "",
    ),

    link: normalizeString(
      normalized.link,
      "/",
    ),

    views: normalizeString(
      normalized.views,
      "",
    ),

    rank: normalizeString(
      normalized.rank,
      "",
    ),

    color: normalizeString(
      normalized.color,
      "#F59E0B",
    ),

    icon: normalizeString(
      normalized.icon,
      "BsGrid",
    ),

    newsId: normalizeString(
      normalized.newsId,
      null,
    ),

    ...normalized,
  };
}

export function mapHomeForResponse(home) {
  const mapped = mapHomeEntity(home);

  if (!mapped) {
    return null;
  }

  return {
    ...mapped,

    payload: mapHomePayload(
      mapped.payload,
    ),
  };
}