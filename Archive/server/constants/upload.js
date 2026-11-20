export const UPLOAD_LIMITS =
  Object.freeze({
    IMAGE_MAX_SIZE:
      10 * 1024 * 1024,

    DOCUMENT_MAX_SIZE:
      20 * 1024 * 1024,

    AVATAR_MAX_SIZE:
      5 * 1024 * 1024,

    GALLERY_MAX_SIZE:
      10 * 1024 * 1024,
  });

export const IMAGE_MIME_TYPES =
  Object.freeze([
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/avif",
  ]);

export const DOCUMENT_MIME_TYPES =
  Object.freeze([
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/plain",
  ]);

export const ALLOWED_UPLOAD_MIME_TYPES =
  Object.freeze([
    ...IMAGE_MIME_TYPES,
    ...DOCUMENT_MIME_TYPES,
  ]);

export const UPLOAD_FOLDERS =
  Object.freeze({
    TEMP: "temp",
    IMAGES: "images",
    DOCUMENTS: "documents",
    AVATARS: "avatars",
    GALLERIES: "galleries",
  });

export function isImageMimeType(
  mimeType
) {
  return IMAGE_MIME_TYPES.includes(
    String(mimeType || "")
      .toLowerCase()
  );
}

export function isDocumentMimeType(
  mimeType
) {
  return DOCUMENT_MIME_TYPES.includes(
    String(mimeType || "")
      .toLowerCase()
  );
}

export function isAllowedMimeType(
  mimeType
) {
  const normalized =
    String(mimeType || "")
      .toLowerCase();

  return ALLOWED_UPLOAD_MIME_TYPES.includes(
    normalized
  );
}

export default {
  UPLOAD_LIMITS,
  IMAGE_MIME_TYPES,
  DOCUMENT_MIME_TYPES,
  ALLOWED_UPLOAD_MIME_TYPES,
  UPLOAD_FOLDERS,
  isImageMimeType,
  isDocumentMimeType,
  isAllowedMimeType,
};