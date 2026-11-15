import {
  HOME_DEFAULTS,
  HOME_SECTION_STATUS,
} from "./home.constants.js";

import {
  createHome,
  findHomeById,
  findHomeByKey,
  findHomeSections,
  getMaxHomeOrder,
  softDeleteHome,
  updateHome,
  restoreHome,
} from "./home.repository.js";

import {
  mapHomeEntities,
  mapHomeForResponse,
} from "./home.mapper.js";

import {
  validateCreateHomeInput,
  validateUpdateHomeInput,
} from "./home.schema.js";

// ======================================================
// GET ALL
// ======================================================

export async function getHomeSections(
  filters = {},
) {
  const items =
    await findHomeSections({
      ...filters,

      isActive:
        filters.isActive ??
        true,
    });

  return mapHomeEntities(items);
}

// ======================================================
// GET BY PLACEMENT
// ======================================================

export async function getHomeSectionsByPlacement(
  placement,
) {
  const items =
    await findHomeSections({
      placement,

      status:
        HOME_SECTION_STATUS.ACTIVE,

      isActive: true,
    });

  return mapHomeEntities(items);
}

// ======================================================
// GET BY ID
// ======================================================

export async function getHomeSectionById(
  id,
) {
  const item =
    await findHomeById(id);

  if (!item) {
    throw new Error(
      "Home section tidak ditemukan.",
    );
  }

  return mapHomeForResponse(
    item,
  );
}

// ======================================================
// CREATE
// ======================================================

export async function createHomeSection(
  input,
  authorId = null,
) {
  const data =
    validateCreateHomeInput(
      input,
    );

  const existing =
    await findHomeByKey(
      data.key,
    );

  if (existing) {
    throw new Error(
      "Key Home section sudah digunakan.",
    );
  }

  if (
    data.order ===
    HOME_DEFAULTS.ORDER
  ) {
    const maxOrder =
      await getMaxHomeOrder(
        data.placement,
      );

    data.order =
      maxOrder + 1;
  }

  const created =
    await createHome({
      ...data,

      authorId,
    });

  return mapHomeForResponse(
    created,
  );
}

// ======================================================
// UPDATE
// ======================================================

export async function updateHomeSection(
  id,
  input,
) {
  const existing =
    await findHomeById(id);

  if (!existing) {
    throw new Error(
      "Home section tidak ditemukan.",
    );
  }

  const data =
    validateUpdateHomeInput(
      input,
    );

  if (data.key) {
    const sameKey =
      await findHomeByKey(
        data.key,
      );

    if (
      sameKey &&
      sameKey.id !== id
    ) {
      throw new Error(
        "Key Home section sudah digunakan.",
      );
    }
  }

  const updated =
    await updateHome(
      id,
      data,
    );

  return mapHomeForResponse(
    updated,
  );
}

// ======================================================
// DELETE
// ======================================================

export async function deleteHomeSection(
  id,
) {
  const existing =
    await findHomeById(id);

  if (!existing) {
    throw new Error(
      "Home section tidak ditemukan.",
    );
  }

  const deleted =
    await softDeleteHome(id);

  return mapHomeForResponse(
    deleted,
  );
}

// ======================================================
// RESTORE
// ======================================================

export async function restoreHomeSection(
  id,
) {
  const existing =
    await findHomeById(id);

  if (!existing) {
    throw new Error(
      "Home section tidak ditemukan.",
    );
  }

  const restored =
    await restoreHome(id);

  return mapHomeForResponse(
    restored,
  );
}

// ======================================================
// REORDER
// ======================================================

export async function reorderHomeSections(
  items = [],
) {
  if (!Array.isArray(items)) {
    throw new Error(
      "items harus berupa array.",
    );
  }

  const operations =
    items.map(
      (item, index) =>
        updateHome(
          item.id,
          {
            order:
              Number.isFinite(
                Number(item.order),
              )
                ? Number(item.order)
                : index,
          },
        ),
    );

  await Promise.all(
    operations,
  );

  return getHomeSections();
}