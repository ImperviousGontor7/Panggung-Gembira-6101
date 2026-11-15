// ======================================================
// PERMISSIONS
// ======================================================

export const PERMISSIONS =
  Object.freeze({
    // ------------------------------
    // NEWS
    // ------------------------------

    NEWS_READ:
      "news:read",

    NEWS_CREATE:
      "news:create",

    NEWS_UPDATE:
      "news:update",

    NEWS_DELETE:
      "news:delete",

    NEWS_PUBLISH:
      "news:publish",

    NEWS_ARCHIVE:
      "news:archive",

    NEWS_RESTORE:
      "news:restore",

    // ------------------------------
    // CATEGORY
    // ------------------------------

    CATEGORY_READ:
      "category:read",

    CATEGORY_CREATE:
      "category:create",

    CATEGORY_UPDATE:
      "category:update",

    CATEGORY_DELETE:
      "category:delete",

    // ------------------------------
    // MEDIA
    // ------------------------------

    MEDIA_READ:
      "media:read",

    MEDIA_UPLOAD:
      "media:upload",

    MEDIA_UPDATE:
      "media:update",

    MEDIA_DELETE:
      "media:delete",

    // ------------------------------
    // USER
    // ------------------------------

    USER_READ:
      "user:read",

    USER_CREATE:
      "user:create",

    USER_UPDATE:
      "user:update",

    USER_DELETE:
      "user:delete",

    // ------------------------------
    // ADMIN
    // ------------------------------

    ADMIN_ACCESS:
      "admin:access",
  });

export const ALL_PERMISSIONS =
  Object.freeze(
    Object.values(
      PERMISSIONS,
    ),
  );

export default {
  PERMISSIONS,

  ALL_PERMISSIONS,
};