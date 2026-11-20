import {
  HOME_DEFAULTS,
  HOME_LIMITS,
  HOME_PLACEMENTS,
  HOME_SECTION_STATUSES,
  HOME_SECTION_TYPES,
} from "./home.constants.js";

// ======================================================
// VALIDATION HELPERS
// ======================================================

function isString(value) {
  return (
    typeof value === "string"
  );
}

function optionalString(
  value,
  field,
  maxLength,
) {
  if (
    value === undefined ||
    value === null
  ) {
    return;
  }

  if (!isString(value)) {
    throw new Error(
      `${field} harus berupa string.`,
    );
  }

  if (
    value.length >
    maxLength
  ) {
    throw new Error(
      `${field} terlalu panjang.`,
    );
  }
}

function requiredString(
  value,
  field,
  minLength = 1,
  maxLength = 255,
) {
  if (!isString(value)) {
    throw new Error(
      `${field} wajib berupa string.`,
    );
  }

  const trimmed =
    value.trim();

  if (
    trimmed.length <
    minLength
  ) {
    throw new Error(
      `${field} terlalu pendek.`,
    );
  }

  if (
    trimmed.length >
    maxLength
  ) {
    throw new Error(
      `${field} terlalu panjang.`,
    );
  }
}

// ======================================================
// PAYLOAD
// ======================================================

function validatePayload(payload) {
  if (
    payload === undefined ||
    payload === null
  ) {
    return {};
  }

  if (
    typeof payload !== "object" ||
    Array.isArray(payload)
  ) {
    throw new Error(
      "payload harus berupa object.",
    );
  }

  return payload;
}

// ======================================================
// CREATE
// ======================================================

export function validateCreateHomeInput(
  input = {},
) {
  requiredString(
    input.key,
    "key",
    2,
    255,
  );

  requiredString(
    input.title,
    "title",
    HOME_LIMITS.TITLE_MIN,
    HOME_LIMITS.TITLE_MAX,
  );

  if (
    !HOME_SECTION_TYPES.includes(
      input.sectionType,
    )
  ) {
    throw new Error(
      "sectionType tidak valid.",
    );
  }

  if (
    !HOME_PLACEMENTS.includes(
      input.placement,
    )
  ) {
    throw new Error(
      "placement tidak valid.",
    );
  }

  if (
    input.status &&
    !HOME_SECTION_STATUSES.includes(
      input.status,
    )
  ) {
    throw new Error(
      "status tidak valid.",
    );
  }

  optionalString(
    input.subtitle,
    "subtitle",
    HOME_LIMITS.SUBTITLE_MAX,
  );

  optionalString(
    input.description,
    "description",
    HOME_LIMITS.DESCRIPTION_MAX,
  );

  optionalString(
    input.image,
    "image",
    HOME_LIMITS.CTA_URL_MAX,
  );

  optionalString(
    input.mobileImage,
    "mobileImage",
    HOME_LIMITS.CTA_URL_MAX,
  );

  optionalString(
    input.ctaLabel,
    "ctaLabel",
    HOME_LIMITS.CTA_LABEL_MAX,
  );

  optionalString(
    input.ctaUrl,
    "ctaUrl",
    HOME_LIMITS.CTA_URL_MAX,
  );

  const payload =
    validatePayload(
      input.payload,
    );

  return {
    key: input.key.trim(),

    sectionType:
      input.sectionType,

    placement:
      input.placement,

    status:
      input.status ??
      HOME_DEFAULTS.STATUS,

    title:
      input.title.trim(),

    subtitle:
      input.subtitle ??
      null,

    description:
      input.description ??
      null,

    image:
      input.image ??
      null,

    mobileImage:
      input.mobileImage ??
      null,

    badge:
      input.badge ??
      null,

    ctaLabel:
      input.ctaLabel ??
      HOME_DEFAULTS.CTA_LABEL,

    ctaUrl:
      input.ctaUrl ??
      HOME_DEFAULTS.CTA_URL,

    secondaryLabel:
      input.secondaryLabel ??
      null,

    secondaryUrl:
      input.secondaryUrl ??
      null,

    metaTitle:
      input.metaTitle ??
      null,

    metaDescription:
      input.metaDescription ??
      null,

    payload,

    order:
      Number.isFinite(
        Number(input.order),
      )
        ? Number(input.order)
        : HOME_DEFAULTS.ORDER,

    isActive:
      input.isActive ??
      HOME_DEFAULTS.IS_ACTIVE,
  };
}

// ======================================================
// UPDATE
// ======================================================

export function validateUpdateHomeInput(
  input = {},
) {
  const data = {};

  if (input.key !== undefined) {
    requiredString(
      input.key,
      "key",
      2,
      255,
    );

    data.key =
      input.key.trim();
  }

  if (
    input.title !== undefined
  ) {
    requiredString(
      input.title,
      "title",
      HOME_LIMITS.TITLE_MIN,
      HOME_LIMITS.TITLE_MAX,
    );

    data.title =
      input.title.trim();
  }

  if (
    input.sectionType !==
    undefined
  ) {
    if (
      !HOME_SECTION_TYPES.includes(
        input.sectionType,
      )
    ) {
      throw new Error(
        "sectionType tidak valid.",
      );
    }

    data.sectionType =
      input.sectionType;
  }

  if (
    input.placement !==
    undefined
  ) {
    if (
      !HOME_PLACEMENTS.includes(
        input.placement,
      )
    ) {
      throw new Error(
        "placement tidak valid.",
      );
    }

    data.placement =
      input.placement;
  }

  if (
    input.status !==
    undefined
  ) {
    if (
      !HOME_SECTION_STATUSES.includes(
        input.status,
      )
    ) {
      throw new Error(
        "status tidak valid.",
      );
    }

    data.status =
      input.status;
  }

  const stringFields = [
    [
      "subtitle",
      HOME_LIMITS.SUBTITLE_MAX,
    ],

    [
      "description",
      HOME_LIMITS.DESCRIPTION_MAX,
    ],

    [
      "image",
      HOME_LIMITS.CTA_URL_MAX,
    ],

    [
      "mobileImage",
      HOME_LIMITS.CTA_URL_MAX,
    ],

    [
      "ctaLabel",
      HOME_LIMITS.CTA_LABEL_MAX,
    ],

    [
      "ctaUrl",
      HOME_LIMITS.CTA_URL_MAX,
    ],

    [
      "secondaryLabel",
      HOME_LIMITS.CTA_LABEL_MAX,
    ],

    [
      "secondaryUrl",
      HOME_LIMITS.CTA_URL_MAX,
    ],

    [
      "metaTitle",
      HOME_LIMITS.TITLE_MAX,
    ],

    [
      "metaDescription",
      HOME_LIMITS.DESCRIPTION_MAX,
    ],
  ];

  for (
    const [
      field,
      maxLength,
    ] of stringFields
  ) {
    if (
      input[field] !==
      undefined
    ) {
      optionalString(
        input[field],
        field,
        maxLength,
      );

      data[field] =
        input[field];
    }
  }

  if (
    input.payload !==
    undefined
  ) {
    data.payload =
      validatePayload(
        input.payload,
      );
  }

  if (
    input.order !==
    undefined
  ) {
    data.order =
      Number(input.order);
  }

  if (
    input.isActive !==
    undefined
  ) {
    data.isActive =
      Boolean(input.isActive);
  }

  return data;
}