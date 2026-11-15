// ======================================================
// HOME CONSTANTS
// ======================================================

export const HOME_SECTION_TYPE = Object.freeze({
  HERO: "HERO",
  SLIDER: "SLIDER",
  FEATURED: "FEATURED",
  TRENDING: "TRENDING",
  CATEGORY: "CATEGORY",
  BANNER: "BANNER",
  STATISTIC: "STATISTIC",
  CTA: "CTA",
  ABOUT: "ABOUT",
  GALLERY: "GALLERY",
  AGENDA: "AGENDA",
  NEWS: "NEWS",
});

export const HOME_SECTION_TYPES = Object.freeze(
  Object.values(HOME_SECTION_TYPE),
);

// ======================================================
// HOME PLACEMENTS
// ======================================================

export const HOME_PLACEMENT = Object.freeze({
  HERO: "HOME_HERO",
  ROOT_SLIDER: "HOME_ROOT_SLIDER",

  THIS_MONTH: "HOME_THIS_MONTH",
  MONTH_AGO: "HOME_MONTH_AGO",

  BEHIND_EVENTS: "HOME_BEHIND_EVENTS",

  FEATURED: "HOME_FEATURED",

  FIRST_MID_YEAR: "HOME_FIRST_MID_YEAR",
  SECOND_MID_YEAR: "HOME_SECOND_MID_YEAR",

  TRENDING: "HOME_TRENDING",
  CATEGORY: "HOME_CATEGORY",
});

export const HOME_PLACEMENTS = Object.freeze(
  Object.values(HOME_PLACEMENT),
);

// ======================================================
// STATUS
// ======================================================

export const HOME_SECTION_STATUS = Object.freeze({
  ACTIVE: "ACTIVE",
  HIDDEN: "HIDDEN",
  ARCHIVED: "ARCHIVED",
});

export const HOME_SECTION_STATUSES = Object.freeze(
  Object.values(HOME_SECTION_STATUS),
);

// ======================================================
// DEFAULT VALUES
// ======================================================

export const HOME_DEFAULTS = Object.freeze({
  CTA_LABEL: "Read More",
  CTA_URL: "/",

  CATEGORY_COLOR: "#F59E0B",

  CATEGORY_ICON: "BsGrid",

  ORDER: 0,

  IS_ACTIVE: true,

  STATUS: HOME_SECTION_STATUS.ACTIVE,
});

// ======================================================
// LIMITS
// ======================================================

export const HOME_LIMITS = Object.freeze({
  TITLE_MIN: 3,
  TITLE_MAX: 255,

  SUBTITLE_MAX: 255,

  DESCRIPTION_MAX: 5000,

  CTA_LABEL_MAX: 100,

  CTA_URL_MAX: 500,

  PAYLOAD_MAX: 10000,
});

// ======================================================
// PLACEMENT METADATA
// ======================================================

export const HOME_PLACEMENT_META = Object.freeze({
  [HOME_PLACEMENT.HERO]: {
    label: "Hero Utama",
    sectionType: HOME_SECTION_TYPE.SLIDER,
  },

  [HOME_PLACEMENT.ROOT_SLIDER]: {
    label: "Root Slider",
    sectionType: HOME_SECTION_TYPE.SLIDER,
  },

  [HOME_PLACEMENT.THIS_MONTH]: {
    label: "This Month",
    sectionType: HOME_SECTION_TYPE.FEATURED,
  },

  [HOME_PLACEMENT.MONTH_AGO]: {
    label: "Month Ago",
    sectionType: HOME_SECTION_TYPE.FEATURED,
  },

  [HOME_PLACEMENT.BEHIND_EVENTS]: {
    label: "Behind The Events",
    sectionType: HOME_SECTION_TYPE.FEATURED,
  },

  [HOME_PLACEMENT.FEATURED]: {
    label: "Featured / Knowledge",
    sectionType: HOME_SECTION_TYPE.FEATURED,
  },

  [HOME_PLACEMENT.FIRST_MID_YEAR]: {
    label: "First Mid Year",
    sectionType: HOME_SECTION_TYPE.FEATURED,
  },

  [HOME_PLACEMENT.SECOND_MID_YEAR]: {
    label: "Second Mid Year",
    sectionType: HOME_SECTION_TYPE.FEATURED,
  },

  [HOME_PLACEMENT.TRENDING]: {
    label: "Trending",
    sectionType: HOME_SECTION_TYPE.TRENDING,
  },

  [HOME_PLACEMENT.CATEGORY]: {
    label: "Category",
    sectionType: HOME_SECTION_TYPE.CATEGORY,
  },
});

export function isValidHomePlacement(value) {
  return HOME_PLACEMENTS.includes(value);
}

export function isValidHomeSectionType(value) {
  return HOME_SECTION_TYPES.includes(value);
}

export function getHomePlacementMeta(placement) {
  return (
    HOME_PLACEMENT_META[placement] ?? {
      label: placement,
      sectionType: HOME_SECTION_TYPE.FEATURED,
    }
  );
}