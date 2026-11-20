import fs from "fs/promises";
import path from "path";

function normalizeRelativePath(relativePath) {
  const normalized = String(relativePath || "")
    .trim()
    .replace(/\\/g, "/")
    .replace(/^\/+/, "");

  if (!normalized) {
    throw new Error("relativePath is required.");
  }

  return normalized;
}

function normalizePublicBaseUrl(publicBaseUrl = "/uploads") {
  const normalized = String(publicBaseUrl || "")
    .trim()
    .replace(/\\/g, "/")
    .replace(/\/+$/, "");

  return normalized || "/uploads";
}

function joinPublicUrl(publicBaseUrl, relativePath) {
  const base = normalizePublicBaseUrl(publicBaseUrl);
  const rel = normalizeRelativePath(relativePath);
  return `${base}/${rel}`;
}

function resolveAbsolutePath(rootDir, relativePath) {
  const root = path.resolve(String(rootDir || ""));
  const rel = normalizeRelativePath(relativePath);
  return path.resolve(root, rel);
}

async function ensureParentDirectory(filePath) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function writeBuffer({
  rootDir,
  relativePath,
  buffer,
  overwrite = false,
  publicBaseUrl = "/uploads",
}) {
  if (!Buffer.isBuffer(buffer) || buffer.length === 0) {
    throw new Error("Buffer is required.");
  }

  const absolutePath = resolveAbsolutePath(rootDir, relativePath);
  await ensureParentDirectory(absolutePath);

  if (!overwrite && (await fileExists(absolutePath))) {
    throw new Error("File already exists.");
  }

  await fs.writeFile(absolutePath, buffer);

  const stat = await fs.stat(absolutePath);
  const safeRelativePath = normalizeRelativePath(relativePath);

  return {
    absolutePath,
    relativePath: safeRelativePath,
    url: joinPublicUrl(publicBaseUrl, safeRelativePath),
    size: stat.size,
    createdAt: stat.birthtime,
    updatedAt: stat.mtime,
  };
}

async function deleteFile({ rootDir, relativePath }) {
  const absolutePath = resolveAbsolutePath(rootDir, relativePath);

  try {
    await fs.unlink(absolutePath);
    return true;
  } catch (error) {
    if (error?.code === "ENOENT") {
      return false;
    }

    throw error;
  }
}

async function readFileInfo({ rootDir, relativePath }) {
  const absolutePath = resolveAbsolutePath(rootDir, relativePath);

  try {
    const stat = await fs.stat(absolutePath);

    return {
      absolutePath,
      relativePath: normalizeRelativePath(relativePath),
      size: stat.size,
      createdAt: stat.birthtime,
      updatedAt: stat.mtime,
    };
  } catch (error) {
    if (error?.code === "ENOENT") {
      return null;
    }

    throw error;
  }
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
  name: "local",
  deleteFile,
  fileExists,
  joinPublicUrl,
  normalizeRelativePath,
  readFileInfo,
  resolveAbsolutePath,
  writeBuffer,
};