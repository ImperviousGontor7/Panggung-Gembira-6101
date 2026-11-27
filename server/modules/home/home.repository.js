import prisma from "../../config/prisma.js";

// ======================================================
// FIND ALL
// ======================================================

export async function findHomeSections({
  placement,
  sectionType,
  status,
  isActive,
} = {}) {
  const where = {
    deletedAt: null,
  };

  if (placement) {
    where.placement = placement;
  }

  if (sectionType) {
    where.sectionType = sectionType;
  }

  if (status) {
    where.status = status;
  }

  if (typeof isActive === "boolean") {
    where.isActive = isActive;
  }

  return prisma.home.findMany({
    where,

    orderBy: [
      {
        order: "asc",
      },

      {
        createdAt: "asc",
      },
    ],
  });
}

// ======================================================
// FIND BY ID
// ======================================================

export async function findHomeById(id) {
  return prisma.home.findFirst({
    where: {
      id,

      deletedAt: null,
    },
  });
}

// ======================================================
// FIND BY KEY
// ======================================================

export async function findHomeByKey(key) {
  return prisma.home.findFirst({
    where: {
      key,

      deletedAt: null,
    },
  });
}

// ======================================================
// FIND INCLUDING DELETED
// ======================================================

export async function findHomeByIdIncludingDeleted(id) {
  return prisma.home.findUnique({
    where: {
      id,
    },
  });
}

// ======================================================
// CREATE
// ======================================================

export async function createHome(data) {
  return prisma.home.create({
    data,
  });
}

// ======================================================
// UPDATE
// ======================================================

export async function updateHome(id, data) {
  return prisma.home.update({
    where: {
      id,
    },

    data,
  });
}

// ======================================================
// SOFT DELETE
// ======================================================

export async function softDeleteHome(id) {
  return prisma.home.update({
    where: {
      id,
    },

    data: {
      deletedAt: new Date(),

      isActive: false,

      status: "ARCHIVED",
    },
  });
}

// ======================================================
// RESTORE
// ======================================================

export async function restoreHome(id) {
  return prisma.home.update({
    where: {
      id,
    },

    data: {
      deletedAt: null,
      isActive: true,
      status: "ACTIVE",
    },
  });
}

// ======================================================
// MAX ORDER
// ======================================================

export async function getMaxHomeOrder(placement) {
  const result = await prisma.home.aggregate({
    where: {
      placement,

      deletedAt: null,
    },

    _max: {
      order: true,
    },
  });

  return result._max.order ?? 0;
}

// ======================================================
// COUNT
// ======================================================

export async function countHomeSections({ placement, sectionType } = {}) {
  const where = {
    deletedAt: null,
  };

  if (placement) {
    where.placement = placement;
  }

  if (sectionType) {
    where.sectionType = sectionType;
  }

  return prisma.home.count({
    where,
  });
}
