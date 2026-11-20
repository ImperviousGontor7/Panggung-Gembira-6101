import path from "node:path";
import {
  fileURLToPath,
} from "node:url";

import {
  APP_ENV,
} from "./env.js";

// ======================================================
// PATH
// ======================================================

const __filename =
  fileURLToPath(
    import.meta.url
  );

const __dirname =
  path.dirname(
    __filename
  );

const serverRoot =
  path.resolve(
    __dirname,
    ".."
  );

const uploadsRoot =
  path.join(
    serverRoot,
    "uploads"
  );

// ======================================================
// PROVIDER
// ======================================================

const configuredProvider =
  String(
    APP_ENV.STORAGE_PROVIDER ||
      "local"
  )
    .trim()
    .toLowerCase();

const provider =
  configuredProvider ===
  "cloud"
    ? "cloud"
    : "local";

// ======================================================
// FOLDERS
// ======================================================

const folders =
  Object.freeze({
    root:
      uploadsRoot,

    temp:
      path.join(
        uploadsRoot,
        "temp"
      ),

    images:
      path.join(
        uploadsRoot,
        "images"
      ),

    documents:
      path.join(
        uploadsRoot,
        "documents"
      ),

    avatars:
      path.join(
        uploadsRoot,
        "avatars"
      ),

    galleries:
      path.join(
        uploadsRoot,
        "galleries"
      ),
  });

const folderPaths =
  Object.freeze({
    root:
      "uploads",

    temp:
      "uploads/temp",

    images:
      "uploads/images",

    documents:
      "uploads/documents",

    avatars:
      "uploads/avatars",

    galleries:
      "uploads/galleries",
  });

// ======================================================
// STORAGE CONFIG
// ======================================================

export const STORAGE =
  Object.freeze({
    provider,

    root:
      uploadsRoot,

    folders,

    folderPaths,

    maxFileSize:
      APP_ENV.UPLOAD_MAX_SIZE,

    publicPrefix:
      "/uploads",
  });

// ======================================================
// HELPERS
// ======================================================

export function isCloudStorage(
  value = STORAGE.provider
) {
  return (
    String(
      value || ""
    )
      .trim()
      .toLowerCase() ===
    "cloud"
  );
}

export function getStorageRoot(
  providerValue = STORAGE.provider
) {
  if (
    isCloudStorage(
      providerValue
    )
  ) {
    return (
      process.env
        .CLOUD_STORAGE_ROOT ||
      STORAGE.root
    );
  }

  return STORAGE.root;
}

export function getStoragePublicBaseUrl(
  providerValue = STORAGE.provider
) {
  if (
    isCloudStorage(
      providerValue
    )
  ) {
    return (
      process.env
        .CLOUD_STORAGE_PUBLIC_URL ||
      STORAGE.publicPrefix
    );
  }

  return STORAGE.publicPrefix;
}

export default STORAGE;