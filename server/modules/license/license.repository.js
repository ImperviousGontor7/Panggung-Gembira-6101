import prisma from "../../config/prisma.js";

// ======================================================
// CREATE LICENSE CODES
// ======================================================

export async function createLicenseCodes(items = []) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("Data kode lisensi tidak boleh kosong.");
  }

  return prisma.$transaction(
    items.map((item) =>
      prisma.licenseCode.create({
        data: {
          codeHash: item.codeHash,

          createdById: item.createdById,
        },

        select: {
          id: true,
          createdAt: true,
        },
      }),
    ),
  );
}

// ======================================================
// FIND LICENSE BY USER
// ======================================================

export async function findLicenseByUserId(userId) {
  return prisma.license.findUnique({
    where: {
      userId,
    },

    select: {
      id: true,
      userId: true,
      activatedAt: true,
    },
  });
}

// ======================================================
// ACTIVATE LICENSE
// ======================================================

export async function activateLicense({ userId, codeHash }) {
  return prisma.$transaction(async (tx) => {
    // --------------------------------------------------
    // 1. CHECK EXISTING LICENSE
    // --------------------------------------------------

    const existingLicense = await tx.license.findUnique({
      where: {
        userId,
      },

      select: {
        id: true,
        activatedAt: true,
      },
    });

    if (existingLicense) {
      return {
        status: "ALREADY_LICENSED",

        license: existingLicense,
      };
    }

    // --------------------------------------------------
    // 2. FIND LICENSE CODE
    // --------------------------------------------------

    const licenseCode = await tx.licenseCode.findUnique({
      where: {
        codeHash,
      },

      select: {
        id: true,
        usedAt: true,
      },
    });

    if (!licenseCode || licenseCode.usedAt) {
      return {
        status: "INVALID_CODE",
      };
    }

    // --------------------------------------------------
    // 3. CLAIM LICENSE CODE ATOMICALLY
    // --------------------------------------------------

    const claimResult = await tx.licenseCode.updateMany({
      where: {
        id: licenseCode.id,

        usedAt: null,
      },

      data: {
        usedAt: new Date(),
      },
    });

    if (claimResult.count !== 1) {
      return {
        status: "INVALID_CODE",
      };
    }

    // --------------------------------------------------
    // 4. CREATE PERMANENT LICENSE
    // --------------------------------------------------

    const license = await tx.license.create({
      data: {
        userId,

        licenseCodeId: licenseCode.id,
      },

      select: {
        id: true,
        userId: true,
        activatedAt: true,
      },
    });

    return {
      status: "ACTIVATED",

      license,
    };
  });
}

export default {
  createLicenseCodes,

  findLicenseByUserId,

  activateLicense,
};
