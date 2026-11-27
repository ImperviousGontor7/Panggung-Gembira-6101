// ======================================================
// LICENSE CONSTANTS
// ======================================================

export const LICENSE_CODE_PREFIX = "IG7";

export const LICENSE_CODE_RANDOM_BYTES = 16;

export const LICENSE_CODE_MAX_BATCH = 50;

export const LICENSE_CODE_GROUP_LENGTH = 4;

// ======================================================
// LICENSE ERRORS
// ======================================================

export const LICENSE_MESSAGES = Object.freeze({
  INVALID_CODE: "Kode lisensi tidak valid atau sudah digunakan.",

  ALREADY_LICENSED: "Akun ini sudah memiliki lisensi permanen.",

  ACTIVATION_SUCCESS: "Lisensi berhasil diaktifkan.",

  GENERATION_SUCCESS: "Kode lisensi berhasil dibuat.",

  LICENSE_NOT_FOUND: "Lisensi tidak ditemukan.",
});
