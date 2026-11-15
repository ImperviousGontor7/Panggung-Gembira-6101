import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";
import mime from "mime-types";

import STORAGE, {
  getStoragePublicBaseUrl,
  getStorageRoot,
  isCloudStorage,
} from "../config/storage.js";
import {
  deleteFile as deleteLocalFile,
  readFileInfo as readLocalFileInfo,
  writeBuffer as writeLocalBuffer,
} from "./adapters/local.adapter.js";
import {
  deleteFile as deleteCloudFile,
  readFileInfo as readCloudFileInfo,
  writeBuffer as writeCloudBuffer,
} from "./adapters/cloud.adapter.js";

const adapterMap = Object.freeze({
  local: {
    writeBuffer: writeLocalBuffer,
    deleteFile: deleteLocalFile,
    readFileInfo: readLocalFileInfo,
  },
  cloud: {
    writeBuffer: writeCloudBuffer,
    deleteFile: deleteCloudFile,
    readFileInfo: readCloudFileInfo,
  },
});

function normalizeProvider(provider = STORAGE.provider) {
  return isCloudStorage(provider) ? "cloud" : "local";
}

function getActiveAdapter(provider = STORAGE.provider) {
  return adapterMap[normalizeProvider(provider)] || adapterMap.local;
}

function normalizeFolder(folder) {
  const safeFolder = String(folder || "")
    .trim()
    .replace(/\\/g, "/")
    .replace(/^\/+|\/+$/g, "");

  if (!safeFolder) {
    throw new Error("Storage folder is required.");
  }

  return safeFolder;
}

function normalizeFilename(filename) {
  const safeFilename = String(filename || "")
    .trim()
    .replace(/\\/g, "/")
    .replace(/^\/+/, "")
    .split("/")
    .filter(Boolean)
    .pop();

  if (!safeFilename) {
    throw new Error("Filename is required.");
  }

  return safeFilename
    .replace(/[^a-zA-Z0-9._-]+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "");
}

function normalizeRelativePath(...segments) {
  return segments
    .flat()
    .filter((segment) => segment !== undefined && segment !== null)
    .map((segment) => String(segment).replace(/\\/g, "/"))
    .map((segment) => segment.replace(/^\/+|\/+$/g, ""))
    .filter(Boolean)
    .join("/");
}

function inferExtension({ originalName, mimeType, fallback = ".bin" }) {
  const originalExt = path.extname(originalName || "").toLowerCase();

  if (originalExt) {
    return originalExt;
  }

  if (mimeType) {
    const byMime = mime.extension(mimeType);
    if (byMime) {
      return `.${byMime}`;
    }
  }

  return fallback;
}

function createFilename({
  originalName,
  mimeType,
  prefix = "file",
  extension,
}) {
  const safePrefix = String(prefix || "file")
    .trim()
    .replace(/[^a-zA-Z0-9_-]+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "") || "file";

  const safeExtension = extension || inferExtension({ originalName, mimeType });
  return `${safePrefix}-${nanoid(16)}${safeExtension}`;
}

async function ensureStorageDirectories(provider = STORAGE.provider) {
  const rootDir = getStorageRoot(provider);

  await fs.mkdir(rootDir, { recursive: true });

  await Promise.all(
    Object.values(STORAGE.folderPaths).map((folder) =>
      fs.mkdir(path.join(rootDir, folder), { recursive: true })
    )
  );
}

async function storeBuffer({
  buffer,
  folder,
  filename,
  originalName,
  mimeType,
  provider = STORAGE.provider,
  overwrite = false,
}) {
  const safeFolder = normalizeFolder(folder);
  const safeFilename = normalizeFilename(
    filename ||
      createFilename({
        originalName,
        mimeType,
      })
  );

  await ensureStorageDirectories(provider);

  const adapter = getActiveAdapter(provider);
  const rootDir = getStorageRoot(provider);
  const publicBaseUrl = getStoragePublicBaseUrl(provider);
  const relativePath = normalizeRelativePath(safeFolder, safeFilename);

  const saved = await adapter.writeBuffer({
    rootDir,
    relativePath,
    buffer,
    overwrite,
    publicBaseUrl,
  });

  return {
    provider: normalizeProvider(provider),
    folder: safeFolder,
    filename: safeFilename,
    originalName: originalName || null,
    mimetype: mimeType || null,
    ...saved,
  };
}

async function storeImageBuffer({
  buffer,
  folder = STORAGE.folderPaths.images,
  filename,
  originalName,
  mimeType = "image/webp",
  provider = STORAGE.provider,
  overwrite = false,
}) {
  return storeBuffer({
    buffer,
    folder,
    filename,
    originalName,
    mimeType,
    provider,
    overwrite,
  });
}

async function storeDocumentBuffer({
  buffer,
  folder = STORAGE.folderPaths.documents,
  filename,
  originalName,
  mimeType,
  provider = STORAGE.provider,
  overwrite = false,
}) {
  return storeBuffer({
    buffer,
    folder,
    filename,
    originalName,
    mimeType,
    provider,
    overwrite,
  });
}

async function removeStoredFile({
  relativePath,
  provider = STORAGE.provider,
}) {
  const adapter = getActiveAdapter(provider);
  const rootDir = getStorageRoot(provider);

  return adapter.deleteFile({
    rootDir,
    relativePath,
  });
}

async function getStoredFileInfo({
  relativePath,
  provider = STORAGE.provider,
}) {
  const adapter = getActiveAdapter(provider);
  const rootDir = getStorageRoot(provider);

  return adapter.readFileInfo({
    rootDir,
    relativePath,
  });
}

function buildPublicUrl(relativePath, provider = STORAGE.provider) {
  const safeRelativePath = String(relativePath || "")
    .trim()
    .replace(/\\/g, "/")
    .replace(/^\/+/, "");

  if (!safeRelativePath) {
    return null;
  }

  const baseUrl = getStoragePublicBaseUrl(provider);
  return `${baseUrl.replace(/\/+$/, "")}/${safeRelativePath}`;
}

function buildStoredFileMeta(file, fallback = {}) {
  if (!file) {
    return {
      absolutePath: null,
      relativePath: null,
      url: null,
      filename: null,
      mimetype: null,
      size: null,
      originalName: null,
      provider: normalizeProvider(fallback.provider),
      folder: fallback.folder || null,
    };
  }

  const relativePath = String(file.relativePath || file.path || "")
    .trim()
    .replace(/\\/g, "/") || null;

  return {
    absolutePath: file.absolutePath || file.path || null,
    relativePath,
    url:
      file.url ||
      (relativePath ? buildPublicUrl(relativePath, file.provider) : null),
    filename: file.filename || null,
    mimetype: file.mimetype || fallback.mimeType || null,
    size: file.size ?? null,
    originalName:
      file.originalName ||
      file.originalname ||
      fallback.originalName ||
      null,
    provider: normalizeProvider(file.provider || fallback.provider),
    folder: file.folder || fallback.folder || null,
  };
}

export {
  buildPublicUrl,
  buildStoredFileMeta,
  createFilename,
  ensureStorageDirectories,
  getActiveAdapter,
  getStoredFileInfo,
  inferExtension,
  normalizeFilename,
  normalizeFolder,
  normalizeProvider,
  normalizeRelativePath,
  removeStoredFile,
  storeBuffer,
  storeDocumentBuffer,
  storeImageBuffer,
};

export default {
  buildPublicUrl,
  buildStoredFileMeta,
  createFilename,
  ensureStorageDirectories,
  getActiveAdapter,
  getStoredFileInfo,
  inferExtension,
  normalizeFilename,
  normalizeFolder,
  normalizeProvider,
  normalizeRelativePath,
  removeStoredFile,
  storeBuffer,
  storeDocumentBuffer,
  storeImageBuffer,
};