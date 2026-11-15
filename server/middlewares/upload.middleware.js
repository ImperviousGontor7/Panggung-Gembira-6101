import multer from "multer";

import path from "node:path";

import fs from "node:fs";

import STORAGE from "../config/storage.js";

import {
  UPLOAD_LIMITS,

  IMAGE_MIME_TYPES,

  DOCUMENT_MIME_TYPES,

  isImageMimeType,

  isDocumentMimeType,
} from "../constants/upload.js";

// ======================================================
// DIRECTORY
// ======================================================

function ensureDirectory(
  directory
) {
  if (
    !fs.existsSync(
      directory
    )
  ) {
    fs.mkdirSync(
      directory,
      {
        recursive: true,
      }
    );
  }
}

// ======================================================
// FILENAME
// ======================================================

function sanitizeFilename(
  filename
) {
  return String(
    filename || "file"
  )
    .normalize(
      "NFKD"
    )
    .replace(
      /[\u0300-\u036f]/g,
      ""
    )
    .replace(
      /[^a-zA-Z0-9._-]/g,
      "-"
    )
    .replace(
      /-+/g,
      "-"
    )
    .replace(
      /^[-.]+|[-.]+$/g,
      ""
    )
    .toLowerCase();
}

function generateFilename(
  file
) {
  const extension =
    path.extname(
      file.originalname ||
        ""
    );

  const basename =
    path.basename(
      file.originalname ||
        "file",
      extension
    );

  const safeBase =
    sanitizeFilename(
      basename
    ) ||
    "file";

  const timestamp =
    Date.now();

  const random =
    Math.random()
      .toString(36)
      .slice(
        2,
        10
      );

  return `${safeBase}-${timestamp}-${random}${extension.toLowerCase()}`;
}

// ======================================================
// STORAGE
// ======================================================

function createStorage(
  destination
) {
  ensureDirectory(
    destination
  );

  return multer.diskStorage({
    destination(
      req,
      file,
      callback
    ) {
      callback(
        null,
        destination
      );
    },

    filename(
      req,
      file,
      callback
    ) {
      callback(
        null,
        generateFilename(
          file
        )
      );
    },
  });
}

// ======================================================
// FILTER
// ======================================================

function createFileFilter(
  allowedMimeTypes
) {
  return (
    req,
    file,
    callback
  ) => {
    const mime =
      String(
        file.mimetype ||
          ""
      ).toLowerCase();

    if (
      !allowedMimeTypes.includes(
        mime
      )
    ) {
      const error =
        new multer.MulterError(
          "LIMIT_UNEXPECTED_FILE"
        );

      error.message =
        `File type ${mime} is not allowed.`;

      return callback(
        error,
        false
      );
    }

    return callback(
      null,
      true
    );
  };
}

// ======================================================
// UPLOAD INSTANCES
// ======================================================

export const imageUpload =
  multer({
    storage:
      createStorage(
        STORAGE.folders.images
      ),

    limits: {
      fileSize:
        UPLOAD_LIMITS.IMAGE_MAX_SIZE,

      files: 1,
    },

    fileFilter:
      createFileFilter(
        IMAGE_MIME_TYPES
      ),
  });

export const documentUpload =
  multer({
    storage:
      createStorage(
        STORAGE.folders.documents
      ),

    limits: {
      fileSize:
        UPLOAD_LIMITS.DOCUMENT_MAX_SIZE,

      files: 1,
    },

    fileFilter:
      createFileFilter(
        DOCUMENT_MIME_TYPES
      ),
  });

export const avatarUpload =
  multer({
    storage:
      createStorage(
        STORAGE.folders.avatars
      ),

    limits: {
      fileSize:
        UPLOAD_LIMITS.AVATAR_MAX_SIZE,

      files: 1,
    },

    fileFilter:
      createFileFilter(
        IMAGE_MIME_TYPES
      ),
  });

export const galleryUpload =
  multer({
    storage:
      createStorage(
        STORAGE.folders.galleries
      ),

    limits: {
      fileSize:
        UPLOAD_LIMITS.GALLERY_MAX_SIZE,

      files: 1,
    },

    fileFilter:
      createFileFilter(
        IMAGE_MIME_TYPES
      ),
  });

// ======================================================
// PUBLIC URL
// ======================================================

export function buildPublicUrl(
  file
) {
  if (!file) {
    return null;
  }

  const relativePath =
    path
      .relative(
        STORAGE.folders.root,
        file.path
      )
      .split(
        path.sep
      )
      .join("/");

  return `${STORAGE.publicPrefix}/${relativePath}`;
}

// ======================================================
// PROCESS IMAGE
// ======================================================

export function processImage(
  req,
  res,
  next
) {
  try {
    if (
      !req.file
    ) {
      return res
        .status(400)
        .json({
          success:
            false,

          message:
            "Image wajib diunggah.",
        });
    }

    if (
      !isImageMimeType(
        req.file.mimetype
      )
    ) {
      return res
        .status(400)
        .json({
          success:
            false,

          message:
            "Format image tidak didukung.",
        });
    }

    req.file.url =
      buildPublicUrl(
        req.file
      );

    return next();
  } catch (
    error
  ) {
    return next(
      error
    );
  }
}

// ======================================================
// PROCESS DOCUMENT
// ======================================================

export function processDocument(
  req,
  res,
  next
) {
  try {
    if (
      !req.file
    ) {
      return res
        .status(400)
        .json({
          success:
            false,

          message:
            "Document wajib diunggah.",
        });
    }

    if (
      !isDocumentMimeType(
        req.file.mimetype
      )
    ) {
      return res
        .status(400)
        .json({
          success:
            false,

          message:
            "Format document tidak didukung.",
        });
    }

    req.file.url =
      buildPublicUrl(
        req.file
      );

    return next();
  } catch (
    error
  ) {
    return next(
      error
    );
  }
}

// ======================================================
// AVATAR
// ======================================================

export function processAvatar(
  req,
  res,
  next
) {
  try {
    if (
      !req.file
    ) {
      return res
        .status(400)
        .json({
          success:
            false,

          message:
            "Avatar wajib diunggah.",
        });
    }

    req.file.url =
      buildPublicUrl(
        req.file
      );

    return next();
  } catch (
    error
  ) {
    return next(
      error
    );
  }
}

// ======================================================
// GALLERY
// ======================================================

export function processGallery(
  req,
  res,
  next
) {
  try {
    if (
      !req.file
    ) {
      return res
        .status(400)
        .json({
          success:
            false,

          message:
            "Gallery image wajib diunggah.",
        });
    }

    req.file.url =
      buildPublicUrl(
        req.file
      );

    return next();
  } catch (
    error
  ) {
    return next(
      error
    );
  }
}

// ======================================================
// RESPONSE
// ======================================================

export function buildUploadResponse(
  file,

  message =
    "Upload berhasil"
) {
  if (!file) {
    return {
      success:
        false,

      message:
        "File tidak ditemukan.",

      data:
        null,
    };
  }

  const relativePath =
    path
      .relative(
        STORAGE.folders.root,
        file.path
      )
      .split(
        path.sep
      )
      .join("/");

  return {
    success:
      true,

    message,

    data: {
      fieldname:
        file.fieldname ||
        null,

      originalName:
        file.originalname ||
        null,

      filename:
        file.filename ||
        null,

      mimeType:
        file.mimetype ||
        null,

      size:
        file.size ||
        0,

      path:
        relativePath,

      url:
        file.url ||
        buildPublicUrl(
          file
        ),
    },
  };
}

export default {
  imageUpload,

  documentUpload,

  avatarUpload,

  galleryUpload,

  processImage,

  processDocument,

  processAvatar,

  processGallery,

  buildUploadResponse,
};