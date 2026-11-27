import { randomBytes, createHash } from "node:crypto";

import * as licenseRepository from "./license.repository.js";

import {
  LICENSE_CODE_PREFIX,
  LICENSE_CODE_RANDOM_BYTES,
  LICENSE_CODE_MAX_BATCH,
  LICENSE_CODE_GROUP_LENGTH,
  LICENSE_MESSAGES,
} from "./license.constants.js";

// ======================================================
// ERROR HELPER
// ======================================================

function createLicenseError(message, statusCode = 400) {
  const error = new Error(message);

  error.statusCode = statusCode;

  return error;
}

// ======================================================
// NORMALIZE LICENSE CODE
// ======================================================

function normalizeLicenseCode(code) {
  if (typeof code !== "string") {
    throw createLicenseError(LICENSE_MESSAGES.INVALID_CODE);
  }

  const normalized = code.trim().toUpperCase().replace(/[\s-]/g, "");

  const expectedLength =
    LICENSE_CODE_PREFIX.length + LICENSE_CODE_RANDOM_BYTES * 2;

  const validFormat = new RegExp(
    `^${LICENSE_CODE_PREFIX}[0-9A-F]{${LICENSE_CODE_RANDOM_BYTES * 2}}$`,
  );

  if (normalized.length !== expectedLength || !validFormat.test(normalized)) {
    throw createLicenseError(LICENSE_MESSAGES.INVALID_CODE);
  }

  return normalized;
}

// ======================================================
// HASH LICENSE CODE
// ======================================================

function hashLicenseCode(code) {
  return createHash("sha256").update(code, "utf8").digest("hex");
}

// ======================================================
// GENERATE LICENSE CODE
// ======================================================

function generateLicenseCode() {
  const randomValue = randomBytes(LICENSE_CODE_RANDOM_BYTES)
    .toString("hex")
    .toUpperCase();

  const groups = randomValue.match(
    new RegExp(`.{1,${LICENSE_CODE_GROUP_LENGTH}}`, "g"),
  );

  const code = [LICENSE_CODE_PREFIX, ...groups].join("-");

  const normalized = normalizeLicenseCode(code);

  return {
    code,

    codeHash: hashLicenseCode(normalized),
  };
}

// ======================================================
// CREATE LICENSE CODES
// ======================================================

export async function createLicenseCodes(quantity = 1, createdById) {
  const amount = Number(quantity);

  if (
    !Number.isInteger(amount) ||
    amount < 1 ||
    amount > LICENSE_CODE_MAX_BATCH
  ) {
    throw createLicenseError(
      `Jumlah kode harus antara 1 dan ${LICENSE_CODE_MAX_BATCH}.`,
    );
  }

  if (typeof createdById !== "string" || !createdById.trim()) {
    throw createLicenseError("Pembuat kode lisensi tidak valid.");
  }

  const generatedCodes = Array.from(
    {
      length: amount,
    },
    () => generateLicenseCode(),
  );

  const records = generatedCodes.map((item) => ({
    codeHash: item.codeHash,

    createdById,
  }));

  const createdRecords = await licenseRepository.createLicenseCodes(records);

  return {
    count: createdRecords.length,

    codes: createdRecords.map((record, index) => ({
      id: record.id,

      code: generatedCodes[index].code,

      createdAt: record.createdAt,
    })),
  };
}

// ======================================================
// GET CURRENT USER LICENSE
// ======================================================

export async function getMyLicense(userId) {
  if (!userId) {
    throw createLicenseError("User ID tidak valid.", 401);
  }

  const license = await licenseRepository.findLicenseByUserId(userId);

  return {
    active: Boolean(license),

    license,
  };
}

// ======================================================
// ACTIVATE LICENSE
// ======================================================

export async function activateUserLicense(userId, code) {
  if (!userId) {
    throw createLicenseError("User ID tidak valid.", 401);
  }

  const normalizedCode = normalizeLicenseCode(code);

  const codeHash = hashLicenseCode(normalizedCode);

  let result;

  try {
    result = await licenseRepository.activateLicense({
      userId,

      codeHash,
    });
  } catch (error) {
    // --------------------------------------------------
    // HANDLE CONCURRENT ACTIVATION
    // --------------------------------------------------

    if (error?.code === "P2002") {
      const existingLicense =
        await licenseRepository.findLicenseByUserId(userId);

      if (existingLicense) {
        throw createLicenseError(LICENSE_MESSAGES.ALREADY_LICENSED, 409);
      }
    }

    throw error;
  }

  if (result.status === "ALREADY_LICENSED") {
    throw createLicenseError(LICENSE_MESSAGES.ALREADY_LICENSED, 409);
  }

  if (result.status === "INVALID_CODE") {
    throw createLicenseError(LICENSE_MESSAGES.INVALID_CODE, 400);
  }

  return {
    message: LICENSE_MESSAGES.ACTIVATION_SUCCESS,

    license: result.license,
  };
}

export default {
  createLicenseCodes,

  getMyLicense,

  activateUserLicense,
};
