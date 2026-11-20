import STORAGE, {
  getStoragePublicBaseUrl,
  getStorageRoot,
} from "../../config/storage.js";
import {
  deleteFile as deleteLocalFile,
  fileExists as localFileExists,
  joinPublicUrl,
  normalizeRelativePath,
  readFileInfo as readLocalFileInfo,
  resolveAbsolutePath,
  writeBuffer as writeLocalBuffer,
} from "./local.adapter.js";

async function writeBuffer(options) {
  return writeLocalBuffer({
    ...options,
    rootDir: options?.rootDir || getStorageRoot("cloud"),
    publicBaseUrl:
      options?.publicBaseUrl || getStoragePublicBaseUrl("cloud"),
  });
}

async function deleteFile(options) {
  return deleteLocalFile({
    ...options,
    rootDir: options?.rootDir || getStorageRoot("cloud"),
  });
}

async function fileExists(options) {
  return localFileExists({
    ...options,
    rootDir: options?.rootDir || getStorageRoot("cloud"),
  });
}

async function readFileInfo(options) {
  return readLocalFileInfo({
    ...options,
    rootDir: options?.rootDir || getStorageRoot("cloud"),
  });
}

export {
  deleteFile,
  fileExists,
  joinPublicUrl,
  normalizeRelativePath,
  readFileInfo,
  resolveAbsolutePath,
  writeBuffer,
};

export default {
  name: "cloud",
  rootDir: STORAGE.cloudRoot,
  deleteFile,
  fileExists,
  joinPublicUrl,
  normalizeRelativePath,
  readFileInfo,
  resolveAbsolutePath,
  writeBuffer,
};